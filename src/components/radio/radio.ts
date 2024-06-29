import '../radio-item/radio-item.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietChangeEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './radio.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietRadioItem } from '../radio-item/radio-item.js';

interface GetRadioItemOptions {
  includeDisabled: boolean;
}

// Borrow the native radio's validation message
const nativeRadio = document.createElement('input');
nativeRadio.name = 'quiet-faux-radio';
nativeRadio.type = 'radio';
nativeRadio.required = true;
const VALIDATION_MESSAGE = nativeRadio.validationMessage;

/**
 * <quiet-radio>
 *
 * @summary Radios let the user select one option from a group of choices.
 * @documentation https://quietui.com/docs/components/radio
 * @status stable
 * @since 1.0
 *
 * @dependency radio-item
 *
 * @slot - The radio items to place in the group.
 * @slot label - The radio's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The radios's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @event quiet-change - Emitted when the user commits changes to the radio's value.
 * @event quiet-input - Emitted when the radio receives input.
 *
 * @cssstate user-valid - Applied when the radio is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the radio is invalid and the user has sufficiently interacted with it.
 *
 * @csspart label - The element that contains the radio's label.
 * @csspart description - The element that contains the radio's description.
 * @csspart group - The element that wraps the grouped radios.
 */
@customElement('quiet-radio')
export class QuietRadio extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;

  @query('#group') group: HTMLElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

  /**
   * The radio's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The radio's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the radio. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The radio's current value. Set this to change the selected item. */
  @property() value = '';

  /** The orientation of grouped items. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Indicates at least one option in the radio is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * You can provide a custom error message to force the radio to be invalid. To clear the error, set this to an empty
   * string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  firstUpdated() {
    if (this.value) {
      const selectedItem = this.getSelectedItem();
      if (selectedItem) {
        this.setSelectedItem(selectedItem);
      }
    }
  }

  updated(changedProps: Map<string, unknown>) {
    // Always be updating
    this.updateValidity();

    // Handle value changes
    if (changedProps.has('value')) {
      this.internals.setFormValue(this.value);
    }

    // Handle user interactions. When the form control's value has changed and lost focus (e.g. change event), we can
    // show user-valid and user-invalid states. We also show it if the form has been submitted.
    if (this.wasChanged || this.wasSubmitted) {
      this.customStates.set('user-invalid', this.isInvalid);
      this.customStates.set('user-valid', !this.isInvalid);
    } else {
      this.customStates.set('user-invalid', false);
      this.customStates.set('user-valid', false);
    }
  }

  /** @internal Called when the associated form element changes. */
  formAssociatedCallback(form: HTMLFormElement | null) {
    this.associatedForm = form;
  }

  /** @internal Called when a containing fieldset is disabled. */
  formDisabledCallback(isDisabled: boolean) {
    this.getItems({ includeDisabled: true }).forEach(item => (item.disabled = isDisabled));
  }

  /** @internal Called when the form is reset. */
  formResetCallback() {
    this.isInvalid = false;
    this.wasChanged = false;
    this.wasSubmitted = false;

    const itemToSelect = this.getItems().find(item => item.getAttribute('value') === this.getAttribute('value'));
    if (itemToSelect) {
      this.setSelectedItem(itemToSelect);
    } else {
      this.setSelectedItem(null);
    }
  }

  /** Gets an array of radio items slotted into the radio. */
  private getItems(options?: Partial<GetRadioItemOptions>) {
    if (options?.includeDisabled) {
      return [...this.querySelectorAll<QuietRadioItem>('quiet-radio-item')];
    } else {
      return [...this.querySelectorAll<QuietRadioItem>('quiet-radio-item:not(:state(disabled))')];
    }
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

  private async handleGroupClick(event: PointerEvent) {
    const selectedItem = this.getSelectedItem();
    const radioItem = (event.target as HTMLElement).closest('quiet-radio-item');

    if (radioItem && !radioItem.disabled) {
      this.setSelectedItem(radioItem);
      this.wasChanged = true;

      if (radioItem !== selectedItem) {
        await this.updateComplete;
        this.dispatchEvent(new QuietInputEvent());
        this.dispatchEvent(new QuietChangeEvent());
      }
    }
  }

  private async handleGroupKeyDown(event: KeyboardEvent) {
    const target = (event.target as HTMLElement).closest('quiet-radio-item');
    const radioItems = this.getItems();
    const currentIndex = radioItems.findIndex(item => item.tabIndex === 0) || 0;
    let itemToSelect: QuietRadioItem | undefined;

    // Previous
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const nextIndex = currentIndex <= 0 ? radioItems.length - 1 : currentIndex - 1;
      itemToSelect = radioItems[nextIndex];
    }

    // Next
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const nextIndex = currentIndex >= radioItems.length - 1 ? 0 : currentIndex + 1;
      itemToSelect = radioItems[nextIndex];
    }

    // First
    if (event.key === 'Home') {
      itemToSelect = radioItems[0];
    }

    // Last
    if (event.key === 'End') {
      itemToSelect = radioItems[radioItems.length - 1];
    }

    // Check the focused item when pressing space
    if (event.key === ' ' && target) {
      itemToSelect = target;
    }

    if (itemToSelect) {
      event.preventDefault();
      this.setSelectedItem(itemToSelect);
      itemToSelect.focus();
      this.wasChanged = true;

      await this.updateComplete;
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new QuietChangeEvent());
    }
  }

  /** Focus on the selected item when clicking the label. */
  private handleLabelClick() {
    const items = this.getItems();
    const itemToFocus = items.find(item => item.checked) || items[0];

    if (itemToFocus) {
      itemToFocus.focus();
    }
  }

  /**
   * @internal Makes only the selected radio item tabbable. If no radio item is selected, the first radio item will be
   * tabbable.
   */
  public resetRovingTabIndex() {
    const radioItems = this.getItems();
    const selectedItem = this.getSelectedItem();
    const selectedItemIndex = radioItems.findIndex(item => item === selectedItem) || 0;
    const targetIndex = selectedItemIndex > -1 ? selectedItemIndex : 0;

    // Reset the roving tab index to the selected radio (or the first radio if none are selected)
    radioItems.forEach((item, index) => {
      item.tabIndex = index === targetIndex ? 0 : -1;
    });
  }

  /** Gets the selected item. */
  private getSelectedItem() {
    return this.getItems().find(item => item.value === this.value) || null;
  }

  /**
   * Sets the selected item and updates the roving tab index. If `null` is provided, the selection will be cleared and
   * the tab index will go to the first radio item.
   */
  private setSelectedItem(selectedItem: QuietRadioItem | null) {
    const radioItems = this.getItems({ includeDisabled: true });

    if (selectedItem) {
      // Select a specific item
      radioItems.forEach(item => {
        item.checked = item === selectedItem;
        item.tabIndex = item === selectedItem ? 0 : -1;
      });

      this.value = selectedItem.value;
    } else {
      // Unselect all items
      if (!selectedItem) {
        radioItems.forEach(item => {
          item.checked = false;
          item.tabIndex = -1;
        });
        radioItems[0].tabIndex = 0;
        this.value = '';
      }
    }
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const firstItem = this.getItems()[0];
    const hasCustomValidity = this.customValidity?.length > 0;
    const hasMissingValue = this.required && !this.value;
    const validationMessage = hasCustomValidity ? this.customValidity : VALIDATION_MESSAGE;
    const flags: ValidityStateFlags = {
      customError: hasCustomValidity,
      valueMissing: hasMissingValue
    };
    this.isInvalid = hasCustomValidity ? true : hasMissingValue;
    this.internals.setValidity(flags, validationMessage, firstItem);
  }

  render() {
    return html`
      <label id="label" part="label" for="text-box" @click=${this.handleLabelClick}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="group"
        part="group"
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="description"
        @click=${this.handleGroupClick}
        @keydown=${this.handleGroupKeyDown}
      >
        <slot @slotchange=${this.resetRovingTabIndex}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-radio': QuietRadio;
  }
}
