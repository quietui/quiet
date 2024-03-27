import { customElement, property } from 'lit/decorators.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './divider.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-divider>
 *
 * @summary Dividers separate and group content visually.
 * @documentation https://quietui.com/docs/components/divider
 * @status stable
 * @since 1.0
 *
 * @cssproperty [--color=var(--quiet-neutral-stroke-soft)] - The color of the divider.
 * @cssproperty [--spacing=1rem] - The spacing around the divider.
 * @cssproperty [--thickness=var(--quiet-border-width)] - The thickness of the divider.
 */
@customElement('quiet-divider')
export class QuietDivider extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Sets the divider's orientation. */
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation === 'vertical' ? 'vertical' : 'horizontal');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-divider': QuietDivider;
  }
}
