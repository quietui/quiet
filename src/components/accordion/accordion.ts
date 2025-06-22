import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../accordion-item/accordion-item.js';
import type { QuietAccordionItem } from '../accordion-item/accordion-item.js';
import styles from './accordion.styles.js';

/**
 * <quiet-accordion>
 *
 * @summary A container for content that expands and collapses when selected.
 * @documentation https://quietui.org/docs/components/accordion
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-accordion-item
 *
 * @slot - The default slot for accordion items.
 *
 * @cssproperty [--duration=200ms] - The expand and collapse duration.
 * @cssproperty [--easing=ease] - The expand and collapse easing.
 * @cssproperty [--border-color=var(--quiet-neutral-stroke-softer)] - The accordion's border color.
 * @cssproperty [--border-width=var(--quiet-border-width)] - The accordion's border width.
 * @cssproperty [--border-style=var(--quiet-border-style)] - The accordion's border style.
 * @cssproperty [--border-radius=var(--quiet-border-radius-md)] - The border radius to apply to rounded edges.
 */
@customElement('quiet-accordion')
export class QuietAccordion extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** When set, selecting an accordion item will automatically collapse the others. */
  @property({ attribute: 'auto-collapse', type: Boolean }) autoCollapse = false;

  /** Determines the accordion's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'contained' | 'separated' | 'unstyled' = 'normal';

  /** Determines which side of the accordion item the expand/collapse icon shows. */
  @property({ attribute: 'icon-position', reflect: true }) iconPosition: 'start' | 'end' = 'end';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('quiet-accordion-item-toggle', this.handleItemToggle);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('quiet-accordion-item-toggle', this.handleItemToggle);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('appearance') || changedProperties.has('iconPosition')) {
      this.syncItemProperties();
    }
  }

  /** Get accordion items from the default slot */
  private getItems(): QuietAccordionItem[] {
    const slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    return slot
      ? (slot
          .assignedElements()
          .filter(el => el.tagName.toLowerCase() === 'quiet-accordion-item') as QuietAccordionItem[])
      : [];
  }

  /** Handle accordion item toggle events */
  private handleItemToggle = (event: Event) => {
    const customEvent = event as CustomEvent<{ expanded: boolean }>;
    const item = event.target as QuietAccordionItem;
    const items = this.getItems();
    const index = items.indexOf(item);

    if (index === -1) return;

    if (customEvent.detail.expanded) {
      // If auto-collapse is enabled, collapse other items
      if (this.autoCollapse) {
        items.forEach((otherItem, otherIndex) => {
          if (otherIndex !== index && otherItem.expanded) {
            otherItem.expanded = false;
          }
        });
      }
    }
  };

  private handleSlotChange() {
    this.syncItemProperties();
  }

  /** Sync appearance and iconPosition to accordion items */
  private syncItemProperties() {
    const items = this.getItems();

    items.forEach((item, index) => {
      item.appearance = this.appearance;
      item.iconPosition = this.iconPosition;

      // Remove all position attributes first
      item.removeAttribute('data-accordion-item-first');
      item.removeAttribute('data-accordion-item-middle');
      item.removeAttribute('data-accordion-item-last');

      // Add appropriate position attribute
      if (items.length === 1) {
        item.setAttribute('data-accordion-item-first', '');
        item.setAttribute('data-accordion-item-last', '');
      } else if (index === 0) {
        item.setAttribute('data-accordion-item-first', '');
      } else if (index === items.length - 1) {
        item.setAttribute('data-accordion-item-last', '');
      } else {
        item.setAttribute('data-accordion-item-middle', '');
      }
    });
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
