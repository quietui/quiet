import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './text-area.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-text-area>
 *
 * @summary Text area let users edit multi-line, plain text content.
 * @documentation https://quietui.com/docs/components/text-area
 * @status stable
 * @since 1.0
 *
 * @slot label - The text area's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The text area's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @prop {string} form - If the text area is located outside of a form, you can associate it by setting this to the
 *  form's `id`.
 *
 * @event quiet-blur - Emitted when the text area loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the text area's value.
 * @event quiet-focus - Emitted when the text area receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the text area receives input.
 *
 * @csspart label - The element that contains the text area's label.
 * @csspart description - The element that contains the text area's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart text-box - The internal text box, a `<textarea>` element.
 *
 * @cssstate disabled - Applied when the text area is disabled.
 * @cssstate empty - Applied when the text area is empty.
 * @cssstate focused - Applied when the text area has focus.
 * @cssstate user-valid - Applied when the text area is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the text area is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-text-area')
export class QuietTextArea extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private resizeObserver: ResizeObserver;

  @query('textarea') private textBox: HTMLInputElement;

  @state() private isInvalid = false;
  @state() private wasChanged = false;
  @state() private wasSubmitted = false;

  /**
   * The text area's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The text area's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the text area. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The text area's value. */
  @property() value = '';

  /** A placeholder to show in the text area when it's empty. */
  @property() placeholder: string;

  /** Disables the text area. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the text area a read-only area. */
  @property({ type: Boolean }) readonly = false;

  /** Determines how the text area can be resized. */
  @property() resize: 'vertical' | 'auto' | 'none' = 'vertical';

  /** The default number of rows visible in the text area. */
  @property({ type: Number }) rows = 3;

  /** The type of text area to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The text area's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Makes the text area required. Form submission will not be allowed when this is set and the text area is empty.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The minimum string length that will be considered valid. */
  @property({ attribute: 'minlength', type: Number }) minLength: number;

  /** The maximum string length that will be considered valid. */
  @property({ attribute: 'maxlength', type: Number }) maxLength: number;

  /**
   * You can provide a custom error message to force the text area to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Turns autocapitalize on or off in supported browsers. */
  @property() autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  /**
   * Tells the browser how to autocomplete the text area. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete: string;

  /** Turns autocorrect on or off in supported browsers. */
  @property() autocorrect: 'off' | 'on';

  /** Tells the browser to focus the text area when the page loads or a dialog is shown. */
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

    // Update auto-height when the text area is resized
    this.resizeObserver = new ResizeObserver(() => this.updateHeight());
    this.updateComplete.then(() => {
      this.updateHeight();
      this.resizeObserver.observe(this.textBox);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);

    if (this.textBox) {
      this.resizeObserver.unobserve(this.textBox);
    }
  }

  updated(changedProps: Map<string, unknown>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProps.has('value')) {
      this.customStates.set('empty', this.value === '');
    }

    // Handle disabled
    if (changedProps.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    // Handle auto-size
    if (changedProps.has('value') || changedProps.has('rows')) {
      this.updateHeight();
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

  private handleInput(event: InputEvent) {
    this.value = this.textBox.value;
    this.internals.setFormValue(this.value);
    this.dispatchEvent(new QuietInputEvent());
    this.relayNativeEvent(event);
  }

  /** Updates the height of the text area based on its content and settings. */
  private updateHeight() {
    if (this.resize === 'auto') {
      this.textBox.style.height = 'auto';
      this.textBox.style.height = `${this.textBox.scrollHeight}px`;
    } else {
      // @ts-expect-error - we're unsetting this value
      this.textBox.style.height = undefined;
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

  /** Sets focus to the text area. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the text area. */
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

  /** Selects all text in the text area. */
  public select() {
    this.textBox.select();
  }

  /** Sets the start and end positions of the current text selection in the text area. */
  public setSelectionRange(start: number, end: number, direction: 'forward' | 'backward' | 'none' = 'none') {
    this.textBox.setSelectionRange(start, end, direction);
  }

  /** Replaces a range of text in the text area with a new string. */
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

  render() {
    return html`
      <label id="label" part="label" for="text-box">
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
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
          'resize-vertical': this.resize === 'vertical',
          'resize-auto': this.resize === 'auto',
          'resize-none': this.resize === 'none',
          // States
          disabled: this.disabled
        })}
      >
        <textarea
          id="text-box"
          part="text-box"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}
          .value=${live(this.value) /* live() is required for proper validation */}
          rows=${this.rows}
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
        ></textarea>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-text-area': QuietTextArea;
  }
}
