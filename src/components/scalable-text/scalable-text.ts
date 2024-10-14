import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './scalable-text.styles.js';

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

  private resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target === this) {
        this.containerWidth = this.offsetWidth;
      }
    }
  });

  @query('#container') container: HTMLDivElement;
  @query('#text') textEl: HTMLDivElement;

  /** The text to scale. */
  @property() text = '';

  /** The text to scale. */
  @property({ attribute: 'min-font-size', type: Number }) minFontSize = 1;

  /** The text to scale. */
  @property({ attribute: 'max-font-size', type: Number }) maxFontSize = 128;

  /** The text to scale. */
  @property({ type: Number }) precision = 0.1;

  @state() private containerWidth = 0;

  firstUpdated() {
    this.resizeObserver.observe(this);
  }

  protected update(changedProperties: Map<PropertyKey, unknown>) {
    super.update(changedProperties);

    if (
      changedProperties.has('containerWidth') ||
      changedProperties.has('text') ||
      changedProperties.has('minFontSize') ||
      changedProperties.has('maxFontSize') ||
      changedProperties.has('precision')
    ) {
      this.resizeText();
    }
  }

  /** Resizes the text to fit inside the container. */
  private resizeText() {
    if (!this.textEl || this.containerWidth === 0) return;

    let minSize = this.minFontSize;
    let maxSize = this.maxFontSize;
    let currentSize = maxSize;

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

      if (textWidth === this.containerWidth) {
        break; // Perfect fit
      } else if (textWidth > this.containerWidth) {
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
