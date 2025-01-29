---
title: Search List
layout: component
---

Search Lists provide real-time filtering of content as the user types, supporting exact or fuzzy matching, custom keywords, and customizable empty states. The component works with just about any type of content and can be customized with different layouts and styling.

```html {.example}
<quiet-search-list match="fuzzy" id="search-list__overview">
  <!-- Controller -->
  <quiet-text-field 
    slot="controller" 
    label="Search cats"
    description="Results will update as you type"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items -->
  <quiet-card orientation="horizontal">
    <quiet-avatar slot="header" image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Meowy McGee</h4>
      <div class="tagline">Freedom's just another word for nothing left to lose.</div>
    </div>
    <quiet-button slot="footer" icon-label="Settings" appearance="text" pill>
      <quiet-icon name="dots"></quiet-icon>
    </quiet-button>
  </quiet-card>
    
  <quiet-card orientation="horizontal">
    <quiet-avatar slot="header" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Wonder Whiskers</h4>
      <div class="tagline">Living my best nine lives, one nap at a time.</div>
    </div>
    <quiet-button slot="footer" icon-label="Settings" appearance="text" pill>
      <quiet-icon name="dots"></quiet-icon>
    </quiet-button>
  </quiet-card>

  <quiet-card orientation="horizontal">
    <quiet-avatar slot="header" image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Maine Attraction</h4>
      <div class="tagline">Big fluff, bigger personality.</div>
    </div>
    <quiet-button slot="footer" icon-label="Settings" appearance="text" pill>
      <quiet-icon name="dots"></quiet-icon>
    </quiet-button>
  </quiet-card>

  <quiet-card orientation="horizontal">
    <quiet-avatar slot="header" image="https://images.unsplash.com/photo-1735820474275-dd0ff4f28d71?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Sir Pounce-a-lot</h4>
      <div class="tagline">Professional sunbeam chaser and nap enthusiast.</div>
    </div>
    <quiet-button slot="footer" icon-label="Settings" appearance="text" pill>
      <quiet-icon name="dots"></quiet-icon>
    </quiet-button>
  </quiet-card>  

  <!-- Empty state -->
  <quiet-empty-state slot="empty">
    <quiet-icon slot="illustration" name="cat"></quiet-icon>
    <p>No matching results</p>
  </quiet-empty-state>
</quiet-search-list>

<style>
  #search-list__overview {
    quiet-card {
      --spacing: 1rem;

      quiet-avatar {
        --size: 3rem;
      }

      .name,
      .tagline {
        margin: 0;
        line-height: 1.2;
        display: inline;
      }

      .name {
        display: block;
        font-size: 1.125rem;
      }

      .tagline {
        color: var(--quiet-text-muted);
        font-size: 0.875rem;
      }
    }

    div[slot="empty"] {
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 1rem;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }
    }
  }
</style>
```

## Examples

### Providing a controller and items

Every search list must have a search box, or _controller_, that maintains the query. Controllers can be [`<quiet-text-field>`](/docs/components/text-field) or native `<input>` elements. To link a controller, place it in the search list's `controller` slot or [assign an external one](#using-an-external-controller). Make sure to add a label and description to ensure it's accessible.

Searchable items can be just about any element, but they _must_ be direct descendants of the `<quiet-search-list>` element. By default, an item's [text content](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) will be used to determine a match, but you can also [specify keywords](#adding-keywords). A case-insensitive search is performed by default, but basic [fuzzy matching](#fuzzy-matching) and [custom matching](#using-a-custom-match-function) are also available.

