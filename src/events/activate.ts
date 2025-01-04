/** Emitted when a user-initiated activation occurs. */
export class QuietActivateEvent extends Event {
  constructor() {
    super('quiet-activate', { bubbles: false, cancelable: true, composed: true });
  }
}

export class QuietDeactivateEvent extends Event {
  constructor() {
    super('quiet-deactivate', { bubbles: false, cancelable: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-activate': QuietActivateEvent;
    'quiet-deactivate': QuietDeactivateEvent;
  }
}
