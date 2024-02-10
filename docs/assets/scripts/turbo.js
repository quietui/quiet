import 'https://cdn.jsdelivr.net/npm/@hotwired/turbo@7.3.0/+esm';

if (!window.___turboScrollPositions___) {
  window.___turboScrollPositions___ = {};
}

const positions = window.___turboScrollPositions___;

function saveScrollPosition() {
  document.querySelectorAll('[data-remember-scroll]').forEach(el => {
    if (el.id) {
      positions[el.id] = {
        top: el.scrollTop,
        left: el.scrollLeft
      };
    } else {
      console.warn(`Can't save scroll position for elements without an id.`, el);
    }
  });
}

function restoreScrollPosition(event) {
  const el = event.detail?.newBody || document;

  el.querySelectorAll('[data-remember-scroll]').forEach(el => {
    if (positions[el.id]) {
      el.scrollTop = positions[el.id].top;
      el.scrollLeft = positions[el.id].left;
    }
  });
}

window.addEventListener('turbo:before-cache', saveScrollPosition);
window.addEventListener('turbo:before-render', restoreScrollPosition);
window.addEventListener('turbo:render', restoreScrollPosition);
