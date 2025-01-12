---
title: Browse Components
layout: page
isWide: true
---

<quiet-text-field id="component-search" label="Searching {{ components.length }} components" pill autofocus clearable>
  <quiet-icon slot="start" name="search"></quiet-icon>
</quiet-text-field>

<div id="component-index">
  {%- for component in components -%}
    <a 
      class="component" 
      href="/docs/components/{{ component.tagName | stripQuietPrefix}}"
    >
      <p class="name">{{ component.tagName | tagNameToDisplayName }}</p>
      <p class="tag-name"><code>&lt;{{ component.tagName }}&gt;</code></p>
      <p class="summary">{{ component.summary }}</p>
      <div class="badges">
        {%- if component.status == 'experimental' %}[experimental]{% endif %}
        {%- if component.status == 'stable' %}[stable]{% endif %}
        <quiet-badge>since {{ component.since }}</quiet-badge>
      </div>
    </a>
  {%- endfor -%}

  <div class="empty" hidden>
    <quiet-icon name="cheese"></quiet-icon>
    No components found
  </div>
</div>

<script type="module">
  import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.min.js';

  const searchBox = document.getElementById('component-search');
  const componentIndex = document.getElementById('component-index');
  const components = Array.from(componentIndex.querySelectorAll('.component'));
  const emptyState = componentIndex.querySelector('.empty');

  // Create searchable items from components
  const searchableItems = components.map((component, index) => ({
    name: component.querySelector('.name').textContent,
    summary: component.querySelector('p').textContent,
    index
  }));

  // Configure Fuse with appropriate options
  const fuseOptions = {
    keys: ['name', 'summary'],
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 2,
    shouldSort: true,
    includeScore: true,
    useExtendedSearch: true,
    ignoreLocation: true
  };

  const fuse = new Fuse(searchableItems, fuseOptions);

  function updateSearchResults(query = '') {
    query = query.trim();
    
    if (!query) {
      // Show all components when no query
      components.forEach(component => component.hidden = false);
      emptyState.hidden = true;
      return;
    }

    // Perform fuzzy search
    const results = fuse.search(query);
    const matchedIndexes = new Set(results.map(result => result.item.index));
    
    // Update visibility of components
    let isEmpty = true;
    components.forEach((component, index) => {
      const isMatch = matchedIndexes.has(index);
      if (isMatch) isEmpty = false;
      component.hidden = !isMatch;
    });

    emptyState.hidden = !isEmpty;
  }

  // Debounce function to limit the rate of search updates
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Add event listener with debouncing
  const debouncedSearch = debounce((event) => {
    updateSearchResults(event.target.value);
  }, 150);

  searchBox.addEventListener('quiet-input', debouncedSearch);

  // Initialize search results
  updateSearchResults(searchBox.value);
</script>

<style>
  #component-search {
    margin-block-end: var(--quiet-content-spacing);
  }

  #component-index {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    align-items: start;
    gap: 1rem;
    width: 100%;
    margin-block-end: var(--quiet-content-spacing);

    .component {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      height: 100%;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-soft);
      font-weight: inherit;
      padding: 1.25rem;
      text-decoration: none;
      color: inherit;
      
      &:focus-visible {
        outline-offset: calc(-1 * var(--quiet-border-width));
      }

      .name {
        font-size: 1.3875rem;
        font-weight: var(--quiet-font-weight-semibold);
        margin-block-end: 0.25rem;
      }

      .tag-name {
        margin-block: 0;
      }

      .summary {
        margin-block: 0.5rem 1rem;
      }

      code {
        color: var(--quiet-text-muted);
        background: transparent;
        font-size: 1.125rem;
        padding: 0;
      }

      .badges {
        display: flex;
        gap: .25rem;
        align-items: center;
        margin-top: auto;
      }
    }

    .empty {
      grid-column: 1 / -1;
      padding: 3rem 2rem;
      color: var(--quiet-text-muted);
      font-size: 0.875rem;
      text-align: center;

      quiet-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        margin-inline: auto;
        margin-block-end: 0.5rem;
      }
    }
  }
</style>