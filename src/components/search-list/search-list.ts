import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { exactSearch, fuzzySearch } from '../../utilities/search.js';
import type { QuietTextField } from '../text-field/text-field.js';
import styles from './search-list.styles.js';

/**
 * <quiet-search-list>
 *
 * @summary Search lists let you filter a group of items based on their content and keywords.
 * @documentation https://quietui.org/docs/components/search-list
 * @status stable
 * @since 1.0
 *
 * @slot - One or more elements to be searched. Each element must be a direct descendent of the host, i.e. do not wrap
 *  items in other containers. If desired, you can apply flex and grid styles to the `items` part to control how items
 *  appear in the list. By default, items will be displayed in a flex column.
 * @slot search-box - A `<quiet-text-field>` or a native `<input>` that will be used as the search box. Make sure to
 *  provide a label. You must provide a search element or the search list won't function.
 * @slot empty - Optional content to display when the search yields no results.
 *
 * @csspart items - A container that wraps all child elements in the search list. A flex container by default, but you
 *  can also style it using CSS grid for more complex lists.
 */
@customElement('quiet-search-list')
export class QuietSearchList extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private items: Element[] = [];
  private debounceTimer: number | undefined;
  private localize = new Localize(this);
  private resultsTimeout: number;

  @query('#results') results: HTMLElement;

  @state() query = '';
  @state() isEmpty = false;
  @state() resultsMessage = '';

  /**
   * The search behavior to use when finding a matching item. The `exact` search is case-insensitive but requires an
   * exact match. The `fuzzy` search is more forgiving to typos. When using `custom`, you can set the `isMatch` property
   * to a custom function to determine if the provided query matches the element's content.
   */
  @property() match: 'exact' | 'fuzzy' | 'custom' = 'exact';

  /** The time in milliseconds to use for debouncing the search results while the user types.  */
  @property({ type: Number }) debounce = 300;

  /**
   * A custom search function you can provide to change the search behavior. The function is applied to each item when
   * the search query changes. The `query` argument is the current search term, `content` is a string containing the
   * element's searchable content, including its `textContent` and `data-keywords"`, and `el` is the element being
   * searched. Property only.
   */
  @property({ attribute: false }) isMatch: (query: string, content: string, el: Element) => boolean;

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.debounceTimer);
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle search type changes
    if (changedProperties.has('match')) {
      this.updateResults();
    }
  }

  /** Gets the first  */
  private getSearchBox() {
    return this.querySelector<HTMLInputElement | QuietTextField>('[slot="search-box"]');
  }

  private handleDefaultSlotChange() {
    // Collect a list of all immediate child elements
    this.items = [...this.children].filter(el => !el.hasAttribute('slot'));

    // Update results
    this.updateResults();
  }

  private async handleSearchBoxSlotChange() {
    const searchBox = this.getSearchBox();

    // If it's a Quiet text field, make sure it's registered before getting the value
    if (searchBox?.localName === 'quiet-text-field') {
      await customElements.whenDefined('quiet-text-field');
    }

    // Set the initial value when the search box is slotted in
    if (searchBox && searchBox.value !== this.query) {
      this.query = searchBox.value;
      this.updateResults();
    }
  }

  private handleInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;

    clearTimeout(this.debounceTimer);

    // Set new timer
    this.debounceTimer = setTimeout(() => {
      this.query = target.value;
      this.updateResults();
    }, this.debounce);
  };

  private updateResults() {
    const hasQuery = this.query.length > 0;
    let numResults = 0;
    let wasWarned = false;

    this.items.forEach((item: HTMLElement) => {
      const content = item.textContent || '';
      const keywords = item.dataset.keywords || '';
      const searchableContent = `${content} ${keywords}`;

      if (hasQuery) {
        let isMatch = false;

        // Exact search
        if (this.match === 'exact') {
          isMatch = exactSearch(this.query, searchableContent);
        }

        // Fuzzy search
        if (this.match === 'fuzzy') {
          isMatch = fuzzySearch(this.query, searchableContent);
        }

        // Custom search
        if (this.match === 'custom') {
          if (typeof this.isMatch === 'function') {
            isMatch = this.isMatch(this.query, searchableContent, item);
          } else {
            // If no search function was provided, warn and fallback to an exact match
            if (!wasWarned) {
              console.warn(`A custom search type was specified but no isMatch function was provided.`, this);
              wasWarned = true;
            }

            isMatch = exactSearch(this.query, searchableContent);
          }
        }

        item.hidden = !isMatch;
        if (isMatch) numResults++;
      } else {
        item.hidden = false;
      }
    });

    // Toggle empty state
    this.isEmpty = this.items.some((item: HTMLElement) => item.hidden !== true);

    // Update results for screen readers after a brief delay
    clearTimeout(this.resultsTimeout);
    this.resultsTimeout = setTimeout(() => {
      if (hasQuery) {
        this.resultsMessage = this.localize.term('showingNumberOfTotalItems', numResults, this.items.length);
      } else {
        this.resultsMessage = this.localize.term('showingAllNumberItems', this.items.length);
      }
    }, 1000);
  }

  /** Sets the search query and updates the results. To clear the search, set this to an empty string. */
  public setQuery(query = '') {
    this.query = query;
    this.updateResults();

    // Update the search box
    const searchBox = this.getSearchBox();
    if (searchBox && 'value' in searchBox) {
      searchBox.value = this.query;
    }
  }

  render() {
    return html`
      <slot name="search-box" @input=${this.handleInput} @slotchange=${this.handleSearchBoxSlotChange}></slot>

      <div id="results" class="visually-hidden" role="region" aria-live="polite">${this.resultsMessage}</div>

      <div id="items" part="items" ?hidden=${!this.isEmpty}>
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
      </div>

      <slot name="empty" ?hidden=${this.isEmpty}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-search-list': QuietSearchList;
  }
}
