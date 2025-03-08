import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietAnimationComplete } from '../../events/animation.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './typewriter.styles.js';

/**
 * `<quiet-typewriter>`
 *
 * @summary Typewriters simulate a natural typing effect with customizable speed, delay, and looping options.
 * @documentation https://quietui.com/docs/components/typewriter
 * @status stable
 * @since 1.0
 *
 * @event quiet-animation-complete - Emitted when the typing animation has completed.
 *
 * @cssproperty [--cursor-color=currentColor] - The color of the cursor during animation when `with-cursor` is enabled.
 * @cssproperty [--cursor-width=1.5px] - The color of the cursor during animation when `with-cursor` is enabled.
 *
 * @csspart cursor - The cursor, a `<span>` element with a styled border.
 */
@customElement('quiet-typewriter')
export class QuietTypewriter extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private animationTimeout: number | null = null;
  private observer: IntersectionObserver | null = null;

  /** The text to type out. */
  @property({ type: String }) text = '';

  /** The average speed in milliseconds to wait between typing each character. */
  @property({ type: Number }) speed = 50;

  /** Delay in milliseconds before the animation starts. */
  @property({ type: Number }) delay = 250;

  /** Whether to start the animation when the component comes into view. */
  @property({ type: Boolean, attribute: 'start-on-view' }) startOnView = false;

  /** Whether to show a blinking cursor during animation. */
  @property({ type: Boolean, attribute: 'with-cursor', reflect: true }) withCursor = false;

  /** Whether to loop the animation with a pause and backspace effect. */
  @property({ type: Boolean, reflect: true }) loop = false;

  /** Duration in milliseconds to pause before backspacing when looping. */
  @property({ type: Number, attribute: 'loop-delay' }) loopDelay = 2000;

  /** Whether to pause the typewriter animation. */
  @property({ type: Boolean, reflect: true }) pause = false;

  /**
   * By default, no animation will occur when the user indicates a preference for reduced motion. Use this attribute to
   * override this behavior when necessary.
   */
  @property({ attribute: 'ignore-reduced-motion', type: Boolean, reflect: true }) ignoreReducedMotion = false;

  @state() private currentText = '';
  @state() private isAnimating = false; // Tracks any animation (typing or erasing)
  @state() private charIndex = 0;
  @state() private isErasing = false;

  connectedCallback() {
    super.connectedCallback();
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

  async updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('text')) {
      this.setAttribute('aria-label', this.text);

      if (!this.isAnimating) {
        this.currentText = '';
        this.charIndex = 0;
        this.isErasing = false;
        if (!this.startOnView) {
          this.startAnimation();
        }
      }
    }

    if (changedProperties.has('pause') && !this.pause && this.isAnimating) {
      this.resumeAnimation();
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

  /** Starts the typewriter animation. */
  private startAnimation() {
    // Prevent starting if already animating
    if (this.isAnimating) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !this.ignoreReducedMotion) {
      this.currentText = this.text;
      this.charIndex = this.text.length;
      this.dispatchEvent(new QuietAnimationComplete());
      return;
    }

    // Clear any existing animation to avoid overlaps
    this.stopAnimation();

    // Ensure delay is a valid non-negative number, defaulting to 0 if invalid
    const effectiveDelay = Math.max(0, Number(this.delay) || 0);

    // Set a timeout to delay the start of the animation
    this.animationTimeout = window.setTimeout(() => {
      // Start the animation after the delay
      this.isAnimating = true;
      this.isErasing = false;
      this.currentText = ''; // Reset text to empty
      this.charIndex = 0; // Reset character index
      this.typeNextChar(); // Begin typing the next character
    }, effectiveDelay);
  }

  /** Types the next character in the animation. */
  private typeNextChar() {
    if (!this.isAnimating || this.isErasing || this.pause) return;

    if (this.charIndex < this.text.length) {
      this.currentText = this.text.slice(0, this.charIndex + 1);
      this.charIndex++;
      const currentDuration = this.speed * (0.5 + Math.random());
      this.animationTimeout = window.setTimeout(() => this.typeNextChar(), currentDuration);
    } else {
      this.isAnimating = false;
      this.dispatchEvent(new QuietAnimationComplete());
      if (this.loop && !this.pause) {
        this.startEraseAnimation();
      }
    }
  }

  /** Starts the erase animation. */
  private startEraseAnimation() {
    if (this.isAnimating || this.pause) return;

    this.isAnimating = true;
    this.isErasing = true;
    this.animationTimeout = window.setTimeout(
      () => {
        this.eraseNextChar();
      },
      Math.max(0, this.loopDelay)
    );
  }

  /** Erases the next character in the animation. */
  private eraseNextChar() {
    if (!this.isAnimating || !this.isErasing || this.pause) return;

    if (this.currentText.length > 0) {
      this.currentText = this.currentText.slice(0, -1);
      this.charIndex--;
      this.animationTimeout = window.setTimeout(() => this.eraseNextChar(), 50);
    } else {
      this.isAnimating = false;
      this.isErasing = false;
      if (!this.pause) {
        this.startAnimation();
      }
    }
  }

  /** Restarts the animation from the beginning. */
  public restart() {
    this.stopAnimation();
    this.currentText = ''; // Reset text immediately to prevent showing first character
    this.startAnimation();
  }

  /** Stops the current animation by clearing the timeout. */
  private stopAnimation() {
    if (this.animationTimeout !== null) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
      this.isAnimating = false;
      this.isErasing = false;
    }
  }

  /** Resumes the animation based on the current state. */
  private resumeAnimation() {
    if (!this.isAnimating) return;
    if (this.isErasing) {
      this.eraseNextChar();
    } else {
      this.typeNextChar();
    }
  }

  render() {
    const cursor = this.withCursor && this.isAnimating ? html`<span part="cursor" class="cursor"></span>` : '';
    const displayText = this.currentText || html`&nbsp;`;
    return html`<span aria-hidden="true">${displayText}${cursor}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-typewriter': QuietTypewriter;
  }
}
