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
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './number-field.styles.js';

/**
 * <quiet-number-field>
 *
 * @summary Allows users to input and edit numbers.
 * @documentation https://quietui.org/docs/components/number-field
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The number field's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The number field's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 * @slot start - An icon or similar element to place before the label. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the label. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the number field loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the number field's value.
 * @event quiet-focus - Emitted when the number field receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the number field receives input.
 *
 * @csspart label - The element that contains the number field's label.
 * @csspart description - The element that contains the number field's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart text-box - The internal text box, an `<input>` element.
 * @csspart stepper - The up and down stepper buttons.
 * @csspart stepper-up - The up stepper button.
 * @csspart stepper-down - The down stepper button.
 *
 * @cssstate disabled - Applied when the number field is disabled.
 * @cssstate blank - Applied when the number field has a blank value.
 * @cssstate focused - Applied when the number field has focus.
 * @cssstate user-valid - Applied when the number field is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the number field is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-number-field')
export class QuietNumberField extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private localize = new Localize(this);

  protected get focusableAnchor() {
    return this.textBox;
  }

  @query('input') private textBox: HTMLInputElement;

  @state() isInvalid = false;
  @state() hadUserInteraction = false;
  @state() wasSubmitted = false;
  @state() isPasswordVisible = false;

  /**
   * The number field's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The number field's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the number field. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The number field's value. */
  @property() value = '';

  /** A placeholder to show in the number field when it's blank. */
  @property() placeholder: string;

  /** Disables the number field. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the number field a read-only field. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The type of number field to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The number field's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the number field in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the number field required. Form submission will not be allowed when this is set and the number field is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** A regular expression the value should match to be considered valid. */
  @property() pattern: string;

  /** The minimum value for date/time types. */
  @property({ type: Number }) min: number;

  /** The maximum value for date/time types. */
  @property({ type: Number }) max: number;

  /** The granularity the value must adhere to when incrementing and decrementing. */
  @property() step: number | 'any';

  /**
   * Tells the browser how to autocomplete the number field. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete: string;

  /** Tells the browser to focus the number field when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Sets the enter key label on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** When true, the add/subtract steppers won't be displayed. */
  @property({ attribute: 'without-steppers', type: Boolean }) withoutSteppers = false;

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
    this.value = this.getAttribute('value') ?? '';
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleChange() {
    this.hadUserInteraction = true;
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

  private handleDecrease() {
    this.stepDown();
    this.handleInput();

    // Since this isn't triggered by a natural event, dispatch a `change` and `input` here. The `quiet-input` event is
    // dispatched through `handleInput`.
    this.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true, cancelable: false }));
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
    this.dispatchEvent(new QuietChangeEvent());
  }

  private handleIncrease() {
    this.stepUp();
    this.handleInput();

    // Since this isn't triggered by a natural input event, simulate it here
    this.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true, cancelable: false }));
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
    this.dispatchEvent(new QuietChangeEvent());
  }

  private maintainFocusOnPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.focus();
  }

  private async handleInput() {
    this.value = this.textBox.value;
    await this.updateComplete;
    this.dispatchEvent(new QuietInputEvent());
  }

  private handleKeyDown(event: KeyboardEvent) {
    // When enter is pressed in a number field, the associated form should submit
    if (event.key === 'Enter' && this.internals.form) {
      const submitter = [...this.internals.form.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.internals.form.requestSubmit(submitter);
    }
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
    const hasCustomValidity = this.getCustomValidity().length > 0;
    const validationMessage = hasCustomValidity ? this.getCustomValidity() : (this.textBox.validationMessage ?? '');
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

  /** Sets focus to the number field. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the number field. */
  public blur() {
    this.textBox.blur();
  }

  /** Selects all text in the number field. */
  public select() {
    this.textBox.select();
  }

  /** Sets the start and end positions of the current text selection in the number field. */
  public setSelectionRange(start: number, end: number, direction: 'forward' | 'backward' | 'none' = 'none') {
    this.textBox.setSelectionRange(start, end, direction);
  }

  /** Replaces a range of text in the number field with a new string. */
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

  /**
   * When a supported `type` is used, this method will decrease the number field's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepDown() {
    this.textBox.stepDown();
    this.value = this.textBox.value;
    this.focus();
  }

  /**
   * When a supported `type` is used, this method will increase the number field's value by `step`. This is a programmatic
   * change, so `input` and `change` events will not be emitted when this is called.
   */
  public stepUp() {
    this.textBox.stepUp();
    this.value = this.textBox.value;
    this.focus();
  }

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');
    const valueAsNumber = parseFloat(this.value) || 0;
    const canIncrease = this.max === undefined || valueAsNumber < this.max;
    const canDecrease = this.min === undefined || valueAsNumber > this.min;

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
          pill: this.pill,
          // States
          disabled: this.disabled
        })}
        @pointerdown=${this.handleVisualBoxPointerDown}
      >
        ${!this.withoutSteppers
          ? html`
              <button
                id="stepper-down"
                part="stepper stepper-down"
                ?disabled=${!canDecrease || this.disabled}
                tabindex="-1"
                aria-label=${this.localize.term('decrease')}
                @pointerdown=${this.maintainFocusOnPointerDown}
                @click=${this.handleDecrease}
              >
                <quiet-icon library="system" name="minus"></quiet-icon>
              </button>
            `
          : ''}

        <slot name="start"></slot>

        <input
          id="text-box"
          part="text-box"
          type="number"
          inputmode="numeric"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          pattern=${ifDefined(this.pattern)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as number)}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocomplete=${ifDefined(this.autocomplete) as any}
          spellcheck="false"
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end"></slot>

        ${!this.withoutSteppers
          ? html`
              <button
                id="stepper-up"
                part="stepper stepper-up"
                ?disabled=${!canIncrease || this.disabled}
                tabindex="-1"
                aria-label=${this.localize.term('increase')}
                @pointerdown=${this.maintainFocusOnPointerDown}
                @click=${this.handleIncrease}
              >
                <quiet-icon library="system" name="plus"></quiet-icon>
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-number-field': QuietNumberField;
  }
}
