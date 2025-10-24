import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  QuietBeforeCloseEvent,
  QuietBeforeOpenEvent,
  QuietCloseEvent,
  QuietOpenEvent
} from '../../events/open-close.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { createId } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './tooltip.styles.js';

const openTooltips = new Set<QuietTooltip>();

/**
 * <quiet-tooltip>
 *
 * @summary Provides additional information when the user hovers or focuses on an element.
 * @documentation https://quietui.org/docs/components/tooltip
 * @status stable
 * @since 1.0
 *
 * @slot - The tooltip's content. Do not include interactive elements such as button, links, etc. as they won't be
 *  accessible to users inside the tooltip.
 *
 * @event quiet-before-open - Emitted when the tooltip is instructed to open but before it is shown.
 * @event quiet-open - Emitted when the tooltip has opened and the animation has completed.
 * @event quiet-before-close - Emitted when the tooltip is dismissed but before it is hidden.
 * @event quiet-close - Emitted when the tooltip has closed. and the animation has completed.
 *
 * @cssproperty [--arrow-size=0.3125rem] - The size of the arrow. To hide the arrow, use the `without-arrow` attribute.
 * @cssproperty [--max-width=20rem] - The maximum width the tooltip can be before wrapping.
 * @cssproperty [--show-duration=100ms] - The duration of the show/hide animation.
 *
 * @csspart tooltip - The element that powers the tooltip.
 * @csspart content - The element that wraps the tooltip's content.
 * @csspart arrow - The tooltip's arrow. To change the arrow's size, use `--arrow-size` instead.
 *
 * @cssstate open - Applied when the tooltip is open.
 */
