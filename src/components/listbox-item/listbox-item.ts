import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './listbox-item.styles.js';

/**
 * <quiet-listbox-item>
 *
 * @summary Listbox items represent individual choices within a listbox.
 * @documentation https://quietui.org/docs/components/listbox-item
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot - The listbox item's label. For plain-text labels, you can use the `label` attribute instead.
 *
 * @cssstate selected - Applied when the listbox item is selected.
 * @cssstate disabled - Applied when the listbox item is disabled.
 */
@customElement('quiet-listbox-item')
export class QuietListboxItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /**
   * The listbox item's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The listbox item's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The listbox item's value. */
  @property() value = '';

  /** The listbox item's selected state. */
  @property({ type: Boolean }) selected = false;

  /** Disables the listbox item. */
  @property({ type: Boolean }) disabled = false;

  connectedCallback() {
    super.connectedCallback();

    // Initialize with listbox-focused state if parent is focused
    this.updateComplete.then(() => {
      const listbox = this.closest('quiet-listbox');
      if (listbox) {
        this.customStates.set('listbox-focused', listbox.matches(':state(focused)'));
      }
    });
  }

  firstUpdated() {
    this.setAttribute('role', 'option');
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle selected
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
      this.customStates.set('selected', this.selected);
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);

      // Tell the controller to reset the roving tab index if a selected listbox becomes disabled
      if (this.selected && this.disabled) {
        this.closest('quiet-listbox')?.resetRovingTabIndex();
      }
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-listbox-item': QuietListboxItem;
  }
}
