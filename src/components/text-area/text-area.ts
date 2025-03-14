import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import styles from './text-area.styles.js';

/**
 * <quiet-text-area>
 *
 * @summary Text areas let users edit multi-line, plain text content.
 * @documentation https://quietui.org/docs/components/text-area
 * @status stable
 * @since 1.0
 *
 * @slot label - The text area's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The text area's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
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
 * @cssstate blank - Applied when the text area has a blank value.
 * @cssstate focused - Applied when the text area has focus.
 * @cssstate user-valid - Applied when the text area is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the text area is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-text-area')
export class QuietTextArea extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private resizeObserver: ResizeObserver;
  private textAreaAutoSizer: HTMLTextAreaElement = document.createElement('textarea');
  protected get focusableAnchor() {
    return this.textBox;
  }

  @query('textarea') private textBox: HTMLInputElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

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

  /** A placeholder to show in the text area when it's blank. */
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
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the text area required. Form submission will not be allowed when this is set and the text area is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The minimum string length that will be considered valid. */
  @property({ attribute: 'minlength', type: Number }) minLength: number;

  /** The maximum string length that will be considered valid. */
  @property({ attribute: 'maxlength', type: Number }) maxLength: number;

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

    // Handle auto-size
    if (changedProperties.has('value') || changedProperties.has('rows')) {
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

  /** Updates the height of the text area based on its content and settings. */
  private updateHeight() {
    if (this.resize === 'auto') {
      //
      // To measure the correct height of a resizable text area, we create a mirror element and copy over the value. The
      // resulting scrollHeight is the measurement we're looking for. Once we get it, we immediately disconnect the
      // sizer element from the DOM.
      //
      // Previous solutions involved setting the original text area's height to `auto`, capturing its scrollHeight, and
      // then setting the height to match. However, this causes the page to jump back to the top sometimes. Using a
      // separate sizing element (that never has focus) prevents this.
      //
      // NOTE: We'll soon be able to use `field-sizing: content` for this: https://caniuse.com/?search=field-sizing)
      //
      this.textAreaAutoSizer.id = this.textBox.id; // briefly use the same ID to match styles
      this.textAreaAutoSizer.inert = true;
      this.textAreaAutoSizer.value = this.value;
      this.textAreaAutoSizer.style.position = 'absolute';
      this.textAreaAutoSizer.style.top = '0';
      this.textAreaAutoSizer.style.left = '0';
      this.textAreaAutoSizer.style.width = '100%';
      this.textAreaAutoSizer.style.height = 'auto';
      this.textAreaAutoSizer.style.pointerEvents = 'none';
      this.textAreaAutoSizer.style.opacity = '0';
      this.textBox.insertAdjacentElement('afterend', this.textAreaAutoSizer);
      this.textBox.style.height = `${this.textAreaAutoSizer.scrollHeight}px`;
      this.textAreaAutoSizer.remove();
      this.textAreaAutoSizer.id = '';
    }
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.getCustomValidity().length > 0;
    const validationMessage = hasCustomValidity ? this.getCustomValidity() : this.textBox.validationMessage;
    const flags: ValidityStateFlags = {
      badInput: this.textBox.validity.badInput,
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
    this.internals.setValidity(flags, validationMessage, this.focusableAnchor);
  }

  /** Sets focus to the text area. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the text area. */
  public blur() {
    this.textBox.blur();
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
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');

    return html`
      <label id="label" part="label" for="text-box" class=${classMap({ vh: !hasLabel })}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ vh: !hasDescription })}>
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
          autocomplete=${ifDefined(this.autocomplete) as any}
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
