import type { VirtualElement } from '@floating-ui/dom';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  QuietBeforeCloseEvent,
  QuietBeforeOpenEvent,
  QuietCloseEvent,
  QuietOpenEvent
} from '../../events/open-close.js';
import { QuietSelectEvent } from '../../events/select.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { LongPress, LongPressEvent } from '../../utilities/long-press.js';
import { createId } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import { lockScrolling, unlockScrolling } from '../../utilities/scroll.js';
import type { QuietButton } from '../button/button.js';
import '../dropdown-item/dropdown-item.js';
import type { QuietDropdownItem } from '../dropdown-item/dropdown-item.js';
import styles from './dropdown.styles.js';

const openDropdowns = new Set<QuietDropdown>();

/**
 * <quiet-dropdown>
 *
 * @summary Dropdowns provide a menu of options that appear when the corresponding trigger is activated.
 * @documentation https://quietui.org/docs/components/dropdown
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-dropdown-item
 *
 * @slot - One or more `<dropdown-item>` elements to show in the dropdown. You can also use `<quiet-divider>` here.
 * @slot trigger - The dropdown's trigger. Must be a `<quiet-button>` or `<button>` element.
 *
 * @event quiet-before-open - Emitted when the dropdown is instructed to open but before it is shown.
 * @event quiet-open - Emitted when the dropdown menu has opened and the animation has completed.
 * @event quiet-before-close - Emitted when the dropdown is dismissed but before it is hidden.
 * @event quiet-close - Emitted when the dropdown menu has closed and the animation has completed.
 * @event quiet-select - Emitted when a dropdown item has been selected. You can inspect `event.detail.item` to see the
 *  `<quiet-dropdown-item>` that was selected. Calling `event.preventDefault()` will keep the dropdown open.
 *
 * @cssproperty [--show-duration=50ms] - The duration of the show/hide animation.
 *
 * @csspart menu - The dropdown menu's container.
 *
 * @cssstate open - Applied when the dropdown is open.
 */
