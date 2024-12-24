const isTouchEnabled = 'TouchEvent' in window;

/**
 * Adds a configurable long press event to the target element.
 *
 * By default, a `long press` event will be dispatched 500ms after `touchstart` if the user hasn't moved the pointer far
 * from the original position. You can listen for this event with `el.addEventListener('long-press')` like any other
 * event. By design, this utility works with both touch and pointer events. To disable pointer events and only listen to
 * touch, set `ignorePointerEvents` to `true`.
 *
 * The `long-press` event is cancelable and bubbles by default. To prevent browsers (e.g. iOS) from showing touch
 * callouts and text selection, the `-webkit-touch-callout`, `-webkit-user-select`, and `user-select` properties are all
 * set to `none !important` temporarily.
 *
 * The event will start functioning as soon as the constructor is called. A `start()` and `stop()` method can be used to
 * start and stop the event listener programmatically, if needed.
 *
 * @usage
 *
 * const longPress = new LongPress(element);
 *
 * element.addEventListener('long-press', (event) => {
 *   // a long press has occurred at originalEvent.clientX, originalEvent.clientY
 *   const originalEvent = event.detail.originalEvent;
 * });
 */
export class LongPress {
  private options: LongPressOptions;
  private target: Element;
  private timeout: number;
  private startCoords: { x: number; y: number };
  private wasStarted = false;

  constructor(el: Element, options?: Partial<LongPressOptions>) {
    this.target = el;
    this.options = {
      eventName: 'long-press',
      eventOptions: {
        bubbles: true,
        cancelable: true,
        composed: true
      },
      duration: 500,
      ignorePointerEvents: false,
      maxDelta: 10,
      overrideStyles: true,
      ...options
    };

    this.start();
  }

  private handlePress = (event: TouchEvent | PointerEvent) => {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;

    // Only listen for one finger touches
    if (isTouchEnabled && event instanceof TouchEvent && event.touches.length > 1) {
      return;
    }

    this.startCoords = { x, y };

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const longPressEvent = new LongPressEvent(this.options.eventName, this.options.eventOptions, {
        type: event.type === 'touchstart' ? 'touch' : 'pointer',
        originalEvent: event
      });
      this.target.dispatchEvent(longPressEvent);
    }, this.options.duration);

    // Listen for movement
    this.target.addEventListener('touchmove', this.handleMove);
    this.target.addEventListener('touchend', this.handleRelease);

    if (!this.options.ignorePointerEvents) {
      this.target.addEventListener('pointermove', this.handleMove);
      this.target.addEventListener('pointerup', this.handleRelease);
    }
  };

  private handleMove = (event: TouchEvent | PointerEvent) => {
    const x = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;
    const deltaX = Math.abs(this.startCoords.x - x);
    const deltaY = Math.abs(this.startCoords.y - y);
    const deltaRoot = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Cancel the long press if the delta is too big or 2+ finger touches
    if (
      deltaRoot > this.options.maxDelta ||
      (isTouchEnabled && event instanceof TouchEvent && event.touches.length > 1)
    ) {
      clearTimeout(this.timeout);
    }
  };

  private handleRelease = () => {
    clearTimeout(this.timeout);
  };

  /** Starts listening for the long press event. */
  public start() {
    if (this.wasStarted) return;

    this.wasStarted = true;

    if (this.options.overrideStyles && this.target instanceof HTMLElement) {
      this.target.style.setProperty('-webkit-touch-callout', 'none', 'important');
      this.target.style.setProperty('-webkit-user-select', 'none', 'important');
      this.target.style.setProperty('user-select', 'none', 'important');
    }

    // Listen for touchstart / pointerdown
    this.target.addEventListener('touchstart', this.handlePress);

    if (!this.options.ignorePointerEvents) {
      this.target.addEventListener('pointerdown', this.handlePress);
    }
  }

  /** Stops listening for the long press event. */
  public stop() {
    clearTimeout(this.timeout);

    this.wasStarted = false;

    if (this.options.overrideStyles && this.target instanceof HTMLElement) {
      this.target.style.removeProperty('-webkit-touch-callout');
      this.target.style.removeProperty('-webkit-user-select');
      this.target.style.removeProperty('user-select');
    }

    this.target.removeEventListener('touchstart', this.handlePress);
    this.target.removeEventListener('touchmove', this.handleMove);
    this.target.removeEventListener('touchend', this.handleRelease);

    if (!this.options.ignorePointerEvents) {
      this.target.removeEventListener('pointerdown', this.handlePress);
      this.target.removeEventListener('pointermove', this.handleMove);
      this.target.removeEventListener('pointerup', this.handleRelease);
    }
  }
}

export class LongPressEvent extends Event {
  readonly detail: LongPressEventDetail;

  constructor(eventName: string, eventOptions: EventInit, detail: LongPressEventDetail) {
    super(eventName, eventOptions);
    this.detail = detail;
  }
}

export interface LongPressEventDetail {
  /** The type of event. This will be `touch` for taps and `pointer` for clicks. */
  type: 'touch' | 'pointer';
  /** The event that initiated the long press. Useful for determining the target, coordinates, etc. */
  originalEvent: TouchEvent | PointerEvent;
}

export interface LongPressOptions {
  /**
   * By default, both touch and pointers events will dispatch a long press event. Set this to `true` to disable pointer
   * events and only listen to touch events.
   */
  ignorePointerEvents: boolean;
  /** The name of the event to emit. */
  eventName: string;
  /** Options to pass to the event. */
  eventOptions: EventInit;
  /** The amount of time to wait before considering it a long press. */
  duration: number;
  /** The maximum change in movement before the long press is canceled. */
  maxDelta: number;
  /** Whether to override certain styles that prevent touch callouts and user selection during the long press. */
  overrideStyles: boolean;
}
