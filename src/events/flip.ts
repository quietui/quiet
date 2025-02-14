/** Emitted immediately before a card is flipped. */
export class QuietBeforeFlipEvent extends Event {
  constructor() {
    super('quiet-before-flip', { bubbles: true, cancelable: true, composed: true });
  }
}

/** Emitted when one or more elements are selected. */
export class QuietFlipEvent extends Event {
  constructor() {
    super('quiet-flip', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-before-flip': QuietBeforeFlipEvent;
    'quiet-flip': QuietBeforeFlipEvent;
  }
}
