import { LitElement } from 'lit';

export class QuietElement extends LitElement {
  shadowRoot: ShadowRoot;

  /**
   * Emits a custom event from the host element.
   */
  emit(eventName: string, eventOptions?: CustomEventInit) {
    const customEvent = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      cancelable: false,
      ...eventOptions
    });

    this.dispatchEvent(customEvent);

    return customEvent;
  }
}
