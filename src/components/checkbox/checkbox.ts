import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './checkbox.styles.js';

/**
 * <quiet-checkbox>
 *
 * @summary Checkboxes let users select one or more options from a list or toggle single options on and off.
 * @documentation https://quietui.org/docs/components/checkbox
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The checkbox's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @event quiet-blur - Emitted when the checkbox loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the checkbox's value.
 * @event quiet-focus - Emitted when the checkbox receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the checkbox receives input.
 *
 * @csspart label - The `<label>` that wraps the entire control.
 * @csspart visual-box - The element that wraps the internal checkbox.
 * @csspart check-icon - The check icon, a `<quiet-icon>` element.
 * @csspart check-icon__svg - The check icon's `svg` part.
 * @csspart indeterminate-icon - The indeterminate icon, a `<quiet-icon>` element.
 * @csspart indeterminate-icon__svg - The indeterminate icon's `<svg>` part.
 *
 * @cssstate checked - Applied when the checkbox is checked.
 * @cssstate disabled - Applied when the checkbox is disabled.
 * @cssstate focused - Applied when the checkbox has focus.
 * @cssstate user-valid - Applied when the checkbox is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the checkbox is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-checkbox')
export class QuietCheckbox extends QuietFormControlElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  protected get focusableAnchor() {
    return this.checkbox;
  }

  @query('input[type="checkbox"]') private checkbox: HTMLInputElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

  /**
   * The checkbox's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /** The name of the checkbox. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The checkbox's value. */
  @property() value = '';

  /** The checkbox's checked state. */
  @property({ type: Boolean }) checked = false;

  /** Puts the checkbox in an indeterminate state. */
  @property({ type: Boolean }) indeterminate = false;

  /** Disables the checkbox. */
  @property({ type: Boolean }) disabled = false;

  /** The type of checkbox to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' = 'normal';

  /** The checkbox's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the checkbox required. Form submission will not be allowed until the checkbox is checked.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProperties.has('checked') || changedProperties.has('value')) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }

    // Handle checked
    if (changedProperties.has('checked')) {
      this.customStates.set('checked', this.checked);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
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

  /** @internal Called when a containing fieldset is disabled. */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** @internal Called when the form is reset. */
  formResetCallback() {
    this.isInvalid = false;
    this.wasChanged = false;
    this.wasSubmitted = false;
    this.checked = this.hasAttribute('checked');
  }

  private handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleChange() {
    this.wasChanged = true;
    this.dispatchEvent(new QuietChangeEvent());

    // The native change event isn't composed, so we need to dispatch it ourselves
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleInput() {
    this.dispatchEvent(new QuietInputEvent());
  }

  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
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

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.getCustomValidity().length > 0;
    const validationMessage = hasCustomValidity ? this.getCustomValidity() : this.checkbox.validationMessage;
    const flags: ValidityStateFlags = {
      customError: hasCustomValidity,
      valueMissing: this.checkbox.validity.valueMissing
    };
    this.isInvalid = hasCustomValidity ? true : !this.checkbox.validity.valid;
    this.internals.setValidity(flags, validationMessage, this.focusableAnchor);
  }

  /** Sets focus to the checkbox. */
  public focus() {
    this.checkbox.focus();
  }

  /** Removes focus from the checkbox. */
  public blur() {
    this.checkbox.blur();
  }

  render() {
    return html`
      <label id="label" part="label">
        <div
          id="visual-box"
          part="visual-box"
          class=${classMap({
            /* Appearances */
            normal: this.appearance === 'normal',
            filled: this.appearance === 'filled',
            /* Sizes */
            xs: this.size === 'xs',
            sm: this.size === 'sm',
            md: this.size === 'md',
            lg: this.size === 'lg',
            xl: this.size === 'xl',
            /* States */
            checked: this.checked,
            indeterminate: this.indeterminate,
            disabled: this.disabled,
            required: this.required
          })}
        >
          <input
            id="checkbox"
            type="checkbox"
            value=${ifDefined(this.value)}
            .indeterminate=${live(this.indeterminate)}
            .checked=${live(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            @change=${this.handleChange}
            @click=${this.handleClick}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          <quiet-icon
            id="check-icon"
            part="check-icon"
            exportparts="svg:check-icon__svg"
            library="system"
            name="check"
          ></quiet-icon>
          <quiet-icon
            id="indeterminate-icon"
            part="indeterminate-icon"
            exportparts="svg:indeterminate-icon__svg"
            library="system"
            name="minus"
          ></quiet-icon>
        </div>
        <slot>${this.label}</slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-checkbox': QuietCheckbox;
  }
}
