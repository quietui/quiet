/** Emitted when a task has finished running. */
export class QuietFinishedEvent extends Event {
  constructor() {
    super('quiet-finished', { bubbles: true, cancelable: false, composed: true });
  }
}

/** Emitted when a timer has updated at a specific interval */
export class QuietTickEvent extends Event {
  constructor() {
    super('quiet-tick', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-finished': QuietFinishedEvent;
    'quiet-tick': QuietTickEvent;
  }
}
