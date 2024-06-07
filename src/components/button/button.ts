import '../icon/icon.js';
import '../spinner/spinner.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { QuietBlurEvent, QuietFocusEvent } from '../../events/form.js';
import { QuietClickEvent } from '../../events/pointer.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './button.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-button>
 *
 * @summary Buttons allow users to navigate, submit forms, and perform other actions.
 * @documentation https://quietui.com/docs/components/button
 * @status stable
 * @since 1.0
 *
 * @slot - The button's label.
 * @slot start - An icon or similar element to place before the label. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the label. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the button loses focus. This event does not bubble.
 * @event quiet-click - Emitted when the button is clicked. Will not be emitted when the button is disabled or loading.
 * @event quiet-focus - Emitted when the button receives focus. This event does not bubble.
 *
 * @cssstate disabled - Applied when the button is disabled.
 * @cssstate focused - Applied when the button has focus.
 * @cssstate toggled - Applied when a toggle button is activated.
 *
 * @csspart button - The internal `<button>` element. Other than `width`, this is where most custom styles should be
 *  applied.
 * @csspart caret - The caret icon, a `<quiet-icon>` element. Only present with the `with-caret` attribute.
 * @csspart spinner - The loading indicator, a `<quiet-spinner>` element. Only present with the `loading` attribute.
 * @csspart toggle-indicator - When the button is a toggle button, this is the indicator that shows the current state.
 *
 * @dependency quiet-icon
 * @dependency quiet-spinner
 */
@customElement('quiet-button')
export class QuietButton extends QuietElement {
  static formAssociated = true;
  static shadowRootOptions = { ...QuietElement.shadowRootOptions, delegatesFocus: true };
  static styles: CSSResultGroup = [hostStyles, styles];

  protected internals: ElementInternals;

  /** The type of button to render. */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'destructive' | 'text' | 'image' = 'secondary';

  /** Disables the button. Cannot be used with link buttons. */
  @property({ type: Boolean }) disabled = false;

  /** Draws the button in a loading state. */
  @property({ type: Boolean }) loading = false;

  /**
   * Turns the button into a two-state toggle button. Clicking once will turn it on. Clicking again will turn it off.
   * Cannot be used with links buttons or submit buttons.
   */
  @property({ reflect: true }) toggle?: 'on' | 'off';

  /** The button's size. */
  @property() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * To create an icon button, slot an icon into the button's default slot and set this attribute to an appropriate
   * label. The label won't be visible, but it will be available to assistive devices.
   */
  @property({ attribute: 'icon-label' }) iconLabel = '';

  /** Draws the button with outlines. */
  @property({ type: Boolean }) outline = false;

  /** Draws the button in a pill shape. */
  @property({ type: Boolean }) pill = false;

  /** Determines the button's type. */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  /** The name to submit when the button is used to submit the form. */
  @property() name = '';

  /** The value to submit when the button is used to submit the form. */
  @property() value = '';

  /** When true, the button will be rendered with a caret to indicate a dropdown menu. */
  @property({ attribute: 'with-caret', type: Boolean }) withCaret = false;

  /**
   * Set this to render the button as an `<a>` tag instead of a `<button>`. The button will act as a link. When this is
   * set, form attributes and features will not work.
   */
  @property() href = '';

  /** Opens the link in the specified target. Only works with link buttons. */
  @property() target: '_blank' | '_parent' | '_self' | '_top' | undefined;

  /**
   *  Sets the link's `rel` attribute. Only works with link buttons. Note that the default value is
   * `noreferrer noopener`, meaning you might need to set it to an empty string if you're also using `target`.
   */
  @property() rel = 'noreferrer noopener';

  /** Sets the link's `download` attribute, causing the linked file to be downloaded. Only works with link buttons. */
  @property() download?: string;

  /**
   * The form to associate the button with. If omitted, the closest containing form element will be used. The value of
   * this attribute must be an id of a form in the same document or shadow root as the button.
   */
  @property() form: string | undefined;

