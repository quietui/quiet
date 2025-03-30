import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './countdown.styles.js';

/**
 * <quiet-countdown>
 *
 * @summary Displays a countdown timer between two dates.
 * @documentation https://quietui.org/docs/components/countdown
 * @status stable
 * @since 1.0
 */
@customElement('quiet-countdown')
export class QuietCountdown extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  // Unit types in ascending order of magnitude
  private static readonly UNITS = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'];

  // For tracking time and intervals
  private intervalId: number | null = null;
  private stoppedAt: number | null = null;
  private hasFinished = false;
  private endAdjustment = 0;

  /**
   * The starting date for the countdown. If an attribute is passed, the date should be an [ISO 8601 string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   * If set as a property, a `Date` object can be used instead. If unset, the current date will be assumed.
   */
  @property({ attribute: 'start-date' }) startDate: Date | string = new Date();

  /**
   * The ending date for the countdown. If an attribute is passed, the date should be an [ISO 8601 string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
   * If set as a property, a `Date` object can be used instead.
   */
  @property({ attribute: 'end-date' }) endDate: Date | string;

  /**
   * The delimiter to use between units. Default is ':'.
   */
  @property() delimiter: string = ':';

  /**
   * The smallest unit to display in the countdown.
   */
  @property({ attribute: 'min-unit' }) minUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' =
    'seconds';

  /**
   * The largest unit to display in the countdown.
   */
  @property({ attribute: 'max-unit' }) maxUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' = 'days';

  /**
   * The previously displayed values, used to determine when to dispatch tick events
   */
  private previousValues: Record<string, number> = {};

  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.startIfValid();
  }

  disconnectedCallback() {
    this.stop();
    super.disconnectedCallback();
  }

  /**
   * Check if dates are valid and start the timer if they are
   */
  private startIfValid() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Verify both dates are valid and end is after start
    if (!isNaN(start.getMilliseconds()) && !isNaN(end.getMilliseconds()) && end.getTime() > start.getTime()) {
      this.start();
    }
  }

  /**
   * Starts or resumes the countdown timer.
   */
  start(options: { resume?: boolean } = {}) {
    // Clear any existing interval
    this.stop({ keepStoppedAt: true });

    if (options.resume && this.stoppedAt !== null) {
      // Calculate how long the timer was stopped
      const stoppedDuration = Date.now() - this.stoppedAt;
      // Adjust the end date by the stopped duration
      this.endAdjustment += stoppedDuration;
    }

    // Reset stoppedAt
    this.stoppedAt = null;

    // Calculate the update interval based on the minimum unit
    const updateInterval = this.getUpdateInterval();

    // Start the timer
    this.intervalId = window.setInterval(() => this.updateCountdown(), updateInterval);
    this.updateCountdown(); // Update immediately
  }

  /**
   * Stops the countdown timer.
   */
  stop(options: { keepStoppedAt?: boolean } = {}) {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      if (!options.keepStoppedAt) {
        this.stoppedAt = null;
      } else if (this.stoppedAt === null) {
        this.stoppedAt = Date.now();
      }
    }
  }

  /**
   * Calculates the update interval based on the minimum unit shown.
   */
  private getUpdateInterval(): number {
    switch (this.minUnit) {
      case 'seconds':
        return 1000; // Update every second
      case 'minutes':
        return 60 * 1000; // Update every minute
      case 'hours':
        return 60 * 60 * 1000; // Update every hour
      case 'days':
        return 24 * 60 * 60 * 1000; // Update every day
      case 'months':
        return 30 * 24 * 60 * 60 * 1000; // Approximate - update every 30 days
      case 'years':
        return 365 * 24 * 60 * 60 * 1000; // Approximate - update every 365 days
      default:
        return 1000; // Default to every second
    }
  }

  /**
   * Updates properties when they change
   */
  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // If the dates or units change, we may need to restart the timer with a new interval
    if (
      changedProperties.has('startDate') ||
      changedProperties.has('endDate') ||
      changedProperties.has('minUnit') ||
      changedProperties.has('maxUnit')
    ) {
      // If the timer is active, restart it with the new configuration
      const wasActive = this.intervalId !== null;
      this.stop();

      if (wasActive) {
        this.startIfValid();
      }
    }
  }

  /**
   * Calculates the time remaining and updates the display.
   */
  private updateCountdown() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Check for invalid dates
    if (isNaN(start.getMilliseconds()) || isNaN(end.getMilliseconds())) {
      return;
    }

    // Apply any adjustments to the end date from pausing/resuming
    const adjustedEndTime = end.getTime() + this.endAdjustment;
    const now = Date.now();
    let remaining = adjustedEndTime - now;

    // If the countdown is complete
    if (remaining <= 0 && !this.hasFinished) {
      remaining = 0;
      this.hasFinished = true;
      this.dispatchEvent(new CustomEvent('quiet-finished'));
      this.stop();
    }

    this.requestUpdate();
  }

  /**
   * Calculates the time units from milliseconds.
   */
  private calculateTimeUnits(milliseconds: number): Record<string, number> {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)) % 30; // Approximate
    const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30)) % 12; // Approximate
    const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365)); // Approximate

    return { seconds, minutes, hours, days, months, years };
  }

  /**
   * Gets the visible units based on min-unit and max-unit properties.
   */
  private getVisibleUnits(): string[] {
    const allUnits = QuietCountdown.UNITS;
    const minIndex = allUnits.indexOf(this.minUnit);
    const maxIndex = allUnits.indexOf(this.maxUnit);

    // If the indexes are invalid, return default units
    if (minIndex === -1 || maxIndex === -1 || minIndex > maxIndex) {
      return ['seconds', 'minutes', 'hours', 'days'];
    }

    return allUnits.slice(minIndex, maxIndex + 1);
  }

  /**
   * Formats a number as a two-digit string.
   */
  private formatUnit(value: number): string {
    return value.toString().padStart(2, '0');
  }

  /**
   * Checks if any visible units have changed and dispatches tick event if needed.
   */
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
      this.dispatchEvent(new CustomEvent('quiet-tick'));
    }
  }

  render() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Check for invalid dates
    if (isNaN(start.getMilliseconds()) || isNaN(end.getMilliseconds())) {
      return '';
    }

    // Apply any adjustments to the end date from pausing/resuming
    const adjustedEndTime = end.getTime() + this.endAdjustment;
    const now = Date.now();
    const remaining = Math.max(0, adjustedEndTime - now);

    const units = this.calculateTimeUnits(remaining);
    const visibleUnits = this.getVisibleUnits().reverse(); // Display in descending order (largest to smallest)

    // Check for changes and dispatch tick event if needed
    this.checkForChanges(units, visibleUnits);

    // Create the display
    const unitElements = visibleUnits.map((unit, index) => {
      const value = units[unit];
      const formattedValue = this.formatUnit(value);

      // Don't add a delimiter after the last unit
      const showDelimiter = index < visibleUnits.length - 1;

      return html`
        <span part="unit">${formattedValue}</span>
        ${showDelimiter ? html`<span part="delimiter">${this.delimiter}</span>` : ''}
      `;
    });

    return html`${unitElements}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-countdown': QuietCountdown;
  }
}
