---
title: Intersection Observer
layout: component
---

The component uses an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to monitor when its direct children intersect with a root element. Events are dispatched when elements enter or leave the viewport.

```html {.example}
<div id="intersection__overview">
  <quiet-intersection-observer threshold="0.5" intersection-class="visible">
    <div class="box">
      <div class="status">Not intersecting</div>
    </div>
    <div class="box">
      <div class="status">Not intersecting</div>
    </div>
    <div class="box">
      <div class="status">Not intersecting</div>
    </div>
    <div class="box">
      <div class="status">Not intersecting</div>
    </div>
  </quiet-intersection-observer>

  <small>Scroll to see elements intersect at 50% visibility</small>
</div>

<script>
  const container = document.getElementById('intersection__overview');
  const intersectionObserver = container.querySelector('quiet-intersection-observer');
  
  /* Update the status text when intersection state changes */
  intersectionObserver.addEventListener('quiet-intersect', event => {
    const box = event.detail.entry.target;
    const isIntersecting = event.detail.entry.isIntersecting;
    
    if (box.classList.contains('box')) {
      box.querySelector('.status').textContent = isIntersecting ? 'Intersecting' : 'Not intersecting';
    }
  });
</script>

<style>
  #intersection__overview {
    quiet-intersection-observer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 300px;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      padding-inline: 1rem;
      overflow-y: auto;
    }

    .box {
      flex-shrink: 0;
      height: 150px;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 100ms ease;

      &.visible {
        background-color: var(--quiet-primary-fill-soft);
        border-color: var(--quiet-primary-fill-soft);
      }

      &:first-of-type {
        margin-block-start: 275px;
      }

      &:last-of-type {
        margin-block-end: 275px;
      }
    }

    small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }
  }
</style>
```

## Events

The intersection observer dispatches a single `quiet-intersect` event whenever an element's intersection state changes. The event includes `event.detail.entry`, which is an [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object containing information about the intersection.

You can determine whether an element is entering or leaving the viewport by checking `event.detail.entry.isIntersecting`:

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

## Examples

### Basic usage

In its simplest form, an intersection observer monitors when elements enter and leave the viewport:

```html
<quiet-intersection-observer>
  <div>Content to observe</div>
</quiet-intersection-observer>

<script>
  const observer = document.querySelector('quiet-intersection-observer');

  observer.addEventListener('quiet-intersect', event => {
    const entry = event.detail.entry;
    
    if (entry.isIntersecting) {
      console.log('Element is visible:', entry.target);
    } else {
      console.log('Element is no longer visible:', entry.target);
    }
  });
</script>
```

### Using intersection-class for automatic styling

The `intersection-class` attribute automatically applies a CSS class to elements when they intersect, making it easy to style them without event handlers:

```html {.example}
<div id="intersection__automatic-styling">
 <quiet-intersection-observer threshold="0.5" intersection-class="visible">
   <div class="fade-box">Fade In Animation</div>
   <div class="slide-box">Slide In Animation</div>
   <div class="scale-box">Scale & Rotate Animation</div>
   <div class="bounce-box">Bounce Animation</div>
 </quiet-intersection-observer>

 <small>Scroll to see elements transition at 50% visibility</small>
</div>

<style>
  #intersection__automatic-styling {
    quiet-intersection-observer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 300px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 1rem;
      overflow-y: auto;
    }

    small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }
  }

  .fade-box {
    height: 150px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
    flex-shrink: 0;
  }

  .fade-box.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-box {
    height: 150px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.5s ease;
    flex-shrink: 0;
  }

  .slide-box.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .scale-box {
    height: 150px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    opacity: 0;
    transform: scale(0.6) rotate(-5deg);
    transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    flex-shrink: 0;
  }

  .scale-box.visible {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .bounce-box {
    height: 150px;
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    opacity: 0;
    transform: translateY(50px) scale(0.8);
    transition: all 0.5s cubic-bezier(0.68, 0.55, 0.265, 1.2);
    flex-shrink: 0;
  }
 
 .bounce-box.visible {
   opacity: 1;
   transform: translateY(0) scale(1);
 }

 quiet-intersection-observer > div:first-of-type {
   margin-top: 250px;
 }
</style>
```

