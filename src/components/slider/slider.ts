import '../tooltip/tooltip.js';
import { clamp } from '../../utilities/math.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './slider.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietTooltip } from '../tooltip/tooltip.js';

/**
 * <quiet-slider>
 *
 * @summary Sliders let users select numeric values within a given range by moving a thumb along a track.
 * @documentation https://quietui.com/docs/components/slider
 * @status stable
 * @since 1.0.0
 *
 * @dependency quiet-tooltip
 *
 * @slot label - The slider's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The slider's description. For plain-text descriptions, you can use the `description` attribute
 *  instead.
 * @slot reference - One or more reference labels to show visually below the slider.
 *
 * @prop {string} form - If the slider is located outside of a form, you can associate it by setting this to the
 *  form's `id`.
 *
 * @event quiet-blur - Emitted when the slider loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the slider's value.
 * @event quiet-focus - Emitted when the slider receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the slider receives input.
 *
 * @csspart label - The element that contains the sliders's label.
 * @csspart description - The element that contains the slider's description.
 * @csspart slider - The element containing the track and reference slot.
 * @csspart track - The slider's track.
 * @csspart indicator - The colored indicator that shows from the start of the slider to the current value.
 * @csspart markers - The container that holds all the markers when `with-markers` is used.
 * @csspart marker - The individual markers that are shown when `with-markers` is used.
 * @csspart references - The container that holds references that get slotted in.
 * @csspart thumb - The slider's thumb.
 * @csspart tooltip - The tooltip, a `<quiet-tooltip>` element.
 * @csspart tooltip__tooltip - The tooltip's `tooltip` part.
 * @csspart tooltip__content - The tooltip's `content` part.
 * @csspart tooltip__arrow - The tooltip's `arrow` part.
 *
 * @cssstate disabled - Applied when the slider is disabled.
 * @cssstate dragging - Applied when the slider is being dragged.
 * @cssstate focused - Applied when the slider has focus.
 * @cssstate user-valid - Applied when the slider is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the slider is invalid and the user has sufficiently interacted with it.
 *
 * @cssproperty [--track-size=0.75em] - The height or width of the slider's track.
 * @cssproperty [--marker-width=0.1875em] - The width of each individual marker.
 * @cssproperty [--marker-height=0.1875em] - The height of each individual marker.
 * @cssproperty [--thumb-width=1.25em] - The width of the thumb.
 * @cssproperty [--thumb-height=1.25em] - The height of the thumb.
 */
