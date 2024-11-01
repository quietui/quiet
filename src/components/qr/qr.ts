import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import QrCreator from 'qr-creator';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './qr.styles.js';

/**
 * <quiet-qr>
 *
 * @summary Generates a QR Code.
 * @documentation https://quietui.com/docs/components/qr
 * @status stable
 * @since 1.0
 */
@customElement('quiet-qr')
export class QuietQr extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('canvas') private canvas: HTMLCanvasElement;

  /** A string of data to encode. URLs, email addresses, and other types of text are fine. */
  @property() data = '';

  /**
   * A descriptive label for assistive devices. This will not be shown, but it will be announced by screen readers. If
   * no label is provided, the raw data will be used instead.
   */
  @property() label = '';

  /**
   * Determines the level of error correction. The values correspond to those in the
   * [QR Code specification](https://www.qrcode.com/en/about/standards.html).
   */
  @property({ attribute: 'error-correction' }) errorCorrection: 'L' | 'M' | 'Q' | 'H' = 'L';

  /** The corner radius of the blocks that make up the QR code. For best results, keep this within 0–0.5. */
  @property({ type: Number }) corners = 0.25;

  /** The size of the resulting code in pixels. In most cases, 128–512 is ideal. */
  @property({ type: Number }) size = 128;

  firstUpdated() {
    this.setAttribute('role', 'img');
  }

  updated(changedProps: Map<string, unknown>) {
    if (
      changedProps.has('data') ||
      changedProps.has('errorCorrection') ||
      changedProps.has('corners') ||
      changedProps.has('size')
    ) {
      this.draw();
    }

    if (changedProps.has('label') || changedProps.has('data')) {
      this.setAttribute('aria-label', this.label || this.data);
    }
  }

  /** Draws the QR code in the canvas. */
  private draw() {
    this.canvas.style.maxWidth = `${this.size}px`;
    this.canvas.style.maxHeight = `${this.size}px`;

    // @ts-expect-error - bad types in dependency
    QrCreator.render(
      {
        text: this.data,
        radius: this.corners,
        ecLevel: this.errorCorrection,
        fill: getComputedStyle(this).color, // get the current text color
        background: null, // always transparent; set background-color on the host element instead
        size: this.size * 2 // we double the size so it's not blurry on high pixel density devices
      },
      this.canvas
    );
  }

  render() {
    return html` <canvas aria-hidden="true" @transitionend=${() => this.draw()}></canvas> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-qr': QuietQr;
  }
}
