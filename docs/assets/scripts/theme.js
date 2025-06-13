/** Sets the theme to light or dark mode */
function setColorScheme(name, skipTransition = false) {
  const isDark = name === 'dark';
  const toggleColorSchemeClass = () => document.documentElement.classList.toggle('quiet-dark', isDark);

  localStorage.setItem('color-scheme', isDark ? 'dark' : 'light');

  if (skipTransition || !document.startViewTransition) {
    toggleColorSchemeClass();
  } else if (document.startViewTransition) {
    document.startViewTransition(() => toggleColorSchemeClass());
  }
}

/** Gets the current color scheme */
function getColorScheme() {
  // Use session preference, if one exists
  if (localStorage.getItem('color-scheme')) {
    return localStorage.getItem('color-scheme') === 'dark' ? 'dark' : 'light';
  }

  // Fall back to system
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Toggles the current color scheme between light and dark */
function toggleColorScheme() {
  setColorScheme(getColorScheme() === 'dark' ? 'light' : 'dark');
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initial set/restore
setColorScheme(getColorScheme(), true);

// Update when the OS preference changes
prefersDark.addEventListener('change', event => {
  setColorScheme(event.matches ? 'dark' : 'light');
});

// Update when a dark mode toggle is activated
document.addEventListener('click', event => {
  if (event.target.closest('[data-toggle="dark-mode"]')) {
    toggleColorScheme();
  }
});

// Toggle when backslash is pressed
document.addEventListener('keydown', event => {
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => ['input', 'textarea', 'select'].includes(el?.tagName?.toLowerCase()))
  ) {
    toggleColorScheme();
  }
});

/** Sets the theme color and updates the UI */
function setColorSchemeColor(newColor, skipTransition = false) {
  const dropdown = document.getElementById('header-color-picker');
  const items = [...dropdown.querySelectorAll('quiet-dropdown-item')];
  const colorNames = items.map(item => item.textContent.trim());
  const color = newColor || 'default';
  const updateSeedColor = () => {
    colorNames.forEach(color => document.documentElement.classList.remove(`quiet-${color}`));

    if (color !== 'default') {
      document.documentElement.classList.add(`quiet-${color}`);
    }

    // Update the theme color
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--quiet-primary-seed');
    document.head.querySelector('meta[name="theme-color"]').content = hex;
  };

  localStorage.setItem('theme-color', color);

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
    setColorSchemeColor(event.detail.item.value);
  }
});

// Update when a new color is selected from a data-preset attribute
document.addEventListener('click', event => {
  if (event.target.closest('[data-preset]')) {
    setColorSchemeColor(event.target.getAttribute('data-preset'));
  }
});

// Keep the theme in sync when new pages load
document.addEventListener('turbo:load', () => {
  setColorSchemeColor(localStorage.getItem('theme-color'), true);
});

// Initial sync
setColorSchemeColor(localStorage.getItem('theme-color'), true);
