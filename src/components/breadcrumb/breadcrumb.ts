import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './breadcrumb.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-breadcrumb>
 *
 * @summary Breadcrumbs offer a trail of links that correspond to an app or website's hierarchy, making navigation more
 *  predictable for users.
 * @documentation https://quietui.com/docs/components/breadcrumb
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot containing one or more breadcrumb items.
 *
 * @cssproperty [--item-spacing=0.5em] - The amount of spacing to use between breadcrumb items.
 */
@customElement('quiet-breadcrumb')
export class QuietBreadcrumb extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  firstUpdated() {
    this.setAttribute('role', 'list');
    this.setAttribute('aria-label', this.localize.term('breadcrumbs'));
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-breadcrumb': QuietBreadcrumb;
  }
}
