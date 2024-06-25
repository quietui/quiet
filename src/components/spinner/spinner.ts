import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './spinner.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-spinner>
 *
 * @summary Spinners tell the user that content is loading or a request is processing in the background.
 * @documentation https://quietui.com/docs/components/spinner
 * @status stable
 * @since 1.0
 *
 * @cssproperty [--indicator-color=var(--quiet-primary-fill-mid)] - The color of the spinner's indicator.
 * @cssproperty [--track-color=var(--quiet-primary-fill-mid)] - The color of the spinner's track.
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
      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle id="track" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
        <circle id="indicator" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-spinner': QuietSpinner;
  }
}
