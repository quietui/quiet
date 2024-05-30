import { animateWithClass } from '../../utilities/animate.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { lockScrolling, unlockScrolling } from '../../utilities/scroll.js';
import { QuietClosedEvent, QuietCloseEvent, QuietOpenedEvent, QuietOpenEvent } from '../../events/open-close.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './dialog.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-dialog>
 *
 * @summary Dialogs display modal content for alerts, confirmations, configurations, and other important interactions
 *  that require immediate attention.
 * @documentation https://quietui.com/docs/components/dialog
 * @status stable
 * @since 1.0
 *
 * @slot - Content to place in the dialog's body.
 * @slot header - Content to place in the dialog's header.
 * @slot actions - Slot in one or more text buttons to customize the actions that appear in the dialog's header. Only
 *  available when the header is enabled.
 * @slot footer - Content to place in the dialog's footer.
 *
 * @event quiet-open - Emitted when the dialog is instructed to open but before it is shown. Calling
 *  `event.preventDefault()` will prevent the dialog from opening.
 * @event quiet-opened - Emitted after the dialog has been opened and the show animation has completed.
 * @event quiet-close - Emitted when the dialog is dismissed. Calling `event.preventDefault()` will prevent the dialog
 *  from closing and show a brief animation.<br><br>You can check `event.detail.source` to see which element triggered
 *  the dialog to close, such as a button. If the source is the dialog itself, the user has pressed [[Escape]] or the
 *  dialog has been closed programmatically.
 * @event quiet-closed - Emitted after the dialog has been closed and the hide animation has completed.
 *
 * @csspart dialog - The internal `<dialog>` element.
 * @csspart body - The container that wraps the dialog's body.
 * @csspart header - The container that wraps the dialog's header. A flex container, by default.
 * @csspart footer - The container that wraps the dialog's footer. A flex container, by default.
 *
 * @cssproperty [--height=fit-content] - The default height of the dialog. Note that dialogs shrink to fit as necessary.
 * @cssproperty [--show-duration=200ms] - The duration of the show/hide animation.
 * @cssproperty [--spacing=1.5rem] - The spacing to use throughout the dialog.
 * @cssproperty [--width=30rem] - The default width of the dialog. Note that dialogs shrink to fit as necessary.
 */
@customElement('quiet-dialog')
export class QuietDialog extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('dialog') private dialog: HTMLDialogElement;

  /** Opens or closes the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * By default, the dialog will appear in the center of the screen. Changing the placement will cause the dialog to
   * slide in from the side of the screen like a drawer.
   */
  @property() placement: 'center' | 'top' | 'bottom' | 'start' | 'end' = 'center';

  /** Renders the dialog with the `header` slot. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the dialog with the `footer` slot. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

  /** Allows the dialog to be closed when clicking outside of it. */
  @property({ attribute: 'light-dismiss', type: Boolean }) lightDismiss = false;

  updated(changedProps: Map<string, unknown>) {
    // Open or close the dialog
    if (changedProps.has('open')) {
      if (this.open && !this.dialog.open) {
        this.show();
      } else if (this.dialog.open) {
        this.open = true;
        this.requestClose(this.dialog);
      }
    }
  }

  private handleDialogCancel(event: Event) {
    event.preventDefault();

    if (!this.dialog.classList.contains('hide')) {
      this.requestClose(this.dialog);
    }
  }

  private handleDialogClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-dialog="dismiss"]');

    // Close when a button with [data-dialog="dismiss"] is clicked
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }

  private handleDialogPointerDown(event: PointerEvent) {
    // Detect when the backdrop is clicked
    if (event.target === this.dialog) {
      if (this.lightDismiss) {
        this.requestClose(this.dialog);
      } else {
        animateWithClass(this.dialog, 'pulse');
      }
    }
  }

  /** Call this to show the dialog. */
  private async show() {
    const openEvent = new QuietOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      return;
    }

    lockScrolling(this.dialog);
    this.dialog.showModal();

    // Autofocus in <dialog> seems to work inconsistently across browsers, so we look for the first element with the
    // attribute and set focus as soon as the dialog is visible.
    requestAnimationFrame(() => {
      const autofocusEl = this.querySelector<HTMLButtonElement>('[autofocus]');
      if (autofocusEl && typeof autofocusEl.focus === 'function') {
        autofocusEl.focus();
      }
    });

    await animateWithClass(this.dialog, 'show');
    this.dispatchEvent(new QuietOpenedEvent());
  }

  /** Call this to ask the dialog to close. */
  private async requestClose(source: Element) {
    const closeEvent = new QuietCloseEvent({ source });
    this.dispatchEvent(closeEvent);

    if (closeEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.dialog, 'shake');
    } else {
      unlockScrolling(this.dialog);
      await animateWithClass(this.dialog, 'hide');
      this.dialog.close();
      this.open = false;
      this.dispatchEvent(new QuietClosedEvent());
    }
  }

  render() {
    return html`
      <dialog
        part="dialog"
        class="dialog"
        data-placement=${this.placement}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
        @cancel=${this.handleDialogCancel}
      >
        ${this.withHeader
          ? html`
              <header part="header" class="header">
                <slot name="header"></slot>
                <slot name="actions" class="actions">
                  <quiet-button
                    slot="header"
                    variant="text"
                    icon-label=${this.localize.term('close')}
                    data-dialog="dismiss"
                  >
                    <quiet-icon library="system" name="x"></quiet-icon>
                  </quiet-button>
                </slot>
              </header>
            `
          : ''}

        <div part="body" class="body">
          <slot></slot>
        </div>

        ${this.withFooter ? html` <footer part="footer" class="footer"><slot name="footer"></slot></footer> ` : ''}
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-dialog': QuietDialog;
  }
}
