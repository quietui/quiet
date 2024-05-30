import { customElement, query } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './button-group.styles.js';
import type { CSSResultGroup } from 'lit';

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

  @query('slot') private defaultSlot: HTMLSlotElement;

  handleDefaultSlotChange() {
    const children = this.defaultSlot.assignedElements({ flatten: true });

    children.forEach((child, index) => {
      // Find the nearest button to apply the button group attributes to. This can be the child itself or a slotted
      // button, e.g. a dropdown trigger.
      const button = child.closest('quiet-button') || child.querySelector('quiet-button');
      if (button) {
        button.toggleAttribute('data-button-group-first', index === 0);
        button.toggleAttribute('data-button-group-middle', index > 0 && index < children.length - 1);
        button.toggleAttribute('data-button-group-last', index === children.length - 1);
      }
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
