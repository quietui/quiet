import { render, type TemplateResult } from 'lit-html';

export { html } from 'lit-html';

export interface BurrowOptions {
  host?: string | HTMLElement;
  connect?: () => void;
  disconnect?: () => void;
}

export class Burrow {
  connect: () => void = () => {};
  disconnect: () => void = () => {};
  host: HTMLElement | null = null;

  private template: TemplateResult;
  private wrapper: HTMLElement | null = null;

  constructor(template: TemplateResult) {
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

    render(this.template, this.wrapper);
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
    this.disconnect();

    this.host = null;
    this.wrapper = null;
  }

  /**
   * Re-renders the template with the current state.
   */
  async update(): Promise<void> {
    if (this.wrapper) {
      render(this.template, this.wrapper);
    }
  }
}

/**
 * Creates a new Burrow instance with the given template and options.
 */
export function burrow(options: BurrowOptions = {}, template: TemplateResult): Burrow {
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
