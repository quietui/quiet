---
title: Mutation Observer
layout: component
---

Add and remove some items, then open the console to inspect the output.

```html {.example}
<div id="mutation__overview">
  <quiet-mutation-observer child-list>
    <div class="box">1 <button aria-label="Remove">✕</button></div>
    <div class="box">2 <button aria-label="Remove">✕</button></div>
    <div class="box">3 <button aria-label="Remove">✕</button></div>
  </quiet-mutation-observer>
</div>

<quiet-button>Add box</quiet-button>

<script>
  const container = document.getElementById('mutation__overview');
  const mutationObserver = container.querySelector('quiet-mutation-observer');
  const appendButton = container.nextElementSibling;
  let count = mutationObserver.querySelectorAll('.box').length;

  // Listen for mutations
  mutationObserver.addEventListener('quiet-mutation', event => {
    console.log(event.detail.record);
  });

  // Remove a card
  mutationObserver.addEventListener('click', event => {
    const button = event.target.closest('button');
    const box = button?.closest('.box');
    box?.remove();
  });

  // Append a box
  appendButton.addEventListener('click', () => {
    const html = `<div class="box">${++count} <button aria-label="Remove">✕</button></div>`;
    mutationObserver.insertAdjacentHTML('beforeEnd', html);
  });
</script>

<style>
  #mutation__overview {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    min-height: 5rem;
    margin-block-end: 1rem;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 5rem;
    height: 5rem;
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-neutral-fill-softer);
    box-shadow: var(--quiet-shadow-softer);
    text-align: center;
    padding: 1rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--quiet-neutral-fill-loud);
      color: var(--quiet-neutral-text-on-loud);
      font-size: .75em;
      padding: 0;
      width: 1.25rem;
      height: 1.25rem;
      min-height: 0;
      position: absolute;
      top: -0.625rem;
      right: -0.625rem;
      border-radius: 50%;
    }
  }
</style>
```

## Examples

### Providing content

Slot one or more elements into the mutation observer and listen for the `quiet-mutation` event. The event includes `event.detail.record`, which is a [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) object that corresponds to the mutated element.

In it's simplest form, a mutation observer can be used like this.

```html
<quiet-mutation-observer>
  ...
</quiet-mutation-observer>

<script>
  const mutationObserver = document.querySelector('quiet-mutation-observer');

  // Listen for mutations
  mutationObserver.addEventListener('quiet-mutation', event => {
    console.log(event.detail.record); // MutationRecord
  });
</script>
```
