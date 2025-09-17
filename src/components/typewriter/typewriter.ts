import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { QuietAnimationComplete } from '../../events/animation.js';
import hostStyles from '../../styles/host.styles.js';
import { parseDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './typewriter.styles.js';

/**
 * `<quiet-typewriter>`
 *
 * @summary Simulates a natural typing effect with customizable speed, delay, and looping options.
 * @documentation https://quietui.com/docs/components/typewriter
 * @status stable
 * @since 1.0
 *
 * @event quiet-animation-complete - Emitted when the typing animation has completed.
 *
 * @cssproperty [--cursor-color=currentColor] - The color of the cursor during animation when `with-cursor` is enabled.
 * @cssproperty [--cursor-width=1.5px] - The width of the cursor during animation when `with-cursor` is enabled.
 *
 * @csspart cursor - The cursor, a `<span>` element with a styled border.
 */
@customElement('quiet-typewriter')
export class QuietTypewriter extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private animationTimeout: number | null = null;
  private observer: IntersectionObserver | null = null;

  /** The text to type out. Multiple lines can be separated by the delimiter. */
  @property() text = '';

  /** The delimiter used to separate multiple lines of text. */
  @property() delimiter = '\n';

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

  @state() private charIndex = 0;
  @state() private currentLineIndex = 0;
  @state() private currentText = '';
  @state() private isAnimating = false; // Tracks any animation (typing or erasing)
  @state() private isErasing = false;
  @state() private lines: string[] = [];

  connectedCallback() {
    super.connectedCallback();

    if (this.startOnView) {
      this.setupIntersectionObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAnimation();
    this.observer?.disconnect();
  }

  async updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('text') || changedProperties.has('delimiter')) {
      this.lines = parseDelimitedTokens(this.text, this.delimiter);
      this.setAttribute('aria-label', this.lines.join('. '));

      if (!this.isAnimating) {
        this.resetState();
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

  /** Gets the current line of text to type. */
  private getCurrentLine(): string {
    return this.lines[this.currentLineIndex] || '';
  }

  /** Starts the typewriter animation. */
  private startAnimation() {
    // Prevent starting if already animating or no lines to type
    if (this.isAnimating || this.lines.length === 0) return;

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

    const currentLine = this.getCurrentLine();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion, type entire line at once
    if (prefersReducedMotion && !this.ignoreReducedMotion) {
      this.currentText = currentLine;
      this.charIndex = currentLine.length;
    } else {
      // Normal character-by-character typing
      if (this.charIndex < currentLine.length) {
        this.currentText = currentLine.slice(0, this.charIndex + 1);
        this.charIndex++;
        const currentDuration = this.speed * (0.5 + Math.random());
        this.animationTimeout = window.setTimeout(() => this.typeNextChar(), currentDuration);
        return;
      }
    }

    // Line is complete (either way)
    if (this.charIndex >= currentLine.length) {
      // Finished typing the current line
      this.isAnimating = false;
      this.dispatchEvent(new QuietAnimationComplete());

      // Determine next action
      const hasMoreLines = this.currentLineIndex < this.lines.length - 1;

      if (hasMoreLines) {
        // Move to next line after erasing current one
        this.startEraseAnimation(true);
      } else if (this.loop && !this.pause) {
        // Loop back to first line after erasing
        this.startEraseAnimation(false);
      }
    }
  }

  /** Starts the erase animation. */
  private startEraseAnimation(moveToNextLine = false) {
    if (this.isAnimating || this.pause) return;

    this.isAnimating = true;
    this.isErasing = true;

    // Calculate display duration
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let displayDuration = this.loopDelay;

    // If reduced motion, add the time it would have taken to type the line
    if (prefersReducedMotion && !this.ignoreReducedMotion) {
      const typingDuration = this.currentText.length * this.speed;
      displayDuration = typingDuration + this.loopDelay;
    }

    this.animationTimeout = window.setTimeout(
      () => {
        this.eraseNextChar(moveToNextLine);
      },
      Math.max(0, displayDuration)
    );
  }

  /** Erases the next character in the animation. */
  private eraseNextChar(moveToNextLine: boolean) {
    if (!this.isAnimating || !this.isErasing || this.pause) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion, erase entire line at once
    if (prefersReducedMotion && !this.ignoreReducedMotion) {
      this.currentText = '';
      this.charIndex = 0;
    } else {
      // Normal character-by-character erasing
      if (this.currentText.length > 0) {
        this.currentText = this.currentText.slice(0, -1);
        this.charIndex--;
        this.animationTimeout = window.setTimeout(() => this.eraseNextChar(moveToNextLine), 50);
        return;
      }
    }

    // Erasing complete (either way)
    if (this.currentText.length === 0) {
      // Finished erasing
      this.isAnimating = false;
      this.isErasing = false;

      if (!this.pause) {
        if (moveToNextLine) {
          // Move to next line
          this.currentLineIndex++;
        } else {
          // Loop back to first line
          this.currentLineIndex = 0;
        }

        this.charIndex = 0;
        this.startAnimation();
      }
    }
  }

  /** Resets the animation state to the beginning. */
  private resetState() {
    this.currentText = '';
    this.charIndex = 0;
    this.currentLineIndex = 0;
    this.isErasing = false;
  }

  /** Restarts the animation from the beginning. */
  public restart() {
    this.stopAnimation();
    this.resetState();
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
      // Determine if we're moving to next line or looping
      const hasMoreLines = this.currentLineIndex < this.lines.length - 1;
      this.eraseNextChar(hasMoreLines);
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

// The Typewriter animates text which is essential for it to function, so some updates can only be scheduled as a side
// effect of the previous update. This disables that Lit dev warning about it.
QuietTypewriter.disableWarning?.('change-in-update');
