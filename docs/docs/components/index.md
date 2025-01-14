---
title: Browse Components
layout: docs
---

<quiet-text-field id="component-search" label="Searching {{ components.length }} custom elements" pill autofocus clearable>
  <quiet-icon slot="start" name="search"></quiet-icon>
</quiet-text-field>

<!-- Screen reader announcements -->
<div id="search-status" aria-live="polite" class="visually-hidden"></div>

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
  import lunr from 'https://cdn.jsdelivr.net/npm/lunr/+esm';

  const searchBox = document.getElementById('component-search');
  const searchStatus = document.getElementById('search-status');
  const componentIndex = document.getElementById('component-index');
  const components = Array.from(componentIndex.querySelectorAll('.component'));
  const emptyState = componentIndex.querySelector('.empty');
  const documents = components.map((component, index) => {
    const getName = () => {
      const nameEl = component.querySelector('.name');
      return nameEl ? nameEl.textContent || '' : '';
    };

    const getTagName = () => {
      const tagEl = component.querySelector('.tag-name');
      return tagEl ? tagEl.textContent || '' : '';
    };

    const getSummary = () => {
      const summaryEl = component.querySelector('.summary');
      return summaryEl ? summaryEl.textContent || '' : '';
    };

    return {
      id: index.toString(),
      name: getName().toLowerCase(),
      tagName: getTagName().toLowerCase(),
      summary: getSummary().toLowerCase()
    };
  });

  // Build the search index
  const searchIndex = lunr(function() {
    this.ref('id');
    this.field('name');
    this.field('tagName');
    this.field('summary');
    
    documents.forEach(doc => {
      const safeDoc = {
        id: doc.id,
        name: doc.name || '',
        tagName: doc.tagName || '',
        summary: doc.summary || ''
      };
      this.add(safeDoc);
    });
  });

  function updateSearchResults(query = '') {
    query = query.trim().toLowerCase();
    
    // Show all components when the query is empty
    if (!query) {
      components.forEach(component => component.hidden = false);
      emptyState.hidden = true;
      searchStatus.textContent = `Showing all ${components.length} components`;
      return;
    }

    try {
      // Perform a Lunr search
      const searchTerms = query
        .split(' ')
        .map((term, index, arr) => `${term}${index === arr.length - 1 ? `* ${term}~1` : '~1'}`)
        .join(' ');
      const results = searchIndex.search(`${query} ${searchTerms}`);
      const matchedIndexes = new Set(results.map(result => parseInt(result.ref)));
      
      // Update visibility and count matches
      let visibleCount = 0;
      components.forEach((component, index) => {
        const isMatch = matchedIndexes.has(index);
        if (isMatch) visibleCount++;
        component.hidden = !isMatch;
      });

      emptyState.hidden = visibleCount !== 0;
      
      // Announce results
      const status = visibleCount === 0 
        ? 'No components found' 
        : `Found ${visibleCount} matching component${visibleCount === 1 ? '' : 's'}`;
      searchStatus.textContent = status;
    } catch (err) {
      // On error, show all components
      components.forEach(component => component.hidden = false);
      emptyState.hidden = true;
      searchStatus.textContent = `Showing all ${components.length} components`;
    }
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