import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './copy.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-copy>
 *
 * @summary Copy buttons let you copy arbitrary text to the clipboard.
 * @documentation https://quietui.com/docs/components/copy
 * @status stable
 * @since 1.0
 *
 * @slot - A custom button to use instead of the default.
 *
 * @event quiet-copied - Emitted when the content has been copied. You can inspect `event.detail.text` to see the
 *  content that was copied. Calling `event.preventDefault()` will prevent the feedback from showing.
 * @event quiet-copy-error - Emitted when the browser refuses to allow the content to be copied. You can inspect
 *  `event.detail.error` to see the error that occurred. Calling `event.preventDefault()` will prevent the feedback from
 *  showing.
 *
 * @csspart copy-button - The default copy button, a `<quiet-button>` element.
 * @csspart copy-button__button - The default copy button's exported `button` part.
 * @csspart copy-icon - The default copy icon, a `<quiet-icon>` element.
 * @csspart feedback - The feedback that shows when copying.
 *
 * @dependency quiet-button
 * @dependency quiet-icon
 */
@customElement('quiet-copy')
export class QuietCopy extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('.feedback') private feedback: HTMLSlotElement;

  /** The text content that will be copied to the clipboard. */
  @property() data: string | ClipboardItem[] = '';

  /** The placement of the feedback animation. */
  @property({ attribute: 'feedback-placement', reflect: true }) feedbackPlacement: 'top' | 'bottom' = 'top';

  private async handleClick(event: PointerEvent) {
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

      const copied = this.emit('quiet-copied', {
        cancelable: true,
        detail: {
          text: this.data
        }
      });

      if (!copied.defaultPrevented) {
        this.showFeedback(this.localize.term('copied'));
      }
    } catch (error) {
      const copyError = this.emit('quiet-copy-error', {
        cancelable: true,
        detail: { error }
      });

      if (!copyError.defaultPrevented) {
        this.showFeedback(this.localize.term('error'));
      }
    }
  }

  /** Shows copy feedback with an animation */
  private showFeedback(message: string) {
    this.feedback.textContent = message;
    this.feedback.hidden = false;
    this.feedback.style.left = `calc(50% - ${this.feedback.offsetWidth}px / 2)`;
    this.feedback.classList.add('show');
    this.feedback.addEventListener(
      'animationend',
      () => {
        this.feedback.hidden = true;
        this.feedback.classList.remove('show');
      },
      { once: true }
    );
  }

  render() {
    return html`
      <slot @click=${this.handleClick}>
        <quiet-button
          part="copy-button"
          exportparts="button:copy-button__button"
          variant="text"
          icon-label=${this.localize.term('copyToClipboard')}
        >
          <quiet-icon part="copy-icon" library="system" name="square-2-stack"></quiet-icon>
        </quiet-button>
      </slot>

      <div part="feedback" class="feedback" aria-live="polite" hidden></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-copy': QuietCopy;
  }
}
