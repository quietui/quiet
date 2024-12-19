/**
 * Applies a class to the specified element to animate it. The class is removed after the animation finishes or is
 * canceled, then the promise resolves. If applying the class doesn't trigger an animation, the promise resolves
 * immediately.
 */
export function animateWithClass(el: Element, className: string): Promise<void> {
  return new Promise<void>(resolve => {
    const handleFinish = () => {
      el.removeEventListener('animationend', handleFinish);
      el.removeEventListener('animationcancel', handleFinish);
      el.classList.remove(className);
      resolve();
    };

    el.classList.add(className);

    queueMicrotask(() => {
      if (el.getAnimations().length === 0) {
        el.classList.remove(className);
        resolve();
        return;
      }

      el.addEventListener('animationend', handleFinish);
      el.addEventListener('animationcancel', handleFinish);
    });
  });
}

/** Determines if two DOMRect objects have different positions. */
export function hasDomRectMoved(oldPosition: DOMRect, newPosition: DOMRect) {
  if (!oldPosition) return true;
  return (
    oldPosition.top !== newPosition.top ||
    oldPosition.left !== newPosition.left ||
    oldPosition.width !== newPosition.width ||
    oldPosition.height !== newPosition.height
  );
}

/** Parses a CSS duration string and returns the corresponding number of milliseconds. */
export function parseCssDuration(duration: string): number {
  // Handle empty or invalid input
  if (!duration || typeof duration !== 'string') {
    return 0;
  }

  // Match number and unit
  const match = duration.match(/^([0-9]*\.?[0-9]+)(ms|s)$/);
  if (!match) {
    return 0;
  }

  const value = parseFloat(match[1]);
  const unit = match[2];

  // Convert to milliseconds based on unit
  switch (unit) {
    case 'ms':
      return value;
    case 's':
      return value * 1000;
    default:
      return 0;
  }
}
