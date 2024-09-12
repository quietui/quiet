import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './spinner.styles.js';

/**
 * <quiet-spinner>
 *
 * @summary Spinners tell the user that content is loading or a request is processing in the background.
 * @documentation https://quietui.com/docs/components/spinner
 * @status stable
 * @since 1.0
 *
 * @slot - A custom spinner to show in lieu of the default one. Works best with `<img>` and `<svg>` elements. Custom
 *  spinners will not be animated, allowing you to use animated GIF, APNG, and SVG animations without conflict.
 *
 * @cssproperty [--indicator-color=var(--quiet-primary-fill-mid)] - The color of the spinner's indicator.
 * @cssproperty [--track-color=var(--quiet-primary-fill-mid)] - The color of the spinner's track.
 * @cssproperty [--speed=0.75s] - The speed for one complete rotation.
 */
@customElement('quiet-spinner')
export class QuietSpinner extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  firstUpdated() {
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-label', this.localize.term('loading'));
  }

  render() {
    return html`
      <slot>
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle id="track" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
          <circle id="indicator" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
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
