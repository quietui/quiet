import { customElement } from 'lit/decorators.js';
import { LitElement } from 'lit';
import hostStyles from '../../styles/host.styles.js';
import styles from './spinner.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-spinner>
 *
 * @summary Spinners show an animated, indeterminate loading state.
 * @documentation https://quietui.com/docs/components/spinner
 * @status stable
 * @since 1.0
 */
@customElement('quiet-spinner')
export class Spinner extends LitElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'progressbar');
    //
    // TODO - localize
    //
    this.setAttribute('aria-label', 'Loading');
  }
}
