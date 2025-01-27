import type { TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

/** The base class for all Quiet components */
export class QuietElement extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    serializable: true
  };

  /**
   * Enables slot detection for a component. When enabled, named slots that have content will be automatically detected
   * and their names will be added to a Set in the reactive `this.slots` property.
   */
  static observeSlots = false;

  protected internals: ElementInternals;
  public shadowRoot: ShadowRoot;

  /**
   * A Set containing all named slots that are currently populated with content. For performance reasons, this will only
   * be set when the static `observeSlots` property is enabled on the component.
   */
  @state() protected slotsWithContent: Set<string> = new Set();

  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    const constructor = this.constructor as typeof QuietElement;

    // If enabled, observe slots up front to prevent extra renders
    if (constructor.observeSlots) {
      this.updateSlotsWithContent();

      // Observe slot changes
      this.shadowRoot.addEventListener('slotchange', () => {
        this.updateSlotsWithContent();
      });
    }

    // Represent with a link to the docs for curious devs
    this.shadowRoot.prepend(
      document.createComment(` Quiet UI · https://quietui.org/docs/components/${this.localName.replace('quiet-', '')} `)
    );
  }

  /** For form-associated elements, this returns the current validity state of the control. */
  public get validity() {
    const constructor = this.constructor as typeof HTMLElement & { formAssociated?: boolean };
    return constructor.formAssociated ? this.internals.validity : undefined;
  }

  /**
   * Updates the slotsWithContent Set with currently populated slots
   */
  private updateSlotsWithContent() {
    const newSlots = new Set([...this.querySelectorAll(':scope > [slot]')].map(el => el.slot));

    // Only trigger an update if the slots have actually changed
    if (JSON.stringify([...newSlots].sort()) !== JSON.stringify([...this.slotsWithContent].sort())) {
      this.slotsWithContent = newSlots;
    }
  }

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
   * Used in templates to conditionally render a slot when it has content. When it doesn't have content, a hidden slot
   * of the same name is rendered instead to ensure the `slotchange` event continues to fire.
   */
  protected whenSlotted(name: string, content: TemplateResult, options?: Partial<WhenSlottedOptions>) {
    const opts: WhenSlottedOptions = {
      force: false,
      ...options
    };

    return this.slotsWithContent.has(name) || opts.force ? content : html`<slot name="${name}" hidden></slot>`;
  }
}

interface WhenSlottedOptions {
  /**
   * When true, the slot will be rendered even if nothing is slotted in. Useful for showing the slot when, for example,
   * nothing is slotted in but a corresponding value is provided through a property.
   */
  force: boolean;
}