### Custom root and margins

You can observe intersections with a specific container element and add margins to trigger events before elements are actually visible:

```html
<div id="scroll-container" style="height: 400px; overflow: auto;">
  <quiet-intersection-observer 
    root="#scroll-container"
    root-margin="50px 0px"
    intersection-class="in-view"
  >
    <div class="content">...</div>
  </quiet-intersection-observer>
</div>
```

### Multiple thresholds

Monitor different visibility percentages by specifying multiple threshold values:

```html
<quiet-intersection-observer threshold="0 0.25 0.5 0.75 1">
  <div class="animated-content">...</div>
</quiet-intersection-observer>

<script>
  const observer = document.querySelector('quiet-intersection-observer');

  observer.addEventListener('quiet-intersect', event => {
    const entry = event.detail.entry;
    const ratio = entry.intersectionRatio;
    const element = entry.target;
    
    // Apply different styles based on visibility percentage
    element.style.opacity = ratio;
    element.style.transform = `translateY(${(1 - ratio) * 20}px)`;
  });
</script>
```

## Properties

### root

A CSS selector for the element that is used as the viewport for checking visibility. By default (empty string), this is the browser viewport. You can set it to any scrollable container element using a CSS selector.

```html
<!-- Use a specific container -->
<quiet-intersection-observer root="#my-container">
  ...
</quiet-intersection-observer>

<!-- Use a class selector -->
<quiet-intersection-observer root=".scroll-area">
  ...
</quiet-intersection-observer>
```

The component uses `getRootNode().querySelector()` to find the root element, allowing it to work across shadow DOM boundaries.

### rootMargin

Margin around the root element. Can have values similar to the CSS margin property (e.g., "10px 20px 30px 40px"). This margin creates an invisible boundary around the root that can trigger intersection events before or after the actual boundaries.

```html
<!-- Trigger 100px before entering viewport -->
<quiet-intersection-observer root-margin="100px">
  ...
</quiet-intersection-observer>

<!-- Different margins for each side -->
<quiet-intersection-observer root-margin="50px 0px -50px 0px">
  ...
</quiet-intersection-observer>
```

### threshold

A space-delimited list of numbers between 0 and 1, indicating at what percentage of the target's visibility the observer should trigger. A value of 0 means as soon as one pixel is visible, 1.0 means the entire element must be visible.

```html
<!-- Trigger when 50% visible -->
<quiet-intersection-observer threshold="0.5">
  ...
</quiet-intersection-observer>

<!-- Multiple thresholds -->
<quiet-intersection-observer threshold="0 0.5 1">
  ...
</quiet-intersection-observer>
```

### intersectionClass

A CSS class name to automatically add to elements when they are intersecting with the root. The class is removed when elements stop intersecting. This provides a declarative way to style intersecting elements without needing event handlers.

```html
<!-- Apply 'visible' class to intersecting elements -->
<quiet-intersection-observer intersection-class="visible">
  ...
</quiet-intersection-observer>

<!-- Use any class name -->
<quiet-intersection-observer intersection-class="animate-in">
  ...
</quiet-intersection-observer>
```

### once

When set to `true`, each observed element will only trigger the `quiet-intersect` event once, after which it will no longer be observed. This is useful for one-time animations or lazy loading scenarios.

```html
<quiet-intersection-observer once>
  ...
</quiet-intersection-observer>
```

### disabled

Disables the intersection observer when set to `true`. The observer will stop monitoring elements until re-enabled.

```html
<quiet-intersection-observer disabled>
  ...
</quiet-intersection-observer>
```

:::info
Remember that only direct children of the host element are observed. Nested elements will not trigger intersection events.
:::