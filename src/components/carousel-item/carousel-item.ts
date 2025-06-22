import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './carousel-item.styles.js';

/**
 * <quiet-carousel-item>
 *
 * @summary Represents individual items used in a carousel.
 * @documentation https://quietui.com/docs/components/carousel
 * @status stable
 * @since 1.0
 *
 * @slot - The content to show inside the carousel item.
 *
 * @csspart content - A flex wrapper around the carousel item's content.
 */
@customElement('quiet-carousel-item')
export class QuietCarouselItem extends QuietElement {
  static styles: CSSResultGroup = styles;

  /** An optional name for the carousel item so you can reference it with the `active-name` attribute. */
  @property() name = '';

  firstUpdated() {
    this.setAttribute('role', 'group');
    this.setAttribute('aria-roledescription', 'slide');
  }

  render() {
    return html`
      <div id="content" part="content">
        <slot></slot>
      </div>
    `;
  }
}
