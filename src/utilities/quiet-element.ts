import { LitElement } from 'lit';

export class QuietElement extends LitElement {
  protected internals?: ElementInternals;
  shadowRoot: ShadowRoot;

  /**
   * Browser support for `ElementInternals.states` isn't great at the time of this writing. By using these utilities,
   * we can safely support the new API as it becomes available while also supporting the `[data--state]` alternative
   * that users can target in their CSS until `:--state` or `:state(state)` becomes available.
   */
  protected states = {
    /** Adds the specified custom state to the element. */
    /* eslint-disable
      @typescript-eslint/no-unsafe-member-access,
      @typescript-eslint/no-unsafe-call,
      @typescript-eslint/no-unsafe-assignment
    */
    add: (state: string) => {
      try {
        // @ts-expect-error - ssh
        this.internals?.states?.add(state);
      } catch {
        // NOTE - remove when Chrome stops throwing an error for states without -- prefixes
      }

      this.setAttribute(`data-state-${state}`, '');
    },

    /** Removes the specified custom state from the element. */
    delete: (state: string) => {
      // @ts-expect-error - ssh
      this.internals?.states?.delete(state);
      this.removeAttribute(`data-state-${state}`);
    },

    /** Determines whether or not the element currently has the specified state. */
    has: (state: string) => {
      // @ts-expect-error - ssh
      if (this.internals?.states) {
        // @ts-expect-error - ssh
        // eslint-disable-next-line
        return this.internals.states.has(state);
      }

      return this.hasAttribute(`data-state-${state}`);
    },

    /** Toggles the specified state. */
    toggle: (state: string, force?: boolean) => {
      let willBeActive = !this.states.has(state);
      if (typeof force === 'boolean') willBeActive = force;

      if (willBeActive) {
        this.states.add(state);
      } else {
        this.states.delete(state);
      }
    }
    /* eslint-enable */
  };

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
