/** Emitted when an action has progressed. */
export class QuietProgressEvent extends Event {
  readonly detail: QuietProgressDetail;

  constructor(detail: QuietProgressDetail) {
    super('quiet-progress', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietProgressDetail {
  /* The percentage of completion from 0 to 1. */
  percent: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-progress': QuietProgressEvent;
  }
}
