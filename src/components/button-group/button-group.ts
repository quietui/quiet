import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import type { QuietButton } from '../button/button.js';
import styles from './button-group.styles.js';

/**
 * <quiet-button-group>
 *
 * @summary Button groups display related buttons in a stylized group.
 * @documentation https://quietui.org/docs/components/button-group
 * @status stable
 * @since 1.0
 *
 * @slot - One or more `<quiet-button>` elements to place in the button group.
 */
@customElement('quiet-button-group')
export class QuietButtonGroup extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The button group's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
      this.updateClassNames();
    }
  }

  /** Gets an array of buttons slotted into the button group. Includes slotted buttons, such as dropdown triggers. */
  private getButtons() {
    return [...this.querySelectorAll<QuietButton>('quiet-button')];
  }

  /** Updates slotted button class names so they get the correct button styles. */
  private updateClassNames() {
    const buttons = this.getButtons();

    buttons.forEach((button, index) => {
      // Set orientational attributes
      button.toggleAttribute('data-button-group-horizontal', this.orientation === 'horizontal');
      button.toggleAttribute('data-button-group-vertical', this.orientation === 'vertical');

      // Set positional attributes
      button.toggleAttribute('data-button-group-first', index === 0);
      button.toggleAttribute('data-button-group-middle', index > 0 && index < buttons.length - 1);
      button.toggleAttribute('data-button-group-last', index === buttons.length - 1);
    });
  }

  render() {
    return html` <slot @slotchange=${this.updateClassNames}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-button-group': QuietButtonGroup;
  }
}
