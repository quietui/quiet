import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './accordion.styles.js';

/**
 * <quiet-accordion>
 *
 * @summary An individual section within an accordion, consisting of a header and content that shows when expanded.
 * @documentation https://quietui.org/docs/components/accordion
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot.
 * @slot named - A named slot.
 *
 * @cssproperty [--duration=200ms] - The expand and collapse duration.
 * @cssproperty [--easing=ease] - The expand and collapse easing.
 */
@customElement('quiet-accordion')
export class QuietAccordion extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The current active item's index. */
  @property({ attribute: 'active-index', type: Number, reflect: true }) activeIndex = 0;

  /** The current active item's name. */
  @property({ attribute: 'active-name', reflect: true }) activeName = '';

  /** When set, selecting an accordion item will automatically collapse the others. */
  @property({ attribute: 'auto-collapse', type: Boolean }) autoCollapse = false;

  /** Determines the accordion's appearance. */
  @property() appearance: 'normal' | 'contained' | 'separated' = 'normal';

  /** Determines which side of the accordion item the expand/collapse icon shows. */
  @property({ attribute: 'icon-position' }) iconPosition: 'start' | 'end' = 'end';

  updated(changedProperties: PropertyValues<this>) {
    //
    // TODO - sync appearance and iconPosition to each accordion item
    //
    // e.g.
    // if (changedProperties.has('example')) {
    //   // this.example has changed
    // }
  }

  private handleSlotChange() {
    // TODO - sync appearance and iconPosition to each accordion item
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-accordion': QuietAccordion;
  }
}
