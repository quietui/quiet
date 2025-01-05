import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { QuietActivateEvent, QuietDeactivateEvent } from '../../events/activate.js';
import { QuietProgressEvent } from '../../events/progress.js';
import hostStyles from '../../styles/host.styles.js';
import { DraggableElement } from '../../utilities/drag.js';
import { Localize } from '../../utilities/localize.js';
import { clamp } from '../../utilities/math.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import '../icon/icon.js';
import styles from './slide-activate.styles.js';

/**
 * <quiet-slide-activate>
 *
 * @summary Slide activate gives users a draggable thumb that must be moved to the end of its track to trigger an action.
 * @documentation https://quietui.org/docs/components/slide-activate
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-icon
 *
 * @slot label - The slide activate's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot thumb - The thumb element that users drag. Defaults to a double chevron icon if not provided.
 *
 * @csspart thumb - The slide activate's thumb.
 * @csspart label - The slide activate's label.
 *
 * @cssproperty [--border-radius=9999px] - The control's border radius. We use a CSS custom property so we can properly
 *  calculate the inset border radius for the thumb.
 * @cssproperty [--thumb-width=4em] - The thumb's width.
 * @cssproperty [--thumb-inset=0.125em] - The thumb's inset from the host element.
 *
 * @cssstate activated - Applied briefly when the slide activate has been activated.
 * @cssstate dragging - Applied when the slide activate is dragging.
 * @cssstate pressing - Applied when the user is pressing a key to activate the slide activate.
 * @cssstate disabled - Applied when the slide activate is disabled.
 */
