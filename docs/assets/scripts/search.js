// Search data
const res = await Promise.all([import('https://cdn.jsdelivr.net/npm/lunr/+esm'), fetch('/search.json')]);
const lunr = res[0].default;
const searchData = await res[1].json();
const searchIndex = lunr.Index.load(searchData.searchIndex);
const map = searchData.map;

// Elements
const siteSearch = document.querySelector('#site-search');
const dialog = siteSearch.querySelector('.site-search__dialog');
const overlay = document.querySelector('.site-search__overlay');
const input = dialog.querySelector('.site-search__input');
const clearButton = dialog.querySelector('.site-search__clear-button');
const results = dialog.querySelector('.site-search__results');

// Other
const animationDuration = 150;
const searchDebounce = 100;
let isShowing = false;
let searchTimeout;

// Remove it from the DOM. We'll add it back later when we need it. This makes it easier to work with Turbo.
siteSearch.remove();

async function show() {
  isShowing = true;
  document.body.append(siteSearch);
  siteSearch.hidden = false;
  document.body.classList.add('site-search-visible');
  clearButton.hidden = true;
  requestAnimationFrame(() => input.focus());
  updateResults();

  dialog.showModal();

  await Promise.all([
    dialog.animate(
      [
        { opacity: 0, transform: 'scale(.9)', transformOrigin: 'top' },
        { opacity: 1, transform: 'scale(1)', transformOrigin: 'top' }
      ],
      { duration: animationDuration, easing: 'ease' }
    ).finished,
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: animationDuration, easing: 'ease' }).finished
  ]);

  dialog.addEventListener('mousedown', handleMouseDown);
  dialog.addEventListener('keydown', handleKeyDown);
}

async function hide(immediate = false) {
  isShowing = false;

  if (!immediate) {
    await Promise.all([
      dialog.animate(
        [
          { opacity: 1, transform: 'scale(1)', transformOrigin: 'top' },
          { opacity: 0, transform: 'scale(.9)', transformOrigin: 'top' }
        ],
        { duration: animationDuration }
      ).finished,
      overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: animationDuration }).finished
    ]);
  }

  dialog.close();

  input.blur(); // otherwise Safari will scroll to the bottom of the page on close
  input.value = '';
  document.body.classList.remove('site-search-visible');
  siteSearch.hidden = true;
  siteSearch.remove();
  updateResults();

  dialog.removeEventListener('mousedown', handleMouseDown);
  dialog.removeEventListener('keydown', handleKeyDown);
}

function handleInput() {
  clearButton.hidden = input.value === '';

  // Debounce search queries
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => updateResults(input.value), searchDebounce);
}

function handleClear() {
  clearButton.hidden = true;
  input.value = '';
  input.focus();
  updateResults();
}

function handleMouseDown(event) {
  if (!event.target.closest('.site-search__content')) {
    hide();
  }
}

function handleKeyDown(event) {
  // Close when pressing escape
  if (event.key === 'Escape') {
    event.preventDefault(); // prevent <dialog> from closing immediately so it can animate
    event.stopImmediatePropagation();
    hide();
    return;
  }

  // Handle keyboard selections
  if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'].includes(event.key)) {
    event.preventDefault();

    const currentEl = results.querySelector('[data-selected="true"]');
    const items = [...results.querySelectorAll('li')];
    const index = items.indexOf(currentEl);
    let nextEl;

    if (items.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        nextEl = items[Math.max(0, index - 1)];
        break;
      case 'ArrowDown':
        nextEl = items[Math.min(items.length - 1, index + 1)];
        break;
      case 'Home':
        nextEl = items[0];
        break;
      case 'End':
        nextEl = items[items.length - 1];
        break;
      case 'Enter':
        currentEl?.querySelector('a')?.click();
        break;
    }

    // Update the selected item
    items.forEach(item => {
      if (item === nextEl) {
        input.setAttribute('aria-activedescendant', item.id);
        item.setAttribute('data-selected', 'true');
        nextEl.scrollIntoView({ block: 'nearest' });
      } else {
        item.setAttribute('data-selected', 'false');
      }
    });
  }
}

async function updateResults(query = '') {
  try {
    const hasQuery = query.length > 0;
    const searchTokens = query
      .split(' ')
      .map((term, index, arr) => `${term}${index === arr.length - 1 ? `* ${term}~1` : '~1'}`)
      .join(' ');
    const matches = hasQuery ? searchIndex.search(`${query} ${searchTokens}`) : [];
    const hasResults = hasQuery && matches.length > 0;

    dialog.classList.toggle('site-search--has-results', hasQuery && hasResults);
    dialog.classList.toggle('site-search--no-results', hasQuery && !hasResults);

    input.setAttribute('aria-activedescendant', '');
    results.innerHTML = '';

    matches.forEach((match, index) => {
      const page = map[match.ref];
      const li = document.createElement('li');
      const a = document.createElement('a');
      const displayTitle = page.title ?? '';
      const displayDescription = page.description ?? '';
      const displayUrl = page.url.replace(/^\//, '');

      li.classList.add('site-search__result');
      li.setAttribute('role', 'option');
      li.setAttribute('id', `search-result-item-${match.ref}`);
      li.setAttribute('data-selected', index === 0 ? 'true' : 'false');

      a.href = page.url;
      a.innerHTML = `
        <div class="site-search__result-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>

        </div>
        <div class="site-search__result__details">
          <div class="site-search__result-title"></div>
          <div class="site-search__result-description"></div>
          <div class="site-search__result-url"></div>
        </div>
      `;
      a.querySelector('.site-search__result-title').textContent = displayTitle;
      a.querySelector('.site-search__result-description').textContent = displayDescription;
      a.querySelector('.site-search__result-url').textContent = displayUrl;

      li.appendChild(a);
      results.appendChild(li);
    });
  } catch {
    // Ignore query errors as the user types
  }
}

// Show the search dialog when clicking on elements with the `data-search` attribute
document.addEventListener('click', event => {
  const searchButton = event.target.closest('[data-search]');

  if (searchButton) {
    show();
  }
});

// Show the search dialog when slash (or CMD+K) is pressed and focus is not inside a form element
document.addEventListener('keydown', event => {
  if (
    !isShowing &&
    (event.key === '/' || (event.key === 'k' && (event.metaKey || event.ctrlKey))) &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    event.preventDefault();
    show();
  }
});

input.addEventListener('input', handleInput);
clearButton.addEventListener('click', handleClear);

// Close when a result is selected
results.addEventListener('click', event => {
  if (event.target.closest('a')) {
    hide();
  }
});

// Reinitialize when the page reloads with Turbo
window.addEventListener('turbo:load', () => {
  // initialize();
});

// Make sure the dialog is hidden after searching and hitting the back button
window.addEventListener('turbo:render', () => {
  document.body.classList.remove('site-search-visible');
  document.querySelectorAll('.site-search__overlay, .site-search__dialog').forEach(el => el.remove());
  document.querySelector('#site-search')?.remove();
});
