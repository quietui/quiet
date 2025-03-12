import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from '../../styles/host.styles.js';
import { animateWithClass } from '../../utilities/animate.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './dropdown-item.styles.js';

/**
 * <quiet-dropdown-item>
 *
 * @summary Dropdown items can be selected from inside a dropdown menu.
 * @documentation https://quietui.org/docs/components/dropdown-item
 * @status stable
 * @since 1.0
 *
 * @slot - The item's label or description.
 * @slot icon - An optional icon to show at the start of the item.
 * @slot details - Optional details, such as a keyboard shortcut, to display at the end of the item.
 * @slot submenu - Optional submenu items to display in a nested dropdown.
 *
 * @csspart checkmark - The checkmark icon that's shown when checked, a `<quiet-icon>` element.
 * @csspart checkmark__svg - The checkmark icon's `svg` part.
 * @csspart icon - The container that wraps the icon.
 * @csspart label - The container that wraps the label.
 * @csspart details - The container that wraps the menu item's details.
 * @csspart submenu - The container that wraps the submenu items.
 * @csspart submenu-icon - The icon indicating that a submenu is available.
 * @csspart submenu-icon__svg - The submenu icon's `svg` part.
 *
 * @cssstate active - Applied when the dropdown item is active.
 * @cssstate disabled - Applied when the dropdown item is disabled.
 * @cssstate checked - Applied when the dropdown item is checked.
 * @cssstate submenu-open - Applied when the dropdown item's submenu is open.
 */
