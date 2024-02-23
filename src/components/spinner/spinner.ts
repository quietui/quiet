import { customElement } from 'lit/decorators.js';
import { LitElement } from 'lit';
import hostStyles from '../../styles/host.styles.js';
import styles from './spinner.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-spinner>
 *
 * @summary Spinners tell the user that content is loading or an indeterminate request is processing in the background.
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
}
