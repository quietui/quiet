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
  <div class="item">Alexander</div>
  <div class="item">Ava</div>
  <div class="item">Benjamin</div>
  <div class="item">Charlotte</div>
  <div class="item">Daniel</div>
  <div class="item">Emma</div>
  <div class="item">Isabella</div>
  <div class="item">James</div>
  <div class="item">Michael</div>
  <div class="item">Olivia</div>
  <div class="item">Sophia</div>
  <div class="item">William</div>

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