As the user types in the controller, the search list will update and show the matching results. When no query is entered, all items are shown. An optional [empty state](#providing-an-empty-state) can be provided to show a custom message when a query is entered and no matches are found.

A minimal implementation looks something like this. Note the use of `label` and `description`, which are important for accessibility.

```html
<quiet-search-list>
  <!-- Controller -->
  <quiet-text-field 
    slot="controller"
    label="Search" 
    description="Results will update as you type"
  ></quiet-text-field>

  <!-- Items -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</quiet-search-list>
```

Here's an example using a native `<input>` element.

```html
<quiet-search-list>
  <!-- Controller -->
  <label slot="controller" for="search">Search</label>
  <input slot="controller" id="search" aria-description="Results will update as you type">

  <!-- Items -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</quiet-search-list>
```

Items aren't given any styles by the component — that part is up to you! The item's container, however, is styled as a flex column container by default. To change the layout, apply the desired CSS using the `::part(items)` selector. Both flex and grid layouts work really well here.

Here is the example from above, modified with example styles.

```html {.example}
<quiet-search-list id="search-list__search">
  <quiet-text-field 
    slot="controller"
    label="Search" 
    description="Results will update as you type"
  ></quiet-text-field>

  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</quiet-search-list>

<style>
  #search-list__search {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
    }

    > div {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      text-align: center;
      padding: 1rem;
    }
  }
</style>
```

:::info
Search lists are designed to listen for user input dispatched by their controllers. As such, canceling the controller's `input` event or programmatically modifying its value will cause the search list to get out of sync. In that case, you can use the `setQuery()` method to programmatically update the search list.
:::

### Fuzzy matching

By default, the search list shows results based on case-insensitive, exact matches. For a more permissive search, add `match="fuzzy"` which is more forgiving to typos.

```html {.example}
<quiet-search-list match="fuzzy" id="search-list__fuzzy">
  <!-- Controller -->
  <quiet-text-field 
    slot="controller" 
    label="Search for names"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items -->
  <div class="item">Luna</div>
  <div class="item">Oliver</div>
  <div class="item">Bella</div>
  <div class="item">Whiskers</div>
  <div class="item">Maple</div>
  <div class="item">Sushi</div>
  <div class="item">Pepper</div>
  <div class="item">Mittens</div>
  <div class="item">Shadow</div>
  <div class="item">Oreo</div>
  <div class="item">Mochi</div>
  <div class="item">Nova</div>
  <div class="item">Tiger</div>
  <div class="item">Ziggy</div> 
</quiet-search-list>

<style>
  #search-list__fuzzy {
    /* Style the items in a flex row */
    &::part(items) {
      flex-direction: row;
      gap: 0.5rem;
    }

    /* Custom item styles */
    .item {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: 9999px;
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 0.5rem 1rem; 
    }
  }
</style>
```

:::info
For even more control over the matching algorithm, you can specific a [custom match function](#using-a-custom-match-function).
:::

### Adding keywords

Add the `data-keywords` attribute to any item to include additional keywords the search list should match by. This is useful for adding terms you'd like the item to match on even when the term doesn't appear in regular content.

```html {.example}
<quiet-search-list id="search-list__keywords">
  <!-- Controller -->
  <quiet-text-field 
    slot="controller" 
    label="Search by color"
    description="e.g. brown, orange, white, gray, black"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items -->
  <img 
    data-keywords="orange" 
    src="https://images.unsplash.com/photo-1628612380382-e6204e135307?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="An orange kitten meows while perched on a stone wall"
  >
  <img 
    data-keywords="white gray brown" 
    src="https://images.unsplash.com/photo-1595252849939-1ec8070a354a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A multicolored cat walking through the grass stops to look at the camera"
  >
  <img 
    data-keywords="white gray" 
    src="https://images.unsplash.com/photo-1583399704033-3db671c65f5c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A white fluffy kitten lays comfortably on the arm of a chair"
  >
  <img 
    data-keywords="gray black" 
    src="https://images.unsplash.com/photo-1625060241508-22488e1e9264?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A gray tabby lays in a bed and looks out past the camera"
  >
  <img 
    data-keywords="white black" 
    src="https://images.unsplash.com/photo-1692901573513-41cda579d689?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A black and white kitten lays on its bed and looks at the camera"
  >
  <img 
    data-keywords="gray black" 
    src="https://images.unsplash.com/photo-1622273414093-27fd902ac078?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A young gray tabby lays on the steps and yawns"
  >
  <img 
    data-keywords="white black brown" 
    src="https://images.unsplash.com/photo-1601217155197-0419cd3fd698?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A multi-colored kitten poses for a picture"
  >
  <img 
    data-keywords="gray brown" 
    src="https://images.unsplash.com/photo-1622273509381-59a1e99afefd?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A young tabby rests its eyes while playfully putting its paw up"
  >
  <img 
    data-keywords="brown" 
    src="https://images.unsplash.com/photo-1644625986841-fdedeb19d37c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    alt="A brown cat looks up at the camera"
  >
</quiet-search-list>

<style>
  #search-list__keywords {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(145px, 100%), 1fr));
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }
</style>
```

### Providing an empty state

An optional empty state will be shown when no results are found. Use the `empty` slot to add text, icons, or illustrations to it. Empty state content is not styled by the component, so feel free to bring your own look to it.

```html {.example}
<quiet-search-list id="search-list__empty">
  <!-- Controller -->
  <quiet-text-field 
    slot="controller" 
    label="Search"
    type="search" 
    value="foo"
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items -->
  <div class="item">Luna</div>
  <div class="item">Oliver</div>
  <div class="item">Bella</div>
  <div class="item">Whiskers</div>
  <div class="item">Maple</div>
  <div class="item">Sushi</div>
  <div class="item">Pepper</div>
  <div class="item">Mittens</div>
  <div class="item">Shadow</div>
  <div class="item">Oreo</div>
  <div class="item">Mochi</div>
  <div class="item">Nova</div>
  <div class="item">Tiger</div>
  <div class="item">Ziggy</div>

  <!-- The empty state -->
  <quiet-empty-state slot="empty">
    <quiet-icon slot="illustration" name="cat"></quiet-icon>
    No matching results
  </quiet-empty-state>
</quiet-search-list>

<style>
  #search-list__empty {
    &::part(items) {
      flex-direction: row;
      gap: 0.5rem;
    }

    .item {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 0.5rem 1rem; 
    }

    /* Empty state styles */
    div[slot="empty"] {
      width: 100%;
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 1rem;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }
    }    
  }
</style>
```

### Using a custom match function

For more control over the matching algorithm, set the `match` attribute to `custom` and provide a callback using the `isMatch` property. The function runs on each item whenever the search query changes.

The callback receives three arguments: `query` (the current search term), `content` (the element's searchable content, including its `textContent` and `data-keywords`), and `el` (a reference to the element being searched).

```html {.example}
<quiet-search-list match="custom" id="search-list__custom">
  <!-- Controller -->
  <quiet-text-field 
    slot="controller" 
    label="Search cats"
    description="Add @indoor or @outdoor to filter by environment"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items -->
  <div class="item" data-environment="indoor">
    <h4>Luna</h4>
    <p>Sweet and friendly, loves window watching</p>
  </div>

  <div class="item" data-environment="outdoor">
    <h4>Oliver</h4>
    <p>Adventurous explorer, loves the garden</p>
  </div>

  <div class="item" data-environment="indoor">
    <h4>Milo</h4>
    <p>Gentle soul who loves napping in sunbeams</p>
  </div>

  <div class="item" data-environment="outdoor">
    <h4>Bella</h4>
    <p>Free spirit, enjoys climbing trees</p>
  </div>

  <div class="item" data-environment="indoor">
    <h4>Charlie</h4>
    <p>Playful cat who chases laser pointers</p>
  </div>

  <div class="item" data-environment="outdoor">
    <h4>Lucy</h4>
    <p>Independent nature lover, great hunter</p>
  </div>

  <!-- Empty state -->
  <quiet-empty-state slot="empty">
    <quiet-icon slot="illustration" name="cat"></quiet-icon>
    <h4>No cats match your search</h4>
    <p><small>Try searching by name or using the @indoor or @outdoor tags</small></p>
  </quiet-empty-state>
</quiet-search-list>

<script>
  const searchList = document.getElementById('search-list__custom');

  // A very contrived custom match function
  searchList.isMatch = (query, content, el) => {
    query = query.toLowerCase().trim();

    // If no query, show all items
    if (!query) return true;

    const environment = el.getAttribute('data-environment');
    const envMatch = query.match(/@(indoor|outdoor)/);

    // Look for @indoor or @outdoor in the query
    if (envMatch) {
      // Remove the environment tag from the query for text search
      const searchEnvironment = envMatch[1];
      const textQuery = query.replace(/@(indoor|outdoor)/, '').trim();

      // Must match both environment and text (if any text remains)
      return environment === searchEnvironment && (!textQuery || content.toLowerCase().includes(textQuery));
    }

    // If no environment tag was found, fall back to text search
    return content.toLowerCase().includes(query);
  };
</script>

<style>
  #search-list__custom {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
      gap: 1rem;
    }

    .item {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 1rem;

      h4 {
        margin: 0;
        font-size: 1.125rem;
      }

      p {
        color: var(--quiet-text-muted);
        margin: 0.5rem 0;
        font-size: 0.875rem;
        margin-block-end: 0;
      }
    }

    div[slot="empty"] {
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 1rem;
      
      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }

      small {
        display: block;
        margin-top: 0.5rem;
      }
    }
  }
</style>
```

### Using an external controller

In some cases, the controller might need to exist outside of the component. In this case, give the controller an ID and set the search list's `controller` attribute to match.

```html {.example}
<quiet-text-field 
  id="external-controller"
  label="Search" 
  description="Results will update as you type"
></quiet-text-field>

<quiet-search-list controller="external-controller" id="search-list__external">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</quiet-search-list>

<style>
  #search-list__external {
    margin-block-start: 1rem;

    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
    }

    > div {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      text-align: center;
      padding: 1rem;
    }
  }
</style>
```

:::info
When using an external controller, make sure the position of it makes sense in reference to the search list. It should usually come immediately before the search list to ensure all users can interact with it properly.
:::