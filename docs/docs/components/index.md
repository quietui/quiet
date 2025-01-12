---
title: Browse Components
layout: docs
---

<quiet-text-field id="component-search" label="Searching {{ components.length }} custom elements" pill autofocus clearable>
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
    summary: component.querySelector('.summary').textContent,
    index
  }));

  // Configure fuzzy search
  const fuse = new Fuse(searchableItems, {
    keys: ['name', 'summary'],
    threshold: 0.3,
    distance: 100,
    minMatchCharLength: 1,
    shouldSort: true,
    includeScore: true,
    useExtendedSearch: true,
    ignoreLocation: true
  });

  function updateSearchResults(query = '') {
    query = query.trim();
    
    // Show all components when the query is empty
    if (!query) {
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

  // Update when the search query changes
  searchBox.addEventListener('quiet-input', (event) => {
    updateSearchResults(event.target.value);
  });

  // Initialize results
  updateSearchResults(searchBox.value);
</script>

<style>
  #component-search {
    margin-block-end: var(--quiet-content-spacing);
  }

  #component-index {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
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
        white-space: normal;
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
      font-size: 1.125rem;
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