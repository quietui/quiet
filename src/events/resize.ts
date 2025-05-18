/** Emitted when a resize occurs. */
export class QuietResizeEvent extends Event {
  readonly detail?: QuietResizeEventDetail;

  constructor(detail?: QuietResizeEventDetail) {
    super('quiet-resize', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietResizeEventDetail {
  entry?: ResizeObserverEntry;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-resize': QuietResizeEvent;
  }
}
