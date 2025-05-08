import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietResizeEvent } from '../../events/resize.js';
import hostStyles from '../../styles/host.styles.js';
import { DraggableElement } from '../../utilities/drag.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './comparison.styles.js';

/**
 * <quiet-comparison>
 *
 * @summary Comparisons display two elements side-by-side with a draggable divider, allowing users to adjust the visible
 *  portions for direct visual comparison.
 * @documentation https://quietui.org/docs/components/comparison
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot start - The content to show on the left/start side or top side, depending on orientation.
 * @slot end - The content to show on the right/end side or bottom side, depending on orientation.
 * @slot handle-icon - A custom icon to use for the divider's handle.
 *
 * @csspart start - The container for the start content.
 * @csspart end - The container for the end content.
 * @csspart divider - The draggable divider between start and end.
 * @csspart handle - The visual handle within the divider.
 *
 * @cssstate disabled - Applied when the comparison is disabled.
 * @cssstate dragging - Applied when the divider is being dragged.
 * @cssstate focused - Applied when the divider has focus.
 */
@customElement('quiet-comparison')
export class QuietComparison extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);
  private dragHandler?: DraggableElement;
  private dragStartPosition = 0;
  private dragStartClientX = 0;
  private dragStartClientY = 0;

  @query('#divider') private divider!: HTMLElement;

  @state() isDragging = false;

  /** The position of the divider as a percentage (0-100). */
  @property({ type: Number }) position = 50;

  /** The orientation of the comparison slider, either 'horizontal' or 'vertical'. */
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Disables the comparison component, preventing it from being focused and adjusted. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    this.setupDragging();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('position')) {
      this.style.setProperty('--position', `${clamp(this.position, 0, 100)}%`);
    }

    if (changedProperties.has('isDragging')) {
      this.customStates.set('dragging', this.isDragging);
    }

    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
      this.setupDragging();
    }

    if (changedProperties.has('orientation')) {
      this.setupDragging();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dragHandler?.stop();
  }

  private handleFocus() {
    this.customStates.set('focused', true);
  }

  private handleBlur() {
    this.customStates.set('focused', false);
  }

  private handleKeydown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const isVertical = this.orientation === 'vertical';
    let newPosition = this.position;

    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowLeft':
        if (!isVertical) {
          newPosition = isRtl ? this.position + 5 : this.position - 5;
        }
        break;
      case 'ArrowRight':
        if (!isVertical) {
          newPosition = isRtl ? this.position - 5 : this.position + 5;
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          newPosition = this.position - 5;
        }
        break;
      case 'ArrowDown':
        if (isVertical) {
          newPosition = this.position + 5;
        }
        break;
      case 'Home':
        newPosition = 0;
        break;
      case 'End':
        newPosition = 100;
        break;
      default:
        return; // Exit if it's not a key we handle
    }

    // Clamp the position between 0 and 100
    newPosition = clamp(newPosition, 0, 100);

    // Only update if the position has changed
    if (newPosition !== this.position) {
      event.preventDefault();
      this.position = newPosition;
      this.dispatchEvent(new QuietResizeEvent());
    }
  }

  private setupDragging() {
    this.dragHandler?.stop();

    if (this.disabled) return;

    this.dragHandler = new DraggableElement(this.divider, {
      start: (clientX: number, clientY: number) => {
        this.divider.classList.add('dragging');
        this.dragStartPosition = this.position;
        this.dragStartClientX = clientX;
        this.dragStartClientY = clientY;
        this.customStates.set('dragging', true);
      },
      move: (clientX: number, clientY: number) => {
        const isRtl = this.localize.dir() === 'rtl';
        const rect = this.getBoundingClientRect();
        let deltaPercentage = 0;

        if (this.orientation === 'vertical') {
          const deltaY = clientY - this.dragStartClientY;
          deltaPercentage = (deltaY / rect.height) * 100;
        } else {
          const deltaX = clientX - this.dragStartClientX;
          deltaPercentage = (deltaX / rect.width) * 100;
          // Invert the delta percentage for RTL layouts in horizontal orientation
          if (isRtl) {
            deltaPercentage = -deltaPercentage;
          }
        }

        // Calculate new position
        const newPosition = this.dragStartPosition + deltaPercentage;
        const clampedPosition = clamp(newPosition, 0, 100);

        // Only dispatch event if position actually changed
        if (this.position !== clampedPosition) {
          this.position = clampedPosition;
          this.dispatchEvent(new QuietResizeEvent());
        }
      },
      stop: () => {
        this.divider.classList.remove('dragging');
        this.customStates.set('dragging', false);
      }
    });
  }

  render() {
    const isVertical = this.orientation === 'vertical';

    return html`
      <div id="start" part="start"><slot name="start"></slot></div>
      <div id="end" part="end"><slot name="end"></slot></div>
      <div
        id="divider"
        part="divider"
        class=${classMap({ dragging: this.isDragging, vertical: isVertical })}
        role="slider"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-label=${this.localize.term('visualComparisonSlider')}
        aria-orientation=${isVertical ? 'vertical' : 'horizontal'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${Math.round(this.position)}"
        @keydown=${this.handleKeydown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <div id="handle" part="handle">
          <slot name="handle-icon">
            <quiet-icon library="system" name=${isVertical ? 'grip-horizontal' : 'grip-vertical'} family="filled">
            </quiet-icon>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-comparison': QuietComparison;
  }
}
