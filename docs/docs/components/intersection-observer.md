---
title: Intersection Observer
layout: component
---

The component uses an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to monitor when its direct children intersect with a root element. The `quiet-intersect` event is dispatched when elements enter and leave the viewport.

```html {.example}
<div id="intersection__overview">
  <quiet-intersection-observer threshold="1" intersect-class="visible">
    <div class="box"><quiet-icon name="bulb"></quiet-icon></div>
  </quiet-intersection-observer>
</div>

<small>Scroll to see the element intersect at 100% visibility</small>

<style>
  /* Container styles */
  #intersection__overview {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 300px;
    border: 2px solid var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius-md);
    padding: 1rem;
    overflow-y: auto;

    /* Spacers to demonstrate scrolling */
    &::before {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    &::after {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }   

    /* Box styles */
    .box {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      border-radius: var(--quiet-border-radius-md);
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-inline: auto;
      transition: all 50ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

      quiet-icon {
        font-size: 3rem;
        stroke-width: 1px;
      }

      &.visible {
        background-color: var(--quiet-primary-fill-mid);
        color: var(--quiet-primary-text-on-mid);
      }
    }

    + small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }
  }
</style>
```

:::info
Remember that only direct children of the host element are observed. Nested elements will not trigger intersection events.
:::

## Examples

### Observing elements

Only direct children of the intersection observer are observed. The component is styled with [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents), allowing you to easily apply flex and grid layouts to a containing element.

```html
<div style="display: flex; flex-direction: column;">
  <quiet-intersection-observer>
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </quiet-intersection-observer>
</div>
```

The component monitors when elements enter and leave the root element (the viewport by default) and dispatches the `quiet-intersect` event whenever an intersection state changes. The event includes `event.detail.entry`, which is an [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object containing information about the intersection.

You can determine which element triggered the event with `entry.target`. You can determine whether an element is entering or leaving the viewport by checking `entry.isIntersecting`.

```javascript
observer.addEventListener('quiet-intersect', event => {
  const entry = event.detail.entry;
  
  if (entry.isIntersecting) {
    console.log('Element entered viewport:', entry.target);
  } else {
    console.log('Element left viewport:', entry.target);
  }
});
```

### Customizing the root

Intersections can be observed within a specific container by setting the `root` attribute to the ID of the [root element](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root). Use `root-margin` to apply a [`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) to one or all sides of the element.

```html
<div id="scroll-container">
  <quiet-intersection-observer 
    root="scroll-container"
    root-margin="50px 0px"
  >
    ...
  </quiet-intersection-observer>
</div>
```

### Providing multiple thresholds

You can monitor different visibility percentages by specifying multiple [`threshold`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold) values separated by a space.

```html
<quiet-intersection-observer threshold="0 0.25 0.5 0.75 1">
  ...
</quiet-intersection-observer>
```

### Applying classes on intersect

Use the `intersect-class` attribute to automatically apply the specified class to direct children when they intersect. This makes it easy to style them without event listeners.

```html {.example}
<div id="intersection__classes">
  <quiet-intersection-observer 
    threshold="0.5" 
    intersect-class="visible" 
    root="intersection__classes"
  >
    <div class="box fade">Fade In</div>
    <div class="box slide">Slide In</div>
    <div class="box scale">Scale & Rotate</div>
    <div class="box bounce">Bounce</div>
  </quiet-intersection-observer>
</div>

<small>Scroll to see elements transition at 50% visibility</small>

<style>
  /* Container styles */
  #intersection__classes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 300px;
    border: 2px solid var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius-md);
    padding: 1rem;
    overflow-y: auto;

    /* Spacers to demonstrate scrolling */
    &::before {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    &::after {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }    

    + small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }

    /* Shared box styles */
    .box {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      font-weight: bold;
      text-shadow: 0 1px #0008;
      opacity: 0;
      padding: 2rem;
      margin-inline: auto;

      /* Fade */
      &.fade {
        background: linear-gradient(135deg, #5a6fd4 0%, #6a4292 100%);
        transform: translateY(30px);
        transition: all 0.6s ease;

        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Slide */
      &.slide {
        background: linear-gradient(135deg, #d984e2 0%, #dd4e61 100%);
        transform: translateX(-50px);
        transition: all 0.5s ease;

        &.visible {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Scale */
      &.scale {
        background: linear-gradient(135deg, #439be4 0%, #00dae4 100%);
        transform: scale(0.6) rotate(-15deg);
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      /* Bounce In and Out */
      &.bounce {
        background: linear-gradient(135deg, #e1658a 0%, #e5cb39 100%);
        opacity: 0;
        transform: scale(0.8);
        transition: none;

        &.visible {
          opacity: 1;
          transform: scale(1);
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        &:not(.visible) {
          animation: bounceOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      }      
    }
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0.8);
    }
    40% {
      transform: scale(1.08);
    }
    65% {
      transform: scale(0.98);
    }
    80% {
      transform: scale(1.02);
    }
    90% {
      transform: scale(0.99);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounceOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      transform: scale(1.02);
      opacity: 1;
    }
    40% {
      transform: scale(0.98);
      opacity: 0.8;
    }
    60% {
      transform: scale(1.05);
      opacity: 0.6;
    }
    80% {
      transform: scale(0.95);
      opacity: 0.3;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }
</style>
```

Use CSS transitions and animations to create advanced, modern effects without a single line of JavaScript.

```html {.example}
<div id="intersection__images">
  <quiet-intersection-observer 
    threshold="0.8" 
    intersect-class="visible"
    root="intersection__images" 
  >
    <img src="https://images.unsplash.com/photo-1671707696618-ca0685b0012e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="An orange cat smiles up at the camera">
    <img src="https://images.unsplash.com/photo-1736593494119-d0a69181b414?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten lays in its bed and cuddles a pillow">
    <img src="https://images.unsplash.com/photo-1622576041274-ae5dc580175d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Two kittens nestled up on a blanket">
    <img src="https://images.unsplash.com/photo-1719310694054-6fc99b7c14ec?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="An orange kitten explores a tall grassy yard">
    <img src="https://images.unsplash.com/photo-1601217156006-3358e1514676?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten peeks out from inside a cardboard box">    
    <img src="https://images.unsplash.com/photo-1737912031624-e17ba0d7f673?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A gray and white cat sleeps on a blanket with evening lights in the background">
  </quiet-intersection-observer>
</div>

<style>
  /* Container styles */
  #intersection__images {
    display: flex;
    flex-direction: row;
    gap: 0;
    border: 2px solid var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius-md);
    padding: 1rem;
    overflow-y: auto;
    scroll-snap-type: x mandatory;

    /* Image styles */
    img {
      flex-shrink: 0;
      display: block;
      width: 75%;
      object-fit: cover;
      border-radius: var(--quiet-border-radius-md);
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
      box-shadow: var(--quiet-shadow-softer);
      filter: grayscale(100%);
      margin-inline: auto;
      transform: scale(0.85) rotateY(-15deg);
      opacity: 0.6;
      transition: all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      scroll-snap-align: center;

      &.visible {
        background-color: var(--quiet-primary-fill-softer);
        transform: scale(1) rotateY(0deg);
        filter: grayscale(0);
        opacity: 1;
        box-shadow: var(--quiet-shadow-soft);
      }
    }
  }
</style>
```