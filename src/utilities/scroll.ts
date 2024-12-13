const locks = new Set();
const stylesheet = new CSSStyleSheet();

stylesheet.replaceSync(`
  .quiet-scroll-lock {
    scrollbar-gutter: stable !important;
    overflow: hidden !important;
  }
`);

/**
 * Prevents scrolling on the document while a modal component is active. If more than one element locks scrolling, it
 * will only be unlocked after all elements unlock it.
 */
export function lockScrolling(el: Element) {
  locks.add(el);
  document.documentElement.classList.add('quiet-scroll-lock');

  // Add the stylesheet to the document
  if (!document.adoptedStyleSheets.includes(stylesheet)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
  }
}

/** Removes a lock and enables scrolling on the document if there are no more locks in place. */
export function unlockScrolling(el: Element) {
  locks.delete(el);

  if (locks.size === 0) {
    document.documentElement.classList.remove('quiet-scroll-lock');

    // Remove the stylesheet from the document
    const index = document.adoptedStyleSheets.indexOf(stylesheet);
    if (index > -1) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets].filter((_sheet, i) => i !== index);
    }
  }
}
