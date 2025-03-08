/** Emitted when an animation such as typing or ticking completes. */
export class QuietAnimationComplete extends Event {
  constructor() {
    super('quiet-animation-complete', { bubbles: true, cancelable: false, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-animation-complete': QuietAnimationComplete;
  }
}
