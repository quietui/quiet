import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { DraggableElement } from '../../utilities/drag.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import styles from './rating.styles.js';

// Borrow the native input's validation message
const nativeFileInput = document.createElement('input');
nativeFileInput.name = 'quiet-faux-input';
nativeFileInput.type = 'text';
nativeFileInput.required = true;
const VALIDATION_MESSAGE = nativeFileInput.validationMessage;

/**
 * <quiet-rating>
 *
 * @summary Ratings let users provide feedback based on their satisfaction with a product or service.
 * @documentation https://quietui.org/docs/components/rating
 * @status stable
 * @since 1.0
 *
 * @slot label - The rating's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The rating's description. For plain-text descriptions, you can use the `description` attribute
 *  instead.
 *
 * @event quiet-blur - Emitted when the rating loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the rating's value.
 * @event quiet-focus - Emitted when the rating receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the rating receives input.
 *
 * @csspart label - The element that contains the ratings's label.
 * @csspart description - The element that contains the rating's description.
 * @csspart rating - The element that wraps all of the rating's symbols.
 * @csspart symbol - The container that holds the selected and unselected version of each symbol.
 *
 * @cssstate disabled - Applied when the rating is disabled.
 * @cssstate focused - Applied when the rating has focus.
 * @cssstate user-valid - Applied when the rating is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the rating is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-rating')
export class QuietRating extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private didDragOverOthers = false;
  private draggableRating: DraggableElement;
  private localize = new Localize(this);
  private ratingBoundingClientRect: DOMRect;
  private valueWhenDraggingStarted: number | undefined;
  protected get focusableAnchor() {
    return this.rating;
  }

  @query('#rating') rating: HTMLElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

  /**
   * The rating's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The rating's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the rating. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The rating's value. */
  @property({ type: Number }) value = 0;

  /** Disables the rating. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the rating a read-only field. */
  @property({ type: Boolean }) readonly = false;

  /** The rating's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an iD of a form in the same document or shadow root.
   */
  @property() form: string;

  /** Makes the rating required. Form submission will not be allowed when this is set and the rating is empty. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The maximum value allowed. */
  @property({ type: Number }) max: number = 5;

  /** The granularity the value must adhere to when incrementing and decrementing. */
  @property({ type: Number }) step: number = 1;

  /** Tells the browser to focus the rating when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

  /**
   * A function that returns the HTML for each symbol. The function will receive the `value` and `isSelected` arguments
   * that you can use to customize the symbol based on specific values or whether the symbol is in the selected state.
   * You should only return trusted HTML from this function, otherwise you may become vulnerable to XSS exploits.
   */
  @property({ attribute: false }) getSymbol: (step: number, isSelected: boolean) => string = (_, isSelected) => {
    return isSelected
      ? `<quiet-icon library="system" name="star" family="filled"></quiet-icon>`
      : `<quiet-icon library="system" name="star" family="outline"></quiet-icon>`;
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  firstUpdated() {
    // Enable dragging on the rating
    this.draggableRating = new DraggableElement(this.rating, {
      start: x => {
        // Cache coords when dragging starts to avoid calling it on every move
        this.didDragOverOthers = false;
        this.valueWhenDraggingStarted = this.value;
        this.ratingBoundingClientRect = this.rating.getBoundingClientRect();
        this.setValueFromCoordinates(x);
      },
      move: x => {
        this.setValueFromCoordinates(x);

        if (this.value !== this.valueWhenDraggingStarted) {
          this.didDragOverOthers = true;
        }
      },
      stop: () => {
        // Dispatch change events when dragging stops
        if (this.value !== this.valueWhenDraggingStarted) {
          this.dispatchEvent(new QuietChangeEvent());
          this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
          this.wasChanged = true;
        }

        // Reset the value when clicking on the same one
        if (this.value === this.valueWhenDraggingStarted && !this.didDragOverOthers) {
          this.value = 0;
        }

        this.didDragOverOthers = false;
        this.valueWhenDraggingStarted = undefined;
      }
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProperties.has('value')) {
      this.value = clamp(this.value, 0, this.max);
      this.internals.setFormValue(String(this.value));
    }

    // Handle min/max
    if (changedProperties.has('max')) {
      this.value = clamp(this.value, 0, this.max);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    // Disable dragging when disabled or readonly
    if (changedProperties.has('disabled') || changedProperties.has('readonly')) {
      this.draggableRating.toggle(!(this.disabled || this.readonly));
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
    this.value = parseFloat(this.getAttribute('value') ?? '0');
    this.isInvalid = false;
    this.wasChanged = false;
    this.wasSubmitted = false;
  }

  /** Clamps a number to min/max while ensuring it's a valid step interval. */
  private clampAndCeilToStep(value: number) {
    const stepPrecision = (String(this.step).split('.')[1] || '').replace(/0+$/g, '').length;
    value = Math.ceil(value / this.step) * this.step;
    value = clamp(value, 0, this.max);

    return parseFloat(value.toFixed(stepPrecision));
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
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

  private handleKeyDown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;
    let newValue = this.value;

    if (this.disabled || this.readonly) return;

    // Increase
    if (event.key === 'ArrowUp' || event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight')) {
      event.preventDefault();
      newValue = this.clampAndCeilToStep(newValue + this.step);
    }

    // Decrease
    if (event.key === 'ArrowDown' || event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) {
      event.preventDefault();
      newValue = this.clampAndCeilToStep(newValue - this.step);
    }

    // Minimum value
    if (event.key === 'Home') {
      event.preventDefault();
      newValue = 0;
    }

    // Maximum value
    if (event.key === 'End') {
      event.preventDefault();
      newValue = this.clampAndCeilToStep(this.max);
    }

    // Move up 10%
    if (event.key === 'PageUp') {
      event.preventDefault();
      newValue = this.clampAndCeilToStep(
        Math.max(
          newValue + this.max / 10,
          newValue + this.step // make sure we at least move up to the next step
        )
      );
    }

    // Move down 10%
    if (event.key === 'PageDown') {
      event.preventDefault();
      newValue = this.clampAndCeilToStep(
        Math.min(
          newValue - this.max / 10,
          newValue - this.step // make sure we at least move down to the previous step
        )
      );
    }

    // If a key trigger a change, update the value and dispatch events
    if (newValue !== oldValue) {
      // Keep within range
      if (newValue < 0) newValue = 0;
      if (newValue > this.max) newValue = this.max;

      this.value = newValue;

      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new QuietChangeEvent());

      // Dispatch native change/input events for better framework binding support
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.wasChanged = true;
    }

    // When enter is pressed in a rating, the associated form should submit
    if (event.key === 'Enter' && this.internals.form) {
      const submitter = [...this.internals.form.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.internals.form.requestSubmit(submitter);
    }
  }

  private handleLabelPointerDown(event: PointerEvent) {
    event.preventDefault();

    if (!this.disabled) {
      this.rating.focus();
    }
  }

  private setValueFromCoordinates(x: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;
    const { right, left, width } = this.ratingBoundingClientRect;
    const pointerPosition = x;
    const ratingCoords = { start: left, end: right, size: width };
    const relativePosition = isRtl ? ratingCoords.end - pointerPosition : pointerPosition - ratingCoords.start;
    const percentage = relativePosition / ratingCoords.size;
    this.value = this.clampAndCeilToStep(this.max * percentage);

    // Dispatch input events when the value changes by dragging
    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const isValueMissing = this.required && this.value === 0;
    const hasCustomValidity = this.getCustomValidity().length > 0;
    const validationMessage = isValueMissing ? VALIDATION_MESSAGE : this.getCustomValidity();
    const flags: ValidityStateFlags = {
      badInput: false,
      customError: hasCustomValidity,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: isValueMissing
    };
    this.isInvalid = isValueMissing || hasCustomValidity;
    this.internals.setValidity(flags, validationMessage, this.focusableAnchor);
  }

  /** Sets focus to the rating. */
  public focus() {
    this.rating.focus();
  }

  /** Removes focus from the rating. */
  public blur() {
    this.rating.blur();
  }

  /**
   * Decreases the rating's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  public stepDown() {
    const newValue = this.clampAndCeilToStep(this.value - this.step);
    this.value = newValue;
  }

  /**
   * Increases the rating's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  public stepUp() {
    const newValue = this.clampAndCeilToStep(this.value + this.step);
    this.value = newValue;
  }

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');
    const symbols = [];

    for (let i = 1; i <= this.max; i += 1) {
      symbols.push([this.getSymbol(i, true), this.getSymbol(i, false)]);
    }

    return html`
      <label
        id="label"
        part="label"
        class=${classMap({ 'visually-hidden': !hasLabel })}
        for="rating"
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ 'visually-hidden': !hasDescription })}>
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="rating"
        part="rating"
        class=${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          disabled: this.disabled,
          readonly: this.readonly
        })}
        role="slider"
        aria-labelledby="label"
        aria-describedby="description"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-valuemin="0"
        aria-valuenow=${this.value}
        aria-valuetext="${this.localize.term('numberOutOfTotal', this.value, this.max)}"
        aria-valuemax=${this.max}
        tabindex=${this.disabled || this.readonly ? '-1' : '0'}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @keydown=${this.handleKeyDown}
      >
        ${symbols.map((symbol, index) => {
          return html`
            <span part="symbol" class="symbol" style="--clip-percentage: ${(this.value - index) * 100}%;">
              ${unsafeHTML(symbol[0])} ${unsafeHTML(symbol[1])}
            </span>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-rating': QuietRating;
  }
}
