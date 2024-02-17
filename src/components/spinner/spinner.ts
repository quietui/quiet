import { customElement, property } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import sharedStyles from '../../styles/shared.styles.js';
import styles from './spinner.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Spinners indicate a loading state.
 * @documentation https://quietui.com/docs/components/spinner
 * @status stable
 * @since 1.0
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
@customElement('quiet-spinner')
export class QuietSpinner extends LitElement {
  static styles: CSSResultGroup = [sharedStyles, styles];

  /** Disables the button. */
  @property() disabled = false;

  render() {
    return html` SPIN ME `;
  }
}
