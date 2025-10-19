import { render, type TemplateResult } from 'lit-html';

export { html } from 'lit-html';
export { classMap } from 'lit/directives/class-map.js';
export { repeat } from 'lit/directives/repeat.js';
export { styleMap } from 'lit/directives/style-map.js';

export interface BurrowOptions {
  /**
   * An element that will host the burrow. Can be an ID or an element reference. When set, the burrow will be
   * automatically attached.
   */
  host?: string | HTMLElement;
  /**
   * A callback to run when the burrow connects to the DOM. Use `this` to access the Burrow instance.
   */
  connect?: () => void;
  /**
   * A callback to run when the burrow disconnects from the DOM. Use `this` to access the Burrow instance.
   */
  disconnect?: () => void;
}

// Track all attached burrows
const attachedBurrows = new Set<Burrow>();

// Track which burrow is currently rendering
let currentlyRenderingBurrow: Burrow | null = null;

// WeakMap to track which burrows a state object belongs to
const stateBurrows = new WeakMap<object, Set<Burrow>>();

export class Burrow {
  connect: () => void = () => {};
  disconnect: () => void = () => {};
  host: HTMLElement | null = null;
  private template: () => TemplateResult;
  private wrapper: HTMLElement | null = null;

  constructor(template: () => TemplateResult) {
    this.template = template;
  }

  /**
   * Attaches the burrow to a DOM element.
   */
  attach(el: string | HTMLElement): void {
    // We must detach if the burrow is already attached
    if (this.host) {
      this.detach();
    }

    const element = typeof el === 'string' ? document.getElementById(el) : el;

    if (!element) {
      if (typeof el === 'string') {
        console.warn(`Burrow: An element with id "${el}" could not be found in this document.`);
      }
      return;
    }

    this.host = element;

    // Create a wrapper element for lit-html to render into to prevent lit-html's internal state from being corrupted
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('quiet-burrow');
    this.wrapper.style.display = 'contents'; // Make the wrapper transparent in layout
    this.host.appendChild(this.wrapper);

    // Set this burrow as currently rendering before template execution
    currentlyRenderingBurrow = this;
    render(this.template(), this.wrapper);
    currentlyRenderingBurrow = null;

    // Add to attached burrows set
    attachedBurrows.add(this);

    this.connect();
  }

  /**
   * Detaches the burrow from its host element and restores the original content.
   */
  detach(): void {
    if (!this.host || !this.wrapper) {
      return;
    }

    // Remove the wrapper element cleanly
    this.wrapper.remove();

    // Remove from attached burrows set
    attachedBurrows.delete(this);

    this.disconnect();

    this.host = null;
    this.wrapper = null;
  }

  /**
   * Re-renders the template with the current state.
   */
  async update(): Promise<void> {
    if (this.wrapper) {
      // Set this burrow as currently rendering before template execution
      currentlyRenderingBurrow = this;
      render(this.template(), this.wrapper);
      currentlyRenderingBurrow = null;
    }
  }
}

/**
 * Creates a new Burrow instance with the given template and options.
 *
 * @param options - Configuration options for the burrow
 * @param template - A function that returns a TemplateResult. This function is called on each update to get fresh
 * template with current state values.
 *
 * @example
 * ```ts
 * const data = state({ count: 0 });
 *
 * // Pass template as a function so it re-evaluates on each update
 * burrow(() => html`
 *   <button @click=${() => data.count++}>
 *     Count: ${data.count}
 *   </button>
 * `, { host: 'app' });
 * ```
 */
export function burrow(template: () => TemplateResult, options: BurrowOptions = {}): Burrow {
  const instance = new Burrow(template);

  // Set callbacks if provided
  if (options.connect) {
    instance.connect = options.connect;
  }

  if (options.disconnect) {
    instance.disconnect = options.disconnect;
  }

  // Auto-attach if host is provided
  if (options.host) {
    const element = typeof options.host === 'string' ? document.getElementById(options.host) : options.host;

    if (element) {
      instance.attach(element);
    } else if (typeof options.host === 'string') {
      console.warn(`Burrow: Element with id "${options.host}" not found`);
    }
  }

  return instance;
}

/**
 * Creates a reactive state object that automatically updates associatead burrows when modified.
 */
export function state<T extends Record<string, any>>(defaults: T): T {
  const handler: ProxyHandler<T> = {
    get(target, prop) {
      // Track which burrow is accessing this state
      if (currentlyRenderingBurrow) {
        let burrows = stateBurrows.get(target);
        if (!burrows) {
          burrows = new Set();
          stateBurrows.set(target, burrows);
        }
        burrows.add(currentlyRenderingBurrow);
      }

      return target[prop as keyof T];
    },

    set(target, prop, value) {
      target[prop as keyof T] = value;

      // Update only the burrows that use this state
      const burrows = stateBurrows.get(target);
      if (burrows) {
        burrows.forEach(burrow => {
          if (attachedBurrows.has(burrow)) {
            burrow.update();
          } else {
            // Clean up references to detached burrows
            burrows.delete(burrow);
          }
        });
      }

      return true;
    }
  };

  return new Proxy({ ...defaults }, handler);
}
