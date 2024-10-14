import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { getSlotText } from '../../utilities/html.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './fit-text.styles.js';

/**
 * <quiet-fit-text>
 *
 * @summary Fit text scales a line of text to meet the width of its container.
 * @documentation https://quietui.com/docs/components/fit-text
 * @status experimental
 * @since 1.0
 *
 * @slot - One or more text nodes to display. Non-text nodes will be ignored.
 */
@customElement('quiet-fit-text')
export class QuietFitText extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target === this) {
        this.containerWidth = this.clientWidth;
      }
    }
  });

  @query('#measure') measure: HTMLSpanElement;
  @query('slot') defaultSlot: HTMLSlotElement;

  @state() private containerWidth = 0;
  @state() private text = '';

  /** The minimum font size, in pixels, to use when scaling. */
  @property({ attribute: 'min-font-size', type: Number }) minFontSize = 1;

  /** The maximum font size, in pixels, to use when scaling. */
  @property({ attribute: 'max-font-size', type: Number }) maxFontSize = 128;

  /** The precision, in pixels, at which to scale text with. */
  @property({ type: Number }) precision = 0.1;

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

  private handleSlotChange() {
    this.text = getSlotText(this.defaultSlot);
  }

  /** Resizes the text to fit inside the container. */
  private resizeText() {
    if (this.containerWidth === 0) return;

    let minSize = this.minFontSize;
    let maxSize = this.maxFontSize;
    let currentSize = maxSize;

    // Use a binary search to find the optimal font size
    while (maxSize - minSize > this.precision) {
      this.measure.style.fontSize = `${currentSize}px`;
      const textWidth = this.measure.clientWidth;

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
    this.style.fontSize = `${currentSize}px`;
  }

  render() {
    return html`
      ${this.text}
      <span id="measure" inert aria-hidden="true">${this.text}</span>
      <slot hidden inert aria-hidden="true" @slotchange=${this.handleSlotChange}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-fit-text': QuietFitText;
  }
}
