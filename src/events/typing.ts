/** Emitted when a typing animation completes. */
export class QuietTypingCompleteEvent extends Event {
  constructor() {
    super('quiet-typing-complete', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-typing-complete': QuietTypingCompleteEvent;
  }
}
