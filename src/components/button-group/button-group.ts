import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './button-group.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietButton } from '../button/button.js';

/**
 * <quiet-button-group>
 *
 * @summary Button groups display related buttons in a stylized group.
 * @documentation https://quietui.com/docs/components/button-group
 * @status stable
 * @since 1.0
 *
 * @slot - One or more `<quiet-button>` elements to place in the button group. You can also slot in dropdowns that have
 *  `<quiet-button>` triggers.
 */
@customElement('quiet-button-group')
export class QuietButtonGroup extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** Gets an array of buttons slotted into the button group. Includes slotted buttons, such as dropdown triggers. */
  private getButtons() {
    return [...this.querySelectorAll<QuietButton>('quiet-button')];
  }

  private handleDefaultSlotChange() {
    const buttons = this.getButtons();

    buttons.forEach((button, index) => {
      button.toggleAttribute('data-button-group-first', index === 0);
      button.toggleAttribute('data-button-group-middle', index > 0 && index < buttons.length - 1);
      button.toggleAttribute('data-button-group-last', index === buttons.length - 1);
    });
  }

  render() {
    return html` <slot @slotchange=${this.handleDefaultSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-button-group': QuietButtonGroup;
  }
}
