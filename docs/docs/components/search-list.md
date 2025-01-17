---
title: Search List
layout: component
---

The search list requires a search box and a collection of items. Each item must be an HTML element and a direct descendant of the search list. An optional `empty` slot can be used to show an empty state when no results are found.

```html {.example}
<quiet-search-list match="fuzzy" id="search-list__overview">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search cats"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
  <quiet-card>
    <quiet-avatar image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Meowy McGee</h4>
      <div class="tagline">Freedom's just another word for nothing left to lose.</div>
    </div>
    <div class="buttons">
      <quiet-button data-flip-card="toggle" icon-label="Settings" appearance="text" pill>
        <quiet-icon name="dots"></quiet-icon>
      </quiet-button>
    </div>
  </quiet-card>
    
  <quiet-card>
    <quiet-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Wonder Whiskers</h4>
      <div class="tagline">Living my best nine lives, one nap at a time.</div>
    </div>
    <div class="buttons">
      <quiet-button data-flip-card="toggle" icon-label="Settings" appearance="text" pill>
        <quiet-icon name="dots"></quiet-icon>
      </quiet-button>
    </div>
  </quiet-card>

  <quiet-card>
    <quiet-avatar image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Maine Attraction</h4>
      <div class="tagline">Big fluff, bigger personality.</div>
    </div>
    <div class="buttons">
      <quiet-button data-flip-card="toggle" icon-label="Settings" appearance="text" pill>
        <quiet-icon name="dots"></quiet-icon>
      </quiet-button>
    </div>
  </quiet-card>

  <quiet-card>
    <quiet-avatar image="https://images.unsplash.com/photo-1735820474275-dd0ff4f28d71?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <div>
      <h4 class="name">Sir Pounce-a-lot</h4>
      <div class="tagline">Professional sunbeam chaser and nap enthusiast.</div>
    </div>
    <div class="buttons">
      <quiet-button data-flip-card="toggle" icon-label="Settings" appearance="text" pill>
        <quiet-icon name="dots"></quiet-icon>
      </quiet-button>
    </div>
  </quiet-card>  

  <!-- Empty state -->
  <div slot="empty">
    <quiet-icon name="cat"></quiet-icon><br>
    No results
  </div>
</quiet-search-list>

<style>
  #search-list__overview {
    quiet-card {
      &::part(body) {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        min-height: 0;
      }

      quiet-avatar {
        --size: 2.5rem;
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
        margin-right: 0.5rem;
      }

      .tagline {
        color: var(--quiet-text-muted);
        font-size: 0.875rem;
      }

      .buttons {
        margin: 0;
      }
    }

    div[slot="empty"] {
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 2rem;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }
    }
  }
</style>
```

## Examples

### Providing a search box and items

You must provide a search box using the `search-box` slot. Both [`<quiet-text-field>`](/docs/docs/components/text-field) and native `<input>` elements work well here. Make sure to add a label to ensure proper accessibility. You do not need to wire up any events for it, as the component handles it automatically.

Items can be just about any element, but each one _must_ be a direct descendant of the `<quiet-search-list>` element. By default, each item's text content will be used to determine a match, but you can also [specify keywords](#adding-keywords). A case-insensitive search is performed by default, but basic [fuzzy matching](#fuzzy-matching) is also available.

Items aren't given any styles by default, but they'll appear in a flex column container. To change the layout, target the internal container using the `items` part in your CSS. Flex and grid layouts work really well here.

