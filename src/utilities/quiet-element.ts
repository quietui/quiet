import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/** The base class for all Quiet components */
export class QuietElement extends LitElement {
  protected internals: ElementInternals;
  public shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  /**
   * Browser support for `ElementInternals.states` isn't great at the time of this writing. By using these utilities,
   * we can safely support the new API as it becomes available while also supporting the `[data--state]` alternative
   * that users can target in their CSS until `:--state` or `:state(state)` becomes available.
   *
   * Safari 17.4 has added support. Firefox is currently behind a flag.
   */
  protected customStates = {
    /** Adds or removes the specified custom state. */
    set: (customState: string, active: boolean) => {
      if (active) {
        try {
          // @ts-expect-error - ssh
          // eslint-disable-next-line
          this.internals.states?.add(customState);
        } catch {
          // NOTE - remove when Chrome stops throwing an error for states without -- prefixes
        }
        this.setAttribute(`data-state-${customState}`, '');
      } else {
        // @ts-expect-error - ssh
        // eslint-disable-next-line
        this.internals.states?.delete(customState);
        this.removeAttribute(`data-state-${customState}`);
      }
    },

    /** Determines whether or not the element currently has the specified state. */
    has: (customState: string) => {
      // @ts-expect-error - ssh
      if (this.internals.states) {
        // @ts-expect-error - ssh
        // eslint-disable-next-line
        return this.internals.states.has(customState);
      }

      return this.hasAttribute(`data-state-${customState}`);
    }
  };
}
