---
title: Carousel
layout: component
---

```html {.example}
<quiet-carousel label="Example slides" id="carousel__overview">
  <quiet-carousel-item>Slide 1</quiet-carousel-item>
  <quiet-carousel-item>Slide 2</quiet-carousel-item>
  <quiet-carousel-item>Slide 3</quiet-carousel-item>
  <quiet-carousel-item>Slide 4</quiet-carousel-item>
  <quiet-carousel-item>Slide 5</quiet-carousel-item>
</quiet-carousel>

<style>
  #carousel__overview {
    quiet-carousel-item {
      background: var(--quiet-neutral-fill-soft);
      color: var(--quiet-text-muted);
      font-size: 2rem;
      font-weight: 500;
    }
  }
</style>

<script>
  const carousel = document.getElementById('carousel__overview');

  carousel.addEventListener('quiet-item-change', event => console.log(event.detail.index));
</script>
```

## Examples

### Providing content

Slot in `<quiet-carousel>` items with the content you'd like to show in each slide. Images work well, but you can add just about any content, including interactive elements such as links and buttons.

By default, the carousel spans 100% and uses a 16/9 aspect ratio. To accommodate various content, you can adjust this using the `--aspect-ratio` custom property as shown below. For full control over the width and height, you can target the `items` part using CSS.

```html {.example}
<quiet-carousel label="Example slides" id="carousel__providing">
  <quiet-carousel-item>
    <quiet-card>
      <img slot="media" src="https://images.unsplash.com/photo-1737912031624-e17ba0d7f673?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A gray and white cat sleeps on a blanket with evening lights in the background">
      <p>Kittens dream of chasing moonbeams across the sky.</p>
      <quiet-button slot="footer">Learn more</quiet-button>
    </quiet-card>    
  </quiet-carousel-item>

  <quiet-carousel-item>
    <quiet-card>
      <img slot="media" src="https://images.unsplash.com/photo-1707520595303-d6b499aa84af?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten sleeps peacefully on the floor">
      <p>Kittens nap to plot their next playful adventure.</p>
      <quiet-button slot="footer">Learn more</quiet-button>
    </quiet-card>    
  </quiet-carousel-item>

  <quiet-carousel-item>
    <quiet-card>
      <img slot="media" src="https://images.unsplash.com/photo-1626603084013-1bf8c6627707?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="An orange cat sleeps peacefully at the edge of a bed">
      <p>Kittens snooze, dreaming of fluffy clouds to leap.</p>
      <quiet-button slot="footer">Learn more</quiet-button>
    </quiet-card>    
  </quiet-carousel-item>

  <quiet-carousel-item>
    <quiet-card>
      <img slot="media" src="https://images.unsplash.com/photo-1664037170371-045dee5604a3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A sleepy cat looks up in dim, hazy purple lighting"> 
      <p>Kittens yawn, scheming to pounce on twilight stars.</p> 
      <quiet-button slot="footer">Learn more</quiet-button>
    </quiet-card>    
  </quiet-carousel-item> 

  <quiet-carousel-item>
    <quiet-card>
      <img slot="media" src="https://images.unsplash.com/photo-1518143099890-1e8a03745563?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A gray cat curled up but keeping an eye out">  
      <p>Kittens curl up, plotting to unravel yarn mysteries.</p>
      <quiet-button slot="footer">Learn more</quiet-button>
    </quiet-card>    
  </quiet-carousel-item>  
</quiet-carousel>

<style>
  #carousel__providing {
    --aspect-ratio: 3 / 4;
    --item-height: fit-content;
    max-width: 360px;
  }
</style>
```

### Setting the initial item

Use the `active-index` attribute to set the item that should show initially. The index is zero-based, so the first slide has an index of 0, the second slide has an index of 1, etc.

```html {.example}
<quiet-carousel active-index="2" id="carousel__index">
  <quiet-carousel-item>Slide 1</quiet-carousel-item>
  <quiet-carousel-item>Slide 2</quiet-carousel-item>
  <quiet-carousel-item>Slide 3</quiet-carousel-item>
  <quiet-carousel-item>Slide 4</quiet-carousel-item>
  <quiet-carousel-item>Slide 5</quiet-carousel-item>
</quiet-carousel>

<style>
  #carousel__index {
    quiet-carousel-item {
      background: var(--quiet-neutral-fill-soft);
      color: var(--quiet-text-muted);
      font-size: 2rem;
      font-weight: 500;
    }
  }
</style>
```

### Hiding navigation

