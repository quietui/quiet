// splitter.ts
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
 * @slot divider - The draggable divider that separates the panels (default is a colored line).
 *
 * @cssproperty [--divider-width=0.125rem] - The width of the visual divider (horizontal orientation) or height (vertical orientation).
 * @cssproperty [--divider-handle-size=1rem] - The size of the draggable handle area surrounding the divider.
 * @cssproperty [--divider-color=var(--quiet-neutral-stroke-soft)] - The color of the divider.
 * @cssproperty [--quiet-border-radius] - The border radius of the splitter container.
 * @cssproperty [--quiet-border-style] - The border style of the splitter container.
 * @cssproperty [--quiet-border-width] - The border width of the splitter container.
 * @cssproperty [--quiet-neutral-stroke-soft] - The border color of the splitter container.
 */
@customElement('quiet-splitter')
export class QuietSplitter extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);
  private dragHandler?: DraggableElement;
  private position = 50; // Percentage position of divider (0-100)
  private isCollapsed = false;
  private previousPosition = 50;
  private dragStartPosition = 0;
  private dragStartClientX = 0;
  private dragStartClientY = 0;

  @query('#divider') private divider!: HTMLElement;
  @query('#start') private startPanel!: HTMLElement;
  @query('#end') private endPanel!: HTMLElement;

  /** The orientation of the splitter. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('orientation')) {
      this.updateGridTemplate();
      this.setupDragging();
    }
  }

  firstUpdated() {
    this.setupDragging();
    this.updateGridTemplate();
    this.updateAriaValue();
  }

  disconnectedCallback() {
    this.dragHandler?.stop();
    super.disconnectedCallback();
  }

  private setupDragging() {
    this.dragHandler?.stop();

    this.dragHandler = new DraggableElement(this.divider, {
      start: (clientX: number, clientY: number) => {
        this.divider.classList.add('dragging');
        this.dragStartPosition = this.position;
        this.dragStartClientX = clientX;
        this.dragStartClientY = clientY;
      },
      move: (clientX: number, clientY: number) => {
        const rect = this.getBoundingClientRect();
        let deltaPercentage: number;

        if (this.orientation === 'horizontal') {
          const deltaX = clientX - this.dragStartClientX;
          deltaPercentage = (deltaX / rect.width) * 100;
        } else {
          const deltaY = clientY - this.dragStartClientY;
          deltaPercentage = (deltaY / rect.height) * 100;
        }

        const newPosition = Math.max(0, Math.min(100, this.dragStartPosition + deltaPercentage));
        this.position = newPosition;

        requestAnimationFrame(() => {
          this.updateGridTemplate();
          this.updateAriaValue();
        });
      },
      stop: () => {
        this.divider.classList.remove('dragging');
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
    const step = 5; // 5% movement per key press
    let newPosition = this.position;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newPosition = Math.max(0, this.position - step);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        newPosition = Math.min(100, this.position + step);
        break;
      case 'Home':
        newPosition = 0;
        break;
      case 'End':
        newPosition = 100;
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
      this.position = newPosition;
      this.updateGridTemplate();
      this.updateAriaValue();
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
        role="separator"
        tabindex="0"
        aria-label=${this.localize.term('resize')}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="50"
        @keydown=${this.handleKeydown}
      >
        <slot name="divider"></slot>
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
