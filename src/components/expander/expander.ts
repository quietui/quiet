import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './expander.styles.js';

/**
 * <quiet-expander>
 *
 * @summary An expandable content container with smooth animation on show/hide
 * @documentation https://quietui.org/docs/components/expander
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot for content to be expanded/collapsed.
 * @slot show-label - The label for the button when content is collapsed.
 * @slot hide-label - The label for the button when content is expanded.
 *
 * @csspart content - The container holding the expandable content.
 * @csspart toggle - The button that toggles between expanded and collapsed states.
 */
@customElement('quiet-expander')
export class QuietExpander extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** Whether the content is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Animation duration in milliseconds */
  @property({ type: Number }) duration = 300;

  /** Animation easing function */
  @property({ type: String }) easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

  /** Get the preview height from CSS variable or default to 3 line heights */
  private get previewHeight(): number {
    // Get the computed style to read the CSS variable
    const styles = getComputedStyle(this);
    const previewHeightVar = styles.getPropertyValue('--height').trim();

    if (previewHeightVar) {
      // If the value is in 'lh' units, we need to calculate it
      if (previewHeightVar.endsWith('lh')) {
        const lineHeightNum = parseFloat(previewHeightVar);
        // Get actual line height in pixels (approximate calculation)
        const lineHeight = parseFloat(styles.lineHeight) || 1.2 * parseFloat(styles.fontSize);
        return lineHeightNum * lineHeight;
      }

      // Try to parse as pixels
      return parseFloat(previewHeightVar) || 3 * 1.2 * parseFloat(styles.fontSize);
    }

    // Default: 3 line heights (approximation)
    return 3 * 1.2 * parseFloat(styles.fontSize);
  }

  firstUpdated() {
    // Initialize collapsed state if needed
    const content = this.shadowRoot?.querySelector('#content') as HTMLElement;
    if (!this.expanded && content) {
      content.style.height = `${this.previewHeight}px`;
      content.style.overflow = 'hidden';
    }
  }

  /** Toggle the expanded state with animation */
  private toggleExpanded() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const content = this.shadowRoot?.querySelector('#content') as HTMLElement;
    const duration = prefersReducedMotion ? 0 : this.duration;

    if (!content) return;

    // Store current state before changing
    const isCurrentlyExpanded = this.expanded;

    // Get the full content height for animation
    const contentHeight = content.scrollHeight;

    // Cancel any running animations
    content.getAnimations().forEach(animation => animation.cancel());

    if (isCurrentlyExpanded) {
      // Animate collapsing to preview height
      const animation = content.animate(
        [
          { height: `${contentHeight}px`, overflow: 'hidden' },
          { height: `${this.previewHeight}px`, overflow: 'hidden' }
        ],
        {
          duration,
          easing: this.easing,
          fill: 'forwards'
        }
      );

      // Update ARIA attributes immediately for accessibility
      this.expanded = false;

      // Optional: Add event listener for animation completion
      animation.addEventListener(
        'finish',
        () => {
          content.style.height = `${this.previewHeight}px`;
          content.style.overflow = 'hidden';
        },
        { once: true }
      );
    } else {
      // Set initial state for animation
      content.style.height = `${this.previewHeight}px`;

      // Animate expanding
      const animation = content.animate(
        [
          { height: `${this.previewHeight}px`, overflow: 'hidden' },
          { height: `${contentHeight}px`, overflow: 'hidden' }
        ],
        {
          duration,
          easing: this.easing,
          fill: 'forwards'
        }
      );

      // Update ARIA attributes immediately for accessibility
      this.expanded = true;

      // Reset to auto height after animation completes for dynamic content
      animation.addEventListener(
        'finish',
        () => {
          content.style.height = 'auto';
          content.style.overflow = 'visible';
        },
        { once: true }
      );
    }
  }

  render() {
    return html`
      <div id="content" part="content" role="region" aria-labelledby="toggle">
        <slot></slot>
      </div>

      <button
        id="toggle"
        part="toggle"
        class="toggle"
        aria-expanded="${this.expanded}"
        aria-controls="content"
        @click="${this.toggleExpanded}"
      >
        ${this.expanded
          ? html`<slot name="hide-label">${this.localize.term('collapse')}</slot>`
          : html`<slot name="show-label">${this.localize.term('expand')}</slot>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-expander': QuietExpander;
  }
}
