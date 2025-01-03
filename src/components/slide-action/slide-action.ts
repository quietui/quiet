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
 * @slot thumb - The
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

  private dragStartX = 0;
  private trackWidth = 0;

  @query('#thumb') thumb: HTMLElement;

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
    // Handle disabled change
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);

      if (this.disabled) {
        this.thumbPosition = 0;
        this.setProgress(0);
      }
    }
  }

  handleDragStart = (event: MouseEvent | TouchEvent) => {
    if (this.disabled) return;
    this.isDragging = true;
    this.dragStartX = 'touches' in event ? event.touches[0].clientX : event.clientX;

    // Get the computed styles to account for padding
    const computedStyles = window.getComputedStyle(this);
    const paddingLeft = parseFloat(computedStyles.paddingLeft);
    const paddingRight = parseFloat(computedStyles.paddingRight);

    // Calculate the available track width accounting for padding and thumb width
    this.trackWidth = this.offsetWidth - this.thumb.offsetWidth - paddingLeft - paddingRight;

    event.preventDefault();

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('touchend', this.handleDragEnd);
  };

  private handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging || this.disabled) return;

    const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const deltaX = currentX - this.dragStartX;

    // Constrain thumb position within track bounds
    this.thumbPosition = Math.max(0, Math.min(deltaX, this.trackWidth));
    this.setProgress((this.thumbPosition / this.trackWidth) * 100);
  };

  private handleDragEnd = () => {
    this.isDragging = false;

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchend', this.handleDragEnd);

    if (this.progress >= 99) {
      this.customStates.set('complete', true);

      const slideActionCompleteEvent = new QuietSlideActionCompleteEvent();
      this.dispatchEvent(slideActionCompleteEvent);
      if (slideActionCompleteEvent.defaultPrevented) {
        this.thumbPosition = 0;
        this.setProgress(0);
        return;
      }

      this.dispatchEvent(new CustomEvent('quiet-slide-action'));

      this.addEventListener(
        'animationend',
        () => {
          this.customStates.set('complete', false);
          this.thumbPosition = 0;
          this.setProgress(0);
        },
        { once: true }
      );
    } else {
      // Animate back to start
      this.thumbPosition = 0;
      this.setProgress(0);
    }
  };

  private setProgress(value: number) {
    this.progress = value;
    const slideActionProgressEvent = new QuietSlideActionProgressEvent({ progress: value });
    this.dispatchEvent(slideActionProgressEvent);
  }

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
        role="slider"
        aria-labelledby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${Math.round(this.progress)}"
        aria-valuetext="${Math.round(this.progress)}%"
        style="transform: translateX(${this.thumbPosition}px)"
        class=${classMap({
          dragging: this.isDragging
        })}
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
