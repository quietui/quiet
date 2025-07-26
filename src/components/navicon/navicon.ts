import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { QuietBlurEvent, QuietFocusEvent } from '../../events/form.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './navicon.styles.js';

/**
 * <quiet-navicon>
 *
 * @summary A navicon, or "hamburger button", is a special button used to control mobile navigation menus.
 * @documentation https://quietui.org/docs/components/navicon
 * @status stable
 * @since 1.0
 *
 * @event quiet-blur - Emitted when the navicon loses focus. This event does not bubble.
 * @event quiet-focus - Emitted when the navicon receives focus. This event does not bubble.
 *
 * @csspart line - The individual lines that make up the navicon symbol.
 * @csspart line-top - The top line.
 * @csspart line-middle - The middle line (hamburger symbol only).
 * @csspart line-bottom - The bottom line.
 *
 * @cssstate expanded - Applied when the navicon is toggled on.
 * @cssstate disabled - Applied when the navicon is disabled.
 * @cssstate focused - Applied when the navicon has focus.
 *
 * @cssproperty [--dot-size=0.125em] - The width of each dot. Available when symbol is `vertical-dots` or `horizontal-dots`.
 * @cssproperty [--line-width=0.0625em] - The width of each line. Available when symbol is `hamburger` or `equals`.
 * @cssproperty [--line-transition-duration=200ms] - The duration of the symbol's animation.
 * @cssproperty [--line-transition-easing=cubic-bezier(0.4, 0, 0.2, 1)] - The easing to use for the symbol's animation.
 * @cssproperty [--dot-size=0.125em] - The size of the dots in the dots symbol.
 */
@customElement('quiet-navicon')
export class QuietNavicon extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** Determines if the navicon is toggled on. */
  @property({ reflect: true, type: Boolean }) expanded = false;

  /** Determines the navicon's symbol. */
  @property({ reflect: true }) symbol: 'hamburger' | 'equals' | 'horizontal-dots' | 'vertical-dots' = 'hamburger';

  /** Disables the navicon. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The accessible label for the navicon. */
  @property() label = 'Toggle navigation';

  connectedCallback() {
    super.connectedCallback();

    // Set up the host element to be focusable and behave like a button
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');

    // Add event listeners to the host
    this.addEventListener('blur', this.handleBlur);
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up event listeners
    this.removeEventListener('blur', this.handleBlur);
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('expanded')) {
      this.customStates.set('expanded', this.expanded);
      this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    }

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || this.localize.term('toggleNavigation'));
    }

    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
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

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.expanded = !this.expanded;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.expanded = !this.expanded;
    }
  };

  render() {
    return html`
      <span
        class=${classMap({
          lines: this.symbol === 'hamburger' || this.symbol === 'equals',
          dots: this.symbol === 'vertical-dots' || this.symbol === 'horizontal-dots',
          'vertical-dots': this.symbol === 'vertical-dots',
          'horizontal-dots': this.symbol === 'horizontal-dots',
          hamburger: this.symbol === 'hamburger',
          equals: this.symbol === 'equals'
        })}
      >
        <span part="line line-top" class="line top"></span>
        ${['hamburger', 'vertical-dots', 'horizontal-dots'].includes(this.symbol)
          ? html`<span part="line line-middle" class="line middle"></span>`
          : ''}
        <span part="line line-bottom" class="line bottom"></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-navicon': QuietNavicon;
  }
}
