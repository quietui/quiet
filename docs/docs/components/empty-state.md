---
title: Empty State
layout: component
---

```html {.example}
<quiet-empty-state style="min-height: 400px;">
  <img slot="illustration" src="/assets/images/undraw-happy-music.svg" alt="A round cartoon bird happily singing along to music">
  <h4>My Podcasts</h4>
  <p>You haven't added any podcasts yet. Once you do, you'll be able to listen to them here.</p>
  <quiet-button variant="primary" pill>Add podcasts</quiet-button>
  <quiet-button pill>Learn more</quiet-button>
</quiet-empty-state>
```

## Examples

### Providing content

Use the default slot to add content to the empty state. Headings and paragraphs work particularly well. Buttons can be added at the end, as needed.

You can adjust the size of the empty state using `width`, `height`, and similar CSS properties. Content will automatically be centered horizontally and vertically within the component.

```html {.example}
<quiet-empty-state style="min-height: 400px;">
  <h4>No projects</h4>
  <p>Create your first project to get started</p>
  <quiet-button variant="primary">
    <quiet-icon slot="start" name="plus"></quiet-icon>
    Create project
  </quiet-button>
</quiet-empty-state>
```

### Adding illustrations

To show an illustration, slot an image or an [icon](/docs/components/icon) into the `illustration` slot.

```html {.example}
<quiet-empty-state style="min-height: 400px;">
  <img slot="illustration" src="/assets/images/undraw-cat.svg" alt="A cartoon cat sitting and staring at the camera"></quiet-icon>
  <h4>No food found</h4>
  <p>The cats are not thrilled. Please add good food soon.</p>
</quiet-empty-state>
```

### Styling empty states

Empty states come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-empty-state id="empty-state__styling">
  <quiet-icon slot="illustration" name="shopping-cart"></quiet-icon>
  <h4>Your cart is empty</h4>
  <p>Looks like it's time to buy cat food again</p>
  <quiet-button pill>Feed the cats</quiet-button>
</quiet-empty-state>

<style>
  #empty-state__styling {
    min-height: 400px;
    border-radius: 2rem;
    color: white;
    background-color: hsla(203.53846153846155, 82%, 30%, 1);
    background-image: 
      radial-gradient(circle at 102% 80%, hsla(267.62589928057554, 67%, 59%, 1) 0%, transparent 40.308866813608354%), 
      radial-gradient(circle at 39% 44%, hsla(203.2710280373832, 89%, 46%, 1) 0%, transparent 42.69144621670061%);
    background-blend-mode: normal, normal;

    h4 {
      color: inherit;
    }

    quiet-icon {
      font-size: 8rem;
      stroke-width: .75px;
      color: inherit;
    }
  }
</style>
```
