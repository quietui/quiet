/** Emitted when a resize occurs. */
export class QuietResizeEvent extends Event {
  constructor() {
    super('quiet-resize', { bubbles: false, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-resize': QuietResizeEvent;
  }
}
