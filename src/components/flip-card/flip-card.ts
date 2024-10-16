import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './flip-card.styles.js';

/**
 * <quiet-flip-card>
 *
 * @summary Flip cards display information on two sides, allowing users to flip between the front and back.
 * @documentation https://quietui.com/docs/components/flip-card
 * @status experimental
 * @since 1.0
 *
 * @slot card - The element that wraps the front and back card faces. (Required to link aria- attributes.)
 * @slot front - Content to show on the front of the card.
 * @slot back - Content to show on the back of the card.
 */
@customElement('quiet-flip-card')
export class QuietFlipCard extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** Flips the card. */
  @property({ type: Boolean, reflect: true }) flipped = false;

  /** Determines the flip direction. */
  @property({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';

  handleClick() {
    this.flipped = !this.flipped;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    return html`
      <div
        id="card"
        part="card"
        class=${classMap({
          flipped: this.flipped,
          horizontal: this.direction === 'horizontal',
          vertical: this.direction === 'vertical'
        })}
        role="button"
        tabindex="0"
        role="button"
        aria-expanded=${this.flipped ? 'true' : 'false'}
        aria-description=${this.localize.term('pressSpaceToFlipTheCard')}
        aria-controls="back"
        @click="${this.handleClick}"
        @keydown="${this.handleKeyDown}"
      >
        <div id="front" part="front" aria-hidden=${this.flipped ? 'true' : 'false'}>
          <slot name="front"></slot>
        </div>
        <div id="back" part="back" ?inert=${!this.flipped} aria-hidden=${this.flipped ? 'false' : 'true'}>
          <slot name="back"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-flip-card': QuietFlipCard;
  }
}
