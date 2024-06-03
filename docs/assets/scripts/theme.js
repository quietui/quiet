//
// Dark mode
//
function setTheme(name, skipTransition = false) {
  const isDark = name === 'dark';
  sessionStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (skipTransition || !document.startViewTransition) {
    document.documentElement.classList.toggle('quiet-dark', isDark);
    return;
  }

  document.startViewTransition(() => {
    document.documentElement.classList.toggle('quiet-dark', isDark);
  });
}

function getTheme() {
  // Use session preference, if one exists
  if (sessionStorage.getItem('theme')) {
    return sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  // Fall back to system
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initial set/restore
setTheme(getTheme(), true);

// Update when the OS preference changes
prefersDark.addEventListener('change', event => {
  setTheme(event.matches ? 'dark' : 'light');
});

// Update when a dark mode toggle is activated
document.addEventListener('click', event => {
  if (event.target.closest('[data-toggle="dark-mode"]')) {
    toggleTheme();
  }
});

// Toggle when backslash is pressed
document.addEventListener('keydown', event => {
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    toggleTheme();
  }
});

//
// Primary color picker
//

document.addEventListener('quiet-select', event => {
  if (event.target.id === 'header-color-picker') {
    const color = event.detail.selection.name;
    sessionStorage.setItem('primary-seed', color);
    document.documentElement.style.setProperty('--quiet-primary-seed', color);
    syncColorPicker();
  }
});

// Syncs the color picker's current color
function syncColorPicker() {
  const dropdown = document.getElementById('header-color-picker');
  const color = sessionStorage.getItem('primary-seed') || '#989cff';
  dropdown.querySelectorAll('quiet-dropdown-item').forEach(item => {
    item.classList.toggle('current', item.getAttribute('name') === color);
    if (item.getAttribute('name') === color) {
    }
  });
}

document.addEventListener('turbo:load', syncColorPicker);
syncColorPicker();
