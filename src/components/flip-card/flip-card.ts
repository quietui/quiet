import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { QuietBeforeFlipEvent, QuietFlipEvent } from '../../events/flip.js';
import hostStyles from '../../styles/host.styles.js';
import { parseDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './flip-card.styles.js';

/**
 * <quiet-flip-card>
 *
 * @summary Displays information on two sides, allowing users to flip between the front and back with the click of a
 *  button.
 * @documentation https://quietui.com/docs/components/flip-card
 * @status stable
 * @since 1.0
 *
 * @slot front - The content to show on the front of the card.
 * @slot back - The content to show on the back of the card.
 *
 * @event quiet-before-flip - Emitted when the flip card is instructed to flip but before it actually flips. Calling
 *  `event.preventDefault()` will prevent the flip card from flipping.
 * @event quiet-flip - Emitted after the flip card has been flipped and the animation has completed.
 *
 * @cssproperty [--flip-duration=0.6s] - The duration of the card flip animation.
 * @cssproperty [--flip-easing=cubic-bezier(0.2, 0.85, 0.3, 1.15)] - The easing to use for the flip animation.
 *
 * @cssstate flipped - Applied when the card is flipped over.
 */
@customElement('quiet-flip-card')
export class QuietFlipCard extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private isFirstUpdate = true;
  private preventNextUpdate = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('slot[name="back"]') backSlot: HTMLSlotElement;

  /** Flips the card. */
  @property({ type: Boolean, reflect: true }) flipped = false;

  /** Determines the flip direction. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  async updated(changedProperties: PropertyValues<this>) {
    // To prevent the card from animating when `flipped` is true initially, we'll wait for the first update and set
    // data-can-transition to enable transitions on subsequent updates.
    if (this.isFirstUpdate) {
      requestAnimationFrame(() => {
        this.setAttribute('data-can-transition', '');
      });
    }

    if (this.preventNextUpdate) {
      this.preventNextUpdate = false;
      return;
    }

    // Handle flipped custom state
    if (changedProperties.has('flipped')) {
      this.customStates.set('flipped', this.flipped);
    }

    // Handle flips
    if (!this.isFirstUpdate && changedProperties.has('flipped')) {
      const flipEvent = new QuietBeforeFlipEvent();
      this.dispatchEvent(flipEvent);

      // The event was canceled, revert and skip the next update
      if (flipEvent.defaultPrevented) {
        this.preventNextUpdate = true;
        this.flipped = !this.flipped;
        return;
      }

      // If an autofocus element exists in the current side, focus it
      const currentSlot = this.flipped ? this.backSlot : this.defaultSlot;
      const elementsWithAutofocus = this.querySelectorAll<HTMLElement>('[autofocus]');
      const assignedElements = currentSlot.assignedElements({ flatten: true });
      const elementToFocus = [...elementsWithAutofocus].find(el =>
        assignedElements.some(assigned => assigned === el || assigned.contains(el))
      );

      // Focus the element if found
      if (elementToFocus) {
        elementToFocus.focus();
      }

      // Dispatch `quiet-flipped` when the transition is done
      this.addEventListener('transitionend', () => this.dispatchEvent(new QuietFlipEvent()), { once: true });
    }

    this.isFirstUpdate = false;
  }

  render() {
    return html`
      <div id="front" part="front" ?inert=${this.flipped}>
        <slot name="front"></slot>
      </div>
      <div id="back" part="back" ?inert=${!this.flipped}>
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
    const [command, id] = parseDelimitedTokens(flipAttrEl.getAttribute('data-flip-card') || '');
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
      console.warn(`A flip card with an ID of "${id}" could not be found in this document.`, this);
    }
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'quiet-flip-card': QuietFlipCard;
  }
}