@customElement('quiet-dropdown-item')
export class QuietDropdownItem extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  // Enable slot observation
  static observeSlots = true;

  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  @query('#submenu') submenuElement: HTMLDivElement;

  /** @internal The controller will set this property to true when the item is active. */
  @property({ type: Boolean }) active = false;

  /**
   * @internal The controller will set this property to true when at least one checkbox exists in the dropdown. This
   * allows non-checkbox items to draw additional space to align properly with checkbox items.
   */
  @property({ attribute: 'checkbox-adjacent', type: Boolean, reflect: true }) checkboxAdjacent = false;

  /**
   * An optional value for the menu item. This is useful for determining which item was selected when listening to the
   * dropdown's `quiet-select` event.
   */
  @property() value: string;

  /** Set to `checkbox` to make the item a checkbox. */
  @property({ reflect: true }) type: 'normal' | 'checkbox' = 'normal';

  /** The type of menu item to render. */
  @property({ reflect: true }) variant: 'destructive' | 'default' = 'default';

  /** Set to true to check the dropdown item. Only valid when `type` is `checkbox`. */
  @property({ type: Boolean }) checked = false;

  /** Disables the dropdown item. */
  @property({ type: Boolean }) disabled = false;

  /** Whether the submenu is currently open. */
  @property({ type: Boolean, reflect: true }) submenuOpen = false;

  /** @internal Store whether this item has a submenu */
  @state() private hasSubmenu = false;

  firstUpdated() {
    this.setAttribute('tabindex', '-1');
    this.hasSubmenu = this.slotsWithContent.has('submenu');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this.handleGlobalMouseMove);
    this.closeSubmenu();
    this.removeEventListener('mouseenter', this.handleMouseEnter);
    this.removeEventListener('mouseleave', this.handleMouseLeave);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('active')) {
      this.setAttribute('tabindex', this.active ? '0' : '-1');
      this.customStates.set('active', this.active);
    }

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.customStates.set('checked', this.checked);
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.customStates.set('disabled', this.disabled);
    }

    if (changedProperties.has('type')) {
      if (this.type === 'checkbox') {
        this.setAttribute('role', 'menuitemcheckbox');
      } else {
        this.setAttribute('role', 'menuitem');
      }
    }

    if (changedProperties.has('submenuOpen')) {
      this.customStates.set('submenu-open', this.submenuOpen);
      if (this.submenuOpen) {
        this.openSubmenu();
      } else {
        this.closeSubmenu();
      }
    }

    if (changedProperties.has('slotsWithContent')) {
      this.hasSubmenu = this.slotsWithContent.has('submenu');
      if (this.hasSubmenu) {
        this.setAttribute('aria-haspopup', 'menu');
        this.setAttribute('aria-expanded', this.submenuOpen ? 'true' : 'false');
      } else {
        this.removeAttribute('aria-haspopup');
        this.removeAttribute('aria-expanded');
      }
    }
  }

  /** Opens the submenu. */
  async openSubmenu() {
    if (!this.hasSubmenu || !this.submenuElement) return;

    // Notify parent dropdown to close other submenus
    const parentDropdown = this.closest('quiet-dropdown');
    if (parentDropdown) {
      // Use a custom event to notify the parent about which item is opening
      const event = new CustomEvent('submenu-opening', {
        bubbles: true,
        composed: true,
        detail: { item: this }
      });
      this.dispatchEvent(event);
    }

    // Use Popover API to show the submenu
    this.submenuElement.showPopover();
    this.submenuElement.hidden = false;
    this.submenuElement.setAttribute('data-visible', '');
    this.submenuOpen = true;
    this.setAttribute('aria-expanded', 'true');

    // Set up auto-updating position
    this.cleanup = autoUpdate(this, this.submenuElement, () => {
      this.repositionSubmenu();
      this.updateSafeTriangleCoordinates();
    });

    // Set up global mouse move tracking for the safe triangle logic
    document.addEventListener('mousemove', this.handleGlobalMouseMove);

    // Animate the submenu
    await animateWithClass(this.submenuElement, 'show');

    // Set focus to the first submenu item
    setTimeout(() => {
      const items = this.getSubmenuItems();
      if (items.length > 0) {
        items.forEach((item, index) => (item.active = index === 0));
        items[0].focus();
      }
    }, 0);
  }

  /** Closes the submenu. */
  async closeSubmenu() {
    if (!this.hasSubmenu || !this.submenuElement) return;

    this.submenuOpen = false;
    this.setAttribute('aria-expanded', 'false');

    // Clean up event listeners
    document.removeEventListener('mousemove', this.handleGlobalMouseMove);

    if (this.cleanup) {
      this.cleanup();
      this.cleanup = undefined;
    }

    if (!this.submenuElement.hidden) {
      await animateWithClass(this.submenuElement, 'hide');
      this.submenuElement.hidden = true;
      this.submenuElement.removeAttribute('data-visible');
      this.submenuElement.hidePopover();
    }
  }

  /** Repositions the submenu. */
  private repositionSubmenu() {
    if (!this.submenuElement) return;

    computePosition(this, this.submenuElement, {
      placement: 'right-start',
      middleware: [offset({ mainAxis: 0, crossAxis: -5 }), flip(), shift()]
    }).then(({ x, y, placement }) => {
      // Set placement for transform origin styles
      this.submenuElement.setAttribute('data-placement', placement);

      // Position it
      Object.assign(this.submenuElement.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }

  /** Updates the safe triangle coordinates based on submenu position */
  private updateSafeTriangleCoordinates() {
    if (!this.submenuElement || !this.submenuOpen) return;

    const submenuRect = this.submenuElement.getBoundingClientRect();
    const isRtl = getComputedStyle(this).direction === 'rtl';

    // Set the start and end points of the submenu side of the triangle
    this.submenuElement.style.setProperty(
      '--safe-triangle-submenu-start-x',
      `${isRtl ? submenuRect.right : submenuRect.left}px`
    );
    this.submenuElement.style.setProperty('--safe-triangle-submenu-start-y', `${submenuRect.top}px`);
    this.submenuElement.style.setProperty(
      '--safe-triangle-submenu-end-x',
      `${isRtl ? submenuRect.right : submenuRect.left}px`
    );
    this.submenuElement.style.setProperty('--safe-triangle-submenu-end-y', `${submenuRect.bottom}px`);
  }

  /** Gets all dropdown items in the submenu. */
  private getSubmenuItems(): QuietDropdownItem[] {
    return [...this.querySelectorAll('quiet-dropdown-item[slot="submenu"]')].filter(item => !item.disabled);
  }

  /** Handles mouse enter to open the submenu */
  private handleMouseEnter() {
    if (this.hasSubmenu && !this.disabled) {
      // Notify parent dropdown to close other submenus
      const parentDropdown = this.closest('quiet-dropdown');
      if (parentDropdown) {
        const event = new CustomEvent('submenu-opening', {
          bubbles: true,
          composed: true,
          detail: { item: this }
        });
        this.dispatchEvent(event);
      }

      this.submenuOpen = true;
    }
  }

  /** Handles mouse leave to close the submenu */
  private handleMouseLeave(event: MouseEvent) {
    if (this.submenuOpen && !this.contains(event.relatedTarget as Node)) {
      // Don't close immediately - we'll check if the mouse is in the safe area
      // This is handled by the mousemove event listener that's added when a submenu opens
    }
  }

  /** Track mouse movement to handle the safe triangle logic */
  private handleGlobalMouseMove = (event: MouseEvent) => {
    if (!this.submenuOpen) return;

    // Get submenu rect for boundary checking
    const submenuRect = this.submenuElement.getBoundingClientRect();
    const isRtl = getComputedStyle(this).direction === 'rtl';

    // Determine the submenu edge x-coordinate (left or right depending on RTL)
    const submenuEdgeX = isRtl ? submenuRect.right : submenuRect.left;

    // Calculate the constrained cursor position
    // For x: never go beyond the submenu edge (left/right depending on RTL mode)
    // For y: constrain between the top and bottom of the submenu
    const constrainedX = isRtl
      ? Math.max(event.clientX, submenuEdgeX) // For RTL: x should never be less than submenu's right edge
      : Math.min(event.clientX, submenuEdgeX); // For LTR: x should never be greater than submenu's left edge

    const constrainedY = Math.max(submenuRect.top, Math.min(event.clientY, submenuRect.bottom));

    // Update cursor position for the safe triangle with constrained values
    this.submenuElement.style.setProperty('--safe-triangle-cursor-x', `${constrainedX}px`);
    this.submenuElement.style.setProperty('--safe-triangle-cursor-y', `${constrainedY}px`);

    // If the mouse is inside the item, the submenu, or the safe triangle, keep the submenu open
    const isOverItem = this.matches(':hover');
    const isOverSubmenu =
      this.submenuElement?.matches(':hover') ||
      !!event
        .composedPath()
        .find(el => el instanceof HTMLElement && el.closest('[part="submenu"]') === this.submenuElement);

    // If we're not in any safe area, close the submenu after a short delay
    if (!isOverItem && !isOverSubmenu) {
      // Add a small delay to prevent accidental closures
      // The triangle is now part of the submenu and will count as "hovering over the submenu"
      // due to pointer-events: auto on the pseudo-element
      setTimeout(() => {
        if (!this.matches(':hover') && !this.submenuElement?.matches(':hover')) {
          this.submenuOpen = false;
        }
      }, 100);
    }
  };

  /** Handles key down events for submenu navigation */
  private handleKeyDown(event: KeyboardEvent) {
    // Don't handle key events if the item is disabled
    if (this.disabled) return;

    // Check if this is a submenu item
    const isSubmenuItem = this.getAttribute('slot') === 'submenu';

    // Open submenu on right arrow (for top-level items) or for any item with a submenu
    if (event.key === 'ArrowRight' && this.hasSubmenu && !this.submenuOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.submenuOpen = true;
    }

    // Close submenu on left arrow - works for both parent items and submenu items
    if (event.key === 'ArrowLeft') {
      if (this.submenuOpen) {
        // If this item has its own submenu open, close it
        event.preventDefault();
        event.stopPropagation();
        this.submenuOpen = false;
        this.focus();
      } else if (isSubmenuItem) {
        // If this is a submenu item, move focus back to parent
        event.preventDefault();
        event.stopPropagation();

        // Find parent dropdown item
        const parentItem = this.closest('quiet-dropdown-item:not([slot="submenu"])');
        if (parentItem) {
          parentItem.focus();
        }
      }
    }

    // Handle ArrowUp and ArrowDown for submenu items specifically
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && isSubmenuItem) {
      // Get all siblings in this submenu
      const submenuItems = [...this.parentElement.querySelectorAll('quiet-dropdown-item[slot="submenu"]')].filter(
        item => !item.disabled
      );

      const currentIndex = submenuItems.indexOf(this);
      let nextIndex;

      if (event.key === 'ArrowUp') {
        nextIndex = currentIndex === 0 ? submenuItems.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === submenuItems.length - 1 ? 0 : currentIndex + 1;
      }

      if (submenuItems[nextIndex]) {
        event.preventDefault();
        event.stopPropagation();
        submenuItems.forEach(item => (item.active = item === submenuItems[nextIndex]));
        submenuItems[nextIndex].focus();
      }
    }

    // Open submenu on Enter or Space if not already open
    if ((event.key === 'Enter' || event.key === ' ') && this.hasSubmenu && !this.submenuOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.submenuOpen = true;
    }

    // Escape key handling (for submenu items)
    if (event.key === 'Escape' && isSubmenuItem) {
      // Find parent dropdown item and focus it
      const parentItem = this.closest('quiet-dropdown-item:not([slot="submenu"])');
      if (parentItem) {
        event.preventDefault();
        event.stopPropagation();
        (parentItem as QuietDropdownItem).submenuOpen = false;
        parentItem.focus();
      }
    }
  }

  render() {
    return html`
      ${this.type === 'checkbox'
        ? html`
            <quiet-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></quiet-icon>
          `
        : ''}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu
        ? html`
            <quiet-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></quiet-icon>
          `
        : ''}
      ${this.whenSlotted(
        'submenu',
        html`
          <div
            id="submenu"
            part="submenu"
            popover="manual"
            role="menu"
            tabindex="-1"
            aria-orientation="vertical"
            hidden
          >
            <slot name="submenu"></slot>
          </div>
        `,
        { force: this.hasSubmenu }
      )}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-dropdown-item': QuietDropdownItem;
  }
}
