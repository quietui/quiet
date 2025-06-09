/** Emitted when an element's intersection state changes. */
export class QuietIntersectEvent extends Event {
  readonly detail?: QuietIntersectEventDetail;

  constructor(detail?: QuietIntersectEventDetail) {
    super('quiet-intersect', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietIntersectEventDetail {
  entry?: IntersectionObserverEntry;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-intersect': QuietIntersectEvent;
  }
}
