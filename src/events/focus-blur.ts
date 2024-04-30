/** Emitted when the element receives focus. */
export class QuietFocusEvent extends Event {
  constructor() {
    super('quiet-focus', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when the element loses focus. */
export class QuietBlurEvent extends Event {
  constructor() {
    super('quiet-blur', { bubbles: false, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-focus': QuietFocusEvent;
    'quiet-blur': QuietBlurEvent;
  }
}
