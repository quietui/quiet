import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './carousel.styles.js';

/**
 * <quiet-carousel>
 *
 * @summary A carousel component that displays content in a scrollable horizontal slider with navigation controls.
 * @documentation https://quietui.com/docs/components/carousel
 * @status stable
 * @since 1.0
 *
 * @slot - The default slot for carousel items.
 *
 * @csspart container - The scrollable container that holds the carousel items.
 * @csspart nav-button - The previous and next buttons.
 * @csspart pagination - The container for the pagination dots.
 * @csspart dot - The individual pagination dots.
 *
 * @event quiet-item-change - Emitted when the active item changes through user interaction.
 *
 * @cssproperty --height - The height of the carousel.
 */
@customElement('quiet-carousel')
export class QuietCarousel extends QuietElement {
  static styles: CSSResultGroup = styles;

  private localize = new Localize(this);

  @query('#container') container: HTMLElement;

  @state() private itemCount = 0;

  /** A custom label for the carousel. This won't be shown, but it will be read to assistive devices. */
  @property({ type: String }) label = '';

  /** The current active item index. */
  @property({ type: Number, reflect: true }) index = 0;

  /** Shows navigation buttons when present. */
  @property({ type: Boolean, attribute: 'with-nav', reflect: true }) withNav = false;

  /** Shows pagination dots when present. */
  @property({ type: Boolean, attribute: 'with-dots', reflect: true }) withDots = false;

  firstUpdated() {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label || 'Carousel'); // TODO - localize
    }
  }

  /** Get the items from the default slot. */
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
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'slide');
        item.setAttribute('aria-label', this.localize.term('numberOfTotal', i + 1, items.length));
      }
    });
  }

  @eventOptions({ passive: true })
  private handleScroll() {
    if (!this.container) return;
    const scrollLeft = this.container.scrollLeft;
    const items = this.getItems();

    // Find which item is most visible in the viewport
    const itemWidth = items.length > 0 ? items[0].offsetWidth : 0;
    const gapWidth = items.length > 1 ? items[1].offsetLeft - (items[0].offsetLeft + itemWidth) : 0;
    const itemFullWidth = itemWidth + gapWidth;

    // Calculate the index based on scroll position
    const newIndex = Math.round(scrollLeft / itemFullWidth);

    if (newIndex !== this.index && newIndex >= 0 && newIndex < this.itemCount) {
      this.index = newIndex;
      this.dispatchEvent(new CustomEvent('quiet-item-change', { detail: { index: this.index } }));
    }
  }

  /**
   * Scroll to a specific item index without updating the active dot directly
   */
  private scrollToIndex(index: number) {
    if (!this.container) return;

    // Ensure index is within bounds
    const boundedIndex = Math.max(0, Math.min(index, this.itemCount - 1));

    const items = this.getItems();
    if (items.length <= boundedIndex) return;

    // Get the target item to scroll to
    const targetItem = items[boundedIndex];

    // Just scroll to the position - the scroll event handler will update the active dot
    this.container.scrollTo({
      left: targetItem.offsetLeft - this.container.offsetLeft,
      behavior: 'smooth'
    });

    // Note: We don't update this.index here - the scroll event will handle that
  }

  /**
   * Navigate to the previous item
   */
  private handlePrevious() {
    this.scrollToIndex(this.index - 1);
  }

  /**
   * Navigate to the next item
   */
  private handleNext() {
    this.scrollToIndex(this.index + 1);
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
    // Get all dot elements
    const dots = this.shadowRoot.querySelectorAll('.dot');
    if (!dots.length) return;

    let nextIndex = index;

    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = Math.max(0, index - 1);
        event.preventDefault();
        break;
      case 'ArrowRight':
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

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div id="container" part="container" aria-live="polite" tabindex="0" @scroll=${this.handleScroll}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>

      ${this.withNav || this.withDots
        ? html`
            <div id="nav" part="nav">
              ${this.withNav
                ? html`
                    <button
                      id="previous-button"
                      part="nav-button"
                      aria-label=${this.localize.term('previous')}
                      ?disabled=${this.index === 0}
                      @click=${this.handlePrevious}
                    >
                      <quiet-icon name=${isRtl ? 'chevron-right' : 'chevron-left'}></quiet-icon>
                    </button>
                    <button
                      id="next-button"
                      part="nav-button"
                      aria-label=${this.localize.term('next')}
                      ?disabled=${this.index === this.itemCount - 1}
                      @click=${this.handleNext}
                    >
                      <quiet-icon name=${isRtl ? 'chevron-left' : 'chevron-right'}></quiet-icon>
                    </button>
                  `
                : ''}
              ${this.withDots
                ? html`
                    <div id="pagination" part="pagination" role="tablist" aria-label="Choose slide to display">
                      ${Array.from({ length: this.itemCount }, (_, i) => {
                        const isActive = i === this.index;
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
