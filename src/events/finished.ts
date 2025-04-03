/** Emitted when a task has finished running. */
export class QuietFinishedEvent extends Event {
  constructor() {
    super('quiet-finished', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-finished': QuietFinishedEvent;
  }
}
