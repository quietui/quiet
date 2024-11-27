import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietTransitionEndEvent, QuietTransitionStartEvent } from '../../events/transition.js';
import hostStyles from '../../styles/host.styles.js';
import { parseCssDuration } from '../../utilities/animate.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './transition-group.styles.js';

//
// TODO - make duration/easing customizable for add/remove/move animations?
// TODO - use --custom properties for duration/easing?
// TODO - test with CSS grid to make sure it doesn't blow up
// TODO - add example with lists (e.g. role="list" with role="listitem" elements)
// TODO - more examples
//

/**
 * <quiet-transition-group>
 *
 * @summary Transition groups improve the user experience by adding subtle animations to items in the group as they're
 *  added, removed, and reordered from the DOM.
 * @documentation https://quietui.org/docs/components/transition-group
 * @status experimental
 * @since 1.0
 *
 * @slot - One or more elements to transition when adding, removing, and reordering the DOM.
 *
 * @event quiet-transition-start - Emitted when transition animations begin.
 * @event quiet-transition-end - Emitted when transition animations end.
 *
 * @cssstate transitioning - Applied when a transition is active.
 *
 * @cssproperty [--duration=0.25s] - The base duration of transition animations.
 * @cssproperty [--easing=cubic-bezier(0.45, 0, 0.55, 1)] - The easing to use for transition animations.
 */
