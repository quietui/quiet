import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietElement } from '../../utilities/quiet-element.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './toolbar.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietButton } from '../button/button.js';
import type { QuietButtonGroup } from '../button-group/button-group.js';

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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'toolbar');
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  /** Gets an array of buttons slotted into the toolbar. Includes slotted buttons, such as dropdown triggers. */
  private getButtons() {
    return [...this.querySelectorAll<QuietButton>('quiet-button')];
  }

  /** Gets an array of button groups slotted into the toolbar. */
  private getButtonGroups() {
    return [...this.querySelectorAll<QuietButtonGroup>('quiet-button-group')];
  }

  private handleDefaultSlotChange() {
    const buttonGroups = this.getButtonGroups();
    const buttons = this.getButtons();

    buttonGroups.forEach(buttonGroup => {
      buttonGroup.orientation = this.orientation;
    });

    buttons.forEach((button, index) => {
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
    const buttons = this.getButtons();
    const targetButton = (event.target as HTMLElement).closest('quiet-button');
    if (!targetButton) return;

    buttons.forEach(button => {
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
