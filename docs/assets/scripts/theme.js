/** Sets the theme to light or dark mode */
function setTheme(name, skipTransition = false) {
  const isDark = name === 'dark';
  const toggleThemeClass = () => document.documentElement.classList.toggle('quiet-dark', isDark);

  sessionStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (skipTransition || !document.startViewTransition) {
    toggleThemeClass();
  } else if (document.startViewTransition) {
    document.startViewTransition(() => toggleThemeClass());
  }
}

/** Gets the current theme */
function getTheme() {
  // Use session preference, if one exists
  if (sessionStorage.getItem('theme')) {
    return sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  // Fall back to system
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Toggles the current theme between light and dark */
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

/** Sets the theme color and updates the UI */
function setThemeColor(newColor, skipTransition = false) {
  const color = newColor || '#989cff';
  const dropdown = document.getElementById('header-color-picker');
  const updateSeedColor = () => document.documentElement.style.setProperty('--quiet-primary-seed', color);

  sessionStorage.setItem('primary-seed', color);

  // Update the theme color
  document.head.querySelector('meta[name="theme-color"]').content = color;

  // Update the color picker dropdown
  dropdown.querySelectorAll('quiet-dropdown-item').forEach(item => {
    item.classList.toggle('current', item.getAttribute('value') === color);
  });

  // Update the seed color
  if (skipTransition || !document.startViewTransition) {
    updateSeedColor();
  } else if (document.startViewTransition) {
    document.startViewTransition(() => updateSeedColor());
  }
}

// Update when a new color is selected
document.addEventListener('quiet-select', event => {
  if (event.target.id === 'header-color-picker') {
    setThemeColor(event.detail.selection.value);
  }
});

// Keep the theme in sync when new pages load
document.addEventListener('turbo:load', () => {
  setThemeColor(sessionStorage.getItem('primary-seed'), true);
});

// Initial sync
setThemeColor(sessionStorage.getItem('primary-seed'), true);
