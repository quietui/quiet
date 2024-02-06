//
// Sidebar
//
function showSidebar() {
  const duration = parseInt(getComputedStyle(sidebar).getPropertyValue('--docs-sidebar-speed'), 10);

  root.classList.add('docs-sidebar-open');
  isSidebarOpen = true;
  sidebar.inert = false;
  overlay.hidden = false;
  closeButton.focus();
  overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration,
    easing: 'ease'
  });
}

function hideSidebar() {
  root.classList.remove('docs-sidebar-open');
  isSidebarOpen = false;
  sidebar.inert = isMobile.matches;
  overlay
    .animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 250,
      easing: 'ease'
    })
    .finished.then(() => {
      overlay.hidden = true;
    });
}

function syncSidebarInert() {
  if (isMobile.matches) {
    sidebar.inert = !isSidebarOpen;
  } else {
    sidebar.inert = false;
  }
}

const root = document.documentElement;
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openButton = document.getElementById('open-sidebar');
const closeButton = document.getElementById('close-sidebar');
const isMobile = window.matchMedia('(max-width: 959px)');
let isSidebarOpen = false;
let resizeTimeout;

// Toggle the sidebar
openButton.addEventListener('click', showSidebar);
closeButton.addEventListener('click', hideSidebar);

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
