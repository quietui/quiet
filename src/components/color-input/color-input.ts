import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { Localize } from '../../utilities/localize.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../color-picker/color-picker.js';
import type { QuietColorPicker } from '../color-picker/color-picker.js';
import styles from './color-input.styles.js';

const openColorPickers = new Set<QuietColorInput>();

/**
 * <quiet-color-input>
 *
 * @summary Color inputs let users enter or select a color.
 * @documentation https://quietui.org/docs/components/color-input
 * @status stable
 * @since 1.0
 *
 * @dependency - quiet-color-picker
 *
 * @slot label - The color input's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The color input's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @event quiet-blur - Emitted when the color input loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the color input's value.
 * @event quiet-focus - Emitted when the color input receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the color input receives input.
 *
 * @csspart label - The element that contains the color input's label.
 * @csspart description - The element that contains the color input's description.
 * @csspart visual-box - The element that wraps the internal text box.
 * @csspart text-box - The internal text box, an `<input>` element.
 * @csspart clear-button - The clear button, a `<button>` element.
 *
 * @cssproperty [--show-duration=50ms] - The duration of the show/hide animation.
 * @cssproperty [--preview-size=1.6em] - The size of the color preview.
 *
 * @cssstate disabled - Applied when the color input is disabled.
 * @cssstate blank - Applied when the color input has a blank value.
 * @cssstate focused - Applied when the color input has focus.
 * @cssstate open - Applied when the color picker is open.
 * @cssstate user-valid - Applied when the color input is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the color input is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-color-input')
export class QuietColorInput extends QuietFormControlElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private localize = new Localize(this);

  protected get focusableAnchor() {
    return this.textBox;
  }

  @query('#color-picker') private colorPicker: QuietColorPicker;
  @query('input') private textBox: HTMLInputElement;
  @query('#preview') private preview: HTMLElement;
  @query('#visual-box') private visualBox: HTMLElement;

  @state() isOpen = false;
  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

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

  /** A placeholder to show in the color input when it's blank. */
  @property() placeholder: string;

  /** Disables the color input. */
  @property({ type: Boolean }) disabled = false;

  /** Makes the color input a read-only area. */
  @property({ type: Boolean }) readonly = false;

  /** Adds a clear button to the color input when it's not blank. */
  @property({ type: Boolean }) clearable = false;

  /** The type of color input to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The color input's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Draws the text field in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** The format to use for the color's value. */
  @property() format: 'hex' | 'rgb' | 'hsl' = 'hex';

  /**
   * One or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the
   * color picker.
   */
  @property() swatches = '';

  /** Enables the opacity slider. */
  @property({ attribute: 'with-opacity', type: Boolean, reflect: true }) withOpacity = false;

  /**
   * Enables the eye dropper button. Only available in
   * [supportive browsers](https://caniuse.com/?search=eyedropper%20API).
   */
  @property({ attribute: 'with-eye-dropper', type: Boolean, reflect: true }) withEyeDropper = false;

  /**
   * The placement of the dropdown menu in reference to the trigger. The menu will shift to a more optimal location if
   * the preferred placement doesn't have enough room.
   */
  @property({ reflect: true }) placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'bottom-start';

  /** The distance of the dropdown menu from its trigger. */
  @property({ type: Number }) distance = 0;

  /** The offset of the dropdown menu along its trigger. */
  @property({ type: Number }) offset = 0;

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the color input required. Form submission will not be allowed when this is set and the color input is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Tells the browser how to autocomplete the color input. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete: string;

  /** Tells the browser to focus the color input when the page loads or a dialog is shown. */
  @property({ type: Boolean }) autofocus: boolean;

  /** Sets the enter key label on virtual keyboards. */
  @property() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /**
   * Provides the browser with a hint about the type of data that might be entered by the user, allowing the appropriate
   * virtual keyboard to be displayed on supported devices.
   */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  async updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    if (changedProperties.has('isOpen')) {
      if (this.disabled) this.isOpen = false;
      this.customStates.set('open', this.isOpen);

      if (this.isOpen) {
        this.showPicker();
      } else {
        this.hidePicker();
      }
    }

    // Handle value
    if (changedProperties.has('value')) {
      this.customStates.set('blank', this.value === '');
      this.internals.setFormValue(this.value);
      this.preview.style.setProperty('--current-color', this.value);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      if (this.disabled) this.isOpen = false;
      this.customStates.set('disabled', this.disabled);
    }

    // Handle format
    if (changedProperties.has('format')) {
      // Ensure the value is formatted correctly
      if (this.value !== '') {
        await this.colorPicker.updateComplete;
        this.value = this.colorPicker.value;
      }
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

    if (this.value !== '') {
      this.value = this.colorPicker.value;
    }
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

  private handleClearClick() {
    this.value = '';
    this.textBox.focus();
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
  }

  private handleColorPickerInput() {
    this.value = this.colorPicker.value;
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, cancelable: false }));
  }

  /** If focus is set outside of the component, close the menu. */
  private handleDocumentFocusIn = (event: FocusEvent) => {
    const path = event.composedPath();

    if (!path.includes(this) && !path.includes(this.colorPicker)) {
      this.isOpen = false;
    }
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.hidePicker();
      this.focus();
    }
  };

  /** Handles pointer down events when the color picker is open. */
  private handleDocumentPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();
    if (!path.includes(this.visualBox) && !path.includes(this.colorPicker)) {
      this.hidePicker();
    }
  };

  private async handleInput() {
    this.value = this.textBox.value;
    this.colorPicker.value = this.value;
    await this.updateComplete;
    this.dispatchEvent(new QuietInputEvent());
  }

  private handleTextBoxButtonPointerDown(event: PointerEvent) {
    // Prevent the number field from losing focus when text box buttons are activated
    event.preventDefault();
  }

  private handleVisualBoxPointerDown(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const isBox = target?.id === 'visual-box';
    const isSlot = target.hasAttribute('slot');

    if (this.disabled) {
      return;
    }

    if (isBox || isSlot) {
      event.preventDefault();
    }

    if (!this.isOpen && !event.composedPath().includes(this.colorPicker)) {
      this.textBox.focus();
      this.isOpen = true;
    }
  }

  /** Repositions the dropdown menu */
  private reposition() {
    const anchor = this.visualBox;

    computePosition(anchor, this.colorPicker, {
      placement: this.placement,
      middleware: [offset({ mainAxis: this.distance, crossAxis: this.offset }), flip(), shift()]
    }).then(({ x, y, placement }) => {
      // Set the determined placement for users to hook into and for transform origin styles
      this.setAttribute('data-placement', placement);

      // Position it
      Object.assign(this.colorPicker.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.getCustomValidity().length > 0;
    const validationMessage = hasCustomValidity ? this.getCustomValidity() : this.textBox.validationMessage;
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
    this.internals.setValidity(flags, validationMessage, this.focusableAnchor);
  }

  /** Sets focus to the color input. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the color input. */
  public blur() {
    this.textBox.blur();
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

  /** Shows the color picker. */
  public async showPicker() {
    if (this.disabled) return;

    // Close other color pickers that are open
    openColorPickers.forEach(picker => (picker.isOpen = false));

    this.colorPicker.showPopover();
    this.isOpen = true;

    this.reposition();
    openColorPickers.add(this);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    document.addEventListener('focusin', this.handleDocumentFocusIn);

    this.colorPicker.hidden = false;
    this.cleanup = autoUpdate(this.visualBox, this.colorPicker, () => this.reposition());
    await animateWithClass(this.colorPicker, 'show');
  }

  /** Hides the color picker. */
  public async hidePicker() {
    if (this.disabled) return;

    this.isOpen = false;
    openColorPickers.delete(this);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    document.removeEventListener('focusin', this.handleDocumentFocusIn);

    if (!this.colorPicker.hidden) {
      await animateWithClass(this.colorPicker, 'hide');
      this.colorPicker.hidden = true;
      this.colorPicker.hidePopover();
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
      this.removeAttribute('data-placement');
    }
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
          pill: this.pill,
          // States
          disabled: this.disabled
        })}
        @pointerdown=${this.handleVisualBoxPointerDown}
      >
        <div id="preview"></div>
        <input
          id="text-box"
          part="text-box"
          type="text"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocapitalize="off"
          autocomplete=${ifDefined(this.autocomplete) as any}
          autocorrect="off"
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          aria-haspopup="dialog"
          aria-expanded=${this.isOpen ? 'true' : 'false'}
          aria-controls="color-picker"
          role="combobox"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
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
      </div>

      <quiet-color-picker
        id="color-picker"
        popover="manual"
        value=${this.value}
        size=${this.size}
        format=${this.format}
        swatches=${ifDefined(this.swatches)}
        ?with-opacity=${this.withOpacity}
        ?with-eye-dropper=${this.withEyeDropper}
        hidden
        role="dialog"
        @quiet-input=${this.handleColorPickerInput}
      ></quiet-color-picker>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-color-input': QuietColorInput;
  }
}
