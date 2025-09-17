import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietIntersectEvent } from '../../events/intersect.js';
import hostStyles from '../../styles/host.styles.js';
import { clamp } from '../../utilities/math.js';
import { parseDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './intersection-observer.styles.js';

/**
 * <quiet-intersection-observer>
 *
 * @summary Watches child elements and dispatches events when they intersect with their root element.
 * @documentation https://quietui.org/docs/components/intersection
 * @status stable
 * @since 1.0
 *
 * @slot - The elements to observe. Only direct children of the host element are observed.
 *
 * @event quiet-intersect - Emitted when an observed element starts or stops intersecting. `event.detail.entry` contains
 *  the respective [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
 *  object.
 */
@customElement('quiet-intersection-observer')
export class QuietIntersectionObserver extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private hasInitialized = false;
  private intersectionObserver: IntersectionObserver | null = null;
  private observedElements = new Map<Element, boolean>();

  /** The ID of the element to use as as the bounding box of the viewport for the observed targets. */
  @property() root: string | null = null;

  /** Margin around the root. Can have values similar to the CSS margin property. */
  @property({ attribute: 'root-margin' }) rootMargin = '0px';

  /** Either a single number or space-delimited numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. */
  @property() threshold = '0';

  /**
   * A CSS class name to apply to elements while they're intersecting. The class will be removed when the element is no
   * longer in the viewport. This allows you to apply styles to elements as they enter and exit the viewport using pure
   * CSS.
   */
  @property({ attribute: 'intersect-class' }) intersectClass = '';

  /** When true, stops observing after the first intersection. */
  @property({ type: Boolean, reflect: true }) once = false;

  /** Disables the intersection observer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.startObserver();

    // Add an init flag to prevent the observers from mounting multiple times on first load
    requestAnimationFrame(() => (this.hasInitialized = true));
  }

  disconnectedCallback() {
    this.stopObserver();
    super.disconnectedCallback();
  }

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

  /** Parses the threshold property into an array of numbers. */
  private parseThreshold(): number[] {
    const tokens = parseDelimitedTokens(this.threshold);
    return tokens.map(token => {
      const num = parseFloat(token);
      return isNaN(num) ? 0 : clamp(num, 0, 1);
    });
  }

  /** Resolves the root element from the provided ID. */
  private resolveRoot(): Element | null {
    if (!this.root) return null;

    try {
      const doc = this.getRootNode() as Document | ShadowRoot;
      const target = doc.getElementById(this.root);

      if (!target) {
        console.warn(
          `An intersection observer was assigned to an element with an ID of "${this.root}" but the element could not be found.`,
          this
        );
      }

      return target;
    } catch {
      console.warn(`Invalid selector for root: "${this.root}"`, this);
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
          if (this.intersectClass) {
            if (isIntersecting) {
              entry.target.classList.add(this.intersectClass);
            } else {
              entry.target.classList.remove(this.intersectClass);
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

    // Observe all direct children
    [...this.children].forEach(child => {
      this.intersectionObserver?.observe(child);
      // Initialize state as not intersecting
      this.observedElements.set(child, false);
    });
  }

  /** Stops the intersection observer. */
  private stopObserver() {
    // Remove intersecting class from all observed elements before stopping
    if (this.intersectClass) {
      this.observedElements.forEach((_, element) => {
        element.classList.remove(this.intersectClass);
      });
    }

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.observedElements.clear();
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-intersection-observer': QuietIntersectionObserver;
  }
}
