import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { parseSpaceDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './flip-card.styles.js';

/**
 * <quiet-flip-card>
 *
 * @summary Flip cards display information on two sides, allowing users to flip between the front and back.
 * @documentation https://quietui.com/docs/components/flip-card
 * @status stable
 * @since 1.0
 *
 * @slot front - Content to show on the front of the card.
 * @slot back - Content to show on the back of the card.
 *
 * @cssproperty [--flip-duration=0.5s] - The duration of the card flip animation.
 * @cssproperty [--spacing=1.5em] - The spacing to use throughout the flip card.
 */
@customElement('quiet-flip-card')
export class QuietFlipCard extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Flips the card. */
  @property({ type: Boolean, reflect: true }) flipped = false;

  /** Determines the flip direction. */
  @property({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return html`
      <div id="front" part="front" ?inert=${this.flipped} aria-hidden=${this.flipped ? 'true' : 'false'}>
        <slot name="front"></slot>
      </div>
      <div id="back" part="back" ?inert=${!this.flipped} aria-hidden=${this.flipped ? 'false' : 'true'}>
        <slot name="back"></slot>
      </div>
    `;
  }
}

//
// Watch for data-flip-card="*" clicks
//
document.addEventListener('click', (event: MouseEvent) => {
  const flipAttrEl = (event.target as Element).closest('[data-flip-card]');

  if (flipAttrEl instanceof Element) {
    const [command, id] = parseSpaceDelimitedTokens(flipAttrEl.getAttribute('data-flip-card') || '');
    let flipCard: QuietFlipCard | null;

    if (id) {
      const doc = flipAttrEl.getRootNode() as Document | ShadowRoot;
      flipCard = doc.getElementById(id) as QuietFlipCard;
    } else {
      flipCard = flipAttrEl.closest<QuietFlipCard>('quiet-flip-card');
    }

    // Execute the command on the target card
    if (flipCard?.localName === 'quiet-flip-card') {
      switch (command) {
        case 'front':
          flipCard.flipped = false;
          break;
        case 'back':
          flipCard.flipped = true;
          break;
        case 'toggle':
          flipCard.flipped = !flipCard.flipped;
          break;
      }
    } else {
      console.warn(`A flip card with an ID of "${id}" could not be found in this document.`);
    }
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'quiet-flip-card': QuietFlipCard;
  }
}
