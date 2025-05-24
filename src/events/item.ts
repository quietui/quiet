/**
 * Event emitted when an item changes, e.g. a carousel item.
 */
export class QuietItemChangeEvent extends Event {
  readonly detail: QuietItemChangeEventDetail;

  constructor(detail: QuietItemChangeEventDetail) {
    super('quiet-item-change', {
      bubbles: true,
      composed: true
    });
    this.detail = detail;
  }
}

interface QuietItemChangeEventDetail {
  /** The index of the item that changed. */
  index?: number;
}

declare global {
  interface HTMLElementEventMap {
    'quiet-item-change': QuietItemChangeEvent;
  }
}
