import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  QuietBeforeCloseEvent,
  QuietBeforeOpenEvent,
  QuietCloseEvent,
  QuietOpenEvent
} from '../../events/open-close.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
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
 * @event quiet-before-open - Emitted before the expander opens. Cancelable event that prevents opening when canceled.
 * @event quiet-open - Emitted after the expander has opened.
 * @event quiet-before-close - Emitted before the expander closes. Cancelable event that prevents closing when canceled.
 * @event quiet-close - Emitted after the expander has closed.
 *
 * @csspart content - The container holding the expandable content.
 * @csspart toggle - The button that toggles between expanded and collapsed states.
 */
@customElement('quiet-expander')
export class QuietExpander extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#content') content: HTMLElement;

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
    if (!this.expanded) {
      this.content.style.height = `${this.previewHeight}px`;
      this.content.style.overflow = 'hidden';
    }
  }

  /** Toggle the expanded state with animation */
  private async toggleExpanded() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Get all running animations and collect their current values
    const runningAnimations = this.content.getAnimations();
    let currentHeight = this.expanded ? this.content.scrollHeight : this.previewHeight;

    // If there are running animations, get the current computed height
    if (runningAnimations.length > 0) {
      // Get computed style at this moment to find actual current height
      const computedStyle = getComputedStyle(this.content);
      currentHeight = parseFloat(computedStyle.height);

      // Cancel all running animations
      runningAnimations.forEach(animation => animation.cancel());
    }

    // Dispatch before event
    const willExpand = !this.expanded;
    const beforeEvent = willExpand ? new QuietBeforeOpenEvent() : new QuietBeforeCloseEvent({ source: this });

    // Emit the event and check if it was canceled
    const notCanceled = this.dispatchEvent(beforeEvent);

    // If the event was canceled, stop here
    if (!notCanceled) {
      return;
    }

    // Update expanded state
    this.expanded = !this.expanded;

    // Skip animation for reduced motion
    if (prefersReducedMotion) {
      this.content.style.height = this.expanded ? 'auto' : `${this.previewHeight}px`;
      this.content.style.overflow = this.expanded ? 'visible' : 'hidden';

      // Dispatch after event
      this.dispatchEvent(this.expanded ? new QuietOpenEvent() : new QuietCloseEvent());
      return;
    }

    // Set up animation with actual current height as starting point
    const targetHeight = this.expanded ? this.content.scrollHeight : this.previewHeight;
    this.content.style.setProperty('--start-height', `${currentHeight}px`);
    this.content.style.setProperty('--target-height', `${targetHeight}px`);
    this.content.style.overflow = 'hidden';

    // Run the animation
    await animateWithClass(this.content, this.expanded ? 'expand' : 'collapse');

    // Set final state
    if (this.expanded) {
      this.content.style.height = 'auto';
      this.content.style.overflow = 'visible';
    } else {
      this.content.style.height = `${this.previewHeight}px`;
      this.content.style.overflow = 'hidden';
    }

    // Dispatch after event
    this.dispatchEvent(this.expanded ? new QuietOpenEvent() : new QuietCloseEvent());
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
