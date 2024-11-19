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
