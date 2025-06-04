import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../spinner/spinner.js';
import styles from './infinite-scroll.styles.js';

/**
 * <quiet-infinite-scroll>
 *
 * @summary Infinite scroll that implements ARIA feed pattern for accessible dynamic content loading
 * @documentation https://quietui.org/docs/components/infinite-scroll
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-spinner
 *
 * @slot - The default slot for feed items. Each item should have role="article" and be focusable.
 *
 * @event quiet-load-more - Emitted when scrolling reaches the threshold and more items should be loaded.
 *
 * @cssstate loading - Applied when the infinite scroll is loading more content.
 * @cssstate complete - Applied when the infinite scroll has no more content to load.
 */
@customElement('quiet-infinite-scroll')
export class QuietInfiniteScroll extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private scrollTimeoutId?: ReturnType<typeof setTimeout>;

  @state() loading = false;
  @state() isComplete = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /** An accessible label for the feed. */
  @property() label = 'Feed'; // TODO - localize

  /**
   * The scroll threshold at which to trigger loading more items. Accepts percentages (e.g., "75%") or pixels
   * (e.g., "200px").
   */
  @property() threshold = '85%';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'feed');
    this.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }

    if (changedProperties.has('loading')) {
      this.customStates.set('loading', this.loading);
    }

    if (changedProperties.has('isComplete')) {
      this.customStates.set('complete', this.isComplete);
    }
  }

  private checkScrollThreshold(): boolean {
    const scrollPosition = this.scrollTop + this.clientHeight;
    let triggerPoint: number;

    // Parse threshold
    const thresholdValue = parseFloat(this.threshold);
    const isPercentage = this.threshold.endsWith('%');

    if (isPercentage) {
      // Calculate trigger point as percentage of scroll height
      triggerPoint = this.scrollHeight * (thresholdValue / 100);
    } else {
      // Calculate trigger point as pixels from bottom
      triggerPoint = this.scrollHeight - thresholdValue;
    }

    return scrollPosition >= triggerPoint;
  }

  private handleScroll = () => {
    if (this.isComplete || this.loading) return;

    // Clear existing timeout to avoid stale checks
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }

    // Check threshold immediately
    if (this.checkScrollThreshold()) {
      this.loading = true;
      this.dispatchEvent(new CustomEvent('quiet-load-more'));
      return;
    }

    // Schedule debounced check for continuous scrolling
    this.scrollTimeoutId = setTimeout(() => {
      if (!this.isComplete && !this.loading && this.checkScrollThreshold()) {
        this.loading = true;
        this.dispatchEvent(new CustomEvent('quiet-load-more'));
      }
    }, 100);
  };

  private handleSlotChange() {
    const assignedElements = this.defaultSlot.assignedElements({ flatten: true });

    assignedElements.forEach(el => {
      if (el instanceof HTMLElement) {
        if (!el.hasAttribute('role')) {
          el.setAttribute('role', 'article');
        }
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
        }
      }
    });

    // Reset states when new items are added
    this.loading = false;
    this.isComplete = false;
  }

  /**
   * Mark the feed as completed, preventing further load events. Changing content in the default slot will reset this
   * and re-enable infinite scrolling.
   */
  public complete() {
    this.loading = false;
    this.isComplete = true;
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      ${!this.isComplete ? html`<quiet-spinner></quiet-spinner>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-infinite-scroll': QuietInfiniteScroll;
  }
}
