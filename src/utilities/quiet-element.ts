import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/** The base class for all Quiet components */
export class QuietElement extends LitElement {
  /** When set, the component will automatically assign the specified slot to the host element. */
  protected static assignSlotToHost: string;

  private hasRecordedInitialProperties = false;
  private initialReflectedProperties: Map<string, unknown> = new Map();
  protected internals: ElementInternals;
  public shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.internals = this.attachInternals();

    const constructor = this.constructor as typeof QuietElement;
    if (constructor.assignSlotToHost) {
      this.setAttribute('slot', constructor.assignSlotToHost);
    }
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

  /**
   * Prevents retargeting and relays an event emitted from within the shadow DOM to a new event emitted from the host
   * element. This can be useful for dispatching `change` and `input` events, which will allow frameworks to bind form
   * controls as if they were native ones.
   */
  protected relayNativeEvent(event: Event) {
    let newEvent: typeof event;

    event.stopImmediatePropagation();

    if (event instanceof InputEvent) {
      newEvent = new InputEvent(event.type, { ...event });
    } else if (event instanceof MouseEvent) {
      newEvent = new MouseEvent(event.type, { ...event });
    } else if (event instanceof PointerEvent) {
      newEvent = new PointerEvent(event.type, { ...event });
    } else {
      newEvent = new Event(event.type, { ...event });
    }

    this.dispatchEvent(newEvent);
  }

  /**
   * Hook into the attributeChangedCallback to enable durable attributes. This prevents DOM morphing libraries from
   * breaking reflected attributes + default values. Adapted from:
   *
   * https://www.konnorrogers.com/posts/2024/making-lit-components-morphable
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // Only run the first time attributeChangedCallback is called
    if (!this.hasRecordedInitialProperties) {
      (this.constructor as typeof LitElement).elementProperties.forEach((obj, prop: keyof typeof this & string) => {
        if (obj.reflect && this[prop] != null) {
          this.initialReflectedProperties.set(prop, this[prop]);
        }
      });

      this.hasRecordedInitialProperties = true;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /**
   * Hook into the willUpdate lifecycle method to enable durable attributes.
   *
   */
  protected willUpdate(changedProperties: Parameters<LitElement['willUpdate']>[0]): void {
    super.willUpdate(changedProperties);

    this.initialReflectedProperties.forEach((value, prop: string & keyof typeof this) => {
      // If a prop changes to `null` or `undefined`, we assume it happened because an attribute was removed
      if (changedProperties.has(prop) && (this[prop] === null || this[prop] === undefined)) {
        (this as Record<string, unknown>)[prop] = value;
      }
    });
  }
}
