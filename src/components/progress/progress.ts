import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './progress.styles.js';

/**
 * <quiet-progress>
 *
 * @summary Progress bars represent the completion status of a request or task.
 * @documentation https://quietui.org/docs/components/progress
 * @status stable
 * @since 1.0
 *
 * @slot - Text to render inside the progress bar.
 *
 * @cssproperty [--track-color=var(--quiet-neutral-fill-softer)] - The color of the progress bar's track.
 * @cssproperty [--track-size=1.5em | 1em] - The height or thickness of the track, depending on the type of progress bar.
 * @cssproperty [--indicator-color=var(--quiet-primary-fill-mid)] - The color of the progress bar's value indicator.
 * @cssproperty [--diameter=10em] - For progress rings, the diameter of the ring.
 *
 * @csspart track - The progress bar's track, a `<div>` for progress bars and a `<circle>` for progress rings.
 * @csspart indicator - The progress bar's current value indicator, a `<div>` for progress bars and an SVG `<circle>`
 *  for progress rings.
 * @csspart content - The container that holds any content that's been slotted in.
 */
@customElement('quiet-progress')
export class QuietProgress extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** A custom label for assistive devices. */
  @property() label: string;

  /** The type of progress bar to render. */
  @property({ reflect: true }) type: 'bar' | 'ring' = 'bar';

  /** The progress bar's minimum value. */
  @property({ type: Number }) min = 0;

  /** The progress bar's maximum value. */
  @property({ type: Number }) max = 100;

  /** The progress bar's current value. */
  @property({ type: Number }) value = 0;

  /** The progress bar's current value as a percentage. This is a readonly property. */
  public get percentage() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  /**
   * When the completion status can't be determined, the progress bar is considered indeterminate and the value is
   * ignored. Useful for tasks whose progress can't be reported.
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  firstUpdated() {
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
      this.style.setProperty('--percentage', `${clamp(this.percentage, 0, 100)}`);
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
    // Progress ring
    if (this.type === 'ring') {
      return html`
        <svg>
          <circle id="track" part="track"></circle>
          <circle id="indicator" part="indicator"></circle>
        </svg>

        <div id="content" part="content">
          <slot></slot>
        </div>
      `;
    }

    // Progress bar
    return html`
      <div id="track" part="track">
        <div id="indicator" part="indicator">
          <div id="content" part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-progress': QuietProgress;
  }
}
