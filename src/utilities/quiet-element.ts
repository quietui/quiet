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
        this.internals.states.add(customState);
      } else {
        this.internals.states.delete(customState);
      }
    },

    /** Determines whether or not the element currently has the specified state. */
    has: (customState: string) => {
      return this.internals.states.has(customState);
    }
  };
}

// Until TypeScript supports it - https://github.com/microsoft/TypeScript/issues/33218
declare global {
  interface ElementInternals {
    states: Pick<Set<string>, 'add' | 'clear' | 'delete' | 'entries' | 'forEach' | 'has' | 'keys' | 'size' | 'values'>;
  }
}
