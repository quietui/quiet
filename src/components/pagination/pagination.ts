import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  /** A label to use to describe the control to assistive devices. */
  @property() label = '';

  /** The total number of pages to show. */
  @property({ type: Number }) total = 1;

  /** The current page. */
  @property({ type: Number, reflect: true }) page = 1;

  /**
   * The maximum number of pages to display including pages and ellipses. This number does not include adjacent or
   * boundary buttons.
   */
  @property({ attribute: 'max-visible', type: Number }) maxVisible = 8;

  /**
   * Disables the pagination control.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Shows the previous and next buttons.
   */
  @property({ type: Boolean, attribute: 'with-adjacent', reflect: true }) withAdjacent = false;

  /**
   * Shows the first and last buttons.
   */
  @property({ type: Boolean, attribute: 'with-boundary', reflect: true }) withBoundary = false;

  render() {
    const label = this.label || this.localize.term('pagination');

    //
    // Localized terms available: 'pagination', 'firstPage', 'previous', 'next', 'lastPage'
    // For page numbers, use `this.localize.term('pageNumber', currentPageNum)`
    //

    return html`
      <nav part="nav" aria-label="${label}">
        <ul part="list">
          ${this.withBoundary
            ? // first page
              html`
                <li part="item">
                  <button
                    part="button button-first"
                    aria-label="${this.localize.term('firstPage')}"
                    ?disabled="${this.disabled || this.page === 1}"
                  >
                    <quiet-icon name="chevron-left-pipe"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
          ${this.withAdjacent
            ? // previous page
              html`
                <li part="item">
                  <button part="button button-first" aria-label="${this.localize.term('previous')}">
                    <quiet-icon name="chevron-left"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
          ${
            ''
            // add ellipsis using <button class="ellipsis" disabled><quiet-icon name="dots"></quiet-icon></button>
            // add page buttons here, ensuring we never have more than `this.maxVisible` page/ellipsis buttons
            // ensure when there's a gap between page numbers, there's ALWAYS an ellipsis in between that counts as 1 button
            // ensure pages and ellipses are well balanced visually
            // ensure there's NEVER more than one ellipsis next to each other.
            // it's OK to have less buttons than `this.maxVisible` ONLY IF there are less pages available
            // it's NEVER OK to have more buttons than `this.maxVisible`
            // don't make unnecessary abstractions, keep it simple and maintainable
          }
          ${this.withAdjacent
            ? // next page
              html`
                <li part="item">
                  <button part="button button-first" aria-label="${this.localize.term('next')}">
                    <quiet-icon name="chevron-right"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
          ${this.withBoundary
            ? // last page
              html`
                <li part="item">
                  <button
                    part="button button-last"
                    aria-label="${this.localize.term('lastPage')}"
                    ?disabled="${this.disabled || this.page === this.total}"
                  >
                    <quiet-icon name="chevron-right-pipe"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
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
