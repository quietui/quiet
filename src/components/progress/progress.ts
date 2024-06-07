import { clamp } from '../../utilities/math.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './progress.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-progress>
 *
 * @summary Progress bars represent the completion status of a request or task.
 * @documentation https://quietui.com/docs/components/progress
 * @status stable
 * @since 1.0
 *
 * @slot - Text to render inside the progress bar.
 *
 * @csspart indicator - The progress bar's current value indicator.
 *
 * @cssproperty [--indicator-color=var(--quiet-primary-fill-mid)] - The color of the progress bar's value indicator.
 * @cssproperty [--track-color=var(--quiet-neutral-fill-softer)] - The color of the progress bar's track.
 */
@customElement('quiet-progress')
export class QuietProgress extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('#indicator') private indicator: HTMLDivElement;

  /** A custom label for assistive devices. */
  @property() label: string;

  /** The progress bar's minimum value. */
  @property({ type: Number }) min = 0;

  /** The progress bar's maximum value. */
  @property({ type: Number }) max = 100;

  /** The progress bar's current value. */
  @property({ type: Number, reflect: true }) value = 0;

  /** The progress bar's current value as a percentage. This is a readonly property. */
  public get percentage() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  /**
   * When the completion status can't be determined, the progress bar is considered indeterminate and the value is
   * ignored. Useful for tasks whose progress can't be reported.
   */
  @property({ type: Boolean }) indeterminate = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
  }

  updated(changedProps: Map<string, unknown>) {
    // Set the label
    if (changedProps.has('label')) {
      this.setAttribute('aria-label', this.label);
    }

    // Update values
    if (
      changedProps.has('min') ||
      changedProps.has('max') ||
      changedProps.has('value') ||
      changedProps.has('indeterminate')
    ) {
      this.indicator.style.setProperty('--percentage', `${clamp(this.percentage, 0, 100)}%`);
      this.setAttribute('aria-valuemin', String(this.min));
      this.setAttribute('aria-valuemax', String(this.max));
      if (this.indeterminate) {
        this.removeAttribute('aria-valuenow');
      } else {
        this.setAttribute('aria-valuenow', String(this.value));
      }
    }
  }

  render() {
    return html`
      <div
        id="indicator"
        part="indicator"
        class=${classMap({
          indeterminate: this.indeterminate
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-progress': QuietProgress;
  }
}
