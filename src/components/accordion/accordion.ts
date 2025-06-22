import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { QuietItemChangeEvent } from '../../events/item.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import type { QuietAccordionItem } from '../accordion-item/accordion-item.js';
import styles from './accordion.styles.js';

/**
 * <quiet-accordion>
 *
 * @summary A container for accordion items that manages their expand/collapse states.
 * @documentation https://quietui.org/docs/components/accordion
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-accordion-item
 * @dependency quiet-icon
 *
 * @slot - The default slot for accordion items.
 *
 * @event quiet-item-change - Emitted when the active item changes.
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

  /** The current active item's index. */
  @property({ attribute: 'active-index', type: Number, reflect: true }) activeIndex = -1;

  /** The current active item's name. */
  @property({ attribute: 'active-name', reflect: true }) activeName = '';

  /** When set, selecting an accordion item will automatically collapse the others. */
  @property({ attribute: 'auto-collapse', type: Boolean }) autoCollapse = false;

  /** Determines the accordion's appearance. */
  @property() appearance: 'normal' | 'contained' | 'separated' | 'unstyled' = 'normal';

  /** Determines which side of the accordion item the expand/collapse icon shows. */
  @property({ attribute: 'icon-position' }) iconPosition: 'start' | 'end' = 'end';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('quiet-accordion-item-toggle', this.handleItemToggle);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('quiet-accordion-item-toggle', this.handleItemToggle);
  }

  firstUpdated() {
    this.setAttribute('role', 'region');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('appearance') || changedProperties.has('iconPosition')) {
      this.syncItemProperties();
    }

    if (changedProperties.has('activeIndex') && this.activeIndex >= 0) {
      const items = this.getItems();
      if (items[this.activeIndex]) {
        this.expandItem(items[this.activeIndex]);
      }
    }

    if (changedProperties.has('activeName') && this.activeName) {
      const items = this.getItems();
      const item = items.find(item => item.name === this.activeName);
      if (item) {
        this.expandItem(item);
      }
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

      this.activeIndex = index;
      this.activeName = item.name || '';

      this.dispatchEvent(new QuietItemChangeEvent({ index: this.activeIndex }));
    } else if (this.activeIndex === index) {
      // If the active item is being collapsed
      this.activeIndex = -1;
      this.activeName = '';
    }
  };

  /** Expand a specific item */
  private expandItem(item: QuietAccordionItem) {
    const items = this.getItems();

    if (this.autoCollapse) {
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.expanded = false;
        }
      });
    }

    item.expanded = true;
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
