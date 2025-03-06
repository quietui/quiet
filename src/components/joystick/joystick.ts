import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  QuietJoystickBeforeStartEvent,
  QuietJoystickBeforeStopEvent,
  QuietJoystickMoveEvent,
  QuietJoystickStartEvent,
  QuietJoystickStopEvent
} from '../../events/joystick.js';
import hostStyles from '../../styles/host.styles.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import styles from './joystick.styles.js';

/**
 * A custom web component that renders a joystick controllable via touch or mouse.
 *
 * @summary A directional joystick that can be controlled via touch or mouse.
 * @documentation https://quietui.org/docs/components/joystick
 * @status stable
 * @since 1.0
 *
 * @slot thumb - An optional icon to display in the thumb.
 *
 * @event quiet-joystick-before-start - Emitted before interaction begins. Calling `event.preventDefault()` will cancel
 *  activation.
 * @event quiet-joystick-start - Emitted when movement begins.
 * @event quiet-joystick-move - Emitted continuously during movement. Consider debouncing for performance-sensitive
 *  applications.
 * @event quiet-joystick-before-stop - Emitted before interaction ends. Calling `event.preventDefault()` will cancel
 *  deactivation.
 * @event quiet-joystick-stop - Emitted when movement ends.
 *
 * @csspart thumb - The movable thumb within the joystick.
 *
 * @cssproperty [--size=7rem] - The overall width and height of the joystick.
 * @cssproperty [--thumb-size=2.5rem] - The width and height of the movable thumb.
 *
 * @cssstate active - Indicates the joystick is currently being moved.
 * @cssproperty [--distance=0] - A readonly custom property that represents the normalized distance (0-1) of the thumb
 *  from the center, updated dynamically during movement. You can use this to change the joystick's appearance as the
 *  user moves the thumb.
 */
@customElement('quiet-joystick')
export class QuietJoystick extends QuietElement {
  static styles: CSSResultGroup = [hostStyles, styles];

  @query('#thumb') thumbEl: HTMLDivElement;

  /**
   * An accessible label for the joystick. This won't be shown, but it will be read to assistive devices so you should
   * always include one.
   */
  @property() label = '';

  /** Indicates whether the joystick is disabled. When `true`, the joystick does not respond to mouse or touch input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The operational mode of the joystick. 'normal' snaps back to center on release, 'sticky' retains its last position. */
  @property({ type: String, reflect: true }) mode: 'normal' | 'sticky' = 'normal';

  /** The normalized distance (0-1) from the center below which no movement is registered. */
  @property({ type: Number, attribute: 'dead-zone' })
  public get deadZone(): number {
    return this._deadZone;
  }
  public set deadZone(value: number) {
    this._deadZone = Math.max(0, Math.min(1, value)); // Clamp to 0-1
  }
  private _deadZone = 0;

