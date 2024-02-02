import { customElement, property } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import sharedStyles from '../../styles/shared.styles.js';
import styles from './button.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Buttons allow users to perform an action.
 * @documentation https://quietui.com/components/button
 * @status stable
 * @since 1.0
 *
 * @dependency sl-icon
 * @dependency sl-spinner
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart label - The label's container element.
 * @csspart prefix - The prefix's container element.
 * @csspart suffix - The suffix container element.
 */
@customElement('quiet-button')
export class QuietButton extends LitElement {
  static styles: CSSResultGroup = [sharedStyles, styles];

  /** Disables the button. */
  @property() disabled = false;

  render() {
    return html` <button type="button"><slot></slot></button> `;
  }
}
