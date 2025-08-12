---
title: Breadcrumb
layout: component
---

Breadcrumbs follow the [ARIA APG breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/) for accessibility. The breadcrumb is labeled for assistive devices and breadcrumb items are announced as links. The breadcrumb corresponding to the current page is styled differently, but remains a functional link. Separators are presentational and will not be announced by screen readers.

```html {.example}
<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/services/">
    Services
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/services/adoption/">
    Adoption
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Available Cats
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

## Examples

### Setting the current item

Add the `current` attribute to the breadcrumb item that represents the current page. An empty `href` can be used on current items instead of the full URL. The breadcrumb will be drawn differently, but the link will still be active for optimal accessibility.

```html {.example}
<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/support/">
    Support
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/support/faq/">
    FAQ
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    What do I feed my cat?
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

### Changing the separator

Use the `separator` slot to change the separator between breadcrumb items. Text and icons work well here.

```html {.example}
<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    Home
    <span slot="separator">/</span>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Products
    <span slot="separator">/</span>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Pets
    <span slot="separator">/</span>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Toys for cats
    <span slot="separator">/</span>
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<br>

<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    Home
    <quiet-icon slot="separator" name="fish-bone"></quiet-icon>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Products
    <quiet-icon slot="separator" name="fish-bone"></quiet-icon>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Pets
    <quiet-icon slot="separator" name="fish-bone"></quiet-icon>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Toys for cats
    <quiet-icon slot="separator" name="fish-bone"></quiet-icon>
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

### Changing the size

Breadcrumbs are sized relative to the current font size. To change their size, apply `font-size` to the breadcrumb or an ancestor element.

```html {.example}
<quiet-breadcrumb style="font-size: .875rem;">
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/">
    Cat food
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/flavors/">
    Flavors
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Tuna
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<br>

<quiet-breadcrumb style="font-size: 1rem;">
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/">
    Cat food
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/flavors/">
    Flavors
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Tuna
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<br>

<quiet-breadcrumb style="font-size: 1.25rem;">
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/">
    Cat food
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/food/flavors/">
    Flavors
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Tuna
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

### Start & end icons

Use the `start` and `end` slots to add icons and other presentational elements to various breadcrumb items.

```html {.example}
<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    <quiet-icon slot="start" name="home"></quiet-icon>
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Products
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Pets
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Toys for cats
    <quiet-icon slot="end" name="cat"></quiet-icon>
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

### Icon-only items

To create icon-only breadcrumb item, slot in an icon and a visually hidden label for assistive devices. If you're using [Quiet Restyle](/docs/restyle), you can use the `quiet-vh` utility class to visually hide the label.

```html {.example}
<quiet-breadcrumb>
  <quiet-breadcrumb-item href="https://example.com/">
    <quiet-icon slot="start" name="home"></quiet-icon>
    <span class="quiet-vh">Home</span>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Products
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Pets
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Toys for cats
  </quiet-breadcrumb-item>
</quiet-breadcrumb>
```

### With collapsed items

You can create a collapsed breadcrumb item by adding a [dropdown](/docs/components/dropdown) with additional options. In this case, omit the `href` attribute so the dropdown won't be wrapped with a link.

```html {.example}
<quiet-breadcrumb id="breadcrumb__collapsed">
  <quiet-breadcrumb-item href="https://example.com/">
    Home
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/pets/">
    Pets
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item>
    <quiet-dropdown style="font-size: 1rem;">
      <quiet-button slot="trigger" appearance="text" icon-label="More pages" size="sm">
        <quiet-icon name="dots"></quiet-icon>
      </quiet-button>
      <quiet-dropdown-item value="https://example.com/pets/birds">Birds</quiet-dropdown-item>
      <quiet-dropdown-item value="https://example.com/pets/cats">Cats</quiet-dropdown-item>
      <quiet-dropdown-item value="https://example.com/pets/dogs">Dogs</quiet-dropdown-item>
      <quiet-dropdown-item value="https://example.com/pets/all">All animals</quiet-dropdown-item>
    </quiet-dropdown>
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Favorites
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<script>
  const breadcrumb = document.getElementById('breadcrumb__collapsed');

  breadcrumb.addEventListener('quiet-select', event => {
    location.href = event.detail.item.value;
  });
</script>
```

### Styling breadcrumbs

Breadcrumbs come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-breadcrumb class="breadcrumb__bar">
  <quiet-breadcrumb-item href="https://example.com/">
    <quiet-icon slot="start" name="music"></quiet-icon>
    Music
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Artist
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Album
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Song
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<style>
  .breadcrumb__bar {
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: var(--quiet-border-radius-pill);
    padding-inline: 1em;
    padding-block: .5em;

    quiet-breadcrumb-item::part(link) {
      color: var(--quiet-text-muted);
    }
     
    quiet-breadcrumb-item[current]::part(link) {
      color: var(--quiet-text-body);
    }

    quiet-breadcrumb-item:not([current])::part(link):hover {
      text-decoration: underline;
      text-underline-offset: 0.125em;
    }
  }
</style>
```

```html {.example}
<quiet-breadcrumb class="breadcrumb__borders">
  <quiet-breadcrumb-item href="https://example.com/">
    <quiet-icon slot="start" name="music"></quiet-icon>
    Music
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/">
    Artist
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item href="https://example.com/products/pets/">
    Album
  </quiet-breadcrumb-item>

  <quiet-breadcrumb-item current href="">
    Song
  </quiet-breadcrumb-item>
</quiet-breadcrumb>

<style>
  .breadcrumb__borders {
    quiet-breadcrumb-item::part(label) {
      padding: .33em .5em;
    }

    quiet-breadcrumb-item:not([current])::part(label) {
      background-color: var(--quiet-paper-color);
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
      border-radius: var(--quiet-border-radius-md);
      box-shadow: var(--quiet-shadow-softer);
    }

    quiet-breadcrumb-item::part(separator) {
      display: none;
    }
  }
</style>
```
