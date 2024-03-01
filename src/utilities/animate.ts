/**
 * Applies a class to the specified element to animate it. The class is removed after the animation finishes and then
 * the promise resolves. If a timeout is provided, the class will be removed and the animation will
 */
export function animateWithClass(el: Element, className: string) {
  return new Promise<void>(resolve => {
    el.classList.add(className);
    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove(className);
        resolve();
      },
      { once: true }
    );
  });
}
