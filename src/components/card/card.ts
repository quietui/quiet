import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './card.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-card>
 *
 * @summary Cards provide a flexible and visually appealing way to organize and present content in a consistent and easily digestible format.
 * @documentation https://quietui.com/docs/components/card
 * @status stable
 * @since 1.0
 *
 * @csspart body - The container that wraps the card's body.
 * @csspart header - The container that wraps the card's header. A flex container, by default.
 * @csspart footer - The container that wraps the card's footer. A flex container, by default.
 * @csspart media - The container that wraps the card's media.
 *
 * @cssproperty [--spacing=1.5rem] - The spacing to use throughout the card.
 */
@customElement('quiet-card')
export class Card extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Renders the card with the `header` slot. */
  @property({ attribute: 'with-header', type: Boolean }) withHeader = false;

  /** Renders the card with the `footer` slot. */
  @property({ attribute: 'with-footer', type: Boolean }) withFooter = false;

  /** Renders the card with the `media` slot. */
  @property({ attribute: 'with-media', type: Boolean }) withMedia = false;

  private handleBodySlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const els = slot.assignedElements({ flatten: true });

    // Apply a class to the first and last slotted element in the body so we can zero out the top and bottom margins
    // with CSS. Alas, we can't do it with only CSS yet because :first-child and :last-child consider the position of
    // all elements in the light DOM, so if a header or footer is present, those will be targeted instead.
    els.forEach((el, index) => {
      el.classList.toggle('quiet__first', index === 0);
      el.classList.toggle('quiet__last', index === els.length - 1);
    });
  }

  render() {
    return html`
      ${this.withMedia ? html` <div part="media" class="media"><slot name="media"></slot></div> ` : ''}
      ${this.withHeader ? html` <header part="header" class="header"><slot name="header"></slot></header> ` : ''}

      <div part="body" class="body">
        <slot @slotchange=${this.handleBodySlotChange}></slot>
      </div>

      ${this.withFooter ? html` <footer part="footer" class="footer"><slot name="footer"></slot></footer> ` : ''}
    `;
  }
}
