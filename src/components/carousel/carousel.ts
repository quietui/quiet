import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { QuietItemChangeEvent } from '../../events/item.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { scrollEndPolyfill, SUPPORTS_SCROLLSNAPCHANGE, SUPPORTS_SCROLLSNAPCHANGING } from '../../utilities/scroll.js';
import '../carousel-item/carousel-item.js';
import '../icon/icon.js';
import styles from './carousel.styles.js';

const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

/**
 * <quiet-carousel>
 *
 * @summary A carousel component that displays content in a scrollable horizontal slider with navigation controls.
 * @documentation https://quietui.com/docs/components/carousel
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-carousel-item
 * @dependency quiet-quiet-icon
 *
 * @slot - The default slot for carousel items.
 *
 * @csspart items - The scrollable container that holds the carousel items.
 * @csspart controls - The container that surrounds nav buttons and pagination.
 * @csspart previous-button - The previous button.
 * @csspart next-button - The next button.
 * @csspart pagination - The container for the pagination dots.
 * @csspart pagination-dot - Each individual pagination dot.
 * @csspart pagination-dot-active - The active pagination dot.
 *
 * @event quiet-item-change - Emitted when the active item changes and the slide has been fully scrolled into view.
 *
 * @cssproperty [--item-height=20em] - The height of items container in the carousel.
 * @cssproperty [--item-gap=2rem] - The gap between items in the carousel.
 * @cssproperty [--dot-size=0.875em] - The size of each pagination dot.
 * @cssproperty [--dot-gap=0.5em] - The size of the gap between pagination dots.
 * @cssproperty [--dot-color=var(--quiet-neutral-fill-soft)] - The color of inactive pagination dots.
 * @cssproperty [--dot-active-color=var(--quiet-neutral-fill-loud)] - The color of active pagination dots.
 *
 * @cssstate scrolling - Applied when the carousel is scrolling.
 */
@customElement('quiet-carousel')
export class QuietCarousel extends QuietElement {
  static styles: CSSResultGroup = styles;

  private localize = new Localize(this);
  private isUserInitiated = false;
  private pendingEventDispatch = false;
  private resizeObserver: ResizeObserver | null = null;
  private activeItemInterval: ReturnType<typeof setInterval> | null;

  @query('#items') items: HTMLElement;

  @state() isScrolling = false;
  @state() itemCount = 0;

  /** A custom label for the carousel. This won't be visible, but it will be read to assistive devices. */
  @property({ type: String }) label = '';

  /** The current active item index. */
  @property({ attribute: 'active-index', type: Number, reflect: true }) activeIndex = 0;

  /** Hides navigation buttons. */
  @property({ type: Boolean, attribute: 'without-nav', reflect: true }) withoutNav = false;

  /** Hides pagination dots. */
  @property({ type: Boolean, attribute: 'without-pagination', reflect: true }) withoutPagination = false;

  connectedCallback() {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  firstUpdated() {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    scrollEndPolyfill(this.items);

    // Schedule initial scroll after carousel items are rendered
    requestAnimationFrame(() => {
      if (this.activeIndex !== 0) {
        this.setActiveItem(this.activeIndex, 'instant');
      }
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('activeIndex') && !this.isUserInitiated) {
      // Programmatic changes scroll instantly without an animation
      this.setActiveItem(this.activeIndex, 'instant');
    }

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || this.localize.term('carousel'));
    }

    if (changedProperties.has('isScrolling')) {
      this.customStates.set('scrolling', this.isScrolling);
    }
  }

  /** Get the items from the default slot */
  private getItems(): HTMLElement[] {
    const slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    return slot
      ? (slot.assignedElements().filter(el => el.tagName.toLowerCase() === 'quiet-carousel-item') as HTMLElement[])
      : [];
  }

