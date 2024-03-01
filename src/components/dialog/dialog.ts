import { animateWithClass } from '../../utilities/animate.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './dialog.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-dialog>
 *
 * @summary Dialogs display a modal for alerts, confirmations, or other important interactions that require immediate
 *  attention from the user.
 * @documentation https://quietui.com/docs/components/dialog
 * @status stable
 * @since 1.0
 *
 * @slot - Content to place in the dialog's body.
 * @slot header - Content to place in the dialog's header.
 * @slot actions - Slot in one or more text buttons to customize the actions that appear in the dialog's header.
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
 * @csspart body - The container that wraps the dialog's body.
 * @csspart header - The container that wraps the dialog's header. A flex container, by default.
 * @csspart footer - The container that wraps the dialog's footer. A flex container, by default.
 *
 * @cssproperty [--show-duration=200ms] - The duration of the show/hide animation.
 * @cssproperty [--spacing=1.5rem] - The spacing to use throughout the dialog.
 * @cssproperty [--width=30rem] - The default width of the dialog. Note that the dialog will shrink to fit as necessary.
 */
@customElement('quiet-dialog')
export class Dialog extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('dialog') dialog: HTMLDialogElement;

  /** Opens or closes the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Renders the dialog with the `header` slot. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the dialog with the `footer` slot. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

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

  /** Call this to show the dialog. */
  private async show() {
    const openEvent = this.emit('quiet-open', { cancelable: true });

    if (openEvent.defaultPrevented) {
      return;
    }

    this.dialog.showModal();
    await animateWithClass(this.dialog, 'show');
    this.emit('quiet-opened');
  }

  /** Call this to ask the dialog to close. */
  private async requestClose(source: Element) {
    const dismissEvent = this.emit('quiet-close', {
      cancelable: true,
      detail: { source }
    });

    if (dismissEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.dialog, 'shake');
    } else {
      await animateWithClass(this.dialog, 'hide');
      this.dialog.close();
      this.open = false;
      this.emit('quiet-closed');
    }
  }

  render() {
    return html`
      <dialog class="dialog" @click=${this.handleDialogClick} @cancel=${this.handleDialogCancel}>
        ${this.withHeader
          ? html`
              <header part="header" class="header">
                <slot name="header"></slot>
                <slot name="actions" class="actions">
                  <quiet-button slot="header" variant="text" icon-label="Close" data-dialog="dismiss">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
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

      <div class="overlay"></div>
    `;
  }
}
