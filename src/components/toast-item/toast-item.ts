import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import '../progress/progress.js';
import styles from './toast-item.styles.js';

/**
 * <quiet-toast-item>
 *
 * @summary Toast items are the notifications displayed by the toast component.
 * @documentation https://quietui.org/docs/components/toast-item
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 * @dependency quiet-progress
 *
 * @slot - Content to show in the toast item.
 * @slot icon - Content to show as a visual. Usually an icon, image, avatar, etc.
 *
 * @event quiet-before-close - Emitted when the toast item is dismissed.
 * @event quiet-close - Emitted after the toast has been dismissed and the hide animation has completed.
 *
 * @csspart icon
 * @csspart content
 * @csspart close-button - The close button, a `<button>` element.
 * @csspart progress - The progress ring, a `<quiet-progress>` element.
 * @csspart progress__track - The progress ring's exported `track` part.
 * @csspart progress__indicator - The progress ring's exported `indicator` part.
 * @csspart progress__content - The progress ring's exported `content` part.
 * @csspart close-icon - The close icon, a `<quiet-icon>` element.
 * @csspart close-icon__svg - The close icons exported `svg` part.
 *
 * @cssproperty [--accent-line-width=0.33em] - The width of the notification's accent line.
 * @cssproperty --progress - A readonly value that goes from 100% to 0%, representing the progress remaining until the
 *  notification closes. Useful for creating custom content with visual indicators of the notification's progress.
 */
@customElement('quiet-toast-item')
export class QuietToastItem extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  private animationFrame: number | null = null;
  private isPaused = false;
  private localize = new Localize(this);
  private startTime: number | null = null;

  /**
   * @internal The amount of time left before the notification is removed. Moves from 100 (full time left) to zero (no
   *  time left).
   */
  @state() timeLeft = 100;

  /** The type of notification to render. */
  @property({ reflect: true }) variant: 'primary' | 'constructive' | 'destructive' | 'default' = 'default';

  /**
   * The length of time to show the notification before removing it. Set this to `0` to show the notification until the
   * user dismisses it.
   */
  @property({ type: Number }) duration = 5000;

  /** When set, the close button will be omitted. */
  @property({ attribute: 'without-close-button', type: Boolean, reflect: true }) withoutCloseButton = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerenter', this.handlePointerEnter);
    this.addEventListener('pointerleave', this.handlePointerLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
    this.removeEventListener('pointerenter', this.handlePointerEnter);
    this.removeEventListener('pointerleave', this.handlePointerLeave);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('timeLeft')) {
      this.style.setProperty('--progress', `${this.timeLeft.toFixed(2)}%`);
    }
  }

  /**
   * @internal Starts the auto-dismiss timer. If no duration is specified, this method has no effect.
   */
  public startTimer() {
    if (this.duration > 0 && Number.isFinite(this.duration)) {
      this.startTime = performance.now();
      this.timeLeft = 100;
      this.tick();
    }
  }

  /**
   * @internal Stops the auto-dismiss timer.
   */
  public stopTimer() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private tick = async () => {
    if (!this.startTime || this.isPaused) {
      return;
    }

    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    this.timeLeft = 100 * (1 - progress);

    if (progress < 1) {
      this.animationFrame = requestAnimationFrame(this.tick);
    } else {
      await this.waitForStackTransition();
      this.remove();
    }
  };

  /** Close it! */
  private async handleCloseClick(event: MouseEvent) {
    event.stopPropagation();
    this.stopTimer();

    await this.waitForStackTransition();
    this.remove();
  }

  /** Pause the timer on hover in */
  private handlePointerEnter = (event: PointerEvent) => {
    // Don't pause for touch, since that will pause the timer indefinitely
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
      this.isPaused = true;
      this.timeLeft = 100;
      this.stopTimer();
    }
  };

  /** Resume the timer on hover out */
  private handlePointerLeave = () => {
    this.isPaused = false;
    this.startTimer();
  };

  /** Waits for the toast stack's transition group to finish transitioning and then resolves. */
  private async waitForStackTransition() {
    const stack = this.closest('quiet-toast')?.stack;

    if (stack) {
      await stack.transitionComplete();
    }
  }

  render() {
    return html`
      ${this.whenSlotted('icon', html` <div id="icon" part="icon"><slot name="icon"></slot></div> `)}

      <div id="content" part="content"><slot></slot></div>

      ${!this.withoutCloseButton
        ? html` <button
            id="close-button"
            part="close-button"
            type="button"
            aria-label=${this.localize.term('close')}
            @click=${this.handleCloseClick}
          >
            ${this.duration > 0 && Number.isFinite(this.duration)
              ? html`
                  <quiet-progress
                    part="progress"
                    exportparts="
                    track:progress__track,
                    indicator:progress__indicator,
                    content:progress__content
                  "
                    appearance="ring"
                    value="${this.timeLeft}"
                  >
                    <quiet-icon
                      part="close-icon"
                      exportparts="svg:close-icon__svg"
                      library="system"
                      name="x"
                    ></quiet-icon>
                  </quiet-progress>
                `
              : html`
                  <quiet-icon
                    part="close-icon"
                    exportparts="svg:close-icon__svg"
                    library="system"
                    name="x"
                  ></quiet-icon>
                `}
          </button>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-toast-item': QuietToastItem;
  }
}
