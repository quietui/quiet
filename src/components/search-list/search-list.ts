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
 * @summary Search lists let you query a collection of items based on their content and keywords.
 * @documentation https://quietui.org/docs/components/search-list
 * @status stable
 * @since 1.0
 *
 * @slot - One or more elements to be searched. Each element must be a direct descendent of the host, i.e. do not wrap
 *  items in other containers. If desired, you can apply flex and grid styles to the `items` part to control how items
 *  appear in the list. By default, items will be displayed in a flex column.
 * @slot controller - A `<quiet-text-field>` or `<input>` element that will control the search list.
 * @slot empty - Optional content to display when the search yields no results.
 *
 * @csspart items - The container that wraps the slotted items. Displays as a flex column by default.
 *
 * @cssstate empty - Applied when a query is entered and no matching results are found.
 */
@customElement('quiet-search-list')
export class QuietSearchList extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private items: Element[] = [];
  private debounceTimeout: ReturnType<typeof setTimeout> | undefined;
  private localize = new Localize(this);
  private resultsTimeout: ReturnType<typeof setTimeout>;

  @query('#results') results: HTMLElement;

  @state() query = '';
  @state() isEmpty = false;
  @state() resultsMessage = '';

  /**
   * In most cases, you should slot the controller into the `controller` slot. However, when the controller must exist
   * outside the search list, you can set this property to the ID of an external `<input>` or `<quiet-text-field>`
   * element instead.
   */
  @property({ reflect: true }) controller: string;

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

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('input', this.handleDocumentInput);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('input', this.handleDocumentInput);
    window.clearTimeout(this.debounceTimeout);
  }

  updated(changedProperties: PropertyValues<this>) {
    // Update the search list based on the controller element's current value
    if (changedProperties.has('controller')) {
      const controller = this.getController();
      if (controller) {
        this.query = controller.value || '';
        this.updateResults();
      }
    }

    // Handle match (search type) changes
    if (changedProperties.has('match')) {
      this.updateResults();
    }

    // Handle empty changes
    if (changedProperties.has('isEmpty')) {
      this.customStates.set('empty', this.isEmpty);
    }
  }

  /** Gets the controller or returns `null` if one can't be found. */
  private getController() {
    const root = this.getRootNode() as Document | ShadowRoot;

    if (this.controller) {
      // Return the linked controller
      return root.getElementById(this.controller) as HTMLInputElement | QuietTextField;
    } else {
      // Return the slotted controller
      return this.querySelector<HTMLInputElement | QuietTextField>('[slot="controller"]');
    }
  }

  private handleDefaultSlotChange() {
    // Collect a list of all immediate child elements
    this.items = [...this.children].filter(el => !el.hasAttribute('slot'));

    // Update results
    this.updateResults();
  }

  private async handleControllerSlotChange() {
    const controller = this.getController();

    // If it's a Quiet text field, make sure it's registered before getting the value
    if (controller?.localName === 'quiet-text-field') {
      await customElements.whenDefined('quiet-text-field');
    }

    // Set the initial value when the controller is slotted in
    if (controller && controller.value !== this.query) {
      this.query = controller.value;
      this.updateResults();
    }
  }

  /** Updates results when the controller's value changes. */
  private handleControllerInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;

    clearTimeout(this.debounceTimeout);

    // Set new timer
    this.debounceTimeout = setTimeout(() => {
      this.query = target.value;
      this.updateResults();
    }, this.debounce);
  };

  /** Listens to all `input` events on the document and responds only to controller events. */
  private handleDocumentInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement | QuietTextField;

    // Did this event come from the linked controller?
    if (target.id === this.controller) {
      this.handleControllerInput(event);
    }
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

    // Update the controller
    const controller = this.getController();
    if (controller && 'value' in controller) {
      controller.value = this.query;
    }
  }

  render() {
    return html`
      <slot
        name="controller"
        @input=${this.handleControllerInput}
        @slotchange=${this.handleControllerSlotChange}
      ></slot>

      <div id="results" class="visually-hidden" role="region" aria-live="polite">${this.resultsMessage}</div>

      <div id="items" part="items">
        <slot @slotchange=${this.handleDefaultSlotChange} ?hidden=${!this.isEmpty}></slot>
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
