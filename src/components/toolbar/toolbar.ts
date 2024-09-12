import type { CSSResultGroup } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import type { QuietButtonGroup } from '../button-group/button-group.js';
import type { QuietButton } from '../button/button.js';
import styles from './toolbar.styles.js';

interface GetButtonsOptions {
  includeDisabled: boolean;
}

/**
 * <quiet-toolbar>
 *
 * @summary Toolbar turns a collection of buttons and button groups into an accessible toolbar.
 * @documentation https://quietui.com/docs/components/toolbar
 * @status stable
 * @since 1.0
 *
 * @slot - A mixture of buttons and/or button groups.
 */
@customElement('quiet-toolbar')
export class QuietToolbar extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  /** The toolbar's orientation. This changes which arrow keys are used to select adjacent buttons. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  firstUpdated() {
    this.setAttribute('role', 'toolbar');
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  /** Gets an array of buttons slotted into the toolbar. Includes slotted buttons, such as dropdown triggers. */
  private getButtons(options?: Partial<GetButtonsOptions>) {
    if (options?.includeDisabled) {
      return [...this.querySelectorAll<QuietButton>('quiet-button')];
    } else {
      return [...this.querySelectorAll<QuietButton>('quiet-button:not(:state(disabled))')];
    }
  }

  /** Gets an array of button groups slotted into the toolbar. */
  private getButtonGroups() {
    return [...this.querySelectorAll<QuietButtonGroup>('quiet-button-group')];
  }

  private handleDefaultSlotChange() {
    const buttonGroups = this.getButtonGroups();
    const buttons = this.getButtons({ includeDisabled: true });

    buttonGroups.forEach(buttonGroup => {
      buttonGroup.orientation = this.orientation;
    });

    // Reset the roving tab index when the slot changes
    buttons
      .filter(button => !button.hasAttribute('disabled'))
      .forEach((button, index) => {
        button.tabIndex = index === 0 ? 0 : -1;
      });
  }

  private handleKeyDown(event: KeyboardEvent) {
    const buttons = this.getButtons();
    const activeIndex = buttons.findIndex(button => button.tabIndex === 0);
    const isVertical = this.orientation === 'vertical';
    let nextIndex = -1;

    // Ignore dropdown item keydown events
    if (event.composedPath().some(el => (el as HTMLElement)?.localName === 'quiet-dropdown-item')) {
      return;
    }

    // Previous button
    if ((isVertical && event.key === 'ArrowUp') || (!isVertical && event.key === 'ArrowLeft')) {
      event.preventDefault();
      nextIndex = activeIndex - 1;
      if (nextIndex < 0) nextIndex = buttons.length - 1;
    }

    // Next button
    if ((isVertical && event.key === 'ArrowDown') || (!isVertical && event.key === 'ArrowRight')) {
      event.preventDefault();
      nextIndex = activeIndex + 1;
      if (nextIndex > buttons.length - 1) nextIndex = 0;
    }

    // Home + end
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      nextIndex = event.key === 'Home' ? 0 : buttons.length - 1;
    }

    // Update the roving tab index and move focus to the target
    if (nextIndex > -1) {
      buttons.forEach((button, index) => {
        if (button.disabled) return;

        if (index === nextIndex) {
          button.tabIndex = 0;
          button.focus();
        } else {
          button.tabIndex = -1;
        }
      });
    }
  }

  private handlePointerDown(event: PointerEvent) {
    const buttons = this.getButtons({ includeDisabled: true });
    const targetButton = (event.target as HTMLElement).closest('quiet-button');
    if (!targetButton) return;

    buttons.forEach(button => {
      if (button.disabled) return;

      if (button === targetButton) {
        button.tabIndex = 0;
      } else {
        button.tabIndex = -1;
      }
    });
  }

  render() {
    return html`
      <slot
        @keydown=${this.handleKeyDown}
        @pointerdown=${this.handlePointerDown}
        @slotchange=${this.handleDefaultSlotChange}
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-toolbar': QuietToolbar;
  }
}
