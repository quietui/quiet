/**
 * Event emitted when the active carousel item changes due to user interaction
 */
export class QuietItemChangeEvent extends CustomEvent<{ index: number }> {
  constructor(index: number) {
    super('quiet-item-change', {
      bubbles: true,
      composed: true,
      detail: { index }
    });
  }
}

declare global {
  interface HTMLElementEventMap {
    'quiet-item-change': QuietItemChangeEvent;
  }
}
