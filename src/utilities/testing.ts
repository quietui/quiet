import { sendMouse } from '@web/test-runner-commands';

/**
 * Simulates clicking on an HTML element at a specified position with optional offsets.
 * Used for programmatically triggering actual clicks in the testing environment.
 *
 * @param el - The DOM element to click
 * @param position - Where on the element to click ('top', 'right', 'bottom', 'left', 'center', 'top-right', 'top-left', 'bottom-right', 'bottom-left')
 * @param options - Object containing offset configurations
 * @param options.offsetX - Horizontal pixel offset from the click position
 * @param options.offsetY - Vertical pixel offset from the click position
 *
 * @example
 * await clickOnElement(button, 'center'); // Click center of button
 * await clickOnElement(menu, 'top', { offsetY: 5 }); // Click 5px below top of menu
 * await clickOnElement(menu, 'top-right', { offsetX: -2 }); // Click slightly left of top right corner
 */
export async function clickOnElement(
  el: Element,
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'center'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left' = 'center',
  options: {
    offsetX?: number;
    offsetY?: number;
  } = {}
) {
  const { offsetX = 0, offsetY = 0 } = options;

  // Get element's position and dimensions relative to viewport
  const { x, y, width, height } = el.getBoundingClientRect();
  const centerX = Math.floor(x + window.scrollX + width / 2);
  const centerY = Math.floor(y + window.scrollY + height / 2);

  let clickX = centerX;
  let clickY = centerY;

  // Handle cardinal positions
  if (position.includes('top')) {
    clickY = y;
  } else if (position.includes('bottom')) {
    clickY = y + height - 1;
  }

  if (position.includes('right')) {
    clickX = x + width - 1;
  } else if (position.includes('left')) {
    clickX = x;
  }

  await sendMouse({
    type: 'click',
    position: [Math.round(clickX + offsetX), Math.round(clickY + offsetY)]
  });
}

interface ExpectEventOptions {
  /** The length of time in milliseconds to wait for events to be received. Default 500. */
  timeout: number;
  /** The number of times the event should be emitted. Default 1. */
  count: number;
}

export async function expectEvent(
  /** The element dispatching the event */
  el: Element,
  /**
   * The name of the event(s) to listen for. If more than one event is passed, they all must be dispatched the same
   * number of times as specified in `options.count`. This is most commonly used for testing custom + native events that
   * get dispatched at the same time, e.g. `input` and `quiet-input`.
   */
  events: string | string[],
  /** The action to run that will trigger the events */
  action: () => void | Promise<void>,
  /** Additional options */
  options?: Partial<ExpectEventOptions>
) {
  const opts: ExpectEventOptions = {
    timeout: 500,
    count: 1,
    ...options
  };

  const eventNames = Array.isArray(events) ? events : [events];
  const eventCounts = new Map<string, number>();
  eventNames.forEach(name => eventCounts.set(name, 0));

  const handleEvent = (eventName: string) => (event: Event) => {
    if (event.target === el) {
      eventCounts.set(eventName, (eventCounts.get(eventName) || 0) + 1);
    }
  };

  const handlers = new Map<string, (event: Event) => void>();
  eventNames.forEach(name => {
    const handler = handleEvent(name);
    handlers.set(name, handler);
    el.addEventListener(name, handler);
  });

  return new Promise<void>(async (resolve, reject) => {
    await action();

    setTimeout(() => {
      // Cleanup listeners
      handlers.forEach((handler, name) => {
        el.removeEventListener(name, handler);
      });

      // Check all events were dispatched correct number of times
      const errors: string[] = [];
      eventCounts.forEach((count, name) => {
        if (count !== opts.count) {
          const expectedTimes = opts.count === 1 ? 'once' : `${opts.count} times`;
          const actualTimes = count === 1 ? 'once' : `${count} times`;
          errors.push(
            `Expected "${name}" event to be dispatched ${expectedTimes} but it was dispatched ${actualTimes}`
          );
        }
      });

      if (errors.length === 0) {
        resolve();
      } else {
        reject(new Error(errors.join('\n')));
      }
    }, opts.timeout);
  });
}