@customElement('quiet-transition-group')
export class QuietTransitionGroup extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private cachedContainerPosition: DOMRect;
  private cachedElementPositions = new WeakMap<HTMLElement, DOMRect>();
  private cachedScrollPosition: { x: number; y: number } = { x: window.scrollX, y: window.scrollY };
  private isTransitioning = false;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;

  /** The duration to use when transitioning. */
  @property({ type: Number }) duration = 300;

  /** The easing to use when transitioning. */
  @property() easing = 'linear';

  /**
   * Disables transition animations. However, the `quiet-transition-start` and `quiet-transition-end` events will still
   * be dispatched.
   */
  @property({ attribute: 'disable-transitions', type: Boolean, reflect: true }) disableTransitions = false;

  /**
   * By default, no transition will occur when the user indicates a preference for reduced motion. Use this attribute
   * to override this behavior when necessary.
   */
  @property({ attribute: 'ignore-reduced-motion', type: Boolean, reflect: true }) ignoreReducedMotion = false;

  connectedCallback() {
    super.connectedCallback();
    this.startObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObservers();
  }

  firstUpdated() {
    // Cache the initial coordinates
    this.updateElementPositions();
  }

  private handleMutations = async (mutations: MutationRecord[]) => {
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches && !this.ignoreReducedMotion;
    const addedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const removedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const movedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const addAnimations: Promise<Animation>[] = [];
    const removeAnimations: Promise<Animation>[] = [];
    const moveAnimations: Promise<Animation>[] = [];

    const computedStyle = getComputedStyle(this);
    const duration = parseCssDuration(computedStyle.getPropertyValue('--duration'));
    const easing = computedStyle.getPropertyValue('--easing');

    // Turn off the mutation observer while we work with the DOM
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.customStates.set('transitioning', true);
    this.mutationObserver.disconnect();

    // Dispatch the quiet-transition-start event
    this.dispatchEvent(new QuietTransitionStartEvent());

    // Find elements that were added and removed in this mutation
    mutations.forEach(mutation => {
      // Added
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addedElements.set(node as HTMLElement, {
            parent: mutation.target as HTMLElement,
            nextSibling: mutation.nextSibling as HTMLElement | null
          });
        }
      });

      // Removed
      mutation.removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          removedElements.set(node as HTMLElement, {
            parent: mutation.target as HTMLElement,
            nextSibling: mutation.nextSibling as HTMLElement | null
          });
        }
      });
    });

    // Determine which elements were moved within the transition group. We can tell if they were moved by comparing the
    // parent elements.Moved elements will be removed from the add/remove lists so we can animate them differently.
    addedElements.forEach((info, el) => {
      const removedElementInfo = removedElements.get(el);
      if (removedElementInfo && info.parent === removedElementInfo.parent) {
        movedElements.set(el, info);
        addedElements.delete(el);
        removedElements.delete(el);
      } else {
        // Make added elements invisible while the move animation runs
        el.dataset.originalOpacity = el.style.opacity;
        el.style.opacity = '0';
      }
    });

    // Wait for the paint to dry, then determine how to resize the container. If the width or height is shrinking, start
    // the animation now. If the width or height is expanding,
    await new Promise(requestAnimationFrame);
    const newContainerCoords = this.getBoundingClientRect();

    if (!prefersReducedMotion && !this.disableTransitions) {
      const isWidthContracting = newContainerCoords.width > this.cachedContainerPosition.width;
      const isHeightContracting = newContainerCoords.height > this.cachedContainerPosition.height;
      const isWidthExpanding = newContainerCoords.width < this.cachedContainerPosition.width;
      const isHeightExpanding = newContainerCoords.height < this.cachedContainerPosition.height;

      // If the container is getting thinner, animate it now
      if (isWidthContracting) {
        this.animate(
          [{ width: `${this.cachedContainerPosition.width}px` }, { width: `${newContainerCoords.width}px` }],
          { duration, easing }
        );
      }

      // If the container is getting shorter, animate it now
      if (isHeightContracting) {
        this.animate(
          [{ height: `${this.cachedContainerPosition.height}px` }, { height: `${newContainerCoords.height}px` }],
          { duration, easing }
        );
      }

      // Animate removed elements to make room before we handle moved elements
      removedElements.forEach((opts, el) => {
        this.insertBefore(el, opts.nextSibling);
        removeAnimations.push(
          el.animate([{ opacity: 0 }], { duration: duration / 2, easing }).finished.finally(() => el.remove())
        );
      });

      await Promise.allSettled(removeAnimations);

      // If the container is getting wider, animate it now
      if (isWidthExpanding) {
        this.animate(
          [{ width: `${this.cachedContainerPosition.width}px` }, { width: `${newContainerCoords.width}px` }],
          { duration, easing }
        );
      }

      // If the container is getting taller, animate it now
      if (isHeightExpanding) {
        this.animate(
          [{ height: `${this.cachedContainerPosition.height}px` }, { height: `${newContainerCoords.height}px` }],
          { duration, easing }
        );
      }

      if (this.cachedContainerPosition.height > newContainerCoords.height) {
        this.animate(
          [
            { width: `${this.cachedContainerPosition.width}px`, height: `${this.cachedContainerPosition.height}px` },
            {
              width: `${newContainerCoords.width}px`,
              height: `${newContainerCoords.height}px`
            }
          ],
          { duration, easing }
        );
      }

      // Animate moved elements
      for await (const el of this.children) {
        const oldCoordinates = this.cachedElementPositions.get(el as HTMLElement);
        const newCoordinates = el.getBoundingClientRect();

        if (oldCoordinates) {
          const translateX = oldCoordinates.left - newCoordinates.left - (window.scrollX - this.cachedScrollPosition.x);
          const translateY = oldCoordinates.top - newCoordinates.top - (window.scrollY - this.cachedScrollPosition.y);

          moveAnimations.push(
            el.animate(
              [
                {
                  // from
                  translate: `${translateX}px ${translateY}px`
                },
                {
                  // to
                  translate: `0 0`
                }
              ],
              { duration, easing }
            ).finished
          );
        }
      }

      await Promise.allSettled(moveAnimations);

      // Show the added elements now that there's space for them
      addedElements.forEach(async (_info, el) => {
        // Restore the original opacity, if provided
        if (el.dataset.originalOpacity) {
          el.style.opacity = el.dataset.originalOpacity;
        } else {
          el.style.removeProperty('opacity');
        }

        addAnimations.push(el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: duration / 2, easing }).finished);
      });

      await Promise.allSettled(addAnimations);
    }

    // Cache new positions
    this.updateElementPositions();
    this.isTransitioning = false;
    this.customStates.set('transitioning', false);

    // Restart the mutation observer now that we're done
    this.mutationObserver.observe(this, {
      childList: true,
      characterData: false
    });

    // Dispatch the quiet-transition-end event
    this.dispatchEvent(new QuietTransitionEndEvent());
  };

  private handleResizes = () => {
    this.updateElementPositions();
  };

  private startObservers() {
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(this.handleMutations);
    }

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResizes);
    }

    // Start observing mutations
    this.mutationObserver.observe(this, {
      childList: true,
      characterData: false
    });

    // Start observing resizes
    this.resizeObserver.observe(document.documentElement);
  }

  private stopObservers() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
  }

  /**
   * Updates the cached coordinates of all child elements in the transition group. In most cases, you shouldn't have to
   * call this method. However, if you're resizing or animating elements imperatively, you may need to call this
   * immediately before appending or removing elements to ensure a smooth transition.
   */
  public updateElementPositions() {
    this.cachedContainerPosition = this.getBoundingClientRect();
    this.cachedScrollPosition = { x: window.scrollX, y: window.scrollY };

    [...this.children].forEach((el: HTMLElement) => {
      this.cachedElementPositions.set(el, el.getBoundingClientRect());
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-transition-group': QuietTransitionGroup;
  }
}
