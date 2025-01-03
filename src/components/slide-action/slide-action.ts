import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietSlideActionCompleteEvent, QuietSlideActionProgressEvent } from '../../events/slide-action.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './slide-action.styles.js';

/**
 * <quiet-slide-action>
 *
 * @summary Slide actions give users a draggable handle that must be moved to the end of the track to trigger an action.
 * @documentation https://quietui.org/docs/components/slide-action
 * @status experimental
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The slide actions label. For plain-text labels, you can use the `label` attribute instead.
 * @slot thumb - The thumb element that users drag. Defaults to a double chevron icon if not provided.
 *
 * @csspart thumb - The slide action's thumb.
 * @csspart label - The slide action's label.
 *
 * @cssstate complete - Applied when the slide action is complete.
 * @cssstate dragging - Applied when the slide action is dragging.
 * @cssstate disabled - Applied when the slide action is disabled.
 */
@customElement('quiet-slide-action')
export class QuietSlideAction extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private readonly completionDelay = 300; // 300ms pause before completion animation
  private readonly holdDuration = 500;
  private dragStartX = 0;
  private isCompleting = false;
  private isKeyPressed = false;
  private isWaitingForKeyUp = false; // New flag to track if we're waiting for key release
  private keyboardAnimationFrame: number | null = null;
  private keyboardAnimationStart: number | null = null;
  private keyboardTimeout: number | null = null;
  private trackWidth = 0;

  @query('#thumb') thumb: HTMLElement;

  // Component state
  @state() private thumbPosition = 0;
  @state() private progress = 0;
  @state() private isDragging = false;

  /**
   * The label to show in the slide action's track. If you need to provide HTML in the label, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** Disables the slide action. */
  @property({ type: Boolean }) disabled = false;

  /** Draws attention to the track by adding a subtle animation. */
  @property({ reflect: true }) attention: 'shimmer';

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);

      if (this.disabled) {
        this.resetState();
      }
    }
  }

  // Track and progress calculations
  private getTrackWidth(): void {
    const computedStyles = window.getComputedStyle(this);
    const paddingLeft = parseFloat(computedStyles.paddingLeft);
    const paddingRight = parseFloat(computedStyles.paddingRight);
    // Track width is the total width minus thumb width and padding
    this.trackWidth = this.offsetWidth - this.thumb.offsetWidth - paddingLeft - paddingRight;
  }

  private setProgress(value: number): void {
    this.progress = value;
    const slideActionProgressEvent = new QuietSlideActionProgressEvent({ progress: value });
    this.dispatchEvent(slideActionProgressEvent);
  }

  private updateThumbPosition(position: number): void {
    // Clamp position between 0 and track width
    this.thumbPosition = Math.max(0, Math.min(position, this.trackWidth));
    this.setProgress((this.thumbPosition / this.trackWidth) * 100);
  }

  private async tryCompleteAction(): Promise<boolean> {
    if (this.progress < 99) return false;

    this.customStates.set('complete', true);

    const slideActionCompleteEvent = new QuietSlideActionCompleteEvent();
    this.dispatchEvent(slideActionCompleteEvent);
    if (slideActionCompleteEvent.defaultPrevented) {
      this.resetState();
      return false;
    }

    this.dispatchEvent(new CustomEvent('quiet-slide-action'));

    // Wait for animation to complete
    await new Promise(resolve => {
      this.addEventListener('animationend', resolve, { once: true });
    });

    this.customStates.set('complete', false);
    this.resetState();
    return true;
  }

  private resetState(): void {
    this.thumbPosition = 0;
    this.setProgress(0);
    this.resetKeyboardState();
    this.isCompleting = false;
  }

  private handleDragStart = (event: MouseEvent | TouchEvent): void => {
    if (this.disabled) return;

    this.isDragging = true;
    this.dragStartX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    this.getTrackWidth();

    event.preventDefault();

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('touchend', this.handleDragEnd);
  };

  private handleDrag = (event: MouseEvent | TouchEvent): void => {
    if (!this.isDragging || this.disabled) return;

    const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const deltaX = currentX - this.dragStartX;
    this.updateThumbPosition(deltaX);
  };

  private handleDragEnd = async (): Promise<void> => {
    this.isDragging = false;

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchend', this.handleDragEnd);

    const wasCompleted = await this.tryCompleteAction();

    if (!wasCompleted) {
      this.resetState();
    }
  };

  // Keyboard event handlers
  private handleKeyDown = (event: KeyboardEvent): void => {
    // Prevent scrolling
    if (event.key === ' ' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.isKeyPressed = true;
    }

    if (this.disabled || this.isCompleting || this.isDragging || this.keyboardTimeout || this.isWaitingForKeyUp) {
      return;
    }

    if (event.key === ' ' || event.key === 'ArrowRight') {
      this.startKeyboardAnimation();
    }
  };

  private startKeyboardAnimation(): void {
    this.getTrackWidth();
    const startTime = performance.now();
    this.keyboardAnimationStart = startTime;

    const animate = (currentTime: number): void => {
      if (!this.keyboardAnimationStart) return;

      const progress = Math.min((currentTime - this.keyboardAnimationStart) / this.holdDuration, 1);
      this.updateThumbPosition(this.trackWidth * progress);

      if (progress < 1) {
        this.keyboardAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.isCompleting = true;
        this.isWaitingForKeyUp = true;
        setTimeout(() => {
          if (this.progress >= 99) {
            this.tryCompleteAction();
          }
        }, this.completionDelay);
      }
    };

    this.keyboardAnimationFrame = requestAnimationFrame(animate);
    this.keyboardTimeout = window.setTimeout(() => {}, this.holdDuration + this.completionDelay);
  }

  private handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.resetKeyboardState();
      this.isCompleting = false;
      this.isKeyPressed = false;

      // Only reset isWaitingForKeyUp when both space and arrow right have been released
      if (!event.getModifierState('Space') && !event.getModifierState('ArrowRight')) {
        this.isWaitingForKeyUp = false;
      }
    }
  };

  private resetKeyboardState = (): void => {
    if (this.keyboardTimeout) {
      clearTimeout(this.keyboardTimeout);
      this.keyboardTimeout = null;
    }

    if (this.keyboardAnimationFrame) {
      cancelAnimationFrame(this.keyboardAnimationFrame);
      this.keyboardAnimationFrame = null;
    }

    this.keyboardAnimationStart = null;

    if (!this.isCompleting) {
      this.thumbPosition = 0;
      this.setProgress(0);
    }
  };

  render() {
    return html`
      <div
        id="label"
        part="label"
        class=${classMap({
          shimmer: this.attention === 'shimmer'
        })}
      >
        <slot name="label">${this.label}</slot>
      </div>

      <div
        id="thumb"
        part="thumb"
        tabindex=${this.disabled ? '-1' : '0'}
        role="button"
        aria-pressed=${this.isDragging || this.isKeyPressed ? 'true' : 'false'}
        aria-labelledby="label"
        aria-description="Press space bar for one second to activate"
        style="transform: translateX(${this.thumbPosition}px)"
        class=${classMap({
          dragging: this.isDragging
        })}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleDragStart}
        @touchstart=${this.handleDragStart}
      >
        <slot name="thumb">
          <quiet-icon library="default" name="chevrons-right"></quiet-icon>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-slide-action': QuietSlideAction;
  }
}
