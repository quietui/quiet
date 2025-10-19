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
  attached?: () => void;
  /**
   * A callback to run when the burrow disconnects from the DOM. Use `this` to access the Burrow instance.
   */
  detached?: () => void;
}

const attachedBurrows = new Set<Burrow>();
const pendingUpdates = new Set<Burrow>();
const burrowsByState = new Map<object, Set<Burrow>>(); // tracks which state belongs to which burrow
const statesByBurrow = new Map<Burrow, Set<object>>(); // NEW: tracks which states belong to which burrow
let currentlyRenderingBurrow: Burrow | null = null;
let updateScheduled = false;

export class Burrow {
  connect: () => void = () => {};
  disconnect: () => void = () => {};
  host: HTMLElement | null = null;
  private template: () => TemplateResult;
  private wrapper: HTMLElement | null = null;

  constructor(template: () => TemplateResult) {
    this.template = template;
  }

  private clearStateTracking(removeFromMap: boolean = false): void {
    const usedStates = statesByBurrow.get(this);
    if (usedStates) {
      usedStates.forEach(stateObj => {
        const burrows = burrowsByState.get(stateObj);
        if (burrows) {
          burrows.delete(this);
          if (burrows.size === 0) {
            burrowsByState.delete(stateObj);
          }
        }
      });

      if (removeFromMap) {
        statesByBurrow.delete(this);
      }
    }
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

    // Add to attached burrows set
    attachedBurrows.add(this);

    this.update(); // initial render
    this.connect();
  }

  /**
   * Detaches the burrow from its host element and restores the original content.
   */
  detach(): void {
    if (!this.host || !this.wrapper) {
      return;
    }

    this.wrapper.remove();
    attachedBurrows.delete(this);
    this.clearStateTracking(true); // Clean up and remove from map
    this.disconnect();

    this.host = null;
    this.wrapper = null;
  }

  /**
   * Re-renders the template with the current state.
   */
  async update(): Promise<void> {
    if (this.wrapper) {
      this.clearStateTracking(); // Clear but keep burrow in map
      statesByBurrow.set(this, new Set()); // Fresh set for new render

      currentlyRenderingBurrow = this;
      render(this.template(), this.wrapper);
      currentlyRenderingBurrow = null;

      if (updateScheduled) {
        await new Promise<void>(queueMicrotask);
      }
    }
  }
}

/**
 * Creates a new Burrow instance with the given template and options.
 *
 * @param options - Configuration options for the burrow, a string ID, or an HTMLElement to use as the host element.
 * @param template - A function that returns a `TemplateResult`. This function is called on each update to get fresh
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
 * `, 'app');
 * ```
 */
export function burrow(template: () => TemplateResult, options: BurrowOptions | string | HTMLElement = {}): Burrow {
  const instance = new Burrow(template);

  // Normalize options
  const normalizedOptions: BurrowOptions =
    typeof options === 'string' || options instanceof HTMLElement ? { host: options } : options;

  // Set callbacks if provided
  if (normalizedOptions.attached) {
    instance.connect = normalizedOptions.attached;
  }

  if (normalizedOptions.detached) {
    instance.disconnect = normalizedOptions.detached;
  }

  // Auto-attach if host is provided
  if (normalizedOptions.host) {
    const element =
      typeof normalizedOptions.host === 'string'
        ? document.getElementById(normalizedOptions.host)
        : normalizedOptions.host;

    if (element) {
      instance.attach(element);
    } else if (typeof normalizedOptions.host === 'string') {
      console.warn(`Burrow: Element with id "${normalizedOptions.host}" not found`);
    }
  }

  return instance;
}

/**
 * Creates a reactive state object that automatically updates associated burrows when modified.
 */
export function state<T extends Record<string, any>>(defaults: T): T {
  const handler: ProxyHandler<T> = {
    get(target, prop) {
      // Track which burrow is accessing this state
      if (currentlyRenderingBurrow) {
        // Track state -> burrow
        let burrows = burrowsByState.get(target);
        if (!burrows) {
          burrows = new Set();
          burrowsByState.set(target, burrows);
        }
        burrows.add(currentlyRenderingBurrow);

        // Track burrow -> state (bidirectional)
        let states = statesByBurrow.get(currentlyRenderingBurrow);
        if (!states) {
          states = new Set();
          statesByBurrow.set(currentlyRenderingBurrow, states);
        }
        states.add(target);
      }

      return target[prop as keyof T];
    },

    set(target, prop, value) {
      // Skip if value hasn't changed
      if (target[prop as keyof T] === value) {
        return true;
      }

      target[prop as keyof T] = value;

      // Add burrows to pending updates
      const burrows = burrowsByState.get(target);
      if (burrows) {
        burrows.forEach(burrow => {
          if (attachedBurrows.has(burrow)) {
            pendingUpdates.add(burrow);
          } else {
            // Clean up references to detached burrows
            burrows.delete(burrow);
          }
        });

        // Schedule a batched update
        if (pendingUpdates.size > 0) {
          scheduleUpdates();
        }
      }

      return true;
    }
  };

  return new Proxy({ ...defaults }, handler);
}

function scheduleUpdates() {
  if (updateScheduled) return;

  updateScheduled = true;
  queueMicrotask(() => {
    const burrowsToUpdate = new Set(pendingUpdates);
    pendingUpdates.clear();
    updateScheduled = false;

    burrowsToUpdate.forEach(burrow => {
      if (attachedBurrows.has(burrow)) {
        burrow.update();
      }
    });
  });
}
