import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
 * @slot - One or more `<quiet-accordion-item>` elements to place in the accordion.
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

  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;

  /** When set, selecting an accordion item will automatically collapse the others. */
  @property({ attribute: 'auto-collapse', type: Boolean }) autoCollapse = false;

  /** Determines the accordion's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'contained' | 'separated' | 'unstyled' = 'normal';

  /** Determines which side of the accordion item the expand/collapse icon shows. */
  @property({ attribute: 'icon-position', reflect: true }) iconPosition: 'start' | 'end' = 'end';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('appearance') || changedProperties.has('iconPosition')) {
      this.syncItemProperties();
    }
  }

  /** Get accordion items from the default slot */
  private getItems(): QuietAccordionItem[] {
    return this.defaultSlot
      .assignedElements()
      .filter(el => el.tagName.toLowerCase() === 'quiet-accordion-item') as QuietAccordionItem[];
  }

  /** Get enabled (non-disabled) accordion items */
  private getEnabledItems(): QuietAccordionItem[] {
    return this.getItems().filter(item => !item.disabled);
  }

  /** Focus the next enabled accordion item */
  private focusNextItem(currentItem: QuietAccordionItem) {
    const enabledItems = this.getEnabledItems();
    const currentIndex = enabledItems.indexOf(currentItem);
    if (currentIndex < enabledItems.length - 1) {
      enabledItems[currentIndex + 1].focus();
    }
  }

  /** Focus the previous enabled accordion item */
  private focusPreviousItem(currentItem: QuietAccordionItem) {
    const enabledItems = this.getEnabledItems();
    const currentIndex = enabledItems.indexOf(currentItem);
    if (currentIndex > 0) {
      enabledItems[currentIndex - 1].focus();
    }
  }

  /** Focus the first enabled accordion item */
  private focusFirstItem() {
    const enabledItems = this.getEnabledItems();
    if (enabledItems.length > 0) {
      enabledItems[0].focus();
    }
  }

  /** Focus the last enabled accordion item */
  private focusLastItem() {
    const enabledItems = this.getEnabledItems();
    if (enabledItems.length > 0) {
      enabledItems[enabledItems.length - 1].focus();
    }
  }

  private handleClick = (event: MouseEvent) => {
    const path = event.composedPath();
    const item = event.target as QuietAccordionItem;
    if (item.localName === 'quiet-accordion-item' && !item.disabled) {
      const header = item.header;
      if (header && path.some(el => el === header)) {
        this.handleItemToggle(item);
      }
    }
  };

  /** @internal Handles accordion item toggle requests */
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

  private handleKeyDown = (event: KeyboardEvent) => {
    const path = event.composedPath();
    const target = path[0] as HTMLElement;

    if (target.getAttribute('part') === 'header') {
      const shadowRoot = target.getRootNode() as ShadowRoot;
      const item = shadowRoot.host as QuietAccordionItem;
      if (item && !item.disabled) {
        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            this.handleItemToggle(item);
            break;
          case 'ArrowUp':
            event.preventDefault();
            this.focusPreviousItem(item);
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.focusNextItem(item);
            break;
          case 'Home':
            event.preventDefault();
            this.focusFirstItem();
            break;
          case 'End':
            event.preventDefault();
            this.focusLastItem();
            break;
        }
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

      // Use toggleAttribute to conditionally set position attributes
      const isFirst = index === 0;
      const isLast = index === items.length - 1;
      const isMiddle = items.length > 2 && !isFirst && !isLast;

      item.toggleAttribute('data-accordion-item-first', isFirst);
      item.toggleAttribute('data-accordion-item-middle', isMiddle);
      item.toggleAttribute('data-accordion-item-last', isLast);
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