  /** Overrides the containing form's `action` attribute. */
  @property({ attribute: 'formaction' }) formAction: string | undefined;

  /** Overrides the containing form's `enctype` attribute. */
  @property({ attribute: 'formenctype' }) formEnctype:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'
    | undefined;

  /** Overrides the containing form's `method` attribute. */
  @property({ attribute: 'formmethod' }) formMethod: 'post' | 'get' | undefined;

  /** Overrides the containing form's `novalidate` attribute. */
  @property({ attribute: 'formnovalidate', type: Boolean }) formNoValidate: boolean | undefined;

  /** Overrides the containing form's `target` attribute. */
  @property({ attribute: 'formtarget' }) formTarget: '_self' | '_blank' | '_parent' | '_top' | string | undefined;

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  }

  private handleClick() {
    // Don't do anything when the button is busy
    if (this.disabled || this.loading) {
      return;
    }

    // Emit quiet-click and stop if it gets canceled
    const clickEvent = new QuietClickEvent();
    this.dispatchEvent(clickEvent);
    if (clickEvent.defaultPrevented) {
      return;
    }

    // Update toggle buttons
    if (this.toggle !== undefined) {
      this.toggle = this.toggle === 'on' ? 'off' : 'on';
      this.customStates.set('toggled', this.toggle === 'on');
    }

    // Reset the form
    if (this.type === 'reset' && this.internals.form) {
      this.internals.form.reset();
      return;
    }

    // Submit the form
    if (this.type === 'submit' && this.internals.form) {
      //
      // Create a temporary submitter so the button's value gets passed to the form. This is a platform limitation.
      //
      // More info: https://github.com/WICG/webcomponents/issues/814
      //
      const submitter = document.createElement('button');
      submitter.classList.add('visually-hidden');
      submitter.type = 'submit';
      submitter.name = this.name;
      submitter.value = this.value;

      // Pass form attributes through
      ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach(attr => {
        if (this.hasAttribute(attr)) {
          submitter.setAttribute(attr, this.getAttribute(attr) ?? '');
        }
      });

      this.internals.form.append(submitter);
      submitter.click();
      submitter.remove();
    }
  }

  render() {
    const isLink = this.href !== '';
    const isDisabled = !isLink && (this.disabled || this.loading);
    const isLoading = !isLink && this.loading;
    const isSubmit = this.type === 'submit';
    const isToggle = this.toggle !== undefined && !isLink && !isSubmit;
    const tag = isLink ? literal`a` : literal`button`;

    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`
      <${tag}
        part="button"
        class=${classMap({
          button: true,
          // Variants
          primary: this.variant === 'primary',
          secondary: this.variant === 'secondary',
          destructive: this.variant === 'destructive',
          text: this.variant === 'text',
          image: this.variant === 'image',
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // Modifiers
          outline: this.outline,
          pill: this.pill,
          icon: this.iconLabel !== '',
          // States
          disabled: isDisabled,
          loading: isLoading
        })}
        id="button"
        type=${ifDefined(isLink ? undefined : this.type)}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        name=${ifDefined(isLink ? undefined : this.name)}
        value=${ifDefined(isLink ? undefined : this.value)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink ? this.rel : undefined)}
        aria-label=${ifDefined(this.iconLabel ? this.iconLabel : undefined)}
        aria-pressed=${ifDefined(isToggle ? (this.toggle === 'on' ? 'true' : 'false') : undefined)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        ${this.withCaret ? html`<quiet-icon part="caret" class="caret" slot="end" name="chevron-down" library="system"></quiet-icon>` : ''}
        ${isToggle ? html`<span part="toggle-indicator" id="toggle-indicator"></span>` : ''}
        ${isLoading ? html`<quiet-spinner part="spinner" class="spinner"></quiet-spinner>` : ''}
      </${tag}>
    `;
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-button': QuietButton;
  }
}
