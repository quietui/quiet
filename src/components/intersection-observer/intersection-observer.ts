import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietIntersectEvent } from '../../events/intersect.js';
import hostStyles from '../../styles/host.styles.js';
import { parseSpaceDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './intersection-observer.styles.js';

/**
 * <quiet-intersection-observer>
 *
 * @summary Intersection observers watch child elements and dispatch events when they intersect with their root element.
 * @documentation https://quietui.org/docs/components/intersection
 * @status stable
 * @since 1.0
 *
 * @slot - The elements to observe. All direct children of the host element are observed, but not nested elements.
 *
 * @event quiet-intersect - Emitted when a slotted element starts or stops intersecting. `event.detail.entry` contains
 *  the respective [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
 *  object.
 */
@customElement('quiet-intersection-observer')
export class QuietIntersectionObserver extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private hasInitialized = false;
  private intersectionObserver: IntersectionObserver | null = null;
  private observedElements = new Map<Element, boolean>();

  /** A CSS selector for the element that is used as the viewport for checking visibility of the target. */
  @property() root = '';

  /** Margin around the root. Can have values similar to the CSS margin property. */
  @property({ attribute: 'root-margin' }) rootMargin = '0px';

  /** Either a single number or space-delimited numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. */
  @property() threshold = '0';

  /** A CSS class name to apply to elements when they're intersecting. */
  @property({ attribute: 'intersection-class' }) intersectionClass = '';

  /** When true, stops observing after the first intersection. */
  @property({ type: Boolean, reflect: true }) once = false;

  /** Disables the intersection observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.startObserver();

    // Add an init flag to prevent the observers from mounting multiple times on first load
    requestAnimationFrame(() => {
      this.hasInitialized = true;
    });
  }

  /** Component lifecycle method that runs when the element disconnects from the DOM */
  disconnectedCallback() {
    this.stopObserver();
    super.disconnectedCallback();
  }

  /** Component lifecycle method that runs when properties change */
  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // Toggle the disabled state
    if (changedProperties.has('disabled') && this.hasInitialized) {
      if (this.disabled) {
        this.stopObserver();
      } else if (!this.intersectionObserver) {
        this.startObserver();
      }
    }

    // Handle observer option changes
    if (
      this.hasInitialized &&
      (changedProperties.has('root') || changedProperties.has('rootMargin') || changedProperties.has('threshold'))
    ) {
      this.startObserver();
    }
  }

  private handleSlotChange() {
    if (this.hasInitialized) {
      this.startObserver();
    }
  }

  /** Parses the threshold property into an array of numbers */
  private parseThreshold(): number[] {
    const tokens = parseSpaceDelimitedTokens(this.threshold);
    return tokens.map(token => {
      const num = parseFloat(token);
      return isNaN(num) ? 0 : Math.max(0, Math.min(1, num));
    });
  }

  /** Resolves the root element from the selector */
  private resolveRoot(): Element | null {
    if (!this.root) return null;

    try {
      const doc = this.getRootNode() as HTMLHtmlElement | ShadowRoot;
      return doc.querySelector(this.root) as Element;
    } catch (e) {
      console.warn(`Invalid selector for root: "${this.root}"`);
      return null;
    }
  }

  /** Starts or restarts the intersection observer. */
  private startObserver() {
    this.stopObserver();

    // Don't set up new observer if disabled
    if (this.disabled) return;

    // Parse threshold values
    const threshold = this.parseThreshold();

    // Resolve root element
    const rootElement = this.resolveRoot();

    // Create a single observer for all children
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const wasIntersecting = this.observedElements.get(entry.target) ?? false;
          const isIntersecting = entry.isIntersecting;

          // Update state
          this.observedElements.set(entry.target, isIntersecting);

          // Apply or remove intersecting class
          if (this.intersectionClass) {
            if (isIntersecting) {
              entry.target.classList.add(this.intersectionClass);
            } else {
              entry.target.classList.remove(this.intersectionClass);
            }
          }

          // Dispatch the `quiet-intersect` event
          const changeEvent = new QuietIntersectEvent({ entry });
          this.dispatchEvent(changeEvent);

          if (isIntersecting && !wasIntersecting) {
            // If once is true, stop observing this element
            if (this.once) {
              this.intersectionObserver?.unobserve(entry.target);
              this.observedElements.delete(entry.target);
            }
          }
        });
      },
      {
        root: rootElement,
        rootMargin: this.rootMargin,
        threshold
      }
    );

    // Observe direct children
    [...this.children].forEach(child => {
      this.intersectionObserver?.observe(child);
      // Initialize state as not intersecting
      this.observedElements.set(child, false);
    });
  }

  /** Stops the intersection observer. */
  private stopObserver() {
    // Remove intersecting class from all observed elements before stopping
    if (this.intersectionClass) {
      this.observedElements.forEach((_, element) => {
        element.classList.remove(this.intersectionClass);
      });
    }

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.observedElements.clear();
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-intersection-observer': QuietIntersectionObserver;
  }
}
