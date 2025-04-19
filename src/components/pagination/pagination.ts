import type { CSSResultGroup, PropertyValues } from 'lit';
import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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

@customElement('quiet-pagination')
export class QuietPagination extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  @query('nav') private nav!: HTMLElement;

  /** A label to use to describe the control to assistive devices. */
  @property() label = '';

  /** The total number of pages to show. */
  @property({ type: Number }) total = 1;

  /** The current page. */
  @property({ type: Number, reflect: true }) page = 1;

  /** The number of siblings (pages displayed to the left and right of the current page). */
  @property({ type: Number }) siblings = 1;

  /** The number of boundary pages (pages displayed at the edges). */
  @property({ type: Number }) boundaries = 1;

  /**
   * Disables the pagination controls.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Show previous and next buttons.
   */
  @property({ type: Boolean, attribute: 'with-next', reflect: true }) withNext = false;

  /**
   * Show first and last buttons.
   */
  @property({ type: Boolean, attribute: 'with-edges', reflect: true }) withEdges = false;

  /**
   * Show page buttons.
   */
  @property({ type: Boolean, attribute: 'with-pages', reflect: true }) withPages = true;

  /**
   * Sets the page and emits a cancellable event.
   */
  setPage(newPage: number) {
    if (this.disabled || newPage === this.page || newPage < 1 || newPage > this.total) {
      return;
    }

    const event = new CustomEvent('quiet-page-change', {
      detail: { page: newPage, previousPage: this.page },
      bubbles: true,
      cancelable: true
    });

    if (this.dispatchEvent(event)) {
      this.page = newPage;
    }
  }

  firstUpdated() {
    this.nav.setAttribute('role', 'navigation');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('label')) {
      this.nav.setAttribute('aria-label', this.label);
    }

    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('page') && this.page > this.total) {
      this.page = this.total;
    }
  }

  private handleClick(event: Event, page: number) {
    event.preventDefault();
    this.setPage(page);
  }

  private getVisibleRange() {
    const { page, total } = this;

    // Ensure page is within valid range
    const currentPage = Math.max(1, Math.min(page, total));

    // For simple cases with few pages, show all pages
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // We want to maintain a consistent structure with the following elements:
    // - First page (1)
    // - Left ellipsis (when needed)
    // - 3 pages (including current page)
    // - Right ellipsis (when needed)
    // - Last page (total)

    const result: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];

    // Always show the first page
    result.push(1);

    // Determine the range around the current page
    if (currentPage <= 4) {
      // Case: pages 1-4 active
      // [1] [2] [3] [4] [5] [...] [total]
      result.push(2, 3, 4, 5);
      result.push('ellipsis-right');
    } else if (currentPage >= total - 3) {
      // Case: pages (total-3) to total active
      // [1] [...] [total-4] [total-3] [total-2] [total-1] [total]
      result.push('ellipsis-left');
      result.push(total - 4, total - 3, total - 2, total - 1);
    } else {
      // Case: middle pages active
      // [1] [...] [currentPage-1] [currentPage] [currentPage+1] [...] [total]
      result.push('ellipsis-left');
      result.push(currentPage - 1, currentPage, currentPage + 1);
      result.push('ellipsis-right');
    }

    // Always show the last page
    result.push(total);

    return result;
  }

  render() {
    const label = this.label || this.localize.term('pagination');

    // Ordering: first/last on edges, prev/next, then page numbers
    return html`
      <nav part="nav" aria-label="${label}">
        <ul part="list">
          <!-- First button (left edge) -->
          ${this.withEdges
            ? html`
                <li part="item">
                  <button
                    part="button button-first"
                    aria-label="${this.localize.term('firstPage')}"
                    ?disabled="${this.disabled || this.page === 1}"
                    @click="${(e: Event) => this.handleClick(e, 1)}"
                  >
                    <quiet-icon name="chevron-left-pipe"></quiet-icon>
                  </button>
                </li>
              `
            : nothing}

          <!-- Previous button -->
          ${this.withNext
            ? html`
                <li part="item">
                  <button
                    part="button button-previous"
                    aria-label="${this.localize.term('previous')}"
                    ?disabled="${this.disabled || this.page === 1}"
                    @click="${(e: Event) => this.handleClick(e, Math.max(1, this.page - 1))}"
                  >
                    <quiet-icon name="chevron-left"></quiet-icon>
                  </button>
                </li>
              `
            : nothing}

          <!-- Page numbers with ellipses -->
          ${this.withPages
            ? this.getVisibleRange().map(item => {
                if (item === 'ellipsis-left' || item === 'ellipsis-right') {
                  return html`
                    <li part="item">
                      <button part="button button-ellipsis" disabled>
                        <quiet-icon name="dots"></quiet-icon>
                      </button>
                    </li>
                  `;
                }

                const pageNumber = item as number;
                const isCurrent = pageNumber === this.page;

                return html`
                  <li part="item">
                    <button
                      part="button button-page ${isCurrent ? 'button-current' : ''}"
                      class=${classMap({ current: isCurrent })}
                      aria-label=${this.localize.term('pageNumber', pageNumber)}
                      aria-current=${isCurrent ? 'page' : 'false'}
                      ?disabled="${this.disabled}"
                      @click="${(event: Event) => this.handleClick(event, pageNumber)}"
                    >
                      ${pageNumber}
                    </button>
                  </li>
                `;
              })
            : nothing}

          <!-- Next button -->
          ${this.withNext
            ? html`
                <li part="item">
                  <button
                    part="button button-next"
                    aria-label="${this.localize.term('next')}"
                    ?disabled="${this.disabled || this.page === this.total}"
                    @click="${(e: Event) => this.handleClick(e, Math.min(this.total, this.page + 1))}"
                  >
                    <quiet-icon name="chevron-right"></quiet-icon>
                  </button>
                </li>
              `
            : nothing}

          <!-- Last button (right edge) -->
          ${this.withEdges
            ? html`
                <li part="item">
                  <button
                    part="button button-last"
                    aria-label="${this.localize.term('lastPage')}"
                    ?disabled="${this.disabled || this.page === this.total}"
                    @click="${(e: Event) => this.handleClick(e, this.total)}"
                  >
                    <quiet-icon name="chevron-right-pipe"></quiet-icon>
                  </button>
                </li>
              `
            : nothing}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-pagination': QuietPagination;
  }
}
