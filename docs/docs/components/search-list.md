---
title: Search List
layout: component
---

```html {.example}
<quiet-search-list match="exact" id="search-list__overview">
  <!-- The search box-->
  <quiet-text-field 
    slot="search-box" 
    label="Search animals"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
  <div class="item">Antelope</div>
  <div class="item">Bear</div>
  <div class="item">Cheetah</div>
  <div class="item">Dolphin</div>
  <div class="item">Eagle</div>
  <div class="item">Fox</div>
  <div class="item">Giraffe</div>
  <div class="item">Hippo</div>
  <div class="item">Lion</div>
  <div class="item">Octopus</div>
  <div class="item">Penguin</div>
  <div class="item">Wolf</div>

  <!-- Optional empty state -->
  <div slot="empty">
    <quiet-icon name="file-search"></quiet-icon><br>
    No results
  </div>
</quiet-search-list>

<style>
 #search-list__overview {
  &::part(items) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  }

  .item {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: var(--quiet-border-radius);
    padding: 1rem;
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

### Providing a search box

TODO

### Adding keywords

Add `data-keywords="..."` to any child element to include additional keywords the search list should match by. This is useful for adding hidden terms you'd like the item to match on even when the term doesn't appear in regular content.

```html {.example}
<quiet-search-list match="exact" id="search-list__keywords">
  <!-- The search box-->
  <quiet-text-field 
    slot="search-box" 
    label="Search by habitat, size, or status"
    type="search" 
    clearable
    pill
  >
    <quiet-icon slot="start" name="cat"></quiet-icon>
  </quiet-text-field>

  <!-- Items to search -->
  <div class="item" data-keywords="jungle large threatened">Black Panther</div>
  <div class="item" data-keywords="forest small least-concern">Bobcat</div>
  <div class="item" data-keywords="savanna medium vulnerable">Cheetah</div>
  <div class="item" data-keywords="forest medium vulnerable">Clouded Leopard</div>
  <div class="item" data-keywords="mountain large least-concern">Cougar</div>
  <div class="item" data-keywords="forest medium least-concern">Eurasian Lynx</div>
  <div class="item" data-keywords="forest small vulnerable">Fishing Cat</div>
  <div class="item" data-keywords="jungle large endangered">Jaguar</div>
  <div class="item" data-keywords="savanna large vulnerable">Leopard</div>
  <div class="item" data-keywords="savanna large vulnerable">Lion</div>
  <div class="item" data-keywords="mountain medium endangered">Snow Leopard</div>
  <div class="item" data-keywords="jungle large endangered">Tiger</div>

  <!-- Optional empty state -->
  <div slot="empty">
    <quiet-icon name="file-search"></quiet-icon><br>
    No results
  </div>
</quiet-search-list>

<style>
 #search-list__keywords {
  &::part(items) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  }

  .item {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: var(--quiet-border-radius);
    padding: 1rem;
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

### Fuzzy search

TODO

### Custom search

TODO

### Styling items

TODO
