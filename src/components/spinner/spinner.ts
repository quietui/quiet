import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
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
 * @cssproperty [--color=var(--quiet-primary-moderate)] - The spinner's color.
 */
@customElement('quiet-spinner')
export class Spinner extends LitElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-label', 'Loading'); // TODO - localize
  }

  render() {
    return html`
      <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g><circle cx="12" cy="12" r="10" fill="none" stroke-width="3" /></g>
      </svg>
    `;
  }
}
