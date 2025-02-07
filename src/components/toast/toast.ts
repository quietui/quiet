import type { CSSResultGroup, PropertyValues } from 'lit';
import { html, render } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';
import { classMap } from 'lit/directives/class-map.js';
import type { UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import hostStyles from '../../styles/host.styles.js';
import { Localize } from '../../utilities/localize.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import '../progress/progress.js';
import '../transition-group/transition-group.js';
import type { QuietTransitionGroup } from '../transition-group/transition-group.js';
import styles from './toast.styles.js';

interface NotificationTimer {
  timeoutId: number;
  progressIntervalId: number;
  startTime: number;
  duration: number;
}

export interface NotifyOptions {
  /**
   * Optional content to show at the start of the notification. Usually an icon, image, avatar, or similar content.
   * Avoid placing interactive content in the icon. To provide HTML content, wrap the HTML string in the toast's
   * `html()` method. All user-provided content must be properly sanitized to prevent XSS vulnerabilities.
   */
  icon: string | DirectiveResult<typeof UnsafeHTMLDirective>;

  /** The type of notification to render. */
  variant: 'primary' | 'constructive' | 'destructive' | 'default';

  /** When true, draws a close button at the end of the notification. */
  closeButton: boolean;

  /**
   * The length of time to show the notification before removing it. Set this to `0` to show the notification until the
   * user dismisses it.
   */
  duration: number;
}

/**
 * <quiet-toast>
 *
 * @summary Toasts are temporary, non-intrusive notifications that appear above the page's content and often disappear
 *  automatically.
 * @documentation https://quietui.org/docs/components/toast
 * @status stable
 * @since 1.0.0
 *
 * @dependency quiet-icon
 * @dependency quiet-progress
 * @dependency quiet-transition-group
 *
 * @csspart stack - The toast stack, a `<quiet-transition-group>` element that's fixed by default and rendered in the
 *  top layer.
 * @csspart notification - The notification's primary container.
 * @csspart progress - The progress ring that shows when a duration is set, a `<quiet-progress>`.
 * @csspart progress__track - The progress ring's exported `track` part.
 * @csspart progress__indicator - The progress ring's exported `indicator` part.
 * @csspart progress__content - The progress ring's exported `content` part.
 * @csspart close-button - The notification's close button, a `<button>` element.
 *
 * @cssstate visible - Applied when the toast stack is visible.
 */
@customElement('quiet-toast')
export class QuietToast extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private activeTimers = new Map<HTMLElement, NotificationTimer>();
  private isStackShowing = false;
  private localize = new Localize(this);

  @query('#stack') stack: QuietTransitionGroup;
  @query('quiet-transition-group') transitionGroup: QuietTransitionGroup;

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
      this.clearDurationTimer(notification as HTMLElement);
      this.transitionGroup.transitionComplete().then(() => {
        notification?.remove();
      });
    }
  }

  /** Listen for Escape anywhere in the document */
  private handleDocumentKeyDown = async (event: KeyboardEvent) => {
    // Other document keydown listeners should have priority over toasts, so give them a chance to respond
    await new Promise(requestAnimationFrame);

    // Remove the most recent notification
    if (event.key === 'Escape' && this.stack.children.length > 0 && !event.defaultPrevented) {
      event.preventDefault();
      await this.stack.transitionComplete();
      const notification = this.stack.children[0];
      this.clearDurationTimer(notification as HTMLElement);
      notification.remove();
    }
  };

  /** Update the positions when scrolling */
  private handleDocumentScroll = () => {
    this.stack.updateElementPositions();
  };

  /** When the notification  */
  private handleNotificationHover = (event: MouseEvent) => {
    const notification = event.currentTarget as HTMLElement;
    const timer = this.activeTimers.get(notification);

    if (!timer) return;

    if (event.type === 'mouseenter') {
      // Clear existing timers
      clearTimeout(timer.timeoutId);
      clearInterval(timer.progressIntervalId);

      // Set progress to 100% while hovering
      const progressRing = notification.querySelector('quiet-progress');
      if (progressRing) progressRing.value = 100;
    } else if (event.type === 'mouseleave') {
      // Restart the timer with original duration
      timer.startTime = Date.now();
      timer.timeoutId = window.setTimeout(() => {
        this.removeNotification(notification);
      }, timer.duration);

      // Restart progress updates
      timer.progressIntervalId = window.setInterval(() => {
        this.updateProgress(notification, timer);
      }, 100);

      // Update progress immediately
      this.updateProgress(notification, timer);
    }
  };

  /** Hides the stack when the last notification has transitioned out */
  private handleTransitionEnd() {
    if (this.stack.children.length === 0) {
      this.hideStack();
    }
  }

  /** Hides the toast stack. Call this after all notifications have been removed. */
  private hideStack() {
    this.hidePopover();
    this.stack.hidden = true;
    this.isStackShowing = false;
    this.customStates.set('visible', false);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('scroll', this.handleDocumentScroll);
  }

  /** Shows the toast stack in preparation for a notification. */
  private showStack() {
    if (this.isStackShowing) return;
    this.isStackShowing = true;
    this.stack.hidden = false;
    this.customStates.set('visible', true);
    this.showPopover();
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('scroll', this.handleDocumentScroll, { passive: true });
  }

  private startDurationTimer(notification: HTMLElement, duration: number) {
    this.clearDurationTimer(notification);

    const timer: NotificationTimer = {
      startTime: Date.now(),
      duration: duration,
      timeoutId: window.setTimeout(() => {
        this.removeNotification(notification);
      }, duration),
      progressIntervalId: window.setInterval(() => {
        this.updateProgress(notification, timer);
      }, 100)
    };

    this.activeTimers.set(notification, timer);
    this.updateProgress(notification, timer);
  }

  private clearDurationTimer(notification: HTMLElement) {
    const timer = this.activeTimers.get(notification);
    if (timer) {
      clearTimeout(timer.timeoutId);
      clearInterval(timer.progressIntervalId);
      this.activeTimers.delete(notification);
    }
  }

  private updateProgress(notification: HTMLElement, timer: NotificationTimer) {
    const elapsed = Date.now() - timer.startTime;
    const remaining = Math.max(0, timer.duration - elapsed);
    const progress = remaining / timer.duration;
    const progressRing = notification.querySelector('quiet-progress');
    if (progressRing) progressRing.value = progress * 100;
  }

  private async removeNotification(notification: HTMLElement) {
    await new Promise(requestAnimationFrame); // let the animation complete first
    this.clearDurationTimer(notification);
    this.transitionGroup.transitionComplete().then(() => {
      notification.remove();
    });
  }

  /** Immediately removes all elements from the toast stack. */
  public empty() {
    this.stack.innerHTML = '';
  }

  /** Creates a toast notification and adds it to the stack. */
  public async notify(content: string | DirectiveResult<typeof UnsafeHTMLDirective>, options?: Partial<NotifyOptions>) {
    const opts: NotifyOptions = {
      icon: '',
      variant: 'default',
      closeButton: true,
      duration: 5000,
      ...options
    };

    const notification = html`
      <div
        part="notification"
        class=${classMap({
          notification: true,
          primary: opts.variant === 'primary',
          constructive: opts.variant === 'constructive',
          destructive: opts.variant === 'destructive',
          default: opts.variant === 'default'
        })}
        @mouseenter=${this.handleNotificationHover}
        @mouseleave=${this.handleNotificationHover}
      >
        ${opts.icon ? html`<div class="icon">${opts.icon}</div>` : ''}

        <div class="content">${content}</div>

        ${opts.closeButton
          ? html`
              <button
                part="close-button"
                class="close-button"
                type="button"
                data-toast="close"
                aria-label=${this.localize.term('close')}
              >
                ${opts.duration > 0 && Number.isFinite(opts.duration)
                  ? html`
                      <quiet-progress
                        part="progress"
                        exportparts="
                          track:progress__track,
                          indicator:progress__indicator,
                          content:progress__content
                        "
                        appearance="ring"
                        value="50"
                      >
                        <quiet-icon library="system" name="x"></quiet-icon>
                      </quiet-progress>
                    `
                  : html` <quiet-icon library="system" name="x"></quiet-icon> `}
              </button>
            `
          : ''}
      </div>
    `;

    // Show the stack
    this.showStack();

    // Wait for the transition group to stop animating
    await this.transitionGroup.transitionComplete();

    // Add the notification to the stack
    const tempDiv = document.createElement('div');
    render(notification, tempDiv);
    const notificationElement = tempDiv.firstElementChild!;

    // Add the notification based on placement
    this.stack.prepend(notificationElement);

    // Start the duration timer if specified
    if (opts.duration > 0 && Number.isFinite(opts.duration)) {
      this.startDurationTimer(notificationElement as HTMLElement, opts.duration);
    }
  }

  /**
   * When creating a notification, you can pass HTML to `content` and `icon` by wrapping it in this method. Remember
   * to sanitize untrusted input to prevent XSS attacks!
   */
  public html(html: string) {
    return unsafeHTML(html);
  }

  render() {
    return html`
      <quiet-transition-group
        id="stack"
        part="stack"
        role="log"
        aria-relevant="additions"
        @click=${this.handleClick}
        @quiet-transition-end=${this.handleTransitionEnd}
      ></quiet-transition-group>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-toast': QuietToast;
  }
}
