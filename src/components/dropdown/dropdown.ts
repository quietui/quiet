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
import { Localize } from '../../utilities/localize.js';
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
 * @summary Provides a menu of options that appear when the corresponding trigger is activated.
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
  private submenuCleanups: Map<QuietDropdownItem, ReturnType<typeof autoUpdate>> = new Map();
  private contextMenuElement: HTMLElement | null;
  private contextMenuLongPress: LongPress;
  private contextMenuVirtualElement: VirtualElement | undefined;
  private localize = new Localize(this);
  private userTypedQuery = '';
  private userTypedTimeout: ReturnType<typeof setTimeout>;
  private openSubmenuStack: QuietDropdownItem[] = [];

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

    // Clean up all submenu positioning
    this.submenuCleanups.forEach(cleanup => cleanup());
    this.submenuCleanups.clear();

    document.removeEventListener('mousemove', this.handleGlobalMouseMove);
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
  private getItems(includeDisabled = false): QuietDropdownItem[] {
    // Only select direct children of the dropdown, not deep descendants
    const items = [...this.children].filter(
      el => el.localName === 'quiet-dropdown-item' && !el.hasAttribute('slot')
    ) as QuietDropdownItem[];
    return includeDisabled ? items : items.filter(item => !item.disabled);
  }

  /** Gets all dropdown items in a specific submenu. */
  private getSubmenuItems(parentItem: QuietDropdownItem, includeDisabled = false): QuietDropdownItem[] {
    // Only get direct children with slot="submenu", not nested ones
    const items = [...parentItem.children].filter(
      el => el.localName === 'quiet-dropdown-item' && el.getAttribute('slot') === 'submenu'
    ) as QuietDropdownItem[];
    return includeDisabled ? items : items.filter(item => !item.disabled);
  }

  /** Handles the submenu navigation stack */
  private addToSubmenuStack(item: QuietDropdownItem) {
    // Remove any items that might be after this one in the stack
    // This happens if the user navigates back and then to a different submenu
    const index = this.openSubmenuStack.indexOf(item);
    if (index !== -1) {
      this.openSubmenuStack = this.openSubmenuStack.slice(0, index + 1);
    } else {
      this.openSubmenuStack.push(item);
    }
  }

  /** Removes the last item from the submenu stack */
  private removeFromSubmenuStack() {
    return this.openSubmenuStack.pop();
  }

  /** Gets the current active submenu item */
  private getCurrentSubmenuItem(): QuietDropdownItem | undefined {
    return this.openSubmenuStack.length > 0 ? this.openSubmenuStack[this.openSubmenuStack.length - 1] : undefined;
  }

  /** Closes all submenus in the dropdown. */
  private closeAllSubmenus() {
    const items = this.getItems(true);
    items.forEach(item => {
      item.submenuOpen = false;
    });
    this.openSubmenuStack = [];
  }

  /** Closes sibling submenus at the same level as the specified item. */
  private closeSiblingSubmenus(item: QuietDropdownItem) {
    // Find direct parent (either another dropdown item or the main dropdown)
    const parentDropdownItem = item.closest<QuietDropdownItem>('quiet-dropdown-item:not([slot="submenu"])');

    let siblingItems: QuietDropdownItem[];

    if (parentDropdownItem) {
      // Item is in a submenu, so get sibling items from the parent
      siblingItems = this.getSubmenuItems(parentDropdownItem, true);
    } else {
      // Item is in the top level menu
      siblingItems = this.getItems(true);
    }

    // Close only sibling submenus, not the item itself or its ancestors
    siblingItems.forEach(siblingItem => {
      if (siblingItem !== item && siblingItem.submenuOpen) {
        siblingItem.submenuOpen = false;
      }
    });

    // Don't reset the submenu stack - just add this item if it's not already there
    if (!this.openSubmenuStack.includes(item)) {
      this.openSubmenuStack.push(item);
    }
  }

  /** Get the slotted trigger button, a <quiet-button> or <button> element */
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
    document.addEventListener('mousemove', this.handleGlobalMouseMove);

    this.menu.hidden = false;
    this.cleanup = autoUpdate(anchor, this.menu, () => this.reposition());
    await animateWithClass(this.menu, 'show');

    // Focus the first item after the menu opens
    const items = this.getItems();
    if (items.length > 0) {
      items.forEach((item, index) => (item.active = index === 0));
      items[0].focus();
    }

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
    document.removeEventListener('mousemove', this.handleGlobalMouseMove);

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
    const isRtl = this.localize.dir() === 'rtl';

    // Escape key should close the entire dropdown hierarchy immediately
    if (event.key === 'Escape') {
      const trigger = this.getTrigger();

      event.preventDefault();
      event.stopPropagation();

      this.open = false;
      trigger?.focus();
      return;
    }

    // Get the current active or focused item
    const activeElement = document.activeElement as HTMLElement;
    const isFocusedOnItem = activeElement?.localName === 'quiet-dropdown-item';

    // Determine if we're in a submenu
    const currentSubmenuItem = this.getCurrentSubmenuItem();
    const isInSubmenu = !!currentSubmenuItem;

    // Get the appropriate items list based on where we are in the hierarchy
    let items: QuietDropdownItem[];
    let activeItem: QuietDropdownItem | undefined;
    let activeItemIndex: number;

    if (isInSubmenu) {
      // We're in a submenu, get items from the current submenu
      items = this.getSubmenuItems(currentSubmenuItem);
      activeItem = items.find(item => item.active || item === activeElement);
      activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
    } else {
      // We're in the main menu
      items = this.getItems();
      activeItem = items.find(item => item.active || item === activeElement);
      activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
    }

    let itemToSelect: QuietDropdownItem | undefined;

    // Handle Arrow Up navigation
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();

      // If we have an active item, move up, otherwise select the last item
      if (activeItemIndex > 0) {
        itemToSelect = items[activeItemIndex - 1];
      } else {
        itemToSelect = items[items.length - 1];
      }
    }

    // Handle Arrow Down navigation
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();

      // If we have an active item, move down, otherwise select the first item
      if (activeItemIndex !== -1 && activeItemIndex < items.length - 1) {
        itemToSelect = items[activeItemIndex + 1];
      } else {
        itemToSelect = items[0];
      }
    }

    // Handle Arrow Right - open submenu if exists
    if (event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight') && isFocusedOnItem && activeItem) {
      // Only respond if the active item has a submenu
      if (activeItem.slotsWithContent && activeItem.slotsWithContent.has('submenu')) {
        event.preventDefault();
        event.stopPropagation();

        // Open the submenu
        activeItem.submenuOpen = true;
        this.addToSubmenuStack(activeItem);

        // Focus the first item in the submenu
        setTimeout(() => {
          const submenuItems = this.getSubmenuItems(activeItem!);
          if (submenuItems.length > 0) {
            submenuItems.forEach((item, index) => (item.active = index === 0));
            submenuItems[0].focus();
          }
        }, 0);

        return;
      }
    }

    // Handle Arrow Left - close current submenu if in a submenu
    if (event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft') && isInSubmenu) {
      event.preventDefault();
      event.stopPropagation();

      // Remove the current submenu from the stack
      const removedItem = this.removeFromSubmenuStack();
      if (removedItem) {
        // Close the submenu
        removedItem.submenuOpen = false;

        // Focus the parent item and restore its active state
        setTimeout(() => {
          removedItem.focus();
          removedItem.active = true;

          // Get parent level items to ensure proper keyboard navigation after closing
          const parentItems =
            removedItem.slot === 'submenu'
              ? this.getSubmenuItems(removedItem.parentElement as QuietDropdownItem)
              : this.getItems();

          // Reset active state on all items at this level except the current one
          parentItems.forEach(item => {
            if (item !== removedItem) {
              item.active = false;
            }
          });
        }, 0);
      }

      return;
    }

    // Home + end for navigation
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

    // Handle Enter and Space for selection
    if ((event.key === 'Enter' || (event.key === ' ' && this.userTypedQuery === '')) && isFocusedOnItem && activeItem) {
      event.preventDefault();
      event.stopPropagation();

      // Check if this is a submenu item that needs to be opened
      if (activeItem.slotsWithContent && activeItem.slotsWithContent.has('submenu')) {
        activeItem.submenuOpen = true;
        this.addToSubmenuStack(activeItem);

        // Focus the first item in the submenu
        setTimeout(() => {
          const submenuItems = this.getSubmenuItems(activeItem!);
          if (submenuItems.length > 0) {
            submenuItems.forEach((item, index) => (item.active = index === 0));
            submenuItems[0].focus();
          }
        }, 0);
      } else {
        // Regular item - handle selection
        this.makeSelection(activeItem);
      }
    }
  };

  /** Handles pointer down events when the dropdown is open. */
  private handleDocumentPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();

    // Check if the click is inside any part of the dropdown hierarchy
    const isInDropdownHierarchy = path.some(el => {
      if (el instanceof HTMLElement) {
        // Check if it's part of the dropdown or any of its submenus
        return el === this || el.closest('quiet-dropdown, [part="submenu"]');
      }
      return false;
    });

    if (!isInDropdownHierarchy) {
      this.open = false;
    }
  };

  /** Handles clicks on the menu. */
  private handleMenuClick(event: MouseEvent) {
    const item = (event.target as Element).closest('quiet-dropdown-item');

    if (!item || item.disabled) return;

    // Handle item with submenu - keep it open when clicked
    if (item.slotsWithContent && item.slotsWithContent.has('submenu')) {
      // Always open the submenu on click, don't toggle it closed
      if (!item.submenuOpen) {
        this.closeSiblingSubmenus(item);
        this.addToSubmenuStack(item);
        item.submenuOpen = true;
      }

      // Stop propagation to prevent the dropdown from closing
      event.stopPropagation();
      return;
    }

    // Handle standard selectable item
    this.makeSelection(item);
  }

  /** Prepares dropdown items when they get added or removed */
  private async handleMenuSlotChange() {
    const items = this.getItems(true);
    await Promise.all(items.map(item => item.updateComplete));

    // Check for checkboxes
    const hasCheckbox = items.some(item => item.type === 'checkbox');

    // Check for submenus
    const hasSubmenu = items.some(item => item.hasSubmenu);

    // Setup the roving tab index and apply adjacent classes
    items.forEach((item, index) => {
      item.active = index === 0;
      item.checkboxAdjacent = hasCheckbox;
      item.submenuAdjacent = hasSubmenu;
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

  /** Handles submenu opening events */
  private handleSubmenuOpening(event: CustomEvent) {
    const openingItem = event.detail.item as QuietDropdownItem;
    this.closeSiblingSubmenus(openingItem);
    this.addToSubmenuStack(openingItem);

    // Position the submenu
    this.setupSubmenuPosition(openingItem);

    // Process the submenu items to apply submenuAdjacent
    this.processSubmenuItems(openingItem);
  }

  /** Sets up submenu positioning with autoUpdate */
  private setupSubmenuPosition(item: QuietDropdownItem) {
    if (!item.submenuElement) return;

    // Cleanup previous positioning if exists
    this.cleanupSubmenuPosition(item);

    // Setup new positioning with autoUpdate
    const cleanup = autoUpdate(item, item.submenuElement, () => {
      this.positionSubmenu(item);
      this.updateSafeTriangleCoordinates(item);
    });

    this.submenuCleanups.set(item, cleanup);

    // Add a slotchange listener to handle submenu items
    const submenuSlot = item.submenuElement.querySelector('slot[name="submenu"]');
    if (submenuSlot) {
      // Remove any existing listener to prevent duplicates
      submenuSlot.removeEventListener('slotchange', QuietDropdown.handleSubmenuSlotChange);
      // Add the listener
      submenuSlot.addEventListener('slotchange', QuietDropdown.handleSubmenuSlotChange);

      // Process initially assigned items
      QuietDropdown.handleSubmenuSlotChange({ target: submenuSlot } as unknown as Event);
    }
  }

  private static handleSubmenuSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (!slot) return;

    // Get all assigned elements to this slot
    const items = slot.assignedElements().filter(el => el.localName === 'quiet-dropdown-item') as QuietDropdownItem[];

    if (items.length === 0) return;

    // Check if any item has a submenu
    const hasSubmenuItems = items.some(item => item.slotsWithContent && item.slotsWithContent.has('submenu'));

    // Check if any item is a checkbox
    const hasCheckboxItems = items.some(item => item.type === 'checkbox');

    // Apply submenu-adjacent and checkbox-adjacent to all items if needed
    items.forEach(item => {
      item.submenuAdjacent = hasSubmenuItems;
      item.checkboxAdjacent = hasCheckboxItems;
    });
  }

  private processSubmenuItems(item: QuietDropdownItem) {
    if (!item.submenuElement) return;

    // Get all dropdown items in the submenu
    const submenuItems = this.getSubmenuItems(item, true);

    // Check if any item has a submenu
    const hasSubmenuItems = submenuItems.some(
      subItem => subItem.slotsWithContent && subItem.slotsWithContent.has('submenu')
    );

    // Apply submenu-adjacent to all items if needed
    submenuItems.forEach(subItem => {
      subItem.submenuAdjacent = hasSubmenuItems;
    });
  }

  /** Cleans up submenu positioning */
  private cleanupSubmenuPosition(item: QuietDropdownItem) {
    const cleanup = this.submenuCleanups.get(item);
    if (cleanup) {
      cleanup();
      this.submenuCleanups.delete(item);
    }
  }

  /** Positions a submenu relative to its parent item */
  private positionSubmenu(item: QuietDropdownItem) {
    if (!item.submenuElement) return;

    // Determine placement based on text direction
    const isRtl = this.localize.dir() === 'rtl';
    const placement = isRtl ? 'left-start' : 'right-start';

    computePosition(item, item.submenuElement, {
      placement: placement,
      middleware: [
        offset({
          mainAxis: 0,
          crossAxis: -5
        }),
        flip({
          fallbackStrategy: 'bestFit'
        }),
        shift({
          padding: 8
        })
      ]
    }).then(({ x, y, placement }) => {
      // Set placement for transform origin styles
      item.submenuElement.setAttribute('data-placement', placement);

      // Position it
      Object.assign(item.submenuElement.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  /** Updates the safe triangle coordinates for a submenu */
  private updateSafeTriangleCoordinates(item: QuietDropdownItem) {
    if (!item.submenuElement || !item.submenuOpen) return;

    // Detect if we're in keyboard navigation mode by checking focus-visible
    const isKeyboardNavigation = document.activeElement?.matches(':focus-visible');

    // If using keyboard navigation, don't show the safe triangle
    if (isKeyboardNavigation) {
      // Hide the safe triangle for keyboard navigation
      item.submenuElement.style.setProperty('--safe-triangle-visible', 'none');
      return;
    }

    // Enable the safe triangle for mouse navigation
    item.submenuElement.style.setProperty('--safe-triangle-visible', 'block');

    const submenuRect = item.submenuElement.getBoundingClientRect();
    const placement = item.submenuElement.getAttribute('data-placement') || '';
    const isRtl = this.localize.dir() === 'rtl';
    const isLeftPlacement = placement.startsWith('left');
    const isRightPlacement = placement.startsWith('right');

    // Determine which edge of the submenu to use based on actual placement
    let submenuEdgeX: number;
    if (isLeftPlacement) {
      // Submenu is on the left, use right edge
      submenuEdgeX = submenuRect.right;
    } else if (isRightPlacement) {
      // Submenu is on the right, use left edge
      submenuEdgeX = submenuRect.left;
    } else {
      // Fallback to RTL/LTR logic for other placements
      submenuEdgeX = isRtl ? submenuRect.right : submenuRect.left;
    }

    // Set the start and end points of the submenu side of the triangle
    item.submenuElement.style.setProperty('--safe-triangle-submenu-start-x', `${submenuEdgeX}px`);
    item.submenuElement.style.setProperty('--safe-triangle-submenu-start-y', `${submenuRect.top}px`);
    item.submenuElement.style.setProperty('--safe-triangle-submenu-end-x', `${submenuEdgeX}px`);
    item.submenuElement.style.setProperty('--safe-triangle-submenu-end-y', `${submenuRect.bottom}px`);
  }

  /** Handle global mouse movement for safe triangle logic */
  private handleGlobalMouseMove = (event: MouseEvent) => {
    // Find the last open submenu item
    const currentSubmenuItem = this.getCurrentSubmenuItem();
    if (!currentSubmenuItem?.submenuOpen || !currentSubmenuItem.submenuElement) return;

    const submenuRect = currentSubmenuItem.submenuElement.getBoundingClientRect();
    const placement = currentSubmenuItem.submenuElement.getAttribute('data-placement') || '';
    const isLeftPlacement = placement.startsWith('left');
    const constrainedY = Math.max(submenuRect.top, Math.min(event.clientY, submenuRect.bottom));
    let submenuEdgeX: number;
    let constrainedX: number;

    if (isLeftPlacement) {
      // Submenu is on the left - cursor must be to the right of the right edge
      submenuEdgeX = submenuRect.right;
      constrainedX = Math.max(event.clientX, submenuEdgeX);
    } else {
      // Submenu is on the right - cursor must be to the left of the left edge
      submenuEdgeX = submenuRect.left;
      constrainedX = Math.min(event.clientX, submenuEdgeX);
    }

    // Update cursor position
    currentSubmenuItem.submenuElement.style.setProperty('--safe-triangle-cursor-x', `${constrainedX}px`);
    currentSubmenuItem.submenuElement.style.setProperty('--safe-triangle-cursor-y', `${constrainedY}px`);

    // Check if mouse is in safe area
    const isOverItem = currentSubmenuItem.matches(':hover');
    const isOverSubmenu =
      currentSubmenuItem.submenuElement?.matches(':hover') ||
      !!event
        .composedPath()
        .find(el => el instanceof HTMLElement && el.closest('[part="submenu"]') === currentSubmenuItem.submenuElement);

    // Close if it's outside of the safe area
    if (!isOverItem && !isOverSubmenu) {
      setTimeout(() => {
        if (!currentSubmenuItem.matches(':hover') && !currentSubmenuItem.submenuElement?.matches(':hover')) {
          currentSubmenuItem.submenuOpen = false;
        }
      }, 100);
    }
  };

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

    const selectEvent = new QuietSelectEvent({ item });
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
