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

  @state() loading = false;
  @state() isComplete = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
   * The scroll threshold at which to trigger loading more items. Accepts percentages (e.g., "75%") or pixels
   * (e.g., "200px").
   */
  @property() threshold = '75%';

  /** Label for the feed. Defaults to "Feed". */
  @property() label = 'Feed';

  /** Debounce delay for scroll events in milliseconds. Defaults to 100ms. */
  @property({ type: Number, attribute: 'scroll-debounce' }) scrollDebounce = 100;

  private scrollTimeoutId?: ReturnType<typeof setTimeout>;

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

  /**
   * Mark the feed as completed, preventing further load events
   */
  public complete() {
    this.loading = false;
    this.isComplete = true;
  }

  private handleScroll = () => {
    if (this.isComplete || this.loading) return;

    if (this.checkScrollThreshold()) {
      this.loading = true;
      this.dispatchEvent(new CustomEvent('quiet-load-more'));
      return;
    }

    // Clear existing timeout
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }

    this.scrollTimeoutId = setTimeout(() => {
      // Check again after debounce
      if (!this.isComplete && !this.loading) {
        if (this.checkScrollThreshold()) {
          this.loading = true;
          this.dispatchEvent(new CustomEvent('quiet-load-more'));
        }
      }
    }, this.scrollDebounce);
  };

  private checkScrollThreshold(): boolean {
    const scrollPosition = this.scrollTop + this.clientHeight;
    let triggerPoint: number;

    if (this.threshold.endsWith('%')) {
      const percentage = parseFloat(this.threshold) / 100;
      triggerPoint = this.scrollHeight * percentage;
    } else {
      const pixels = parseFloat(this.threshold);
      triggerPoint = this.scrollHeight - pixels;
    }

    return scrollPosition >= triggerPoint;
  }

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
