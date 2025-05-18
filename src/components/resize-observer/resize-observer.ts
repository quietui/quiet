import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietResizeEvent } from '../../events/resize.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './resize-observer.styles.js';

/**
 * <quiet-resize-observer>
 *
 * @summary A container that observes child elements and emits an event when they resize.
 * @documentation https://quietui.org/docs/components/resize
 * @status stable
 * @since 1.0
 *
 * @slot - The elements to observe. All direct children of the host element are observed, but not nested elements.
 *
 * @event quiet-resize-observer - Emitted when a slotted element is resized. Like `ResizeObserver`, this event is also
 *  dispatched when each element is first observed. The event detail contains an `entry` property of type
 *  [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry).
 */
@customElement('quiet-resize-observer')
export class QuietResizeObserver extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private resizeObserver: ResizeObserver | null = null;

  /** Disables the resize observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Sets which box model the observer will observe changes to. */
  @property() box: 'content-box' | 'border-box' | 'device-pixel-content-box' = 'content-box';

  /** Component lifecycle method that runs when the element disconnects from the DOM */
  disconnectedCallback() {
    this.stopObserver();
    super.disconnectedCallback();
  }

  /** Component lifecycle method that runs when properties change */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    /* Handle disabled changes */
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.stopObserver();
      } else {
        this.startObserver();
      }
    }

    /* When the box model changes, restart observers */
    if (changedProperties.has('box')) {
      if (this.disabled) return;
      this.startObserver();
    }
  }

  /** Starts or restarts the resize observer. */
  private startObserver() {
    // Clean up existing observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Don't set up new observer if disabled
    if (this.disabled) return;

    // Create a single observer for all children
    this.resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const resizeEvent = new QuietResizeEvent({ entry });
        this.dispatchEvent(resizeEvent);
      });
    });

    // Observe all child elements
    Array.from(this.children).forEach(child => {
      this.resizeObserver?.observe(child, { box: this.box });
    });
  }

  /** Stops the resize observer. */
  private stopObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  render() {
    return html` <slot @slotchange=${this.startObserver}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-resize-observer': QuietResizeObserver;
  }
}
