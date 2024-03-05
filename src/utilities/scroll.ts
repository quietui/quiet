const locks = new Set();
const lockStyles = document.createElement('style');

lockStyles.textContent = `
  @supports (scrollbar-gutter: stable) {
    .quiet-scroll-lock {
      scrollbar-gutter: stable !important;
      overflow: hidden !important;
    }
  }
`;

/**
 * Prevents scrolling on the document while a modal component is active. If more than one element locks scrolling, it
 * will only be unlocked after all elements unlock it.
 */
export function lockScrolling(el: Element) {
  locks.add(el);

  if (!lockStyles.isConnected) {
    document.body.append(lockStyles);
    document.documentElement.classList.add('quiet-scroll-lock');
  }
}

/** Removes a lock and enables scrolling on the document if there are no more locks in place. */
export function unlockScrolling(el: Element) {
  locks.delete(el);

  if (locks.size === 0) {
    document.documentElement.classList.remove('quiet-scroll-lock');
    lockStyles.remove();
  }
}
