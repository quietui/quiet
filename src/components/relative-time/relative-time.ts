import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './relative-time.styles.js';

const connectedElements = new Set<QuietRelativeTime>();
const UNITS: { max: number; value: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { max: 56000, value: 1000, unit: 'second' }, // 56 seconds max
  { max: 2760000, value: 60000, unit: 'minute' }, // 46 minutes max
  { max: 72000000, value: 3600000, unit: 'hour' }, // 20 hours max
  { max: 518400000, value: 86400000, unit: 'day' }, // 6 days max
  { max: 2419200000, value: 604800000, unit: 'week' }, // 28 days max
  { max: 28512000000, value: 2592000000, unit: 'month' }, // 11 months max
  { max: Infinity, value: 31536000000, unit: 'year' }
];
let liveInterval: ReturnType<typeof setTimeout> | undefined;

/**
 * <quiet-relative-time>
 *
 * @summary Outputs a relative time in a human-readable format.
 * @documentation https://quietui.org/docs/components/relative-time
 * @status stable
 * @since 1.0
 */
@customElement('quiet-relative-time')
export class QuietRelativeTime extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /**
   * The date from which to calculate the relative time from. If an attribute is passed, the date should be an [ISO 8601
   * string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). If set
   * as a property, a `Date` object can be used instead. If unset, the current date will be assumed.
   */
  @property() date: Date | string = new Date();

  /** The style of date to render. */
  @property() format: 'long' | 'short' | 'narrow' = 'long';

  /** When `auto`, the date may produce strings such as "yesterday" instead of "1 day ago". */
  @property() numeric: 'auto' | 'always' = 'auto';

  /** When set, the time will update itself. */
  @property({ type: Boolean, reflect: true }) live = false;

  updated(changedProperties: PropertyValues<this>) {
    // Live updates
    if (changedProperties.has('live')) {
      // Keep track of live elements so we can use a single timer to update them at the same time
      if (this.live) {
        connectedElements.add(this);
      } else {
        connectedElements.delete(this);
      }

      if (connectedElements.size === 0) {
        // No more live elements, stop the timer
        clearInterval(liveInterval);
        liveInterval = undefined;
      } else if (!liveInterval) {
        // We have live elements but the timer isn't running, start it
        liveInterval = setInterval(() => connectedElements.forEach(el => el.requestUpdate()), 1000);
      }
    }
  }

  render() {
    const currentDate = new Date();
    const targetDate = this.date ? new Date(this.date) : new Date();

    // Check for invalid dates
    if (isNaN(targetDate.getMilliseconds())) {
      return '';
    }

    // Calculate iso time
    const isoDate = targetDate.toISOString();

    // Calculate relative time
    const difference = targetDate.getTime() - currentDate.getTime();
    const { unit, value } = UNITS.find(u => Math.abs(difference) < u.max)!;
    const relativeDate = this.localize.relativeTime(Math.round(difference / value), unit, {
      numeric: this.numeric,
      style: this.format
    });

    // Zero whitespace since the host element is `display: inline`
    return html`<time datetime=${isoDate}>${relativeDate}</time>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-relative-time': QuietRelativeTime;
  }
}
