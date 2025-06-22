import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  QuietBeforeCollapseEvent,
  QuietBeforeExpandEvent,
  QuietCollapseEvent,
  QuietExpandEvent
} from '../../events/expand-collapse.js';
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
 * @slot - One or more `<quiet-accordion-items>` to place in the accordion.
 *
 * @event quiet-before-expand - Emitted when an accordion item is instructed to expand but before it is shown. Calling
 *  `event.preventDefault()` will prevent the item from expanding. `event.detail.item` will contain the expanding item.
 * @event quiet-expand - Emitted after an accordion item has been expanded. `event.detail.item` will contain the
 *  expanded item.
 * @event quiet-before-collapse - Emitted when an accordion item is instructed to collapse but before it is hidden.
 *  Calling `event.preventDefault()` will prevent the item from collapsing. `event.detail.item` will contain the
 *  collapsing item.
 * @event quiet-collapse - Emitted after an accordion item has been collapsed. `event.detail.item` will contain the
 *  collapsed item.
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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

  /** @internal Handles accordion item toggle requests from accordion items */
  public handleItemToggle(item: QuietAccordionItem): boolean {
    const targetExpanded = !item.expanded;

    if (targetExpanded) {
      // Expanding
      const beforeExpandEvent = new QuietBeforeExpandEvent(item);
      this.dispatchEvent(beforeExpandEvent);

      if (beforeExpandEvent.defaultPrevented) {
        return false;
      }

      // If auto-collapse is enabled, collapse other items first
      if (this.autoCollapse) {
        const items = this.getItems();
        items.forEach(otherItem => {
          if (otherItem !== item && otherItem.expanded) {
            const beforeCollapseEvent = new QuietBeforeCollapseEvent(otherItem);
            this.dispatchEvent(beforeCollapseEvent);

            if (!beforeCollapseEvent.defaultPrevented) {
              otherItem.expanded = false;
              this.dispatchEvent(new QuietCollapseEvent(otherItem));
            }
          }
        });
      }

      item.expanded = true;
      this.dispatchEvent(new QuietExpandEvent(item));
      return true;
    } else {
      // Collapsing
      const beforeCollapseEvent = new QuietBeforeCollapseEvent(item);
      this.dispatchEvent(beforeCollapseEvent);

      if (beforeCollapseEvent.defaultPrevented) {
        return false;
      }

      item.expanded = false;
      this.dispatchEvent(new QuietCollapseEvent(item));
      return true;
    }
  }

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
