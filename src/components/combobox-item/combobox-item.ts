import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import type { QuietCombobox } from '../combobox/combobox.js';
import styles from './combobox-item.styles.js';

/**
 * <quiet-combobox-item>
 *
 * @summary An item that can be selected from a combobox dropdown.
 * @documentation https://quietui.org/docs/components/combobox-item
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The item's label.
 * @slot icon - An optional icon to display at the start of the item.
 * @slot details - Optional details to display at the end of the item.
 *
 * @csspart icon - The container that wraps the icon slot.
 * @csspart label - The container that wraps the item's label.
 * @csspart details - The container that wraps the details slot.
 * @csspart checkmark - The checkmark icon shown when selected in multiple mode.
 *
 * @cssstate selected - Applied when the item is selected.
 * @cssstate disabled - Applied when the item is disabled.
 * @cssstate active - Applied when the item is active (keyboard navigation).
 */
@customElement('quiet-combobox-item')
export class QuietComboboxItem extends QuietElement {
  static observeSlots = true;
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /** The value to submit when this item is selected. If not provided, the text content is used. */
  @property() value: string;

  /** Disables the item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** @internal Whether the item is currently selected. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** @internal Whether the item is currently active (keyboard navigation). */
  @property({ type: Boolean, reflect: true }) active = false;

  /** @internal Reference to the parent combobox */
  @property({ attribute: false }) public combobox: QuietCombobox | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('tabindex', '-1');
  }

  /** Gets the label text content only (excluding icon and details) */
  getLabelText(): string {
    if (this.defaultSlot) {
      const nodes = this.defaultSlot.assignedNodes({ flatten: true });
      return nodes
        .map(node => node.textContent || '')
        .join('')
        .trim();
    }

    // Fallback to full textContent if we can't find the slot
    return this.textContent?.trim() || '';
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
      this.customStates.set('selected', this.selected);
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('active')) {
      this.customStates.set('active', this.active);
    }
  }

  render() {
    // Check if parent combobox is in multiple mode
    const isMultiple = this.combobox?.multiple ?? false;

    return html`
      <quiet-icon
        part="checkmark"
        class=${classMap({
          checkmark: true,
          selected: this.selected,
          multiple: isMultiple
        })}
        library="system"
        name="check"
      ></quiet-icon>

      <span part="icon" class="icon">
        <slot name="icon"></slot>
      </span>

      <span part="label" class="label">
        <slot></slot>
      </span>

      <span part="details" class="details">
        <slot name="details"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-combobox-item': QuietComboboxItem;
  }
}
