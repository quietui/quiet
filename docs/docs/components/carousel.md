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

<quiet-carousel active-index="2" with-nav with-dots>
  <quiet-carousel-item>Slide 1</quiet-carousel-item>
  <quiet-carousel-item>Slide 2</quiet-carousel-item>
  <quiet-carousel-item>Slide 3</quiet-carousel-item>
  <quiet-carousel-item>Slide 4</quiet-carousel-item>
  <quiet-carousel-item>Slide 5</quiet-carousel-item>
</quiet-carousel>


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

### Styling carousels

TODO - example with nav buttons and dots overlaying the images

```html {.example}
<quiet-carousel with-nav with-dots id="carousel__styling">
  <quiet-carousel-item style="max-width: 400px;"><img src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1"></quiet-carousel-item>
  <quiet-carousel-item style="max-width: 350px;"><img src="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2"></quiet-carousel-item>
  <quiet-carousel-item style="max-width: 400px;"><img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3"></quiet-carousel-item>
  <quiet-carousel-item style="max-width: 350px;"><img src="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 4"></quiet-carousel-item>  
</quiet-carousel>

<style>
  #carousel__styling {
    &::part(items) {
      gap: 1rem;
    }
  }
</style>
```


