/** Emitted when a mutation event occurs. */
export class QuietMutationEvent extends Event {
  readonly detail?: QuietMutationEventDetail;

  constructor(detail: QuietMutationEventDetail) {
    super('quiet-mutation', { bubbles: false, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface QuietMutationEventDetail {
  record: MutationRecord;
}

declare global {
  interface HTMLElementEventMap {
    'quiet-mutation': QuietMutationEvent;
  }
}
