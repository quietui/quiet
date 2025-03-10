import { allDefined } from '/dist/quiet.js';

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

      // Save the current scroll position before navigating
      history.replaceState({ scrollTop: window.scrollY }, '');

      // Push the new state with the target scroll position
      history.pushState({ scrollTop }, '', `#${id}`);

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
// Preserve the scroll position on refresh
//
window.addEventListener(
  'scroll',
  () => {
    sessionStorage.setItem('lastScrollY', window.scrollY.toString());
  },
  { passive: true }
);

let hasRestored = false;

async function restoreScrollPosition() {
  const navEntry = performance.getEntriesByType('navigation')[0];
  if (navEntry && navEntry.type !== 'reload') return;

  const scrollY = parseFloat(sessionStorage.getItem('lastScrollY'));
  if (isNaN(scrollY) || scrollY < 0 || hasRestored) return;

  try {
    await allDefined();
    await new Promise(r =>
      document.readyState === 'complete'
        ? requestAnimationFrame(r)
        : window.addEventListener('load', () => requestAnimationFrame(r), { once: true })
    );

    await new Promise(resolve => {
      let attempts = 0;
      const verifyAndSet = () => {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
        if (Math.abs(window.scrollY - scrollY) <= 2 || attempts++ >= 5) {
          hasRestored = true;
          document.documentElement.removeAttribute('data-scroll-restoring');
          resolve();
        } else {
          requestAnimationFrame(verifyAndSet);
        }
      };
      requestAnimationFrame(verifyAndSet);
    });
  } catch (error) {
    hasRestored = false;
    document.documentElement.removeAttribute('data-scroll-restoring');
  }
}

window.addEventListener('load', restoreScrollPosition);
