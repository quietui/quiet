import '../dropdown-item/dropdown-item.js';
import { animateWithClass } from '../../utilities/animate.js';
import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import { createId } from '../../utilities/math.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { QuietClosedEvent, QuietCloseEvent, QuietOpenedEvent, QuietOpenEvent } from '../../events/open-close.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { QuietSelectEvent } from '../../events/select.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './dropdown.styles.js';
import type { CSSResultGroup } from 'lit';
import type { QuietButton } from '../button/button.js';
import type { QuietDropdownItem } from '../dropdown-item/dropdown-item.js';

const openDropdowns = new Set<QuietDropdown>();

/**
 * <quiet-dropdown>
 *
 * @summary Dropdowns provide a menu of options that appear when the trigger is activated.
 * @documentation https://quietui.com/docs/components/dropdown
 * @status stable
 * @since 1.0
 *
 * @slot - One or more `<dropdown-item>` elements to show in the dropdown. You can also use `<quiet-divider>` here.
 * @slot trigger - The dropdown's trigger. Must be a `<quiet-button>` or `<button>` element.
 *
 * @event quiet-open - Emitted when the dropdown is instructed to open but before it is shown.
 * @event quiet-opened - Emitted when the dropdown menu has opened and the animation has completed.
 * @event quiet-close - Emitted when the dropdown is dismissed but before it is hidden.
 * @event quiet-closed - Emitted when the dropdown menu has closed and the animation has completed.
 * @event quiet-select - Emitted when a dropdown item has been selected. You can inspect `event.detail.item` to see the
 *  `<quiet-dropdown-item>` that was selected. Calling `event.preventDefault()` will keep the dropdown open.
 *
 * @csspart menu - The dropdown menu's container.
 *
 * @cssproperty [--show-duration=50ms] - The duration of the show/hide animation.
 *
 * @dependency quiet-dropdown-item
 */
