import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './tab.styles.js';

/**
 * <quiet-tab>
 *
 * @summary Tabs describe and select a tab panel within a tab list.
 * @documentation https://quietui.org/docs/components/tab
 * @status stable
 * @since 1.0
 *
 * @slot - The tab's content. This is usually a short label, but sometimes includes an icon.
 *
 * @cssstate active - Applied when the tab is selected.
 * @cssstate disabled - Applied when the tab is selected.
 */
@customElement('quiet-tab')
export class QuietTab extends QuietElement {
  static autoSlot = 'tab';
  static styles: CSSResultGroup = [hostStyles, styles];

  /** @internal The controller will set this property to true when the tab is active. */
  @property({ type: Boolean }) active = false;

  /**
   * The name of the tab panel this tab will link to. The tab panel must be an HTML element inside the
   * `<quiet-tab-list>` element with a `name` attribute.
   */
  @property({ reflect: true }) panel?: string;

  /** Disables the tab, preventing it from being activated. */
  @property({ type: Boolean }) disabled = false;

  firstUpdated() {
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.setAttribute('aria-disabled', 'false');
    this.setAttribute('tabindex', '-1');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.active = false;
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
      this.setAttribute('tabindex', this.active ? '0' : '-1');
      this.customStates.set('active', this.active);
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);

      if (this.active && this.disabled) {
        this.active = false;
        this.closest('quiet-tab-list')?.resetRovingTabIndex();
      }
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-tab': QuietTab;
  }
}
