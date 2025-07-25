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
 * @summary A navicon, or "hamburger button", typically controls a navigation menu and shows a sleek animation when
 *  toggled.
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
 * @cssstate activated - Applied when the navicon is activated.
 * @cssstate disabled - Applied when the navicon is disabled.
 * @cssstate focused - Applied when the navicon has focus.
 *
 * @cssproperty [--line-width=0.0625em] - The spacing between lines from the edges. Defaults to 25%.
 * @cssproperty [--line-transition-duration=200ms] - The duration of the symbol's animation.
 * @cssproperty [--line-transition-easing=cubic-bezier(0.4, 0, 0.2, 1)] - The easing to use for the symbol's animation.
 */
@customElement('quiet-navicon')
export class QuietNavicon extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** True when the navicon is activated (e.g. showing a menu). */
  @property({ reflect: true, type: Boolean }) activated = false;

  /** Determines the navicon's symbol. */
  @property({ reflect: true }) symbol: 'hamburger' | 'equals' = 'hamburger';

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
    if (changedProperties.has('activated')) {
      this.customStates.set('activated', this.activated);
      this.setAttribute('aria-expanded', this.activated ? 'true' : 'false');
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

    this.activated = !this.activated;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.activated = !this.activated;
    }
  };

  render() {
    return html`
      <span
        class=${classMap({
          lines: true,
          hamburger: this.symbol === 'hamburger',
          equals: this.symbol === 'equals'
        })}
      >
        <span part="line line-top" class="line top"></span>
        ${this.symbol === 'hamburger' ? html`<span part="line line-middle" class="line middle"></span>` : ''}
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
