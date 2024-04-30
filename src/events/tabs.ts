import type { QuietTab } from '../components/tab/tab.js';
import type { QuietTabPanel } from '../components/tab-panel/tab-panel.js';

/**
 * Emitted after a tab is shown. The event will include a `detail` object with `tab` and `panel`properties that
 * reference the respective tab and panel elements.
 */
export class QuietTabShownEvent extends Event {
  readonly detail: QuietTabShownEventDetail;

  constructor(detail: QuietTabShownEventDetail) {
    super('quiet-tab-shown', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietTabShownEventDetail {
  tab: QuietTab;
  panel: QuietTabPanel;
}

/**
 * Emitted after a tab is hidden. The event will include a `detail` object with `tab` and `panel` properties that
 * reference the respective tab and panel elements.
 */
export class QuietTabHiddenEvent extends Event {
  readonly detail: QuietTabHiddenEventDetail;
  constructor(detail: QuietTabHiddenEventDetail) {
    super('quiet-tab-hidden', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietTabHiddenEventDetail {
  tab: QuietTab;
  panel: QuietTabPanel;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-tab-shown': QuietTabShownEvent;
    'quiet-tab-hidden': QuietTabHiddenEvent;
  }
}
