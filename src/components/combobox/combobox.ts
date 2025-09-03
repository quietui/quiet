import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import {
  QuietBeforeCloseEvent,
  QuietBeforeOpenEvent,
  QuietCloseEvent,
  QuietOpenEvent
} from '../../events/open-close.js';
import { QuietSelectEvent } from '../../events/select.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../combobox-item/combobox-item.js';
import type { QuietComboboxItem } from '../combobox-item/combobox-item.js';
import '../icon/icon.js';
import styles from './combobox.styles.js';

/**
 * <quiet-combobox>
 *
 * @summary Allows users to select from a list of options with type-ahead search.
 * @documentation https://quietui.org/docs/components/combobox
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 * @dependency quiet-combobox-item
 *
 * @slot - One or more `<quiet-combobox-item>` elements to show as options.
 * @slot label - The combobox's label. For plain-text labels, use the `label` attribute instead.
 * @slot description - The combobox's description. For plain-text descriptions, use the `description` attribute instead.
 * @slot start - An icon or similar element to place before the input. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the input. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the combobox loses focus.
 * @event quiet-change - Emitted when the user commits changes to the combobox's value.
 * @event quiet-focus - Emitted when the combobox receives focus.
 * @event quiet-input - Emitted when the combobox receives input.
 * @event quiet-before-open - Emitted when the dropdown is instructed to open but before it is shown.
 * @event quiet-open - Emitted when the dropdown opens.
 * @event quiet-before-close - Emitted when the dropdown is instructed to close but before it is hidden.
 * @event quiet-close - Emitted when the dropdown closes.
 * @event quiet-select - Emitted when an item is selected.
 *
 * @csspart label - The element that contains the combobox's label.
 * @csspart description - The element that contains the combobox's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart tag - Individual tag elements.
 * @csspart tag-remove - The remove button for tags.
 * @csspart text-box - The internal text box, an `<input>` element.
 * @csspart clear-button - The clear button.
 * @csspart dropdown - The dropdown container.
 *
 * @cssstate open - Applied when the dropdown is open.
 * @cssstate disabled - Applied when the combobox is disabled.
 * @cssstate focused - Applied when the combobox has focus.
 * @cssstate blank - Applied when the combobox has no value.
 * @cssstate user-valid - Applied when valid after user interaction.
 * @cssstate user-invalid - Applied when invalid after user interaction.
 *
 * @cssproperty [--text-box-min-width=12ch] - The minimum width of the input field when shown next to tags. Only
 *  available in `multiple` mode.
 * @cssproperty [--show-duration=50ms] - The duration of the show/hide animation for the dropdown.
 */
