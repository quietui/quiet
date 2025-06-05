---
title: Infinite Scroll
layout: component
---

```html {.example}
<quiet-infinite-scroll id="infinite__overview">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
  <div class="item">Item 6</div>
  <div class="item">Item 7</div>
  <div class="item">Item 8</div>
  <div class="item">Item 9</div>
  <div class="item">Item 10</div>
</quiet-infinite-scroll>

<script>
  const infiniteScroll = document.getElementById('infinite__overview');
  let count = infiniteScroll.querySelectorAll('.item').length;

  infiniteScroll.addEventListener('quiet-load-more', async event => {
    console.log('added');

    // Stop at 100 and prevent the event to indicate no more scrolling is possible
    if (count >= 100) {
      infiniteScroll.complete();
      return;
    }

    // Simulate fetching content from the server
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = `Item ${++count}`;
        infiniteScroll.append(item);
      }
    }, 300);
  });
</script>

<style>
  #infinite__overview {
    .item {
      padding: 1rem 1.5rem;

      &:not(:last-child) {
        border-bottom: solid 1px var(--quiet-neutral-stroke-softer);
      }
    }
  }
</style>
```

## Examples

TODO