```html {.example}
<quiet-search-list id="search-list__search">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search breeds"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
  <a class="item" href="https://en.wikipedia.org/wiki/Siamese_cat" target="_blank">
    <h4>Siamese</h4>
    <p>Known for their striking blue eyes and color-point coats. Vocal and highly intelligent.</p>  
  </a>
  <a class="item" href="https://en.wikipedia.org/wiki/Maine_Coon" target="_blank">
    <h4>Maine Coon</h4>
    <p>One of the largest domestic breeds. Known for their luxurious coat and gentle personality.</p>  
  </a>
  <a class="item" href="https://en.wikipedia.org/wiki/Persian_cat" target="_blank">
    <h4>Persian</h4>
    <p>Recognizable by their long fur and flat faces. Calm and sweet-natured.</p>  
  </a>
  <a class="item" href="https://en.wikipedia.org/wiki/Bengal_cat" target="_blank">
    <h4>Bengal</h4>
    <p>Wild-looking spotted cats with high energy and playful personalities.</p>  
  </a>
  <a class="item" href="https://en.wikipedia.org/wiki/Ragdoll" target="_blank">
    <h4>Ragdoll</h4>
    <p>Large, laid-back cats known for going limp when held. Excellent family companions.</p>  
  </a>
  <a class="item" href="https://en.wikipedia.org/wiki/Scottish_Fold" target="_blank">
    <h4>Scottish Fold</h4>
    <p>Distinguished by their folded ears and round faces. Affectionate and adaptable.</p>  
  </a>
</quiet-search-list>

<style>
  #search-list__search {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
    }

    .item {
      align-items: center;
      justify-content: center;
      background-color: var(--quiet-neutral-fill-softer);
      border-radius: var(--quiet-border-radius);
      text-decoration: none;
      color: inherit;
      padding: 1rem;

      h4 {
        font-size: 1.125rem;
      }

      p {
        margin-block-end: 0;
      }
    }

    div[slot="empty"] {
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 2rem;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }
    }
  }
</style>
```

### Fuzzy matching

By default, the search list shows results based on case-insensitive, exact matches. For a more permissive search, add `match="fuzzy"` which is more forgiving to typos.

```html {.example}
<quiet-search-list match="fuzzy" id="search-list__fuzzy">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search for names"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
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

Add the `data-keywords` attribute to any child element to include additional keywords the search list should match by. This is useful for adding terms you'd like the item to match on even when the term doesn't appear in regular content.

```html {.example}
<quiet-search-list id="search-list__keywords">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search by color"
    description="e.g. brown, orange, white, gray, black"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
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
      grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
    }
  }
</style>
```

### Providing an empty state

An optional empty state will be shown when no results are found. Use the `empty` slot to add text, icons, or illustrations to it. Empty state content is not styled by the component, so feel free to bring your own look to it.

```html {.example}
<quiet-search-list id="search-list__empty">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search"
    type="search" 
    value="foo"
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
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
  <div slot="empty">
    <quiet-icon name="cat"></quiet-icon><br>
    No cats found
  </div>
</quiet-search-list>

<style>
  #search-list__empty {
    &::part(items) {
      flex-direction: row;
      gap: 0.5rem;
    }

    /* Empty state styles */
    div[slot="empty"] {
      text-align: center;
      color: var(--quiet-text-muted);
      margin-block-start: 2rem;

      quiet-icon {
        font-size: 2.5rem;
        stroke-width: 1px;
      }
    }

    .item {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      padding: 0.5rem 1rem; 
    }
  }
</style>
```

### Using a custom match function

For more control over the matching algorithm, set the `match` attribute to `custom` and provide a callback using the `isMatch` property. The function runs on each item whenever the search query changes.

The callback receives three arguments: `query` (the current search term), `content` (the element's searchable content, including its `textContent` and `data-keywords`), and `el` (a reference to the element being searched).

```html {.example}
<quiet-search-list match="custom" id="search-list__custom">
  <!-- The search box -->
  <quiet-text-field 
    slot="search-box" 
    label="Search cats"
    description="Add @indoor or @outdoor to filter by environment"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
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
  <div slot="empty">
    <quiet-icon name="cat"></quiet-icon><br>
    No cats match your search<br>
    <small>Try searching by name or using the @indoor or @outdoor tags</small>
  </div>
</quiet-search-list>

<script>
  const searchList = document.getElementById('search-list__custom');

  // Custom match function
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
      padding: 1rem;
      background: var(--quiet-paper-color);

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
      margin-block-start: 2rem;

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