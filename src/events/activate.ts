/** Emitted when an activation occurs. Canceling the event will prevent activation. */
export class QuietBeforeActivateEvent extends Event {
  constructor() {
    super('quiet-before-activate', { bubbles: false, cancelable: true, composed: true });
  }
}

/** Emitted immediately after an activation occurs. */
export class QuietActivateEvent extends Event {
  constructor() {
    super('quiet-activate', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when a deactivation occurs. Canceling the event will prevent deactivation. */
export class QuietBeforeDeactivateEvent extends Event {
  constructor() {
    super('quiet-before-deactivate', { bubbles: false, cancelable: true, composed: true });
  }
}

/** Emitted immediately after an activation occurs. */
export class QuietDeactivateEvent extends Event {
  constructor() {
    super('quiet-deactivate', { bubbles: false, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-before-activate': QuietBeforeActivateEvent;
    'quiet-activate': QuietActivateEvent;
    'quiet-before-deactivate': QuietBeforeActivateEvent;
    'quiet-deactivate': QuietDeactivateEvent;
  }
}
