import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './transition-group.styles.js';

/**
 * <quiet-transition-group>
 *
 * @summary Transition Groups add subtle animations to items in the group as they're added, removed, and reordered.
 * @documentation https://quietui.org/docs/components/transition-group
 * @status experimental
 * @since 1.0
 *
 * @slot - One or more elements to transition when adding, removing, and reordering the DOM.
 */
@customElement('quiet-transition-group')
export class QuietTransitionGroup extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private observer: MutationObserver;

  /** The duration to use when transitioning. */
  @property({ type: Number }) duration = 250;

  /** The easing to use when transitioning. */
  @property() easing = 'ease-in-out';

  /**
   * By default, no transition will occur when the user indicates a preference for reduced motion. Use this attribute
   * to override this behavior when necessary. */
  @property({ attribute: 'ignore-reduced-motion', type: Boolean }) ignoreReducedMotion = false;

  connectedCallback() {
    super.connectedCallback();

    if (!this.observer) {
      this.observer = new MutationObserver(this.handleMutations);
    }

    this.observer.observe(this, {
      childList: true,
      characterData: false
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  private handleMutations = (mutations: MutationRecord[]) => {
    const added: Map<Element, Element> = new Map();
    const removed: Map<Element, Element> = new Map();
    const moved: Set<Element> = new Set();

    mutations.forEach(mutation => {
      // Identify added elements
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          added.set(node as Element, mutation.target as Element);
        }
      });

      // Identify removed elements
      mutation.removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          removed.set(node as Element, mutation.target as Element);
        }
      });
    });

    // Identify elements that moved by comparing add/remove parents
    added.forEach((addedParent, element) => {
      const removedParent = removed.get(element);
      if (removedParent && addedParent === removedParent) {
        moved.add(element);
        added.delete(element);
        removed.delete(element);
      }
    });

    // TODO - Undo each add, remove, and move by removing, adding, or moving the element respectively

    this.runViewTransition(() => {
      // TODO - replay each action here to restore the items except with view transition animations
    });

    console.log('Added:', Array.from(added.keys()));
    console.log('Removed:', Array.from(removed.keys()));
    console.log('Moved:', Array.from(moved));
  };

  private runViewTransition(callback: () => void) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        requestAnimationFrame(() => callback());
      });
    } else {
      callback();
    }
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
