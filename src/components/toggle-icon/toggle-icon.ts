import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import styles from './toggle-icon.styles.js';

// Borrow the checkbox's validation message
const nativeFileInput = document.createElement('input');
nativeFileInput.name = 'quiet-faux-input';
nativeFileInput.type = 'checkbox';
nativeFileInput.required = true;
const VALIDATION_MESSAGE = nativeFileInput.validationMessage;

/**
 * <quiet-toggle-icon>
 *
 * @summary Similar to checkboxes, except with icons to represent the checked and unchecked states.
 * @documentation https://quietui.org/docs/components/toggle-icon
 * @status stable
 * @since 1.0
 *
 * @slot checked - The icon to show when checked. Works best with a `<quiet-icon>` element.
 * @slot unchecked - The default icon to show when unchecked. Works best with a `<quiet-icon>` element.
 *
 * @event quiet-blur - Emitted when the toggle icon loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the toggle's value.
 * @event quiet-focus - Emitted when the checkbox receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the checkbox receives input.
 *
 * @csspart button - The internal button that contains the toggle icons, a `<button>` element.
 *
 * @cssproperty [--animation-speed=300ms] - The animation speed to use when effects are selected.
 * @cssproperty [--checked-color=#f59e0b] - The color to use for checked toggle icons.
 * @cssproperty [--unchecked-color=var(--quiet-neutral-fill-mid)] - The color to use for unchecked toggle icons.
 *
 * @cssstate checked - Applied when the toggle icon is active.
 * @cssstate disabled - Applied when the toggle icon is disabled.
 * @cssstate focused - Applied when the toggle icon has focus.
 * @cssstate user-valid - Applied when the toggle icon is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the toggle icon is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-toggle-icon')
export class QuietToggleIcon extends QuietFormControlElement {
  static shadowRootOptions = { ...QuietFormControlElement.shadowRootOptions, delegatesFocus: true };
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  protected get focusableAnchor() {
    return this.button;
  }

  @query('button') button: HTMLButtonElement;

  @state() isInvalid = false;
  @state() hadUserInteraction = false;
  @state() wasSubmitted = false;

  /** The toggle icon's label. The label won't be displayed, but it will be announced by assistive devices. */
  @property() label: string;

  /** The name of the toggle icon. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The toggle icon's value. */
  @property() value = '';

  /** The toggle icon's checked state. */
  @property({ type: Boolean }) checked = false;

  /** Disables the toggle icon. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The checkbox's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** The animation to use when toggling. */
  @property({ reflect: true }) effect: 'fade' | 'scale' | 'flip-x' | 'flip-y' | 'translate-x' | 'translate-y' | 'none' =
    'none';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the toggle icon required. Form submission will not be allowed until the toggle icon is checked.
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

    if (changedProperties.has('checked') || changedProperties.has('value')) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }

    if (changedProperties.has('checked')) {
      this.customStates.set('checked', this.checked);
    }

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
  }

  /** @internal Called when a containing fieldset is disabled. */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** @internal Called when the form is reset. */
  formResetCallback() {
    this.isInvalid = false;
    this.hadUserInteraction = false;
    this.wasSubmitted = false;
    this.checked = this.hasAttribute('checked');
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new QuietChangeEvent());
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new InputEvent('input'));
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
    const validationMessage = hasCustomValidity ? this.getCustomValidity() : VALIDATION_MESSAGE;
    const flags: ValidityStateFlags = {
      customError: hasCustomValidity,
      valueMissing: this.required && !this.checked
    };
    this.isInvalid = hasCustomValidity ? true : !this.checked;
    this.internals.setValidity(flags, validationMessage, this.focusableAnchor);
  }

  render() {
    return html`
      <button
        part="button"
        class=${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          checked: this.checked,
          disabled: this.disabled
        })}
        data-effect=${this.effect}
        name=${this.name}
        value=${this.value}
        type="button"
        aria-label=${this.label}
        aria-pressed=${this.checked ? 'true' : 'false'}
        .disabled=${this.disabled}
        .required=${this.required}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="unchecked" class="unchecked-icon">
          <quiet-icon name="star" family="outline" library="system"></quiet-icon>
        </slot>
        <slot name="checked" class="checked-icon">
          <quiet-icon name="star" family="filled" library="system"></quiet-icon>
        </slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-toggle-icon': QuietToggleIcon;
  }
}
