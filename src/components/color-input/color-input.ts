// @ts-nocheck
import '../color-picker/color-picker.js';
import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { Localize } from '../../utilities/localize.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './color-input.styles.js';
import type { CSSResultGroup } from 'lit';

const isEyeDropperSupported = 'EyeDropper' in window;

interface SetColorOptions {
  /** When true, change and inputs events will be emitted. */
  withEvents: boolean;
}

/**
 * <quiet-color-input>
 *
 * @summary Color inputs let you choose a color and submit it as form data.
 * @documentation https://quietui.com/docs/components/color-input
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 * @dependency quiet-color-picker
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-color-input')
export class QuietColorInput extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private localize = new Localize(this);

  @query('input') private textBox: HTMLInputElement;

  @state() private isInvalid = false;
  // @state() private hue = 0;
  // @state() private satuation = 100;
  // @state() private brightness = 100;
  // @state() private opacity = 100;
  @state() private wasChanged = false;
  @state() private wasSubmitted = false;

  /**
   * The color input's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The color input's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the color input. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The color input's value. */
  @property() value = '';

  /** A placeholder to show in the color input when it's empty. */
  @property() placeholder: string;

  /** Disables the color input. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the color input a read-only field. */
  @property({ type: Boolean }) readonly = false;

  /** Adds a clear button to the color input when it's not empty. */
  @property({ type: Boolean }) clearable = false;

  /** The type of color input to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The color input's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the color input in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /**
   * Makes the color input required. Form submission will not be allowed when this is set and the color input is
   * empty.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** A regular expression the value should match to be considered valid. */
  @property() pattern: string;

  /**
   * You can provide a custom error message to force the color input to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Tells the browser to focus the color input when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

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

  private formatHue(value: number) {
    return this.localize.number(value, { style: 'unit', unit: 'degree', unitDisplay: 'narrow' });
  }

  private formatOpacity(value: number) {
    return this.localize.number(value / 100, { style: 'percent' });
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
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

  private handleChange(event: Event) {
    this.wasChanged = true;
    this.dispatchEvent(new QuietChangeEvent());
    this.relayNativeEvent(event);
  }

  private handleClearClick() {
    this.value = '';
    this.textBox.focus();
    this.dispatchEvent(new QuietInputEvent());
  }

  private handleEyeDropperClick() {
    if (!isEyeDropperSupported) {
      return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then(colorSelectionResult => {
        this.setColor(colorSelectionResult.sRGBHex, {
          withEvents: true
        });
      })
      .catch(() => {
        /* cancelled by user */
      });
  }

  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  }

  private handleTextBoxButtonPointerDown(event: PointerEvent) {
    // Prevent the number field from losing focus when text box buttons are activated
    event.preventDefault();
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

  private handleKeyDown(event: KeyboardEvent) {
    // When enter is pressed in a color input, the associated form should submit
    if (event.key === 'Enter' && this.associatedForm) {
      const submitter = [...this.associatedForm.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.associatedForm.requestSubmit(submitter);
    }
  }

  private setColor(color: string, options: Partial<SetColorOptions>) {
    const opts: SetColorOptions = {
      withEvents: false,
      ...options
    };
    const oldValue = this.value;

    console.log(opts);

    //
    // TODO - parse color here
    //
    this.value = color;

    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new QuietInputEvent());

      // Dispatch native change/input events for better framework binding support
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new Event('change'));

      this.wasChanged = true;
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

  /** Sets focus to the color input. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the color input. */
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

  /** Selects all text in the color input. */
  public select() {
    this.textBox.select();
  }

  /** Sets the start and end positions of the current text selection in the color input. */
  public setSelectionRange(start: number, end: number, direction: 'forward' | 'backward' | 'none' = 'none') {
    this.textBox.setSelectionRange(start, end, direction);
  }

  /** Replaces a range of text in the color input with a new string. */
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

  /** For types that support a input, such as color and date selectors, this will cause the input to show. */
  public showinput() {
    // this.textBox.showinput();
  }

  /**
   * When a supported `type` is used, this method will decrease the color input's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepDown() {
    this.textBox.stepDown();
  }

  /**
   * When a supported `type` is used, this method will increase the color input's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepUp() {
    this.textBox.stepUp();
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
          pill: this.pill,
          // States
          disabled: this.disabled
        })}
        @pointerdown=${this.handleVisualBoxPointerDown}
      >
        <span id="color-preview" class="transparent-bg" style="--color: "></span>

        <input
          id="text-box"
          part="text-box"
          type="text"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          pattern=${ifDefined(this.pattern)}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode="text"
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

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
        ${isEyeDropperSupported && !this.disabled && !this.readonly
          ? html`
              <button
                id="eye-dropper-button"
                part="eye-dropper-button"
                class="text-box-button"
                type="button"
                aria-label="TODO"
                tabindex="-1"
                @pointerdown=${this.handleTextBoxButtonPointerDown}
                @click=${this.handleEyeDropperClick}
              >
                <quiet-icon library="system" name="color-picker"></quiet-icon>
              </button>
            `
          : ''}

        <slot name="end"></slot>
      </div>

      <quiet-color-picker with-opacity></quiet-color-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-color-input': QuietColorInput;
  }
}

interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;
