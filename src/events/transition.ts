/** Emitted when a custom transition finishes. */
export class QuietTransitionEndEvent extends Event {
  constructor() {
    super('quiet-transition-end', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-transition-end': QuietTransitionEndEvent;
  }
}
