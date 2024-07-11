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

  /** Renders the card with the `header` slot. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the card with the `footer` slot. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

  /** Renders the card with the `media` slot. */
  @property({ attribute: 'with-media', type: Boolean, reflect: true }) withMedia = false;

  render() {
    return html`
      ${this.withMedia ? html` <div id="media" part="media"><slot name="media"></slot></div> ` : ''}
      ${this.withHeader
        ? html`
            <header id="header" part="header">
              <slot name="header"></slot>
              <slot id="actions" name="actions"></slot>
            </header>
          `
        : ''}

      <div id="body" part="body">
        <slot></slot>
      </div>

      ${this.withFooter ? html` <footer id="footer" part="footer"><slot name="footer"></slot></footer> ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-card': QuietCard;
  }
}
