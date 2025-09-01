import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietCloseEvent, QuietOpenEvent } from '../../events/open-close.js';
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
 *
 * @event quiet-blur - Emitted when the combobox loses focus.
 * @event quiet-change - Emitted when the user commits changes to the combobox's value.
 * @event quiet-focus - Emitted when the combobox receives focus.
 * @event quiet-input - Emitted when the combobox receives input.
 * @event quiet-open - Emitted when the dropdown opens.
 * @event quiet-close - Emitted when the dropdown closes.
 * @event quiet-select - Emitted when an item is selected.
 * @event quiet-entry - Emitted when the user attempts to add a value not in the list. Prevent default to allow the value.
 *
 * @csspart label - The element that contains the combobox's label.
 * @csspart description - The element that contains the combobox's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart tags - The container for tags in multiple mode.
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

  @query('#text-box') private textBox: HTMLInputElement;
  @query('#dropdown') private dropdown: HTMLDivElement;

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
    if (this.liveRegionTimeoutId) {
      clearTimeout(this.liveRegionTimeoutId);
    }
    if (this.navigationDebounceId) {
      clearTimeout(this.navigationDebounceId);
    }
  }

  firstUpdated() {
    this.updateItems();
    this.updateFormValue();
    this.updateInputWidth();
  }

  private updateItems() {
    const items = this.getAllItems();

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

  updated(changedProperties: PropertyValues<this>) {
    // Update validity
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

    // Handle validation states
    if (this.hadUserInteraction || this.wasSubmitted) {
      this.customStates.set('user-invalid', this.isInvalid);
      this.customStates.set('user-valid', !this.isInvalid);
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

  /** Custom function for rendering tag content */
  public getTagContent(item: QuietComboboxItem): TemplateResult {
    return html`${item.textContent}`;
  }

  private getItems(): QuietComboboxItem[] {
    return [...this.querySelectorAll<QuietComboboxItem>('quiet-combobox-item:not([disabled])')];
  }

  private getAllItems(): QuietComboboxItem[] {
    return [...this.querySelectorAll<QuietComboboxItem>('quiet-combobox-item')];
  }

  private syncSelectedItems() {
    const items = this.getAllItems();
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
      this.inputValue = this.selectedItems[0].textContent || '';
    }
  }

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

  private isBlank(): boolean {
    if (this.multiple) {
      return !this.value || (Array.isArray(this.value) && this.value.length === 0);
    }
    return !this.value;
  }

  private async showDropdown() {
    if (!this.dropdown) return;

    this.dispatchEvent(new QuietOpenEvent());

    this.dropdown.hidden = false;
    this.dropdown.showPopover();

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeyDown);

    this.cleanup = autoUpdate(this.textBox, this.dropdown, () => this.positionDropdown());

    await animateWithClass(this.dropdown, 'show');

    // Set initial active item to first item
    if (this.filteredItems.length > 0) {
      this.setActiveItem(this.filteredItems[0], false); // Explicitly false - no keyboard nav on initial open
    }
  }

  private async hideDropdown() {
    if (!this.dropdown || this.dropdown.hidden) return;

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
  }

  private positionDropdown() {
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

  private announce(message: string) {
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
    // Clear any pending announcement
    if (this.liveRegionTimeoutId) {
      clearTimeout(this.liveRegionTimeoutId);
    }

    // Clear any pending navigation announcement
    if (this.navigationDebounceId) {
      clearTimeout(this.navigationDebounceId);
    }

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

    // Debounce navigation announcements to avoid queueing
    // This waits a short time to see if user is still navigating
    this.navigationDebounceId = setTimeout(() => {
      // Clear and then announce to ensure screen reader picks it up
      this.liveAnnouncement = '';
      requestAnimationFrame(() => {
        this.liveAnnouncement = announcement;
      });
    }, 75); // 75ms delay - adjust if needed
  }

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
        const text = item.textContent?.toLowerCase() || '';
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
        // Pass true to preserve the active item when filtering
        this.filterItems('', true);

        // Announce selection
        this.announce(`${item.textContent} added`);
      }
      this.textBox.focus();
    } else {
      // Single selection
      this.selectedItems.forEach(i => (i.selected = false));
      item.selected = true;
      this.selectedItems = [item];
      this.value = item.value || item.textContent || '';
      this.inputValue = item.textContent || '';
      this.open = false;

      // Announce selection
      this.announce(`${item.textContent} selected`);
    }

    this.hadUserInteraction = true;
    this.updateFormValue();
    this.dispatchEvent(new QuietChangeEvent());
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
      this.announce(`${item.textContent} removed`);
    } else {
      this.value = '';
      this.inputValue = '';
    }

    this.updateFormValue();
    this.dispatchEvent(new QuietChangeEvent());
  }

  private removeTag(item: QuietComboboxItem, event: Event) {
    event.stopPropagation();
    this.deselectItem(item);
    this.textBox.focus();
    // Re-filter items based on current input
    this.filterItems(this.inputValue);
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

  // Event handlers
  private handleInput = () => {
    this.inputValue = this.textBox.value;
    this.filterItems(this.inputValue);

    if (!this.open && this.inputValue && this.filteredItems.length > 0) {
      this.open = true;
    }

    // In single select mode, check if input matches an item exactly
    if (!this.multiple) {
      const items = this.getAllItems();
      const matchingItem = items.find(
        item => item.textContent?.trim().toLowerCase() === this.inputValue.trim().toLowerCase()
      );

      if (matchingItem) {
        // Visual feedback that item matches
        this.selectedItems.forEach(i => (i.selected = false));
        matchingItem.selected = true;
        this.selectedItems = [matchingItem];
        this.value = matchingItem.value || matchingItem.textContent || '';
        this.updateFormValue();
      } else if (this.selectedItems.length > 0) {
        // Clear selection if text doesn't match
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

  private handleInputClick = (event: MouseEvent) => {
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

    // Close dropdown if focus is leaving the component entirely
    if (!isInternalFocus) {
      this.open = false;
    }

    // Handle free-form entry on blur
    if (this.inputValue.trim()) {
      const items = this.getAllItems();
      const matchingItem = items.find(
        item => item.textContent?.trim().toLowerCase() === this.inputValue.trim().toLowerCase()
      );

      if (!matchingItem) {
        // Dispatch quiet-entry event for non-matching input
        const entryEvent = new CustomEvent('quiet-entry', {
          detail: { value: this.inputValue.trim() },
          bubbles: true,
          composed: true,
          cancelable: true
        });

        this.dispatchEvent(entryEvent);

        // If event was prevented, developer is handling it
        if (entryEvent.defaultPrevented) {
          // Re-sync items after DOM mutation
          requestAnimationFrame(() => {
            this.updateItems();
            // Clear input in multiple mode after syncing
            if (this.multiple) {
              this.inputValue = '';
            }
          });
        } else {
          // If not prevented, clear the invalid entry
          if (this.multiple) {
            // For multiple, just clear the input
            this.inputValue = '';
          } else {
            // For single select, clear everything
            this.inputValue = '';
            this.value = '';
            this.selectedItems.forEach(item => (item.selected = false));
            this.selectedItems = [];
            this.updateFormValue();
          }
        }
      }
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
        } else if (this.inputValue.trim()) {
          // Dispatch quiet-entry for non-matching input in both single and multiple modes
          const items = this.getAllItems();
          const matchingItem = items.find(
            item => item.textContent?.trim().toLowerCase() === this.inputValue.trim().toLowerCase()
          );

          if (!matchingItem) {
            const entryEvent = new CustomEvent('quiet-entry', {
              detail: { value: this.inputValue.trim() },
              bubbles: true,
              composed: true,
              cancelable: true
            });

            this.dispatchEvent(entryEvent);

            // If event was prevented, developer is handling it
            if (entryEvent.defaultPrevented) {
              // For multiple mode, clear the input after successful add
              if (this.multiple) {
                this.inputValue = '';
                // Re-sync items after DOM mutation
                requestAnimationFrame(() => {
                  this.updateItems();
                });
              }
            } else {
              // If not prevented, clear the input
              this.inputValue = '';
              if (!this.multiple) {
                // For single select, also clear the value
                this.value = '';
                this.updateFormValue();
              }
            }
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.open = false;
        break;

      case 'Home':
        event.preventDefault();
        if (this.filteredItems.length > 0) {
          this.setActiveItem(this.filteredItems[0], true); // Add true flag
        }
        break;

      case 'End':
        event.preventDefault();
        if (this.filteredItems.length > 0) {
          this.setActiveItem(this.filteredItems[this.filteredItems.length - 1], true); // Add true flag
        }
        break;
    }
  };

  private navigateItems(direction: number) {
    if (this.filteredItems.length === 0) return;

    if (!this.activeItem) {
      // No item is active, select first or last based on direction
      if (direction > 0) {
        this.setActiveItem(this.filteredItems[0], true); // Add true flag
      } else {
        this.setActiveItem(this.filteredItems[this.filteredItems.length - 1], true); // Add true flag
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

    this.setActiveItem(this.filteredItems[index], true); // Add true flag
  }

  private handleDocumentClick = (event: MouseEvent) => {
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

  private handleVisualBoxClick = (event: MouseEvent) => {
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
    this.dispatchEvent(new QuietChangeEvent());
    this.textBox.focus();
  };

  private handleSlotChange = () => {
    this.updateItems();
  };

  private handleItemClick = (event: MouseEvent) => {
    const item = (event.target as Element).closest('quiet-combobox-item') as QuietComboboxItem;
    if (item && !item.disabled) {
      this.selectItem(item);
    }
  };

  private handleItemMouseMove = (event: MouseEvent) => {
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

      // Don't set the hovered item as active - let CSS :hover handle the styling
      // This prevents interference between keyboard and mouse navigation
    }
  };

  private handleHostInvalid = () => {
    this.wasSubmitted = true;
  };

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = this.multiple ? [] : '';
    this.selectedItems = [];
    this.inputValue = '';
    this.hadUserInteraction = false;
    this.wasSubmitted = false;
    this.isInvalid = false;
  }

  focus() {
    this.textBox?.focus();
  }

  blur() {
    this.textBox?.blur();
  }

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');

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
          'has-clear': this.withClear && !this.isBlank() && !this.disabled
        })}
        @click=${this.handleVisualBoxClick}
      >
        <div class="input-area">
          ${this.multiple
            ? this.selectedItems.map(
                item => html`
                  <span part="tag" class="tag" @mousedown=${(event: Event) => event.preventDefault()}>
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
        @mousedown=${(event: MouseEvent) => event.preventDefault()}
        @mousemove=${this.handleItemMouseMove}
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
