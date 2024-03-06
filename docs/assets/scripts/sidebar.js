//
// Sidebar
//
function showSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const duration = parseInt(getComputedStyle(sidebar).getPropertyValue('--docs-sidebar-speed'), 10);
  const closeButton = document.getElementById('close-sidebar');

  document.documentElement.classList.add('docs-sidebar-open');
  isSidebarOpen = true;
  sidebar.inert = false;
  backdrop.hidden = false;
  closeButton.focus();
  backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration,
    easing: 'ease'
  });
}

function hideSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');

  document.documentElement.classList.remove('docs-sidebar-open');

  if (sidebar) {
    isSidebarOpen = false;
    sidebar.inert = isMobile.matches;
  }

  if (backdrop) {
    backdrop
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 250,
        easing: 'ease'
      })
      .finished.then(() => {
        backdrop.hidden = true;
      });
  }
}

function syncSidebarInert() {
  const sidebar = document.getElementById('sidebar');

  if (sidebar) {
    if (isMobile.matches) {
      sidebar.inert = !isSidebarOpen;
    } else {
      sidebar.inert = false;
    }
  }
}

const isMobile = window.matchMedia('(max-width: 959px)');
let isSidebarOpen = false;
let resizeTimeout;

// Toggle the sidebar
document.addEventListener('click', event => {
  const openButton = event.target.closest('#open-sidebar');
  const closeButton = event.target.closest('#close-sidebar');

  if (openButton) {
    showSidebar();
    return;
  }

  if (closeButton) {
    hideSidebar();
  }
});

window.addEventListener('turbo:render', () => {
  hideSidebar();
});

// Close when clicking outside the sidebar
document.addEventListener('mousedown', event => {
  if (isSidebarOpen && !event.target.closest('#sidebar')) {
    hideSidebar();
  }
});

// Close when pressing escape
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isSidebarOpen) {
    event.stopPropagation();
    hideSidebar();
  }
});

// Close when the sidebar is open and the user tabs outside it
document.addEventListener('focusin', () => {
  if (isSidebarOpen && !document.activeElement?.closest('#sidebar')) {
    hideSidebar();
  }
});

// Make the sidebar inert when the window resizes and the sidebar is hidden
isMobile.addEventListener('change', syncSidebarInert);

// Initial sync
syncSidebarInert();

// Resizing the window causes the sidebar to transition out at a certain breakpoint, which can be jarring. This
// prevents that.
window.addEventListener('resize', () => {
  document.documentElement.classList.add('docs-is-resizing');

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.documentElement.classList.remove('docs-is-resizing');
  }, 250);
});
