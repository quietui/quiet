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

  render() {
    const label = this.label || this.localize.term('pagination');
    const isPrevDisabled = this.page <= 1 || this.disabled;
    const isNextDisabled = this.page >= this.totalPages || this.disabled;

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
                  >
                    <quiet-icon name="chevron-left"></quiet-icon>
                  </button>
                </li>
              `
            : ''}
          ${this.withAdjacent
            ? html`
                <li part="item">
                  <button
                    part="button button-next"
                    aria-label="${this.localize.term('next')}"
                    ?disabled=${isNextDisabled}
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

declare global {
  interface HTMLElementTagNameMap {
    'quiet-pagination': QuietPagination;
  }
}
