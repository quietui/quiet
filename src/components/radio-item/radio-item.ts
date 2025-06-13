import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietBlurEvent, QuietFocusEvent } from '../../events/form.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './radio-item.styles.js';

/**
 * <quiet-radio-item>
 *
 * @summary Represents individual choices within a radio.
 * @documentation https://quietui.org/docs/components/radio-item
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The radio item's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @event quiet-blur - Emitted when the radio item loses focus. This event does not bubble.
 * @event quiet-focus - Emitted when the radio item receives focus. This event does not bubble.
 *
 * @csspart label - The `<label>` that wraps the entire control.
 * @csspart visual-box - The element that wraps the internal radio.
 * @csspart radio-icon - The radio icon, a `<quiet-icon>` element.
 * @csspart radio-icon__svg - The radio icon's `svg` part.
 *
 * @cssstate checked - Applied when the radio item is checked.
 * @cssstate disabled - Applied when the radio item is disabled.
 * @cssstate focused - Applied when the radio item has focus.
 */
@customElement('quiet-radio-item')
export class QuietRadioItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /**
   * The radio item's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The radio item's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The radio item's value. */
  @property() value = '';

  /** The radio item's checked state. */
  @property({ type: Boolean }) checked = false;

  /** Disables the radio item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The type of radio item to render. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' = 'normal';

  /** The radio item's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('blur', this.handleBlur);
  }

  firstUpdated() {
    this.setAttribute('role', 'radio');
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle checked
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.customStates.set('checked', this.checked);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);

      // Tell the controller to reset the roving tab index if a selected radio becomes disabled
      if (this.checked && this.disabled) {
        this.closest('quiet-radio')?.resetRovingTabIndex();
      }
    }
  }

  private handleBlur = () => {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  };

  private handleFocus = () => {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  };

  render() {
    return html`
      <div id="label" part="label">
        <div
          id="visual-box"
          part="visual-box"
          aria-hidden="true"
          class=${classMap({
            /* Appearances */
            normal: this.appearance === 'normal',
            filled: this.appearance === 'filled',
            /* Sizes */
            xs: this.size === 'xs',
            sm: this.size === 'sm',
            md: this.size === 'md',
            lg: this.size === 'lg',
            xl: this.size === 'xl',
            /* States */
            checked: this.checked,
            disabled: this.disabled
          })}
        >
          <quiet-icon
            id="radio-icon"
            part="radio-icon"
            exportparts="radio-icon__svg"
            library="system"
            family="filled"
            name="circle"
          ></quiet-icon>
        </div>
        <slot>${this.label}</slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-radio-item': QuietRadioItem;
  }
}
