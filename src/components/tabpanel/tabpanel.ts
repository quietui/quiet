import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './tabpanel.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-tabpanel>
 *
 * @summary Tab panels hold the content that gets displayed when a tab is selected.
 * @documentation https://quietui.com/docs/components/tabpanel
 * @status stable
 * @since 1.0
 *
 * @slot - Content to show inside the tab panel.
 *
 * @state visible - Applied when the tab panel is visible.
 */
@customElement('quiet-tabpanel')
export class TabPanel extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** @internal The controller will set this when the panel should be visible. */
  @property({ type: Boolean }) visible = false;

  /** The name of the tab panel. Used for assigning tabs to panels. */
  @property({ reflect: true }) name = '';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.visible = false;
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('visible')) {
      this.customStates.set('visible', this.visible);
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}
