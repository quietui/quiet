---
title: Transition Group
layout: component
---


```html {.example}
<div id="transition-group__list">
  <!-- A template for list items -->
  <template>
    <div class="list-item">
      <span class="label"></span>
      <quiet-button size="sm" data-action="up" icon-label="Move up"><quiet-icon name="arrow-up"></quiet-icon></quiet-button>
      <quiet-button size="sm" data-action="down" icon-label="Move down"><quiet-icon name="arrow-down"></quiet-icon></quiet-button>
      <quiet-button size="sm" data-action="delete" icon-label="Delete"><quiet-icon name="trash"></quiet-icon></quiet-button>
    </div>
  </template>

  <quiet-transition-group>
    <!-- Items are generated using the <template> above -->
  </quiet-transition-group>

  <form>
    <quiet-text-field placeholder="New item" appearance="filled"></quiet-text-field>
    <quiet-button type="submit" variant="primary" icon-label="Add"><quiet-icon name="plus"></quiet-icon></quiet-button>
    <quiet-divider orientation="vertical"></quiet-divider>
    <quiet-button data-action="shuffle">Shuffle</quiet-button>
  </form>
</div>

<script>
  const container = document.getElementById('transition-group__list');
  const transitionGroup = container.querySelector('quiet-transition-group');
  const template = container.querySelector('template');
  const addForm = container.querySelector('form');

  const shuffleButton = document.getElementById('transition-group__list-shuffle');
  const prependButton = document.getElementById('transition-group__list-prepend');
  const appendButton = document.getElementById('transition-group__list-append');
  let count = transitionGroup.children.length;

  function createListItem(label = '') {
    const listItem = template.content.cloneNode(true);
    listItem.querySelector('.label').textContent = label;
    return listItem;
  }

  // Create the initial list
  if (transitionGroup.children.length === 0) {
    ['Cats', 'Dogs', 'Birds', 'Fish'].forEach(label => {
      const listItem = createListItem(label);
      transitionGroup.append(listItem);
      updateListItems();
    });
  }

  // Update the list when the transition starts (the DOM has already been updated at this point)
  transitionGroup.addEventListener('quiet-transition-start', updateListItems);

  // Add an item
  addForm.addEventListener('submit', event => {
    const textField = addForm.querySelector('quiet-text-field');
    const label = textField.value;
    const listItem = createListItem(label || '(Untitled)');
    transitionGroup.append(listItem);
    textField.value = '';    

    event.preventDefault();
  });

  // Handle actions
  container.addEventListener('quiet-click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.getAttribute('data-action');
    const listItem = button.closest('.list-item');

    // Delete an item
    if (action === 'delete') {
      listItem.remove();
    }

    // Move an item up
    if (action === 'up' && listItem.previousElementSibling) {
      transitionGroup.insertBefore(listItem, listItem.previousElementSibling);
    }

    // Move an item down
    if (action === 'down' && listItem.nextElementSibling) {
      transitionGroup.insertBefore(listItem.nextElementSibling, listItem);
    }

    // Shuffle items
    if (action === 'shuffle') {
      const items = [...transitionGroup.children];
      items.sort(() => Math.random() - 0.5);
      items.forEach(item => transitionGroup.append(item));
    }
  });

  function updateListItems() {
    const listItems = transitionGroup.querySelectorAll('.list-item');

    listItems.forEach((listItem, index) => {
      listItem.querySelector('[data-action="up"]').disabled = index === 0;
      listItem.querySelector('[data-action="down"]').disabled = index === listItems.length - 1;
    });
  }
</script>

<style>
  #transition-group__list {
    quiet-transition-group {
      display: flex; 
      flex-direction: column; 
      gap: .5rem; 
      margin-block-end: 1rem;
    }

    form {
      display: flex;
      gap: .5rem;
      align-items: center;

      quiet-text-field {
        flex: 1 1 auto;
      }

      quiet-button {
        flex: 0 0 auto;
      }

      quiet-divider {
        height: 2rem;
      }

      quiet-text-field::part(label),
      quiet-text-field::part(description) {
        display: none;
      }
    }

    .list-item {
      display: flex;
      gap: .5rem;
      align-items: center;
      justify-content: start;
      width: 100%;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      box-shadow: var(--quiet-shadow-softer);
      color: var(--quiet-neutral-text-on-soft);
      padding: .5rem 1rem;

      .label {
        flex: 1 1 auto;
      }

      quiet-button {
        flex: 0 0 auto;
      }
    }      
  }
</style>
```

## Examples

```html {.example}
<div id="tg__boxes">
  <quiet-transition-group style="display: flex; flex-wrap: wrap; gap: 1rem; margin-block-end: 1rem;" id="tg__boxes">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
  </quiet-transition-group>

  <quiet-button data-action="prepend">Prepend</quiet-button>
  <quiet-button data-action="append">Append</quiet-button>
  <quiet-button data-action="shuffle">Shuffle</quiet-button>
</div>

<script>
  const container = document.getElementById('tg__boxes');
  const transitionGroup = container.querySelector('quiet-transition-group');
  const shuffleButton = container.querySelector('quiet-button[data-action="shuffle"]');
  const prependButton = container.querySelector('quiet-button[data-action="prepend"]');
  const appendButton = container.querySelector('quiet-button[data-action="append"]');
  let count = transitionGroup.children.length;

  // shuffle boxes
  shuffleButton.addEventListener('quiet-click', () => {
    const boxes = [...transitionGroup.children];
    boxes.sort(() => Math.random() - 0.5);
    boxes.forEach(box => transitionGroup.append(box));
  });

  // Prepend a box
  prependButton.addEventListener('quiet-click', () => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = String(++count);
    transitionGroup.prepend(box);
  });

  // Append a box
  appendButton.addEventListener('quiet-click', () => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = String(++count);
    transitionGroup.append(box);
  });

  // Remove a box when clicking on it
  transitionGroup.addEventListener('click', event => {
    const box = event.target.closest('.box');
    if (box) box.remove();
  });
</script>

<style>
  #tg__boxes {
    quiet-transition-group {
      flex-direction: row;
    }

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      background: var(--quiet-primary-fill-mid);
      border-radius: var(--quiet-border-radius);
      color: var(--quiet-primary-text-on-mid);
      cursor: pointer;
    }
  }
</style>
```
