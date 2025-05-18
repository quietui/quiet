---
title: Resize Observer
layout: component
---

The component utilizes a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to monitor the dimensions of its direct children. A `quiet-resize` event is dispatched for each observed element, once when the element is first observed and once every time the element is resized.

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
</script>

<style>
  #resize__overview {
    position: relative;
    height: 200px;

    .resizable {
      z-index: 2;
      position: relative;
      width: 100%;
      min-width: 54px; /* 50px + borders */
      max-width: 100%;
      height: 100%;
      min-height: 54px;  /* 50px + borders */
      max-height: 204px; /* 200px + borders */
      border: solid 2px var(--quiet-neutral-stroke-mid);
      border-radius: var(--quiet-border-radius);
    }
    
    .handle {
      position: absolute;
      bottom: calc(-0.75rem + 1px);
      right: calc(-0.75rem + 1px);
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--quiet-primary-fill-mid);
      border: solid 2px var(--quiet-silent);
      border-radius: 50%;
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
