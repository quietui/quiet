import type { QuietTransitionAnimation } from '@quietui/scurry';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html, render } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { QuietContentChangedEvent } from '../../events/content.js';
import { QuietCloseEvent, QuietClosedEvent } from '../../events/open-close.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../toast-item/toast-item.js';
import type { QuietToastItem } from '../toast-item/toast-item.js';
import '../transition-group/transition-group.js';
import type { QuietTransitionGroup } from '../transition-group/transition-group.js';
import styles from './toast.styles.js';

export interface CreateOptions {
  /**
   * Set to true to process the content as HTML instead of plain text. Make sure you trust the included content,
   * otherwise your app may become vulnerable to XSS exploits!
   */
  allowHtml: boolean;
  /**
   * The length of time to show the notification before removing it. Set this to `0` to show the notification until the
   * user dismisses it.
   */
  duration: number;
  /**
   * When true, the close button will be omitted.
   */
  noCloseButton: boolean;
  /**
   * The type of notification to render.
   */
  variant: 'primary' | 'constructive' | 'destructive' | 'default';
}

/**
 * <quiet-toast>
 *
 * @summary Toasts are temporary, non-intrusive notifications that appear above the page's content.
 * @documentation https://quietui.org/docs/components/toast
 * @status stable
 * @since 1.0.0
 *
 * @dependency quiet-toast-item
 * @dependency quiet-transition-group
 *
 * @cssstate visible - Applied when the toast stack is visible.
 */
@customElement('quiet-toast')
export class QuietToast extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private isStackShowing = false;

  @query('#stack') stack: QuietTransitionGroup;
  @query('quiet-transition-group') transitionGroup: QuietTransitionGroup;

  /**
   * A custom animation to use for enter/exit transitions. This gets passed through to the internal transition group.
   * Works well with animations from `@quietui/scurry`. (Property only)
   */
  @state() public transitionAnimation?: QuietTransitionAnimation;

  /** The placement of the toast stack on the screen. */
  @property({ reflect: true }) placement:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end' = 'top-end';

  connectedCallback() {
    super.connectedCallback();
    this.popover = 'manual';
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('placement')) {
      this.stack.updateElementPositions();
    }
  }

  /** Watch for clicks inside the stack */
  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const notification = target.closest('.notification');

    // A close button was clicked
    if (notification && target.closest('[data-toast="close"]')) {
      this.transitionGroup.transitionComplete().then(() => {
        notification?.remove();
      });
    }
  }

  /** Called when the transition group detects content changes. */
  private handleContentChanged(event: QuietContentChangedEvent) {
    const mutations = event.detail.mutations;

    // Look for removed toast items and dispatch close events on their behalf
    mutations.forEach(mutation => {
      mutation.removedNodes.forEach(async node => {
        if (node instanceof Element && node.localName === 'quiet-toast-item') {
          node.dispatchEvent(new QuietCloseEvent({ source: null }, { cancelable: false }));
          await this.stack.transitionComplete();
          node.dispatchEvent(new QuietClosedEvent());
        }
      });
    });
  }

  /** Listen for Escape anywhere in the document */
  private handleDocumentKeyDown = async (event: KeyboardEvent) => {
    // Other document keydown listeners should have priority over toasts, so give them a chance to respond
    await new Promise(requestAnimationFrame);

    // Remove the most recent notification
    if (event.key === 'Escape' && this.children.length > 0 && !event.defaultPrevented) {
      event.preventDefault();
      await this.stack.transitionComplete();
      const notification = this.children[this.children.length - 1];
      notification?.remove();
    }
  };

  /** Update the positions when scrolling */
  private handleDocumentScroll = () => {
    this.stack.updateElementPositions();
  };

  /** Hides the stack when the last notification has transitioned out */
  private async handleTransitionEnd() {
    // Wait a cycle to make sure nothing new was added to the stack
    await new Promise(requestAnimationFrame);

    if (this.children.length === 0) {
      this.hideStack();
    }
  }

  /** Hides the toast stack. Call this after all notifications have been removed. */
  private hideStack() {
    this.hidePopover();
    this.isStackShowing = false;
    this.customStates.set('visible', false);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('scroll', this.handleDocumentScroll);
  }

  /** Shows the toast stack in preparation for a notification. */
  private showStack() {
    if (this.isStackShowing) return;
    this.isStackShowing = true;
    this.customStates.set('visible', true);
    this.showPopover();
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('scroll', this.handleDocumentScroll, { passive: true });
  }

  /**
   * Creates a toast notification and adds it to the stack. Returns a reference to the created toast item.
   */
  public async create(content: string, options?: Partial<CreateOptions>) {
    const opts: CreateOptions = {
      allowHtml: false,
      noCloseButton: false,
      variant: 'default',
      duration: 5000,
      ...options
    };

    const toastItemHtml = html`
      <quiet-toast-item variant=${opts.variant} duration=${opts.duration} ?no-close-button=${opts.noCloseButton}>
        ${opts.allowHtml ? unsafeHTML(content) : content}
      </quiet-toast-item>
    `;

    // Show the stack and wait for the transition group to be ready
    this.showStack();
    await this.transitionGroup.transitionComplete();

    // Render the notification
    const tempDiv = document.createElement('div');
    render(toastItemHtml, tempDiv);
    const toastItem = tempDiv.firstElementChild! as QuietToastItem;

    // Add it to the stack and start the timer
    this.prepend(toastItem);
    toastItem.startTimer();

    return toastItem;
  }

  /**
   * Creates a toast notification using an existing `<quiet-toast-item>` element. Useful if you want to create your own
   * toast items declaratively. Returns a reference to the cloned toast item.
   */
  public async createFromTemplate(template: HTMLTemplateElement) {
    // Ensure it's a <template>
    if (template.localName !== 'template') {
      console.warn('Only <template> elements can be passed to to createFromTemplate().', this);
      return;
    }

    // Clone the template and fetch the toast item
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const toastItem = clone.querySelector('quiet-toast-item') as QuietToastItem;

    // Ensure it's a valid toast item
    if (toastItem?.localName !== 'quiet-toast-item') {
      console.warn('No <quiet-toast-item> element was found in the template passed to createFromTemplate().', this);
      return;
    }

    // Show the stack and wait for the transition group to be ready
    this.showStack();
    await this.transitionGroup.transitionComplete();

    // Add it to the stack and start the timer
    this.prepend(toastItem);
    toastItem.startTimer();

    return toastItem;
  }

  /** Removes all elements from the toast stack and turns when the remove transition finishes. */
  public async empty() {
    this.innerHTML = '';
    await this.stack.transitionComplete();
  }

  render() {
    return html`
      <slot></slot>

      <quiet-transition-group
        id="stack"
        role="log"
        aria-relevant="additions"
        .transitionAnimation=${this.transitionAnimation}
        .transitionContainer=${this}
        @click=${this.handleClick}
        @quiet-transition-end=${this.handleTransitionEnd}
        @quiet-content-changed=${this.handleContentChanged}
      ></quiet-transition-group>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-toast': QuietToast;
  }
}
