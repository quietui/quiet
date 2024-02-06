//
// Dark mode
//
function setTheme(name) {
  const isDark = name === 'dark';
  sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('docs-dark', isDark);
}

function getTheme() {
  // Use session preference, if one exists
  if (sessionStorage.getItem('theme')) {
    return sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  // Fall back to system
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Initial set/restore
setTheme(getTheme());

// Update when the OS preference changes
prefersDark.addEventListener('change', event => {
  setTheme(event.matches ? 'dark' : 'light');
});

// Update when a dark mode toggle is activated
document.addEventListener('click', event => {
  if (event.target.closest('[data-toggle="dark-mode"]')) {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }
});
