import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, literal } from 'lit/static-html.js';
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
 * @csspart button - A pagination button, a `<button>` or an `<a>` element.
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

  /**
   * A string that, when provided, renders `<a>` elements instead of `<${tag}s>` using this as the link's template.
   * Use `$page` to indicate the page number, e.g. `"/path/to/$page"`. Alternatively, you can provide a JavaScript
   * function that accepts a page number and returns a URL.
   */
  @property({ attribute: 'link-formatter' }) linkFormatter: string | ((page: number) => string) = '';

  /** Disables the pagination control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Determine's the pagination's appearance. */
  @property({ reflect: true }) appearance: 'normal' | 'filled' | 'unstyled' = 'normal';

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
    // Don't change the page when disabled or if a link formatter was provided
    if (this.disabled || this.linkFormatter) return;

    // Don't change the page if the target is invalid or the current page
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

  private handleNavClick(event: PointerEvent) {
    // When disabled, we prevent clicks bubbling up through the nav, which means `<a>` elements are also "disabled"
    if (this.disabled) {
      event.preventDefault();
    }
  }

  private renderLink(page: number) {
    page = clamp(page, 1, this.totalPages);

    if (typeof this.linkFormatter === 'string') {
      return this.linkFormatter.replace(/\{page\}/g, page + '');
    } else if (typeof this.linkFormatter === 'function') {
      return this.linkFormatter(page);
    } else {
      return undefined;
    }
  }

  render() {
    const isLink = this.linkFormatter;
    const tag = isLink ? literal`a` : literal`button`;
    const label = this.label || this.localize.term('pagination');
    const isPrevDisabled = this.page <= 1 || this.disabled;
    const isNextDisabled = this.page >= this.totalPages || this.disabled;
    const isRtl = this.localize.dir() === 'rtl';
    const chevronLeftIcon = html`<quiet-icon library="system" name="chevron-left"></quiet-icon>`;
    const chevronRightIcon = html`<quiet-icon library="system" name="chevron-right"></quiet-icon>`;
    let content;

    // Shared navigation buttons
    const previousButton = html`
      <li part="item">
        <${tag}
          href=${ifDefined(this.renderLink(this.page - 1))}
          part="button button-previous"
          class=${classMap({ disabled: isPrevDisabled || this.disabled })}
          aria-label="${this.localize.term('previous')}"
          ?disabled=${ifDefined(isLink ? undefined : isPrevDisabled || this.disabled)}
          tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
          @click=${() => this.changePage(this.page - 1)}
        >
          <slot name="previous-icon"> ${isRtl ? chevronRightIcon : chevronLeftIcon} </slot>
        </${tag}>
      </li>
    `;
    const nextButton = html`
      <li part="item">
        <${tag}
          href=${ifDefined(this.renderLink(this.page + 1))}
          part="button button-next"
          class=${classMap({ disabled: isNextDisabled || this.disabled })}
          aria-label="${this.localize.term('next')}"
          ?disabled=${ifDefined(isLink ? undefined : isNextDisabled || this.disabled)}
          tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
          @click=${() => this.changePage(this.page + 1)}
        >
          <slot name="next-icon"> ${isRtl ? chevronLeftIcon : chevronRightIcon} </slot>
        </${tag}>
      </li>
    `;

    if (this.format === 'compact') {
      // Compact format
      content = html`
        <li part="item">
          <span id="range" part="range">
            ${this.localize.term(
              'numberOfTotal',
              this.localize.number(this.page, { useGrouping: true }),
              this.localize.number(this.totalPages, { useGrouping: true })
            )}
          </span>
        </li>
      `;
    } else {
      // Standard format
      content = this.getPaginationItems().map(item => {
        if (item.type === 'jump') {
          const jumpToPage = this.page + (item.position === 'start' ? -5 : 5);

          return html`
            <li part="item">
              <${tag}
                href=${ifDefined(this.renderLink(jumpToPage))}
                part="button ${item.position === 'start' ? 'button-jump-backward' : 'button-jump-forward'}"
                class=${classMap({ disabled: this.disabled })}
                aria-label="${this.localize.term(item.position === 'start' ? 'jumpBackward' : 'jumpForward')}"
                ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
                tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
                @click=${() => this.changePage(clamp(this.page + (item.position === 'start' ? -5 : 5), 1, this.totalPages))}
              >
                <slot name=${item.position === 'start' ? 'jump-backward-icon' : 'jump-forward-icon'}>
                  <quiet-icon library="system" name="dots" family="filled"></quiet-icon>
                </slot>
              </${tag}>
            </li>
          `;
        } else {
          // Render a page
          const isCurrent = item.page === this.page;
          const part = `button button-page${isCurrent ? ' button-current' : ''}${item.page === 1 ? ' button-first' : ''}${item.page === this.totalPages ? ' button-last' : ''}`;
          return html`
            <li part="item">
              <${tag}
                href=${ifDefined(this.renderLink(item.page))}
                part=${part}
                class=${classMap({ current: isCurrent, disabled: this.disabled })}
                aria-label=${this.localize.term('pageNumber', item.page)}
                aria-current=${ifDefined(isCurrent ? 'page' : undefined)}
                ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
                tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
                @click=${() => this.changePage(item.page)}
              >
                ${this.localize.number(item.page, { useGrouping: true })}
              </${tag}>
            </li>
          `;
        }
      });
    }

    // Shared nav and ul structure
    return html`
      <nav id="nav" part="nav" aria-label="${label}" @click=${this.handleNavClick}>
        <ul id="list" part="list">
          ${this.withoutNav ? '' : previousButton} ${content} ${this.withoutNav ? '' : nextButton}
        </ul>
      </nav>
    `;
  }
}