@customElement('quiet-tooltip')
export class QuietTooltip extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private anchor: Element | null;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private hoverInTimeout: ReturnType<typeof setTimeout> | undefined;
  private hoverOutTimeout: ReturnType<typeof setTimeout> | undefined;
  private isAnchorFocused = false;

  @query('#arrow') private arrow: HTMLElement;
  @query('#polygon') private polygon: HTMLElement;
  @query('#tooltip') private tooltip: HTMLElement;

  /**
   * The ID of the tooltip's anchor element. This must be an interactive/focusable element such as a button and it must
   * be in the same document as the tooltip.
   */
  @property({ reflect: true }) for: string;

  /** Shows or hides the tooltip. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The placement of the tooltip in reference to the anchor. The menu will shift to a more optimal location if the
   * preferred placement doesn't have enough room.
   */
  @property({ reflect: true }) placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /** The distance of the tooltip from its anchor. */
  @property({ type: Number }) distance = 8;

  /** The offset of the tooltip along its trigger. */
  @property({ type: Number }) offset = 0;

  /** The number of milliseconds to wait before opening the tooltip when hovering in. */
  @property({ attribute: 'open-delay', type: Number }) openDelay = 50;

  /** The number of milliseconds to wait before closing the tooltip when hovering out. */
  @property({ attribute: 'close-delay', type: Number }) closeDelay = 100;

  /**
   * By default, the tooltip automatically shows when the user focuses or hovers over the anchor. If you want to control
   * the tooltip programmatically, set this to `manual`.
   */
  @property() activation: 'auto' | 'manual' = 'auto';

  /** Renders the tooltip without an arrow. */
  @property({ attribute: 'without-arrow', type: Boolean, reflect: true }) withoutArrow = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.hoverInTimeout);
    clearInterval(this.hoverOutTimeout);
  }

  firstUpdated() {
    // Make sure the host element has an id
    if (!this.id) {
      this.id = createId('quiet-tooltip-');
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle open
    if (changedProperties.has('open')) {
      if (this.open && !this.tooltip.classList.contains('visible')) {
        this.show();
      } else {
        this.hide();
      }
    }

    // Handle anchor changes
    if (changedProperties.has('for') || changedProperties.has('activation')) {
      const root = this.getRootNode() as Document | ShadowRoot;

      // Tear down the old anchor
      if (this.anchor) {
        this.anchor.removeAttribute('aria-describedby');
        this.anchor.removeEventListener('pointerenter', this.handleAnchorPointerEnter);
        this.anchor.removeEventListener('pointerleave', this.handleAnchorPointerLeave);
        this.anchor.removeEventListener('pointerup', this.handleAnchorPointerUp);
        this.anchor.removeEventListener('focus', this.handleAnchorFocus);
        this.anchor.removeEventListener('blur', this.handleAnchorBlur);
      }

      // Setup the new anchor
      this.anchor = this.for ? root.getElementById(this.for) : null;

      if (this.anchor) {
        if (this.activation === 'auto') {
          this.anchor.addEventListener('pointerenter', this.handleAnchorPointerEnter);
          this.anchor.addEventListener('pointerleave', this.handleAnchorPointerLeave);
          this.anchor.addEventListener('pointerup', this.handleAnchorPointerUp);
          this.anchor.addEventListener('focus', this.handleAnchorFocus);
          this.anchor.addEventListener('blur', this.handleAnchorBlur);
        }

        if (this.anchor.localName === 'quiet-button') {
          //
          // Until we have something like cross root aria delegation, we need to treat <quiet-button> elements a bit
          // differently. Focus is delegated to the internal <button> and, because of that, screen readers don't
          // announce the tooltip.
          //
          // We *could* use aria-live="polite" as a stopgap, but that can't be re-read by screen readers, it interrupts
          // other content, and it tends to be read twice in Chrome.
          //
          // Instead, the current approach copies the tooltip's text content into the internal button's aria-description
          // attribute to get a reasonably similar result. In this case, we also remove the tooltip role from the host
          // element and apply aria-hidden="true" to prevent it from reading twice. We call this a "faux tooltip."
          //
          this.removeAttribute('role');
          this.setAttribute('aria-hidden', 'true');
          this.anchor.removeAttribute('aria-describedby');
        } else {
          // Use the normal tooltip role and aria-describedby for other elements
          this.setAttribute('role', 'tooltip');
          this.removeAttribute('aria-hidden');
          this.anchor?.setAttribute('aria-describedby', this.id);
        }
      } else if (this.for) {
        // If `for` is provided and the element isn't found, show a warning
        console.warn(
          `A tooltip was assigned to an element with an ID of "${this.for}" but the element could not be found.`,
          this
        );
      }
    }
  }

  /** Shows the tooltip. This should only be called from within updated(). */
  private async show() {
    if (!this.anchor) {
      return;
    }

    const openEvent = new QuietBeforeOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    // Insert faux tooltip
    if (this.anchor?.localName === 'quiet-button') {
      const button = this.anchor.shadowRoot!.querySelector('[part~="button"]');
      button?.setAttribute('aria-description', String(this.textContent));
    }

    // Close other non-manual tooltips that are open
    openTooltips.forEach(tooltip => {
      if (tooltip.activation !== 'manual') {
        tooltip.open = false;
      }
    });

    // Stop here if it's not connected
    if (!this.tooltip.isConnected) return;

    this.tooltip.showPopover();
    this.customStates.set('open', true);
    this.open = true;
    openTooltips.add(this);

    if (this.activation === 'auto') {
      document.addEventListener('keydown', this.handleDocumentKeyDown);
      document.addEventListener('pointermove', this.handleDocumentPointerMove);
    }

    this.tooltip.classList.add('visible');
    this.cleanup = autoUpdate(this.anchor, this.tooltip, () => this.reposition());
    await animateWithClass(this.tooltip, 'show');
    this.dispatchEvent(new QuietOpenEvent());
  }

  /** Hides the tooltip. This should only be called from within updated(). */
  private async hide() {
    const closeEvent = new QuietBeforeCloseEvent({ source: this });
    this.dispatchEvent(closeEvent);
    if (closeEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    // Cleanup faux tooltips
    if (this.anchor?.localName === 'quiet-button') {
      const button = this.anchor.shadowRoot!.querySelector('[part~="button"]');
      button?.removeAttribute('aria-description');
    }

    this.customStates.set('open', false);
    this.open = false;
    openTooltips.delete(this);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('pointermove', this.handleDocumentPointerMove);

    if (this.tooltip.classList.contains('visible')) {
      await animateWithClass(this.tooltip, 'hide');
      this.tooltip.classList.remove('visible');
      this.tooltip.hidePopover();
      this.dispatchEvent(new QuietCloseEvent());
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
      this.removeAttribute('data-placement');
    }
  }

  /** Called when the user manually dismisses the tooltip by clicking or pressing escape. */
  private userDismiss() {
    if (this.open) {
      this.isAnchorFocused = false;
      this.open = false;
    }
  }

  /** @internal Repositions the tooltip */
  public reposition() {
    if (!this.anchor) return;

    computePosition(this.anchor, this.tooltip, {
      placement: this.placement,
      middleware: [
        offset({ mainAxis: this.distance, crossAxis: this.offset }),
        flip(),
        shift(),
        arrow({ element: this.arrow })
      ]
    }).then(({ x, y, middlewareData, placement }) => {
      // Set the determined placement for users to hook into and for transform origin styles
      this.setAttribute('data-placement', placement);

      // Position it
      Object.assign(this.tooltip.style, {
        left: `${x}px`,
        top: `${y}px`
      });

      // Position the arrow
      if (middlewareData.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]]!;

        Object.assign(this.arrow.style, {
          left: typeof arrowX === 'number' ? `${arrowX}px` : '',
          top: typeof arrowY === 'number' ? `${arrowY}px` : '',
          [staticSide]: 'calc(var(--arrow-diagonal-size) * -1)'
        });
      }
    });

    // Wait for the browser to paint the updates, then set the safe polygon's coordinates
    requestAnimationFrame(() => {
      if (!this.anchor) return;

      const anchorCoords = this.anchor.getBoundingClientRect();
      const tooltipCoords = this.tooltip.getBoundingClientRect();
      const isVertical = this.placement.includes('top') || this.placement.includes('bottom');

      if (isVertical) {
        const topEl = anchorCoords.top < tooltipCoords.top ? anchorCoords : tooltipCoords;
        const bottomEl = anchorCoords.top < tooltipCoords.top ? tooltipCoords : anchorCoords;

        this.polygon.style.setProperty('--polygon-x1', `${topEl.left}px`);
        this.polygon.style.setProperty('--polygon-y1', `${topEl.bottom}px`);
        this.polygon.style.setProperty('--polygon-x2', `${topEl.right}px`);
        this.polygon.style.setProperty('--polygon-y2', `${topEl.bottom}px`);
        this.polygon.style.setProperty('--polygon-x3', `${bottomEl.right}px`);
        this.polygon.style.setProperty('--polygon-y3', `${bottomEl.top}px`);
        this.polygon.style.setProperty('--polygon-x4', `${bottomEl.left}px`);
        this.polygon.style.setProperty('--polygon-y4', `${bottomEl.top}px`);
      } else {
        const leftEl = anchorCoords.left < tooltipCoords.left ? anchorCoords : tooltipCoords;
        const rightEl = anchorCoords.left < tooltipCoords.left ? tooltipCoords : anchorCoords;

        this.polygon.style.setProperty('--polygon-x1', `${leftEl.right}px`);
        this.polygon.style.setProperty('--polygon-y1', `${leftEl.top}px`);
        this.polygon.style.setProperty('--polygon-x2', `${rightEl.left}px`);
        this.polygon.style.setProperty('--polygon-y2', `${rightEl.top}px`);
        this.polygon.style.setProperty('--polygon-x3', `${rightEl.left}px`);
        this.polygon.style.setProperty('--polygon-y3', `${rightEl.bottom}px`);
        this.polygon.style.setProperty('--polygon-x4', `${leftEl.right}px`);
        this.polygon.style.setProperty('--polygon-y4', `${leftEl.bottom}px`);
      }
    });
  }

  /** When the anchor loses focus, hide the tooltip. */
  private handleAnchorBlur = () => {
    this.isAnchorFocused = false;
    this.open = false;
  };

  /** When the anchor receives focus, show the tooltip. */
  private handleAnchorFocus = () => {
    this.isAnchorFocused = true;
    this.open = true;
  };

  /** When the anchor is clicked, dismiss the tooltip. */
  private handleAnchorPointerUp = () => {
    this.userDismiss();
  };

  /** When the pointer enters the anchor. */
  private handleAnchorPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;

    if (!this.hoverInTimeout) {
      this.hoverInTimeout = setTimeout(() => {
        this.hoverInTimeout = undefined;
        this.open = true;
      }, this.openDelay);
    }
  };

  /** When the pointer leaves the anchor. */
  private handleAnchorPointerLeave = () => {
    clearTimeout(this.hoverInTimeout);
    this.hoverInTimeout = undefined;
  };

  /** When the pointer moves while the tooltip is visible. */
  private handleDocumentPointerMove = (event: PointerEvent) => {
    if (!this.anchor || this.isAnchorFocused) return;

    const isHoveringAnchor = event.composedPath().includes(this.anchor);
    const isHoveringTooltip = event.composedPath().includes(this.tooltip);

    // If we're hovering over the anchor/tooltip, keep it open
    if (isHoveringAnchor || isHoveringTooltip) {
      clearTimeout(this.hoverOutTimeout);
      this.hoverOutTimeout = undefined;
      return;
    }

    // If we've moved outside the anchor/tooltip, close it
    if (!this.hoverOutTimeout) {
      this.hoverOutTimeout = setTimeout(() => {
        this.hoverOutTimeout = undefined;
        this.open = false;
      }, this.closeDelay);
    }
  };

  /** When a key is pressed when the tooltip is open. */
  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Hide the tooltip when escape is pressed
    if (event.key === 'Escape') {
      this.userDismiss();
    }
  };

  render() {
    return html`
      <div id="tooltip" part="tooltip" popover="manual">
        <div id="content" part="content">
          <slot></slot>
        </div>
        <div id="arrow" part="arrow" role="presentation" ?hidden=${this.withoutArrow}></div>
        <div id="polygon" role="presentation"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-tooltip': QuietTooltip;
  }
}
