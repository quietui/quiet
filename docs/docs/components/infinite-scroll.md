---
title: Infinite Scroll
layout: component
---

Infinite scrolls load new content automatically as users scroll down a feed. Instead of clicking "Next" buttons, content continuously appears as they approach the bottom. Infinite scroll follows the [ARIA APG Infinite Scrolling Feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/) pattern for accessibility.

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
    // Simulate fetching content from a server
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = `Item ${++count}`;
        infiniteScroll.append(item);
      }

      // We'll pretend there's nothing more to load after 50
      if (count >= 50) {
        infiniteScroll.complete();
        return;
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

### Providing content

You can slot just about any content you want into an infinite scroll container. The component watches the scroll position and dispatches the `quiet-load-more` event when users get close to the bottom.

```html
<quiet-infinite-scroll label="News Feed">
  <!-- Initial content -->
  <article class="feed-item">First item</article>
  <article class="feed-item">Second item</article>
  <article class="feed-item">Third item</article>
  ...
</quiet-infinite-scroll>
```

In your code, listen for the `quiet-load-more` event. This is your cue to asynchronously load more content, e.g. from the server, and append it to the container. If no more content is available, call the component's `complete()` method to disable further loading.

```js
const infiniteScroll = document.querySelector('quiet-infinite-scroll');
let currentPage = 1;

infiniteScroll.addEventListener('quiet-load-more', async () => {
  try {
    // Fetch new data from your API
    const response = await fetch(`/api/posts?page=${currentPage}`);
    const posts = await response.json();
    
    // Append posts to the feed
    posts.forEach(post => {
      const item = document.createElement('article');
      item.className = 'feed-item';
      item.innerHTML = `<h3>${post.title}</h3><p>${post.excerpt}</p>`;
      infiniteScroll.appendChild(item);
    });
    
    currentPage++;
    
    // Stop loading when no more content is available
    if (posts.length === 0) {
      infiniteScroll.complete();
    }
  } catch (error) {
    console.error('Failed to load more items:', error);
  }
});
```

To reenable loading, append additional items to the container or perform any DOM action that results in a `slotchange`.

:::info
When the container is empty initially or if the items don't cause the container to scroll, the `quiet-load-more` event will be dispatched immediately to request more items. This behavior allows the entire feed to load, regardless of content or screen size.
:::
