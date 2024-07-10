import '../tab-panel/tab-panel.js';
import '../tab/tab.js';
import { createId } from '../../utilities/math.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { QuietTabHiddenEvent, QuietTabShownEvent } from '../../events/tabs.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './tab-list.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietTab } from '../tab/tab.js';
import type { QuietTabPanel } from '../tab-panel/tab-panel.js';

interface GetTabsOptions {
  includeDisabled: boolean;
}

/**
 * <quiet-tab-list>
 *
 * @summary Tab lists let users switch between different sections of content without leaving the page, providing a clean
 *  and organized interface.
 * @documentation https://quietui.com/docs/components/tab-list
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-tab
 * @dependency quiet-tab-panel
 *
 * @slot - One or more `<quiet-tab-panel>` elements, each with a `name` attribute unique to the tab list.
 * @slot tab - One or more `<quiet-tab>` elements, each with a `panel` attribute linked to the `name` of a tab panel.
 *
 * @event quiet-tab-shown - Emitted after a tab is shown. The event will include a `detail` object with `tab` and
 *  `panel`properties that reference the respective tab and panel elements.
 * @event quiet-tab-hidden - Emitted after a tab is hidden. The event will include a `detail` object with `tab` and
 *  `panel` properties that reference the respective tab and panel elements.
 *
 * @csspart tabs - The container that holds all of the tabs.
 * @csspart panels - The container that holds all of the tab panels.
 */
@customElement('quiet-tab-list')
export class QuietTabList extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#tabs > slot') private tabSlot: HTMLSlotElement;
  @query('#panels > slot') private panelSlot: HTMLSlotElement;

  /**
   * An accessible label for the tab list. This won't be shown, but it will be read to assistive devices so you should
   * always include one.
   */
  @property() label: string;

  /** The name of the tab panel that's currently active. */
  @property({ reflect: true }) tab: string;

  /** The placement of tab controls. */
  @property({ reflect: true }) placement: 'top' | 'bottom' | 'start' | 'end' = 'top';

  updated(changedProps: Map<string, unknown>) {
    // Set the label
    if (changedProps.has('label')) {
      this.setAttribute('aria-label', this.label ?? '');
    }

    // Set the active tab
    if (changedProps.has('tab')) {
      this.setActiveTab(this.tab);
    }

    // Set orientation
    if (changedProps.has('placement')) {
      const orientation = ['top', 'bottom'].includes(this.placement) ? 'horizontal' : 'vertical';
      this.setAttribute('aria-orientation', orientation);
    }
  }

  private handleTabsClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest<QuietTab>('quiet-tab');

    if (tab?.panel && !tab.disabled) {
      this.tab = tab.panel || '';
    }
  }

  /** Gets an array of tabs slotted into the tab list. */
  private getTabs(options?: Partial<GetTabsOptions>) {
    const tabs = this.tabSlot.assignedElements({ flatten: true }) as QuietTab[];

    if (options?.includeDisabled) {
      return tabs.filter(tab => tab.localName === 'quiet-tab');
    } else {
      return tabs.filter(tab => tab.localName === 'quiet-tab' && !tab.disabled);
    }
  }

  private getPanels() {
    const panels = this.panelSlot.assignedElements({ flatten: true }) as QuietTabPanel[];
    return panels.filter(panel => panel.localName === 'quiet-tab-panel');
  }

  private handleSlotChange() {
    const tabs = this.getTabs();
    const panels = this.getPanels();

    // Ensure tabs and panels have ids
    tabs.forEach(tab => (tab.id = tab.id || createId('quiet-tab-')));
    panels.forEach(panel => (panel.id = panel.id || createId('quiet-tab-panel-')));

    // Link tabs and panels
    tabs.forEach(tab => {
      const name = tab.panel;
      if (!name) return;

      const panel = panels.find(p => p.name === name);
      if (!panel) return;

      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-describedby', tab.id);
    });

    // Set the initial active tab
    if (!this.tab) {
      this.tab = tabs[0].panel || '';
    }
  }

  /** Sets the active tab + panel. */
  private setActiveTab(name: string | undefined) {
    const tabs = this.getTabs({ includeDisabled: true });
    const panels = this.getPanels();

    if (!name) return;

    this.tab = name;

    // Update the tab
    for (const tab of tabs) {
      tab.active = tab.panel === name && !tab.disabled;
    }

    // Show the active panel
    for (const panel of panels) {
      const linkedTab = tabs.find(tab => tab.panel === panel.name);

      if (panel.name === name && linkedTab && !linkedTab.disabled) {
        panel.visible = true;
        this.dispatchEvent(new QuietTabShownEvent({ tab: linkedTab, panel }));
      } else if (linkedTab && panel.visible) {
        panel.visible = false;
        this.dispatchEvent(new QuietTabHiddenEvent({ tab: linkedTab, panel }));
      }
    }
  }

  /** Keyboard navigation */
  private handleTabsKeyDown(event: KeyboardEvent) {
    const tabs = this.getTabs();
    const activeTab = tabs.find(tab => tab.panel === this.tab);
    const activeTabIndex = activeTab ? tabs.indexOf(activeTab) : 0;
    const isRtl = this.localize.dir() === 'rtl';
    const isVertical = ['start', 'end'].includes(this.placement);
    let targetTab: QuietTab | undefined;

    // Previous tab
    if (
      (isVertical && event.key === 'ArrowUp') ||
      (!isVertical && event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft'))
    ) {
      const prevIndex = activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
      targetTab = tabs[prevIndex];
    }

    // Next tab
    if (
      (isVertical && event.key === 'ArrowDown') ||
      (!isVertical && event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight'))
    ) {
      const nextIndex = activeTabIndex === tabs.length - 1 ? 0 : activeTabIndex + 1;
      targetTab = tabs[nextIndex];
    }

    // Home + end
    if (event.key === 'Home' || event.key === 'End') {
      targetTab = event.key === 'Home' ? tabs[0] : tabs.slice(-1)[0];
    }

    // Update the roving tab index and move focus to the target tab
    if (targetTab) {
      event.preventDefault();
      event.stopPropagation();
      this.tab = targetTab.panel || '';
      targetTab.focus();
    }
  }

  render() {
    return html`
      <div id="tabs" part="tabs" role="tablist" @click=${this.handleTabsClick} @keydown=${this.handleTabsKeyDown}>
        <slot name="tab" @slotchange=${this.handleSlotChange}></slot>
      </div>

      <div id="panels" part="panels">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-tab-list': QuietTabList;
  }
}
