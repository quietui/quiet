import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import {
  QuietBlurEvent,
  QuietChangeEvent,
  QuietFocusEvent,
  QuietInputCompleteEvent,
  QuietInputEvent
} from '../../events/form.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './passcode.styles.js';

/**
 * <quiet-passcode>
 *
 * @summary Passcodes let users enter fixed-length passcodes, verification tokens, one-time codes, and similar data in a
 *  user-friendly way.
 * @documentation https://quietui.org/docs/components/passcode
 * @status stable
 * @since 1.0
 *
 * @slot label - The passcode's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The passcode's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 *
 * @event quiet-blur - Emitted when the passcode loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user commits changes to the passcode's value.
 * @event quiet-focus - Emitted when the passcode receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the passcode receives input.
 * @event quiet-input-complete - Emitted when the final character in the passcode is entered.
 *
 * @csspart label - The element that contains the passcode's label.
 * @csspart description - The element that contains the passcode's description.
 * @csspart visual-box - The element that wraps the characters, delimiters, and the hidden input.
 * @csspart character-box - Each individual character box.
 * @csspart delimiter - Each individual delimiter.
 *
 * @cssstate disabled - Applied when the passcode is disabled.
 * @cssstate blank - Applied when the passcode has a blank value.
 * @cssstate focused - Applied when the passcode has focus.
 * @cssstate user-valid - Applied when the passcode is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the passcode is invalid and the user has sufficiently interacted with it.
 */
@customElement('quiet-passcode')
export class QuietPasscode extends QuietElement {
  static formAssociated = true;
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  private localize = new Localize(this);

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;

  @query('input') private textBox: HTMLInputElement;

  @state() isInvalid = false;
  @state() wasChanged = false;
  @state() wasSubmitted = false;

  /**
   * The passcode's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The passcode's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the passcode. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** The passcode's value. */
  @property() value = '';

  /**
   * The format of the passcode. This dictates the number of characters and where delimiters will show. Use `#` to
   * represent an allowed character. Use a space, dash, or any other character to represent a delimiter. Delimiters are
   * shown for visual clarity, but won't be included in the submitted value.
   */
  @property() format = '####';

  /** Disables the passcode. */
  @property({ type: Boolean }) disabled = false;

  /** The type of passcode to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

  /** The passcode's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Masks the characters so they're not displayed on screen.=. */
  @property({ type: Boolean }) masked = false;

  /** The type of characters to allow in the input. */
  @property() type: 'numeric' | 'alpha' | 'alphanumeric' | 'any' = 'numeric';

  /** Makes the passcode case sensitive. */
  @property({ attribute: 'case-sensitive', type: Boolean, reflect: true }) caseSensitive = false;

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

  /**
   * Makes the passcode required. Form submission will not be allowed when this is set and the passcode is blank.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** A regular expression the value should match to be considered valid. */
  @property() pattern: string;

  /**
   * You can provide a custom error message to force the passcode to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  /**
   * Tells the browser how to autocomplete the passcode. See [this page](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   * for available values.
   */
  @property() autocomplete = 'one-time-code';

  /** Tells the browser to focus the passcode when the page loads or a dialog is shown. */
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

