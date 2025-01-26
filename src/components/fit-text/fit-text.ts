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
 * @summary Scales a line of text to fit within its container.
 * @documentation https://quietui.org/docs/components/fit-text
 * @status stable
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

  @state() containerWidth = 0;
  @state() text = '';

  /**
   * The minimum font size to use when scaling, in pixels. The text will never be smaller than this value, which may
   * lead to overflows if the text is excessively long.
   */
  @property({ attribute: 'min-font-size', type: Number }) minFontSize = 1;

  /**
   * The maximum font size to use when scaling, in pixels. The text will never be larger than this value, which may
   * cause the text to not scale the full width of the container.
   */
  @property({ attribute: 'max-font-size', type: Number }) maxFontSize = 128;

  /**
   * The precision, in pixels, used to scale the text to fit. Larger values are more performant but result in less
   * accurate measurements.
   */
  @property({ type: Number }) precision = 0.1;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  firstUpdated() {
    // Resize text after all fonts load
    document.fonts.ready.then(() => this.resize());
  }

  update(changedProperties: Map<PropertyKey, unknown>) {
    super.update(changedProperties);

    if (
      changedProperties.has('containerWidth') ||
      changedProperties.has('text') ||
      changedProperties.has('minFontSize') ||
      changedProperties.has('maxFontSize') ||
      changedProperties.has('precision')
    ) {
      requestAnimationFrame(() => this.resize());
    }
  }

  private handleSlotChange() {
    this.text = getSlotText(this.defaultSlot);
  }

  /**
   * Resizes the text to fit inside the container. You probably won't need to call this unless you're loading a font
   * dynamically and need to resize the text after it loads.
   */
  public resize() {
    if (this.containerWidth <= 0) return;

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
