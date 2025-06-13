import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, literal } from 'lit/static-html.js';
import { QuietBlurEvent, QuietFocusEvent } from '../../events/form.js';
import hostStyles from '../../styles/host.styles.js';
import { LongPress } from '../../utilities/long-press.js';
import { QuietFormControlElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import '../spinner/spinner.js';
import styles from './button.styles.js';

/**
 * <quiet-button>
 *
 * @summary Allows users to navigate, submit forms, and perform other actions.
 * @documentation https://quietui.org/docs/components/button
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 * @dependency quiet-spinner
 *
 * @slot - The button's label.
 * @slot start - An icon or similar element to place before the label. Works great with `<quiet-icon>`.
 * @slot end - An icon or similar element to place after the label. Works great with `<quiet-icon>`.
 *
 * @event quiet-blur - Emitted when the button loses focus. This event does not bubble.
 * @event quiet-long-press - Emitted when the button is pressed and held by tapping or with the mouse. You can look at
 *  `event.detail.originalEvent.type` to see the type of event that initiated the long press.
 * @event quiet-focus - Emitted when the button receives focus. This event does not bubble.
 *
 * @csspart button - The internal `<button>` element. Other than `width`, this is where most custom styles should be
 *  applied.
 * @csspart caret - The caret icon, a `<quiet-icon>` element. Only present with the `with-caret` attribute.
 * @csspart caret__svg - The caret icon's `<svg>` part.
 * @csspart spinner - The loading indicator, a `<quiet-spinner>` element. Only present with the `loading` attribute.
 * @csspart toggle-indicator - When the button is a toggle button, this is the indicator that shows the current state.

 * @cssstate disabled - Applied when the button is disabled.
 * @cssstate focused - Applied when the button has focus.
 * @cssstate loading - Applied when a toggle button is loading.
 * @cssstate toggled - Applied when a toggle button is activated.
 */
@customElement('quiet-button')
export class QuietButton extends QuietFormControlElement {
  static formAssociated = true;
  static shadowRootOptions = { ...QuietFormControlElement.shadowRootOptions, delegatesFocus: true };
  static styles: CSSResultGroup = [hostStyles, styles];

  protected internals: ElementInternals;
  private longPress: LongPress;
  protected get focusableAnchor() {
    return this.shadowRoot.querySelector('button')!;
  }

  /** Determines the button's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'outline' | 'text' | 'image' = 'normal';

  /** The type of button to render. This attribute has no effect on text or image buttons. */
  @property({ reflect: true }) variant: 'default' | 'primary' | 'destructive' = 'default';

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the button in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**
   * Turns the button into a two-state toggle button. Clicking once will turn it on. Clicking again will turn it off.
   * Cannot be used with links buttons or submit buttons.
   */
  @property({ reflect: true }) toggle?: 'on' | 'off';

  /** The button's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * To create an icon button, slot an icon into the button's default slot and set this attribute to an appropriate
   * label. The label won't be visible, but it will be available to assistive devices.
   */
  @property({ attribute: 'icon-label' }) iconLabel: string;

  /** Draws the button in a pill shape. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Determines the button's type. */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  /** The name to submit when the button is used to submit the form. */
  @property({ reflect: true }) name: string;

  /** The value to submit when the button is used to submit the form. */
  @property() value = '';

  /** When true, the button will be rendered with a caret to indicate a dropdown menu. */
  @property({ attribute: 'with-caret', type: Boolean, reflect: true }) withCaret = false;

  /**
   * Set this to render the button as an `<a>` tag instead of a `<button>`. The button will act as a link. When this is
   * set, form attributes and features will not work.
   */
  @property() href: string;

  /** Opens the link in the specified target. Only works with link buttons. */
  @property() target: '_blank' | '_parent' | '_self' | '_top' | undefined;

  /**
   * Sets the link's `rel` attribute. Only works with link buttons. When linking to an external domain, you should
   * probably set this to `noreferrer noopener`.
   */
  @property() rel?: string;

  /** Sets the link's `download` attribute, causing the linked file to be downloaded. Only works with link buttons. */
  @property() download?: string;

  /**
   * The form to associate this control with. If omitted, the closest containing `<form>` will be used. The value of
   * this attribute must be an ID of a form in the same document or shadow root.
   */
  @property() form: string;

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

  firstUpdated() {
    const button = this.shadowRoot.getElementById('button')!;
    this.longPress = new LongPress(button, { eventName: 'quiet-long-press' });
    this.longPress.start();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('loading')) {
      this.customStates.set('loading', this.loading);
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

  private handleClick(event: MouseEvent) {
    // Ignore clicks when the button is disabled or busy
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
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
      submitter.style.position = 'absolute';
      submitter.style.width = '1px';
      submitter.style.height = '1px';
      submitter.style.overflow = 'hidden';
      submitter.style.whiteSpace = 'nowrap';
      submitter.style.clipPath = 'inset(50%)';
      submitter.type = 'submit';
      if (this.name) submitter.name = this.name;
      if (this.value) submitter.value = this.value;

      // Pass form attributes through
      ['formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'].forEach(attr => {
        if (this.hasAttribute(attr)) {
          submitter.setAttribute(attr, this.getAttribute(attr) ?? '');
        }
      });

      this.internals.form.append(submitter);
      requestAnimationFrame(() => {
        submitter.click();
        submitter.remove();
      });
    }
  }

  render() {
    const isLink = typeof this.href === 'string';
    const isDisabled = this.disabled || (!isLink && this.loading);
    const isLoading = !isLink && this.loading;
    const isSubmit = this.type === 'submit';
    const isToggle = this.toggle !== undefined && !isLink && !isSubmit;
    const tag = isLink ? literal`a` : literal`button`;

    return html`
      <${tag}
        id="button"
        part="button"
        class=${classMap({
          // Variants
          default: this.variant === 'default',
          primary: this.variant === 'primary',
          destructive: this.variant === 'destructive',
          // Appearances
          normal: this.appearance === 'normal',
          outline: this.appearance === 'outline',
          text: this.appearance === 'text',
          image: this.appearance === 'image',
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // Modifiers
          pill: this.pill,
          icon: this.iconLabel?.length > 0,
          // States
          disabled: isDisabled,
          loading: isLoading
        })}
        type=${ifDefined(isLink ? undefined : this.type)}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        value=${ifDefined(isLink ? undefined : this.value)}
        href=${ifDefined(isLink && !this.disabled ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.rel ? this.rel : undefined)}
        aria-label=${ifDefined(this.iconLabel ? this.iconLabel : undefined)}
        aria-pressed=${ifDefined(isToggle ? (this.toggle === 'on' ? 'true' : 'false') : undefined)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
        ${this.withCaret ? html`<quiet-icon id="caret" part="caret" exportparts="svg:caret__svg" slot="end" name="chevron-down" library="system"></quiet-icon>` : ''}
        ${isToggle ? html`<span part="toggle-indicator" id="toggle-indicator"></span>` : ''}
        ${isLoading ? html`<quiet-spinner id="spinner" part="spinner"></quiet-spinner>` : ''}
      </${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-button': QuietButton;
  }
}