@customElement('quiet-slider')
export class QuietSlider extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private localize = new Localize(this);
  private trackBoundingClientRect: DOMRect;
  private valueWhenDraggingStarted: number | undefined;

  @query('#thumb') thumb: HTMLElement;
  @query('#track') track: HTMLElement;
  @query('#tooltip') tooltip: QuietTooltip;

  @state() private isInvalid = false;
  @state() private wasChanged = false;
  @state() private wasSubmitted = false;

  /**
   * The slider's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The slider's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the slider. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The slider's value. */
  @property({ type: Number }) value = 0;

  /** Disables the slider. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the slider a read-only field. */
  @property({ type: Boolean }) readonly = false;

  /** The orientation of the slider. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** The slider's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** The minimum value allowed. */
  @property({ type: Number }) min: number = 0;

  /** The maximum value allowed. */
  @property({ type: Number }) max: number = 100;

  /** The granularity the value must adhere to when incrementing and decrementing. */
  @property({ type: Number }) step: number = 1;

  /**
   * You can provide a custom error message to force the slider to be invalid. To clear the error, set this to an empty
   * string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Tells the browser to focus the slider when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

  /** The distance of the tooltip from the slider's thumb. */
  @property({ attribute: 'tooltip-distance', type: Number }) tooltipDistance = 8;

  /** The placement of the tooltip in reference to the slider's thumb. */
  @property({ attribute: 'tooltip-placement', reflect: true }) tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' =
    'top';

  /** Draws markers at each step along the slider. */
  @property({ attribute: 'with-markers', type: Boolean }) withMarkers = false;

  /** Renders the slider with the `references` slot. */
  @property({ attribute: 'with-references', type: Boolean, reflect: true }) withReferences = false;

  /** Draws a tooltip above the thumb when the control has focus or is dragged. */
  @property({ attribute: 'with-tooltip', type: Boolean }) withTooltip = false;

  /**
   * A custom formatting function to apply to the value. This will be shown in the tooltip and announced by screen
   * readers. Must be set with JavaScript. Property only.
   */
  @property({ attribute: false }) valueFormatter: (value: number) => string;

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
      this.value = clamp(this.value, this.min, this.max);
      this.internals.setFormValue(String(this.value));
    }

    // Handle min/max
    if (changedProps.has('min') || changedProps.has('max')) {
      this.value = clamp(this.value, this.min, this.max);
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
    this.value = parseFloat(this.getAttribute('value') ?? '');
    this.isInvalid = false;
    this.wasChanged = false;
    this.wasSubmitted = false;
  }

  /** Clamps a number to min/max while ensuring it's a valid step interval. */
  private clampAndRoundToStep(value: number) {
    const stepPrecision = (String(this.step).split('.')[1] || '').replace(/0+$/g, '').length;
    value = Math.round(value / this.step) * this.step;
    value = clamp(value, this.min, this.max);

    return parseFloat(value.toFixed(stepPrecision));
  }

  /** Given a value, returns its percentage within a range of min/max. */
  private getPercentageFromValue(value: number) {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private handleBlur() {
    this.hideTooltip();
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleFocus() {
    this.showTooltip();
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  }

  private handleDragStart(event: PointerEvent | TouchEvent) {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;

    if (
      this.disabled ||
      this.readonly ||
      // Prevent right-clicks from triggering drags
      (event instanceof PointerEvent && event.buttons > 1)
    ) {
      return;
    }

    document.addEventListener('pointermove', this.handleDragMove);
    document.addEventListener('pointerup', this.handleDragStop);
    document.addEventListener('touchmove', this.handleDragMove);
    document.addEventListener('touchend', this.handleDragStop);

    event.preventDefault();

    // Cache coords when dragging starts to avoid calling it on every move
    this.trackBoundingClientRect = this.track.getBoundingClientRect();
    this.valueWhenDraggingStarted = this.value;
    this.customStates.set('dragging', true);
    this.setValueFromCoordinates(x, y);
    this.showTooltip();
  }

  private handleDragMove = (event: PointerEvent | TouchEvent) => {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;

    event.preventDefault();
    this.setValueFromCoordinates(x, y);
  };

  private handleDragStop = (event: PointerEvent | TouchEvent) => {
    document.removeEventListener('pointermove', this.handleDragMove);
    document.removeEventListener('pointerup', this.handleDragStop);
    document.removeEventListener('touchmove', this.handleDragMove);
    document.removeEventListener('touchend', this.handleDragStop);

    // Dispatch change events when dragging stops
    if (this.value !== this.valueWhenDraggingStarted) {
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change'));
      this.wasChanged = true;
    }

    event.preventDefault();
    this.hideTooltip();
    this.customStates.set('dragging', false);
    this.valueWhenDraggingStarted = undefined;
  };

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
      newValue = this.clampAndRoundToStep(newValue + this.step);
    }

    // Decrease
    if (event.key === 'ArrowDown' || event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) {
      event.preventDefault();
      newValue = this.clampAndRoundToStep(newValue - this.step);
    }

    // Minimum value
    if (event.key === 'Home') {
      event.preventDefault();
      newValue = this.clampAndRoundToStep(this.min);
    }

    // Maximum value
    if (event.key === 'End') {
      event.preventDefault();
      newValue = this.clampAndRoundToStep(this.max);
    }

    // Move up 10%
    if (event.key === 'PageUp') {
      event.preventDefault();
      newValue = this.clampAndRoundToStep(
        Math.max(
          newValue + (this.max - this.min) / 10,
          newValue + this.step // make sure we at least move up to the next step
        )
      );
    }

    // Move down 10%
    if (event.key === 'PageDown') {
      event.preventDefault();
      newValue = this.clampAndRoundToStep(
        Math.min(
          newValue - (this.max - this.min) / 10,
          newValue - this.step // make sure we at least move down to the previous step
        )
      );
    }

    // If a key trigger a change, update the value and dispatch events
    if (newValue !== oldValue) {
      // Keep within range
      if (newValue < this.min) newValue = this.min;
      if (newValue > this.max) newValue = this.max;

      this.value = newValue;

      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new QuietChangeEvent());

      // Dispatch native change/input events for better framework binding support
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new Event('change'));
      this.wasChanged = true;
    }

    // When enter is pressed in a slider, the associated form should submit
    if (event.key === 'Enter' && this.associatedForm) {
      const submitter = [...this.associatedForm.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.associatedForm.requestSubmit(submitter);
    }
  }

  private handleLabelPointerDown(event: PointerEvent) {
    event.preventDefault();

    if (!this.disabled) {
      this.thumb.focus();
    }
  }

  private setValueFromCoordinates(x: number, y: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const isVertical = this.orientation === 'vertical';
    const oldValue = this.value;
    const { top, right, bottom, left, height, width } = this.trackBoundingClientRect;
    const pointerPosition = isVertical ? y : x;
    const sliderCoords = isVertical
      ? { start: top, end: bottom, size: height }
      : { start: left, end: right, size: width };
    const relativePosition = isVertical
      ? sliderCoords.end - pointerPosition
      : isRtl
        ? sliderCoords.end - pointerPosition
        : pointerPosition - sliderCoords.start;
    const percentage = relativePosition / sliderCoords.size;
    this.value = this.clampAndRoundToStep(this.min + (this.max - this.min) * percentage);

    // Dispatch input events when the value changes by dragging
    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  private showTooltip() {
    if (this.withTooltip) {
      this.tooltip.open = true;
    }
  }

  private hideTooltip() {
    if (this.withTooltip) {
      this.tooltip.open = false;
    }
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.customValidity?.length > 0;
    const validationMessage = this.customValidity;
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
      valueMissing: false
    };

    this.isInvalid = hasCustomValidity;
    this.internals.setValidity(flags, validationMessage, this.thumb);
  }

  /** Sets focus to the slider. */
  public focus() {
    this.thumb.focus();
  }

  /** Removes focus from the slider. */
  public blur() {
    this.thumb.blur();
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

  /**
   * Decreases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  public stepDown() {
    const newValue = this.clampAndRoundToStep(this.value - this.step);
    this.value = newValue;
  }

  /**
   * Increases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be
   * emitted when this is called.
   */
  public stepUp() {
    const newValue = this.clampAndRoundToStep(this.value + this.step);
    this.value = newValue;
  }

  render() {
    const thumbPosition = clamp(this.getPercentageFromValue(this.value), 0, 100);
    const markers: number[] = [];

    // Determine marker positions
    if (this.withMarkers) {
      for (let i = this.min; i <= this.max; i += this.step) {
        markers.push(this.getPercentageFromValue(i));
      }
    }

    return html`
      <label id="label" part="label" for="text-box" @pointerdown=${this.handleLabelPointerDown}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="slider"
        part="slider"
        class=${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // Modifiers
          horizontal: this.orientation === 'horizontal',
          vertical: this.orientation === 'vertical',
          // States
          disabled: this.disabled
        })}
      >
        <div id="track" part="track" @pointerdown=${this.handleDragStart} @touchstart=${this.handleDragStart}>
          <div id="indicator" part="indicator" style="--start: 0; --end: ${thumbPosition}%"></div>

          ${this.withMarkers
            ? html`
                <div id="markers" part="markers">
                  ${markers.map(marker => {
                    return html` <span part="marker" class="marker" style="--position: ${marker}%"></span> `;
                  })}
                </div>
              `
            : ''}

          <span
            id="thumb"
            part="thumb"
            role="slider"
            style="--position: ${thumbPosition}%"
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-orientation=${this.orientation}
            aria-valuemin=${this.min}
            aria-valuenow=${this.value}
            aria-valuetext=${typeof this.valueFormatter === 'function'
              ? this.valueFormatter(this.value)
              : this.localize.number(this.value)}
            aria-valuemax=${this.max}
            aria-labelledby="label"
            aria-describedby="description"
            tabindex=${this.disabled ? -1 : 0}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          ></span>
        </div>

        ${this.withReferences
          ? html`
              <div id="references" part="references" aria-hidden="true">
                <slot name="reference"></slot>
              </div>
            `
          : ''}
      </div>

      ${this.withTooltip
        ? html`
            <quiet-tooltip
              id="tooltip"
              part="tooltip"
              exportparts="
                tooltip:tooltip__tooltip,
                content:tooltip__content,
                arrow:tooltip__arrow
              "
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for="thumb"
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter === 'function'
                  ? this.valueFormatter(this.value)
                  : this.localize.number(this.value)}
              </span>
            </quiet-tooltip>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-slider': QuietSlider;
  }
}
