import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './search-list.styles.js';

/**
 * <quiet-search-list>
 *
 * @summary Search lists let you easily filter a group of items based on their content and keywords.
 * @documentation https://quietui.org/docs/components/search-list
 * @status experimental
 * @since 1.0
 *
 * @slot - TODO
 * @slot search-box
 *
 * @csspart items - TODO
 */
@customElement('quiet-search-list')
export class QuietSearchList extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private items: Element[] = [];

  @state() query = '';
  @state() isEmpty = false;

  /** Description of the property. */
  @property() type: 'exact' | 'fuzzy' = 'exact';

  firstUpdated() {
    this.updateResults();
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle search type changes
    if (changedProperties.has('type')) {
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

    // Update the query
    this.query = target.value;

    // Update results
    this.updateResults();
  };

  private updateResults() {
    this.items.forEach((item: HTMLElement) => {
      const content = item.textContent || '';

      if (this.query) {
        item.hidden = !content.toLowerCase().includes(this.query.toLowerCase());
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
