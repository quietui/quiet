/** Emitted when loading has completed. */
export class QuietIncludedEvent extends Event {
  readonly detail: QuietIncludedEventDetail;

  constructor(detail: QuietIncludedEventDetail) {
    super('quiet-included', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietIncludedEventDetail {
  /** The HTTP status code returned from the request. */
  status: number;
}

/** Emitted when a network error occurs or when the request returns an HTTP status code outside of the 200 range. */
export class QuietIncludeErrorEvent extends Event {
  readonly detail: QuietIncludeErrorEventDetail;

  constructor(detail: QuietIncludeErrorEventDetail) {
    super('quiet-include-error', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietIncludeErrorEventDetail {
  /** The error received from the network request. */
  error: Error;
  /** The HTTP status code returned from the request. */
  status?: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-included': QuietIncludedEvent;
    'quiet-include-error': QuietIncludeErrorEvent;
  }
}
