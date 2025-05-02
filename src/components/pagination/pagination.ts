import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './pagination.styles.js';

/**
 * <quiet-pagination>
 *
 * @summary A pagination component that allows users to navigate through pages.
 * @documentation https://quietui.org/docs/components/pagination
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @csspart nav - The navigation container, a `<nav>` element.
 * @csspart list - The list that contains the pagination items, a `<ul>` element.
 * @csspart item - A pagination item, an `<li>` element.
 * @csspart button - A pagination button, a `<button>` element.
 * @csspart button-first - The button that navigates to the first page.
 * @csspart button-previous - The button that navigates to the previous page.
 * @csspart button-next - The button that navigates to the next page.
 * @csspart button-last - The button that navigates to the last page.
 * @csspart button-page - A button that navigates to a specific page.
 * @csspart button-current - The button that represents the current page.
 * @csspart button-ellipsis - A button that represents an ellipsis.
 *
 * @cssstate disabled - Applied when the pagination is disabled.
 *
 * @event quiet-page-change - Emitted when the page changes and can be cancelled.
 */

/**
 * Represents an item in the pagination list, which can be a page number or an ellipsis.
 */
type PaginationItem = { type: 'page'; page: number } | { type: 'ellipsis'; position: 'start' | 'end' };

@customElement('quiet-pagination')
export class QuietPagination extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** A label to use to describe the control to assistive devices. */
  @property() label = '';

  /** The total number of pages to show. */
  @property({ attribute: 'total-pages', type: Number }) totalPages = 10;

  /** The current page. */
  @property({ type: Number, reflect: true }) page = 1;

  /** The number of page buttons to show on each side of the current page. */
  @property({ attribute: 'siblings', type: Number }) siblings = 3;

  /** The number of pages to jump when ellipsis buttons are clicked. */
  @property({ attribute: 'jump', type: Number }) jump = 5;

  /** The pagination's appearance. */
  @property({ reflect: true }) appearance: 'compact' | 'standard' = 'standard';

  /** Disables the pagination control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Removes the previous and next buttons. */
  @property({ type: Boolean, attribute: 'no-nav', reflect: true }) noNav = false;

  /** Changes the current page, emitting a cancellable 'quiet-page-change' event. */
  private changePage(newPage: number) {
    // Exit if new page is invalid or same as current
    if (newPage < 1 || newPage > this.totalPages || newPage === this.page) return;

    // Create and dispatch cancellable event with new page details
    const event = new CustomEvent('quiet-page-change', {
      detail: { page: newPage },
      cancelable: true
    });
    const cancelled = !this.dispatchEvent(event);

    // Update page if event wasn't cancelled
    if (!cancelled) {
      this.page = newPage;
    }
  }

  /** Generates the list of pagination items, including pages, and ellipses. */
  private getPaginationItems(): PaginationItem[] {
    const items: PaginationItem[] = [];
    const totalButtons = 2 * this.siblings + 1; // Current page + siblings on both sides
    const clampedTotalButtons = clamp(totalButtons, 5, Infinity);

    if (this.totalPages < 1) return items;

    if (this.totalPages <= clampedTotalButtons) {
      // Show all pages and add placeholders if needed
      for (let i = 1; i <= this.totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
    } else {
      const middlePageCount = clampedTotalButtons - 4; // For pages between first/last and ellipses
      const sideButtons = Math.floor(middlePageCount / 2);

      // Determine if we need to show ellipsis at start and/or end
      const showStartEllipsis = this.page > sideButtons + 2;
      const showEndEllipsis = this.page < this.totalPages - sideButtons - 1;

      // Calculate start and end of visible page range
      let rangeStart, rangeEnd;

      if (!showStartEllipsis && showEndEllipsis) {
        // Near start, show more pages at beginning
        rangeStart = 2;
        rangeEnd = clampedTotalButtons - 2; // -2 for first page and end ellipsis
      } else if (showStartEllipsis && !showEndEllipsis) {
        // Near end, show more pages at end
        rangeStart = this.totalPages - (clampedTotalButtons - 3); // -3 for first page, last page, start ellipsis
        rangeEnd = this.totalPages - 1;
      } else if (showStartEllipsis && showEndEllipsis) {
        // In middle, center current page
        rangeStart = Math.max(2, this.page - sideButtons);
        rangeEnd = Math.min(this.totalPages - 1, this.page + sideButtons);

        // Adjust if range is too small (near start or end)
        if (rangeEnd - rangeStart + 1 < middlePageCount) {
          if (rangeStart === 2) {
            rangeEnd = Math.min(this.totalPages - 1, rangeStart + middlePageCount - 1);
          } else if (rangeEnd === this.totalPages - 1) {
            rangeStart = Math.max(2, rangeEnd - middlePageCount + 1);
          }
        }
      } else {
        // No ellipses needed, show all possible pages
        rangeStart = 2;
        rangeEnd = this.totalPages - 1;
      }

      // Add first page
      items.push({ type: 'page', page: 1 });

      // Check if we should show page 2 instead of start ellipsis
      if (rangeStart === 3) {
        items.push({ type: 'page', page: 2 });
      } else if (showStartEllipsis) {
        items.push({ type: 'ellipsis', position: 'start' });
      }

      // Add range of pages
      for (let i = rangeStart; i <= rangeEnd; i++) {
        items.push({ type: 'page', page: i });
      }

      // Check if we should show second-to-last page instead of end ellipsis
      if (rangeEnd === this.totalPages - 2) {
        items.push({ type: 'page', page: this.totalPages - 1 });
      } else if (showEndEllipsis) {
        items.push({ type: 'ellipsis', position: 'end' });
      }

      // Add last page
      items.push({ type: 'page', page: this.totalPages });
    }

    return items;
  }

  private handleEllipsisClick(position: 'start' | 'end') {
    let newPage: number;
    if (position === 'start') {
      // Move backward by jump pages, but stop at page 2
      newPage = Math.max(2, this.page - this.jump);
    } else {
      // Move forward by jump pages, but stop at totalPages - 1
      newPage = Math.min(this.totalPages - 1, this.page + this.jump);
    }
    this.changePage(newPage);
  }

  render() {
    const label = this.label || this.localize.term('pagination');
    const isPrevDisabled = this.page <= 1 || this.disabled;
    const isNextDisabled = this.page >= this.totalPages || this.disabled;
    const isRtl = this.localize.dir() === 'rtl';
    const chevronLeftIcon = html`<quiet-icon library="system" name="chevron-left"></quiet-icon>`;
    const chevronRightIcon = html`<quiet-icon library="system" name="chevron-right"></quiet-icon>`;
    const numberFormatter = new Intl.NumberFormat(this.localize.lang());

    // Navigation buttons for either appearance
    const previousButton = html`
      <li part="item">
        <button
          part="button button-previous"
          aria-label="${this.localize.term('previous')}"
          ?disabled=${isPrevDisabled}
          @click=${() => this.changePage(this.page - 1)}
        >
          ${isRtl ? chevronRightIcon : chevronLeftIcon}
        </button>
      </li>
    `;

    const nextButton = html`
      <li part="item">
        <button
          part="button button-next"
          aria-label="${this.localize.term('next')}"
          ?disabled=${isNextDisabled}
          @click=${() => this.changePage(this.page + 1)}
        >
          ${isRtl ? chevronLeftIcon : chevronRightIcon}
        </button>
      </li>
    `;

    // Render the compact appearance
    if (this.appearance === 'compact') {
      return html`
        <nav part="nav" aria-label="${label}">
          <ul part="list">
            ${this.noNav ? '' : previousButton}
            <li part="item">
              <span part="page-info"> ${this.localize.term('numberOfTotal', this.page, this.totalPages)} </span>
            </li>
            ${this.noNav ? '' : nextButton}
          </ul>
        </nav>
      `;
    }

    // Render the standard appearance
    const paginationItems = this.getPaginationItems();

    return html`
      <nav part="nav" aria-label="${label}">
        <ul part="list">
          ${this.noNav ? '' : previousButton}
          ${paginationItems.map(item => {
            if (item.type === 'ellipsis') {
              return html`
                <li part="item" class="ellipsis">
                  <button
                    part="button button-ellipsis"
                    aria-label="${this.localize.term(item.position === 'start' ? 'jumpBackward' : 'jumpForward')}"
                    class="ellipsis"
                    @click=${() => this.handleEllipsisClick(item.position)}
                  >
                    <quiet-icon library="system" name="dots"></quiet-icon>
                  </button>
                </li>
              `;
            } else {
              // Render a page
              const isCurrent = item.page === this.page;
              const part = `button button-page${isCurrent ? ' button-current' : ''}${item.page === 1 ? ' button-first' : ''}${item.page === this.totalPages ? ' button-last' : ''}`;
              return html`
                <li part="item">
                  <button
                    part=${part}
                    class=${classMap({
                      current: isCurrent
                    })}
                    aria-current=${ifDefined(isCurrent ? 'page' : undefined)}
                    @click=${() => this.changePage(item.page)}
                  >
                    ${numberFormatter.format(item.page)}
                  </button>
                </li>
              `;
            }
          })}
          ${this.noNav ? '' : nextButton}
        </ul>
      </nav>
    `;
  }
}