@customElement('quiet-slide-activate')
export class QuietSlideActivate extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  private draggableThumb: DraggableElement;
  private dragStartX: number;
  private hostBoundingClientRect: DOMRect;
  private lastDispatchedPercentage: number;
  private localize = new Localize(this);
  private isKeyPressStale = false;
  private keyPressInterval: number | undefined;
  private keyPressTimeout: number | undefined;

  @query('#thumb') thumb: HTMLElement;

  @state() isDragging = false;
  @state() isPressing = false;
  @state() thumbPosition = 0;

  /**
   * The label to show in the slide activate's track. If you need to provide HTML in the label, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** Reflects when the control is activated. Remove this attribute to deactivate it. */
  @property({ type: Boolean, reflect: true }) activated = false;

  /** Disables the control. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws attention to the track by adding a subtle animation. */
  @property({ reflect: true }) attention: 'shimmer';

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupTimers();
  }

  firstUpdated() {
    // Enable dragging on the rating
    this.draggableThumb = new DraggableElement(this.thumb, {
      start: x => {
        // Cache coords when dragging starts to avoid calling it on every move
        this.isDragging = true;
        this.dragStartX = x;
        this.hostBoundingClientRect = this.getBoundingClientRect();
        this.handleDrag(x);
      },
      move: x => {
        this.handleDrag(x);
      },
      stop: x => {
        this.handleDrag(x);
        this.isDragging = false;

        if (!this.activated) {
          this.setThumbPosition(0);
        }
      }
    });
  }

  updated(changedProperties: PropertyValues<this>) {
    // Handle activated
    if (changedProperties.has('activated')) {
      if (this.activated) {
        this.activate();
      } else if (changedProperties.get('activated') === true) {
        this.deactivate();
      }
    }

    // Handle disabled
    if (changedProperties.has('disabled')) {
      this.customStates.set('disabled', this.disabled);

      if (this.disabled) {
        this.cleanupTimers();
        this.draggableThumb.stop();
      } else {
        this.draggableThumb.start();
      }
    }

    // Handle dragging
    if (changedProperties.has('isDragging')) {
      this.customStates.set('dragging', this.isDragging);
    }

    // Handle pressing
    if (changedProperties.has('isPressing')) {
      this.customStates.set('pressing', this.isPressing);
    }

    // Handle thumb position
    if (changedProperties.has('thumbPosition')) {
      if (this.thumbPosition >= 1) {
        this.activated = true;
      }
    }
  }

  /** Attempts to activate the component. */
  private activate() {
    // Dispatch the cancelable `quiet-activate` event
    const activateEvent = new QuietActivateEvent();
    this.dispatchEvent(activateEvent);
    if (activateEvent.defaultPrevented) {
      this.activated = false;
      return;
    }

    clearInterval(this.keyPressInterval);
    if (this.isPressing) this.isKeyPressStale = true;

    this.setThumbPosition(1);
    this.activated = true;
    this.customStates.set('activated', true);
  }

  /** Restores the control to its original deactivated state. */
  private deactivate() {
    // Dispatch the cancelable `quiet-activate` event
    const deactivateEvent = new QuietDeactivateEvent();
    this.dispatchEvent(deactivateEvent);
    if (deactivateEvent.defaultPrevented) {
      this.activated = true;
      return;
    }

    this.setThumbPosition(0);
    this.activated = false;
    this.customStates.set('activated', false);
    this.isKeyPressStale = false;
    this.isPressing = false;
  }

  // Centralized cleanup method
  private cleanupTimers() {
    if (this.keyPressInterval) {
      clearInterval(this.keyPressInterval);
      this.keyPressInterval = undefined;
    }
    if (this.keyPressTimeout) {
      clearTimeout(this.keyPressTimeout);
      this.keyPressTimeout = undefined;
    }
  }

  /** Updates the thumb position from a pointer's x coordinate */
  private handleDrag(x: number) {
    if (this.disabled || this.activated) return;
    const isRtl = this.localize.dir() === 'rtl';
    const hostWidth = this.hostBoundingClientRect.width - this.thumb.clientWidth;
    const deltaX = isRtl ? this.dragStartX - x : x - this.dragStartX;
    const percentage = clamp(deltaX / hostWidth, 0, 1);

    this.setThumbPosition(percentage);
  }

  private handleKeyDown(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const arrowKey = isRtl ? 'ArrowLeft' : 'ArrowRight';

    if (event.key === ' ' || event.key === arrowKey) {
      event.preventDefault();
      if (this.activated || this.disabled) return;

      // If this key press previously triggered an activation, ignore it
      if (this.isKeyPressStale) return;

      // Ignore keyboard repeat
      if (!this.isPressing) {
        this.isPressing = true;

        // Clean up any existing timers before starting new ones
        this.cleanupTimers();

        // Move the thumb position from zero to 100 over a period of one second while the key is pressed, allowing
        // progress to dispatch
        this.setThumbPosition(0);
        this.keyPressInterval = setInterval(() => {
          this.setThumbPosition(this.thumbPosition + 0.1);
        }, 100);
      }
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    const isRtl = this.localize.dir() === 'rtl';
    const arrowKey = isRtl ? 'ArrowLeft' : 'ArrowRight';

    if (this.activated || this.disabled) return;

    // The user is no longer pressing it
    if (event.key === ' ' || event.key === arrowKey) {
      event.preventDefault();
      this.isKeyPressStale = false;
      this.isPressing = false;
      this.setThumbPosition(0);
      this.cleanupTimers();
    }
  }

  /** Updates the thumb position and dispatches the `quiet-progress` event. */
  private setThumbPosition(value: number) {
    if (this.disabled) return;

    if (value !== this.thumbPosition) {
      this.thumbPosition = value;
      const percentage = Number(value.toFixed(2));
      if (percentage !== this.lastDispatchedPercentage) {
        this.dispatchEvent(new QuietProgressEvent({ percentage: percentage }));
      }
    }
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div
        id="label"
        part="label"
        class=${classMap({
          rtl: isRtl,
          shimmer: this.attention === 'shimmer'
        })}
      >
        <slot name="label">${this.label}</slot>
      </div>

      <div
        id="thumb"
        part="thumb"
        tabindex=${this.disabled ? '-1' : '0'}
        role="button"
        aria-pressed=${this.activated}
        aria-labelledby="label"
        aria-description=${ifDefined(
          this.activated ? undefined : this.localize.term('pressSpaceForOneSecondToActivate')
        )}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        class=${classMap({
          activated: this.activated,
          dragging: this.isDragging,
          'is-press-stale': this.isKeyPressStale,
          pressing: this.isPressing,
          rtl: isRtl
        })}
        style="--thumb-position: ${this.thumbPosition}"
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
      >
        <slot name="thumb">
          <quiet-icon library="default" name="chevrons-right"></quiet-icon>
          <quiet-icon library="default" name="check"></quiet-icon>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-slide-activate': QuietSlideActivate;
  }
}
