import type { AnimationController } from '@formkit/auto-animate';
import autoAnimate from '@formkit/auto-animate';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './transition-group.styles.js';

//
//
// TODO - Explore View Transitions as an alternative
// TODO - remove pause when container doesn't change width/height
// TODO - shuffle() method
// TODO - reverse() method
// TODO - insert(el, 4) method to insert at a specific position (appends if omitted)
// TODO - remove(el)
// TODO - replace(oldEl, newEl)
// TODO - swap(el1, el2)
//
//

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

  private animation: AnimationController;

  /** The duration to use when transitioning. */
  @property({ type: Number }) duration = 250;

  /** The easing to use when transitioning. */
  @property() easing = 'ease-in-out';

  /**
   * By default, no transition will occur when the user indicates a preference for reduced motion. Use this attribute
   * to override this behavior when necessary. */
  @property({ attribute: 'ignore-reduced-motion', type: Boolean }) ignoreReducedMotion = false;

  updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('duration') ||
      changedProperties.has('easing') ||
      changedProperties.has('ignoreReducedMotion')
    ) {
      if (this.animation) {
        this.animation.disable();
      }

      this.animation = autoAnimate(this, {
        duration: this.duration,
        easing: this.easing,
        disrespectUserMotionPreference: this.ignoreReducedMotion
      });
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
