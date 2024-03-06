import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './callout.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * <quiet-callout>
 *
 * @summary Callouts draw attention to important information, provide context, or prompt users to take action.
 * @documentation https://quietui.com/docs/components/callout
 * @status stable
 * @since 1.0
 *
 * @slot - Content to show in the callout.
 * @slot icon - An optional icon to show in the callout. For best results, use a `<quiet-icon>` or an `<svg>` element.
 *
 * @csspart icon - The container the wraps the icon.
 * @csspart body - The container that wraps the callout's content.
 */
@customElement('quiet-callout')
export class Callout extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'note');
  }

  /** The type of callout to render. */
  @property({ reflect: true }) variant: 'primary' | 'secondary' | 'confirmative' | 'destructive' = 'secondary';

  /** Renders the callout with the `icon` slot. */
  @property({ attribute: 'with-icon', type: Boolean, reflect: true }) withIcon = false;

  render() {
    return html`
      ${this.withIcon
        ? html`
            <div part="icon" class="icon">
              <slot name="icon"></slot>
            </div>
          `
        : ''}

      <div part="body" class="body">
        <slot></slot>
      </div>
    `;
  }
}
