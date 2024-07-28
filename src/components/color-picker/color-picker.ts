import '../copy/copy.js';
import '../slider/slider.js';
import { clamp } from '../../utilities/math.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { TinyColor } from '@ctrl/tinycolor';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './color-picker.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietSlider } from '../slider/slider.js';

/**
 * <quiet-color-picker>
 *
 * @summary Color pickers provide an interface for selecting a color using a two-dimension slider for luminosity and
 *  saturation and regular sliders for hue and opacity.
 * @documentation https://quietui.com/docs/components/color-picker
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-copy
 * @dependency quiet-slider
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 *
 * @event quiet-blur - Emitted when the color picker loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the color picker's value.
 * @event quiet-focus - Emitted when the color picker receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the color picker receives input.
 *
 * @csspart label - The element that contains the color picker's label.
 * @csspart description - The element that contains the color picker's description.
 *
 * @cssstate disabled - Applied when the color picker is disabled.
 * @cssstate focused - Applied when the color picker has focus.
 * @cssstate user-valid - Applied when the color picker is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the color picker is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-color-picker')
export class QuietColorPicker extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private colorSliderBoundingClientRect: DOMRect;
  private isDragging = false;
  private localize = new Localize(this);
  private valueWhenDraggingStarted: string | undefined;
  private wasValueSetInternally = false;

  @query('#color-slider') private colorSlider: HTMLElement;
  @query('#color-slider-thumb') private colorSliderThumb: HTMLElement;

  @state() private h = 0;
  @state() private s = 0;
  @state() private v = 1;
  @state() private a = 1;
  @state() private colorSliderThumbX = 0;
  @state() private colorSliderThumbY = 0;
  @state() private isChangingV = false;
  @state() private isChangingS = false;
  // @ts-expect-error - hush
  @state() private isInvalid = false;
  // @ts-expect-error - hush
  @state() private wasChanged = false;
  // @ts-expect-error - hush
  @state() private wasSubmitted = false;

  /**
   * The color picker's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The color picker's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the color picker. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The color picker's value. */
  @property() value = '';

  /** The format to use for the value. */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** Disables the color picker. */
  @property({ type: Boolean }) disabled = false;

  /**
   * One or more space-delimited hex colors or CSS color names (e.g. lightblue) to show as preset swatches below the
   * color picker.
   */
  @property() swatches = '';

  /**
   * You can provide a custom error message to force the text field to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Enables the opacity slider. */
  @property({ attribute: 'with-opacity', type: Boolean, reflect: true }) withOpacity = false;

  /** Shows a preview of the selected color that will copy the current color when clicked. */
  @property({ attribute: 'with-preview', type: Boolean, reflect: true }) withPreview = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  firstUpdated() {
    this.setColor(this.value);
  }

  updated(changedProps: Map<string, unknown>) {
    // Always be updating
    this.updateValidity();

    // Value
    if (changedProps.has('value') && !this.isDragging && !this.wasValueSetInternally) {
      this.setColor(this.value);
      this.internals.setFormValue(this.value);
    }

    // Opacity
    if (changedProps.has('withOpacity') && !this.withOpacity) {
      this.a = 1;
    }

    // Format
    if (changedProps.has('format')) {
      this.updateValue();
    }

    // Update the formatted value when HSVA changes
    if (changedProps.has('h') || changedProps.has('s') || changedProps.has('v') || changedProps.has('a')) {
      this.updateValue();
    }

    // Update the color area thumb when switching directions
    if (changedProps.has('dir')) {
      this.updateColorSliderThumbPosition();
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
    return this.localize.number(value.toFixed(0), { style: 'unit', unit: 'degree', unitDisplay: 'narrow' });
  }

  private formatOpacity(value: number) {
    return this.localize.number(value, { style: 'percent' });
  }

  // @ts-expect-error - hush
  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  // @ts-expect-error - hush
  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  }

  handleColorSliderBlur() {
    this.isChangingS = false;
    this.isChangingV = false;
  }

  handleColorSliderThumbKeyDown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';

    // Adjust saturation
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(event.key)) {
      let increment = 0;
      if (event.key === 'ArrowUp') increment = 0.01;
      if (event.key === 'ArrowDown') increment = -0.01;
      if (event.key === 'PageUp') increment = 0.1;
      if (event.key === 'PageDown') increment = -0.1;

      event.preventDefault();

      this.v = clamp(this.v + increment, 0, 1);
      this.isChangingV = true;
      this.isChangingS = false;
      this.updateColorSliderThumbPosition();
    }

    // Adjust brightness
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      let increment = 0;
      if (event.key === 'ArrowLeft') increment = -0.01;
      if (event.key === 'ArrowRight') increment = 0.01;
      if (event.key === 'Home') increment = -0.1;
      if (event.key === 'End') increment = 0.1;
      if (isRtl) increment *= -1;

      event.preventDefault();

      this.s = clamp(this.s + increment, 0, 1);
      this.isChangingS = true;
      this.isChangingV = false;
      this.updateColorSliderThumbPosition();
    }
  }

  private handleDragStart(event: PointerEvent | TouchEvent) {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;

    if (this.disabled) return;

    document.addEventListener('pointermove', this.handleDragMove);
    document.addEventListener('pointerup', this.handleDragStop);
    document.addEventListener('touchmove', this.handleDragMove);
    document.addEventListener('touchend', this.handleDragStop);

    event.preventDefault();

    // Cache coords when dragging starts to avoid calling it on every move
    this.colorSliderBoundingClientRect = this.colorSlider.getBoundingClientRect();
    this.isDragging = true;
    this.valueWhenDraggingStarted = this.value;
    this.setColorFromCoordinates(x, y);
  }

  private handleDragMove = (event: PointerEvent | TouchEvent) => {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;

    event.preventDefault();

    this.setColorFromCoordinates(x, y);
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
    }

    event.preventDefault();
    this.isDragging = false;
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

  private handleHueSliderInput(event: QuietInputEvent) {
    this.h = (event.target as QuietSlider).value;
  }

  private handleLabelClick() {
    this.colorSliderThumb.focus();
  }

  private handleOpacitySliderInput(event: QuietInputEvent) {
    this.a = (event.target as QuietSlider).value;
  }

  private async handleSwatchClick(color: string) {
    if (this.disabled) return;

    this.value = color;
    await this.updateComplete;

    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new Event('input'));
    this.dispatchEvent(new QuietChangeEvent());
    this.dispatchEvent(new Event('change'));
  }

  /** Call this when this.h, this.s, this.v, or this.a updates to set the value in the correct format. */
  private async updateValue() {
    const color = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });

    this.wasValueSetInternally = true;

    switch (this.format) {
      case 'rgb':
        this.value = color.toRgbString();
        break;
      case 'hsl':
        this.value = color.toHslString();
        break;
      default:
        this.value = this.withOpacity ? color.toHex8String() : color.toHexString();
        break;
    }

    await this.updateComplete;

    this.wasValueSetInternally = false;
  }

  /**
   * Parses an arbitrary color and sets the current color. Returns a promise that resolves after the component updates.
   */
  private async setColor(color: string) {
    const newColor = new TinyColor(color);
    const hsv = newColor.toHsv();

    this.h = hsv.h;
    this.s = hsv.s;
    this.v = hsv.v;
    this.a = hsv.a;
    this.updateColorSliderThumbPosition();

    return this.updateComplete;
  }

  private async setColorFromCoordinates(x: number, y: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;
    const { top, left, height, width } = this.colorSliderBoundingClientRect;
    const relativeXPercent = isRtl ? clamp(1 - (x - left) / width, 0, 1) : clamp((x - left) / width, 0, 1);
    const relativeYPercent = clamp((y - top) / height, 0, 1);

    this.s = relativeXPercent;
    this.v = 1 - relativeYPercent;
    this.updateColorSliderThumbPosition();

    // Dispatch input events when dragging, but only when the value changes
    if (this.value !== oldValue) {
      await this.updateComplete;
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  private updateColorSliderThumbPosition() {
    const isRtl = this.localize.dir() === 'rtl';
    this.colorSliderThumbX = isRtl ? (1 - this.s) * 100 : this.s * 100;
    this.colorSliderThumbY = (1 - this.v) * 100;
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.customValidity?.length > 0;
    const validationMessage = hasCustomValidity ? this.customValidity : '';
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
    this.internals.setValidity(flags, validationMessage, this.colorSliderThumb);
  }

  /** Sets focus to the text field. */
  public focus() {
    this.colorSliderThumb.focus();
  }

  /** Removes focus from the text field. */
  public blur() {
    this.colorSliderThumb.blur();
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
    const isRtl = this.localize.dir() === 'rtl';
    const color = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });
    const colorWithoutOpacity = new TinyColor({ h: this.h, s: this.s, v: this.v, a: 1 });
    const colorSliderBackground = new TinyColor({ h: this.h, s: 1, v: 1, a: 1 }).toHexString();
    const hueThumbColor = new TinyColor({ h: this.h, s: 1, v: 1, a: 1 }).toHexString();
    const opacityThumbColor = `color-mix(in oklab, var(--quiet-silent), ${color.toHexString()} ${this.a * 100}%);`;
    const colorSliderThumbBackground = new TinyColor({ h: this.h, s: this.s, v: this.v, a: 100 }).toHexString();
    const swatches = this.swatches.split(' ').filter(val => val.trim() !== '');
    const luminosityText = this.localize.term('percentLuminosity', this.localize.number(this.v, { style: 'percent' }));
    const saturationText = this.localize.term('percentSaturation', this.localize.number(this.s, { style: 'percent' }));
    let valueText = '';

    if (this.isChangingV) {
      valueText = luminosityText;
    } else if (this.isChangingS) {
      valueText = saturationText;
    } else {
      valueText = `${luminosityText}, ${saturationText}`;
    }

    return html`
      <label id="label" part="label" for="color-slider-thumb" @click=${this.handleLabelClick}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
        <slot name="description">${this.description}</slot>
      </div>

      <div
        id="picker"
        class=${classMap({
          disabled: this.disabled
        })}
        style="
          --current-color: ${color.toHex8String()};
          --current-color-without-opacity: ${colorWithoutOpacity.toHexString()};
          --hue-thumb-color: ${hueThumbColor};
          --opacity-thumb-color: ${opacityThumbColor};
        "
      >
        <div
          id="color-slider"
          style="background-color: ${colorSliderBackground};"
          @pointerdown=${this.handleDragStart}
          @touchstart=${this.handleDragStart}
        >
          <span
            id="color-slider-thumb"
            style="
              top: ${this.colorSliderThumbY}%;
              left: ${this.colorSliderThumbX}%;
              background-color: ${colorSliderThumbBackground};
            "
            tabindex="${this.disabled ? '-1' : '0'}"
            role="slider"
            aria-roledescription="2d slider"
            aria-labelledby="label"
            aria-describedby="description"
            aria-valuenow="0"
            aria-valuetext="${valueText}"
            @blur=${this.handleColorSliderBlur}
            @keydown=${this.handleColorSliderThumbKeyDown}
          ></span>
        </div>

        <div id="controls">
          <div id="sliders">
            <quiet-slider
              dir=${isRtl ? 'rtl' : ' ltr'}
              label="${this.localize.term('hue')}"
              id="hue"
              min="0"
              max="359"
              value=${this.h}
              .valueFormatter=${this.formatHue}
              ?disabled=${this.disabled}
              @quiet-input=${this.handleHueSliderInput}
            ></quiet-slider>

            ${this.withOpacity
              ? html`
                  <quiet-slider
                    id="opacity"
                    dir=${isRtl ? 'rtl' : ' ltr'}
                    label=${this.localize.term('opacity')}
                    min="0"
                    max="1"
                    step="0.01"
                    value=${this.a}
                    .valueFormatter=${this.formatOpacity}
                    ?disabled=${this.disabled}
                    @quiet-input=${this.handleOpacitySliderInput}
                  ></quiet-slider>
                `
              : ''}
          </div>

          ${this.withPreview
            ? html`
                <quiet-copy id="copy-button" data=${this.value}>
                  <button id="preview" aria-label="${this.localize.term('copyToClipboard')}"></button>
                </quiet-copy>
              `
            : ''}
        </div>

        ${swatches.length > 0
          ? html`
              <div id="swatches">
                ${swatches.map(swatch => {
                  return html`
                    <button
                      aria-label="${swatch}"
                      style="--swatch-color: ${swatch}"
                      tabindex=${this.disabled ? '-1' : '0'}
                      @click=${() => this.handleSwatchClick(swatch)}
                    ></button>
                  `;
                })}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-color-picker': QuietColorPicker;
  }
}