  private handleSlotChange() {
    this.itemCount = this.getItems().length;

    // Set the appropriate aria attributes on each carousel item
    const items = this.getItems();
    items.forEach((item, i) => {
      if (!item.hasAttribute('aria-label') && !item.hasAttribute('aria-labelledby')) {
        item.setAttribute('aria-label', this.localize.term('numberOfTotal', i + 1, items.length));
      }
    });

    this.setupResizeObserver();
  }

  /**
   * Navigate to the selected dot's index
   */
  private handleDotClick(dot: HTMLButtonElement, index: number) {
    this.isUserInitiated = true;
    this.setActiveItem(index);
    dot.focus();
  }

  /**
   * Handle keyboard navigation for the pagination dots
   */
  private handleDotKeyDown(event: KeyboardEvent, index: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const dots = this.shadowRoot.querySelectorAll('.pagination-dot');
    if (!dots.length) return;

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
      this.isUserInitiated = true;
      this.setActiveItem(nextIndex);

      // Focus the new dot
      (dots[nextIndex] as HTMLElement).focus();
    }
  }

  @eventOptions({ passive: true })
  private handleScrollSnapChanging(event: Event) {
    if (!this.items) return;

    const snapEvent = event as any; // scrollsnapchanging is not in TypeScript yet
    const snappingElement = snapEvent.snapTargetInline;

    if (snappingElement) {
      const items = this.getItems();
      const newIndex = items.indexOf(snappingElement);

      if (newIndex !== -1 && newIndex !== this.activeIndex) {
        this.activeIndex = newIndex;
      }
    }
  }

  @eventOptions({ passive: true })
  private handleScrollSnapChange(event: Event) {
    if (!this.items) return;

    const snapEvent = event as any; // scrollsnapchange is not in TypeScript yet
    const snappedElement = snapEvent.snapTargetInline;

    if (snappedElement) {
      const items = this.getItems();
      const newIndex = items.indexOf(snappedElement);

      if (newIndex !== -1 && newIndex !== this.activeIndex) {
        this.activeIndex = newIndex;
      }

      if (this.isUserInitiated) {
        this.pendingEventDispatch = true;
      }
    }
  }

  @eventOptions({ passive: true })
  private handleScroll() {
    this.isScrolling = true;

    // In unsupportive browsers, measure the active index during scroll to sync up the pagination dots. We skip the
    // check doing a crude platform test to avoid janky scrolling in iOS that doesn't happen in desktop browsers.
    if ((!SUPPORTS_SCROLLSNAPCHANGE || !SUPPORTS_SCROLLSNAPCHANGING) && !IS_IOS && !this.activeItemInterval) {
      this.activeItemInterval = setInterval(() => {
        this.updateActiveIndexFromScroll();
      }, 100);
    }
  }

  private handleScrollEnd() {
    this.isScrolling = false;
    this.activeItemInterval = null;
    if (this.activeItemInterval) clearInterval(this.activeItemInterval);

    // In unsupportive browsers, measure and update the activeIndex after scrolling
    if (!SUPPORTS_SCROLLSNAPCHANGE || !SUPPORTS_SCROLLSNAPCHANGING) {
      const indexChanged = this.updateActiveIndexFromScroll();
      if (indexChanged && this.isUserInitiated) {
        this.pendingEventDispatch = true;
      }
    }

    // Dispatch event only if this was a user-initiated scroll
    if (this.pendingEventDispatch && this.isUserInitiated) {
      this.dispatchEvent(new QuietItemChangeEvent({ index: this.activeIndex }));
      this.pendingEventDispatch = false;
    }

    // Reset the flag after scroll ends
    this.isUserInitiated = false;
  }

  @eventOptions({ passive: true })
  private handleWheel() {
    // Mark as user-initiated when scrolling with mouse wheel
    this.isUserInitiated = true;

    // Blur any focused dot when user scrolls with mouse wheel to ensure the dots are accurate when scrolling after
    // using the keyboard or clicking them directly
    const focusedDot = this.shadowRoot?.querySelector<HTMLButtonElement>('.pagination-dot:focus');
    focusedDot?.blur();
  }

  /** Sets the active item and scrolls to it */
  private setActiveItem(index: number, behavior: ScrollBehavior = 'smooth') {
    if (!this.items) return;

    // Ensure index is within bounds
    const boundedIndex = Math.max(0, Math.min(index, this.itemCount - 1));

    const items = this.getItems();
    if (items.length <= boundedIndex) return;

    const targetItem = items[boundedIndex];
    const containerWidth = this.items.clientWidth;
    const itemWidth = targetItem.offsetWidth;
    const itemLeft = targetItem.offsetLeft - this.items.offsetLeft;

    // Calculate scroll position to center the item in the viewport, ensuring the target item will be detected as the
    // active one
    const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

    this.items.scrollTo({
      left: scrollPosition,
      behavior
    });
  }

  private setupResizeObserver() {
    const items = this.getItems();

    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => {
      this.setActiveItem(this.activeIndex, 'instant');
    });

    // Observe every item in the carousel
    items.forEach(item => {
      this.resizeObserver!.observe(item);
    });
  }

  /** Update the activeIndex based on which item is most centered in the viewport */
  private updateActiveIndexFromScroll(): boolean {
    const items = this.getItems();
    if (items.length === 0) return false;

    const viewportCenter = this.items.scrollLeft + this.items.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemLeft = item.offsetLeft - this.items.offsetLeft;
      const itemCenter = itemLeft + item.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== this.activeIndex) {
      this.activeIndex = closestIndex;
      return true;
    }

    return false;
  }

  /** Navigate to the specified item. */
  public scrollToIndex(index: number, scrollBehavior: ScrollBehavior = 'smooth') {
    this.isUserInitiated = true;
    this.setActiveItem(index, scrollBehavior);
  }

  /** Navigate to the next item */
  public scrollToNext(scrollBehavior: ScrollBehavior = 'smooth') {
    this.isUserInitiated = true;
    this.setActiveItem(this.activeIndex + 1, scrollBehavior);
  }

  /** Navigate to the previous item */
  public scrollToPrevious(scrollBehavior: ScrollBehavior = 'smooth') {
    this.isUserInitiated = true;
    this.setActiveItem(this.activeIndex - 1, scrollBehavior);
  }

  render() {
    const hasControls = !this.withoutNav || !this.withoutPagination;
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div
        id="items"
        part="items"
        aria-live="polite"
        tabindex="-1"
        @scroll=${this.handleScroll}
        @scrollend=${this.handleScrollEnd}
        @scrollsnapchanging=${this.handleScrollSnapChanging}
        @scrollsnapchange=${this.handleScrollSnapChange}
        @wheel=${this.handleWheel}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>

      ${hasControls
        ? html`
            <div id="controls" part="controls">
              ${!this.withoutNav
                ? html`
                    <button
                      id="previous-button"
                      part="previous-button"
                      aria-label=${this.localize.term('previous')}
                      ?disabled=${this.activeIndex === 0}
                      tabindex=${this.withoutPagination ? 0 : -1}
                      @click=${() => this.scrollToPrevious()}
                    >
                      <quiet-icon library="system" name=${isRtl ? 'chevron-right' : 'chevron-left'}></quiet-icon>
                    </button>

                    <button
                      id="next-button"
                      part="next-button"
                      aria-label=${this.localize.term('next')}
                      ?disabled=${this.activeIndex === this.itemCount - 1}
                      tabindex=${this.withoutPagination ? 0 : -1}
                      @click=${() => this.scrollToNext()}
                    >
                      <quiet-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></quiet-icon>
                    </button>
                  `
                : ''}
              ${!this.withoutPagination
                ? html`
                    <div id="pagination" part="pagination" role="tablist" aria-label="Choose slide to display">
                      ${Array.from({ length: this.itemCount }, (_, i) => {
                        const isActive = i === this.activeIndex;
                        return html`
                          <button
                            part="pagination-dot ${isActive ? 'pagination-dot-active' : ''}"
                            class=${classMap({ 'pagination-dot': true, active: isActive })}
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
