/** Sets the theme to light or dark mode */
function setTheme(name, skipTransition = false) {
  const isDark = name === 'dark';
  const toggleThemeClass = () => document.documentElement.classList.toggle('quiet-dark', isDark);

  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  if (skipTransition || !document.startViewTransition) {
    toggleThemeClass();
  } else if (document.startViewTransition) {
    document.startViewTransition(() => toggleThemeClass());
  }
}

/** Gets the current theme */
function getTheme() {
  // Use session preference, if one exists
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
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
  const dropdown = document.getElementById('header-color-picker');
  const items = [...dropdown.querySelectorAll('quiet-dropdown-item')];
  const colorNames = items.map(item => item.textContent.trim());
  const color = newColor || 'violet';
  const updateSeedColor = () => {
    colorNames.forEach(color => document.documentElement.classList.remove(`quiet-${color}`));
    document.documentElement.classList.add(`quiet-${color}`);

    // Update the theme color
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--quiet-primary-seed');
    document.head.querySelector('meta[name="theme-color"]').content = hex;
  };

  localStorage.setItem('primary-color', color);

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

// Update when a new color is selected from the theme picker
document.addEventListener('quiet-select', event => {
  if (event.target.id === 'header-color-picker') {
    setThemeColor(event.detail.selection.value);
  }
});

// Update when a new color is selected from a data-preset attribute
document.addEventListener('click', event => {
  if (event.target.closest('[data-preset]')) {
    setThemeColor(event.target.getAttribute('data-preset'));
  }
});

// Keep the theme in sync when new pages load
document.addEventListener('turbo:load', () => {
  setThemeColor(localStorage.getItem('primary-color'), true);
});

// Initial sync
setThemeColor(localStorage.getItem('primary-color'), true);
