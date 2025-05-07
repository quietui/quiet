import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietResizeEvent } from '../../events/resize.js';
import hostStyles from '../../styles/host.styles.js';
import { DraggableElement } from '../../utilities/drag.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './splitter.styles.js';

/**
 * <quiet-splitter>
 *
 * @summary A draggable splitter that separates two panels, allowing users to resize them.
 * @documentation https://quietui.org/docs/components/splitter
 * @status stable
 * @since 1.0
 *
 * @slot start - The content for the primary (start) panel.
 * @slot end - The content for the secondary (end) panel.
 * @slot handle - The draggable handle that separates the panels.
 *
 * @csspart start - The content to show in the first (start) panel.
 * @csspart end - The content to show in the second (end) panel.
 * @csspart divider - The draggable divider that separates the panels.
 * @csspart handle - The visual handle within the divider (only present when not using the `handle` slot).
 *
 * @cssstate disabled - Applied when the splitter is disabled.
 * @cssstate dragging - Applied when the splitter is being dragged.
 * @cssstate focused - Applied when the splitter has focus.
 *
 * @cssproperty [--divider-min-position=0%] - Minimum position of the divider (as a percentage or pixel value).
 * @cssproperty [--divider-max-position=100%] - Maximum position of the divider (as a percentage or pixel value).
 * @cssproperty [--divider-draggable-area=1rem] - The size of the divider's draggable area (can be larger than the
 *  visible area).
 * @cssproperty [--divider-width=0.125rem] - The width of the visual divider.
 */
