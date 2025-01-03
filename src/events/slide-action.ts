/** Emitted when a slide action has completed. */
export class QuietSlideActionCompleteEvent extends Event {
  constructor() {
    super('quiet-slide-action-complete', { bubbles: false, cancelable: true, composed: true });
  }
}

/** Emitted when a slide action has progressed. */
export class QuietSlideActionProgressEvent extends Event {
  readonly detail: QuietSlideActionProgressEventDetail;

  constructor(detail: QuietSlideActionProgressEventDetail) {
    super('quiet-slide-action-progress', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietSlideActionProgressEventDetail {
  progress: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-slide-action-complete': QuietSlideActionCompleteEvent;
    'quiet-slide-action-progress': QuietSlideActionProgressEvent;
  }
}
