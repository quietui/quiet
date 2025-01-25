import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './text-field.styles.js';

/**
 * <quiet-text-field>
 *
 * @summary Text fields let users input and edit text.
 * @documentation https://quietui.org/docs/components/text-field
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The text field's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The text field's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 * @slot start - An icon or similar element to place before the label. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the label. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the text field loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the text field's value.
 * @event quiet-focus - Emitted when the text field receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the text field receives input.
 *
 * @csspart label - The element that contains the text field's label.
 * @csspart description - The element that contains the text field's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart text-box - The internal text box, an `<input>` element.
 * @csspart clear-button - The clear button, a `<button>` element.
 * @csspart password-toggle-button - The password toggle button, a `<button>` element.
 *
 * @cssstate disabled - Applied when the text field is disabled.
 * @cssstate blank - Applied when the text field has a blank value.
 * @cssstate focused - Applied when the text field has focus.
 * @cssstate user-valid - Applied when the text field is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the text field is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-text-field')
export class QuietTextField extends QuietElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private localize = new Localize(this);

  @query('input') private textBox: HTMLInputElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;
  @state() isPasswordVisible = false;

  /**
   * The text field's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The text field's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the text field. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The text field's value. */
  @property() value = '';

  /** A placeholder to show in the text field when it's blank. */
  @property() placeholder: string;

  /** Disables the text field. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the text field a read-only field. */
  @property({ type: Boolean }) readonly = false;

  /** Adds a clear button to the text field when it's not blank. */
  @property({ type: Boolean }) clearable = false;

  /** The type of text field to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The text field's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the text field in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The type of data the text field will accept. */
  @property() type:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = 'text';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the text field required. Form submission will not be allowed when this is set and the text field is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** A regular expression the value should match to be considered valid. */
  @property() pattern: string;

  /** The minimum string length that will be considered valid. */
  @property({ attribute: 'minlength', type: Number }) minLength: number;

  /** The maximum string length that will be considered valid. */
  @property({ attribute: 'maxlength', type: Number }) maxLength: number;

  /** The minimum value for date/time types. */
  @property({ type: Number }) min: number;

  /** The maximum value for date/time types. */
  @property({ type: Number }) max: number;

  /** The granularity the value must adhere to when incrementing and decrementing. */
  @property() step: number | 'any';

  /**
   * You can provide a custom error message to force the text field to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Turns autocapitalize on or off in supported browsers. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /**
   * Tells the browser how to autocomplete the text field. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete: string;

  /** Turns autocorrect on or off in supported browsers. */
  @property() autocorrect: 'off' | 'on';

  /** Tells the browser to focus the text field when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Sets the enter key label on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /**
   * Provides the browser with a hint about the type of data that might be entered by the user, allowing the appropriate
   * virtual keyboard to be displayed on supported devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Turns spell checking on or off in supported browsers. */
  @property({
    type: Boolean,
    converter: {
      fromAttribute: value => (!value || value === 'false' ? false : true),
      toAttribute: value => (value ? 'true' : 'false')
    }
  })
  spellcheck: boolean;

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

  private handleChange(event: Event) {
    this.wasChanged = true;
    this.dispatchEvent(new QuietChangeEvent());
    this.relayNativeEvent(event);
  }

  private handleClearClick() {
    this.value = '';
    this.textBox.focus();
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
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

  private async handleInput(event: InputEvent) {
    this.value = this.textBox.value;
    await this.updateComplete;
    this.dispatchEvent(new QuietInputEvent());
    this.relayNativeEvent(event);
  }

  private handleKeyDown(event: KeyboardEvent) {
    // When enter is pressed in a text field, the associated form should submit
    if (event.key === 'Enter' && this.associatedForm) {
      const submitter = [...this.associatedForm.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.associatedForm.requestSubmit(submitter);
    }
  }

  private handlePasswordToggleClick() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.textBox.focus();
  }

  private handleTextBoxButtonPointerDown(event: PointerEvent) {
    // Prevent the number field from losing focus when text box buttons are activated
    event.preventDefault();
  }

  private handleVisualBoxPointerDown(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const isBox = target?.id === 'visual-box';
    const isSlot = target.hasAttribute('slot');

    if (isBox || isSlot) {
      event.preventDefault();
      this.textBox.focus();
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

  /** Sets focus to the text field. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the text field. */
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

  /** Selects all text in the text field. */
  public select() {
    this.textBox.select();
  }

  /** Sets the start and end positions of the current text selection in the text field. */
  public setSelectionRange(start: number, end: number, direction: 'forward' | 'backward' | 'none' = 'none') {
    this.textBox.setSelectionRange(start, end, direction);
  }

  /** Replaces a range of text in the text field with a new string. */
  public setRangeText(
    replacement: string,
    start?: number,
    end?: number,
    selectMode?: 'select' | 'start' | 'end' | 'preserve'
  ) {
    this.textBox.setRangeText(
      replacement,
      start ?? this.textBox.selectionStart!,
      end ?? this.textBox.selectionEnd!,
      selectMode
    );
    this.value = this.textBox.value;
  }

  /** For types that support a picker, such as color and date selectors, this will cause the picker to show. */
  public showPicker() {
    this.textBox.showPicker();
  }

  /**
   * When a supported `type` is used, this method will decrease the text field's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepDown() {
    this.textBox.stepDown();
  }

  /**
   * When a supported `type` is used, this method will increase the text field's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepUp() {
    this.textBox.stepUp();
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

        <input
          id="text-box"
          part="text-box"
          type=${this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          pattern=${ifDefined(this.pattern)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as number)}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocapitalize=${ifDefined(this.autocapitalize)}
          autocomplete=${ifDefined(this.autocomplete)}
          autocorrect=${ifDefined(this.autocorrect)}
          spellcheck=${ifDefined(this.spellcheck)}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        ${this.type === 'password' && this.value?.length > 0 && !this.disabled && !this.readonly
          ? html`
              <button
                id="password-toggle-button"
                part="toggle-password-button"
                class="text-box-button"
                type="button"
                aria-label=${this.localize.term(this.isPasswordVisible ? 'hidePassword' : 'showPassword')}
                tabindex="-1"
                @pointerdown=${this.handleTextBoxButtonPointerDown}
                @click=${this.handlePasswordToggleClick}
              >
                <quiet-icon library="system" name=${this.isPasswordVisible ? 'eye-off' : 'eye'}></quiet-icon>
              </button>
            `
          : ''}
        ${this.clearable && this.value?.length > 0 && !this.disabled && !this.readonly
          ? html`
              <button
                id="clear-button"
                part="clear-button"
                class="text-box-button"
                type="button"
                aria-label=${this.localize.term('clearEntry')}
                tabindex="-1"
                @pointerdown=${this.handleTextBoxButtonPointerDown}
                @click=${this.handleClearClick}
              >
                <quiet-icon library="system" name="circle-x"></quiet-icon>
              </button>
            `
          : ''}

        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-text-field': QuietTextField;
  }
}