@customElement('quiet-dropdown')
export class QuietDropdown extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private cleanup: ReturnType<typeof autoUpdate> | undefined;
  private contextMenuElement: HTMLElement | null;
  private contextMenuLongPress: LongPress;
  private contextMenuVirtualElement: VirtualElement | undefined;
  private userTypedQuery = '';
  private userTypedTimeout: ReturnType<typeof setTimeout>;

  @query('#menu') private menu: HTMLDivElement;

  /** Opens or closes the dropdown. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The ID of an element to apply the dropdown as a context menu. */
  @property({ attribute: 'context-menu' }) contextMenu = '';

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

  /** The offset of the dropdown menu along its trigger. */
  @property({ type: Number }) offset = 0;

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.userTypedTimeout);
    this.closeAllSubmenus();
  }

  firstUpdated() {
    this.syncAriaAttributes();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      this.customStates.set('open', this.open);

      if (this.open) {
        this.showMenu();
      } else {
        this.closeAllSubmenus();
        this.hideMenu();
      }
    }

    // Handle context element changes
    if (changedProperties.has('contextMenu')) {
      const root = this.getRootNode() as Document | ShadowRoot;

      // Tear down the old context element
      if (this.contextMenuElement) {
        this.contextMenuLongPress?.stop();
        this.contextMenuElement.removeEventListener('contextmenu', this.handleContextMenu);
        this.contextMenuElement.removeEventListener('quiet-long-press', this.handleContextMenu);
      }

      // Setup the new context element
      this.contextMenuElement = this.contextMenu ? root.querySelector(`#${this.contextMenu}`) : null;

      if (this.contextMenuElement) {
        this.contextMenuLongPress = new LongPress(this.contextMenuElement, {
          eventName: 'quiet-long-press',
          ignorePointerEvents: true
        });
        this.contextMenuLongPress.start();
        this.contextMenuElement.addEventListener('contextmenu', this.handleContextMenu);
        this.contextMenuElement.addEventListener('quiet-long-press', this.handleContextMenu);
      } else if (this.contextMenu) {
        // If `context` is provided and the element isn't found, show a warning
        console.warn(
          `A dropdown was assigned as a context menu to an element with an ID of "${this.contextMenu}" but the element could not be found.`,
          this
        );
      }
    }
  }

  /** Gets all <quiet-dropdown-item> elements slotted in the menu that aren't disabled. */
  private getItems(): QuietDropdownItem[] {
    return [...this.querySelectorAll('quiet-dropdown-item:not([slot="submenu"])')].filter(
      el => el.localName === 'quiet-dropdown-item'
    );
  }

  /** Closes all submenus in the dropdown. */
  private closeAllSubmenus() {
    const items = this.getItems();
    items.forEach(item => {
      item.submenuOpen = false;
    });
  }

  /** Closes all submenus except for the specified item. */
  private closeAllSubmenusExcept(exceptItem: QuietDropdownItem) {
    const items = this.getItems();
    items.forEach(item => {
      if (item !== exceptItem) {
        item.submenuOpen = false;
      }
    });
  }

  /** Get the slotted trigger button, a <quiet-button< or <button> element */
  private getTrigger(): HTMLButtonElement | QuietButton | null {
    return this.querySelector<QuietButton | HTMLButtonElement>('[slot="trigger"]');
  }

  /** Shows the dropdown menu. This should only be called from within updated(). */
  private async showMenu() {
    const anchor = this.contextMenu ? this.contextMenuVirtualElement : this.getTrigger();
    if (!anchor) return;

    const openEvent = new QuietBeforeOpenEvent();
    this.dispatchEvent(openEvent);
    if (openEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    // Close other dropdowns that are open
    openDropdowns.forEach(dropdown => (dropdown.open = false));

    this.menu.showPopover();
    this.open = true;
    if (this.contextMenu) lockScrolling(this);
    openDropdowns.add(this);
    this.syncAriaAttributes();
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    document.addEventListener('focusin', this.handleDocumentFocusIn);

    this.menu.hidden = false;
    this.cleanup = autoUpdate(anchor, this.menu, () => this.reposition());
    await animateWithClass(this.menu, 'show');
    this.dispatchEvent(new QuietOpenEvent());
  }

  /** Hides the dropdown menu. This should only be called from within updated(). */
  private async hideMenu() {
    const closeEvent = new QuietBeforeCloseEvent({ source: this });
    this.dispatchEvent(closeEvent);
    if (closeEvent.defaultPrevented) {
      this.open = true;
      return;
    }

    this.open = false;
    unlockScrolling(this);
    openDropdowns.delete(this);
    this.syncAriaAttributes();
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
    document.removeEventListener('focusin', this.handleDocumentFocusIn);

    if (!this.menu.hidden) {
      await animateWithClass(this.menu, 'hide');
      this.menu.hidden = true;
      this.menu.hidePopover();
      this.dispatchEvent(new QuietCloseEvent());
    }

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
      this.removeAttribute('data-placement');
    }
  }

  /** Repositions the dropdown menu */
  private reposition() {
    const anchor = this.contextMenu ? this.contextMenuVirtualElement : this.getTrigger();
    if (!anchor) return;

    computePosition(anchor, this.menu, {
      placement: this.placement,
      middleware: [offset({ mainAxis: this.distance, crossAxis: this.offset }), flip(), shift()]
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

    if (!path.includes(this) && this.contextMenuElement && !path.includes(this.contextMenuElement)) {
      this.open = false;
    }
  };

  /** Handles key down events when the menu is open */
  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Escape key should close the entire dropdown hierarchy immediately
    if (event.key === 'Escape') {
      const trigger = this.getTrigger();

      event.preventDefault();
      event.stopPropagation();

      this.open = false;
      trigger?.focus();
      return;
    }

    // Check if we're in a submenu - if so, let the parent item handle it
    const activeElement = document.activeElement as HTMLElement;
    const inSubmenu = activeElement?.closest('quiet-dropdown-item[slot="submenu"]');

    if (
      inSubmenu &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ')
    ) {
      // Let the parent item handle these keys
      return;
    }

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

    // Tab key
    if (event.key === 'Tab') {
      this.hideMenu();
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

      const focusedItem = document.activeElement as QuietDropdownItem;

      // Handle submenu items - they should trigger selection just like regular items
      if (
        focusedItem &&
        focusedItem.getAttribute('slot') === 'submenu' &&
        (!focusedItem.slotsWithContent || !focusedItem.slotsWithContent.has('submenu'))
      ) {
        this.makeSelection(focusedItem);
        return;
      }

      // Handle top-level items
      if (activeItem) {
        // If the active item has a submenu, open it instead of making a selection
        if (activeItem.slotsWithContent.has('submenu') && !activeItem.submenuOpen) {
          activeItem.submenuOpen = true;
        } else if (!activeItem.slotsWithContent.has('submenu')) {
          this.makeSelection(activeItem);
        }
      }
    }

    // Handle arrow right for opening submenus
    if (
      event.key === 'ArrowRight' &&
      isFocusedOnItem &&
      activeItem &&
      activeItem.slotsWithContent.has('submenu') &&
      !activeItem.submenuOpen
    ) {
      event.preventDefault();
      event.stopPropagation();

      // Close all other open submenus before opening this one
      this.closeAllSubmenusExcept(activeItem);

      // Open this submenu
      activeItem.submenuOpen = true;
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

    // Check if the click is inside any submenu popover
    const clickedInSubmenu = path.some(el => {
      if (el instanceof HTMLElement) {
        // Check if it's a submenu or inside a submenu
        return el.id === 'submenu' || el.closest('[part="submenu"]');
      }
      return false;
    });

    // Only close if the click is outside the dropdown and not in any submenu
    if (!path.includes(this) && !clickedInSubmenu) {
      this.open = false;
    }
  };

  /** Handles clicks on the menu. */
  private handleMenuClick(event: MouseEvent) {
    const item = (event.target as Element).closest('quiet-dropdown-item');

    if (!item) return;

    // Handle top-level item with submenu
    if (!item.getAttribute('slot') && item.slotsWithContent && item.slotsWithContent.has('submenu')) {
      // If clicking directly on an item with a submenu, toggle the submenu
      const willOpen = !item.submenuOpen;

      // If we're about to open a submenu, close all others first
      if (willOpen) {
        this.closeAllSubmenusExcept(item);
      }

      item.submenuOpen = willOpen;
      return;
    }

    // Handle both top-level and submenu items that don't have their own submenus
    if (
      (item.getAttribute('slot') === 'submenu' || !item.getAttribute('slot')) &&
      (!item.slotsWithContent || !item.slotsWithContent.has('submenu'))
    ) {
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

  /** Given an x and y coordinate, a virtual element for Floating UI is returned.  */
  private getContextMenuVirtualElement(clientX: number, clientY: number) {
    return {
      getBoundingClientRect: () => {
        return {
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          bottom: clientY,
          right: clientX,
          width: 0,
          height: 0
        };
      }
    };
  }

  /** Shows the dropdown when the contextmenu event is dispatched. */
  private handleContextMenu = (event: PointerEvent | LongPressEvent) => {
    const originalEvent = event instanceof LongPressEvent ? event.detail.originalEvent : event;
    const clientX =
      originalEvent instanceof MouseEvent || originalEvent instanceof PointerEvent
        ? originalEvent.clientX
        : originalEvent.touches[0].clientX;
    const clientY =
      originalEvent instanceof MouseEvent || originalEvent instanceof PointerEvent
        ? originalEvent.clientY
        : originalEvent.touches[0].clientY;

    event.preventDefault();

    // Only open the context menu if it's currently hidden. This prevents a second right-click from closing and then
    // re-opening the menu. Instead, a second right-click will just close it.
    if (this.menu.hidden) {
      this.contextMenuVirtualElement = this.getContextMenuVirtualElement(clientX, clientY);
      this.open = true;
    }
  };

  private handleSubmenuOpening(event: CustomEvent) {
    // Get the item that is opening its submenu
    const openingItem = event.detail.item;

    // Get the parent element of the opening item
    const parentElement = openingItem.parentElement;

    // Find all sibling dropdown items that are at the same level
    // (items that share the same parent and have the same slot)
    const siblingItems = Array.from(parentElement.querySelectorAll('quiet-dropdown-item')).filter(item => {
      return (
        item !== openingItem &&
        item.parentElement === parentElement &&
        item.getAttribute('slot') === openingItem.getAttribute('slot')
      );
    });

    // Close only the sibling items' submenus
    siblingItems.forEach(item => {
      item.submenuOpen = false;
    });
  }

  /** Makes a selection, emits the quiet-select event, and closes the dropdown. */
  private makeSelection(item: QuietDropdownItem) {
    const trigger = this.getTrigger();

    // Disabled items can't be selected
    if (item.disabled) {
      return;
    }

    // Toggle checkbox items
    if (item.type === 'checkbox') {
      item.checked = !item.checked;
    }

    const selectEvent = new QuietSelectEvent({ selection: item });
    this.dispatchEvent(selectEvent);

    // If the event was canceled, keep the dropdown open
    if (!selectEvent.defaultPrevented) {
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

    // Set an ID on the trigger if one doesn't already exist
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
        @submenu-opening=${this.handleSubmenuOpening}
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
