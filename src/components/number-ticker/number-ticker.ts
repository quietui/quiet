import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietAnimationComplete } from '../../events/animation.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './number-ticker.styles.js';

/**
 * `<quiet-number-ticker>`
 *
 * @summary Number tickers animate a number from a starting value to an ending value.
 * @documentation https://quietui.com/docs/components/number-ticker
 * @status stable
 * @since 1.0
 *
 * @event quiet-animation-complete - Emitted when the counting animation has completed.
 */
@customElement('quiet-number-ticker')
export class QuietNumberTicker extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private animationFrame: number | null = null;
  private animationTimeout: number | null = null;
  private localize = new Localize(this);
  private observer: IntersectionObserver | null = null;
  private startTime: number | null = null;

  @state() private currentValue: number = 0;
  @state() private isAnimating = false;

  /** The starting value for the count. */
  @property({ type: Number, attribute: 'start-value' }) startValue = 0;

  /** The target value to count to. */
  @property({ type: Number, attribute: 'end-value' }) endValue = 0;

  /** Duration of the animation in milliseconds. */
  @property({ type: Number }) duration = 2000;

  /** Delay in milliseconds before counting starts. */
  @property({ type: Number }) delay = 0;

  /** Number of decimal places to display. */
  @property({ type: Number, attribute: 'decimal-places' }) decimalPlaces = 0;

  /** Whether to group numbers, e.g. with a thousands separator. */
  @property() grouping: 'always' | 'never' | 'auto' | 'min2' = 'auto';

  /** Whether to start the animation when the component comes into view. */
  @property({ type: Boolean, attribute: 'start-on-view' }) startOnView = false;

  /**
   * By default, no animation will occur when the user indicates a preference for reduced motion. Use this attribute to
   * override this behavior when necessary.
   */
  @property({ attribute: 'ignore-reduced-motion', type: Boolean, reflect: true }) ignoreReducedMotion = false;

  /**
   * A custom formatting function to apply to the number. When set, `decimal-places` and `grouping` will be ignored.
   * Property only.
   */
  @property({ attribute: false }) valueFormatter: (value: number) => string;

  connectedCallback() {
    super.connectedCallback();
    this.currentValue = this.startValue;
    if (this.startOnView) {
      this.setupIntersectionObserver();
    } else {
      this.startAnimation();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAnimation();
    this.observer?.disconnect();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (
      changedProperties.has('startValue') ||
      changedProperties.has('endValue') ||
      changedProperties.has('decimalPlaces') ||
      changedProperties.has('duration')
    ) {
      this.stopAnimation();
      this.currentValue = this.startValue;
      if (!this.startOnView) {
        this.startAnimation();
      }
    }

    if (changedProperties.has('endValue')) {
      this.setAttribute('aria-label', `${this.endValue}`);
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !this.isAnimating) {
          this.startAnimation();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this);
  }

  private startAnimation() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveDelay = Math.max(0, Number(this.delay) || 0);

    this.stopAnimation(); // Stop any existing animation
    this.currentValue = this.startValue; // Reset to startValue

    if (prefersReducedMotion && !this.ignoreReducedMotion) {
      // Reduced motion mode: 5 frames
      this.isAnimating = true;
      setTimeout(() => this.startReducedMotionAnimation(), effectiveDelay);
    } else {
      // Normal animation
      setTimeout(() => {
        this.isAnimating = true;
        this.startTime = performance.now();
        this.tick();
      }, effectiveDelay);
    }
  }

  private startReducedMotionAnimation() {
    const steps = 5;
    const stepDuration = Math.max(0, Number(this.duration) || 2000) / steps;
    const valueStep = (this.endValue - this.startValue) / steps;
    let currentStep = 0;

    const updateStep = () => {
      if (currentStep <= steps) {
        this.currentValue = this.startValue + valueStep * currentStep;
        currentStep++;
        this.animationTimeout = window.setTimeout(updateStep, stepDuration);
      } else {
        this.currentValue = this.endValue; // Ensure exact end value
        this.isAnimating = false;
        this.dispatchEvent(new QuietAnimationComplete());
      }
    };

    updateStep();
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // Exponential easing
  }

  private tick() {
    if (!this.isAnimating || this.startTime === null) return;

    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / Math.max(0, Number(this.duration) || 2000), 1);
    const easedProgress = this.easeOutExpo(progress);

    const range = this.endValue - this.startValue;
    const current = this.startValue + range * easedProgress;

    this.currentValue = current;

    if (progress < 1) {
      this.animationFrame = requestAnimationFrame(() => this.tick());
    } else {
      this.currentValue = this.endValue;
      this.isAnimating = false;
      this.dispatchEvent(new QuietAnimationComplete());
    }
  }

  private stopAnimation() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.animationTimeout !== null) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
    this.isAnimating = false;
    this.startTime = null;
  }

  render() {
    return html`
      <span aria-hidden="true">
        ${typeof this.valueFormatter === 'function'
          ? this.valueFormatter(this.currentValue)
          : this.localize.number(this.currentValue, {
              maximumFractionDigits: this.decimalPlaces,
              // @ts-expect-error - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
              useGrouping: this.grouping === 'never' ? false : this.grouping
            })}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-number-ticker': QuietNumberTicker;
  }
}
