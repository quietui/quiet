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
// Sets the theme color and updates the UI
//
function setThemeColor(newColor) {
  const color = newColor || '#989cff';
  const dropdown = document.getElementById('header-color-picker');

  // Remember it
  sessionStorage.setItem('primary-seed', color);

  // Update the seed color
  document.documentElement.style.setProperty('--quiet-primary-seed', color);

  // Update the theme color
  document.head.querySelector('meta[name="theme-color"]').content = color;

  // Update the color picker dropdown
  dropdown.querySelectorAll('quiet-dropdown-item').forEach(item => {
    item.classList.toggle('current', item.getAttribute('name') === color);
    if (item.getAttribute('name') === color) {
    }
  });
}

// Update when a new color is selected
document.addEventListener('quiet-select', event => {
  if (event.target.id === 'header-color-picker') {
    setThemeColor(event.detail.selection.value);
  }
});

// Keep the theme in sync when new pages load
document.addEventListener('turbo:load', () => {
  setThemeColor(sessionStorage.getItem('primary-seed'));
});

// Initial sync
setThemeColor(sessionStorage.getItem('primary-seed'));
