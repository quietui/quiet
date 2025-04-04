import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietFinishedEvent, QuietTickEvent } from '../../events/time.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './countdown.styles.js';

const UNITS = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'];

/**
 * <quiet-countdown>
 *
 * @summary Displays a countdown until the specified date.
 * @documentation https://quietui.org/docs/components/countdown
 * @status stable
 * @since 1.0
 *
 * @slot seconds - A custom label to show for seconds.
 * @slot minutes - A custom label to show for minutes.
 * @slot hours - A custom label to show for hours.
 * @slot days - A custom label to show for days.
 * @slot months - A custom label to show for months.
 * @slot years - A custom label to show for years.
 *
 * @event quiet-finished - Dispatched when the countdown finishes.
 * @event quiet-tick - Dispatched every time the visible countdown changes. For example, if the timer displays seconds,
 *  this will be once every second; if `min-unit` is minutes, it will be once every minute; and so on.
 *
 * @csspart unit - The container that holds each unit, including its values and labels.
 * @csspart value - The value of each unit.
 * @csspart label - The label of each unit.
 * @csspart delimiter - The delimiters between units.
 *
 * @cssstate active - Applied when the countdown is actively counting down.
 */
@customElement('quiet-countdown')
export class QuietCountdown extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  // For tracking time and intervals
  private endAdjustment = 0;
  private intervalId: number | null = null;
  private localize = new Localize(this);
  private previousValues: Record<string, number> = {};
  private stoppedAt: number | null = null;

  // Internal state for rendering
  @state() currentTimeUnits: Record<string, number> = {};
  @state() visibleUnits: string[] = [];
  @state() effectiveEndDate: Date | null = null;

  private get endDate() {
    return new Date(this.date);
  }

  /**
   * An accessible label for the countdown. This won't be shown, but it will be read to assistive devices so you should
   * always include one.
   */
  @property() label = '';

  /**
   * The date in the future at which the countdown will end. If an attribute is passed, the date should be an
   * [ISO 8601 string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   * If set as a property, a `Date` object can be used instead.
   */
  @property() date: Date | string;

  /** A visual delimiter to show between units. */
  @property() delimiter: string = '';

  /** The smallest unit to display in the countdown. */
  @property({ attribute: 'min-unit' }) minUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' =
    'seconds';

  /** The largest unit to display in the countdown. */
  @property({ attribute: 'max-unit' }) maxUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' = 'days';

  /** Whether to group numbers, e.g. with a thousands separator. */
  @property() grouping: 'always' | 'never' | 'auto' | 'min2' = 'auto';

  /**
   * A custom formatting function to apply to the number. When set, `decimal-places` and `grouping` will be ignored.
   * Property only.
   */
  @property({ attribute: false }) valueFormatter: (value: number) => string;

  connectedCallback() {
    super.connectedCallback();
    this.start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  firstUpdated() {
    this.setAttribute('role', 'timer');
    this.updateTimeUnits();
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // Handle label changes
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }

    // Update visible units if min/max unit changes
    if (changedProperties.has('minUnit') || changedProperties.has('maxUnit')) {
      this.visibleUnits = this.getVisibleUnits().reverse(); // display largest to smallest
    }

    // Restart the timer if the date changes
    if (changedProperties.has('date')) {
      const wasActive = this.intervalId !== null;
      this.stop(); // Stop any existing timer
      if (wasActive || this.endDate.getTime() > Date.now()) {
        this.start(); // Restart with the new date if it's in the future
      }
    }
  }

  /** Starts or resumes the countdown timer after validating dates. */
  public start(options: { resume?: boolean } = {}) {
    const start = new Date();
    const end = this.endDate;
    const isValid = !isNaN(end.getTime()) && end.getTime() > start.getTime();

    // Ignore invalid dates
    if (!isValid) {
      return false;
    }

    // Clear any timers
    this.stop();

    // Handle resuming if requested
    if (options.resume && this.stoppedAt !== null) {
      const pauseDuration = Date.now() - this.stoppedAt;
      this.endAdjustment += pauseDuration;
    }

    this.customStates.set('active', true);
    this.stoppedAt = null;

    // Update the effective end date
    this.updateEffectiveEndDate();

    // Set the initial time units
    this.updateTimeUnits();

    // Set up the timer interval
    const updateInterval = this.getUpdateInterval();
    this.intervalId = window.setInterval(() => this.updateTimeUnits(), updateInterval);
    return true;
  }

  /** Stops the countdown timer and records the time it was stopped. */
  stop() {
    this.customStates.set('active', false);

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      this.stoppedAt = Date.now();
    }
  }

  /** Updates the effective end date with any adjustments */
  private updateEffectiveEndDate() {
    const end = this.endDate;

    if (isNaN(end.getTime())) {
      this.effectiveEndDate = null;
      return;
    }

    // Apply any adjustments to the end date from pausing/resuming
    if (this.endAdjustment > 0) {
      this.effectiveEndDate = new Date(end.getTime() + this.endAdjustment);
    } else {
      this.effectiveEndDate = end;
    }
  }

  /** Updates the current time units and checks for changes */
  private updateTimeUnits() {
    const now = new Date();

    // Ensure we have a valid end date
    if (!this.effectiveEndDate || isNaN(now.getTime()) || isNaN(this.effectiveEndDate.getTime())) {
      this.currentTimeUnits = {};
      return;
    }

    // Calculate the new time units
    const units = this.calculateTimeUnits(now, this.effectiveEndDate);
    this.currentTimeUnits = units;

    // Check for changes and dispatch event if needed
    this.checkForChanges(units, this.visibleUnits);
  }

  /** Calculates the update interval based on the minimum unit shown. */
  private getUpdateInterval() {
    switch (this.minUnit) {
      case 'months':
      case 'years':
        return 24 * 60 * 60 * 1000; // update daily
      case 'days':
        return 60 * 60 * 1000; // update every hour
      case 'hours':
        return 60 * 1000; // update every minute
      case 'minutes':
      case 'seconds':
      default:
        return 1000; // update every second
    }
  }

  /**
   * Calculates time difference with proper handling of varying month lengths and leap years. Uses native `Date` methods
   * for lightweight but accurate calculations.
   */
  private calculateTimeUnits(now: Date, end: Date) {
    const visibleUnits = this.getVisibleUnits();
    const result: Record<string, number> = {};
    const minUnitIndex = UNITS.indexOf(this.minUnit);
    const maxUnitIndex = UNITS.indexOf(this.maxUnit);

    // Initialize all visible units to 0
    for (const unit of visibleUnits) {
      result[unit] = 0;
    }

    // If the end date is in the past, return zeros
    if (end <= now) {
      // Dispatch finished event if timer is running
      if (this.intervalId !== null) {
        this.dispatchEvent(new QuietFinishedEvent());
        this.stop();
      }
      return result;
    }

    // Create working copies of dates
    const startDate = new Date(now);
    const endDate = new Date(end);
    let remainingDate = new Date(startDate);

    // Calculate years if needed
    if (maxUnitIndex >= UNITS.indexOf('years')) {
      let years = endDate.getFullYear() - startDate.getFullYear();

      // Adjust if we haven't reached the same month/day yet
      if (
        startDate.getMonth() > endDate.getMonth() ||
        (startDate.getMonth() === endDate.getMonth() && startDate.getDate() > endDate.getDate())
      ) {
        years--;
      }

      result['years'] = years;

      // Advance the remaining date by the calculated years
      if (years > 0 && minUnitIndex < UNITS.indexOf('years')) {
        remainingDate.setFullYear(remainingDate.getFullYear() + years);
      }
    }

    // Calculate months if needed
    if (maxUnitIndex >= UNITS.indexOf('months') && minUnitIndex <= UNITS.indexOf('months')) {
      let months;

      if (maxUnitIndex < UNITS.indexOf('years')) {
        // Total months if years aren't displayed
        months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

        // Adjust if we haven't reached the same day yet
        if (startDate.getDate() > endDate.getDate()) {
          months--;
        }
      } else {
        // Months within the current year
        months = endDate.getMonth() - remainingDate.getMonth();

        // Adjust if we haven't reached the same day yet
        if (remainingDate.getDate() > endDate.getDate()) {
          months--;
        }

        // Handle negative months (when year boundary was just crossed)
        if (months < 0) {
          months += 12;
        }
      }

      result['months'] = months;

      // Advance the remaining date by the calculated months
      if (months > 0 && minUnitIndex < UNITS.indexOf('months')) {
        const newMonth = remainingDate.getMonth() + months;
        remainingDate.setMonth(newMonth);

        // Handle the case where we went too far (e.g., Jan 31 + 1 month should be Feb 28/29)
        // Keep checking until we're in the correct month
        while (remainingDate > endDate || remainingDate.getMonth() !== newMonth % 12) {
          remainingDate.setDate(remainingDate.getDate() - 1);
        }
      }
    }

    // Calculate days if needed
    if (maxUnitIndex >= UNITS.indexOf('days') && minUnitIndex <= UNITS.indexOf('days')) {
      // Get time difference in days
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      let days;

      if (maxUnitIndex < UNITS.indexOf('months')) {
        // Total days if months aren't displayed
        days = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
      } else {
        // Days within the current month
        days = Math.floor((endDate.getTime() - remainingDate.getTime()) / millisecondsPerDay);
      }

      result['days'] = days;

      // Advance the remaining date by the calculated days
      if (days > 0 && minUnitIndex < UNITS.indexOf('days')) {
        remainingDate.setTime(remainingDate.getTime() + days * millisecondsPerDay);
      }
    }

    // These smaller units can use the standard modulo approach
    // since hours, minutes, seconds all have fixed lengths
    const timeUnits = {
      hours: 24,
      minutes: 60,
      seconds: 60
    };

    let totalSeconds = Math.floor((endDate.getTime() - remainingDate.getTime()) / 1000);

    // Calculate hours if needed
    if (maxUnitIndex >= UNITS.indexOf('hours') && minUnitIndex <= UNITS.indexOf('hours')) {
      if (maxUnitIndex < UNITS.indexOf('days')) {
        // If days are not shown, use total hours
        result['hours'] = Math.floor(totalSeconds / 3600);
      } else {
        // Hours within the day
        result['hours'] = Math.floor(totalSeconds / 3600) % timeUnits.hours;
      }
      totalSeconds %= 3600 * timeUnits.hours;
    }

    // Calculate minutes if needed
    if (maxUnitIndex >= UNITS.indexOf('minutes') && minUnitIndex <= UNITS.indexOf('minutes')) {
      if (maxUnitIndex < UNITS.indexOf('hours')) {
        // If hours are not shown, use total minutes
        result['minutes'] = Math.floor(totalSeconds / 60);
      } else {
        // Minutes within the hour
        result['minutes'] = Math.floor(totalSeconds / 60) % timeUnits.minutes;
      }
      totalSeconds %= 60 * timeUnits.minutes;
    }

    // Calculate seconds if needed
    if (maxUnitIndex >= UNITS.indexOf('seconds') && minUnitIndex <= UNITS.indexOf('seconds')) {
      if (maxUnitIndex < UNITS.indexOf('minutes')) {
        // If minutes are not shown, use total seconds
        result['seconds'] = totalSeconds;
      } else {
        // Seconds within the minute
        result['seconds'] = totalSeconds % timeUnits.seconds;
      }
    }

    return result;
  }

  /** Gets the visible units based on `min-unit` and `max-unit`. */
  private getVisibleUnits() {
    const minIndex = UNITS.indexOf(this.minUnit);
    const maxIndex = UNITS.indexOf(this.maxUnit);

    // If the indexes are invalid, return default units
    if (minIndex === -1 || maxIndex === -1 || minIndex > maxIndex) {
      return ['seconds', 'minutes', 'hours', 'days'];
    }

    return UNITS.slice(minIndex, maxIndex + 1);
  }

  /** Formats the number to display. */
  private formatUnit(value: number) {
    // Use the custom valueFormatter if provided
    if (typeof this.valueFormatter === 'function') {
      return this.valueFormatter(value);
    }

    // Apply number formatting with appropriate grouping
    return new Intl.NumberFormat(this.localize.lang(), {
      minimumIntegerDigits: 2,
      // @ts-expect-error - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
      useGrouping: this.grouping === 'never' ? false : this.grouping
    }).format(value);
  }

  /** Gets the unit label using Intl.DisplayNames or fallback. */
  private getUnitLabel(unit: string) {
    const baseUnit = unit.endsWith('s') ? unit.slice(0, -1) : unit;
    const displayNames = new Intl.DisplayNames(this.localize.lang(), { type: 'dateTimeField', style: 'narrow' });
    return displayNames.of(baseUnit)!;
  }

  /** Checks if any visible units have changed and dispatches tick event if needed. */
  private checkForChanges(units: Record<string, number>, visibleUnits: string[]) {
    let hasChanged = false;

    for (const unit of visibleUnits) {
      if (this.previousValues[unit] !== units[unit]) {
        hasChanged = true;
        break;
      }
    }

    if (hasChanged) {
      // Update previous values
      for (const unit of visibleUnits) {
        this.previousValues[unit] = units[unit];
      }

      // Dispatch tick event
      this.dispatchEvent(new QuietTickEvent());
    }
  }

  render() {
    if (this.visibleUnits.length === 0 || Object.keys(this.currentTimeUnits).length === 0) {
      return '';
    }

    return html`
      <span class="vh">
        ${this.visibleUnits
          .map(unit => {
            const value = this.currentTimeUnits[unit];
            const label = this.getUnitLabel(unit);
            return `${value} ${label}`;
          })
          .join(' ')}
      </span>

      ${this.visibleUnits.map((unit, index) => {
        const value = this.currentTimeUnits[unit];
        const formattedValue = this.formatUnit(value);
        const label = this.getUnitLabel(unit);
        const showDelimiter = index < this.visibleUnits.length - 1 && this.delimiter !== '';

        return html`
          <span part="unit" aria-hidden="true">
            <span part="value">${formattedValue}</span>
            <span part="label"><slot name="${unit}">${label}</slot></span>
          </span>
          ${showDelimiter ? html`<span part="delimiter" aria-hidden="true">${this.delimiter}</span>` : ''}
        `;
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-countdown': QuietCountdown;
  }
}
