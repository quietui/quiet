import type { QuietTransitionAnimation } from '@quietui/scurry';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietContentChangedEvent } from '../../events/content.js';
import { QuietTransitionEndEvent } from '../../events/transition.js';
import hostStyles from '../../styles/host.styles.js';
import { hasDomRectMoved, parseCssDuration } from '../../utilities/animate.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './transition-group.styles.js';

/**
 * <quiet-transition-group>
 *
 * @summary Transition groups improve the user's experience by adding subtle animations as items are added, removed, and
 *  reordered in the group.
 * @documentation https://quietui.org/docs/components/transition-group
 * @status stable
 * @since 1.0
 *
 * @slot - One or more elements to transition when adding, removing, and reordering the DOM.
 *
 * @event quiet-content-changed - Emitted when content changes and before the transition animation begins.
 * @event quiet-transition-end - Emitted when transition animations end.
 *
 * @cssstate transitioning - Applied when a transition is active.
 *
 * @cssproperty [--duration=0.25s] - The duration of each individual step (not the total transition time).
 */
@customElement('quiet-transition-group')
export class QuietTransitionGroup extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private cachedContainerPosition: DOMRect;
  private cachedElementPositions = new WeakMap<HTMLElement, DOMRect>();
  private cachedScrollPosition: { x: number; y: number } = { x: window.scrollX, y: window.scrollY };
  private currentTransition = Promise.resolve();
  private isObserving = false;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;

  /** Determines if the transition group is currently animating. (Property only) */
  public isTransitioning = false;

  /**
   * A custom animation to use for enter/exit transitions,  Works well with animations from `@quietui/scurry`.
   * (Property only)
   */
  public transitionAnimation?: QuietTransitionAnimation;

  /**
   * Disables transition animations. However, the `quiet-content-changed` and `quiet-transition-end` events will still
   * be dispatched.
   */
  @property({ attribute: 'disable-transitions', type: Boolean, reflect: true }) disableTransitions = false;

  /**
   * By default, no animation will occur when the user indicates a preference for reduced motion. Use this attribute to
   * override this behavior when necessary.
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

  /**
   * Gets a custom animation based on the users preference. If a custom animation isn't found, the default is returned.
   */
  private getAnimation(): QuietTransitionAnimation {
    // Return a custom animation
    if (this.transitionAnimation) {
      return this.transitionAnimation;
    }

    // Return the default fade animation
    return {
      enter: {
        keyframes: [
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1 }
        ],
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)'
      },
      exit: {
        keyframes: [
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.98 }
        ],
        easing: 'cubic-bezier(0.6, 0, 0.735, 0)'
      }
    };
  }

  private handleMutations = async (mutations: MutationRecord[]) => {
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches && !this.ignoreReducedMotion;
    const addedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const removedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const movedElements: Map<HTMLElement, { parent: HTMLElement; nextSibling: HTMLElement | null }> = new Map();
    const containerAnimations: Promise<Animation>[] = [];
    const addAnimations: Promise<Animation>[] = [];
    const removeAnimations: Promise<Animation>[] = [];
    const moveAnimations: Promise<Animation>[] = [];
    const computedStyle = getComputedStyle(this);
    const { enter, exit } = this.getAnimation();
    const duration = parseCssDuration(computedStyle.getPropertyValue('--duration')) || '0.25s';

    // If we're already transitioning, skip this one
    if (this.isTransitioning) {
      return;
    }

    // Turn off the observers while we work with the DOM
    this.stopObservers();

    // Dispatch the quiet-content-changed event
    this.dispatchEvent(new QuietContentChangedEvent({ mutations }));

    // Stop here if transitions are disabled
    if (prefersReducedMotion || this.disableTransitions) {
      this.isTransitioning = false;
      this.customStates.set('transitioning', false);
      this.updateElementPositions();
      this.startObservers();
      return;
    }

    this.isTransitioning = true;
    this.customStates.set('transitioning', true);

    // Start a new promise so we can resolve it when the transition ends
    this.currentTransition = new Promise<void>(async resolveTransition => {
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

      // Determine which elements were moved
      addedElements.forEach((info, el) => {
        const removedElementInfo = removedElements.get(el);
        if (removedElementInfo && info.parent === removedElementInfo.parent) {
          movedElements.set(el, info);
          addedElements.delete(el);
          removedElements.delete(el);
        }
      });

      // Hide added elements while we remove
      addedElements.forEach((_opts, el) => (el.hidden = true));

      // Animate removed elements
      removedElements.forEach((opts, el) => {
        if (opts.nextSibling) {
          opts.nextSibling.before(el);
        } else {
          this.append(el);
        }

        removeAnimations.push(
          new Promise(async resolve => {
            const promise = await el.animate(exit.keyframes, { duration: duration, easing: exit.easing }).finished;
            el.remove();
            resolve(promise);
          })
        );
      });

      // Run remove animations
      await Promise.allSettled(removeAnimations);

      // Add back added elements but keep them invisible for now
      addedElements.forEach((_opts, el) => {
        el.hidden = false;
        el.style.opacity = '0';
      });

      // Resize the container
      const newContainerPosition = this.getBoundingClientRect();
      if (
        newContainerPosition.width !== this.cachedContainerPosition.width ||
        newContainerPosition.height !== this.cachedContainerPosition.height
      ) {
        containerAnimations.push(
          this.animate(
            [
              { width: `${this.cachedContainerPosition.width}px`, height: `${this.cachedContainerPosition.height}px` },
              { width: `${newContainerPosition.width}px`, height: `${newContainerPosition.height}px` }
            ],
            { duration, easing: 'ease' }
          ).finished
        );
      }

      // Animate moved elements
      [...this.children].forEach((el: HTMLElement) => {
        const oldPosition = this.cachedElementPositions.get(el);
        const newPosition = el.getBoundingClientRect();

        // Don't animate elements that haven't moved or were just now added/removed
        if (
          !oldPosition ||
          !hasDomRectMoved(oldPosition, newPosition) ||
          addedElements.has(el) ||
          removedElements.has(el)
        ) {
          return;
        }

        const translateX = oldPosition.left - newPosition.left - (window.scrollX - this.cachedScrollPosition.x);
        const translateY = oldPosition.top - newPosition.top - (window.scrollY - this.cachedScrollPosition.y);

        moveAnimations.push(
          el.animate([{ translate: `${translateX}px ${translateY}px` }, { translate: `0 0` }], {
            duration,
            easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
          }).finished
        );
      });

      // Run move animations
      await Promise.allSettled(moveAnimations);

      // Animate added elements
      addedElements.forEach((_opts, el) => {
        el.style.removeProperty('opacity');
        addAnimations.push(el.animate(enter.keyframes, { easing: enter.easing, duration }).finished);
      });

      // Run add and container animations concurrently
      await Promise.allSettled([...addAnimations, ...containerAnimations]);

      // Cache new positions
      this.updateElementPositions();
      this.isTransitioning = false;
      this.customStates.set('transitioning', false);

      // Restart the mutation observer now that we're done
      this.startObservers();

      // Dispatch the quiet-transition-end event
      this.dispatchEvent(new QuietTransitionEndEvent());

      // Resolve the promise
      resolveTransition();
    });
  };

  private handleResizes = () => {
    this.updateElementPositions();
  };

  private handleVisibilityChange = () => {
    this.updateElementPositions();
  };

  private startObservers() {
    if (this.isObserving) return;
    this.isObserving = true;

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

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private stopObservers() {
    this.isObserving = false;
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Returns a promise that resolves when the current transition ends. If no transition is running, it resolves
   * immediately  This is a great way to ensure transitions have stopped before doing something else, such as adding or
   * removing new elements to the transition group.
   */
  public async transitionComplete() {
    // Wait a cycle to make sure we don't have mutations since the mutation observer callback is async. If an animation
    // has starts, a new promise will be set in `this.currentTransition`. Otherwise, we can return the old resolved one.
    await new Promise(requestAnimationFrame);

    // Wait for the current transition to finish
    await this.currentTransition;
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
