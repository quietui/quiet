import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './text-mask.styles.js';

/**
 * <quiet-text-mask>
 *
 * @summary Text masks apply text as a mask over an image, creating visually stylized characters.
 * @documentation https://quietui.org/docs/components/text-mask
 * @status stable
 * @since 1.0.0
 *
 * @slot - The text to be masked.
 */
@customElement('quiet-text-mask')
export class QuietTextMask extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The URL of the image to use for the mask. */
  @property() image = '';

  /** Creates a parallax-like effect where the image stays fixed while scrolling */
  @property({ type: Boolean, reflect: true }) fixed = false;

  /** Adjusts the brightness of the mask image (0-200, where 100 is normal) */
  @property({ type: Number }) brightness = 100;

  /** Adjusts the contrast of the mask image (0-200, where 100 is normal) */
  @property({ type: Number }) contrast = 100;

  /** Converts the mask to grayscale (0-100, where 0 is normal and 100 is fully grayscale) */
  @property({ type: Number }) grayscale = 0;

  /** Rotates the hue of the mask (0-360 degrees) */
  @property({ attribute: 'hue-rotate', type: Number }) hueRotate = 0;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('fixed')) {
      //
      // NOTE: this is a cheap fix to work around this fixed background + text-clip bug:
      //
      //  https://bugzilla.mozilla.org/show_bug.cgi?id=1313757
      //
      // Please login and vote for the bug if you want this to work in Firefox!
      //
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        this.style.backgroundAttachment = 'scroll';
      } else {
        this.style.backgroundAttachment = this.fixed ? 'fixed' : 'scroll';
      }
    }

    if (
      changedProperties.has('image') ||
      changedProperties.has('brightness') ||
      changedProperties.has('contrast') ||
      changedProperties.has('grayscale') ||
      changedProperties.has('hueRotate')
    ) {
      this.updateBackgroundImage();
    }
  }

  private updateBackgroundImage() {
    if (!this.image) return;

    // Set the background image
    this.style.backgroundImage = `url(${this.image})`;

    // Build filter string directly from properties
    const filters = [];
    if (this.brightness !== 100) filters.push(`brightness(${this.brightness}%)`);
    if (this.contrast !== 100) filters.push(`contrast(${this.contrast}%)`);
    if (this.grayscale > 0) filters.push(`grayscale(${this.grayscale}%)`);
    if (this.hueRotate !== 0) filters.push(`hue-rotate(${this.hueRotate}deg)`);

    // Apply filters or clear them
    this.style.filter = filters.length ? filters.join(' ') : '';
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-text-mask': QuietTextMask;
  }
}
