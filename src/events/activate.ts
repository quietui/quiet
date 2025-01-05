/** Emitted when an activation occurs. Canceling the event will prevent activation. */
export class QuietActivateEvent extends Event {
  constructor() {
    super('quiet-activate', { bubbles: false, cancelable: true, composed: true });
  }
}

/** Emitted immediately after an activation occurs. */
export class QuietActivatedEvent extends Event {
  constructor() {
    super('quiet-activated', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when a deactivation occurs. Canceling the event will prevent deactivation. */
export class QuietDeactivateEvent extends Event {
  constructor() {
    super('quiet-deactivate', { bubbles: false, cancelable: true, composed: true });
  }
}

/** Emitted immediately after an activation occurs. */
export class QuietDeactivatedEvent extends Event {
  constructor() {
    super('quiet-deactivated', { bubbles: false, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-activate': QuietActivateEvent;
    'quiet-activated': QuietActivatedEvent;
    'quiet-deactivate': QuietDeactivateEvent;
    'quiet-deactivated': QuietDeactivatedEvent;
  }
}
