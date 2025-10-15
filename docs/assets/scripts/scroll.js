import { allDefined } from '/dist/quiet.js';

/**
 * Determines how the page was loaded. Possible return values include "reload", "navigate", "back_forward", "prerender",
 * and "unknown".
 */
function getNavigationType() {
  if (performance.getEntriesByType) {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      return navEntries[0].type;
    }
  }
  return 'unknown';
}

// Smooth links
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  const id = (link?.hash ?? '').substr(1);

  // If the pathname is different or smooth links are disabled, no need to scroll
  if (!link || link.pathname !== location.pathname || link.getAttribute('data-smooth-link') === 'off') {
    return;
  }

  if (id) {
    const target = document.getElementById(id);
    const headerHeight = document.querySelector('#header').clientHeight;

    if (target) {
      event.preventDefault();
      const scrollTop = target.offsetTop - headerHeight;

      history.replaceState(history.state, '', `#${id}`);

      window.scroll({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }
});

// Handle back/forward navigation
window.addEventListener('popstate', event => {
  const scrollTop = event.state?.scrollTop ?? 0;
  window.scroll({
    top: scrollTop,
    behavior: 'smooth'
  });
});

// Scroll classes
function updateScrollClass() {
  document.body.classList.toggle('scrolled-down', window.scrollY >= 10);
}

window.addEventListener('scroll', updateScrollClass);
window.addEventListener('turbo:render', updateScrollClass);
updateScrollClass();

//
// Restore scroll position after components are defined. This prevents the page from moving around when reloading,
// which is especially annoying in a development environment.
//
allDefined().then(() => {
  const navigationType = getNavigationType();
  const key = `scroll-y-[${location.pathname}]`;
  const scrollY = sessionStorage.getItem(key);

  // Only restore when reloading, otherwise clear it
  if (navigationType === 'reload' && scrollY) {
    window.scrollTo(0, scrollY);
  } else {
    sessionStorage.removeItem(key);
  }

  // After restoring, keep tabs on the page's scroll position for next reload
  window.addEventListener(
    'scroll',
    () => {
      sessionStorage.setItem(key, window.scrollY);
    },
    { passive: true }
  );
});
