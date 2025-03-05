/**
 * Emitted when the joystick is about to start being interacted with. Calling `event.preventDefault` will prevent the
 * joystick from activating.
 */
export class QuietJoystickBeforeStartEvent extends Event {
  readonly detail: QuietJoystickEventDetails;

  constructor(detail: QuietJoystickEventDetails, options = { cancelable: true }) {
    super('quiet-joystick-before-start', { bubbles: true, cancelable: options.cancelable, composed: true });
    this.detail = detail;
  }
}

/**
 * Emitted after the joystick has started being interacted with.
 */
export class QuietJoystickStartEvent extends Event {
  readonly detail: QuietJoystickEventDetails;

  constructor(detail: QuietJoystickEventDetails) {
    super('quiet-joystick-start', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

/**
 * Emitted continuously while the joystick is being moved.
 */
export class QuietJoystickMoveEvent extends Event {
  readonly detail: QuietJoystickEventDetails;

  constructor(detail: QuietJoystickEventDetails) {
    super('quiet-joystick-move', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

/**
 * Emitted when the joystick is about to stop being interacted with. Calling `event.preventDefault` will prevent the
 * joystick from stopping.
 */
export class QuietJoystickBeforeStopEvent extends Event {
  readonly detail: QuietJoystickEventDetails;

  constructor(detail: QuietJoystickEventDetails, options = { cancelable: true }) {
    super('quiet-joystick-before-stop', { bubbles: true, cancelable: options.cancelable, composed: true });
    this.detail = detail;
  }
}

/**
 * Emitted after the joystick has stopped being interacted with.
 */
export class QuietJoystickStopEvent extends Event {
  readonly detail: QuietJoystickEventDetails;

  constructor(detail: QuietJoystickEventDetails) {
    super('quiet-joystick-stop', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

/**
 * Interface defining the details payload for joystick events.
 */
interface QuietJoystickEventDetails {
  /** The angle of the joystick in degrees (0° at top, clockwise). */
  angle: number;
  /** The normalized distance from the center (0-1). */
  distance: number;
  /** The normalized x-coordinate (-1 to 1). */
  x: number;
  /** The normalized y-coordinate (-1 to 1). */
  y: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'quiet-joystick-before-start': QuietJoystickBeforeStartEvent;
    'quiet-joystick-start': QuietJoystickStartEvent;
    'quiet-joystick-move': QuietJoystickMoveEvent;
    'quiet-joystick-before-stop': QuietJoystickBeforeStopEvent;
    'quiet-joystick-stop': QuietJoystickStopEvent;
  }
}
