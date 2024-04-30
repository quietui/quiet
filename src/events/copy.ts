/** Emitted when copying has completed. */
export class QuietCopiedEvent extends Event {
  readonly detail: QuietCopiedEventDetail;

  constructor(detail: QuietCopiedEventDetail) {
    super('quiet-copied', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietCopiedEventDetail {
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
    'quiet-copied': QuietCopiedEvent;
    'quiet-copy-error': QuietCopyErrorEvent;
  }
}
