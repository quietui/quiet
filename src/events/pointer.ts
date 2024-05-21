/** Emitted when the element is clicked. */
export class QuietClickEvent extends PointerEvent {
  constructor() {
    super('quiet-click', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-click': QuietClickEvent;
  }
}
