---
title: Icon Search
description: Search thousands of icons to use in your project, courtesy of Tabler Icons.
layout: docs
---

Use this tool to find the perfect icon and copy it into your project with just a click. Refer to the [icon component](/docs/components/icon) to learn more about using icons in Quiet.

<div id="search-container">
  <quiet-text-field
    type="search"
    label="Search icons"
    clearable
    placeholder="Try arrows, files, media, settings, tools, etc."
    id="icon-search"
    autofocus
  ></quiet-text-field>
  <quiet-select label="Style" id="icon-style">
    <option value="outline">Outline</option>
    <option value="filled">Filled</option>
  </quiet-select>
</div>

<quiet-empty-state id="icon-initial">
  <p>Start typing to search <quiet-number id="icon-total" value="4000"></quiet-number> icons</p>
</quiet-empty-state>

<quiet-empty-state id="icon-empty">
  <p>No matching icons found</p>
</quiet-empty-state>

<div id="icon-results"></div>

:::info
For an alternative way to browse icons, head over to the [Tabler Icons](https://tabler.io/icons) website.
:::

<script type="module">
  import lunr from 'https://cdn.jsdelivr.net/npm/lunr/+esm';

  const searchField = document.getElementById('icon-search');
  const styleSelect = document.getElementById('icon-style');
  const initialState = document.getElementById('icon-initial');
  const emptyState = document.getElementById('icon-empty');
  const total = document.getElementById('icon-total');
  const results = document.getElementById('icon-results');

  // Set initial visibility
  initialState.style.display = 'block';
  emptyState.style.display = 'none';

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Fetch and parse the icons.json file using top-level await
  try {
    const response = await fetch('/dist/icons.json');
    const icons = await response.json();

    total.number = Object.keys(icons).length;

    // Store icons in a format that can be easily retrieved by ID
    const iconsById = {};

    // Build Lunr search index
    const searchIndex = lunr(function() {
      this.field('name', { boost: 20 }); // Boost the icon name by 20 as requested
      this.field('category');
      this.field('tags');

      // Add each icon to the index
      Object.values(icons).forEach((icon, idx) => {
        // Create a unique ID for each icon
        const id = `icon_${idx}`;

        // Store the original icon for retrieval
        iconsById[id] = icon;

        // Prepare the document for indexing
        const doc = {
          id: id,
          name: icon.name,
          category: icon.category || '',
          // Join tags array into a string for better indexing
          tags: (icon.tags && Array.isArray(icon.tags))
            ? icon.tags.filter(tag => typeof tag === 'string').join(' ')
            : ''
        };

        this.add(doc);
      });
    });

    // Search function
    const performSearch = debounce(() => {
      const query = searchField.value.trim();
      const selectedStyle = styleSelect.value;
      let tooltipId = 0;

      // Handle initial state visibility
      if (query === '') {
        initialState.style.display = 'block';
        emptyState.style.display = 'none';
        results.innerHTML = '';
        return;
      } else {
        initialState.style.display = 'none';
      }

      try {
        // Use Lunr to search for matching icons
        let searchResults = [];

        if (query) {
          const fuzzyQuery = query.split(' ').map(term => term.length > 2 ? `${term}~1` : term).join(' ');
          searchResults = searchIndex.search(`${fuzzyQuery}`);
        }

        // Filter results by selected style
        const matches = searchResults
          .map(result => iconsById[result.ref])
          .filter(icon => icon.styles && icon.styles[selectedStyle]);

        // Update UI based on search results
        if (matches.length === 0) {
          emptyState.style.display = 'block';
          results.innerHTML = '';
        } else {
          emptyState.style.display = 'none';

          // Create HTML for matched icons, including the style attribute
          const iconElements = matches.map(icon => {
            return `
              <quiet-copy data="&lt;quiet-icon name=&quot;${icon.name}&quot;${selectedStyle === 'outline' ? '' : ` family=&quot;${selectedStyle}&quot;`}&gt;&lt;/quiet-icon&gt;" id="icon-search-result-${++tooltipId}">
                <button type="button">
                  <quiet-icon name="${icon.name}" family="${selectedStyle}"></quiet-icon><br>
                </button>
              </quiet-copy>
              <quiet-tooltip for="icon-search-result-${tooltipId}">
                ${icon.name}
              </quiet-tooltip>
            `;
          }).join('');

          results.innerHTML = iconElements;
        }
      } catch (lunrError) {
        // Handle Lunr-specific errors (like invalid query syntax)
        console.error('Lunr search error:', lunrError);

        // Fall back to basic filtering for safer search
        const fallbackMatches = Object.values(icons)
          .filter((icon) => {
            // Check if the icon supports the selected style
            if (!icon.styles || !icon.styles[selectedStyle]) {
              return false;
            }

            const queryLower = query.toLowerCase();

            // Check if query matches icon name
            if (icon.name.toLowerCase().includes(queryLower)) return true;

            // Check if query matches icon category
            if (icon.category && icon.category.toLowerCase().includes(queryLower)) return true;

            // Check if query matches any tags
            if (icon.tags && Array.isArray(icon.tags)) {
              return icon.tags.some(tag => {
                if (typeof tag !== 'string') return false;
                return tag.toLowerCase().includes(queryLower);
              });
            }

            return false;
          })
          .filter((icon, index) => {
            // Limit results
            if (query.length < 3 && index > 12) return false;
            return true;
          });

        if (fallbackMatches.length === 0) {
          emptyState.style.display = 'block';
          results.innerHTML = '';
        } else {
          emptyState.style.display = 'none';

          // Create HTML for matched icons using fallback search
          const iconElements = fallbackMatches.map(icon => {
            return `
              <quiet-copy data="&lt;quiet-icon name=&quot;${icon.name}&quot; family=&quot;${selectedStyle}&quot;&gt;&lt;/quiet-icon&gt;">
                <button type="button">
                  <quiet-icon name="${icon.name}" family="${selectedStyle}"></quiet-icon><br>
                </button>
              </quiet-copy>
            `;
          }).join('');

          results.innerHTML = iconElements;
        }
      }
    }, 300); // Debounce for 300ms

    // Attach event listeners
    searchField.addEventListener('input', performSearch);
    styleSelect.addEventListener('input', performSearch);

    // Trigger initial search to show icons based on default style
    performSearch();

  } catch (error) {
    console.error('Error loading icons:', error);
    results.innerHTML = '<p>Error loading icons. Please try again later.</p>';
  }
</script>

<style>
  #search-container {
    display: flex; 
    gap: 1rem;
  }

  #icon-style {
    max-width: 200px;
  }

  #icon-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1.5rem;
    width: 100%;
    padding: 0;
    margin: 1.5rem 0;

    &:empty {
      display: none;
    }

    button {
      all: unset;
      display: block;
      box-sizing: border-box;
      width: 100%;
      cursor: copy;
      text-align: center;
      transition: 100ms translate ease;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 1rem;

      &:active:not(:disabled) {
        translate: 0 var(--quiet-button-active-offset);
      }
    }

    quiet-icon {
      font-size: 2.5rem;
      stroke-width: 1.25px;
    }
  }
  
  @media screen and (max-width: 959px) {
    #search-container {
      flex-direction: column;
    }

     #icon-style {
      max-width: none;
    }

    #icon-results quiet-icon {
      font-size: 2rem;
    }
  } 
</style>
