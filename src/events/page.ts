/**
 * Emitted when the page is going to change, e.g. in a pagination component. Calling `event.preventDefault` will prevent
 * the page from changing.
 */
export class QuietBeforePageChangeEvent extends Event {
  readonly detail: QuietBeforePageChangeEventDetail;

  constructor(detail: QuietBeforePageChangeEventDetail) {
    super('quiet-before-page-change', { bubbles: false, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface QuietBeforePageChangeEventDetail {
  currentPage: number;
  requestedPage: number;
}

/** Emitted after the page has changed. */
export class QuietPageChangeEvent extends Event {
  constructor() {
    super('quiet-page-change', { bubbles: false, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-before-page-change': QuietBeforePageChangeEvent;
    'quiet-page-change': QuietPageChangeEvent;
  }
}
