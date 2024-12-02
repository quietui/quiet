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
  private transitionCompleteResolve: (() => void) | null = null;

  /** Resolves when the current or next transition ends. (Property only) */
  public transitionComplete: Promise<void> = Promise.resolve();

  /** The effect to use when items are added and removed. */
  @property() effect:
    | 'fade'
    | 'scale'
    | 'flip-x'
    | 'flip-y'
    | 'rotate-x'
    | 'rotate-y'
    | 'slide-x'
    | 'slide-y'
    | 'drift'
    | 'earthquake'
    | 'elevator'
    | 'explode'
    | 'fold'
    | 'glitch'
    | 'gravity'
    | 'kaleidoscope'
    | 'orbit'
    | 'portal'
    | 'ribbon'
    | 'rubber'
    | 'spring'
    | 'telescope'
    | 'tornado'
    | 'vortex' = 'fade';

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

  constructor() {
    super();
    this.createNewTransitionPromise();
  }

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

  /** Creates a new promise held in `this.transitionComplete` */
  private createNewTransitionPromise() {
    this.transitionComplete = new Promise(resolve => {
      this.transitionCompleteResolve = resolve;
    });
  }

  /** Resolves the promise held in `this.transitionComplete` */
  private resolveTransitionPromise() {
    if (this.transitionCompleteResolve) {
      this.transitionCompleteResolve();
      this.transitionCompleteResolve = null;
      this.createNewTransitionPromise();
    }
  }

  private getAnimation(effect: string): {
    addKeyframes: Keyframe[];
    addEasing: string;
    removeKeyframes: Keyframe[];
    removeEasing: string;
  } {
    const isRtl = this.dir === 'rtl' || document.documentElement.dir === 'rtl';

    switch (effect) {
      //
      // Simple
      //

      case 'scale':
        return {
          addKeyframes: [
            { opacity: 0, scale: 0.92, translate: '0 15px' },
            { opacity: 1, scale: 1.03, translate: '0 -2px' },
            { opacity: 1, scale: 1, translate: '0 0' }
          ],
          addEasing: 'cubic-bezier(0.33, 1.2, 0.66, 1)',
          removeKeyframes: [
            { opacity: 1, scale: 1, translate: '0 0' },
            { opacity: 0.5, scale: 0.95, translate: '0 5px' },
            { opacity: 0, scale: 0.9, translate: '0 10px' }
          ],
          removeEasing: 'cubic-bezier(0.33, 0, 0.67, 0.2)'
        };

      case 'flip-x':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'perspective(1000px) translateZ(100px) rotateY(-90deg)' },
            { opacity: 1, transform: 'perspective(1000px) translateZ(0) rotateY(0deg)' }
          ],
          addEasing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'perspective(1000px) translateZ(0) rotateY(0deg)' },
            { opacity: 0, transform: 'perspective(1000px) translateZ(100px) rotateY(90deg)' }
          ],
          removeEasing: 'cubic-bezier(0.32, 0, 0.67, 0)'
        };

      case 'flip-y':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'perspective(1000px) translateZ(100px) rotateX(90deg)' },
            { opacity: 1, transform: 'perspective(1000px) translateZ(0) rotateX(0deg)' }
          ],
          addEasing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'perspective(1000px) translateZ(0) rotateX(0deg)' },
            { opacity: 0, transform: 'perspective(1000px) translateZ(100px) rotateX(-90deg)' }
          ],
          removeEasing: 'cubic-bezier(0.32, 0, 0.67, 0)'
        };

      case 'rotate-x':
        return {
          addKeyframes: [
            { opacity: 0, rotate: '-60deg', translate: `${isRtl ? 35 : -35}% 0`, scale: 0.85 },
            { opacity: 0.5, rotate: '-20deg', translate: `${isRtl ? 15 : -15}% 0`, scale: 0.95 },
            { opacity: 1, rotate: '0', translate: '0 0', scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, rotate: '0', translate: '0 0', scale: 1 },
            { opacity: 0.5, rotate: '20deg', translate: `${isRtl ? -15 : 15}% 0`, scale: 0.95 },
            { opacity: 0, rotate: '60deg', translate: `${isRtl ? -35 : 35}% 0`, scale: 0.85 }
          ],
          removeEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };

      case 'rotate-y':
        return {
          addKeyframes: [
            { opacity: 0, rotate: '-60deg', translate: '0 -35%', scale: 0.85 },
            { opacity: 0.5, rotate: '-20deg', translate: '0 -15%', scale: 0.95 },
            { opacity: 1, rotate: '0', translate: '0 0', scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, rotate: '0', translate: '0 0', scale: 1 },
            { opacity: 0.5, rotate: '20deg', translate: '0 15%', scale: 0.95 },
            { opacity: 0, rotate: '60deg', translate: '0 35%', scale: 0.85 }
          ],
          removeEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };

      case 'slide-x':
        return {
          addKeyframes: [
            { opacity: 0, translate: `${isRtl ? 35 : -35}% 0`, scale: 0.98 },
            { opacity: 0.6, translate: `${isRtl ? 15 : -15}% 0`, scale: 0.99 },
            { opacity: 1, translate: '0 0', scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.32, 0.72, 0, 1)',
          removeKeyframes: [
            { opacity: 1, translate: '0 0', scale: 1 },
            { opacity: 0.3, translate: `${isRtl ? -15 : 15}% 0`, scale: 0.99 },
            { opacity: 0, translate: `${isRtl ? -35 : 35}% 0`, scale: 0.98 }
          ],
          removeEasing: 'cubic-bezier(0.32, 0, 0.67, 0)'
        };

      case 'slide-y':
        return {
          addKeyframes: [
            { opacity: 0, translate: '0 -35%', scale: 0.98 },
            { opacity: 0.6, translate: '0 -15%', scale: 0.99 },
            { opacity: 1, translate: '0 0', scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.32, 0.72, 0, 1)',
          removeKeyframes: [
            { opacity: 1, translate: '0 0', scale: 1 },
            { opacity: 0.3, translate: '0 15%', scale: 0.99 },
            { opacity: 0, translate: '0 35%', scale: 0.98 }
          ],
          removeEasing: 'cubic-bezier(0.32, 0, 0.67, 0)'
        };

      //
      // Complex
      //

      case 'drift':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: `translate(${isRtl ? 100 : -100}px, 50px) rotate(${isRtl ? 15 : -15}deg) scale(0.9)`,
              filter: 'blur(10px)'
            },
            {
              opacity: 0.3,
              transform: `translate(${isRtl ? 50 : -50}px, 25px) rotate(${isRtl ? 8 : -8}deg) scale(0.95)`,
              filter: 'blur(6px)'
            },
            {
              opacity: 0.6,
              transform: `translate(${isRtl ? 25 : -25}px, 12px) rotate(${isRtl ? 4 : -4}deg) scale(0.97)`,
              filter: 'blur(4px)'
            },
            {
              opacity: 0.8,
              transform: `translate(${isRtl ? 10 : -10}px, 5px) rotate(${isRtl ? 2 : -2}deg) scale(0.99)`,
              filter: 'blur(2px)'
            },
            { opacity: 1, transform: 'translate(0, 0) rotate(0) scale(1)', filter: 'blur(0)' }
          ],
          addEasing: 'cubic-bezier(0.4, 0.1, 0.3, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'translate(0, 0) rotate(0) scale(1)', filter: 'blur(0)' },
            {
              opacity: 0.8,
              transform: `translate(${isRtl ? -10 : 10}px, -5px) rotate(${isRtl ? -2 : 2}deg) scale(1.01)`,
              filter: 'blur(2px)'
            },
            {
              opacity: 0.6,
              transform: `translate(${isRtl ? -25 : 25}px, -12px) rotate(${isRtl ? -4 : 4}deg) scale(1.02)`,
              filter: 'blur(4px)'
            },
            {
              opacity: 0.3,
              transform: `translate(${isRtl ? -50 : 50}px, -25px) rotate(${isRtl ? -8 : 8}deg) scale(1.05)`,
              filter: 'blur(6px)'
            },
            {
              opacity: 0,
              transform: `translate(${isRtl ? -100 : 100}px, -50px) rotate(${isRtl ? -15 : 15}deg) scale(1.1)`,
              filter: 'blur(10px)'
            }
          ],
          removeEasing: 'cubic-bezier(0.4, 0.1, 0.3, 1)'
        };

      case 'earthquake':
        return {
          addKeyframes: [
            { opacity: 0, transform: `translate(${isRtl ? 8 : -8}px, -8px) rotate(${isRtl ? 5 : -5}deg)` },
            { opacity: 0.2, transform: `translate(${isRtl ? -8 : 8}px, 8px) rotate(${isRtl ? -5 : 5}deg)` },
            { opacity: 0.4, transform: `translate(${isRtl ? 6 : -6}px, 6px) rotate(${isRtl ? 4 : -4}deg)` },
            { opacity: 0.6, transform: `translate(${isRtl ? -6 : 6}px, -6px) rotate(${isRtl ? -4 : 4}deg)` },
            { opacity: 0.8, transform: `translate(${isRtl ? 4 : -4}px, 4px) rotate(${isRtl ? 2 : -2}deg)` },
            { opacity: 1, transform: 'translate(0, 0) rotate(0)' }
          ],
          addEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          removeKeyframes: [
            { opacity: 1, transform: 'translate(0, 0) rotate(0)' },
            { opacity: 0.8, transform: `translate(${isRtl ? -4 : 4}px, 4px) rotate(${isRtl ? -2 : 2}deg)` },
            { opacity: 0.6, transform: `translate(${isRtl ? 6 : -6}px, -6px) rotate(${isRtl ? 3 : -3}deg)` },
            { opacity: 0.4, transform: `translate(${isRtl ? -8 : 8}px, 8px) rotate(${isRtl ? -4 : 4}deg)` },
            { opacity: 0, transform: `translate(${isRtl ? 10 : -10}px, -10px) rotate(${isRtl ? 5 : -5}deg)` }
          ],
          removeEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };

      case 'elevator':
        return {
          addKeyframes: [
            { opacity: 0, translate: '0 100%', scale: 0.95 },
            { opacity: 0.5, translate: '0 50%', scale: 0.97 },
            { opacity: 0.8, translate: '0 15%', scale: 0.99 },
            { opacity: 1, translate: '0 0', scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          removeKeyframes: [
            { opacity: 1, translate: '0 0', scale: 1 },
            { opacity: 0.8, translate: '0 -15%', scale: 0.99 },
            { opacity: 0.5, translate: '0 -50%', scale: 0.97 },
            { opacity: 0, translate: '0 -100%', scale: 0.95 }
          ],
          removeEasing: 'cubic-bezier(0.33, 1, 0.68, 1)'
        };

      case 'explode':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'scale(0.1)', filter: 'blur(20px) brightness(2)' },
            { opacity: 0.3, transform: 'scale(0.4)', filter: 'blur(15px) brightness(1.7)' },
            { opacity: 0.6, transform: 'scale(0.7)', filter: 'blur(10px) brightness(1.4)' },
            { opacity: 0.8, transform: 'scale(0.9)', filter: 'blur(5px) brightness(1.2)' },
            { opacity: 1, transform: 'scale(1)', filter: 'blur(0) brightness(1)' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'scale(1)', filter: 'blur(0) brightness(1)' },
            { opacity: 0.8, transform: 'scale(1.1)', filter: 'blur(5px) brightness(1.2)' },
            { opacity: 0.6, transform: 'scale(1.3)', filter: 'blur(10px) brightness(1.4)' },
            { opacity: 0.3, transform: 'scale(1.6)', filter: 'blur(15px) brightness(1.7)' },
            { opacity: 0, transform: 'scale(2)', filter: 'blur(20px) brightness(2)' }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'fold':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: 'perspective(2000px) rotateX(90deg) translateY(-20px)',
              transformOrigin: 'top',
              perspectiveOrigin: '50% 0%'
            },
            {
              opacity: 1,
              transform: 'perspective(2000px) rotateX(0) translateY(0)',
              transformOrigin: 'top',
              perspectiveOrigin: '50% 0%'
            }
          ],
          addEasing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          removeKeyframes: [
            {
              opacity: 1,
              transform: 'perspective(2000px) rotateX(0) translateY(0)',
              transformOrigin: 'bottom',
              perspectiveOrigin: '50% 100%'
            },
            {
              opacity: 0,
              transform: 'perspective(2000px) rotateX(-90deg) translateY(20px)',
              transformOrigin: 'bottom',
              perspectiveOrigin: '50% 100%'
            }
          ],
          removeEasing: 'cubic-bezier(0.32, 0, 0.67, 0)'
        };

      case 'glitch':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: 'translate(-10%, -5%) skew(20deg, -10deg)',
              filter: 'hue-rotate(90deg) saturate(200%)'
            },
            {
              opacity: 0.3,
              transform: 'translate(15%, 10%) skew(-15deg, 5deg)',
              filter: 'hue-rotate(-70deg) saturate(150%)'
            },
            {
              opacity: 0.6,
              transform: 'translate(-7%, 3%) skew(10deg, -5deg)',
              filter: 'hue-rotate(50deg) saturate(125%)'
            },
            {
              opacity: 0.8,
              transform: 'translate(3%, -2%) skew(-5deg, 2deg)',
              filter: 'hue-rotate(-20deg) saturate(110%)'
            },
            { opacity: 1, transform: 'translate(0, 0) skew(0, 0)', filter: 'hue-rotate(0) saturate(100%)' }
          ],
          addEasing: 'steps(5, end)',
          removeKeyframes: [
            { opacity: 1, transform: 'translate(0, 0) skew(0, 0)', filter: 'hue-rotate(0) saturate(100%)' },
            {
              opacity: 0.8,
              transform: 'translate(5%, 5%) skew(10deg, 5deg)',
              filter: 'hue-rotate(45deg) saturate(150%)'
            },
            {
              opacity: 0.5,
              transform: 'translate(-15%, -10%) skew(-15deg, -10deg)',
              filter: 'hue-rotate(-90deg) saturate(200%)'
            },
            {
              opacity: 0,
              transform: 'translate(20%, 15%) skew(20deg, 15deg)',
              filter: 'hue-rotate(180deg) saturate(300%)'
            }
          ],
          removeEasing: 'steps(4, end)'
        };

      case 'gravity':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'translateY(-200px) scale(0.7)', filter: 'blur(8px)' },
            { opacity: 0.5, transform: 'translateY(20px) scale(1.1)', filter: 'blur(4px)' },
            { opacity: 0.7, transform: 'translateY(-10px) scale(0.95)', filter: 'blur(2px)' },
            { opacity: 0.9, transform: 'translateY(5px) scale(1.02)', filter: 'blur(1px)' },
            { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
            { opacity: 0.7, transform: 'translateY(10px) scale(1.1)', filter: 'blur(2px)' },
            { opacity: 0.5, transform: 'translateY(20px) scale(0.95)', filter: 'blur(4px)' },
            { opacity: 0, transform: 'translateY(200px) scale(0.9)', filter: 'blur(8px)' }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'kaleidoscope':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'rotate(180deg) scale(0.3)', filter: 'hue-rotate(90deg) blur(10px)' },
            { opacity: 0.3, transform: 'rotate(135deg) scale(0.5)', filter: 'hue-rotate(60deg) blur(8px)' },
            { opacity: 0.6, transform: 'rotate(90deg) scale(0.7)', filter: 'hue-rotate(30deg) blur(6px)' },
            { opacity: 0.8, transform: 'rotate(45deg) scale(0.9)', filter: 'hue-rotate(15deg) blur(3px)' },
            { opacity: 1, transform: 'rotate(0) scale(1)', filter: 'hue-rotate(0) blur(0)' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'rotate(0) scale(1)', filter: 'hue-rotate(0) blur(0)' },
            { opacity: 0.8, transform: 'rotate(-45deg) scale(1.1)', filter: 'hue-rotate(15deg) blur(3px)' },
            { opacity: 0.6, transform: 'rotate(-90deg) scale(1.3)', filter: 'hue-rotate(30deg) blur(6px)' },
            { opacity: 0.3, transform: 'rotate(-135deg) scale(1.5)', filter: 'hue-rotate(60deg) blur(8px)' },
            { opacity: 0, transform: 'rotate(-180deg) scale(1.7)', filter: 'hue-rotate(90deg) blur(10px)' }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'orbit':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'rotate(360deg) translateX(100px) rotate(-360deg) scale(0.5)' },
            { opacity: 0.4, transform: 'rotate(240deg) translateX(60px) rotate(-240deg) scale(0.8)' },
            { opacity: 0.7, transform: 'rotate(120deg) translateX(30px) rotate(-120deg) scale(0.9)' },
            { opacity: 1, transform: 'rotate(0deg) translateX(0) rotate(0deg) scale(1)' }
          ],
          addEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'rotate(0deg) translateX(0) rotate(0deg) scale(1)' },
            { opacity: 0.7, transform: 'rotate(-120deg) translateX(30px) rotate(120deg) scale(0.9)' },
            { opacity: 0.4, transform: 'rotate(-240deg) translateX(60px) rotate(240deg) scale(0.8)' },
            { opacity: 0, transform: 'rotate(-360deg) translateX(100px) rotate(360deg) scale(0.5)' }
          ],
          removeEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };

      case 'portal':
        return {
          addKeyframes: [
            { opacity: 0, transform: 'scale(2.5, 0.2) rotate(45deg)', filter: 'blur(20px) saturate(200%)' },
            { opacity: 0.3, transform: 'scale(1.5, 0.6) rotate(25deg)', filter: 'blur(15px) saturate(175%)' },
            { opacity: 0.6, transform: 'scale(1.2, 0.8) rotate(10deg)', filter: 'blur(10px) saturate(150%)' },
            { opacity: 0.8, transform: 'scale(1.1, 0.9) rotate(5deg)', filter: 'blur(5px) saturate(125%)' },
            { opacity: 1, transform: 'scale(1) rotate(0)', filter: 'blur(0) saturate(100%)' }
          ],
          addEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'scale(1) rotate(0)', filter: 'blur(0) saturate(100%)' },
            { opacity: 0.7, transform: 'scale(1.2, 0.8) rotate(-10deg)', filter: 'blur(10px) saturate(150%)' },
            { opacity: 0.3, transform: 'scale(0.5, 1.5) rotate(-25deg)', filter: 'blur(15px) saturate(175%)' },
            { opacity: 0, transform: 'scale(0.2, 2.5) rotate(-45deg)', filter: 'blur(20px) saturate(200%)' }
          ],
          removeEasing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        };

      case 'ribbon':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: `translateX(${isRtl ? '100%' : '-100%'}) rotateY(${isRtl ? -90 : 90}deg) scaleX(2) scaleY(0.5)`,
              filter: 'brightness(1.2)'
            },
            {
              opacity: 0.4,
              transform: `translateX(${isRtl ? '50%' : '-50%'}) rotateY(${isRtl ? -45 : 45}deg) scaleX(1.5) scaleY(0.7)`,
              filter: 'brightness(1.1)'
            },
            {
              opacity: 0.7,
              transform: `translateX(${isRtl ? '25%' : '-25%'}) rotateY(${isRtl ? -20 : 20}deg) scaleX(1.2) scaleY(0.9)`,
              filter: 'brightness(1.05)'
            },
            { opacity: 1, transform: 'translateX(0) rotateY(0) scale(1)', filter: 'brightness(1)' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'translateX(0) rotateY(0) scale(1)', filter: 'brightness(1)' },
            {
              opacity: 0.7,
              transform: `translateX(${isRtl ? '-25%' : '25%'}) rotateY(${isRtl ? 20 : -20}deg) scaleX(1.2) scaleY(0.9)`,
              filter: 'brightness(1.05)'
            },
            {
              opacity: 0.4,
              transform: `translateX(${isRtl ? '-50%' : '50%'}) rotateY(${isRtl ? 45 : -45}deg) scaleX(1.5) scaleY(0.7)`,
              filter: 'brightness(1.1)'
            },
            {
              opacity: 0,
              transform: `translateX(${isRtl ? '-100%' : '100%'}) rotateY(${isRtl ? 90 : -90}deg) scaleX(2) scaleY(0.5)`,
              filter: 'brightness(1.2)'
            }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'rubber':
        return {
          addKeyframes: [
            { opacity: 0, scale: '2 0.5' },
            { opacity: 0.4, scale: '0.7 1.3' },
            { opacity: 0.6, scale: '1.3 0.8' },
            { opacity: 0.8, scale: '0.9 1.1' },
            { opacity: 0.9, scale: '1.1 0.9' },
            { opacity: 1, scale: '1 1' }
          ],
          addEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          removeKeyframes: [
            { opacity: 1, scale: '1 1' },
            { opacity: 0.9, scale: '1.1 0.9' },
            { opacity: 0.8, scale: '0.9 1.1' },
            { opacity: 0.6, scale: '1.3 0.8' },
            { opacity: 0.4, scale: '0.7 1.3' },
            { opacity: 0, scale: '2 0.5' }
          ],
          removeEasing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };

      case 'spring':
        return {
          addKeyframes: [
            { opacity: 0, scale: 0.93, translate: '0 10px' },
            { opacity: 0.6, scale: 1.04, translate: '0 -5px' },
            { opacity: 0.8, scale: 0.98, translate: '0 3px' },
            { opacity: 0.9, scale: 1.02, translate: '0 -1px' },
            { opacity: 1, scale: 1, translate: '0 0' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, scale: 1, translate: '0 0' },
            { opacity: 0.8, scale: 1.02, translate: '0 3px' },
            { opacity: 0.6, scale: 0.98, translate: '0 6px' },
            { opacity: 0, scale: 0.93, translate: '0 10px' }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'telescope':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: 'perspective(1000px) rotateX(-30deg) translateZ(200px) scale(0.6)',
              filter: 'blur(20px)'
            },
            {
              opacity: 0.4,
              transform: 'perspective(1000px) rotateX(-20deg) translateZ(150px) scale(0.7)',
              filter: 'blur(15px)'
            },
            {
              opacity: 0.7,
              transform: 'perspective(1000px) rotateX(-10deg) translateZ(100px) scale(0.8)',
              filter: 'blur(10px)'
            },
            {
              opacity: 0.9,
              transform: 'perspective(1000px) rotateX(-5deg) translateZ(50px) scale(0.9)',
              filter: 'blur(5px)'
            },
            { opacity: 1, transform: 'perspective(1000px) rotateX(0) translateZ(0) scale(1)', filter: 'blur(0)' }
          ],
          addEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          removeKeyframes: [
            { opacity: 1, transform: 'perspective(1000px) rotateX(0) translateZ(0) scale(1)', filter: 'blur(0)' },
            {
              opacity: 0.7,
              transform: 'perspective(1000px) rotateX(10deg) translateZ(100px) scale(1.2)',
              filter: 'blur(10px)'
            },
            {
              opacity: 0.4,
              transform: 'perspective(1000px) rotateX(20deg) translateZ(150px) scale(1.4)',
              filter: 'blur(15px)'
            },
            {
              opacity: 0,
              transform: 'perspective(1000px) rotateX(30deg) translateZ(200px) scale(1.6)',
              filter: 'blur(20px)'
            }
          ],
          removeEasing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        };

      case 'tornado':
        return {
          addKeyframes: [
            {
              opacity: 0,
              rotate: `${isRtl ? '180deg' : '-180deg'}`,
              scale: 0.2,
              translate: `${isRtl ? '100%' : '-100%'} 100%`
            },
            {
              opacity: 0.4,
              rotate: `${isRtl ? '90deg' : '-90deg'}`,
              scale: 0.6,
              translate: `${isRtl ? '50%' : '-50%'} 50%`
            },
            {
              opacity: 0.8,
              rotate: `${isRtl ? '45deg' : '-45deg'}`,
              scale: 0.8,
              translate: `${isRtl ? '25%' : '-25%'} 25%`
            },
            { opacity: 1, rotate: '0deg', scale: 1, translate: '0 0' }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            { opacity: 1, rotate: '0deg', scale: 1, translate: '0 0' },
            {
              opacity: 0.8,
              rotate: `${isRtl ? '-45deg' : '45deg'}`,
              scale: 0.8,
              translate: `${isRtl ? '-25%' : '25%'} -25%`
            },
            {
              opacity: 0.4,
              rotate: `${isRtl ? '-90deg' : '90deg'}`,
              scale: 0.6,
              translate: `${isRtl ? '-50%' : '50%'} -50%`
            },
            {
              opacity: 0,
              rotate: `${isRtl ? '-180deg' : '180deg'}`,
              scale: 0.2,
              translate: `${isRtl ? '-100%' : '100%'} -100%`
            }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      case 'vortex':
        return {
          addKeyframes: [
            {
              opacity: 0,
              transform: 'perspective(1000px) rotateX(60deg) rotateY(60deg) scale(2)',
              filter: 'blur(30px) brightness(2)'
            },
            {
              opacity: 0.3,
              transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg) scale(1.5)',
              filter: 'blur(20px) brightness(1.7)'
            },
            {
              opacity: 0.6,
              transform: 'perspective(1000px) rotateX(30deg) rotateY(30deg) scale(1.2)',
              filter: 'blur(10px) brightness(1.4)'
            },
            {
              opacity: 1,
              transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
              filter: 'blur(0) brightness(1)'
            }
          ],
          addEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          removeKeyframes: [
            {
              opacity: 1,
              transform: 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
              filter: 'blur(0) brightness(1)'
            },
            {
              opacity: 0.6,
              transform: 'perspective(1000px) rotateX(-30deg) rotateY(-30deg) scale(0.8)',
              filter: 'blur(10px) brightness(0.8)'
            },
            {
              opacity: 0.3,
              transform: 'perspective(1000px) rotateX(-45deg) rotateY(-45deg) scale(0.5)',
              filter: 'blur(20px) brightness(0.6)'
            },
            {
              opacity: 0,
              transform: 'perspective(1000px) rotateX(-60deg) rotateY(-60deg) scale(0.1)',
              filter: 'blur(30px) brightness(0.4)'
            }
          ],
          removeEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

      default: // fade
        return {
          addKeyframes: [
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1 }
          ],
          addEasing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          removeKeyframes: [
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.98 }
          ],
          removeEasing: 'cubic-bezier(0.6, 0, 0.735, 0)'
        };
    }
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
    const { addKeyframes, addEasing, removeKeyframes, removeEasing } = this.getAnimation(this.effect);
    const duration = parseCssDuration(computedStyle.getPropertyValue('--duration'));

    // Dispatch the quiet-content-changed event
    this.dispatchEvent(new QuietContentChangedEvent({ mutations }));

    // Stop here if transitions are disabled
    if (prefersReducedMotion || this.disableTransitions) {
      this.isTransitioning = false;
      this.updateElementPositions();
      this.resolveTransitionPromise();
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

    // Determine which elements were moved
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
          const promise = await el.animate(removeKeyframes, { duration: duration, easing: removeEasing }).finished;
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
          { duration, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' }
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
        el.animate([{ translate: `${translateX}px ${translateY}px` }, { translate: `0 0` }], {
          duration,
          easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
        }).finished
      );
    });

    await Promise.allSettled(moveAnimations);

    // Animate added elements
    addedElements.forEach((_opts, el) => {
      el.style.removeProperty('opacity');
      addAnimations.push(el.animate(addKeyframes, { easing: addEasing, duration }).finished);
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

    // Dispatch the quiet-transition-end event
    this.dispatchEvent(new QuietTransitionEndEvent());
    this.resolveTransitionPromise();
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
