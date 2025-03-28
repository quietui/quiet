/** Emitted when copying has completed. */
export class QuietCopyEvent extends Event {
  readonly detail: QuietCopyEventDetail;

  constructor(detail: QuietCopyEventDetail) {
    super('quiet-copy', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietCopyEventDetail {
  data: string | ClipboardItem[];
}

/** Emitted when an error occurred during the copying operation. */
export class QuietCopyErrorEvent extends Event {
  readonly detail: QuietCopyErrorEventDetail;

  constructor(detail: QuietCopyErrorEventDetail) {
    super('quiet-copy-error', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietCopyErrorEventDetail {
  /** The error that occurred while copying. */
  error: Error;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-copy': QuietCopyEvent;
    'quiet-copy-error': QuietCopyErrorEvent;
  }
}
