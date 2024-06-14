import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './switch.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-switch>
 *
 * @summary Switches let the user toggle between two mutually exclusive states, such as on and off.
 * @documentation https://quietui.com/docs/components/switch
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The switch's label.
 * @slot off-label - The label to show when the switch is off.
 * @slot on-label - The label to show when the switch is on.
 *
 * @event quiet-blur - Emitted when the switch loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the switch's value.
 * @event quiet-focus - Emitted when the switch receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the switch receives input.
 *
 * @csspart label - The `<label>` that wraps the entire control.
 * @csspart visual-box - The element that wraps the internal switch.
 * @csspart switch - The internal switch, an `<input type="checkbox" role="switch">` element.
 * @csspart thumb - The switch's thumb.
 * @csspart on-label - The container wrapping the `on-label`.
 * @csspart off-label - The container wrapping the `off-label`.
 *
 * @cssstate disabled - Applied when the switch is disabled.
 * @cssstate focused - Applied when the switch has focus.
 * @cssstate user-valid - Applied when the switch is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the switch is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-switch')
export class QuietSwitch extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  /** A reference to the `<form>` associated with the form control, or null if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;

  @query('input[type="checkbox"]') private switch: HTMLInputElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

  /**
   * The switch's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The switch's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the switch. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The switch's value. */
  @property() value = '';

  /** The switch's checked state. */
  @property({ type: Boolean }) checked = false;

  /** Disables the switch. */
  @property({ type: Boolean }) disabled = false;

  /** The switch's size. */
  @property() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Makes the switch required. Form submission will not be allowed until the switch is checked.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * You can provide a custom error message to force the switch to be invalid. To clear the error, set this to an
   * empty string.
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

  updated(changedProps: Map<string, unknown>) {
    // Always be updating
    this.updateValidity();

    // Handle disabled
    if (changedProps.has('disabled')) {
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

  /** @internal Called when the associated form element changes. */
  formAssociatedCallback(form: HTMLFormElement | null) {
    this.associatedForm = form;
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
    this.internals.setFormValue(this.value);
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleChange(event: Event) {
    this.wasChanged = true;
    this.dispatchEvent(new QuietChangeEvent());
    this.relayNativeEvent(event);
  }

  private handleInput(event: InputEvent) {
    this.dispatchEvent(new QuietInputEvent());
    this.relayNativeEvent(event);
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.disabled) {
      this.handleClick();
    }
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
    const hasCustomValidity = this.customValidity?.length > 0;
    const validationMessage = hasCustomValidity ? this.customValidity : this.switch.validationMessage;
    const flags: ValidityStateFlags = {
      customError: hasCustomValidity,
      valueMissing: this.switch.validity.valueMissing
    };
    this.isInvalid = hasCustomValidity ? true : !this.switch.validity.valid;
    this.internals.setValidity(flags, validationMessage, this.switch);
  }

  /** Sets focus to the switch. */
  public focus() {
    this.switch.focus();
  }

  /** Removes focus from the switch. */
  public blur() {
    this.switch.blur();
  }

  /**
   * Checks if the form control has any restraints and whether it satisfies them. If invalid, `false` will be returned
   * and the `invalid` event will be dispatched. If valid, `true` will be returned.
   */
  public checkValidity() {
    return this.internals.checkValidity();
  }

  /**
   * Checks if the form control has any restraints and whether it satisfies them. If invalid, `false` will be returned
   * and the `invalid` event will be dispatched. In addition, the problem will be reported to the user. If valid, `true`
   * will be returned.
   */
  public reportValidity() {
    return this.internals.reportValidity();
  }

  render() {
    return html`
      <label part="label" id="label">
        <div
          id="visual-box"
          part="visual-box"
          class=${classMap({
            /* Sizes */
            xs: this.size === 'xs',
            sm: this.size === 'sm',
            md: this.size === 'md',
            lg: this.size === 'lg',
            xl: this.size === 'xl',
            /* States */
            checked: this.checked,
            disabled: this.disabled,
            required: this.required
          })}
        >
          <input
            id="switch"
            part="switch"
            type="checkbox"
            name=${ifDefined(this.name)}
            value=${ifDefined(this.value)}
            role="switch"
            aria-checked=${this.checked ? 'true' : 'false'}
            .checked=${live(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            @change=${this.handleChange}
            @click=${this.handleClick}
            @input=${this.handleInput}
            @keyup=${this.handleKeyUp}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          <span id="on-label" part="on-label"><slot name="on-label"></slot></span>
          <span id="off-label" part="off-label"><slot name="off-label"></slot></span>
          <span id="thumb" part="thumb"></span>
        </div>
        <slot>${this.label}</slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-switch': QuietSwitch;
  }
}