  updated(changedProperties: PropertyValues<this>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProperties.has('value')) {
      // Enforce allowed characters
      this.value = this.value
        .split('')
        .filter(char => {
          switch (this.type) {
            case 'alpha':
              return /[A-Z]/i.test(char);
            case 'alphanumeric':
              return /[A-Z0-9]/i.test(char);
            case 'any':
              return true;
            default:
              return /[0-9]/.test(char);
          }
        })
        .join('');

      this.customStates.set('blank', this.value === '');
      this.internals.setFormValue(this.value);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
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

  /** Returns the total number of characters, excluding delimiters, in the current format. */
  private getTotalCharacters() {
    return this.format.split('').filter(char => char === '#').length;
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
    this.moveCursorToEnd();
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
    this.moveCursorToEnd();
    await this.updateComplete;
    this.dispatchEvent(new QuietInputEvent());

    if (this.value.length === this.getTotalCharacters()) {
      this.dispatchEvent(new QuietInputCompleteEvent());
    }
  }

  private async handleKeyDown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;

    // When enter is pressed in a passcode, the associated form should submit
    if (event.key === 'Enter' && this.associatedForm) {
      const submitter = [...this.associatedForm.elements].find((el: HTMLInputElement | HTMLButtonElement) => {
        // The first submit button associated with the form will be the submitter. At this time, only native buttons
        // can be submitters (see https://github.com/WICG/webcomponents/issues/814)
        return ['button', 'input'].includes(el.localName) && el.type === 'submit';
      }) as HTMLElement;

      this.associatedForm.requestSubmit(submitter);
    }

    if (event.key === 'Escape') {
      // If it's already clear, let the event bubble
      if (this.value === '') return;

      event.stopPropagation();
      this.value = '';

      if (oldValue !== this.value) {
        await this.updateComplete;
        this.dispatchEvent(new QuietInputEvent());
        this.dispatchEvent(new InputEvent('input'));
        this.dispatchEvent(new QuietChangeEvent());
        this.dispatchEvent(new InputEvent('change'));
      }
    }

    if (event.key !== 'Tab') {
      requestAnimationFrame(() => this.moveCursorToEnd());
    }

    // Delete when arrow keys are pressed
    if ((!isRtl && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
      this.value = this.value.slice(0, this.value.length - 1);

      if (oldValue !== this.value) {
        await this.updateComplete;
        this.dispatchEvent(new QuietInputEvent());
        this.dispatchEvent(new InputEvent('input'));
        this.dispatchEvent(new QuietChangeEvent());
        this.dispatchEvent(new InputEvent('change'));
      }
    }
  }

  private handlePointerDown(event: PointerEvent) {
    this.focus();
    this.moveCursorToEnd();
    event.preventDefault();
  }

  private handleSelect() {
    this.moveCursorToEnd();
  }

  private moveCursorToEnd() {
    this.textBox.setSelectionRange(this.value.length, this.value.length);
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

  /** Sets focus to the passcode. */
  public focus() {
    this.textBox.focus();
  }

  /** Removes focus from the passcode. */
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

  render() {
    const hasLabel = this.label || this.slotsWithContent.has('label');
    const hasDescription = this.description || this.slotsWithContent.has('description');
    const totalCharacters = this.getTotalCharacters();
    const isFull = this.value.length === totalCharacters;
    const boxes = this.format.split('').map(format => (format === '#' ? 'character' : 'delimiter'));
    let charPosition = 0;

    return html`
      <label id="label" part="label" for="text-box" class=${classMap({ 'visually-hidden': !hasLabel })}>
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description" class=${classMap({ 'visually-hidden': !hasDescription })}>
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
          // States
          'case-sensitive': this.caseSensitive,
          disabled: this.disabled,
          masked: this.masked
        })}
      >
        ${boxes.map((box, index) => {
          if (box === 'character') charPosition++;
          const isCharacter = box === 'character';
          const isCurrent =
            isCharacter && (charPosition === this.value.length + 1 || (isFull && charPosition === totalCharacters));
          const isBlank = this.value.charAt(charPosition - 1) === '';
          const isLast = charPosition === totalCharacters;

          // Character boxes
          if (isCharacter) {
            return html`
              <div
                part="character-box"
                class=${classMap({
                  blank: isBlank,
                  character: true,
                  current: isCurrent,
                  last: isLast
                })}
                aria-hidden="true"
              >
                ${this.masked ? '' : this.value.charAt(charPosition - 1) || ''}
              </div>
            `;
          }

          // Delimiters
          return html` <div part="delimiter" class="delimiter">${this.format.charAt(index)}</div>`;
        })}

        <input
          id="text-box"
          type="text"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?required=${this.required}
          pattern=${ifDefined(this.pattern)}
          minlength=${ifDefined(totalCharacters)}
          maxlength=${ifDefined(totalCharacters)}
          .value=${live(this.value) /* live() is required for proper validation */}
          autocapitalize="off"
          autocomplete=${ifDefined(this.autocomplete)}
          autocorrect="off"
          spellcheck="false"
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${this.type === 'numeric' ? 'numeric' : 'text'}
          aria-describedby="description"
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @change=${this.handleChange}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          @pointerdown=${this.handlePointerDown}
          @select=${this.handleSelect}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-passcode': QuietPasscode;
  }
}
