import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { exactSearch, fuzzySearch } from '../../utilities/search.js';
import styles from './search-list.styles.js';

/**
 * <quiet-search-list>
 *
 * @summary Search lists let you easily filter a group of items based on their content and keywords.
 * @documentation https://quietui.org/docs/components/search-list
 * @status experimental
 * @since 1.0
 *
 * @slot - One or more items to be searched. Each item must be a direct descendent of the host element, i.e. do not wrap
 *  items in other containers. If needed, you can apply flex and grid styles to the `items` part to control how items
 *  appear in the list.
 * @slot search-box - A `<quiet-text-field>` or a native `<input>` that will be used as the search box. You must provide
 *  this element or the search list won't be searchable.
 * @slot empty - Content to display when the search yields no results.
 *
 * @csspart items - A container that wraps all child elements in the search list. A flex container by default, but you
 *  can also style it using CSS grid for more complex lists.
 */
@customElement('quiet-search-list')
export class QuietSearchList extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private items: Element[] = [];
  private debounceTimer: number | undefined;

  @state() query = '';
  @state() isEmpty = false;

  /**
   * The search behavior to use when finding a matching item. The `exact` search is case-insensitive but requires an
   * exact match. The `fuzzy` search is more forgiving to typos. When using `custom`, you can set the `searchFunction`
   * property to a custom function to determine if the provided query matches the element's content.
   */
  @property() match: 'exact' | 'fuzzy' | 'custom' = 'exact';

  /** Debounce timeout in milliseconds */
  @property({ type: Number }) debounce = 300;

  /**
   * A custom search function you can provide to change the search behavior. The `query` argument is the current search
   * term, `content` is the element's `textContent` value, and `el` is the element being searched.
   */
  @property({ attribute: false }) searchFunction: (query: string, content: string, el: Element) => boolean;

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.debounceTimer);
  }

  firstUpdated() {
    this.updateResults();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle search type changes
    if (changedProperties.has('match')) {
      this.updateResults();
    }
  }

  private handleDefaultSlotChange() {
    // Collect a list of all immediate child elements
    this.items = [...this.children].filter(el => !el.hasAttribute('slot'));

    // Update results
    this.updateResults();
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
    let wasWarned = false;

    this.items.forEach((item: HTMLElement) => {
      const content = item.textContent || '';
      const keywords = item.dataset.keywords || '';
      const searchableContent = `${content} ${keywords}`;

      if (this.query) {
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
          if (typeof this.searchFunction === 'function') {
            isMatch = this.searchFunction(this.query, searchableContent, item);
          } else {
            // If no search function was provided, warn and fallback to an exact match
            if (!wasWarned) {
              console.warn(`A custom search type was specified but no searchFunction was provided.`, this);
              wasWarned = true;
            }

            isMatch = exactSearch(this.query, searchableContent);
          }
        }

        item.hidden = !isMatch;
      } else {
        item.hidden = false;
      }

      this.isEmpty = this.items.some((item: HTMLElement) => item.hidden !== true);
    });
  }

  render() {
    return html`
      <slot name="search-box" @input=${this.handleInput}></slot>

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
