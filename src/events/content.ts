/** Emitted when the content of the target node has mutated. */
export class QuietContentChangedEvent extends Event {
  readonly detail: QuietContentChangedEventDetail;

  constructor(detail: QuietContentChangedEventDetail) {
    super('quiet-content-changed', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietContentChangedEventDetail {
  mutations: MutationRecord[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-content-changed': QuietContentChangedEvent;
  }
}
