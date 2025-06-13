import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './divider.styles.js';

/**
 * <quiet-divider>
 *
 * @summary Separates and groups content visually.
 * @documentation https://quietui.org/docs/components/divider
 * @status stable
 * @since 1.0
 *
 * @slot symbol - Optional text or a symbol to show in the center of the divider.
 *
 * @cssproperty [--color=var(--quiet-neutral-stroke-soft)] - The color of the divider.
 * @cssproperty [--spacing=1rem] - The spacing around the divider.
 * @cssproperty [--thickness=var(--quiet-border-width)] - The thickness of the divider.
 *
 * @csspart symbol - The container that wraps the slotted symbol or icon.
 */
@customElement('quiet-divider')
export class QuietDivider extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Sets the divider's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  firstUpdated() {
    this.setAttribute('role', 'separator');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation === 'vertical' ? 'vertical' : 'horizontal');
    }
  }

  render() {
    return html`
      <div class="line"></div>
      ${this.whenSlotted(
        'symbol',
        html`
          <div part="symbol" class="symbol" aria-hidden="true">
            <slot name="symbol"></slot>
          </div>
        `
      )}
      <div class="line"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-divider': QuietDivider;
  }
}
