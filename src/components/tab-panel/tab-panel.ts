import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './tab-panel.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-tab-panel>
 *
 * @summary Tab panels hold the content that gets displayed when a tab is selected.
 * @documentation https://quietui.com/docs/components/tab-panel
 * @status stable
 * @since 1.0
 *
 * @slot - Content to show inside the tab panel.
 *
 * @cssstate visible - Applied when the tab panel is visible.
 */
@customElement('quiet-tab-panel')
export class QuietTabPanel extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** @internal The controller will set this when the panel should be visible. */
  @property({ type: Boolean }) visible = false;

  /** The name of the tab panel. Used for assigning tabs to panels. */
  @property({ reflect: true }) name: string;

  firstUpdated() {
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

declare global {
  interface HTMLElementTagNameMap {
    'quiet-tab-panel': QuietTabPanel;
  }
}
