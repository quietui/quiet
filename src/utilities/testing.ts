import { sendMouse } from '@web/test-runner-commands';

/**
 * Simulates clicking on an HTML element at a specified position with optional offsets. Used for programmatically
 * triggering actual clicks in the testing environment.
 *
 * @param el - The DOM element to click
 * @param position - Where on the element to click ('top', 'right', 'bottom', 'left', 'center', 'top-right', 'top-left', 'bottom-right', 'bottom-left')
 * @param offsetX - Horizontal pixel offset from the click position
 * @param offsetY - Vertical pixel offset from the click position
 *
 * @example
 * await clickOnElement(button, 'center'); // Click center of button
 * await clickOnElement(menu, 'top', 0, 5); // Click 5px below top of menu
 * await clickOnElement(menu, 'top-right'); // Click top right corner
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
  offsetX = 0,
  offsetY = 0
) {
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

  await sendMouse({ type: 'click', position: [Math.round(clickX + offsetX), Math.round(clickY + offsetY)] });
}
