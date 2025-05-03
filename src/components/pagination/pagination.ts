import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { QuietBeforePageChangeEvent, QuietPageChangeEvent } from '../../events/page.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './pagination.styles.js';

type PaginationButton =
  | {
      type: 'page';
      page: number;
    }
  | {
      type: 'jump';
      position: 'start' | 'end';
    };

/**
 * <quiet-pagination>
 *
 * @summary Pagination splits content into numbered pages so users can navigate datasets in manageable chunks.
 * @documentation https://quietui.org/docs/components/pagination
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot previous-icon - A custom icon to use for the previous button.
 * @slot next-icon - A custom icon to use for the next button.
 * @slot jump-backward-icon - A custom icon to use for the jump backward button.
 * @slot jump-forward-icon - A custom icon to use for jump forward button.
 *
 * @event quiet-before-page-change - Emitted when the page is going to change but before it actually changes. Calling
 *  `event.preventDefault()` will prevent the page from changing. Inspect `event.detail` to get the `currentPage` and
 *  `requestedPage` properties.
 * @event quiet-page-change - Emitted after the page has been changed and the UI has been updated.
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
 * @csspart button-jump-backward - The jump backward button.
 * @csspart button-jump-forward - The jump forward button.
 * @csspart range - The page range that shows the page when viewed in the compact format, e.g. "1 of 10".
 *
 * @cssstate disabled - Applied when the pagination is disabled.
 */