@customElement('quiet-dropdown')
export class QuietDropdown extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private userTypedQuery = '';
  private userTypedTimeout: number;

  @query('#menu') private menu: HTMLDivElement;

  /** Opens or closes the dropdown. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The placement of the dropdown menu in reference to the trigger. The menu will shift to a more optimal location if
   * the preferred placement doesn't have enough room.
   */
  @property({ reflect: true }) placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'bottom-start';

  /** The distance of the dropdown menu from its trigger. */
  @property({ type: Number }) distance = 0;

  firstUpdated() {
    this.syncAriaAttributes();
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('open')) {
      if (this.open) {
        this.showMenu();
      } else {
        this.hideMenu();
      }
    }
  }

  /** Gets all <quiet-dropdown-item> elements slotted in the menu that aren't disabled. */
  private getItems(): QuietDropdownItem[] {
    return [...this.querySelectorAll('quiet-dropdown-item')].filter(el => el.localName === 'quiet-dropdown-item');
  }

  /** Get the slotted trigger button, a <quiet-button< or <button> element */
  private getTrigger(): HTMLButtonElement | QuietButton | null {
    return this.querySelector<QuietButton | HTMLButtonElement>('[slot="trigger"]');
  }

  /** Shows the dropdown menu. This should only be called from within updated(). */
  private async showMenu() {
    const trigger = this.getTrigger();

    if (!trigger) {
      return;
    }

    const openEvent = new QuietOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    // Close other dropdowns that are open
    openDropdowns.forEach(dropdown => (dropdown.open = false));

    this.menu.showPopover();
    this.open = true;
    openDropdowns.add(this);
    this.syncAriaAttributes();
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    document.addEventListener('focusin', this.handleDocumentFocusIn);

    this.menu.hidden = false;
    this.cleanup = autoUpdate(trigger, this.menu, () => this.reposition());
    await animateWithClass(this.menu, 'show');
    this.dispatchEvent(new QuietOpenedEvent());
  }

  /** Hides the dropdown menu. This should only be called from within updated(). */
  private async hideMenu() {
    const closeEvent = new QuietCloseEvent({ source: this });
    this.dispatchEvent(closeEvent);
    if (closeEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    this.open = false;
    openDropdowns.delete(this);
    this.syncAriaAttributes();
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    document.removeEventListener('focusin', this.handleDocumentFocusIn);

    if (!this.menu.hidden) {
      await animateWithClass(this.menu, 'hide');
      this.menu.hidden = true;
      this.menu.hidePopover();
      this.dispatchEvent(new QuietClosedEvent());
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
      this.removeAttribute('data-placement');
    }
  }

  /** Repositions the dropdown menu */
  private reposition() {
    const trigger = this.getTrigger();
    if (!trigger) return;

    computePosition(trigger, this.menu, {
      placement: this.placement,
      middleware: [
        offset({ mainAxis: this.distance }),
        flip(),
        size({
          apply: ({ availableHeight, availableWidth }) => {
            this.menu.style.maxWidth = `${availableWidth}px`;
            this.menu.style.maxHeight = `${availableHeight}px`;
          },
          padding: 16
        }),
        shift()
      ]
    }).then(({ x, y, placement }) => {
      // Set the determined placement for users to hook into and for transform origin styles
      this.setAttribute('data-placement', placement);

      // Position it
      Object.assign(this.menu.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  /** If focus is set outside of the component, close the menu. */
  private handleDocumentFocusIn = (event: FocusEvent) => {
    const path = event.composedPath();

    if (!path.includes(this)) {
      this.open = false;
    }
  };

  /** Listen for escape when the menu is open */
  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    const items = this.getItems().filter(item => !item.disabled);
    const activeItem = items.find(item => item.active);
    const activeItemIndex = activeItem ? items.indexOf(activeItem) : 0;
    const isFocusedOnItem = document.activeElement?.localName === 'quiet-dropdown-item';
    let itemToSelect: QuietDropdownItem | undefined;

    // Previous item
    if (event.key === 'ArrowUp') {
      const prevIndex = activeItemIndex === 0 ? items.length - 1 : activeItemIndex - 1;
      itemToSelect = isFocusedOnItem ? items[prevIndex] : items[items.length - 1];
    }

    // Next item
    if (event.key === 'ArrowDown') {
      const nextIndex = activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1;
      itemToSelect = isFocusedOnItem ? items[nextIndex] : items[0];
    }

    // Home + end
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      event.stopPropagation();
      itemToSelect = event.key === 'Home' ? items[0] : items[items.length - 1];
    }

    // Update the selection as the user types
    if (
      event.key.length === 1 &&
      // Ignore special key combinations
      !(event.metaKey || event.ctrlKey || event.altKey) &&
      // Ignore spaces if the query is empty
      !(event.key === ' ' && this.userTypedQuery === '')
    ) {
      // Reset the query after a second of inactivity
      clearTimeout(this.userTypedTimeout);
      this.userTypedTimeout = setTimeout(() => {
        this.userTypedQuery = '';
      }, 1000);

      this.userTypedQuery += event.key;

      // Move selection to the first matching item
      items.some(item => {
        const label = (item.textContent || '').trim().toLowerCase();
        const selectionQuery = this.userTypedQuery.trim().toLowerCase();

        if (label.startsWith(selectionQuery)) {
          itemToSelect = item;
          return true;
        }

        return false;
      });
    }

    // If a new item will be selected, update the roving tab index and move focus to it
    if (itemToSelect) {
      event.preventDefault();
      event.stopPropagation();
      items.forEach(item => (item.active = item === itemToSelect));
      itemToSelect.focus();
      return;
    }

    // A selection has been made if enter has been pressed, or if space has been pressed and no query is in progress
    if ((event.key === 'Enter' || (event.key === ' ' && this.userTypedQuery === '')) && isFocusedOnItem) {
      event.preventDefault();
      event.stopPropagation();
      if (activeItem) {
        this.makeSelection(activeItem);
      }
    }

    // Close the menu
    if (event.key === 'Escape') {
      const trigger = this.getTrigger();

      event.preventDefault();
      event.stopPropagation();

      this.open = false;
      trigger?.focus();
    }
  };

  /** Handles pointer down events when the dropdown is open. */
  private handleDocumentPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();

    if (!path.includes(this)) {
      this.open = false;
    }
  };

  /** Handles clicks on the menu. */
  private handleMenuClick(event: PointerEvent) {
    const item = (event.target as Element).closest('quiet-dropdown-item');
    if (item) {
      this.makeSelection(item);
    }
  }

  /** Prepares dropdown items when they get added or removed */
  private async handleMenuSlotChange() {
    const items = this.getItems();
    await Promise.all(items.map(item => item.updateComplete));
    const hasCheckbox = items.some(item => item.type === 'checkbox');

    // Setup the roving tab index
    items.forEach((item, index) => {
      item.active = index === 0;
      item.checkboxAdjacent = hasCheckbox;
    });
  }

  /** Toggles the dropdown menu */
  private handleTriggerClick() {
    this.open = !this.open;
  }

  /** Makes a selection, emits the quiet-select event, and closes the dropdown. */
  private makeSelection(item: QuietDropdownItem) {
    const trigger = this.getTrigger();

    // Disabled items can't be selected
    if (item.disabled) {
      return;
    }

    // Toggle checkbox items and keep the dropdown open
    if (item.type === 'checkbox') {
      item.checked = !item.checked;
    }

    const selectEvent = new QuietSelectEvent({ selection: item });
    this.dispatchEvent(selectEvent);

    // If the event was canceled, keep the dropdown open
    if (!selectEvent.defaultPrevented && item.type !== 'checkbox') {
      this.open = false;
      trigger?.focus();
    }
  }

  /** Syncs aria attributes on the slotted trigger element and the menu based on the dropdown's current state */
  private async syncAriaAttributes() {
    // Set aria attributes on the trigger
    const trigger = this.getTrigger();
    let nativeButton: HTMLButtonElement | undefined;

    if (!trigger) {
      return;
    }

    if (trigger.localName === 'quiet-button') {
      await customElements.whenDefined('quiet-button');
      await (trigger as QuietButton).updateComplete;
      nativeButton = trigger.shadowRoot!.querySelector<HTMLButtonElement>('[part="button"]')!;
    } else {
      nativeButton = trigger as HTMLButtonElement;
    }

    // Set an id on the trigger if one doesn't already exist
    if (!nativeButton.hasAttribute('id')) {
      nativeButton.setAttribute('id', createId('quiet-dropdown-trigger-'));
    }

    nativeButton.setAttribute('aria-haspopup', 'menu');
    nativeButton.setAttribute('aria-expanded', this.open ? 'true' : 'false');

    this.menu.setAttribute('aria-expanded', 'false');
  }

  render() {
    return html`
      <slot name="trigger" @click=${this.handleTriggerClick} @slotchange=${this.syncAriaAttributes}></slot>

      <div
        id="menu"
        part="menu"
        popover="manual"
        role="menu"
        tabindex="-1"
        aria-orientation="vertical"
        hidden
        @click=${this.handleMenuClick}
      >
        <slot @slotchange=${this.handleMenuSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-dropdown': QuietDropdown;
  }
}
