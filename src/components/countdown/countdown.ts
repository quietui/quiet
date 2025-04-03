import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietFinishedEvent } from '../../events/finished.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './countdown.styles.js';

const UNITS = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'];

/**
 * <quiet-countdown>
 *
 * @summary Displays a countdown timer between two dates.
 * @documentation https://quietui.org/docs/components/countdown
 * @status stable
 * @since 1.0
 *
 * @event quiet-finished - Dispatched when the countdown finishes.
 */
@customElement('quiet-countdown')
export class QuietCountdown extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  // For tracking time and intervals
  private intervalId: number | null = null;
  private stoppedAt: number | null = null;
  private hasFinished = false;
  private endAdjustment = 0;

  /**
   * An accessible label for the countdown. This won't be shown, but it will be read to assistive devices so you should
   * always include one.
   */
  @property() label = '';

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

  /** The delimiter to show between units. */
  @property() delimiter: string = ':';

  /** The smallest unit to display in the countdown. */
  @property({ attribute: 'min-unit' }) minUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' =
    'seconds';

  /** The largest unit to display in the countdown. */
  @property({ attribute: 'max-unit' }) maxUnit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' = 'days';

  /** Whether to show long form labels for units (e.g., "hours" instead of "h"). */
  @property({ type: Boolean, attribute: 'long-labels' }) longLabels = false;

  private localize = new Localize(this);
  private previousValues: Record<string, number> = {};

  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.start();
  }

  disconnectedCallback() {
    this.stop();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.setAttribute('role', 'timer');
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Handle label changes
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }

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
        this.start();
      }
    }
  }

  /** Starts or resumes the countdown timer after validating dates. */
  public start(options: { resume?: boolean } = {}): boolean {
    // Validate dates first
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Verify both dates are valid and end is after start
    const isValid = !isNaN(start.getMilliseconds()) && !isNaN(end.getMilliseconds()) && end.getTime() > start.getTime();

    if (!isValid) {
      return false;
    }

    // Clear any existing interval
    this.stop();

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

    return true;
  }

  /** Stops the countdown timer and records the time it was stopped. */
  stop(): void {
    // Only record stop time if timer is currently running
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;

      // Record when the timer was stopped (for resuming later)
      this.stoppedAt = Date.now();
    }
  }

  /** Calculates the update interval based on the minimum unit shown. */
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

  /** Calculates the time remaining and updates the display. */
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
      this.dispatchEvent(new QuietFinishedEvent());
      this.stop();
    }

    this.requestUpdate();
  }

  /** Calculates the time units from milliseconds. */
  /** Calculates the time units from milliseconds, including rollovers. */
  private calculateTimeUnits(milliseconds: number): Record<string, number> {
    const visibleUnits = this.getVisibleUnits();
    const allUnits = UNITS;
    const result: Record<string, number> = {};

    // Get the highest visible unit
    const highestVisibleUnit = visibleUnits[visibleUnits.length - 1];
    const highestVisibleIndex = allUnits.indexOf(highestVisibleUnit);

    // Initialize all units to 0
    for (const unit of allUnits) {
      result[unit] = 0;
    }

    // Base calculation of time units
    let remaining = milliseconds;

    // Calculate seconds
    if (visibleUnits.includes('seconds')) {
      result.seconds = Math.floor(remaining / 1000) % 60;
      remaining -= result.seconds * 1000;
    }

    // Calculate minutes
    if (visibleUnits.includes('minutes')) {
      result.minutes = Math.floor(remaining / (1000 * 60)) % 60;
      remaining -= result.minutes * 1000 * 60;
    }

    // Calculate hours
    if (visibleUnits.includes('hours')) {
      result.hours = Math.floor(remaining / (1000 * 60 * 60)) % 24;
      remaining -= result.hours * 1000 * 60 * 60;
    }

    // Calculate days
    if (visibleUnits.includes('days')) {
      result.days = Math.floor(remaining / (1000 * 60 * 60 * 24)) % 30;
      remaining -= result.days * 1000 * 60 * 60 * 24;
    }

    // Calculate months
    if (visibleUnits.includes('months')) {
      result.months = Math.floor(remaining / (1000 * 60 * 60 * 24 * 30)) % 12;
      remaining -= result.months * 1000 * 60 * 60 * 24 * 30;
    }

    // Calculate years
    if (visibleUnits.includes('years')) {
      result.years = Math.floor(remaining / (1000 * 60 * 60 * 24 * 365));
    }

    // Now handle rollovers for the highest visible unit
    // Get all non-visible higher units
    const higherUnits = allUnits.slice(highestVisibleIndex + 1);

    if (higherUnits.length > 0 && highestVisibleUnit) {
      // Calculate conversion factors to the highest visible unit
      const conversionFactors: Record<string, number> = {
        seconds: 1,
        minutes: 60,
        hours: 60 * 60,
        days: 24 * 60 * 60,
        months: 30 * 24 * 60 * 60,
        years: 365 * 24 * 60 * 60
      };

      // Calculate the highest unit's factor
      const highestUnitFactor = conversionFactors[highestVisibleUnit];

      // Convert all higher non-visible units to the highest visible unit
      for (const unit of higherUnits) {
        const unitValue = Math.floor(milliseconds / (1000 * conversionFactors[unit]));

        if (unitValue > 0) {
          // Convert to the highest visible unit
          result[highestVisibleUnit] += unitValue * (conversionFactors[unit] / highestUnitFactor);
        }
      }
    }

    return result;
  }

  /** Gets the visible units based on min-unit and max-unit properties. */
  private getVisibleUnits(): string[] {
    const allUnits = UNITS;
    const minIndex = allUnits.indexOf(this.minUnit);
    const maxIndex = allUnits.indexOf(this.maxUnit);

    // If the indexes are invalid, return default units
    if (minIndex === -1 || maxIndex === -1 || minIndex > maxIndex) {
      return ['seconds', 'minutes', 'hours', 'days'];
    }

    return allUnits.slice(minIndex, maxIndex + 1);
  }

  /** Formats a number as a two-digit string. */
  private formatUnit(value: number): string {
    return value.toString().padStart(2, '0');
  }

  /** Gets the unit label using Intl.DisplayNames or fallback. */
  private getUnitLabel(unit: string): string {
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

    // Create a plain text representation for screen readers
    const accessibleCountdown = visibleUnits
      .map(unit => {
        const value = units[unit];
        const label = this.longLabels ? unit : this.getUnitLabel(unit);
        return `${value} ${label}`;
      })
      .join(' ');

    // Create the display with new structure
    const unitElements = visibleUnits.map((unit, index) => {
      const value = units[unit];
      const formattedValue = this.formatUnit(value);
      const label = this.longLabels ? unit : this.getUnitLabel(unit);
      const showDelimiter = index < visibleUnits.length - 1;

      return html`
        <span part="unit" aria-hidden="true">
          <span part="value">${formattedValue}</span>
          <span part="label"><slot name="${unit}">${label}</slot></span>
        </span>
        ${showDelimiter ? html`<span part="delimiter" aria-hidden="true">${this.delimiter}</span>` : ''}
      `;
    });

    return html`
      <span class="vh">${accessibleCountdown}</span>
      ${unitElements}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-countdown': QuietCountdown;
  }
}