@customElement('quiet-pagination')
export class QuietPagination extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private localize = new Localize(this);

  /** A label to use to describe the control to assistive devices. Defaults to "Pagination" when not set. */
  @property() label = '';

  /** The total number of pages to show. */
  @property({ attribute: 'total-pages', type: Number }) totalPages = 1;

  /** The current page. */
  @property({ type: Number, reflect: true }) page = 1;

  /** The number of pages to show on each side of the current page. Minimum 2. */
  @property({ attribute: 'siblings', type: Number }) siblings = 3;

  /** The number of pages to increase or decrease when jump buttons are clicked. */
  @property({ attribute: 'jump', type: Number }) jump = 5;

  /** How the pagination will display buttons. */
  @property({ reflect: true }) format: 'compact' | 'standard' = 'standard';

  /** Disables the pagination control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Removes the previous and next buttons. */
  @property({ type: Boolean, attribute: 'without-nav', reflect: true }) withoutNav = false;

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);

    // Ensure page is always a number, even if the user passes in a string
    if (changedProperties.has('page')) {
      this.page = Number(this.page);
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }
  }

  /** Changes the current page, emitting a cancellable 'quiet-page-change' event. */
  private async changePage(newPage: number) {
    // Exit if new page is invalid or same as current
    if (newPage < 1 || newPage > this.totalPages || newPage === this.page) return;

    // Dispatch `quiet-before-page-change`
    const beforePageChangeEvent = new QuietBeforePageChangeEvent({ currentPage: this.page, requestedPage: newPage });
    this.dispatchEvent(beforePageChangeEvent);
    if (beforePageChangeEvent.defaultPrevented) {
      return;
    }

    // Switch to the new page
    this.page = newPage;
    await this.updateComplete;

    // Dispatch `quiet-page-change` after the UI updates
    const pageChangeEvent = new QuietPageChangeEvent();
    this.dispatchEvent(pageChangeEvent);
  }

  /** Generates the list of pagination items, including pages and jump buttons. */
  private getPaginationItems(): PaginationButton[] {
    const items: PaginationButton[] = [];
    const totalButtons = 2 * this.siblings + 1; // Current page + siblings on both sides
    const clampedTotalButtons = clamp(totalButtons, 5, Infinity);

    if (this.totalPages < 1) return items;

    if (this.totalPages <= clampedTotalButtons) {
      // Show all pages and add placeholders if needed
      for (let i = 1; i <= this.totalPages; i++) {
        items.push({ type: 'page', page: i });
      }
    } else {
      const middlePageCount = clampedTotalButtons - 4; // For pages between first/last and jump buttons
      const sideButtons = Math.floor(middlePageCount / 2);

      // Determine if we need to show jumps at start and/or end
      const showJumpBackward = this.page > sideButtons + 2;
      const showJumpForward = this.page < this.totalPages - sideButtons - 1;

      // Calculate start and end of visible page range
      let rangeStart, rangeEnd;

      if (!showJumpBackward && showJumpForward) {
        // Near start, show more pages at beginning
        rangeStart = 2;
        rangeEnd = clampedTotalButtons - 2;
      } else if (showJumpBackward && !showJumpForward) {
        // Near end, show more pages at end
        rangeStart = this.totalPages - (clampedTotalButtons - 3);
        rangeEnd = this.totalPages - 1;
      } else if (showJumpBackward && showJumpForward) {
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
        // No jump needed, show all possible pages
        rangeStart = 2;
        rangeEnd = this.totalPages - 1;
      }

      // Add first page
      items.push({ type: 'page', page: 1 });

      // Check if we should show page 2 instead of the jump button
      if (rangeStart === 3) {
        items.push({ type: 'page', page: 2 });
      } else if (showJumpBackward) {
        items.push({ type: 'jump', position: 'start' });
      }

      // Add range of pages
      for (let i = rangeStart; i <= rangeEnd; i++) {
        items.push({ type: 'page', page: i });
      }

      // Check if we should show second-to-last page instead of the jump button
      if (rangeEnd === this.totalPages - 2) {
        items.push({ type: 'page', page: this.totalPages - 1 });
      } else if (showJumpForward) {
        items.push({ type: 'jump', position: 'end' });
      }

      // Add last page
      items.push({ type: 'page', page: this.totalPages });
    }

    return items;
  }

  private handleJump(position: 'start' | 'end') {
    let newPage: number;
    if (position === 'start') {
      // Jump backwards, but stop at page 2
      newPage = Math.max(2, this.page - this.jump);
    } else {
      // Jump forward, but but stop at totalPages - 1
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

    // Previous button
    const previousButton = html`
      <li part="item">
        <button
          part="button button-previous"
          aria-label="${this.localize.term('previous')}"
          ?disabled=${isPrevDisabled || this.disabled}
          @click=${() => this.changePage(this.page - 1)}
        >
          <slot name="previous-icon"> ${isRtl ? chevronRightIcon : chevronLeftIcon} </slot>
        </button>
      </li>
    `;

    // Next button
    const nextButton = html`
      <li part="item">
        <button
          part="button button-next"
          aria-label="${this.localize.term('next')}"
          ?disabled=${isNextDisabled || this.disabled}
          @click=${() => this.changePage(this.page + 1)}
        >
          <slot name="next-icon"> ${isRtl ? chevronLeftIcon : chevronRightIcon} </slot>
        </button>
      </li>
    `;

    // Render the compact format
    if (this.format === 'compact') {
      return html`
        <nav id="nav" part="nav" aria-label="${label}">
          <ul id="list" part="list">
            ${this.withoutNav ? '' : previousButton}
            <li part="item">
              <span id="range" part="range">
                ${this.localize.term(
                  'numberOfTotal',
                  this.localize.number(this.page, { useGrouping: true }),
                  this.localize.number(this.totalPages, { useGrouping: true })
                )}
              </span>
            </li>
            ${this.withoutNav ? '' : nextButton}
          </ul>
        </nav>
      `;
    }

    // Render the standard format
    return html`
      <nav part="nav" aria-label="${label}">
        <ul part="list">
          ${this.withoutNav ? '' : previousButton}
          ${this.getPaginationItems().map(item => {
            if (item.type === 'jump') {
              return html`
                <li part="item">
                  <button
                    part="button ${item.position === 'start' ? 'button-jump-backward' : 'button-jump-forward'}"
                    aria-label="${this.localize.term(item.position === 'start' ? 'jumpBackward' : 'jumpForward')}"
                    ?disabled=${this.disabled}
                    @click=${() => this.handleJump(item.position)}
                  >
                    <slot name=${item.position === 'start' ? 'jump-backward-icon' : 'jump-forward-icon'}>
                      <quiet-icon library="system" name="dots"></quiet-icon>
                    </slot>
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
                    class=${classMap({ current: isCurrent })}
                    aria-label=${this.localize.term('pageNumber', item.page)}
                    aria-current=${ifDefined(isCurrent ? 'page' : undefined)}
                    ?disabled=${this.disabled}
                    @click=${() => this.changePage(item.page)}
                  >
                    ${this.localize.number(item.page, { useGrouping: true })}
                  </button>
                </li>
              `;
            }
          })}
          ${this.withoutNav ? '' : nextButton}
        </ul>
      </nav>
    `;
  }
}