@customElement('quiet-splitter')
export class QuietSplitter extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);
  private dragHandler?: DraggableElement;
  private lastDispatchedPosition: number | null = null;
  private previousPosition = 50;
  private dragStartPosition = 0;
  private dragStartClientX = 0;
  private dragStartClientY = 0;

  @query('#divider') private divider!: HTMLElement;

  @state() isCollapsed = false;
  @state() isDragging = false;

  /** The current position of the divider as a percentage (0-100). */
  @property({ type: Number }) position = 50;

  /** The orientation of the splitter. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Disables the splitter, preventing it from being focused and resized. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** A space-separated list of percentage snap points, e.g. "25% 50% 75%". */
  @property({ reflect: true }) snap: string = '';

  /** The maximum distance (in pixels) within which the divider will snap to a specified snap point. */
  @property({ attribute: 'snap-threshold', type: Number }) snapThreshold = 10;

  firstUpdated() {
    this.setupDragging();
    this.updateGridTemplate();
    this.updateAriaValue();
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('orientation') || changedProperties.has('snap')) {
      this.updateGridTemplate();
      this.setupDragging();
    }

    if (changedProperties.has('position')) {
      this.updateGridTemplate();
      this.updateAriaValue();
    }

    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('isDragging')) {
      this.customStates.set('dragging', this.isDragging);
    }
  }

  disconnectedCallback() {
    this.dragHandler?.stop();
    super.disconnectedCallback();
  }

  private handleFocus() {
    this.customStates.set('focused', true);
  }

  private handleBlur() {
    this.customStates.set('focused', false);
  }

  private getSnapPoints(): number[] {
    if (!this.snap) return [];
    return this.snap
      .split(' ')
      .map(point => parseFloat(point.replace('%', '')))
      .filter(point => !isNaN(point) && point >= 0 && point <= 100);
  }

  private snapToNearest(position: number): number {
    const snapPoints = this.getSnapPoints();
    if (snapPoints.length === 0) return position;

    const rect = this.getBoundingClientRect();
    const totalSize = this.orientation === 'horizontal' ? rect.width : rect.height;
    const positionInPixels = (position / 100) * totalSize;

    // Find the closest snap point within the pixel threshold
    for (const snapPoint of snapPoints) {
      const snapPointInPixels = (snapPoint / 100) * totalSize;
      if (Math.abs(positionInPixels - snapPointInPixels) <= this.snapThreshold) {
        return snapPoint;
      }
    }
    return position; // Return original position if no snap point is within threshold
  }

  private getDividerConstraint(value: string, totalSize: number, isMin: boolean): number {
    if (!value) return isMin ? 0 : 100;
    if (value.endsWith('%')) {
      return parseFloat(value.replace('%', ''));
    } else if (value.endsWith('px')) {
      const pixels = parseFloat(value.replace('px', ''));
      return (pixels / totalSize) * 100;
    }
    return isMin ? 0 : 100; // Fallback
  }

  private clampPosition(position: number): number {
    const rect = this.getBoundingClientRect();
    const totalSize = this.orientation === 'horizontal' ? rect.width : rect.height;
    const minPosition = this.getDividerConstraint(
      getComputedStyle(this).getPropertyValue('--divider-min-position'),
      totalSize,
      true
    );
    const maxPosition = this.getDividerConstraint(
      getComputedStyle(this).getPropertyValue('--divider-max-position'),
      totalSize,
      false
    );
    return Math.max(minPosition, Math.min(maxPosition, position));
  }

  private dispatchResizeEvent() {
    // Only dispatch if the position has changed from the last dispatched value and it's not a programmatic change
    if (this.position !== this.lastDispatchedPosition && !this.hasUpdated) {
      this.dispatchEvent(new QuietResizeEvent());
      this.lastDispatchedPosition = this.position;
    }
  }

  private setupDragging() {
    this.dragHandler?.stop();

    if (this.disabled) return;

    this.dragHandler = new DraggableElement(this.divider, {
      start: (clientX: number, clientY: number) => {
        this.isDragging = true;
        this.dragStartPosition = this.position;
        this.dragStartClientX = clientX;
        this.dragStartClientY = clientY;
        this.customStates.set('dragging', true);
      },
      move: (clientX: number, clientY: number) => {
        const isRtl = this.localize.dir() === 'rtl';
        const rect = this.getBoundingClientRect();
        let deltaPercentage: number;

        if (this.orientation === 'horizontal') {
          const deltaX = clientX - this.dragStartClientX;
          deltaPercentage = (deltaX / rect.width) * 100 * (isRtl ? -1 : 1);
        } else {
          const deltaY = clientY - this.dragStartClientY;
          deltaPercentage = (deltaY / rect.height) * 100;
        }

        const newPositionRaw = this.dragStartPosition + deltaPercentage;
        this.position = this.snapToNearest(this.clampPosition(newPositionRaw));

        requestAnimationFrame(() => {
          this.updateGridTemplate();
          this.updateAriaValue();
          this.dispatchResizeEvent();
        });
      },
      stop: () => {
        this.isDragging = false;
        this.customStates.set('dragging', false);
      }
    });
  }

  private updateGridTemplate() {
    if (this.orientation === 'horizontal') {
      this.style.gridTemplateColumns =
        `minmax(0, ${this.position}%) ` + `var(--divider-width, 0.125rem) ` + `minmax(0, ${100 - this.position}%)`;
      this.style.gridTemplateRows = '1fr';
    } else {
      this.style.gridTemplateRows =
        `minmax(0, ${this.position}%) ` + `var(--divider-width, 0.125rem) ` + `minmax(0, ${100 - this.position}%)`;
      this.style.gridTemplateColumns = '1fr';
    }
  }

  private updateAriaValue() {
    this.divider.setAttribute('aria-valuenow', this.position.toString());
  }

  private handleKeydown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const step = 5; // 5% movement per key press
    let newPosition = this.position;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newPosition = Math.max(0, isRtl ? this.position + step : this.position - step);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        newPosition = Math.min(100, isRtl ? this.position - step : this.position + step);
        break;
      case 'Home':
        newPosition = isRtl ? 100 : 0;
        break;
      case 'End':
        newPosition = isRtl ? 0 : 100;
        break;
      case 'Enter':
        if (!this.isCollapsed) {
          this.previousPosition = this.position;
          newPosition = 0;
          this.isCollapsed = true;
        } else {
          newPosition = this.previousPosition;
          this.isCollapsed = false;
        }
        break;
    }

    if (newPosition !== this.position) {
      event.preventDefault();
      this.position = this.clampPosition(newPosition);
      this.updateGridTemplate();
      this.updateAriaValue();
      this.dispatchResizeEvent();
    }
  }

  render() {
    return html`
      <div id="start" part="start">
        <slot name="start"></slot>
      </div>

      <div
        id="divider"
        part="divider"
        class=${classMap({ dragging: this.isDragging })}
        role="separator"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-label=${this.localize.term('resize')}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="50"
        @keydown=${this.handleKeydown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="handle">
          <div id="handle" part="handle"></div>
        </slot>
      </div>

      <div id="end" part="end">
        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-splitter': QuietSplitter;
  }
}
