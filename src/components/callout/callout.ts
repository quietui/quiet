import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './callout.styles.js';

/**
 * <quiet-callout>
 *
 * @summary Callouts draw attention to important information, provide context, or prompt users to take action.
 * @documentation https://quietui.org/docs/components/callout
 * @status stable
 * @since 1.0
 *
 * @slot - Content to show in the callout.
 * @slot icon - An optional icon to show in the callout. Works well with `<quiet-icon>` and `<svg>` elements.
 *
 * @csspart icon - The container the wraps the icon.
 * @csspart body - The container that wraps the callout's content.
 */
@customElement('quiet-callout')
export class QuietCallout extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];
  static observeSlots = true;

  firstUpdated() {
    this.setAttribute('role', 'note');
  }

  /** The type of callout to render. */
  @property({ reflect: true }) variant: 'default' | 'primary' | 'constructive' | 'destructive' = 'default';

  render() {
    return html`
      ${this.whenSlotted(
        'icon',
        html`
          <div id="icon" part="icon">
            <slot name="icon"></slot>
          </div>
        `
      )}

      <div id="body" part="body">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-callout': QuietCallout;
  }
}
