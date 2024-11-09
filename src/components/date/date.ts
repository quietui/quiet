import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './date.styles.js';

/**
 * <quiet-date>
 *
 * @summary Outputs a date or time in the specified format.
 * @documentation https://quietui.org/docs/components/date
 * @status stable
 * @since 1.0
 */
@customElement('quiet-date')
export class QuietDate extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /**
   * The date to format. If an attribute is passed, the date should be an [ISO 8601 string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   * If set as a property, a `Date` object can be used instead. If unset, the current date will be assumed.
   */
  @property() date: Date | string = new Date();

  /**
   * A shortcut property for formatting the date. This can be used with `time-style`, but not with other formatting
   * properties such as `weekday`, `hour`, `month`, etc.
   */
  @property({ attribute: 'date-style' }) dateStyle: 'full' | 'long' | 'medium' | 'short';

  /**
   * A shortcut property for formatting the time. This can be used with `date-style`, but not with other formatting
   * properties such as `weekday`, `hour`, `month`, etc.
   */
  @property({ attribute: 'time-style' }) timeStyle: 'full' | 'long' | 'medium' | 'short';

  /**
   * Whether to use 12-hour time (as opposed to 24-hour time). If `auto`, the default value is determined by the user's
   * locale.
   */
  @property({ attribute: 'hour-format' }) hourFormat: 'auto' | '12' | '24' = 'auto';

  /** The hour cycle to use. */
  @property() hourCycle: 'h11' | 'h12' | 'h23' | 'h24';

  /** The time zone to use. The default is the user's default time zone. */
  @property({ attribute: 'time-zone' }) timeZone: string;

  /** The representation of the weekday. */
  @property() weekday: 'long' | 'short' | 'narrow';

  /** The representation of the era. */
  @property() era: 'long' | 'short' | 'narrow';

  /** The representation of the year. */
  @property() year: 'numeric' | '2-digit';

  /** The representation of the month. */
  @property() month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

  /** The representation of the day. */
  @property() day: 'numeric' | '2-digit';

  /**
   * The formatting style used for day periods like "in the morning", "am", "noon", "n" etc. This option only has an
   * effect if a 12-hour clock is used.
   */
  @property({ attribute: 'day-period' }) dayPeriod: 'long' | 'short' | 'narrow';

  /** The representation of the hour. */
  @property() hour: 'numeric' | '2-digit';

  /** The representation of the minute. */
  @property() minute: 'numeric' | '2-digit';

  /** The representation of the second. */
  @property() second: 'numeric' | '2-digit';

  /** The number of digits used to represent fractions of a second (any additional digits are truncated). */
  @property({ attribute: 'fractional-second-digits', type: Number }) fractionalSecondDigits: 1 | 2 | 3;

  /** The localized representation of the time zone name. */
  @property({ attribute: 'time-zone-name' }) timeZoneName:
    | 'long'
    | 'short'
    | 'shortOffset'
    | 'longOffset'
    | 'shortGeneric'
    | 'longGeneric';

  /** The format matching algorithm to use. */
  @property({ attribute: 'format-matcher' }) formatMatcher: 'basic' | 'best-fit';

  render() {
    const date = new Date(this.date);

    // Check for invalid dates
    if (isNaN(date.getMilliseconds())) {
      return '';
    }

    const isoDate = date.toISOString();

    return html`
      <time datetime=${isoDate}>
        ${this.localize.date(date, {
          dateStyle: this.dateStyle,
          timeStyle: this.timeStyle,
          hour12: this.hourFormat === 'auto' ? undefined : this.hourFormat === '12',
          hourCycle: this.hourCycle,
          timeZone: this.timeZone,
          weekday: this.weekday,
          era: this.era,
          year: this.year,
          month: this.month,
          day: this.day,
          dayPeriod: this.dayPeriod,
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          // @ts-expect-error - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#fractionalseconddigits
          fractionalSecondDigits: this.fractionalSecondDigits,
          timeZoneName: this.timeZoneName
        })}
      </time>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-date': QuietDate;
  }
}
