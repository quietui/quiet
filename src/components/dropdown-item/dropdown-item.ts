import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './dropdown-item.styles.js';

/**
 * <quiet-dropdown-item>
 *
 * @summary Dropdown items can be selected from inside a dropdown menu.
 * @documentation https://quietui.org/docs/components/dropdown-item
 * @status stable
 * @since 1.0
 *
 * @slot - The item's label or description.
 * @slot icon - An optional icon to show at the start of the item.
 * @slot details - Optional details, such as a keyboard shortcut, to display at the end of the item.
 *
 * @csspart checkmark - The checkmark icon that's shown when checked, a `<quiet-icon>` element.
 * @csspart checkmark__svg - The checkmark icon's `svg` part.
 * @csspart icon - The container that wraps the icon.
 * @csspart label - The container that wraps the label.
 * @csspart details - The container that wraps the menu item's details.
 *
 * @cssstate active - Applied when the dropdown item is active.
 * @cssstate disabled - Applied when the dropdown item is disabled.
 * @cssstate checked - Applied when the dropdown item is checked.
 */
@customElement('quiet-dropdown-item')
export class QuietDropdownItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  firstUpdated() {
    this.setAttribute('tabindex', '-1');
  }

  /** @internal The controller will set this property to true when the item is active. */
  @property({ type: Boolean }) active = false;

  /**
   * @internal The controller will set this property to true when at least one checkbox exists in the dropdown. This
   * allows non-checkbox items to draw additional space to align properly with checkbox items.
   */
  @property({ attribute: 'checkbox-adjacent', type: Boolean, reflect: true }) checkboxAdjacent = false;

  /**
   * An optional value for the menu item. This is useful for determining which item was selected when listening to the
   * dropdown's `quiet-select` event.
   */
  @property() value: string;

  /** Set to `checkbox` to make the item a checkbox. */
  @property({ reflect: true }) type: 'normal' | 'checkbox' = 'normal';

  /** The type of menu item to render. */
  @property({ reflect: true }) variant: 'destructive' | 'secondary' = 'secondary';

  /** Set to true to check the dropdown item. Only valid when `type` is `checkbox`. */
  @property({ type: Boolean }) checked = false;

  /** Disables the dropdown item. */
  @property({ type: Boolean }) disabled = false;

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('active')) {
      this.setAttribute('tabindex', this.active ? '0' : '-1');
      this.customStates.set('active', this.active);
    }

    if (changedProps.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.customStates.set('checked', this.checked);
    }

    if (changedProps.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProps.has('type')) {
      if (this.type === 'checkbox') {
        this.setAttribute('role', 'menuitemcheckbox');
      } else {
        this.setAttribute('role', 'menuitem');
      }
    }
  }

  render() {
    return html`
      ${this.type === 'checkbox'
        ? html`
            <quiet-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></quiet-icon>
          `
        : ''}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-dropdown-item': QuietDropdownItem;
  }
}
