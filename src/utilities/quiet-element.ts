import type { TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { hasValidationBug } from './webkit.js';

let hasWarnedAboutValidationBug = false;

/** The base class for all Quiet components */
export class QuietElement extends LitElement {
  static formAssociated = false;
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
   * @internal A Set containing all named slots that are currently populated with content. For performance reasons, this
   * will only be set when the static `observeSlots` property is enabled on the component.
   */
  @state() slotsWithContent: Set<string> = new Set();

  // Make localization attributes reactive
  @property() dir: string;
  @property() lang: string;

  constructor() {
    super();
    this.internals = this.attachInternals();

    //
    // Browsers affected by this bug will not allow custom element's that use constraint validation to submit the form:
    //
    // https://bugs.webkit.org/show_bug.cgi?id=261432
    //
    // To work around this, we detect affected browsers and disable calls to `internals.setValidity()` in them. This
    // allows the form to submit at the expense of bypassing constraint validation. A bug fix landed in Safari TP and
    // was confirmed resolved in September 2025, but it may exist in other WebKit browsers as well.
    //
    const constructor = this.constructor as typeof QuietElement;
    if (constructor.formAssociated && hasValidationBug()) {
      this.internals.setValidity = () => {};
      if (!hasWarnedAboutValidationBug) {
        hasWarnedAboutValidationBug = true;
        console.warn(
          `This browser is affected by the following WebKit bug, so constraint validation is disabled for Quiet UI elements: ` +
            `https://bugs.webkit.org/show_bug.cgi?id=261432\n` +
            `Please upgrade your browser for a better form experience and to prevent this warning.`
        );
      }
    }
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

  /** @internal */
  public customStates = {
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

/** The base class for all Quiet form controls. */
export abstract class QuietFormControlElement extends QuietElement {
  static formAssociated = true;

  /**
   * For form controls, components must implement this and set it to the element that should receive focus when
   * reporting validation errors.
   */
  protected abstract get focusableAnchor(): HTMLElement;

  /** For form-associated elements, this returns the current validity state of the control. */
  public get validity() {
    const constructor = this.constructor as typeof QuietElement;
    return constructor.formAssociated ? this.internals.validity : undefined;
  }

  /** Gets the form control's current validation message or an empty string when the form control is valid. */
  public get validationMessage() {
    return this.internals.validationMessage;
  }

  /**
   * Checks if the form control has any restraints and whether it satisfies them. If invalid, `false` will be returned
   * and the `invalid` event will be dispatched. If valid, `true` will be returned.
   */
  public checkValidity() {
    return this.internals.checkValidity();
  }

  /**
   * Sets a custom validation message for the form control. If this message is not an empty string, then the form
   * control is considered invalid and the specified message will be displayed to the user when reporting validity.
   * Setting an empty string clears the custom validity state.
   */
  public setCustomValidity(message: string) {
    // If the user calls this immediately after `customElements.whenDefined()`, the template won't have rendered. In
    // that case, we'll set it as soon as the first update completes.
    if (!this.hasUpdated) {
      this.updateComplete.then(() => this.setCustomValidity(message));
      return;
    }

    if (this.focusableAnchor) {
      this.internals.setValidity({ customError: message !== '' }, message, this.focusableAnchor);
    } else {
      console.error(
        `No "focusableAnchor" getter is set on ${this.tagName}. This will prevent validation from working properly.`,
        this
      );
    }

    this.requestUpdate();
  }

  /** Returns the current custom validation message or an empty string if no custom error is set. */
  protected getCustomValidity(): string {
    return this.internals.validity.customError ? this.internals.validationMessage : '';
  }

  /**
   * Checks if the form control has any restraints and whether it satisfies them. If invalid, `false` will be returned
   * and the `invalid` event will be dispatched. In addition, the problem will be reported to the user. If valid, `true`
   * will be returned.
   */
  public reportValidity() {
    return this.internals.reportValidity();
  }
}
