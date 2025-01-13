import { computePosition, flip } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import copyStyles from '../copy/copy.styles.js';
import styles from './share.styles.js';

/**
 * <quiet-share>
 *
 * @summary Share buttons let users share links, files and text via their operating system's share interface.
 * @documentation https://quietui.org/docs/components/share
 * @status stable
 * @since 1.0
 *
 * @slot - A custom button to use instead of the default.
 *
 * @csspart share-button - The default share button, a `<quiet-button>` element.
 * @csspart share-button__button - The default share button's exported `button` part.
 * @csspart share-icon - The default share icon, a `<quiet-icon>` element.
 * @csspart share-icon__svg - The share icon's `svg` part.
 * @csspart feedback - The feedback that shows when copying (e.g. when the Web Share API is unsupported).
 */
@customElement('quiet-share')
export class QuietShare extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, copyStyles, styles];

  private localize = new Localize(this);

  @query('#feedback') private feedback: HTMLElement;

  /**
   * A human-readable label to be shared. This is sometimes ignored by the operating system, but you should usually
   * provide it as a fallback value.
   */
  @property() label: string;

  /** A string of text to be shared. */
  @property() text: string;

  /** A URL to be shares. */
  @property() url: string;

  /**
   * An array of [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) objects to be shared. Property only.
   */
  @property({ type: Array }) files: File[];

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The placement of the feedback animation when falling back to copying. */
  @property({ attribute: 'feedback-placement', reflect: true }) feedbackPlacement:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'hidden' = 'top';

  updated(changedProperties: PropertyValues<this>) {
    // Handle disabled
    if (changedProperties.has('disabled')) {
      // If the user has slotted in a button, sync its disabled state
      const button = this.querySelector('quiet-button, button');
      if (button) {
        (button as HTMLButtonElement).disabled = this.disabled;
      }
    }
  }

  private async handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    try {
      // Normal sharing
      await navigator.share({
        title: this.label,
        text: this.text,
        url: this.url,
        files: this.files
      });
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        // Ignore abort errors, as the user simply canceled the share. Also ignore invalid state errors, which usually
        // means another share operation is still in progress.
        (err.name === 'AbortError' || err.name === 'InvalidStateError')
      ) {
        return;
      }

      // Fallback to copying
      try {
        const textToCopy = this.url || `${this.label}\n\n${this.text}`.trim();
        if (textToCopy.length === 0) {
          throw new Error('No data was provided to share');
        }

        await navigator.clipboard.writeText(textToCopy);
        this.showFeedback(this.localize.term('copied'));
      } catch (err) {
        this.showFeedback(this.localize.term('error'));
      }
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
          part="share-button"
          exportparts="button:share-button__button"
          appearance="text"
          icon-label=${this.localize.term('share')}
          ?disabled=${this.disabled}
        >
          <quiet-icon part="share-icon" exportparts="svg:share-icon__svg" library="system" name="share"></quiet-icon>
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
    'quiet-share': QuietShare;
  }
}