You can hide the previous/next buttons by adding the `without-nav` attribute. To hide the pagination dots, use the `without-pagination` attribute.

```html {.example}
<div id="carousel__without">
  <quiet-carousel>
    <quiet-carousel-item>Slide 1</quiet-carousel-item>
    <quiet-carousel-item>Slide 2</quiet-carousel-item>
    <quiet-carousel-item>Slide 3</quiet-carousel-item>
    <quiet-carousel-item>Slide 4</quiet-carousel-item>
    <quiet-carousel-item>Slide 5</quiet-carousel-item>
  </quiet-carousel>

  <br>

  <quiet-switch label="Without nav"></quiet-switch><br>
  <quiet-switch label="Without pagination"></quiet-switch>
</div>

<script>
  const container = document.getElementById('carousel__without');
  const carousel = container.querySelector('quiet-carousel');
  const navSwitch = container.querySelectorAll('quiet-switch')[0];
  const paginationSwitch = container.querySelectorAll('quiet-switch')[1];

  navSwitch.addEventListener('input', () => {
    carousel.toggleAttribute('without-nav', navSwitch.checked);
  });

  paginationSwitch.addEventListener('input', () => {
    carousel.toggleAttribute('without-pagination', paginationSwitch.checked);
  });
</script>

<style>
  #carousel__without {
    quiet-carousel {
      /* carousel height + controls to prevent shifting in the demo */
      min-height: calc(23.5rem);
    }

    quiet-carousel-item {
      background: var(--quiet-neutral-fill-soft);
      color: var(--quiet-text-muted);
      font-size: 2rem;
      font-weight: 500;
    }
  }
</style>
```

### Varying widths

You can create carousel items with various widths and max widths by applying the appropriate styles to each item.

```html {.example}
<quiet-carousel label="Cat nap slideshow" id="carousel__varying">
  <quiet-carousel-item>Slide 1</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 350px;">Slide 2</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 200px;">Slide 3</quiet-carousel-item>
  <quiet-carousel-item>Slide 4</quiet-carousel-item>
  <quiet-carousel-item style="max-width: 450px;">Slide 5</quiet-carousel-item>
</quiet-carousel>

<style>
  #carousel__varying {
    quiet-carousel-item {
      background: var(--quiet-neutral-fill-soft);
      color: var(--quiet-text-muted);
      font-size: 2rem;
      font-weight: 500;
    }
  }
</style>
```

### Styling carousels

Carousels come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-carousel id="carousel__styling">
  <quiet-carousel-item>
    <img src="https://images.unsplash.com/photo-1737912031624-e17ba0d7f673?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A gray and white cat sleeps on a blanket with evening lights in the background">
  </quiet-carousel-item>
  <quiet-carousel-item>
    <img src="https://images.unsplash.com/photo-1707520595303-d6b499aa84af?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten sleeps peacefully on the floor">
  </quiet-carousel-item>
  <quiet-carousel-item>
    <img src="https://images.unsplash.com/photo-1626603084013-1bf8c6627707?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="An orange cat sleeps peacefully at the edge of a bed">
  </quiet-carousel-item>
  <quiet-carousel-item>
    <img src="https://images.unsplash.com/photo-1664037170371-045dee5604a3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A sleepy cat looks up in dim, hazy purple lighting">
  </quiet-carousel-item>  
  <quiet-carousel-item>
    <img src="https://images.unsplash.com/photo-1518143099890-1e8a03745563?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A gray cat curled up but keeping an eye out">
  </quiet-carousel-item>  
</quiet-carousel>

<style>
  #carousel__styling {
    --item-height: 25rem;
    --dot-size: .75rem;
    --dot-color: #fff4;
    --dot-active-color: white;

    &::part(items) {
      gap: .5rem;
    }

    /* Previous & next buttons */
    &::part(previous-button),
    &::part(next-button) {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 5rem;
      height: 100%;
      border-radius: var(--quiet-border-radius);
      font-size: 1.5rem;
      background: none;
      color: white;
    }

    &::part(previous-button) {
      left: 0;
    }

    &::part(next-button) {
      right: 0;
    }

    &::part(previous-button):disabled,
    &::part(next-button):disabled {
      display: none;
    }

    /* Pagination container */
    &::part(pagination) {
      position: absolute;
      bottom: 3rem;
      width: 100%;
      justify-content: center;
    }

    &::part(pagination-dot):focus-visible {
      outline-width: 1.5px;
      outline-offset: 2px;
      outline-color: var(--quiet-text-muted);
    }
  }
</style>
```


