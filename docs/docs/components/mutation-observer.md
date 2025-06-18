---
title: Mutation Observer
layout: component
---

The component uses a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to monitor when its direct children are added, removed, or modified. A `quiet-mutation` event is dispatched for each observed change, providing detailed information about what was mutated.

The component is styled with [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents), allowing you to easily apply flex and grid layouts to the containing element without the component interfering.

```html {.example}
<div id="mutation__overview">
  <quiet-mutation-observer child-list>
    <div class="box">1 <button aria-label="Remove">✕</button></div>
    <div class="box">2 <button aria-label="Remove">✕</button></div>
    <div class="box">3 <button aria-label="Remove">✕</button></div>
  </quiet-mutation-observer>
</div>

<quiet-button>Add box</quiet-button>

<small>Add and remove some items, then open the console to inspect the output.</small>

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

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-width: 5rem;
      height: 5rem;
      border-radius: var(--quiet-border-radius-md);
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
        border-radius: var(--quiet-border-radius-circle);
      }
    }

    ~ small {
      display: block;
      margin-block-start: 1rem;
    }
  }
</style>
```

:::info
Remember that only direct children of the host element are observed. Nested elements will not trigger mutation events unless the `subtree` attribute is enabled.
:::

## Examples

### Providing content

Slot one or more elements into the mutation observer and listen for the `quiet-mutation` event. The event includes `event.detail.record`, which is a [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) object that corresponds to the mutated element.

In its simplest form, a mutation observer can be used like this.

```html
<quiet-mutation-observer child-list>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</quiet-mutation-observer>

<script>
  const mutationObserver = document.querySelector('quiet-mutation-observer');

  // Listen for mutations
  mutationObserver.addEventListener('quiet-mutation', event => {
    console.log(event.detail.record); // MutationRecord
  });
</script>
```

### Observing attribute changes

Use the `attr` attribute to monitor changes to element attributes. You can optionally specify `attr-old-value` to record the previous attribute value.

```html
<quiet-mutation-observer attr attr-old-value>
  <div id="target" class="example">Watch my attributes</div>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');
  const target = observer.querySelector('#target');

  observer.addEventListener('quiet-mutation', event => {
    const record = event.detail.record;
    console.log(`Attribute "${record.attributeName}" changed`);
    console.log(`Old value: ${record.oldValue}`);
    console.log(`New value: ${record.target.getAttribute(record.attributeName)}`);
  });

  // Change an attribute to trigger the observer
  target.className = 'modified';
</script>
```

### Filtering specific attributes

Limit observations to specific attributes using the `attr-filter` attribute. Separate multiple attribute names with spaces.

```html
<quiet-mutation-observer attr attr-filter="class data-state">
  <div class="example" data-state="active" id="example">
    Only class and data-state changes are observed
  </div>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');
  const target = observer.querySelector('#example');

  observer.addEventListener('quiet-mutation', event => {
    console.log(`Observed attribute: ${event.detail.record.attributeName}`);
  });

  // These will trigger events
  target.className = 'modified';
  target.setAttribute('data-state', 'inactive');

  // This will NOT trigger an event
  target.id = 'new-id';
</script>
```

### Observing text content changes

Use the `character-data` attribute to monitor changes to text nodes. The `character-data-old-value` attribute records the previous text content.

```html
<quiet-mutation-observer character-data character-data-old-value subtree>
  <p id="text-content">Original text content</p>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');
  const paragraph = observer.querySelector('#text-content');

  observer.addEventListener('quiet-mutation', event => {
    const record = event.detail.record;
    console.log(`Text changed from "${record.oldValue}" to "${record.target.textContent}"`);
  });

  // Change text content to trigger the observer
  paragraph.textContent = 'Updated text content';
</script>
```

### Observing nested elements

By default, only direct children are observed. Add the `subtree` attribute to observe changes in nested elements as well.

```html
<quiet-mutation-observer child-list subtree>
  <div class="container">
    <div class="nested">
      <span>Nested content</span>
    </div>
  </div>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');
  const nested = observer.querySelector('.nested');

  observer.addEventListener('quiet-mutation', event => {
    console.log('Mutation detected in subtree:', event.detail.record);
  });

  // This will trigger the observer even though span is deeply nested
  nested.innerHTML = '<span>New nested content</span>';
</script>
```

### Combining multiple observation types

You can observe multiple types of mutations simultaneously by combining attributes.

```html
<quiet-mutation-observer 
  child-list 
  attr 
  character-data 
  subtree 
  attr-old-value 
  character-data-old-value
>
  <div class="comprehensive-example">
    <p>This observer watches everything</p>
  </div>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');

  observer.addEventListener('quiet-mutation', event => {
    const record = event.detail.record;
    
    switch (record.type) {
      case 'childList':
        console.log('Child nodes changed');
        break;
      case 'attributes':
        console.log(`Attribute "${record.attributeName}" changed`);
        break;
      case 'characterData':
        console.log('Text content changed');
        break;
    }
  });
</script>
```

### Disabling the observer

Use the `disabled` attribute to temporarily stop observing mutations without removing the component.

```html
<quiet-mutation-observer child-list disabled>
  <div>Changes to this content won't be observed</div>
</quiet-mutation-observer>

<script>
  const observer = document.querySelector('quiet-mutation-observer');

  // Re-enable observation
  observer.disabled = false;

  // Disable observation again
  observer.disabled = true;
</script>
```
