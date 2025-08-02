---
title: Icon Search
description: Search thousands of icons to use in your project, courtesy of Tabler Icons.
layout: docs
---

Use this tool to find the perfect icon and copy it into your project with just a click. Refer to the [icon component](/docs/components/icon) to learn more about using icons in Quiet.

:::info
For another way to browse icons, head over to the [Tabler Icons](https://tabler.io/icons) website. When you select an icon, clicking its name in the resulting dialog will copy the value you need for `<quiet-icon name="...">`.
:::

<div id="search-container">
  <quiet-text-field
    type="search"
    label="Search icons"
    with-clear
    placeholder="e.g. arrows, files, media, settings, tools, etc."
    id="icon-search"
    autofocus
  ></quiet-text-field>

  <quiet-select label="Copy" value="html" id="icon-copy">
    <option value="html">Icon HTML</option>
    <option value="name">Icon name</option>
  </quiet-select>

  <quiet-select label="Icon family" id="icon-family">
    <option value="outline">Outline</option>
    <option value="filled">Filled</option>
  </quiet-select>
</div>

<quiet-empty-state id="icon-initial">
  <p>Start typing to search <quiet-number id="icon-total" number="4000"></quiet-number> icons</p>
</quiet-empty-state>

<quiet-empty-state id="icon-empty" hidden>
  <img
    slot="illustration"
    src="/assets/images/whiskers/with-palette.svg"
    alt="Whiskers the mouse painting a picture"
    style="width: auto; max-height: 12rem;"
  >
  <p>No icons match your search</p>
</quiet-empty-state>

<div id="icon-results"></div>

<script type="module">
  import lunr from 'https://cdn.jsdelivr.net/npm/lunr@2.3/+esm';

  const searchField = document.getElementById('icon-search');
  const copySelect = document.getElementById('icon-copy');
  const familySelect = document.getElementById('icon-family');
  const initialState = document.getElementById('icon-initial');
  const emptyState = document.getElementById('icon-empty');
  const total = document.getElementById('icon-total');
  const results = document.getElementById('icon-results');

  // Restore saved preferences from localStorage
  function restorePreferences() {
    // Restore style preference
    const savedFamily = localStorage.getItem('iconFamily');
    if (savedFamily) {
      familySelect.value = savedFamily;
    }
    
    // Restore copy mode preference
    const savedCopyMode = localStorage.getItem('iconCopyMode');
    if (savedCopyMode) {
      copySelect.value = savedCopyMode;
    }
  }

  // Save preferences to localStorage
  function saveFamilyPreference() {
    localStorage.setItem('iconFamily', familySelect.value);
  }

  function saveCopyModePreference() {
    localStorage.setItem('iconCopyMode', copySelect.value);
  }

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

    // Update the copy behavior based on selected radio option
    const updateCopyData = (event) => {
      const copyItems = document.querySelectorAll('#icon-results quiet-copy');
      const copyMode = copySelect.value;
      
      copyItems.forEach(item => {
        if (copyMode === 'name') {
          item.data = item.getAttribute('data-name');
        } else {
          item.data = item.getAttribute('data-html');
        }
      });
      
      // Save the preference
      saveCopyModePreference();
    };

    // Search function
    const performSearch = debounce(() => {
      const query = searchField.value.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
      const selectedFamily = familySelect.value;
      let tooltipId = 0;

      // Handle initial state visibility
      if (query === '') {
        initialState.hidden = false;
        emptyState.hidden = true;
        results.innerHTML = '';
        return;
      } else {
        initialState.hidden = true;
      }

      try {
        // Use Lunr to search for matching icons
        let searchResults = [];

        if (query) {
          // First perform exact search
          const exactResults = searchIndex.search(query);
          
          // Then perform fuzzy search
          const fuzzySearch = query.split(' ').map(term => term.length > 2 ? `${term}~1` : term).join(' ');
          const fuzzyResults = searchIndex.search(fuzzySearch);
          
          // Track seen IDs to avoid duplicates
          const seenIds = new Set();
          
          // Add exact matches first
          exactResults.forEach(result => {
            searchResults.push(result);
            seenIds.add(result.ref);
          });
          
          // Then add fuzzy matches (if not already included)
          fuzzyResults.forEach(result => {
            if (!seenIds.has(result.ref)) {
              searchResults.push(result);
              seenIds.add(result.ref);
            }
          });
        }

        // Filter results by selected family
        let matches = searchResults
          .map(result => iconsById[result.ref])
          .filter(icon => icon.styles && icon.styles[selectedFamily]);

        // Update UI based on search results
        if (matches.length === 0) {
          emptyState.hidden = false;
          results.innerHTML = '';
        } else {
          emptyState.hidden = true;
          
          const copyMode = copySelect.value;
          
          // Create HTML for matched icons, including both data attributes
          const iconElements = matches.map(icon => {
            const htmlData = `&lt;quiet-icon name=&quot;${icon.name}&quot;${selectedFamily === 'outline' ? '' : ` family=&quot;${selectedFamily}&quot;`}&gt;&lt;/quiet-icon&gt;`;
            const nameData = icon.name;
            
            // Set the data attribute based on current copy mode
            const dataValue = copyMode === 'name' ? nameData : htmlData;
            
            return `
              <quiet-copy 
                data="${dataValue}" 
                data-html="${htmlData}" 
                data-name="${nameData}" 
                id="icon-search-result-${++tooltipId}">
                <button type="button">
                  <quiet-icon name="${icon.name}" family="${selectedFamily}"></quiet-icon>
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
        // ignore errors as the user types
      }
    }, 300); // Debounce for 300ms

    // Restore preferences before attaching event handlers
    restorePreferences();

    // Attach event listeners
    searchField.addEventListener('input', performSearch);
    
    familySelect.addEventListener('input', () => {
      saveFamilyPreference();
      performSearch();
    });
    
    copySelect.addEventListener('input', updateCopyData);

    // Trigger initial search to show icons based on selected family
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

  #icon-copy,
  #icon-family {
    max-width: 160px;
  }

  #icon-initial {
    margin-block: 2rem;
  }

  #icon-empty {
    margin-block: 1rem;
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
      border-radius: var(--quiet-border-radius-md);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 1rem;

      &:active:not(:disabled) {
        translate: 0 var(--quiet-button-active-offset);
      }
    }

    quiet-icon {
      font-size: 2.5rem;
      color: var(--quiet-neutral-fill-loud);
      stroke-width: 1.25px;
    }
  }
  
  @media screen and (max-width: 1199px) {
    #search-container {
      display: grid;
      grid-template-columns: 1fr 1fr
      width: 100%;
    }

    #icon-search {
      grid-column: 1 / span 2;
    }

    #icon-copy {
      grid-column: 1;
    }

    #icon-family {
      grid-column: 2;

    }


    #icon-copy, 
    #icon-family {
      max-width: none;
    }

    #icon-results quiet-icon {
      font-size: 2rem;
    }
  } 
</style>
