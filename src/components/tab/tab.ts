import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './tab.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-tab>
 *
 * @summary Tabs describe and select a tab panel within a tab list.
 * @documentation https://quietui.com/docs/components/tab
 * @status stable
 * @since 1.0
 *
 * @slot - The tab's content. This is usually a short label, but sometimes includes an icon.
 *
 * @state active - Applied when the tab is selected.
 * @state disabled - Applied when the tab is selected.
 */
@customElement('quiet-tab')
export class Tab extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** @internal The controller will set this property to true when the tab is active. */
  @property({ type: Boolean }) active = false;

  /**
   * The name of the tab panel this tab will link to. The tab panel must be an HTML element inside the `<quiet-tablist>`
   * element with a `name` attribute.
   */
  @property() panel?: string;

  /** Disables the tab, preventing it from being activated. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.setAttribute('aria-disabled', 'false');
    this.setAttribute('tabindex', '-1');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.active = false;
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
      this.setAttribute('tabindex', this.active ? '0' : '-1');
      this.customStates.set('active', this.active);
    }

    if (changedProps.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);
      this.customStates.set('active', false);
      if (this.disabled) {
        this.active = false;
      }
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}
