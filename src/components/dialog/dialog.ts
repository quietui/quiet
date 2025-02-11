import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietClosedEvent, QuietCloseEvent, QuietOpenedEvent, QuietOpenEvent } from '../../events/open-close.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { Localize } from '../../utilities/localize.js';
import { parseSpaceDelimitedTokens } from '../../utilities/parse.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { lockScrolling, unlockScrolling } from '../../utilities/scroll.js';
import styles from './dialog.styles.js';

/**
 * <quiet-dialog>
 *
 * @summary Dialogs display modal content for alerts, confirmations, configurations, and other important interactions
 *  that require immediate attention.
 * @documentation https://quietui.org/docs/components/dialog
 * @status stable
 * @since 1.0
 *
 * @slot - Content to place in the dialog's body. Note that, due to [this Chrome bug](https://issues.chromium.org/issues/40800208),
 *  you should wrap text nodes in an element to allow text selection in that browser.
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
 * @cssproperty [--height=fit-content] - The default height of the dialog. Note that dialogs shrink to fit as necessary.
 * @cssproperty [--show-duration=200ms] - The duration of the show/hide animation.
 * @cssproperty [--spacing=1.5rem] - The spacing to use throughout the dialog.
 * @cssproperty [--width=30rem] - The default width of the dialog. Note that dialogs shrink to fit as necessary.
 *
 * @csspart dialog - The internal `<dialog>` element.
 * @csspart body - The container that wraps the dialog's body.
 * @csspart header - The container that wraps the dialog's header. A flex container, by default.
 * @csspart footer - The container that wraps the dialog's footer. A flex container, by default.
 *
 * @cssstate open - Applied when the dialog is open.
 */
@customElement('quiet-dialog')
export class QuietDialog extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#body') private body: HTMLElement;
  @query('#dialog') private dialog: HTMLDialogElement;

  /** Opens or closes the dialog. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * By default, the dialog will appear in the center of the screen. Changing the placement will cause the dialog to
   * slide in from the side of the screen like a drawer.
   */
  @property({ reflect: true }) placement: 'center' | 'top' | 'bottom' | 'start' | 'end' = 'center';

  /** Allows the dialog to be closed when clicking outside of it. */
  @property({ attribute: 'light-dismiss', type: Boolean }) lightDismiss = false;

  /** For dialogs that scroll, this will reset the scroll position when the dialog closes. */
  @property({ attribute: 'reset-scroll', type: Boolean }) resetScroll = false;

  updated(changedProperties: PropertyValues<this>) {
    // Open or close the dialog
    if (changedProperties.has('open')) {
      if (this.open && !this.dialog.open) {
        this.show();
      } else if (this.dialog.open) {
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

  private handleDialogClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-dialog="close"]');

    // Watch for [data-dialog="close"] clicks
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

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Pressing escape will close the dialog, so let's prevent that here and map it to requestClose
    if (event.key === 'Escape') {
      event.preventDefault();
      this.requestClose(this);
    }
  };

  /** Call this to show the dialog. */
  private async show() {
    const openEvent = new QuietOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      return;
    }

    document.addEventListener('keydown', this.handleDocumentKeyDown);
    lockScrolling(this.dialog);
    this.dialog.showModal();
    this.customStates.set('open', true);

    // Autofocus in <dialog> seems to work inconsistently across browsers, so we look for the first element with the
    // attribute and set focus as soon as the dialog is visible.
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector<HTMLButtonElement>('[autofocus]');
      if (elementToFocus && typeof elementToFocus.focus === 'function') {
        elementToFocus.focus();
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
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      unlockScrolling(this.dialog);
      await animateWithClass(this.dialog, 'hide');

      // Reset the dialog body's scroll position
      if (this.resetScroll) {
        this.scrollBodyTo({ top: 0, left: 0 });
      }

      this.dialog.close();
      this.open = false;
      this.customStates.set('open', false);
      this.dispatchEvent(new QuietClosedEvent());
    }
  }

  /** Scrolls the dialog's body to the specified position. */
  public scrollBodyTo(options: ScrollToOptions) {
    this.body.scrollTo(options);
  }

  render() {
    return html`
      <dialog
        id="dialog"
        part="dialog"
        class=${classMap({
          'has-header': this.slotsWithContent.has('header'),
          'has-footer': this.slotsWithContent.has('footer')
        })}
        data-placement=${this.placement}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
        @cancel=${this.handleDialogCancel}
      >
        ${this.whenSlotted(
          'header',
          html`
            <header id="header" part="header">
              <slot name="header"></slot>
              <slot id="actions" name="actions">
                <quiet-button
                  slot="header"
                  appearance="text"
                  icon-label=${this.localize.term('close')}
                  data-dialog="close"
                >
                  <quiet-icon library="system" name="x"></quiet-icon>
                </quiet-button>
              </slot>
            </header>
          `
        )}

        <div id="body" part="body">
          <slot></slot>
        </div>

        ${this.whenSlotted('footer', html` <footer id="footer" part="footer"><slot name="footer"></slot></footer> `)}
      </dialog>
    `;
  }
}

//
// Watch for data-dialog="open *" clicks
//
document.addEventListener('click', (event: MouseEvent) => {
  const dialogAttrEl = (event.target as Element).closest('[data-dialog]');

  if (dialogAttrEl instanceof Element) {
    const [command, id] = parseSpaceDelimitedTokens(dialogAttrEl.getAttribute('data-dialog') || '');

    if (command === 'open' && id?.length) {
      const doc = dialogAttrEl.getRootNode() as Document | ShadowRoot;
      const dialog = doc.getElementById(id) as QuietDialog;

      if (dialog?.localName === 'quiet-dialog') {
        dialog.open = true;
      } else {
        console.warn(`A dialog with an ID of "${id}" could not be found in this document.`);
      }
    }
  }
});

//
// NOTE: This is required for light dismiss to work in mobile Safari
//  See https://bugs.webkit.org/show_bug.cgi?id=267688
//
// prettier-ignore
document.addEventListener('pointerdown', () => { /* do nothing */ });

declare global {
  interface HTMLElementTagNameMap {
    'quiet-dialog': QuietDialog;
  }
}
