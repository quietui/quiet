---
title: Search List
layout: component
---

```html {.example}
<quiet-search-list type="exact" id="search-list__overview">
  <!-- The search box-->
  <quiet-text-field 
    slot="search-box" 
    label="Search users"
    type="search" 
    clearable
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

TODO
