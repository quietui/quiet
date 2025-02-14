/** Emitted when the element is opened. Calling `event.preventDefault` will prevent the element from opening. */
export class QuietBeforeOpenEvent extends Event {
  constructor(options = { cancelable: true }) {
    super('quiet-before-open', { bubbles: true, cancelable: options.cancelable, composed: true });
  }
}

/** Emitted after the element is opened and applicable animations have completed. */
export class QuietOpenEvent extends Event {
  constructor() {
    super('quiet-open', { bubbles: true, cancelable: false, composed: true });
  }
}

/**
 * Emitted when the element is told to dismiss. Calling `event.preventDefault` will prevent the element from closing.
 * You can inspect `event.detail.source` to see which element triggered dismissal.
 */
export class QuietBeforeCloseEvent extends Event {
  readonly detail: QuietBeforeCloseEventDetails;

  constructor(detail: QuietBeforeCloseEventDetails, options = { cancelable: true }) {
    super('quiet-before-close', { bubbles: true, cancelable: options.cancelable, composed: true });
    this.detail = detail;
  }
}

interface QuietBeforeCloseEventDetails {
  /** The element that triggered the close action, if available. */
  source: Element | null;
}

/** Emitted after the element is closed and applicable animations have completed. */
export class QuietCloseEvent extends Event {
  constructor() {
    super('quiet-close', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-before-open': QuietBeforeOpenEvent;
    'quiet-open': QuietOpenEvent;
    'quiet-before-close': QuietBeforeCloseEvent;
    'quiet-close': QuietCloseEvent;
  }
}
