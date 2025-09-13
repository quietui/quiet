import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './tab-panel.styles.js';

/**
 * <quiet-tab-panel>
 *
 * @summary Holds the content that gets displayed when a tab is selected.
 * @documentation https://quietui.org/docs/components/tab-panel
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

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('visible')) {
      this.customStates.set('visible', this.visible);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-tab-panel': QuietTabPanel;
  }
}
