import { TinyColor } from '@ctrl/tinycolor';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { DraggableElement } from '../../utilities/drag.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../button/button.js';
import '../copy/copy.js';
import '../slider/slider.js';
import type { QuietSlider } from '../slider/slider.js';
import '../text-field/text-field.js';
import styles from './color-picker.styles.js';

const hasEyeDropper = 'EyeDropper' in window;

/**
 * <quiet-color-picker>
 *
 * @summary Provides a customizable interface for selecting a color.
 * @documentation https://quietui.org/docs/components/color-picker
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-button
 * @dependency quiet-copy
 * @dependency quiet-slider
 * @dependency quiet-text-field
 *
 * @event quiet-change - Emitted when the user commits changes to the color picker's value.
 * @event quiet-input - Emitted when the color picker receives input. This can fire very frequently during dragging, so
 *  avoid doing expensive operations in the handler. If you don't live feedback, use the `quiet-change` event instead.
 *
 * @csspart picker - The element the wraps the color picker.
 * @csspart color-slider - The 2d color slider.
 * @csspart color-slider-thumb - The color slider's thumb.
 * @csspart controls - The container that wraps the sliders and preview.
 * @csspart sliders - The container that wraps the hue and alpha slider.
 * @csspart hue-slider - The slider that controls the color's hue.
 * @csspart hue-slider__label - The hue slider's `label` part.
 * @csspart hue-slider__description - The hue slider's `description` part.
 * @csspart hue-slider__slider - The hue slider's `slider` part.
 * @csspart hue-slider__track - The hue slider's `track` part.
 * @csspart hue-slider__indicator - The hue slider's `indicator` part.
 * @csspart hue-slider__thumb - The hue slider's `thumb` part.
 * @csspart alpha-slider - The slider that controls the color's opacity.
 * @csspart alpha-slider__label - The alpha slider's `label` part.
 * @csspart alpha-slider__description - The alpha slider's `description` part.
 * @csspart alpha-slider__slider - The alpha slider's `slider` part.
 * @csspart alpha-slider__track - The alpha slider's `track` part.
 * @csspart alpha-slider__indicator - The alpha slider's `indicator` part.
 * @csspart alpha-slider__thumb - The alpha slider's `thumb` part.
 * @csspart eye-dropper-button - The eye dropper button, a `<quiet-button>` element.
 * @csspart preview-button - The button that shows a preview of the current color, a `<quiet-button>` element.
 * @csspart color-input - The color input text field, a `<quiet-text-field>` element.
 * @csspart color-input__visual-box - The element that wraps the internal text box.
 * @csspart color-input__text-box - The internal text box, an `<input>` element.
 * @csspart swatches - The element that contains swatches.
 * @csspart swatch - Each individual swatch.
 *
 * @cssstate disabled - Applied when the color picker is disabled.
 * @cssstate focused - Applied when the color picker has focus.
 */
