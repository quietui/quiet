import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './timed-content.styles.js';

/**
 * <quiet-timed-content>
 *
 * @summary Timed content shows certain content based on the current date and time.
 * @documentation https://quietui.org/docs/components/timed-content
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot before - Optional content that shows before the specified date/time.
 * @slot after - Optional content that shows after the specified date/time.
 */
@customElement('quiet-timed-content')
export class QuietTimedContent extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private updateInterval: ReturnType<typeof setInterval> | undefined;

  /** The date to start showing the content. */
  @property({ attribute: 'start-date' }) startDate: string | Date = '';

  /** The date to stop showing the content. */
  @property({ attribute: 'end-date' }) endDate: string | Date = '';

  /** When set, the content will update as the time changes. */
  @property({ type: Boolean, reflect: true }) live = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.live) {
      this.setupTimer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupTimer();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('live')) {
      if (this.live) {
        this.setupTimer();
      } else {
        this.cleanupTimer();
      }
    }
  }

  // Update every 60 seconds to check for date changes
  private setupTimer() {
    this.cleanupTimer();
    this.updateInterval = setInterval(() => this.requestUpdate(), 60000);
  }

  private cleanupTimer() {
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
  }

  render() {
    const now = new Date();
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;
    const isStartValid = start && !isNaN(start.getTime());
    const isEndValid = end && !isNaN(end.getTime());
    const hasInvalidDates = (start && !isStartValid) || (end && !isEndValid);

    // Check for invalid dates
    if (hasInvalidDates) {
      if (start && !isStartValid) console.warn('Invalid start date:', this.startDate);
      if (end && !isEndValid) console.warn('Invalid end date:', this.endDate);
      // Fallback to default content
      return html` <slot></slot> `;
    }

    // Determine which slot to show
    const showBefore = isStartValid && now < start;
    const showAfter = isEndValid && now >= end;

    if (showBefore) return html` <slot name="before"></slot> `;
    if (showAfter) return html` <slot name="after"></slot> `;
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-timed-content': QuietTimedContent;
  }
}
