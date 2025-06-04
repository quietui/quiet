/** Emitted when loading has completed. */
export class QuietLoadedEvent extends Event {
  constructor() {
    super('quiet-loaded', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when an error occurred during the loading operation. */
export class QuietLoadErrorEvent extends Event {
  readonly detail: QuietLoadErrorEventDetail;

  constructor(detail: QuietLoadErrorEventDetail) {
    super('quiet-load-error', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietLoadErrorEventDetail {
  /** The error that occurred while loading. */
  error: Error;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-loaded': QuietLoadedEvent;
    'quiet-load-error': QuietLoadErrorEvent;
  }
}

/** Emitted when scrolling has reached the threshold and more items should be loaded. */
export class QuietLoadMoreEvent extends Event {
  constructor() {
    super('quiet-load-more', {
      bubbles: true,
      cancelable: false,
      composed: true
    });
  }
}
