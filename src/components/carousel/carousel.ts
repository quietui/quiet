import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { scrollEndPolyfill } from '../../utilities/scroll.js';
import '../carousel-item/carousel-item.js';
import styles from './carousel.styles.js';

/**
 * <quiet-carousel>
 *
 * @summary A carousel component that displays content in a scrollable horizontal slider with navigation controls.
 * @documentation https://quietui.com/docs/components/carousel
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-carousel-item
 *
 * @slot - The default slot for carousel items.
 *
 * @csspart items - The scrollable container that holds the carousel items.
 * @csspart nav-button - The previous and next buttons.
 * @csspart nav-button-previous - The previous button.
 * @csspart nav-button-next - The next button.
 * @csspart pagination - The container for the pagination dots.
 * @csspart dot - The individual pagination dots.
 *
 * @event quiet-item-change - Emitted when the active item changes through user interaction.
 *
 * @cssproperty --item-height - The height of items in the carousel.
 *
 * @cssstate scrolling - Applied when the carousel is scrolling.
 */
@customElement('quiet-carousel')
export class QuietCarousel extends QuietElement {
  static styles: CSSResultGroup = styles;

  private ignoreIndexChange = false;
  private itemDimensionsCache: Array<{ left: number; width: number }> | null = null;
  private localize = new Localize(this);

  @query('#items') items: HTMLElement;

  @state() isScrolling = false;
  @state() itemCount = 0;

  /** A custom label for the carousel. This won't be shown, but it will be read to assistive devices. */
  @property({ type: String }) label = '';

  /** The current active item index. */
  @property({ attribute: 'active-index', type: Number, reflect: true }) activeIndex = 0;

  /** Shows navigation buttons when present. */
  @property({ type: Boolean, attribute: 'with-nav', reflect: true }) withNav = false;

  /** Shows pagination dots when present. */
  @property({ type: Boolean, attribute: 'with-dots', reflect: true }) withDots = false;

