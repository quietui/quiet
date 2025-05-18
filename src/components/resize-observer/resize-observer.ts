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
 *  dispatched when each element is first observed. The `event.detail.entry` property contains a
 *  [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) with information about
 *  the element's dimensions.
 */
@customElement('quiet-resize-observer')
export class QuietResizeObserver extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private hasInitialized = false;
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

  firstUpdated() {
    // Wait for the component to render the first time, then start the observers. This prevents the observer from being
    // set and unset multiple times due to slot changes and initial property assignments.
    requestAnimationFrame(() => {
      this.startObserver();
      this.hasInitialized = true;
    });
  }

  /** Component lifecycle method that runs when properties change */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // Toggle the disabled state
    if (changedProperties.has('disabled') && this.hasInitialized) {
      if (this.disabled) {
        this.stopObserver();
      } else if (!this.resizeObserver) {
        this.startObserver();
      }
    }

    // Handle box changes
    if (changedProperties.has('box') && this.hasInitialized) {
      this.startObserver();
    }
  }

  private handleSlotChange() {
    if (this.hasInitialized) {
      this.startObserver();
    }
  }

  /** Starts or restarts the resize observer. */
  private startObserver() {
    this.stopObserver();

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
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-resize-observer': QuietResizeObserver;
  }
}
