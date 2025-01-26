import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { getSlotHtml } from '../../utilities/html.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './select.styles.js';

/**
 * <quiet-select>
 *
 * @summary Selects let users choose an option from a predefined list of options.
 * @documentation https://quietui.org/docs/components/select
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The select's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The select's description. For plain-text descriptions, you can use the `description` attribute
 *  instead.
 * @slot start - An icon or similar element to place before the label. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the label. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the select loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the select's value.
 * @event quiet-focus - Emitted when the select receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the select receives input.
 *
 * @csspart label - The element that contains the select's label.
 * @csspart description - The element that contains the select's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart text-box - The internal text box, a `<select>` element.
 * @csspart chevron - The chevron icon, a `<quiet-icon>` element.
 * @csspart chevron__svg - The chevron icon's `<svg>` part.
 *
 * @cssstate disabled - Applied when the select is disabled.
 * @cssstate blank - Applied when the select has no selected option.
 * @cssstate focused - Applied when the select has focus.
 * @cssstate user-valid - Applied when the select is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the select is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-select')
export class QuietSelect extends QuietElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;

  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;
  @query('#text-box') private textBox: HTMLSelectElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;
  @state() options: string;

  /**
   * The select's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The select's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the select. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The select's value. */
  @property() value = '';

  /** Disables the select. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the select a read-only field. */
  @property({ type: Boolean }) readonly = false;

  /** The type of select to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The select's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the select in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the select required. Form submission will not be allowed when this is set and the select is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * You can provide a custom error message to force the select to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /**
   * Tells the browser how to autocomplete the select. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete: string;

  /** Sets the enter key label on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  firstUpdated() {
    // Re-sync when options change
    const observer = new MutationObserver(() => this.syncOptions());
    observer.observe(this, { subtree: true, childList: true, attributes: true });

    // Initial sync
    this.syncOptions();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProperties.has('value')) {
      this.customStates.set('blank', this.value === '');
      this.internals.setFormValue(this.value);
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
    this.value = this.getAttribute('value') ?? '';
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleVisualBoxPointerDown(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const isBox = target?.id === 'visual-box';
    const isSlot = target.hasAttribute('slot');

    // Allows clicking on the non-<select> portion of the control to focus it
    if (isBox || isSlot) {
      event.preventDefault();
      this.textBox.focus();
      this.textBox?.showPicker();
    }
  }

  private handleChange() {
    this.wasChanged = true;
    this.dispatchEvent(new QuietChangeEvent());

    // The native change event isn't composed, so we need to dispatch it ourselves
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
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

  private async handleInput() {
    this.value = this.textBox.value;
    await this.updateComplete;
    this.dispatchEvent(new QuietInputEvent());
  }

  private syncOptions() {
    this.textBox.innerHTML = getSlotHtml(this.defaultSlot);

    if (this.value) {
      this.textBox.value = this.value;
    } else {
      const firstOption = this.textBox.querySelector('option');
      if (firstOption) {
        this.value = firstOption.value;
      }
    }
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.customValidity?.length > 0;
    const validationMessage = hasCustomValidity ? this.customValidity : this.textBox.validationMessage;
    const flags: ValidityStateFlags = {
      badInput: this.textBox.validity.tooShort,
      customError: hasCustomValidity,
      patternMismatch: this.textBox.validity.patternMismatch,
      rangeOverflow: this.textBox.validity.rangeOverflow,
      rangeUnderflow: this.textBox.validity.rangeUnderflow,
      stepMismatch: this.textBox.validity.stepMismatch,
      tooLong: this.textBox.validity.tooLong,
      tooShort: this.textBox.validity.tooShort,
      typeMismatch: this.textBox.validity.typeMismatch,
      valueMissing: this.textBox.validity.valueMissing
    };

    this.isInvalid = hasCustomValidity ? true : !this.textBox.validity.valid;
    this.internals.setValidity(flags, validationMessage, this.textBox);
  }

  /** Sets focus to the select. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the select. */
  public blur() {
    this.textBox.blur();
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
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');

    return html`
      <label id="label" part="label" for="text-box" class=${classMap({ 'visually-hidden': !hasLabel })}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ 'visually-hidden': !hasDescription })}>
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="visual-box"
        part="visual-box"
        class=${classMap({
          // Appearances
          normal: this.appearance === 'normal',
          filled: this.appearance === 'filled',
          unstyled: this.appearance === 'unstyled',
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // Modifiers
          pill: this.pill,
          // States
          disabled: this.disabled
        })}
        @pointerdown=${this.handleVisualBoxPointerDown}
      >
        <slot name="start"></slot>

        <select
          id="text-box"
          part="text-box"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocomplete=${ifDefined(this.autocomplete)}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        ></select>

        <slot hidden></slot>

        <slot name="end"></slot>

        <quiet-icon
          id="chevron"
          part="chevron"
          exportparts="svg:chevron__svg"
          library="system"
          name="selector"
        ></quiet-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-select': QuietSelect;
  }
}
