import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../listbox-item/listbox-item.js';
import type { QuietListboxItem } from '../listbox-item/listbox-item.js';
import styles from './listbox.styles.js';

// Borrow the native input's validation message
const nativeFileInput = document.createElement('input');
nativeFileInput.name = 'quiet-faux-input';
nativeFileInput.type = 'text';
nativeFileInput.required = true;
const VALIDATION_MESSAGE = nativeFileInput.validationMessage;

/**
 * <quiet-listbox>
 *
 * @summary Displays a list of options, allowing users to select one or more items from the available choices.
 * @documentation https://quietui.org/docs/components/listbox
 * @status stable
 * @since 1.0
 *
 * @dependency listbox-item
 *
 * @slot - Listbox items to show in the listbox.
 * @slot label - The listbox's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The listbox's description. For plain-text descriptions, you can use the `description` attribute
 *  instead.
 *
 * @event quiet-blur - Emitted when the list box loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the list box's selection. In single select mode, it
 *  occurs when a change is made and the listbox loses focus. In multiselect mode, it occurs whenever an option is
 *  toggled even while the listbox has focus.
 * @event quiet-focus - Emitted when the list box receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the list box's selection changes from user input.
 *
 * @csspart label - The element that contains the text field's label.
 * @csspart description - The element that contains the text field's description.
 * @csspart listbox - The internal listbox container that holds listbox items.
 *
 * @cssstate disabled - Applied when the text field is disabled.
 * @cssstate blank - Applied when the text field has a blank value.
 * @cssstate focused - Applied when the text field has focus.
 * @cssstate user-valid - Applied when the text field is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the text field is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-listbox')
export class QuietListbox extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private localize = new Localize(this);
  private firstSelectedValue = ''; // First selected value only (used for the value property)

  @query('#listbox') private listbox: HTMLInputElement;

  @state() private hadUserInteraction = false;
  @state() private isInvalid = false;
  @state() private lastSelectedIndex = -1;
  @state() private previousValue = '';
  @state() private typeaheadBuffer = '';
  @state() private typeaheadTimeout: number | null = null;
  @state() private wasChanged = false;
  @state() private wasSubmitted = false;

  /** The listbox's label. If you need to provide HTML in the label, use the `label` slot instead. */
  @property() label: string;

  /** The listbox's description. If you need to provide HTML in the description, use the `description` slot instead. */
  @property() description: string;

  /** The name of the listbox. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** Enables multiple selection mode. */
  @property({ type: Boolean, reflect: true }) multiple = false;

  /** Disables the listbox. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the text field a read-only field. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The text field's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /** Makes the listbox required. Form submission will not be allowed when this is set and the listbox is blank. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The listbox's value. For multiple selection, this will be the value of the first selected item. */
  @property()
  get value() {
    return this.firstSelectedValue;
  }
  set value(newValue: string) {
    const oldValue = this.firstSelectedValue;

    if (newValue !== oldValue) {
      this.firstSelectedValue = newValue;
      this.updateItemSelectionFromValue(newValue);
      this.requestUpdate('value', oldValue);
    }
  }

  /**
   * Gets or sets the currently selected values as an array. This property provides a consistent way to access or modify
   * the selection state regardless of whether the listbox is in single or multiple selection mode.
   *
   * In single selection mode, it returns an array with either zero or one value. In multiple selection mode, it returns
   * an array of all selected values.
   *
   * When setting this property in single mode, the first value in the array (if any) becomes the selected value. In
   * multiple mode, all values in the array become selected.
   */
  @property({ type: Array })
  get selectedValues() {
    return this.getSelectedValues();
  }
  set selectedValues(values) {
    this.setSelectedValues(values);
  }

  /** Gets or sets an array of selected listbox items. */
  get selectedItems(): QuietListboxItem[] {
    return this.getItems(true).filter(item => item.selected);
  }
  set selectedItems(items: QuietListboxItem[]) {
    if (!Array.isArray(items)) {
      this.deselectAll();
      return;
    }
    const values = items.map(item => item?.value).filter(Boolean);
    this.selectedValues = values;
  }

  protected get focusableAnchor() {
    return this.listbox;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.clearTypeaheadTimeout();
  }

  firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);
    this.initializeValueFromSelectedItems();
    this.initializeItems();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    if (changedProperties.has('value')) {
      this.customStates.set('blank', this.firstSelectedValue === '');
      this.updateFormValue();
      this.updateSelectedItems();
      this.resetRovingTabIndex();
    }

    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
      this.updateListboxAttributesOnItems();
    }

    // Handle validation states
    const hadUserInteraction = this.hadUserInteraction || this.wasSubmitted;
    this.customStates.set('user-invalid', hadUserInteraction && this.isInvalid);
    this.customStates.set('user-valid', hadUserInteraction && !this.isInvalid);
  }

  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  formResetCallback() {
    this.isInvalid = false;
    this.wasChanged = false;
    this.hadUserInteraction = false;
    this.wasSubmitted = false;
    this.firstSelectedValue = this.getAttribute('value') ?? '';

    // Find initially selected items and update the form value
    const initiallySelectedItems = this.getItems(true).filter(item => item.hasAttribute('selected'));

    // Reset all item selections
    this.getItems(true).forEach(item => {
      item.selected = initiallySelectedItems.includes(item);
    });

    if (initiallySelectedItems.length > 0) {
      this.firstSelectedValue = initiallySelectedItems[0].value;
    }

    this.updateFormValue();
    this.updateSelectedItems();
  }

  private clearTypeaheadTimeout() {
    if (this.typeaheadTimeout) {
      window.clearTimeout(this.typeaheadTimeout);
      this.typeaheadTimeout = null;
    }
  }

  private getItems(includeDisabled = false): QuietListboxItem[] {
    const selector = includeDisabled ? 'quiet-listbox-item' : 'quiet-listbox-item:not(:state(disabled))';
    return [...this.querySelectorAll<QuietListboxItem>(selector)];
  }

  private getSelectedItems(): QuietListboxItem[] {
    return this.getItems().filter(item => item.selected);
  }

  private initializeValueFromSelectedItems() {
    const initiallySelectedItems = this.getItems(true).filter(item => item.hasAttribute('selected') || item.selected);

    if (initiallySelectedItems.length > 0) {
      // For non-multiple mode, only the first selected item should remain selected
      if (!this.multiple && initiallySelectedItems.length > 1) {
        const firstItem = initiallySelectedItems[0];
        initiallySelectedItems.slice(1).forEach(item => {
          item.selected = false;
        });
        this.firstSelectedValue = firstItem.value;
      } else {
        this.firstSelectedValue = initiallySelectedItems[0].value;
      }
    }

    this.updateFormValue();
  }

  private initializeItems() {
    const items = this.getItems();
    if (items.length > 0) {
      // Set initial selection
      const selectedItems = this.getSelectedItems();
      const initialItem = selectedItems.length > 0 ? selectedItems[0] : items[0];
      this.setActiveItem(initialItem);

      // Update the roving tab index
      this.resetRovingTabIndex();
    }
  }

  private updateItemSelectionFromValue(newValue: string) {
    // When setting value, we select only the item with this value
    const items = this.getItems(true);
    items.forEach(item => {
      item.selected = item.value === newValue;
    });
  }

  private updateFormValue() {
    const selectedItems = this.selectedItems;

    // For multiple selection, submit data like a native listbox, e.g. `?name=val1&name=val2`
    if (this.multiple && selectedItems.length > 0) {
      const formData = new FormData();

      // Add each value as a separate entry with the same name
      selectedItems.forEach(item => {
        formData.append(this.name || '', item.value);
      });

      this.internals.setFormValue(formData);
    } else {
      // Single selection uses the normal string value
      this.internals.setFormValue(this.firstSelectedValue);
    }
  }

  private updateSelectedItems() {
    // For single selection, only update the item matching the current value
    if (!this.multiple) {
      this.getItems(true).forEach(item => {
        item.selected = item.value === this.firstSelectedValue;
      });
    }
  }

  /**
   * Updates the current value to align with selected items. We track user interaction to allow us to dispatch events
   * when human changes are made and suppress them for programmatic changes.
   */
  private updateValueFromSelectedItems(isUserInteraction = false) {
    const selectedItems = this.selectedItems;

    this.previousValue = this.firstSelectedValue;
    this.firstSelectedValue = selectedItems.length > 0 ? selectedItems[0].value : '';

    if (isUserInteraction) {
      // Set hadUserInteraction flag for validity states
      this.hadUserInteraction = true;

      if (this.multiple) {
        // For multiple selection, always dispatch input and change events when the user interacts to match the native
        // listbox behavior
        this.dispatchEvent(new QuietInputEvent());
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new QuietChangeEvent());
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      } else if (this.previousValue !== this.firstSelectedValue) {
        // For single selection, only dispatch input right now and set wasChanged so change dispatches on blur
        this.dispatchEvent(new QuietInputEvent());
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.wasChanged = true;
      }
    }

    this.updateFormValue();
  }

  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());

    // Check if no items are selected when receiving focus
    const selectedItems = this.getSelectedItems();
    if (selectedItems.length === 0) {
      // Get the first non-disabled item
      const items = this.getItems();
      if (items.length > 0) {
        const firstItem = items[0];
        this.setActiveItem(firstItem);
        this.updateValueFromSelectedItems();
      }
    }

    this.updateListboxAttributesOnItems();
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());

    // For single select, dispatch change on blur if the value changed
    if (!this.multiple && this.wasChanged && this.previousValue !== this.firstSelectedValue) {
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
    this.wasChanged = false;
    this.updateListboxAttributesOnItems();
  }

  private handleHostInvalid() {
    //
    // We need to simulate the :user-invalid state when the form is submitted. Alas, there's no way to listen to form
    // submit because validation occurs before the `formdata` and `submit` events. The only way I've found to hook into
    // it is by listening to the `invalid` event on the host element, which is dispatched by the browser when the form
    // is submitted and the form-associated custom element is invalid.
    //
    this.wasSubmitted = true;
  }

  private handleLabelClick() {
    if (!this.disabled) {
      this.focus();
    }
  }

  private handleListboxPointerDown(event: PointerEvent) {
    // Prevent default to maintain focus, but don't stop propagation
    event.preventDefault();
  }

  private handleItemClick(event: Event) {
    if (this.disabled) return;

    const item = (event.target as HTMLElement).closest('quiet-listbox-item') as QuietListboxItem;
    if (item?.disabled) return;

    // Clicking in the listbox but not on an item clears the selection
    if (!item) {
      this.deselectAll();
      this.updateValueFromSelectedItems(true);
      return;
    }

    const clickedIndex = this.getItems().indexOf(item);
    if (clickedIndex === -1) return;

    // Initialize last selected index if needed
    if (this.lastSelectedIndex === -1) this.lastSelectedIndex = clickedIndex;

    // Only handle selection if not readonly
    if (!this.readonly) {
      this.handleItemSelection(item, clickedIndex, event);
    }

    this.setActiveItem(item);

    // Maintain focus and prevent default behavior
    this.listbox.focus();
    event.preventDefault();
  }

  private handleItemSelection(item: QuietListboxItem, itemIndex: number, event: Event) {
    // Get modifier keys state
    const modifiers = {
      ctrl: (event as MouseEvent).ctrlKey || (event as PointerEvent).ctrlKey,
      meta: (event as MouseEvent).metaKey || (event as PointerEvent).metaKey,
      shift: (event as MouseEvent).shiftKey || (event as PointerEvent).shiftKey
    };
    let selectionChanged = false;

    // Detect if this is a touch event (handle both PointerEvent and TouchEvent)
    const isCoarsePointer =
      event instanceof PointerEvent &&
      (event.pointerType === 'touch' || window.matchMedia('(pointer: coarse)').matches);

    if (this.multiple && (modifiers.ctrl || modifiers.meta)) {
      // Toggle item
      item.selected = !item.selected;
      this.lastSelectedIndex = itemIndex;
      selectionChanged = true; // Multiple selection always triggers events
    } else if (this.multiple && modifiers.shift) {
      // Range selection
      const items = this.getItems();
      const start = Math.min(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, itemIndex);
      const end = Math.max(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, itemIndex);

      // Check if anything will change
      selectionChanged = items.some((listItem, i) => {
        return i >= start && i <= end && !listItem.selected;
      });

      // Apply the selection
      if (selectionChanged) {
        items.forEach((listItem, i) => {
          if (i >= start && i <= end) listItem.selected = true;
        });
      }
    } else if (this.multiple && isCoarsePointer) {
      // For touch events in multiple mode, toggle the item instead of clearing others
      item.selected = !item.selected;
      this.lastSelectedIndex = itemIndex;
      selectionChanged = true;
    } else if (this.multiple) {
      // Multiple selection with no modifier and not touch: select only the clicked item
      // Check if this would actually change the selection
      const items = this.getItems();
      selectionChanged = items.some((listItem, i) => {
        return (i === itemIndex && !listItem.selected) || (i !== itemIndex && listItem.selected);
      });

      // Apply the selection
      if (selectionChanged) {
        items.forEach((listItem, i) => {
          listItem.selected = i === itemIndex;
        });
      }
      this.lastSelectedIndex = itemIndex;
    } else {
      // Single selection mode - only change if not already selected
      if (!item.selected) {
        this.selectSingleItem(item);
        selectionChanged = true;
      }
    }

    // Wait for the items to update
    requestAnimationFrame(() => {
      // Only update if the selection actually changed
      if (selectionChanged) {
        this.updateValueFromSelectedItems(true);
      }
      this.resetRovingTabIndex();
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Handle typeahead for single character keys - only if not readonly
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
      if (!this.readonly) {
        this.handleTypeahead(event);
      }
      return;
    }

    const items = this.getItems();
    if (items.length === 0) return;

    // Special handling for arrow keys when no items are selected
    const selectedItems = this.getSelectedItems();
    if (selectedItems.length === 0) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        this.navigateToItem(0, items, event); // Navigate to first item
        return;
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        this.navigateToItem(items.length - 1, items, event); // Navigate to last item
        return;
      }
    }

    // Get or initialize active item
    let activeItem = this.querySelector('quiet-listbox-item[active]') as QuietListboxItem;
    let activeIndex = activeItem ? items.indexOf(activeItem) : -1;

    if (activeIndex === -1) {
      activeItem = this.getSelectedItems()[0] || items[0];
      activeIndex = items.indexOf(activeItem);
      this.setActiveItem(activeItem);
      event.preventDefault();
      return;
    }

    // Handle navigation keys
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.navigateToItem(activeIndex + 1, items, event);
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateToItem(activeIndex - 1, items, event);
        break;

      case 'Home':
        event.preventDefault();
        if (!this.readonly && this.multiple && event.ctrlKey && event.shiftKey) {
          // Ctrl+Shift+Home: Select from current to first
          const activeIndex = items.indexOf(activeItem);
          for (let i = 0; i <= activeIndex; i++) {
            items[i].selected = true;
          }
          this.updateValueFromSelectedItems(true);
          this.navigateToItem(0, items, { ...event, ctrlKey: true, shiftKey: false } as KeyboardEvent);
        } else {
          this.navigateToItem(0, items, event);
        }
        break;

      case 'End':
        event.preventDefault();
        if (!this.readonly && this.multiple && event.ctrlKey && event.shiftKey) {
          // Ctrl+Shift+End: Select from current to last
          const activeIndex = items.indexOf(activeItem);
          for (let i = activeIndex; i < items.length; i++) {
            items[i].selected = true;
          }
          this.updateValueFromSelectedItems(true);
          this.navigateToItem(items.length - 1, items, { ...event, ctrlKey: true, shiftKey: false } as KeyboardEvent);
        } else {
          this.navigateToItem(items.length - 1, items, event);
        }
        break;

      case ' ':
      case 'Enter':
        event.preventDefault();
        if (!this.readonly) {
          if (this.multiple && event.shiftKey && !event.ctrlKey && !event.metaKey) {
            // Shift+Space: Select contiguous items from most recently selected to focused
            const items = this.getItems();
            const start = Math.min(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, activeIndex);
            const end = Math.max(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, activeIndex);

            items.forEach((item, i) => {
              if (i >= start && i <= end) item.selected = true;
            });
            this.updateValueFromSelectedItems(true);
          } else {
            this.selectWithKeyboard(activeItem, activeIndex, event);
          }
        }
        break;

      case 'a':
        // Handle Ctrl+A for "select all" in multiple mode
        if (!this.readonly && (event.ctrlKey || event.metaKey) && this.multiple) {
          event.preventDefault();
          this.selectAll();
        }
        break;
    }

    this.listbox.focus();
  }

  private navigateToItem(index: number, items: QuietListboxItem[], event: KeyboardEvent) {
    // Bound the index to valid values
    index = Math.max(0, Math.min(index, items.length - 1));

    const newActiveItem = items[index];
    this.setActiveItem(newActiveItem);

    if (this.multiple && !this.readonly) {
      // For multiple selection with modifiers
      if (event.shiftKey && !event.ctrlKey && !event.metaKey) {
        // Shift + Arrow: Toggle selection state of the focused option
        newActiveItem.selected = !newActiveItem.selected;
        this.lastSelectedIndex = index;
        this.updateValueFromSelectedItems(true);
        this.resetRovingTabIndex();
      } else if (!event.shiftKey && !event.ctrlKey && !event.metaKey) {
        // No modifiers: Select only this item
        this.selectSingleItem(newActiveItem);
        this.updateValueFromSelectedItems(true);
        this.resetRovingTabIndex();
      }
      // If Ctrl/Meta is pressed, just navigate without changing selection
    } else if (!this.readonly) {
      // Single selection mode always selects the item
      this.selectSingleItem(newActiveItem);
      this.updateValueFromSelectedItems(true);
      this.resetRovingTabIndex();
    }
  }

  private updateListboxAttributesOnItems() {
    const isFocused = this.customStates.has('focused');

    // Propagate certain listbox states to each listbox items
    this.getItems(true).forEach(item => {
      item.customStates.set('controller-disabled', this.disabled);
      item.customStates.set('controller-readonly', this.readonly);
      item.customStates.set('controller-focused', isFocused);
    });
  }

  private selectWithKeyboard(activeItem: QuietListboxItem, activeIndex: number, event: KeyboardEvent) {
    if (!activeItem) return;

    const modifiers = {
      ctrl: event.ctrlKey || event.metaKey,
      shift: event.shiftKey
    };

    if (this.multiple && modifiers.ctrl) {
      activeItem.selected = !activeItem.selected;
      this.lastSelectedIndex = activeIndex;
    } else if (this.multiple && modifiers.shift) {
      // Range selection
      const items = this.getItems();
      const start = Math.min(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, activeIndex);
      const end = Math.max(this.lastSelectedIndex !== -1 ? this.lastSelectedIndex : 0, activeIndex);

      items.forEach((item, i) => {
        if (i >= start && i <= end) item.selected = true;
      });
    } else {
      this.selectSingleItem(activeItem);
    }

    this.updateValueFromSelectedItems(true);
    this.resetRovingTabIndex();
  }

  private handleSlotChange() {
    // When the slot changes, all initialization should happen synchronously
    this.updateListboxAttributesOnItems();
    this.updateSelectedItems();
    this.resetRovingTabIndex();
  }

  private selectSingleItem(item: QuietListboxItem) {
    this.getItems().forEach(listItem => {
      listItem.selected = listItem === item;
    });
    this.lastSelectedIndex = this.getItems().indexOf(item);
  }

  private handleTypeahead(event: KeyboardEvent) {
    // Skip if modifier keys or non-character keys
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;

    this.clearTypeaheadTimeout();
    this.typeaheadBuffer += event.key.toLowerCase();

    // Reset buffer after 1 second
    this.typeaheadTimeout = window.setTimeout(() => {
      this.typeaheadBuffer = '';
      this.typeaheadTimeout = null;
    }, 1000);

    // Find and select matching item
    const match = this.findTypeaheadMatch();
    if (match) {
      this.selectSingleItem(match);
      this.setActiveItem(match);
      this.updateValueFromSelectedItems(true);
    }
  }

  private findTypeaheadMatch(): QuietListboxItem | null {
    const items = this.getItems();
    const matchText = (idx: number) =>
      (items[idx].textContent || '').trim().toLowerCase().startsWith(this.typeaheadBuffer);

    // Always search from the beginning of the list
    for (let i = 0; i < items.length; i++) {
      if (matchText(i)) return items[i];
    }

    return null;
  }

  private setActiveItem(item: QuietListboxItem) {
    // Update active states
    this.getItems(true).forEach(i => {
      const isActive = i === item;
      i.toggleAttribute('active', isActive);
      i.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // Scroll into view after render
    if (item) {
      requestAnimationFrame(() => this.scrollItemIntoView(item));
    }
  }

  private scrollItemIntoView(item: QuietListboxItem) {
    const listbox = this.listbox;
    const r1 = listbox.getBoundingClientRect();
    const r2 = item.getBoundingClientRect();
    const isRTL = this.localize.dir() === 'rtl';

    // Vertical scrolling
    if (r2.bottom > r1.bottom) listbox.scrollTop += r2.bottom - r1.bottom;
    else if (r2.top < r1.top) listbox.scrollTop -= r1.top - r2.top;

    // Horizontal scrolling with RTL support
    if (isRTL) {
      if (r1.right < r2.right) listbox.scrollLeft -= r2.right - r1.right;
      else if (r1.left > r2.left) listbox.scrollLeft += r1.left - r2.left;
    } else {
      if (r1.left > r2.left) listbox.scrollLeft += r2.left - r1.left;
      else if (r1.right < r2.right) listbox.scrollLeft -= r1.right - r2.right;
    }
  }

  private async updateValidity() {
    await this.updateComplete;

    const isValueMissing = this.required && this.firstSelectedValue === '';
    const hasCustomValidity = this.getCustomValidity().length > 0;
    this.isInvalid = isValueMissing || hasCustomValidity;

    this.internals.setValidity(
      {
        badInput: false,
        customError: hasCustomValidity,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valueMissing: isValueMissing
      },
      isValueMissing ? VALIDATION_MESSAGE : this.getCustomValidity(),
      this.focusableAnchor
    );
  }

  /**
   * @internal Manage tab order and focus tracking for keyboard navigation
   */
  public resetRovingTabIndex() {
    const items = this.getItems();
    const selectedItem = this.getSelectedItems()[0];
    const targetIndex = selectedItem ? items.indexOf(selectedItem) : 0;

    items.forEach((item, index) => {
      item.tabIndex = -1;
      item.setAttribute('aria-current', index === targetIndex ? 'true' : 'false');
    });
  }

  /** Returns an array of all selected values. */
  public getSelectedValues() {
    return this.selectedItems.map(item => item.value);
  }

  /**
   * Sets the selected items by value(s) without triggering events.
   * Works for both single and multiple selection modes.
   * @param {string|string[]} values - Value(s) to select
   */
  public setSelectedValues(values: string | string[]) {
    const items = this.getItems(true);
    const valueArray = Array.isArray(values) ? values : [values];

    if (this.multiple) {
      // In multiple mode, select all matching values
      items.forEach(item => {
        item.selected = valueArray.includes(item.value);
      });
    } else {
      // In single mode, only select the first matching value
      const firstValue = valueArray[0];
      items.forEach(item => {
        item.selected = item.value === firstValue;
      });
    }

    this.updateValueFromSelectedItems(false); // false = not user interaction
  }

  /** Convenience method for selecting all items. */
  public selectAll() {
    if (!this.multiple) return;

    this.getItems().forEach(item => (item.selected = true));
    this.updateValueFromSelectedItems();
  }

  /** Convenience method for deselecting all items. */
  public deselectAll() {
    this.getItems().forEach(item => (item.selected = false));
    this.updateValueFromSelectedItems();
  }

  /** Sets focus to the listbox. */
  public focus() {
    this.listbox.focus();
  }

  /** Removes focus from the listbox. */
  public blur() {
    this.listbox.blur();
  }

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');

    return html`
      <label id="label" part="label" for="listbox" class=${classMap({ vh: !hasLabel })} @click=${this.handleLabelClick}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ vh: !hasDescription })}>
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="listbox"
        part="listbox"
        class=${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          disabled: this.disabled,
          readonly: this.readonly,
          multiple: this.multiple
        })}
        role="listbox"
        aria-multiselectable=${this.multiple ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
        aria-labelledby="label"
        aria-describedby="description"
        tabindex=${this.disabled ? '-1' : '0'}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @pointerdown=${this.handleListboxPointerDown}
        @click=${this.handleItemClick}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-listbox': QuietListbox;
  }
}

// Due to the parent/child relationship between listbox and listbox items, some updates can only be scheduled as a side
// effect of the previous update. This disables Lit's dev warning about it.
QuietListbox.disableWarning?.('change-in-update');
