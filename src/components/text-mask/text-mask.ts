import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './text-mask.styles.js';

/**
 * <quiet-text-mask>
 *
 * @summary Applies text as a mask over an image, creating visually stylized characters.
 * @documentation https://quietui.org/docs/components/text-mask
 * @status stable
 * @since 1.0
 *
 * @slot - The text to be masked.
 *
 * @cssproperty --brightness - Adjusts the brightness of the mask image (0-200%, where 100% is normal)
 * @cssproperty --contrast - Adjusts the contrast of the mask image (0-200%, where 100% is normal)
 * @cssproperty --grayscale - Converts the mask to grayscale (0-100%, where 0% is normal and 100% is fully grayscale)
 * @cssproperty --hue-rotate - Rotates the hue of the mask (0-360deg)
 */
@customElement('quiet-text-mask')
export class QuietTextMask extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The URL of the image to use for the mask. */
  @property() image = '';

  /** Creates a parallax-like effect where the image stays fixed while scrolling */
  @property({ type: Boolean, reflect: true }) fixed = false;

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

    // Set the background image
    if (changedProperties.has('image')) {
      this.style.backgroundImage = `url(${this.image})`;
    }
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
