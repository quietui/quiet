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
import styles from './color-picker.styles.js';

const hasEyeDropper = 'EyeDropper' in window;

/**
 * <quiet-color-picker>
 *
 * @summary Color pickers provide an interface for selecting a color using a two-dimension slider for luminosity and
 *  saturation and regular sliders for hue and opacity.
 * @documentation https://quietui.org/docs/components/color-picker
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-button
 * @dependency quiet-copy
 * @dependency quiet-slider
 *
 * @slot label - The color picker's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The color picker's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @event quiet-change - Emitted when the user commits changes to the color picker's value.
 * @event quiet-input - Emitted when the color picker receives input. This can fire very frequently during dragging, so
 *  avoid doing expensive operations in the handler. If you don't live feedback, use the `quiet-change` event instead.
 *
 * @csspart label - The element that contains the color picker's label.
 * @csspart description - The element that contains the color picker's description.
 * @csspart picker - The element the wraps the color picker (excluding the label and description).
 * @csspart color-slider - The 2d color slider.
 * @csspart color-slider-thumb - The color slider's thumb.
 * @csspart controls - The container that wraps the sliders and preview.
 * @csspart sliders - The container that wraps the hue and opacity slider.
 * @csspart hue-slider - The slider that controls the color's hue.
 * @csspart hue-slider__label - The hue slider's `label` part.
 * @csspart hue-slider__description - The hue slider's `description` part.
 * @csspart hue-slider__slider - The hue slider's `slider` part.
 * @csspart hue-slider__track - The hue slider's `track` part.
 * @csspart hue-slider__indicator - The hue slider's `indicator` part.
 * @csspart hue-slider__thumb - The hue slider's `thumb` part.
 * @csspart opacity-slider - The slider that controls the color's opacity.
 * @csspart opacity-slider__label - The opacity slider's `label` part.
 * @csspart opacity-slider__description - The opacity slider's `description` part.
 * @csspart opacity-slider__slider - The opacity slider's `slider` part.
 * @csspart opacity-slider__track - The opacity slider's `track` part.
 * @csspart opacity-slider__indicator - The opacity slider's `indicator` part.
 * @csspart opacity-slider__thumb - The opacity slider's `thumb` part.
 * @csspart eye-dropper-button - The eye dropper button, a `<quiet-button>` element.
 * @csspart preview-button - The button that shows a preview of the current color, a `<quiet-button>` element.
 * @csspart swatches - The element that contains swatches.
 * @csspart swatch - Each individual swatch.
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

  private draggableThumb: DraggableElement;
  private isDragging = false;
  private localize = new Localize(this);
  private valueWhenDraggingStarted: string | undefined;
  private wasValueSetInternally = false;

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
  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

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

  /** The color picker's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * One or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the
   * color picker.
   */
  @property() swatches = '';

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an id of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * You can provide a custom error message to force the color picker to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /** Enables the opacity slider. */
  @property({ attribute: 'with-opacity', type: Boolean, reflect: true }) withOpacity = false;

  /**
   * Enables the eye dropper button. Only available in
   * [supportive browsers](https://caniuse.com/?search=eyedropper%20API).
   */
  @property({ attribute: 'with-eye-dropper', type: Boolean, reflect: true }) withEyeDropper = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
    this.addEventListener('focusin', this.handleFocusIn);
    this.addEventListener('focusout', this.handleFocusOut);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
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
          this.wasChanged = true;
          this.dispatchEvent(new QuietChangeEvent());
          this.dispatchEvent(new Event('change'));
        }

        this.isDragging = false;
        this.valueWhenDraggingStarted = undefined;
      }
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProperties.has('value')) {
      this.internals.setFormValue(this.value);

      if (!this.isDragging && !this.wasValueSetInternally) {
        this.setColorFromString(this.value);
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

    // Handle opacity
    if (changedProperties.has('withOpacity') && !this.withOpacity) {
      this.a = 1;
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
          this.value = this.withOpacity ? color.toHex8String() : color.toHexString();
          break;
      }

      this.updateComplete.then(() => (this.wasValueSetInternally = false));
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
      this.wasChanged = true;
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new Event('input'));
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change'));
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
          this.dispatchEvent(new Event('input'));
          this.dispatchEvent(new QuietChangeEvent());
          this.dispatchEvent(new Event('change'));
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

  private handleHostInvalid() {
    //
    // We need to simulate the :user-invalid state when the form is submitted. Alas, there's no way to listen to form
    // submit because validation occurs before the `formdata` and `submit` events. The only way I've found to hook into
    // it is by listening to the `invalid` event on the host element, which is dispatched by the browser when the form
    // is submitted and the form-associated custom element is invalid.
    //
    this.wasSubmitted = true;
  }

  private async handleHueSliderInput(event: QuietInputEvent) {
    event.stopImmediatePropagation();
    this.h = (event.target as QuietSlider).value;

    await this.updateComplete;

    // This handler listens for quiet-change and quiet-input and re-dispatches them when the value changes
    if (event.type === 'quiet-input') {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new Event('input'));
    } else if (event.type === 'quiet-change') {
      this.wasChanged = true;
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change'));
    }
  }

  private handleLabelClick() {
    this.colorSliderThumb.focus();
  }

  private async handleOpacitySliderInput(event: QuietInputEvent) {
    event.stopImmediatePropagation();
    this.a = (event.target as QuietSlider).value;

    await this.updateComplete;

    // This handler listens for quiet-change and quiet-input and re-dispatches them when the value changes
    if (event.type === 'quiet-input') {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new Event('input'));
    } else if (event.type === 'quiet-change') {
      this.wasChanged = true;
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change'));
    }
  }

  /** Sets the color when a swatch is clicked. */
  private async handleSwatchClick(color: string) {
    const oldValue = this.value;
    if (this.disabled) return;

    this.setColorFromString(color);
    this.wasChanged = true;
    this.colorSliderThumb.focus();

    await this.updateComplete;

    if (this.value !== oldValue) {
      this.dispatchEvent(new QuietInputEvent());
      this.dispatchEvent(new Event('input'));
      this.dispatchEvent(new QuietChangeEvent());
      this.dispatchEvent(new Event('change'));
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
    const currentColor = new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a });
    const colorWithoutOpacity = new TinyColor({ h: this.h, s: this.s, v: this.v, a: 1 });
    const hueColor = new TinyColor({ h: this.h, s: 1, v: 1, a: 1 });
    const opacityColor = `color-mix(in oklab, var(--quiet-silent), ${currentColor.toHexString()} ${this.a * 100}%);`;
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
      <label id="label" part="label" for="color-slider-thumb" @click=${this.handleLabelClick}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
        <slot name="description">${this.description}</slot>
      </div>

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
          --current-color-without-opacity: ${colorWithoutOpacity.toHexString()};
          --hue-thumb-color: ${hueColor.toHexString()};
          --opacity-thumb-color: ${opacityColor};
        "
      >
        <div id="color-slider" part="color-slider" style="background-color: ${hueColor.toHexString()};">
          <span
            id="color-slider-thumb"
            part="color-slider-thumb"
            style="
              top: ${this.colorSliderThumbY}%;
              left: ${this.colorSliderThumbX}%;
              background-color: ${colorWithoutOpacity.toHexString()};
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

        <div id="controls" part="controls">
          <quiet-copy id="copy-button" data=${this.value}>
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

            ${this.withOpacity
              ? html`
                  <quiet-slider
                    id="opacity"
                    part="opacity-slider"
                    exportparts="
                      label:opacity-slider__label,
                      description:opacity-slider__description,
                      slider:opacity-slider__slider,
                      track:opacity-slider__track,
                      indicator:opacity-slider__indicator,
                      thumb:opacity-slider__thumb,
                    "
                    dir=${isRtl ? 'rtl' : ' ltr'}
                    label=${this.localize.term('opacity')}
                    min="0"
                    max="1"
                    step="0.01"
                    value=${this.a}
                    .valueFormatter=${this.formatOpacity}
                    ?disabled=${this.disabled}
                    @quiet-focus=${this.stopPropagation}
                    @quiet-blur=${this.stopPropagation}
                    @quiet-change=${this.handleOpacitySliderInput}
                    @quiet-input=${this.handleOpacitySliderInput}
                  ></quiet-slider>
                `
              : ''}
          </div>
        </div>

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
