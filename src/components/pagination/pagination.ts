import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './pagination.styles.js';

/**
 * <quiet-pagination>
 *
 * @summary A pagination component that allows users to navigate through pages.
 * @documentation https://quietui.org/docs/components/pagination
 * @status stable
 * @since 1.0
 *
 * @csspart nav - The navigation container.
 * @csspart list - The list that contains the pagination items.
 * @csspart item - A pagination item (button container).
 * @csspart button - A pagination button.
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
 * Represents an item in the pagination list, which can be a page number, an ellipsis, or a placeholder.
 */
type PaginationItem = { type: 'page'; page: number } | { type: 'ellipsis' } | { type: 'placeholder' };

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

  /** The number of pages to show on each side of the selected page. */
  @property({ type: Number }) siblings = 1;

  /** The pagination's appearance. */
  @property({ reflect: true }) appearance: 'compact' | 'standard' = 'standard';

  /** Disables the pagination control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Shows the previous and next buttons. */
  @property({ type: Boolean, attribute: 'with-adjacent', reflect: true }) withAdjacent = false;

  /**
   * Generates the list of pagination items, including pages, ellipses, and placeholders.
   *
   * @returns An array of pagination items.
   */
  private getPaginationItems(): PaginationItem[] {
    const { totalPages, page, siblings } = this;
    const maxButtons = 2 * siblings + 5; // e.g., 7 when siblings = 1
    const threshold = maxButtons - 3; // e.g., 4 when maxButtons = 7
    const items: PaginationItem[] = [];

    if (totalPages < 1) return items;

    // Case 1: Total pages are less than or equal to maxButtons
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      while (items.length < maxButtons) {
        items.push({ type: 'placeholder' });
      }
    }
    // Case 2: Total pages exceed maxButtons
    else {
      let start: number;
      let end: number;
      let showLeftEllipsis = true;
      let showRightEllipsis = true;

      // Near the start: show consecutive pages from 1, then ellipsis, then last page
      if (page <= threshold) {
        start = 2;
        end = threshold + 1; // e.g., 5 when threshold = 4
        showLeftEllipsis = false;
      }
      // Near the end: show first page, ellipsis, then consecutive pages to the end
      else if (page >= totalPages - threshold + 1) {
        start = totalPages - threshold; // e.g., 6 when totalPages = 10, threshold = 4
        end = totalPages - 1;
        showRightEllipsis = false;
      }
      // In the middle: show first page, ellipsis, pages around current, ellipsis, last page
      else {
        start = Math.max(2, page - siblings);
        end = Math.min(totalPages - 1, page + siblings);
      }

      // Add first page
      items.push({ type: 'page', page: 1 });

      // Add left ellipsis if needed
      if (showLeftEllipsis && start > 2) {
        items.push({ type: 'ellipsis' });
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        items.push({ type: 'page', page: i });
      }

      // Add right ellipsis if needed
      if (showRightEllipsis && end < totalPages - 1) {
        items.push({ type: 'ellipsis' });
      }

      // Add last page
      items.push({ type: 'page', page: totalPages });
    }

    return items;
  }

  /**
   * Changes the current page, emitting a cancellable 'quiet-page-change' event.
   *
   * @param newPage - The new page number to navigate to.
   */
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

  /**
   * Renders the pagination component with navigation buttons and page items.
   *
   * @returns The rendered HTML template.
   */
  render() {
    const label = this.label || this.localize.term('pagination');
    const isPrevDisabled = this.page <= 1 || this.disabled;
    const isNextDisabled = this.page >= this.totalPages || this.disabled;
    const paginationItems = this.getPaginationItems();

    return html`
      <nav part="nav" aria-label="${label}">
        <ul part="list">
          ${this.withAdjacent
            ? html`
                <li part="item">
                  <button
                    part="button button-previous"
                    aria-label="${this.localize.term('previous')}"
                    ?disabled=${isPrevDisabled}
                    @click=${() => this.changePage(this.page - 1)}
                  >
                    <quiet-icon name="chevron-left"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
          ${paginationItems.map(item => {
            if (item.type === 'page') {
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
                    ${item.page}
                  </button>
                </li>
              `;
            } else if (item.type === 'ellipsis') {
              return html`
                <li part="item" class="ellipsis">
                  <button part="button button-ellipsis" disabled>…</button>
                </li>
              `;
            } else {
              // Placeholder
              return html`
                <li part="item" class="placeholder">
                  <button part="button button-placeholder" disabled></button>
                </li>
              `;
            }
          })}
          ${this.withAdjacent
            ? html`
                <li part="item">
                  <button
                    part="button button-next"
                    aria-label="${this.localize.term('next')}"
                    ?disabled=${isNextDisabled}
                    @click=${() => this.changePage(this.page + 1)}
                  >
                    <quiet-icon name="chevron-right"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
        </ul>
      </nav>
    `;
  }
}
