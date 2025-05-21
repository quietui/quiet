---
title: Carousel
layout: component
---

```html {.example}
<quiet-carousel with-nav with-dots>
  <quiet-carousel-item>Slide 1</quiet-carousel-item>
  <quiet-carousel-item>Slide 2</quiet-carousel-item>
  <quiet-carousel-item>Slide 3</quiet-carousel-item>
  <quiet-carousel-item>Slide 4</quiet-carousel-item>
  <quiet-carousel-item>Slide 5</quiet-carousel-item>
</quiet-carousel>

<style>
  quiet-carousel-item {
    background: #333;
    color: white;
    font-size: 2rem;
    font-weight: 500;
  }
</style>
```

## Examples

### Setting the initial item

TODO


### Without navigation

TODO

### Without pages / dots

TODO

### Varying widths

TODO

```html {.example}
<quiet-carousel with-nav with-dots>
  <quiet-carousel-item style="max-width: 400px;">Slide 1</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 350px;">Slide 2</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 200px;">Slide 3</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 400px;">Slide 4</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 450px;">Slide 5</quiet-carousel-item>
</quiet-carousel>
```