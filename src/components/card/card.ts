import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './card.styles.js';

/**
 * <quiet-card>
 *
 * @summary Cards provide a flexible and visually appealing way to organize and present content in a consistent and
 *  easily digestible format.
 * @documentation https://quietui.org/docs/components/card
 * @status stable
 * @since 1.0
 *
 * @slot - Content to place in the dialog's body.
 * @slot header - Content to place in the dialog's header.
 * @slot actions - Slot in one or more text buttons to add actions to the card's header. Only available when the header
 *  is enabled.
 * @slot footer - Content to place in the dialog's footer.
 *
 * @cssproperty [--spacing=1.5rem] - The spacing to use throughout the card.
 *
 * @csspart body - The container that wraps the card's body.
 * @csspart header - The container that wraps the card's header. A flex container, by default.
 * @csspart footer - The container that wraps the card's footer. A flex container, by default.
 * @csspart media - The container that wraps the card's media.
 */
@customElement('quiet-card')
export class QuietCard extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];
  static observeSlots = true;

  render() {
    return html`
      ${this.whenSlotted('media', html` <div id="media" part="media"><slot name="media"></slot></div> `)}
      ${this.whenSlotted(
        'header',
        html`
          <header id="header" part="header">
            <slot name="header"></slot>
            <slot id="actions" name="actions"></slot>
          </header>
        `
      )}

      <div id="body" part="body">
        <slot></slot>
      </div>

      ${this.whenSlotted('footer', html` <footer id="footer" part="footer"><slot name="footer"></slot></footer> `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-card': QuietCard;
  }
}