@customElement('quiet-combobox')
export class QuietCombobox extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private optionIdCounter = 0;
  private liveRegionTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private navigationDebounceId: ReturnType<typeof setTimeout> | undefined;

  protected get focusableAnchor() {
    return this.textBox;
  }

  @query('#dropdown') private dropdown: HTMLDivElement;
  @query('#text-box') private textBox: HTMLInputElement;

  @state() open = false;
  @state() inputValue = '';
  @state() private activeItem: QuietComboboxItem | null = null;
  @state() private selectedItems: QuietComboboxItem[] = [];
  @state() private filteredItems: QuietComboboxItem[] = [];
  @state() private inputWidth = 'auto';
  @state() private isInvalid = false;
  @state() private hadUserInteraction = false;
  @state() private wasSubmitted = false;
  @state() private liveAnnouncement = '';

  /** The combobox's label. */
  @property() label: string;

  /** The combobox's description. */
  @property() description: string;

  /** The name of the combobox for form submission. */
  @property({ reflect: true }) name: string;

  /** The combobox's value(s). */
  @property() value: string | string[] = '';

  /** Placeholder text for the input. */
  @property() placeholder: string;

  /** Disables the combobox. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the combobox required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Enables multiple selection. */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Adds a clear button when not blank. */
  @property({ attribute: 'with-clear', type: Boolean, reflect: true }) withClear = false;

  /** The visual appearance of the combobox. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The size of the combobox. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the combobox in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The dropdown's placement relative to the input. */
  @property() placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'bottom-start';

  /** The distance of the dropdown from the input. */
  @property({ type: Number }) distance = 0;

  /** The offset of the dropdown along the input. */
  @property({ type: Number }) offset = 0;

  /** The form to associate with. */
  @property() form: string;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
    this.cleanup?.();
    this.clearAnnouncementTimers();
  }

  firstUpdated() {
    this.updateItems();
    this.updateFormValue();
    this.updateInputWidth();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle open state
    if (changedProperties.has('open')) {
      this.customStates.set('open', this.open);
      if (this.open) {
        this.showDropdown();
      } else {
        this.hideDropdown();
      }
    }

    // Handle value changes
    if (changedProperties.has('value')) {
      this.syncSelectedItems();
      this.updateFormValue();
      this.customStates.set('blank', this.isBlank());
    }

    // Handle disabled state
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    // Handle user interactions. When the form control's value has changed and lost focus (e.g. change event), we can
    // show user-valid and user-invalid states. We also show it if the form has been submitted.
    if (this.hadUserInteraction || this.wasSubmitted) {
      this.customStates.set('user-invalid', this.isInvalid);
      this.customStates.set('user-valid', !this.isInvalid);
    } else {
      this.customStates.set('user-invalid', false);
      this.customStates.set('user-valid', false);
    }

    // Handle multiple mode changes
    if (changedProperties.has('multiple')) {
      this.value = this.multiple ? [] : '';
      this.selectedItems = [];
      this.inputValue = '';
    }

    // Update input width when input value changes
    if (changedProperties.has('inputValue')) {
      this.updateInputWidth();
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    const initiallySelectedItems = this.getItems(true).filter(item => item.hasAttribute('selected'));

    // Reset all item selections
    this.getItems(true).forEach(item => {
      item.selected = initiallySelectedItems.includes(item);
    });

    if (this.multiple) {
      // In multiple mode, set the value to an array of selected values
      this.value = initiallySelectedItems.map(item => item.value || item.textContent || '');
      this.selectedItems = initiallySelectedItems;
    } else {
      // In single mode, use the first selected item
      this.value =
        initiallySelectedItems.length > 0
          ? initiallySelectedItems[0].value || initiallySelectedItems[0].textContent || ''
          : '';
      this.selectedItems = initiallySelectedItems.length > 0 ? [initiallySelectedItems[0]] : [];
      this.inputValue = initiallySelectedItems.length > 0 ? initiallySelectedItems[0].getLabelText() : '';
    }

    this.hadUserInteraction = false;
    this.wasSubmitted = false;
    this.isInvalid = false;
    this.updateFormValue();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Item management methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /** Gets all <quiet-combobox-item> elements that aren't disabled (by default). */
  private getItems(includeDisabled = false): QuietComboboxItem[] {
    const items = [...this.querySelectorAll<QuietComboboxItem>('quiet-combobox-item')];
    return includeDisabled ? items : items.filter(item => !item.disabled);
  }

  private updateItems() {
    const items = this.getItems(true);

    // Set combobox reference on all items and assign IDs if needed
    items.forEach(item => {
      if (!item.id) {
        item.id = `quiet-combobox-option-${this.optionIdCounter++}`;
      }
      item.combobox = this;
    });

    // Update filtered items
    this.filteredItems = this.getItems();

    // If no value is set, check for items with selected attribute
    if (!this.value || (Array.isArray(this.value) && this.value.length === 0)) {
      const selectedItems = items.filter(item => item.hasAttribute('selected'));

      if (selectedItems.length > 0) {
        if (this.multiple) {
          // Preserve DOM order for initial selection
          this.value = selectedItems.map(item => item.value || item.textContent || '');
          // Set selectedItems in DOM order for initial load
          this.selectedItems = selectedItems;
        } else {
          // For single select, use the first selected item
          this.value = selectedItems[0].value || selectedItems[0].textContent || '';
          this.selectedItems = [selectedItems[0]];
        }

        // Mark items as selected
        selectedItems.forEach(item => (item.selected = true));
      }
    } else {
      // Sync selected state for existing values
      this.syncSelectedItems();
    }
  }

  private syncSelectedItems() {
    const items = this.getItems(true);
    const values = Array.isArray(this.value) ? this.value : [this.value].filter(Boolean);

    // If we already have selected items, preserve their order
    const existingSelectedMap = new Map(this.selectedItems.map(item => [item.value || item.textContent || '', item]));

    // Build new selected items array, preserving order
    const newSelectedItems: QuietComboboxItem[] = [];

    // First, add items that were already selected (preserves order)
    values.forEach(value => {
      if (existingSelectedMap.has(value)) {
        const item = existingSelectedMap.get(value)!;
        // Check if item still exists in DOM
        if (items.includes(item)) {
          newSelectedItems.push(item);
        }
      } else {
        // New value, find the item and add it
        const item = items.find(i => (i.value || i.textContent || '') === value);
        if (item) {
          newSelectedItems.push(item);
        }
      }
    });

    // Update selected state on all items
    items.forEach(item => {
      const itemValue = item.value || item.textContent || '';
      const isSelected = values.includes(itemValue);
      item.selected = isSelected;
    });

    this.selectedItems = newSelectedItems;

    // Update input value for single select
    if (!this.multiple && this.selectedItems.length > 0) {
      this.inputValue = this.selectedItems[0].getLabelText();
    }
  }

  private findMatchingItem(query: string): QuietComboboxItem | undefined {
    const items = this.getItems(true);
    return items.find(item => item.getLabelText().toLowerCase() === query.trim().toLowerCase());
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Filtering methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private filterItems(query: string, preserveActiveItem = false) {
    const items = this.getItems();
    // Store the current active item to potentially preserve it
    const currentActiveItem = preserveActiveItem ? this.activeItem : null;

    if (!query) {
      this.filteredItems = items;
      items.forEach(item => (item.hidden = false));

      // If focused and we have items, show the dropdown
      if (this.filteredItems.length > 0 && this.customStates.has('focused')) {
        this.open = true;
        this.announceFilterResults(this.filteredItems.length);
      }
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredItems = [];

      items.forEach(item => {
        const text = item.getLabelText().toLowerCase();
        const matches = text.includes(lowerQuery);
        item.hidden = !matches;

        if (matches) {
          this.filteredItems.push(item);
        }
      });

      // Announce filter results
      this.announceFilterResults(this.filteredItems.length);
    }

    // Hide dropdown if no matches
    if (this.filteredItems.length === 0 && this.open) {
      this.open = false;
    } else if (this.filteredItems.length > 0 && this.open) {
      // Preserve active item if requested and it's still in the filtered list
      if (preserveActiveItem && currentActiveItem && this.filteredItems.includes(currentActiveItem)) {
        this.setActiveItem(currentActiveItem);
      } else {
        // Set first item as active when filtering
        this.setActiveItem(this.filteredItems[0]);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Navigation methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private setActiveItem(item: QuietComboboxItem | null, isKeyboard = false) {
    if (this.activeItem) {
      this.activeItem.active = false;
      this.activeItem.removeAttribute('data-keyboard-nav');
    }

    this.activeItem = item;

    if (item) {
      item.active = true;
      if (isKeyboard) {
        item.setAttribute('data-keyboard-nav', '');
      }
      item.scrollIntoView({ block: 'nearest' });
      this.announceOption(item);
    }
  }

  private navigateItems(direction: number) {
    if (this.filteredItems.length === 0) return;

    if (!this.activeItem) {
      // No item is active, select first or last based on direction
      if (direction > 0) {
        this.setActiveItem(this.filteredItems[0], true);
      } else {
        this.setActiveItem(this.filteredItems[this.filteredItems.length - 1], true);
      }
      return;
    }

    let index = this.filteredItems.indexOf(this.activeItem);
    index += direction;

    // Wrap around navigation
    if (index < 0) {
      index = this.filteredItems.length - 1;
    } else if (index >= this.filteredItems.length) {
      index = 0;
    }

    this.setActiveItem(this.filteredItems[index], true);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Selection methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private clearInvalidInput() {
    // Only clear if there's input that doesn't match any item
    if (!this.inputValue.trim()) return;

    const matchingItem = this.findMatchingItem(this.inputValue);

    // Clear input if no matching item OR if the matching item is disabled
    if (!matchingItem || matchingItem.disabled) {
      // Clear the non-matching or disabled input
      if (!this.multiple) {
        // Restore previous selection or clear
        this.inputValue = this.selectedItems.length > 0 ? this.selectedItems[0].getLabelText() : '';
      } else {
        // Always clear input in multiple mode
        this.inputValue = '';
      }

      // Reset the filter to show all items again
      this.filterItems('');
      return;
    }
  }

  private selectItem(item: QuietComboboxItem) {
    if (item.disabled) return;

    const selectEvent = new QuietSelectEvent({ item });
    this.dispatchEvent(selectEvent);

    if (selectEvent.defaultPrevented) return;

    if (this.multiple) {
      // Toggle selection in multiple mode
      if (item.selected) {
        this.deselectItem(item);
      } else {
        item.selected = true;
        this.selectedItems.push(item);
        const values = this.selectedItems.map(i => i.value || i.textContent || '');
        this.value = values;
        this.inputValue = '';
        this.setActiveItem(item);

        // Pass true to preserve the active item when filtering
        this.filterItems('', true);

        // Announce selection
        this.announceChange(`${item.textContent} added`);
      }
      this.textBox.focus();
    } else {
      // Single selection
      this.selectedItems.forEach(i => (i.selected = false));
      item.selected = true;
      this.selectedItems = [item];
      this.value = item.value || item.textContent || '';
      this.inputValue = item.getLabelText();
      this.open = false;

      // Announce selection
      this.announceChange(`${item.textContent} selected`);
    }

    this.hadUserInteraction = true;
    this.updateFormValue();
    this.dispatchEvent(new QuietChangeEvent());
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private deselectItem(item: QuietComboboxItem) {
    item.selected = false;
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }

    if (this.multiple) {
      const values = this.selectedItems.map(i => i.value || i.textContent || '');
      this.value = values;

      // Announce deselection
      this.announceChange(`${item.textContent} removed`);
    } else {
      this.value = '';
      this.inputValue = '';
    }

    this.updateFormValue();
    this.dispatchEvent(new QuietChangeEvent());
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private removeTag(item: QuietComboboxItem, event: Event) {
    event.stopPropagation();
    this.deselectItem(item);
    this.textBox.focus();
    // Re-filter items based on current input
    this.filterItems(this.inputValue);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Announcement methods (accessibility)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private clearAnnouncementTimers() {
    if (this.liveRegionTimeoutId) {
      clearTimeout(this.liveRegionTimeoutId);
      this.liveRegionTimeoutId = undefined;
    }
    if (this.navigationDebounceId) {
      clearTimeout(this.navigationDebounceId);
      this.navigationDebounceId = undefined;
    }
  }

  private announceChange(message: string) {
    // Use requestAnimationFrame to ensure the DOM updates
    requestAnimationFrame(() => {
      // Clear first to ensure change is detected by screen readers
      this.liveAnnouncement = '';

      // Then set the new announcement
      requestAnimationFrame(() => {
        this.liveAnnouncement = message;
      });
    });
  }

  private announceOption(item: QuietComboboxItem) {
    // Clear any pending announcements
    this.clearAnnouncementTimers();

    // Get the position of this item in the filtered list
    const position = this.filteredItems.indexOf(item) + 1;
    const total = this.filteredItems.length;

    // Build the announcement
    let announcement = `${item.textContent}`;

    // Add position information
    if (total > 0) {
      announcement += `, ${position} of ${total}`;
    }

    // Add selected state if applicable
    if (item.selected) {
      announcement += ', selected';
    }

    // Add disabled state if applicable
    if (item.disabled) {
      announcement += ', disabled';
    }

    // Debounce navigation announcements to avoid queueing. This waits a short time to see if user is still navigating.
    this.navigationDebounceId = setTimeout(() => {
      // Clear and then announce to ensure screen reader picks it up
      this.liveAnnouncement = '';
      requestAnimationFrame(() => {
        this.liveAnnouncement = announcement;
      });
    }, 75);
  }

  private announceFilterResults(count: number) {
    if (this.liveRegionTimeoutId) {
      clearTimeout(this.liveRegionTimeoutId);
    }

    const announcement = count === 0 ? 'No results found' : `${count} result${count === 1 ? '' : 's'} available`;

    // Use requestAnimationFrame to ensure the DOM updates
    requestAnimationFrame(() => {
      // Clear first to ensure change is detected
      this.liveAnnouncement = '';

      // Then set the new announcement
      requestAnimationFrame(() => {
        this.liveAnnouncement = announcement;
      });
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Dropdown methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private async showDropdown() {
    if (!this.dropdown) return;

    // Dispatch before-open event (cancelable)
    const beforeOpenEvent = new QuietBeforeOpenEvent();
    this.dispatchEvent(beforeOpenEvent);
    if (beforeOpenEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    this.dispatchEvent(new QuietOpenEvent());
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

    this.dropdown.hidden = false;
    this.dropdown.showPopover();

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeyDown);

    this.cleanup = autoUpdate(this.textBox, this.dropdown, () => this.positionDropdown());

    await animateWithClass(this.dropdown, 'show');

    // Set initial active item to first item
    if (this.filteredItems.length > 0) {
      this.setActiveItem(this.filteredItems[0], false);
    }
  }

  private async hideDropdown() {
    if (!this.dropdown || this.dropdown.hidden) return;

    // Dispatch before-close event (cancelable)
    const beforeCloseEvent = new QuietBeforeCloseEvent({ source: this });
    this.dispatchEvent(beforeCloseEvent);
    if (beforeCloseEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);

    await animateWithClass(this.dropdown, 'hide');

    this.dropdown.hidden = true;
    this.dropdown.hidePopover();
    this.cleanup?.();

    // Clean up keyboard navigation state when closing
    if (this.activeItem) {
      this.activeItem.removeAttribute('data-keyboard-nav');
    }

    this.dispatchEvent(new QuietCloseEvent());
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private async positionDropdown() {
    const visualBox = this.shadowRoot?.querySelector('#visual-box') as HTMLElement;
    if (!visualBox) return;

    computePosition(visualBox, this.dropdown, {
      placement: this.placement,
      middleware: [
        offset({ mainAxis: this.distance, crossAxis: this.offset }),
        flip(),
        shift(),
        size({
          apply: ({ availableWidth, availableHeight, elements }) => {
            // Use the reference width as the minimum width
            const referenceWidth = elements.reference.getBoundingClientRect().width;
            Object.assign(this.dropdown.style, {
              minWidth: `${referenceWidth}px`,
              maxWidth: `${Math.min(400, availableWidth)}px`, // Reasonable max width
              maxHeight: `${Math.min(300, availableHeight)}px`
            });
          },
          padding: 8
        })
      ]
    }).then(({ x, y, placement }) => {
      this.setAttribute('data-placement', placement);
      Object.assign(this.dropdown.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Form methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private isBlank(): boolean {
    if (this.multiple) {
      return !this.value || (Array.isArray(this.value) && this.value.length === 0);
    }
    return !this.value;
  }

  private updateFormValue() {
    if (this.multiple && Array.isArray(this.value)) {
      const formData = new FormData();
      this.value.forEach(val => {
        formData.append(this.name || '', String(val));
      });
      this.internals.setFormValue(formData);
    } else {
      this.internals.setFormValue(String(this.value || ''));
    }
  }

  private async updateValidity() {
    await this.updateComplete;

    let flags: ValidityStateFlags = {
      valueMissing: this.required && this.isBlank()
    };

    const customError = this.getCustomValidity();
    if (customError) {
      flags.customError = true;
    }

    this.isInvalid = Object.values(flags).some(Boolean);
    const message = customError || (flags.valueMissing ? 'Please select an option' : '');
    this.internals.setValidity(flags, message, this.focusableAnchor);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // UI Helper Methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private updateInputWidth() {
    if (!this.multiple) {
      this.inputWidth = 'auto';
      return;
    }

    // Calculate width based on input value or placeholder
    const text = this.inputValue || this.placeholder || '';
    const minChars = 8; // Minimum width in characters
    const maxChars = 50; // Maximum width in characters

    // Use ch units for more consistent sizing across fonts
    const chars = Math.max(minChars, Math.min(text.length + 2, maxChars));
    this.inputWidth = `${chars}ch`;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Event Handlers
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private handleInput = () => {
    this.inputValue = this.textBox.value;
    this.filterItems(this.inputValue);

    if (!this.open && this.inputValue && this.filteredItems.length > 0) {
      this.open = true;
    }

    // In single select mode, check if input matches an item exactly
    if (!this.multiple) {
      const matchingItem = this.findMatchingItem(this.inputValue);

      // Only process if matching item exists AND is not disabled
      if (matchingItem && !matchingItem.disabled) {
        // Visual feedback that item matches
        this.selectedItems.forEach(i => (i.selected = false));
        matchingItem.selected = true;
        this.selectedItems = [matchingItem];
        this.value = matchingItem.value || matchingItem.textContent || '';
        this.updateFormValue();
      } else if (this.selectedItems.length > 0) {
        // Clear selection if text doesn't match or matches a disabled item
        this.selectedItems[0].selected = false;
        this.selectedItems = [];
        this.value = '';
        this.updateFormValue();
      }
    }

    this.dispatchEvent(new QuietInputEvent());
  };

  private handleFocus = () => {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
    // Only auto-open on focus if we have items and the dropdown isn't already open
    // This prevents conflicts with click handlers
    if (!this.open && this.filteredItems.length > 0) {
      this.open = true;
    }
  };

  private handleInputClick = (event: PointerEvent) => {
    // Prevent the click from closing the dropdown via document handler
    event.stopPropagation();

    // If we're already focused and have items, ensure dropdown is open
    if (this.customStates.has('focused') && this.filteredItems.length > 0 && !this.open) {
      this.open = true;
    }
  };

  private handleBlur = (event: FocusEvent) => {
    this.customStates.set('focused', false);

    // Check if focus is moving outside the combobox component
    const relatedTarget = event.relatedTarget as HTMLElement;
    const isInternalFocus = relatedTarget && (this.contains(relatedTarget) || this.dropdown?.contains(relatedTarget));

    // Close dropdown and clear invalid input if focus is leaving the component entirely
    if (!isInternalFocus) {
      this.clearInvalidInput();
      this.open = false;
    }

    this.dispatchEvent(new QuietBlurEvent());
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    // Handle backspace to remove tags
    if (event.key === 'Backspace' && !this.inputValue && this.multiple && this.selectedItems.length > 0) {
      const lastItem = this.selectedItems[this.selectedItems.length - 1];
      this.deselectItem(lastItem);
      return;
    }

    // Open dropdown on arrow keys
    if (!this.open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      this.open = true;
      return;
    }

    if (!this.open) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateItems(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.navigateItems(-1);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.activeItem) {
          this.selectItem(this.activeItem);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.open = false;
        break;

      case 'Home':
        event.preventDefault();
        if (this.filteredItems.length > 0) {
          this.setActiveItem(this.filteredItems[0], true);
        }
        break;

      case 'End':
        event.preventDefault();
        if (this.filteredItems.length > 0) {
          this.setActiveItem(this.filteredItems[this.filteredItems.length - 1], true);
        }
        break;
    }
  };

  private handleDocumentClick = (event: PointerEvent) => {
    const path = event.composedPath();
    const visualBox = this.shadowRoot?.querySelector('#visual-box');
    const dropdown = this.dropdown;

    // Close if click is not within the visual box or dropdown
    if (!path.includes(visualBox as Element) && !path.includes(dropdown)) {
      this.open = false;
    }
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.open = false;
    }
  };

  private handleVisualBoxClick = (event: PointerEvent) => {
    // Don't do anything if disabled
    if (this.disabled) return;

    // Don't toggle if clicking on clear button or tag remove button
    const target = event.target as HTMLElement;
    if (target.closest('#clear-button') || target.closest('.tag-remove')) {
      return;
    }

    // Prevent this click from immediately closing via document handler
    event.stopPropagation();

    // If already focused, just toggle the dropdown
    // If not focused, the focus event will handle opening
    if (this.customStates.has('focused')) {
      this.open = !this.open;
    }

    // Focus the text box (this will trigger handleFocus if not already focused)
    this.textBox.focus();
  };

  private handleClear = () => {
    this.value = this.multiple ? [] : '';
    this.selectedItems.forEach(item => (item.selected = false));
    this.selectedItems = [];
    this.inputValue = '';
    this.filterItems('');
    this.updateFormValue();
    this.hadUserInteraction = true;
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
    this.dispatchEvent(new QuietChangeEvent());
    this.textBox.focus();
  };

  private handleSlotChange = () => {
    this.updateItems();
  };

  private handleItemClick = (event: PointerEvent) => {
    const item = (event.target as Element).closest('quiet-combobox-item') as QuietComboboxItem;
    if (item && !item.disabled) {
      this.selectItem(item);
    }
  };

  private handleItemPointerMove = (event: PointerEvent) => {
    // Only process if we're hovering over an actual item
    const hoveredItem = (event.target as Element).closest('quiet-combobox-item') as QuietComboboxItem;

    if (!hoveredItem || this.disabled) return;

    // Only clear active states if we're hovering over a different item
    if (hoveredItem !== this.activeItem) {
      // Clear keyboard navigation data attribute from all items
      if (this.activeItem) {
        this.activeItem.active = false;
        this.activeItem.removeAttribute('data-keyboard-nav');
      }

      // We don't set the hovered item as active, let CSS `:hover` handle the styling to prevent interference between
      // keyboard and mouse navigation
    }
  };

  private handleHostInvalid = () => {
    this.wasSubmitted = true;
  };

  /**
   * A custom function for rendering tag content. By default, this function returns the item's full `textContent`. You
   * can override it to customize the content that gets rendered in tags in `multiple` mode.
   */
  public getTagContent(item: QuietComboboxItem): TemplateResult {
    return html`${item.textContent}`;
  }

  /** Sets focus to the combobox. */
  public focus() {
    this.textBox?.focus();
  }

  /** Removes focus from the combobox. */
  public blur() {
    this.textBox?.blur();
  }

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');
    const hasStart = this.slotsWithContent.has('start');
    const hasEnd = this.slotsWithContent.has('end');

    // Dynamic styles for the input
    const inputStyles = {
      width: this.multiple ? this.inputWidth : undefined
    };

    // Build descriptive text for screen readers
    const comboboxDescription = [];
    if (hasDescription) {
      comboboxDescription.push('description');
    }
    comboboxDescription.push('combobox-instructions');

    const ariaDescribedBy = comboboxDescription.join(' ');

    return html`
      <label id="label" part="label" for="text-box" class=${classMap({ vh: !hasLabel })}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ vh: !hasDescription })}>
        <slot name="description">${this.description}</slot>
      </div>

      <!-- Screen reader only instructions -->
      <div id="combobox-instructions" class="vh">
        Use arrow keys to navigate options. Press Enter to select.
        ${this.multiple ? 'Multiple selections allowed.' : ''}
      </div>

      <div
        id="visual-box"
        part="visual-box"
        class=${classMap({
          normal: this.appearance === 'normal',
          filled: this.appearance === 'filled',
          unstyled: this.appearance === 'unstyled',
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          pill: this.pill,
          disabled: this.disabled,
          multiple: this.multiple,
          'has-clear': this.withClear && !this.isBlank() && !this.disabled,
          'has-start': hasStart,
          'has-end': hasEnd
        })}
        @click=${this.handleVisualBoxClick}
      >
        <slot name="start"></slot>

        <div id="input-area">
          ${this.multiple
            ? this.selectedItems.map(
                item => html`
                  <span part="tag" class="tag" @pointerdown=${(event: Event) => event.preventDefault()}>
                    ${this.getTagContent(item)}
                    <button
                      part="tag-remove"
                      class="tag-remove"
                      type="button"
                      tabindex="-1"
                      aria-label="Remove ${item.textContent}"
                      @click=${(event: Event) => this.removeTag(item, event)}
                    >
                      <quiet-icon library="system" name="x"></quiet-icon>
                    </button>
                  </span>
                `
              )
            : ''}

          <input
            id="text-box"
            part="text-box"
            type="text"
            role="combobox"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls="dropdown"
            aria-describedby=${ariaDescribedBy}
            aria-invalid=${this.isInvalid ? 'true' : 'false'}
            ?disabled=${this.disabled}
            ?required=${this.required}
            placeholder=${ifDefined(this.placeholder)}
            .value=${this.inputValue}
            style=${styleMap(inputStyles)}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeyDown}
            @click=${this.handleInputClick}
          />
        </div>

        ${this.withClear && !this.isBlank() && !this.disabled
          ? html`
              <button
                id="clear-button"
                part="clear-button"
                class="text-box-button"
                type="button"
                tabindex="-1"
                aria-label="Clear"
                @click=${this.handleClear}
              >
                <quiet-icon library="system" name="circle-x"></quiet-icon>
              </button>
            `
          : ''}

        <slot name="end"></slot>
      </div>

      <div
        id="dropdown"
        part="dropdown"
        role="listbox"
        aria-label="${this.label}"
        aria-multiselectable="${this.multiple ? 'true' : 'false'}"
        popover="manual"
        hidden
        @click=${this.handleItemClick}
        @pointerdown=${(event: PointerEvent) => event.preventDefault()}
        @pointermove=${this.handleItemPointerMove}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>

      <!-- ARIA Live Region for announcements -->
      <div
        id="live-region"
        class="vh"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
      >
        ${this.liveAnnouncement}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-combobox': QuietCombobox;
  }
}

// Due to the parent/child relationship between combobox and combobox items, some updates can only be scheduled as a
// side effect of the previous update. This disables Lit's dev warning about it.
QuietCombobox.disableWarning?.('change-in-update');
