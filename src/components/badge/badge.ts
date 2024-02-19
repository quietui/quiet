import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import hostStyles from '../../styles/host.styles.js';
import styles from './badge.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-badge>
 *
 * @summary Badges TODO
 * @documentation https://quietui.com/docs/components/badge
 * @status stable
 * @since 1.0
 */
@customElement('quiet-badge')
export class Badge extends LitElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  render() {
    return html` <slot></slot> `;
  }
}
