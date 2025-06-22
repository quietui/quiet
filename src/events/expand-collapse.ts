interface QuietExpandCollapseEventDetails {
  /** The accordion item element being expanded or collapsed. */
  item: HTMLElement;
}

/** Emitted when an accordion item is about to expand. Calling `event.preventDefault` will prevent expansion. */
export class QuietBeforeExpandEvent extends Event {
  readonly detail: QuietExpandCollapseEventDetails;

  constructor(item: HTMLElement, options = { cancelable: true }) {
    super('quiet-before-expand', { bubbles: true, cancelable: options.cancelable, composed: true });
    this.detail = { item };
  }
}

/** Emitted after an accordion item has expanded and applicable animations have completed. */
export class QuietExpandEvent extends Event {
  readonly detail: QuietExpandCollapseEventDetails;

  constructor(item: HTMLElement) {
    super('quiet-expand', { bubbles: true, composed: true });
    this.detail = { item };
  }
}

/** Emitted when an accordion item is about to collapse. Calling `event.preventDefault` will prevent collapse. */
export class QuietBeforeCollapseEvent extends Event {
  readonly detail: QuietExpandCollapseEventDetails;

  constructor(item: HTMLElement, options = { cancelable: true }) {
    super('quiet-before-collapse', { bubbles: true, cancelable: options.cancelable, composed: true });
    this.detail = { item };
  }
}

/** Emitted after an accordion item has collapsed and applicable animations have completed. */
export class QuietCollapseEvent extends Event {
  readonly detail: QuietExpandCollapseEventDetails;

  constructor(item: HTMLElement) {
    super('quiet-collapse', { bubbles: true, composed: true });
    this.detail = { item };
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-before-expand': QuietBeforeExpandEvent;
    'quiet-expand': QuietExpandEvent;
    'quiet-before-collapse': QuietBeforeCollapseEvent;
    'quiet-collapse': QuietCollapseEvent;
  }
}
