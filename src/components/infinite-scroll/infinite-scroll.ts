import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
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

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() isLoading = false;
  @state() isComplete = false;

  private localize = new Localize(this);
  private thresholdInPixels = 0;
  private thresholdInPercent = 0;

  /** An accessible label for the feed. */
  @property() label = '';

  /**
   * The scroll threshold at which to trigger loading more items. Accepts percentages (e.g., "75%") or pixels
   * (e.g., "200px").
   */
  @property() threshold = '25%';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'feed');
    this.parseThreshold();
    this.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('scroll', this.handleScroll);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || this.localize.term('feed'));
    }

    if (changedProperties.has('threshold')) {
      this.parseThreshold();
    }

    if (changedProperties.has('isLoading')) {
      this.customStates.set('loading', this.isLoading);
    }

    if (changedProperties.has('isComplete')) {
      this.customStates.set('complete', this.isComplete);
    }
  }

  private parseThreshold() {
    const val = this.threshold;
    if (val.endsWith('%')) {
      this.thresholdInPixels = 0;
      this.thresholdInPercent = parseFloat(val) / 100;
    } else {
      this.thresholdInPixels = parseFloat(val);
      this.thresholdInPercent = 0;
    }
  }

  private checkScrollThreshold(): boolean {
    const scrollPosition = this.scrollTop + this.clientHeight;
    const threshold =
      this.thresholdInPercent !== 0 ? this.clientHeight * this.thresholdInPercent : this.thresholdInPixels;
    const triggerPoint = this.scrollHeight - threshold;

    return scrollPosition >= triggerPoint;
  }

  private handleScroll = () => {
    if (this.isComplete || this.isLoading) return;

    if (this.checkScrollThreshold()) {
      this.isLoading = true;
      this.dispatchEvent(new CustomEvent('quiet-load-more'));
    }
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
    this.isComplete = false;
    this.isLoading = false;
  }

  /**
   * Mark the feed as completed, preventing further load events. Changing content in the default slot will reset this
   * and re-enable infinite scrolling.
   */
  public complete() {
    this.isComplete = true;
    this.isLoading = false;
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
