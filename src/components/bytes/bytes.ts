import { customElement, property } from 'lit/decorators.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './bytes.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-bytes>
 *
 * @summary Formats an arbitrary number of bytes or bits into a human-readable size.
 * @documentation https://quietui.com/docs/components/bytes
 * @status stable
 * @since 1.0
 */
@customElement('quiet-bytes')
export class QuietBytes extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** The number of bytes to format. */
  @property({ type: Number }) value = 0;

  /** The unit to display. */
  @property() unit: 'byte' | 'bit' = 'byte';

  /** How to display the bytes, e.g. "100 bytes", "100 b", or "100b". */
  @property() display: 'long' | 'short' | 'narrow' = 'narrow';

  render() {
    if (isNaN(this.value)) {
      return '';
    }

    const byteUnits = ['', 'kilo', 'mega', 'giga', 'tera', 'peta'];
    const bitUnits = ['', 'kilo', 'mega', 'giga', 'tera'];
    const prefix = this.unit === 'byte' ? byteUnits : bitUnits;
    const index = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1));
    const unit = prefix[index] + this.unit;
    const unitDisplay = this.display;
    const value = parseFloat((this.value / Math.pow(1000, index)).toPrecision(3));

    return this.localize.number(value, { style: 'unit', unit, unitDisplay });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-bytes': QuietBytes;
  }
}
