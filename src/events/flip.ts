/** Emitted immediately before a card is flipped. */
export class QuietFlipEvent extends Event {
  constructor() {
    super('quiet-flip', { bubbles: true, cancelable: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-flip': QuietFlipEvent;
  }
}

/** Emitted when one or more elements are selected. */
export class QuietFlippedEvent extends Event {
  constructor() {
    super('quiet-flipped', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-flipped': QuietFlipEvent;
  }
}
