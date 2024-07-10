import '../button/button.js';
import '../icon/icon.js';
import { animateWithClass } from '../../utilities/animate.js';
import { computePosition, flip } from '@floating-ui/dom';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietCopiedEvent, QuietCopyErrorEvent } from '../../events/copy.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './copy.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-copy>
 *
 * @summary Copy buttons let you copy text and other types of data to the clipboard.
 * @documentation https://quietui.com/docs/components/copy
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-button
 * @dependency quiet-icon
 *
 * @slot - A custom button to use instead of the default.
 *
 * @event quiet-copied - Emitted when the content has been copied. This event does not bubble. You can inspect
 *  `event.detail.data` to see the content that was copied.
 * @event quiet-copy-error - Emitted when the browser refuses to allow the content to be copied. This event does not
 *  bubble. You can inspect `event.detail.error` to see the error that occurred.
 *
 * @csspart copy-button - The default copy button, a `<quiet-button>` element.
 * @csspart copy-button__button - The default copy button's exported `button` part.
 * @csspart copy-icon - The default copy icon, a `<quiet-icon>` element.
 * @csspart copy-icon__svg - The copy icon's `svg` part.
 * @csspart feedback - The feedback that shows when copying.
 */
@customElement('quiet-copy')
export class QuietCopy extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('#feedback') private feedback: HTMLSlotElement;

  /** The text content that will be copied to the clipboard. */
  @property() data: string | ClipboardItem[] = '';

  /** The placement of the feedback animation. */
  @property({ attribute: 'feedback-placement', reflect: true }) feedbackPlacement:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'hidden' = 'top';

  private async handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (typeof this.data === 'string') {
        // Must not be empty
        if (this.data.length === 0) {
          throw new Error('No data was provided to copy');
        }

        // Copy text
        await navigator.clipboard.writeText(this.data);
      } else if (Array.isArray(this.data)) {
        // Clipboard items
        const clipboardItems = this.data.filter(item => item instanceof ClipboardItem);

        // Must be at least one ClipboardItem
        if (clipboardItems.length === 0) {
          throw new Error('No data was provided to copy');
        }

        // Copy clipboard items
        await navigator.clipboard.write(clipboardItems);
      }

      this.dispatchEvent(new QuietCopiedEvent({ data: this.data }));
      this.showFeedback(this.localize.term('copied'));
    } catch (error) {
      this.dispatchEvent(new QuietCopyErrorEvent({ error: error as Error }));
      this.showFeedback(this.localize.term('error'));
    }
  }

  /** Shows copy feedback with an animation */
  private async showFeedback(message: string) {
    if (this.feedbackPlacement === 'hidden') {
      return;
    }

    this.feedback.textContent = message;
    this.feedback.hidden = false;
    this.feedback.showPopover();

    computePosition(this, this.feedback, {
      placement: this.feedbackPlacement,
      middleware: [flip()]
    }).then(({ x, y }) => {
      // Position it
      Object.assign(this.feedback.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });

    await animateWithClass(this.feedback, 'show');
    this.feedback.hidden = true;
    this.feedback.hidePopover();
  }

  render() {
    return html`
      <slot @click=${this.handleClick}>
        <quiet-button
          part="copy-button"
          exportparts="button:copy-button__button"
          appearance="text"
          icon-label=${this.localize.term('copyToClipboard')}
        >
          <quiet-icon part="copy-icon" exportparts="svg:copy-icon__svg" library="system" name="copy"></quiet-icon>
        </quiet-button>
      </slot>

      <div
        id="feedback"
        part="feedback"
        data-placement=${this.feedbackPlacement}
        popover="manual"
        aria-live="polite"
        hidden
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-copy': QuietCopy;
  }
}
