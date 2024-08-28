/** Emitted when the element loses focus. */
export class QuietBlurEvent extends Event {
  constructor() {
    super('quiet-blur', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when the element's value changes. */
export class QuietChangeEvent extends Event {
  constructor() {
    super('quiet-change', { bubbles: true, cancelable: false, composed: true });
  }
}

/** Emitted when the element receives focus. */
export class QuietFocusEvent extends Event {
  constructor() {
    super('quiet-focus', { bubbles: false, cancelable: false, composed: true });
  }
}

/** Emitted when the element receives input. */
export class QuietInputEvent extends Event {
  constructor() {
    super('quiet-input', { bubbles: true, cancelable: false, composed: true });
  }
}

/** Emitted when a fixed-length input is completely filled out. */
export class QuietInputCompleteEvent extends Event {
  constructor() {
    super('quiet-input-complete', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-blur': QuietBlurEvent;
    'quiet-change': QuietChangeEvent;
    'quiet-focus': QuietFocusEvent;
    'quiet-input': QuietInputEvent;
  }
}
