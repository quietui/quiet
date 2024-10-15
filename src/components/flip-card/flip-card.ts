import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './flip-card.styles.js';

//
// TODO - make it announce the card's content, maybe move the "card flipped to front/back" text to aria-live
//
// TODO - make the width/height more variable so they don't have to be specific pixel values
//

/**
 * <quiet-flip-card>
 *
 * @summary Flip cards display information on two sides, allowing users to flip between the front and back.
 * @documentation https://quietui.com/docs/components/flip-card
 * @status experimental
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-flip-card')
export class QuietFlipCard extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('.card') card!: HTMLElement;

  @property({ type: Boolean, reflect: true }) flipped = false;

  handleClick() {
    this.flipped = !this.flipped;
  }

  handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('flipped')) {
      this.updateAccessibility();
    }
  }

  updateAccessibility() {
    const activeSlot = this.flipped ? 'back' : 'front';

    // Announce the flip action for screen readers
    this.card.setAttribute('aria-label', `Card flipped to ${activeSlot}`);

    // Blur the card, then refocus it so it announces in screen readers
    this.card.blur();
    setTimeout(() => this.card.focus(), 100);
  }

  render() {
    return html`
      <div
        class="card ${this.flipped ? 'flipped' : ''}"
        @click="${this.handleClick}"
        @keydown="${this.handleKeydown}"
        role="button"
        tabindex="0"
        aria-label="Flip card"
      >
        <div class="face front">
          <slot name="front"></slot>
        </div>
        <div class="face back">
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
