import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './scalable-text.styles.js';

//
// TODO - a race condition exists in the resize logic that can result in incorrect measurements when typing fast or
// when resizing the window, especially when you hit a breakpoint. The measurement of text seems stable, but resizing
// the container at the right time remains a problem.
//
// NOTE - it might help to debounce the resize and clearTimeout as resizing occurs.
//

/**
 * <quiet-scalable-text>
 *
 * @summary TODO
 * @documentation https://quietui.com/docs/components/scalable-text
 * @status experimental
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 */
@customElement('quiet-scalable-text')
export class QuietScalableText extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private resizeObserver = new ResizeObserver(() => this.resizeText());

  @query('#container') container: HTMLDivElement;
  @query('#text') textEl: HTMLDivElement;

  /** The text to scale. */
  @property() text = '';

  /** The text to scale. */
  @property({ attribute: 'min-font-size', type: Number }) minFontSize = 1;

  /** The text to scale. */
  @property({ attribute: 'max-font-size', type: Number }) maxFontSize = 256;

  /** The text to scale. */
  @property({ type: Number }) precision = 0.1;

  firstUpdated() {
    this.resizeObserver.observe(this);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('text')) {
      this.resizeText();
    }
  }

  /** Resizes the text to fit inside the container. */
  private resizeText() {
    const containerWidth = this.container.offsetWidth;
    let minSize = this.minFontSize;
    let maxSize = this.maxFontSize;
    let currentSize = maxSize;

    console.log('reflow');

    // Clone the text element to measure without affecting the existing DOM
    const clone = this.textEl.cloneNode(true) as HTMLElement;
    this.shadowRoot.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.width = 'auto';
    clone.style.whiteSpace = 'nowrap';

    // Use a binary search to find the optimal font size
    while (maxSize - minSize > this.precision) {
      clone.style.fontSize = `${currentSize}px`;
      const textWidth = clone.offsetWidth;

      if (textWidth === containerWidth) {
        break; // Perfect fit
      } else if (textWidth > containerWidth) {
        maxSize = currentSize;
      } else {
        minSize = currentSize;
      }

      currentSize = (minSize + maxSize) / 2;
    }

    // Apply the optimal font size
    this.textEl.style.fontSize = `${currentSize}px`;

    // Cleanup
    this.shadowRoot.removeChild(clone);
  }

  render() {
    return html`
      <div id="container">
        <div id="text">${this.text}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-scalable-text': QuietScalableText;
  }
}