  firstUpdated() {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    scrollEndPolyfill(this.items);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('activeIndex') && !this.ignoreIndexChange) {
      this.scrollToIndex(this.activeIndex);
    }

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || this.localize.term('carousel'));
    }

    if (changedProperties.has('isScrolling')) {
      this.customStates.set('scrolling', this.isScrolling);
    }
  }

  /** Get the items from the default slot. */
  private getItems(): HTMLElement[] {
    const slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    return slot
      ? (slot.assignedElements().filter(el => el.tagName.toLowerCase() === 'quiet-carousel-item') as HTMLElement[])
      : [];
  }

  private cacheItemDimensions() {
    const items = this.getItems();
    this.itemDimensionsCache = items.map(item => ({
      left: item.offsetLeft - this.items.offsetLeft,
      width: item.offsetWidth
    }));
  }

  private handleSlotChange() {
    this.itemCount = this.getItems().length;
    this.itemDimensionsCache = null; // Clear cache when items change

    // Set the appropriate aria attributes on each carousel item
    const items = this.getItems();
    items.forEach((item, i) => {
      if (!item.hasAttribute('aria-label') && !item.hasAttribute('aria-labelledby')) {
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'slide');
        item.setAttribute('aria-label', this.localize.term('numberOfTotal', i + 1, items.length));
      }
    });
  }

  /**
   * Navigate to the selected dot's index
   */
  private handleDotClick(dot: HTMLButtonElement, index: number) {
    this.scrollToIndex(index);
    dot.focus();
  }

  /**
   * Handle keyboard navigation for the pagination dots
   */
  private handleDotKeyDown(event: KeyboardEvent, index: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const dots = this.shadowRoot.querySelectorAll('.dot');
    if (!dots.length) return;

    console.log(event.key);

    let nextIndex = index;

    switch (event.key) {
      case prevKey:
        nextIndex = Math.max(0, index - 1);
        event.preventDefault();
        break;
      case nextKey:
        nextIndex = Math.min(this.itemCount - 1, index + 1);
        event.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        nextIndex = this.itemCount - 1;
        event.preventDefault();
        break;
      default:
        return; // Exit for any other keys
    }

    if (nextIndex !== index) {
      // Scroll to the new index
      this.scrollToIndex(nextIndex);

      // Focus the new dot
      (dots[nextIndex] as HTMLElement).focus();
    }
  }

  @eventOptions({ passive: true })
  private handleScroll() {
    if (!this.items) return;

    // Cache dimensions if not already cached
    if (!this.itemDimensionsCache) {
      this.cacheItemDimensions();
    }

    if (!this.itemDimensionsCache || this.itemDimensionsCache.length === 0) return;

    const scrollLeft = this.items.scrollLeft;
    const viewportCenter = scrollLeft + this.items.clientWidth / 2;

    // Find which item's center is closest to the viewport center
    let minDistance = Infinity;
    let newIndex = this.activeIndex;

    this.isScrolling = true;
    this.itemDimensionsCache.forEach((item, index) => {
      const itemCenter = item.left + item.width / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newIndex = index;
      }
    });

    if (newIndex !== this.activeIndex && newIndex >= 0 && newIndex < this.itemCount) {
      this.ignoreIndexChange = true;
      this.activeIndex = newIndex;
      requestAnimationFrame(() => (this.ignoreIndexChange = false));
      this.dispatchEvent(new CustomEvent('quiet-item-change', { detail: { index: this.activeIndex } }));
    }
  }

  private handleScrollEnd() {
    this.isScrolling = false;
  }

  @eventOptions({ passive: true })
  private handleWheel() {
    // Blur any focused dot when user scrolls with mouse wheel to ensure the dots are accurate when scrolling after
    // using the keyboard or clicking them directly
    const focusedDot = this.shadowRoot?.querySelector<HTMLButtonElement>('.dot:focus');
    focusedDot?.blur();
  }

  /**
   * Scroll to a specific item index without updating the active dot directly
   */
  private scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
    if (!this.items) return;

    // Ensure index is within bounds
    const boundedIndex = Math.max(0, Math.min(index, this.itemCount - 1));

    const items = this.getItems();
    if (items.length <= boundedIndex) return;

    const targetItem = items[boundedIndex];
    const containerWidth = this.items.clientWidth;
    const itemWidth = targetItem.offsetWidth;
    const itemLeft = targetItem.offsetLeft - this.items.offsetLeft;

    // Calculate scroll position to center the item in the viewport
    // This ensures the target item will be detected as the active one
    const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

    this.items.scrollTo({
      left: scrollPosition,
      behavior
    });
  }

  /**
   * Navigate to the next item
   */
  public nextItem() {
    this.scrollToIndex(this.activeIndex + 1);
  }

  /**
   * Navigate to the previous item
   */
  public previousItem() {
    this.scrollToIndex(this.activeIndex - 1);
  }

  render() {
    const hasNav = this.withNav || this.withDots;
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div
        id="items"
        part="items"
        aria-live="polite"
        tabindex="-1"
        @scroll=${this.handleScroll}
        @scrollend=${this.handleScrollEnd}
        @wheel=${this.handleWheel}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>

      ${hasNav
        ? html`
            <div id="nav" part="nav">
              ${this.withNav
                ? html`
                    <button
                      id="previous-button"
                      part="nav-button nav-button-previous"
                      aria-label=${this.localize.term('previous')}
                      ?disabled=${this.activeIndex === 0}
                      tabindex=${this.withDots ? -1 : 0}
                      @click=${this.previousItem}
                    >
                      <quiet-icon name=${isRtl ? 'chevron-right' : 'chevron-left'}></quiet-icon>
                    </button>
                  `
                : ''}
              ${this.withNav
                ? html`
                    <button
                      id="next-button"
                      part="nav-button nav-button-next"
                      aria-label=${this.localize.term('next')}
                      ?disabled=${this.activeIndex === this.itemCount - 1}
                      tabindex=${this.withDots ? -1 : 0}
                      @click=${this.nextItem}
                    >
                      <quiet-icon name=${isRtl ? 'chevron-left' : 'chevron-right'}></quiet-icon>
                    </button>
                  `
                : ''}
              ${this.withDots
                ? html`
                    <div id="pagination" part="pagination" role="tablist" aria-label="Choose slide to display">
                      ${Array.from({ length: this.itemCount }, (_, i) => {
                        const isActive = i === this.activeIndex;
                        return html`
                          <button
                            part="dot"
                            class=${classMap({ dot: true, active: isActive })}
                            role="tab"
                            aria-label="Go to slide ${i + 1}"
                            aria-selected=${isActive ? 'true' : 'false'}
                            tabindex=${isActive ? 0 : -1}
                            @click=${(event: PointerEvent) => this.handleDotClick(event.target as HTMLButtonElement, i)}
                            @keydown=${(event: KeyboardEvent) => this.handleDotKeyDown(event, i)}
                          ></button>
                        `;
                      })}
                    </div>
                  `
                : ''}
            </div>
          `
        : ''}
    `;
  }
}
