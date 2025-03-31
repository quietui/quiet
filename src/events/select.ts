/** Emitted when one or more elements are selected. */
export class QuietSelectEvent extends Event {
  readonly detail: QuietSelectEventDetail;

  constructor(detail: QuietSelectEventDetail) {
    super('quiet-select', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface QuietSelectEventDetail {
  /** An item or array of items that were selected. */
  item: Element | Element[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-select': QuietSelectEvent;
  }
}
