import { animateWithClass } from '../../utilities/animate.js';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { createId } from '../../utilities/math.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietClosedEvent, QuietCloseEvent, QuietOpenedEvent, QuietOpenEvent } from '../../events/open-close.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './popover.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietButton } from '../button/button.js';

const openPopovers = new Set<QuietPopover>();

/**
 * <quiet-popover>
 *
 * @summary Popovers provide additional information or functionality without interrupting the flow of content.
 * @documentation https://quietui.com/docs/components/popover
 * @status stable
 * @since 1.0
 *
 * @slot - The popover's content. Do not include interactive elements such as button, links, etc. as they won't be
 *  accessible to users inside the popover.
 *
 * @event quiet-open - Emitted when the popover is instructed to open but before it is shown.
 * @event quiet-opened - Emitted when the popover has opened and the animation has completed.
 * @event quiet-close - Emitted when the popover is dismissed but before it is hidden.
 * @event quiet-closed - Emitted when the popover has closed. and the animation has completed.
 *
 * @csspart dialog - The element that powers the popover, a `<dialog>` element.
 * @csspart content - The element that wraps the popover's content.
 * @csspart arrow - The popover's arrow. To change the arrow's size, use `--arrow-size` instead.
 *
 * @cssstate open - Applied when the popover is open.
 *
 * @cssproperty [--arrow-size=0.3125rem] - The size of the arrow. Set this to `0` to hide the arrow.
 * @cssproperty [--max-width=25rem] - The maximum width the popover be before wrapping.
 * @cssproperty [--show-duration=100ms] - The duration of the show/hide animation.
 */
@customElement('quiet-popover')
export class QuietPopover extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private anchor: HTMLElement | null;

  @query('#arrow') private arrow: HTMLElement;
  @query('#dialog') private dialog: HTMLDialogElement;

  /**
   * The id of of popover's anchor element. This must be an interactive/focusable element such as a button and it must
   * be in the same document as the popover.
   */
  @property({ reflect: true }) for: string;

  /**
   * Shows or hides the popover.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The placement of the popover in reference to the anchor. The menu will shift to a more optimal location if the
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

  /** The distance of the popover from its anchor. */
  @property({ type: Number }) distance = 8;

  firstUpdated() {
    // Make sure the host element has an id
    if (!this.id) {
      this.id = createId('quiet-popover-');
    }
  }

  updated(changedProps: Map<string, unknown>) {
    // Handle open
    if (changedProps.has('open')) {
      if (this.open && !this.dialog.classList.contains('visible')) {
        this.show();
      } else {
        this.hide();
      }
    }

    // Handle anchor changes
    if (changedProps.has('for')) {
      const root = this.getRootNode() as Document | ShadowRoot;
      // Tear down the old anchor
      if (this.anchor) {
        this.anchor.removeEventListener('click', this.handleAnchorClick);
      }

      // Setup the new anchor
      this.anchor = this.for ? root.querySelector(`#${this.for}`) : null;

      if (this.anchor) {
        this.anchor.addEventListener('click', this.handleAnchorClick);

        // Add aria-haspopup="dialog" to the corresponding button
        if (this.anchor.localName === 'quiet-button') {
          customElements.whenDefined('quiet-button').then(() => {
            (this.anchor as QuietButton).updateComplete.then(() => {
              const nativeButton = this.anchor!.shadowRoot!.querySelector('button');
              nativeButton?.setAttribute('aria-haspopup', 'dialog');
            });
          });
        } else {
          this.anchor.setAttribute('aria-haspopup', 'dialog');
        }
      } else if (this.for) {
        // If `for` is provided and the element isn't found, show a warning
        console.warn(
          `A popover was assigned to to an element with an id of "${this.for}" but the element could not be found.`,
          this
        );
      }
    }
  }

  private handleAnchorClick = () => {
    // Clicks on the anchor should toggle the popover
    this.open = !this.open;
  };

  private handleDialogClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-popover="close"]');

    // Watch for [data-popover="close"] clicks
    if (button) {
      event.stopPropagation();
      this.open = false;
    }
  }

  /** When a key is pressed when the popover is open. */
  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Hide the popover when escape is pressed
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      this.anchor?.focus();
    }
  };

  private handleDocumentClick = (event: PointerEvent) => {
    const target = event.target as HTMLElement;

    // Ignore clicks on the anchor so it will be closed by the anchor's click handler
    if (this.anchor && event.composedPath().includes(this.anchor)) {
      return;
    }

    // Detect when clicks occur outside the popover
    if (target.closest('quiet-popover') !== this) {
      this.open = false;
    }
  };

  /** Shows the popover. This should only be called from within updated(). */
  private async show() {
    if (!this.anchor) {
      return;
    }

    const openEvent = new QuietOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    // Close other popovers that are open
    openPopovers.forEach(popover => (popover.open = false));

    this.dialog.showPopover();
    this.customStates.set('open', true);
    this.open = true;
    openPopovers.add(this);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('click', this.handleDocumentClick);
    this.dialog.classList.add('visible');
    this.cleanup = autoUpdate(this.anchor, this.dialog, () => this.reposition());

    // Autofocus in <dialog> seems to work inconsistently across browsers, so we look for the first element with the
    // attribute and set focus as soon as the dialog is visible.
    requestAnimationFrame(() => {
      const autofocusEl = this.querySelector<HTMLButtonElement>('[autofocus]');
      if (autofocusEl && typeof autofocusEl.focus === 'function') {
        autofocusEl.focus();
      } else {
        // Fall back to setting focus on the dialog
        this.dialog.focus();
      }
    });

    await animateWithClass(this.dialog, 'show');
    this.dispatchEvent(new QuietOpenedEvent());
  }

  /** Hides the popover. This should only be called from within updated(). */
  private async hide() {
    const closeEvent = new QuietCloseEvent({ source: this });
    this.dispatchEvent(closeEvent);
    if (closeEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    this.customStates.set('open', false);
    this.open = false;
    openPopovers.delete(this);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('click', this.handleDocumentClick);

    if (this.dialog.classList.contains('visible')) {
      await animateWithClass(this.dialog, 'hide');
      this.dialog.classList.remove('visible');
      this.dialog.hidePopover();
      this.dispatchEvent(new QuietClosedEvent());
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
      this.removeAttribute('data-placement');
    }
  }

  /** Repositions the popover */
  private reposition() {
    if (!this.anchor) return;

    computePosition(this.anchor, this.dialog, {
      placement: this.placement,
      middleware: [offset({ mainAxis: this.distance }), flip(), shift(), arrow({ element: this.arrow })]
    }).then(({ x, y, middlewareData, placement }) => {
      // Set the determined placement for users to hook into and for transform origin styles
      this.setAttribute('data-placement', placement);

      // Position it
      Object.assign(this.dialog.style, {
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
  }

  render() {
    return html`
      <dialog id="dialog" part="dialog" popover="manual" @click=${this.handleDialogClick}>
        <div id="content" part="content">
          <slot></slot>
        </div>
        <div id="arrow" part="arrow" role="presentation"></div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-popover': QuietPopover;
  }
}
