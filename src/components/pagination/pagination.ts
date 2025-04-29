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
 * Represents an item in the pagination list, which can be a page number, an ellipsis, or a placeholder.
 */
type PaginationItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; position: 'left' | 'right' }
  | { type: 'placeholder' };

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

  /** The maximum number of visible page buttons. Must be a minimum of 5. */
  @property({ attribute: 'max-buttons', type: Number }) maxButtons = 7;

  /** The pagination's appearance. */
  @property({ reflect: true }) appearance: 'compact' | 'standard' = 'standard';

  /** Disables the pagination control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Shows the previous and next buttons. */
  @property({ type: Boolean, attribute: 'with-adjacent', reflect: true }) withAdjacent = false;

  /** Generates the list of pagination items, including pages, ellipses, and placeholders. */
  private getPaginationItems(): PaginationItem[] {
    const items: PaginationItem[] = [];
    const clampedMax = clamp(this.maxButtons, 5, Infinity);

    if (this.totalPages < 1) return items;

    if (this.totalPages <= clampedMax) {
      // Show all pages and add placeholders if needed
      for (let i = 1; i <= this.totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
      while (items.length < clampedMax) {
        items.push({ type: 'placeholder' });
      }
    } else {
      const threshold = clampedMax - 3;
      const middlePageCount = clampedMax - 4;

      if (this.page <= threshold) {
        // Show pages from 1 to threshold + 1, then ellipsis, then last page
        for (let i = 1; i <= threshold + 1; i++) {
          items.push({ type: 'page', page: i });
        }
        items.push({ type: 'ellipsis', position: 'right' });
        items.push({ type: 'page', page: this.totalPages });
      } else if (this.page >= this.totalPages - threshold + 1) {
        // Show first page, ellipsis, then pages from (totalPages - threshold) to totalPages
        items.push({ type: 'page', page: 1 });
        items.push({ type: 'ellipsis', position: 'left' });
        for (let i = this.totalPages - threshold; i <= this.totalPages; i++) {
          items.push({ type: 'page', page: i });
        }
      } else {
        // Show first page, ellipsis, pages around current, ellipsis, last page
        const middleStart = this.page - Math.floor((middlePageCount - 1) / 2);
        const middleEnd = this.page + Math.floor(middlePageCount / 2);
        items.push({ type: 'page', page: 1 });
        items.push({ type: 'ellipsis', position: 'left' });
        for (let i = middleStart; i <= middleEnd; i++) {
          items.push({ type: 'page', page: i });
        }
        items.push({ type: 'ellipsis', position: 'right' });
        items.push({ type: 'page', page: this.totalPages });
      }
    }

    return items;
  }

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

  /**
   * Handles ellipsis click to navigate to previous or next group of pages
   * by adding or subtracting the number of middle pages shown
   */
  private handleEllipsisClick(position: 'left' | 'right') {
    const clampedMax = clamp(this.maxButtons, 5, Infinity);
    let newPage;

    if (position === 'left') {
      // For left ellipsis, subtract the number of middle pages
      newPage = Math.max(1, this.page - clampedMax);
    } else {
      // For right ellipsis, add the number of middle pages
      newPage = Math.min(this.totalPages, this.page + clampedMax);
    }

    this.changePage(newPage);
  }

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
                    <quiet-icon library="system" name="chevron-left"></quiet-icon>
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
                  <button part="button button-ellipsis" @click=${() => this.handleEllipsisClick(item.position)}>
                    <quiet-icon library="system" name="dots"></quiet-icon>
                  </button>
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
                    <quiet-icon library="system" name="chevron-right"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
        </ul>
      </nav>
    `;
  }
}
