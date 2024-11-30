import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietContentChangedEvent } from '../../events/content.js';
import { QuietTransitionEndEvent } from '../../events/transition.js';
import hostStyles from '../../styles/host.styles.js';
import { parseCssDuration } from '../../utilities/animate.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './transition-group.styles.js';

/**
 * <quiet-transition-group>
 *
 * @summary Transition groups improve the user's experience by adding subtle animations as items are added, removed, and
 *  reordered in the group.
 * @documentation https://quietui.org/docs/components/transition-group
 * @status experimental
 * @since 1.0
 *
 * @slot - One or more elements to transition when adding, removing, and reordering the DOM.
 *
 * @event quiet-content-changed - Emitted when content changes and before the transition animation begins.
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

  /** The effect to use when items are added and removed. */
  @property() effect:
    | 'fade'
    | 'scale'
    | 'flip-x'
    | 'flip-y'
    | 'slide-in-left'
    | 'slide-in-right'
    | 'slide-in-top'
    | 'slide-in-bottom'
    | 'rotate-in-left'
    | 'rotate-in-right'
    | 'rotate-in-top'
    | 'rotate-in-bottom' = 'fade';

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

  private getAddKeyframes() {
    switch (this.effect) {
      //
      // TODO - slide in left/right + up/down
      //
      case 'slide-in-left':
        return [
          { opacity: 0, translate: '-25% 0' },
          { opacity: 1, translate: '0 0' }
        ];
      case 'slide-in-right':
        return [
          { opacity: 0, translate: '25% 0' },
          { opacity: 1, translate: '0 0' }
        ];
      case 'slide-in-top':
        return [
          { opacity: 0, translate: '0 -25%' },
          { opacity: 1, translate: '0 0' }
        ];
      case 'slide-in-bottom':
        return [
          { opacity: 0, translate: '0 25%' },
          { opacity: 1, translate: '0 0' }
        ];
      case 'flip-x':
        return [
          { opacity: 1, transform: 'perspective(500px) rotateY(-90deg)' },
          { opacity: 1, transform: 'perspective(500px) rotateY(0deg)' }
        ];
      case 'flip-y':
        return [
          { opacity: 1, transform: 'perspective(500px) rotateX(90deg)' },
          { opacity: 1, transform: 'perspective(500px) rotateX(0deg)' }
        ];
      case 'rotate-in-left':
        return [
          { opacity: 0, rotate: '-22.5deg', translate: '-25% 0' },
          { opacity: 1, rotate: '0', translate: '0 0' }
        ];
      case 'rotate-in-right':
        return [
          { opacity: 0, rotate: '22.5deg', translate: '25% 0' },
          { opacity: 1, rotate: '0', translate: '0 0' }
        ];
      case 'rotate-in-top':
        return [
          { opacity: 0, rotate: '-22.5deg', translate: '0 -25%' },
          { opacity: 1, rotate: '0', translate: '0 0' }
        ];
      case 'rotate-in-bottom':
        return [
          { opacity: 0, rotate: '22.5deg', translate: '0 25%' },
          { opacity: 1, rotate: '0', translate: '0 0' }
        ];
      case 'scale':
        return [
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1 }
        ];
      default: // 'fade'
        return [
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1 }
        ];
    }
  }

  private getRemoveKeyframes() {
    return this.getAddKeyframes().reverse();
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
    const duration = parseCssDuration(computedStyle.getPropertyValue('--duration'));
    const easing = computedStyle.getPropertyValue('--easing');

    // Dispatch the quiet-content-changed event
    this.dispatchEvent(new QuietContentChangedEvent({ mutations }));

    // Stop here if transitions are disabled
    if (prefersReducedMotion || this.disableTransitions) {
      this.isTransitioning = false;
      this.updateElementPositions();
      return;
    }

    // Turn off the mutation observer while we work with the DOM
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.customStates.set('transitioning', true);
    this.mutationObserver.disconnect();

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
      }
    });

    // Wait for the paint to dry, then determine the container's new size
    await new Promise(requestAnimationFrame);
    const newContainerPosition = this.getBoundingClientRect();

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
          const promise = await el.animate(this.getRemoveKeyframes(), { duration: duration, easing }).finished;
          el.remove();
          resolve(promise);
        })
      );
    });

    await Promise.allSettled(removeAnimations);

    // Resize the container
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
          { duration, easing }
        ).finished
      );
    }

    // Add back added elements but keep them invisible for now
    addedElements.forEach((_opts, el) => {
      el.hidden = false;
      el.style.opacity = '0';
    });

    // Animate moved elements
    [...this.children].forEach((el: HTMLElement) => {
      const oldPosition = this.cachedElementPositions.get(el);
      const newPosition = el.getBoundingClientRect();
      if (addedElements.has(el)) return;
      if (removedElements.has(el)) return;
      if (!oldPosition) return;
      const translateX = oldPosition.left - newPosition.left - (window.scrollX - this.cachedScrollPosition.x);
      const translateY = oldPosition.top - newPosition.top - (window.scrollY - this.cachedScrollPosition.y);

      moveAnimations.push(
        el.animate([{ translate: `${translateX}px ${translateY}px` }, { translate: `0 0` }], { duration, easing })
          .finished
      );
    });

    await Promise.allSettled(moveAnimations);

    // Animate added elements
    addedElements.forEach((_opts, el) => {
      el.style.removeProperty('opacity');
      addAnimations.push(
        el.animate(this.getAddKeyframes(), {
          easing,
          duration
        }).finished
      );
    });

    await Promise.allSettled([...addAnimations, ...containerAnimations]);

    // Cache new positions
    this.updateElementPositions();
    this.isTransitioning = false;
    this.customStates.set('transitioning', false);

    // Restart the mutation observer now that we're done
    this.mutationObserver.observe(this, {
      childList: true,
      characterData: false
    });

    // Dispatch the quiet-transition-end event unless disabled
    this.dispatchEvent(new QuietTransitionEndEvent());
  };

  private handleResizes = () => {
    this.updateElementPositions();
  };

  private handleVisibilityChange = () => {
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

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private stopObservers() {
    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
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