@customElement('quiet-color-picker')
export class QuietColorPicker extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private colorSliderBoundingClientRect: DOMRect;
  private draggableThumb: DraggableElement;
  private isDragging = false;
  private localize = new Localize(this);
  private valueWhenDraggingStarted: string | undefined;
  private wasValueSetInternally = false;

  protected get focusableAnchor() {
    return this.colorSliderThumb;
  }

  @query('#color-slider') private colorSlider: HTMLElement;
  @query('#color-slider-thumb') private colorSliderThumb: HTMLElement;

  @state() h = 0;
  @state() s = 0;
  @state() v = 1;
  @state() a = 1;
  @state() colorSliderThumbX = 0;
  @state() colorSliderThumbY = 0;
  @state() hasFocus = false;
  @state() isChangingV = false;
  @state() isChangingS = false;
  @state() inputIsFocused = false;
  @state() displayValue = '';
  @state() hadUserInteraction = false;

  /**
   * The color picker's label. This won't be visible, but it will be read to assistive devices so you should always
   * include one.
   */
  @property() label: string;

  /** The color picker's value. */
  @property() value = '';

  /** The format to use for the color's value. */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /** Disables the color picker. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The color picker's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * One or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the
   * color picker.
   */
  @property() swatches = '';

  /** Enables the alpha slider. */
  @property({ attribute: 'with-alpha', type: Boolean, reflect: true }) withAlpha = false;

  /**
   * Enables the eye dropper button. Only available in
   * [supportive browsers](https://caniuse.com/?search=eyedropper%20API).
   */
  @property({ attribute: 'with-eye-dropper', type: Boolean, reflect: true }) withEyeDropper = false;

  /** Enables the color value text field. */
  @property({ attribute: 'with-input', type: Boolean, reflect: true }) withInput = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this.handleFocusIn);
    this.addEventListener('focusout', this.handleFocusOut);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this.handleFocusIn);
    this.removeEventListener('focusout', this.handleFocusOut);
  }

  firstUpdated() {
    this.setColorFromString(this.value);

    // Enable dragging on the color slider thumb
    this.draggableThumb = new DraggableElement(this.colorSlider, {
      start: (x, y) => {
        // Cache coords when dragging starts to avoid calling it on every move
        this.colorSliderBoundingClientRect = this.colorSlider.getBoundingClientRect();
        this.isDragging = true;
        this.valueWhenDraggingStarted = this.value;
        this.setColorFromCoordinates(x, y);
      },
      move: (x, y) => {
        this.setColorFromCoordinates(x, y);
      },
      stop: () => {
        // Dispatch change events when dragging stops
        if (this.value !== this.valueWhenDraggingStarted) {
          this.hadUserInteraction = true;
          this.dispatchEvent(new QuietChangeEvent());
          this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        }

        this.isDragging = false;
        this.valueWhenDraggingStarted = undefined;
      }
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle value
    if (changedProperties.has('value')) {
      if (!this.isDragging && !this.wasValueSetInternally) {
        this.setColorFromString(this.value);
      }

      if (!this.inputIsFocused) {
        this.displayValue = this.value;
      }
    }

    // Update the color area thumb when switching directions
    if (changedProperties.has('dir')) {
      this.updateColorSliderThumbPosition();
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
      this.draggableThumb.toggle(!this.disabled);
    }

    // Handle focused
    if (changedProperties.has('hasFocus')) {
      this.customStates.set('focused', this.hasFocus);
    }

    // Handle alpha
    if (changedProperties.has('withAlpha') && !this.withAlpha) {
      this.a = 1;
    }

    // Update the formatted value when HSVA, format, or value changes. This ensures the value is always in sync with
    // HSVA and is in a valid format.
    if (
      changedProperties.has('h') ||
      changedProperties.has('s') ||
      changedProperties.has('v') ||
      changedProperties.has('a') ||
      changedProperties.has('format') ||
      changedProperties.has('value')
    ) {
      const color = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });

      // Update the color slider's thumb position
      this.updateColorSliderThumbPosition();

      // We want to temporarily avoid triggering value changes when we set the value from within this block, otherwise
      // it will cause subtle shifts in the color slider's thumb position due to conversion/rounding.
      this.wasValueSetInternally = true;

      switch (this.format) {
        case 'rgb':
          this.value = color.toRgbString();
          break;
        case 'hsl':
          this.value = color.toHslString();
          break;
        default:
          this.value = this.withAlpha ? color.toHex8String() : color.toHexString();
          break;
      }

      this.updateComplete.then(() => (this.wasValueSetInternally = false));
    }
  }

  private formatHue(value: number) {
    return this.localize.number(value.toFixed(0), { style: 'unit', unit: 'degree', unitDisplay: 'narrow' });
  }

  private formatAlpha(value: number) {
    return this.localize.number(value, { style: 'percent' });
  }

  private async handleColorInputBlur(event: Event) {
    const input = event.target as HTMLInputElement;

    this.inputIsFocused = false;
    const color = new TinyColor(input.value);
    if (color.isValid) {
      this.setColorFromString(input.value);
      await this.updateComplete;
      this.displayValue = this.value;
    } else {
      this.displayValue = this.value;
    }
  }

  private async handleColorInputFocus(event: Event) {
    if (event.type === 'quiet-focus') {
      this.inputIsFocused = true;
      return;
    }
  }

  private async handleColorInputInput(event: Event) {
    event.stopImmediatePropagation();
    const oldValue = this.value;
    const input = event.target as HTMLInputElement;

    // While typing, update displayValue and preview if valid
    this.displayValue = input.value;
    const color = new TinyColor(input.value);
    if (color.isValid) {
      this.setColorFromString(input.value);
    }

    await this.updateComplete;

    if (this.value !== oldValue) {
      this.hadUserInteraction = true;
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private handleColorSliderBlur() {
    this.isChangingS = false;
    this.isChangingV = false;
  }

  private async handleColorSliderThumbKeyDown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;

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
    }

    await this.updateComplete;

    // Dispatch events
    if (this.value !== oldValue) {
      this.hadUserInteraction = true;
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private handleEyeDropperClick() {
    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then(async result => {
        const oldValue = this.value;

        this.setColorFromString(result.sRGBHex);

        await this.updateComplete;

        if (this.value !== oldValue) {
          this.dispatchEvent(new QuietInputEvent());
          this.dispatchEvent(new InputEvent('input'));
          this.dispatchEvent(new QuietChangeEvent());
          this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        }
      })
      .catch(() => {
        // canceled by the user
      });
  }

  private handleFocusIn = (event: Event) => {
    if (!this.hasFocus && event.target === event.currentTarget) {
      this.hasFocus = true;
      this.dispatchEvent(new QuietFocusEvent());
    }
  };

  private handleFocusOut = (event: Event) => {
    // Is the focus still within the component?
    if (this.matches(':focus-visible') || event.target !== event.currentTarget) {
      return;
    }

    this.hasFocus = false;
    this.dispatchEvent(new QuietBlurEvent());
  };

  private async handleHueSliderInput(event: QuietInputEvent) {
    event.stopImmediatePropagation();
    this.h = (event.target as QuietSlider).value;

    await this.updateComplete;

    // This handler listens for quiet-change and quiet-input and re-dispatches them when the value changes
    if (event.type === 'quiet-input') {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    } else if (event.type === 'quiet-change') {
      this.hadUserInteraction = true;
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private async handleAlphaSliderInput(event: QuietInputEvent) {
    event.stopImmediatePropagation();
    this.a = (event.target as QuietSlider).value;

    await this.updateComplete;

    // This handler listens for quiet-change and quiet-input and re-dispatches them when the value changes
    if (event.type === 'quiet-input') {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    } else if (event.type === 'quiet-change') {
      this.hadUserInteraction = true;
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  /** Sets the color when a swatch is clicked. */
  private async handleSwatchClick(color: string) {
    const oldValue = this.value;
    if (this.disabled) return;

    this.setColorFromString(color);
    this.hadUserInteraction = true;
    this.colorSliderThumb.focus();

    await this.updateComplete;

    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  /**
   * Parses an arbitrary color string and sets the corresponding HSVA values.
   */
  private setColorFromString(color: string) {
    const newColor = new TinyColor(color);
    const hsv = newColor.toHsv();

    this.h = hsv.h;
    this.s = hsv.s;
    this.v = hsv.v;
    this.a = hsv.a;
  }

  /** Sets the S and V value based on the pointer's x and y coordinates. */
  private async setColorFromCoordinates(x: number, y: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;
    const { top, left, height, width } = this.colorSliderBoundingClientRect;
    const relativeXPercent = isRtl ? clamp(1 - (x - left) / width, 0, 1) : clamp((x - left) / width, 0, 1);
    const relativeYPercent = clamp((y - top) / height, 0, 1);

    this.s = relativeXPercent;
    this.v = 1 - relativeYPercent;

    await this.updateComplete;

    // Dispatch input events when dragging, but only when the value changes
    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new InputEvent('input'));
    }
  }

  /** Prevent custom events that bubble from propagating outside of the component */
  private stopPropagation(event: Event) {
    event.stopImmediatePropagation();
  }

  /** Updates the color slider's thumb position based on S and V. */
  private updateColorSliderThumbPosition() {
    const isRtl = this.localize.dir() === 'rtl';
    this.colorSliderThumbX = isRtl ? (1 - this.s) * 100 : this.s * 100;
    this.colorSliderThumbY = (1 - this.v) * 100;
  }

  /** Sets focus to the color picker. */
  public focus() {
    this.colorSliderThumb.focus();
  }

  /** Removes focus from the color picker. */
  public blur() {
    // There are multiple elements that can receive focus, so we need to blur the correct one
    const activeEl = this.shadowRoot.activeElement as HTMLElement;
    activeEl?.blur();
  }

  /**
   * Gets the current value as a hex string, a hex8 string, an RGB object, or an HSL object. RBG objects have `r`, `g`,
   * and `b` properties ranging from 0–255 and an `a` property (representing opacity) that ranges from 0-1. HSL objects
   * have an `h` property ranging from `0-359` and `s`, `l`, and `a` properties ranging from 0–1.
   */
  public getValueAs(format: 'hex' | 'hex8' | 'hsl' | 'rgb' = 'rgb') {
    const color = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });

    switch (format) {
      case 'hex':
        return color.toHexString();
      case 'hex8':
        return color.toHex8String();
      case 'hsl':
        return color.toHsl();
      default:
        return color.toRgb();
    }
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';
    const currentColor = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });
    const colorWithoutAlpha = new TinyColor({ h: this.h, s: this.s, v: this.v, a: 1 });
    const hueColor = new TinyColor({ h: this.h, s: 1, v: 1, a: 1 });
    const alphaColor = `color-mix(in oklab, var(--quiet-silent), ${currentColor.toHexString()} ${this.a * 100}%);`;
    const swatches = this.swatches.split(' ').filter(val => val.trim() !== '');
    const luminosityText = this.localize.term('percentLuminosity', this.localize.number(this.v, { style: 'percent' }));
    const saturationText = this.localize.term('percentSaturation', this.localize.number(this.s, { style: 'percent' }));
    let valueText = '';

    // We need to set aria-valuetext dynamically on the 2d slider based on which value is being changed. By default, it
    // reads both luminosity and saturation levels. However, when you're changing one axis at a time with the keyboard,
    // we only want it to read that axis. On focus out, it will revert to the default.
    if (this.isChangingV) {
      valueText = luminosityText;
    } else if (this.isChangingS) {
      valueText = saturationText;
    } else {
      valueText = `${luminosityText}, ${saturationText}`;
    }

    return html`
      <div
        id="picker"
        part="picker"
        class=${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          disabled: this.disabled
        })}
        style="
          --current-color: ${currentColor.toHex8String()};
          --current-color-without-alpha: ${colorWithoutAlpha.toHexString()};
          --hue-thumb-color: ${hueColor.toHexString()};
          --alpha-thumb-color: ${alphaColor};
        "
      >
        <div id="color-slider" part="color-slider" style="background-color: ${hueColor.toHexString()};">
          <span
            id="color-slider-thumb"
            part="color-slider-thumb"
            style="
              top: ${this.colorSliderThumbY}%;
              left: ${this.colorSliderThumbX}%;
              background-color: ${colorWithoutAlpha.toHexString()};
            "
            tabindex="${this.disabled ? '-1' : '0'}"
            role="slider"
            aria-roledescription="2d slider"
            aria-label=${this.label}
            aria-valuenow="0"
            aria-valuetext="${valueText}"
            @blur=${this.handleColorSliderBlur}
            @keydown=${this.handleColorSliderThumbKeyDown}
          ></span>
        </div>

        <div id="controls" part="controls">
          <quiet-copy id="copy-button" data=${this.value} ?disabled=${this.disabled}>
            <quiet-button
              id="preview-button"
              part="preview-button"
              appearance="text"
              ?disabled=${this.disabled}
              icon-label=${this.localize.term('copyToClipboard')}
            ></quiet-button>
          </quiet-copy>

          ${this.withEyeDropper && hasEyeDropper
            ? html`
                <quiet-button
                  id="eye-dropper"
                  part="eye-dropper-button"
                  appearance="text"
                  ?disabled=${this.disabled}
                  icon-label=${this.localize.term('selectAColorFromTheScreen')}
                  @click=${this.handleEyeDropperClick}
                >
                  <quiet-icon library="system" name="color-picker"></quiet-icon>
                </quiet-button>
              `
            : ''}

          <div id="sliders" part="sliders">
            <quiet-slider
              id="hue"
              part="hue-slider"
              exportparts="
                label:hue-slider__label,
                description:hue-slider__description,
                slider:hue-slider__slider,
                track:hue-slider__track,
                indicator:hue-slider__indicator,
                thumb:hue-slider__thumb,
              "
              dir=${isRtl ? 'rtl' : ' ltr'}
              label="${this.localize.term('hue')}"
              min="0"
              max="359"
              value=${this.h}
              .valueFormatter=${this.formatHue}
              ?disabled=${this.disabled}
              @quiet-focus=${this.stopPropagation}
              @quiet-blur=${this.stopPropagation}
              @quiet-change=${this.handleHueSliderInput}
              @quiet-input=${this.handleHueSliderInput}
            ></quiet-slider>

            ${this.withAlpha
              ? html`
                  <quiet-slider
                    id="alpha"
                    part="alpha-slider"
                    exportparts="
                      label:alpha-slider__label,
                      description:alpha-slider__description,
                      slider:alpha-slider__slider,
                      track:alpha-slider__track,
                      indicator:alpha-slider__indicator,
                      thumb:alpha-slider__thumb,
                    "
                    dir=${isRtl ? 'rtl' : ' ltr'}
                    label=${this.localize.term('opacity')}
                    min="0"
                    max="1"
                    step="0.01"
                    value=${this.a}
                    .valueFormatter=${this.formatAlpha}
                    ?disabled=${this.disabled}
                    @quiet-focus=${this.stopPropagation}
                    @quiet-blur=${this.stopPropagation}
                    @quiet-change=${this.handleAlphaSliderInput}
                    @quiet-input=${this.handleAlphaSliderInput}
                  ></quiet-slider>
                `
              : ''}
          </div>
        </div>

        ${this.withInput
          ? html`
              <quiet-text-field
                id="color-input"
                part="color-input"
                exportparts="
                  visual-box:color-input__visual-box,
                  text-box:color-input__text-box
                "
                label=${this.localize.term('colorValue')}
                value=${this.displayValue}
                ?disabled=${this.disabled}
                size=${this.size}
                @quiet-input=${this.handleColorInputInput}
                @quiet-blur=${this.handleColorInputBlur}
                @quiet-focus=${this.handleColorInputFocus}
              ></quiet-text-field>
            `
          : ''}
        ${swatches.length > 0
          ? html`
              <div id="swatches" part="swatches">
                ${swatches.map(swatch => {
                  return html`
                    <button
                      part="swatch"
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

// The EyeDropper API isn't in all browsers or TypeScript yet
interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;
