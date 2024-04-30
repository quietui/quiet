/** Emitted when the element is opened. Calling `event.preventDetail` will prevent the element from opening. */
export class QuietOpenEvent extends Event {
  constructor() {
    super('quiet-open', { bubbles: true, cancelable: true, composed: true });
  }
}

/** Emitted after the element is opened and applicable animations have completed. */
export class QuietOpenedEvent extends Event {
  constructor() {
    super('quiet-opened', { bubbles: true, cancelable: false, composed: true });
  }
}

/**
 * Emitted when the element is told to dismiss. Calling `event.preventDetail` will prevent the element from closing.
 * You can inspect `event.detail.source` to see which element triggered dismissal.
 */
export class QuietCloseEvent extends Event {
  readonly detail: QuietCloseEventDetails;

  constructor(detail: QuietCloseEventDetails) {
    super('quiet-close', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface QuietCloseEventDetails {
  /** The element that triggered the close action, if available. */
  source: Element;
}

/** Emitted after the element is closed and applicable animations have completed. */
export class QuietClosedEvent extends Event {
  constructor() {
    super('quiet-closed', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-open': QuietOpenEvent;
    'quiet-opened': QuietOpenedEvent;
    'quiet-close': QuietCloseEvent;
    'quiet-closed': QuietClosedEvent;
  }
}