  private isActive = false;
  private centerX = 0;
  private centerY = 0;
  private lastPosData: ReturnType<typeof this.calculatePosition> | null = null;
  private maxDistance = 0;
  private resizeObserver: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.addEventListener('mousedown', this.handleStart);
    this.addEventListener('touchstart', this.handleStart);
    this.resizeObserver = new ResizeObserver(() => this.updateDimensions());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.handleStart);
    this.removeEventListener('touchstart', this.handleStart);
    this.resizeObserver.disconnect();
    this.cleanupListeners();
  }

  firstUpdated() {
    this.setAttribute('role', 'application');
    this.setAttribute('aria-label', this.label);
    this.setAttribute('aria-roledescription', 'joystick');
    this.setAttribute('tabindex', '-1'); // not tabbable since it's touch/mouse-only
    this.style.setProperty('--distance', '0');
    this.updateDimensions();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  private updateDimensions() {
    const rect = this.getBoundingClientRect();
    this.centerX = rect.width / 2;
    this.centerY = rect.height / 2;
    // For square, we can use the full width/height minus thumb size
    // For round, we use a circular boundary
    this.maxDistance = (rect.width - this.thumbEl.offsetWidth) / 2;
  }

  private calculatePosition(x: number, y: number) {
    // Calculate delta from center
    const dx = x - this.centerX;
    const dy = y - this.centerY;

    let translateX = dx;
    let translateY = dy;
    let normalizedDistance: number;
    let angle: number;

    const rawDistance = Math.sqrt(dx * dx + dy * dy);
    // Adjust angle: 0° at top, clockwise
    angle = Math.atan2(dx, -dy) * (180 / Math.PI); // Swap dy to -dy and dx order to rotate 90° clockwise
    if (angle < 0) angle += 360; // Convert -180° to 180° range to 0° to 359°
    normalizedDistance = Math.min(1, rawDistance / this.maxDistance);

    // Apply dead zone
    if (normalizedDistance < this.deadZone) {
      return { angle: 0, distance: 0, translateX: 0, translateY: 0, x: 0, y: 0 };
    }

    // Constrain to circular boundary
    if (rawDistance > this.maxDistance) {
      const directionX = dx / rawDistance;
      const directionY = dy / rawDistance;
      translateX = directionX * this.maxDistance;
      translateY = directionY * this.maxDistance;
    }

    return {
      angle,
      distance: normalizedDistance,
      translateX,
      translateY,
      x: translateX / this.maxDistance, // -1 to 1
      y: translateY / this.maxDistance // -1 to 1
    };
  }

  private dispatchJoystickEvent(
    eventClass:
      | typeof QuietJoystickBeforeStartEvent
      | typeof QuietJoystickStartEvent
      | typeof QuietJoystickMoveEvent
      | typeof QuietJoystickBeforeStopEvent
      | typeof QuietJoystickStopEvent,
    position: ReturnType<typeof this.calculatePosition>
  ) {
    this.dispatchEvent(
      new eventClass({
        angle: position.angle,
        distance: position.distance,
        x: position.x,
        y: position.y
      })
    );
  }

  private handleStart(event: MouseEvent | TouchEvent) {
    if (this.disabled) return;

    event.preventDefault();
    this.updateDimensions();
    const position = this.getPositionFromEvent(event);
    const posData = this.calculatePosition(position.x, position.y);

    // Dispatch before-start event and allow cancellation
    const beforeStartEvent = new QuietJoystickBeforeStartEvent(posData);
    this.dispatchEvent(beforeStartEvent);
    if (beforeStartEvent.defaultPrevented) {
      return;
    }

    this.isActive = true;
    this.updateThumbPosition(posData);
    this.customStates.set('active', true);
    this.style.setProperty('--distance', posData.distance.toString());
    this.dispatchJoystickEvent(QuietJoystickStartEvent, posData);
    this.setupListeners();
  }

  private handleMove(event: MouseEvent | TouchEvent) {
    if (!this.isActive || this.disabled) return;

    event.preventDefault();
    const position = this.getPositionFromEvent(event);
    const posData = this.calculatePosition(position.x, position.y);
    this.style.setProperty('--distance', posData.distance.toString());
    this.updateThumbPosition(posData);
    this.lastPosData = posData; // Add this line to store the last position
    this.dispatchJoystickEvent(QuietJoystickMoveEvent, posData);
  }

  private handleEnd() {
    if (!this.isActive || this.disabled) return;

    // Use last position in sticky mode, fallback to reset
    const posData = this.mode === 'normal' ? this.resetThumbPosition() : this.lastPosData || this.resetThumbPosition();
    const beforeStopEvent = new QuietJoystickBeforeStopEvent(posData);

    this.dispatchEvent(beforeStopEvent);
    if (beforeStopEvent.defaultPrevented) {
      return;
    }

    this.isActive = false;
    this.customStates.set('active', false);
    this.style.setProperty('--distance', posData.distance.toString());
    this.dispatchJoystickEvent(QuietJoystickStopEvent, posData);
    this.cleanupListeners();
  }

  private getPositionFromEvent(event: MouseEvent | TouchEvent) {
    const rect = this.getBoundingClientRect();
    const touch = 'touches' in event ? event.touches[0] : event;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  private updateThumbPosition(posData: ReturnType<typeof this.calculatePosition>) {
    this.thumbEl.style.transform = `translate(${posData.translateX}px, ${posData.translateY}px)`;
  }

  private resetThumbPosition() {
    const posData = {
      angle: 0,
      distance: 0,
      translateX: 0,
      translateY: 0,
      x: 0,
      y: 0
    };
    this.updateThumbPosition(posData);
    this.customStates.set('active', false);
    this.style.setProperty('--distance', '0');
    return posData;
  }

  private setupListeners() {
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleEnd);
    document.addEventListener('touchmove', this.handleMove);
    document.addEventListener('touchend', this.handleEnd);
    document.addEventListener('touchcancel', this.handleEnd);
  }

  private cleanupListeners() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
    document.removeEventListener('touchmove', this.handleMove);
    document.removeEventListener('touchend', this.handleEnd);
    document.removeEventListener('touchcancel', this.handleEnd);
  }

  /**
   * Programmatically resets the joystick's position. Useful for resetting it in sticky mode, e.g. when a game restarts.
   */
  public reset() {
    this.resetThumbPosition();
  }

  render() {
    return html` <div id="thumb" part="thumb"><slot name="thumb"></slot></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiet-joystick': QuietJoystick;
  }
}
