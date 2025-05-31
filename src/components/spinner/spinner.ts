import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './spinner.styles.js';

/**
 * <quiet-spinner>
 *
 * @summary Spinners tell the user that content is loading or a request is processing in the background.
 * @documentation https://quietui.org/docs/components/spinner
 * @status stable
 * @since 1.0
 *
 * @slot - A custom spinner to show in lieu of the default one. Works best with `<img>` and `<svg>` elements. Custom
 *  spinners will not be animated, allowing you to use animated GIF, APNG, and SVG animations without conflict.
 *
 * @csspart track - the spinner's track, a `<circle>` SVG element.
 * @csspart indicator - the spinner's indicator, a `<circle>` SVG element.
 *
 * @cssproperty [--indicator-color=var(--quiet-primary-fill-mid)] - The color of the spinner's indicator.
 * @cssproperty [--track-color=color-mix(in oklab, var(--quiet-neutral-fill-mid), transparent 75%)] - The color of the
 *  spinner's track.
 * @cssproperty [--speed=0.75s] - The speed for one complete rotation.
 */
@customElement('quiet-spinner')
export class QuietSpinner extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** A custom label for screen readers. */
  @property({ type: String, attribute: 'label' }) label = '';

  firstUpdated() {
    const label = this.label || this.localize.term('loading');
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-label', label);
  }

  render() {
    return html`
      <slot>
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle id="track" part="track" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
          <circle id="indicator" part="indicator" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
        </svg>
      </slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-spinner': QuietSpinner;
  }
}
