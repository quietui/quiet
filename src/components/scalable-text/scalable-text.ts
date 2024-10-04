import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './scalable-text.styles.js';

/**
 * <quiet-scalable-text>
 *
 * @summary TODO
 * @documentation https://quietui.com/docs/components/scalable-text
 * @status experimental
 * @since TODO
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-scalable-text')
export class QuietScalableText extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => this.resizeText());
  });

  @query('#text') textEl: HTMLSpanElement;

  /** The text to scale. */
  @property() text = '';

  firstUpdated() {
    this.resizeObserver.observe(this);
    this.resizeObserver.observe(this.textEl);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('text')) {
      this.resizeText();
    }
  }

  private resizeText() {
    const containerWidth = this.clientWidth;
    const maxWidth = containerWidth - 1;
    const minFontSize = 0.1;
    const maxFontSize = 1000; // Reasonable upper bound
    let low = minFontSize;
    let high = maxFontSize;
    let bestFit = minFontSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      this.textEl.style.fontSize = `${mid}px`;

      if (this.textEl.offsetWidth <= maxWidth) {
        bestFit = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Set the font size to the size that fits best
    this.textEl.style.fontSize = `${bestFit}px`;

    //
    // TODO - fine tune letter spacing somehow. Long strings still have padding for some reason.
    //
    //
    // TODO - is there a better way with SVG or not?
    //
  }

  render() {
    return html` <span id="text">${this.text}</span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-scalable-text': QuietScalableText;
  }
}
