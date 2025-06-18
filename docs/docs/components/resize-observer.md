---
title: Resize Observer
layout: component
---

The component uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to monitor the dimensions of its direct children. A `quiet-resize` event is dispatched for each observed element, once when the element is first observed and once every time the element is resized.

The component is styled with [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents), allowing you to easily apply flex and grid layouts to the containing element without the component interfering.

```html {.example}
<div id="resize__overview">
  <quiet-resize-observer>
    <div class="resizable">
      <div class="handle"></div>
    </div>
  </quiet-resize-observer>

  <div class="dimensions"></div>
</div>

<script>
  const container = document.getElementById('resize__overview');
  const resizeObserver = container.querySelector('quiet-resize-observer');
  
  /* Log the element's dimensions on resize */
  resizeObserver.addEventListener('quiet-resize', event => {
    const contentRect = event.detail.entry.contentRect;
    const width = Math.round(contentRect.width);
    const height = Math.round(contentRect.height);

    dimensions.innerHTML = `${width}px &times; ${height}px`;
  });

  /* The code below is just to make the example resizable */
  const resizable = container.querySelector('.resizable');
  const handle = container.querySelector('.handle');
  const dimensions = container.querySelector('.dimensions');
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  
  function startResize(event) {
    isResizing = true;
    startX = event.clientX;
    startY = event.clientY;
    startWidth = resizable.offsetWidth;
    startHeight = resizable.offsetHeight;
    document.addEventListener('pointermove', resize);
    document.addEventListener('pointerup', stopResize);
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function resize(event) {
    if (!isResizing) return;
    const width = startWidth + (event.clientX - startX);
    const height = startHeight + (event.clientY - startY);
    
    resizable.style.width = `${width}px`;
    resizable.style.height = `${height}px`;
  }

  function stopResize(event) {
    if (!isResizing) return;
    isResizing = false;
    document.removeEventListener('pointermove', resize);
    document.removeEventListener('pointerup', stopResize);
    handle.releasePointerCapture(event.pointerId);
  }

  handle.addEventListener('pointerdown', startResize);  

  // Show initial dimensions
  dimensions.innerHTML = `${resizable.clientWidth}px &times; ${resizable.clientHeight}px`;
</script>

<style>
  #resize__overview {
    position: relative;
    height: 200px;

    .resizable {
      z-index: 2;
      position: relative;
      width: 100%;
      min-width: 50px;
      max-width: 100%;
      height: 100%;
      min-height: 50px;
      max-height: 200px;
      border: solid 2px var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius-md);
    }
    
    .handle {
      position: absolute;
      bottom: calc(-0.75rem + 1px);
      right: calc(-0.75rem + 1px);
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--quiet-primary-fill-mid);
      border: solid 2px var(--quiet-silent);
      border-radius: var(--quiet-border-radius-circle);
      cursor: nwse-resize;
      touch-action: none;
    }

    .dimensions {
      position: absolute;
      z-index: 1;
      top: calc(50% - 0.5lh);
      left: calc(50% - 100px);
      width: 200px;
      font-size: .9375em;
      pointer-events: none;
      text-align: center;
    }
  }
</style>
```

:::info
Remember that only direct children of the host element are observed. Nested elements will not trigger intersection events.
:::

## Example

### Providing content

Slot one or more elements into the resize observer and listen for the `quiet-resize` event. The event includes `event.detail.entry`, which is a [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) object that corresponds to the observed change.

In it's simplest form, a resize observer can be used like this.

```html
<quiet-resize-observer>
  ...
</quiet-resize-observer>

<script>
  const resizeObserver = document.querySelector('quiet-resize-observer');

  // Listen for resizes
  resizeObserver.addEventListener('quiet-resize', event => {
    console.log(event.detail.entry); // ResizeObserverEntry
  });
</script>
```

:::info
Remember that only direct children of the host element are observed.
:::
