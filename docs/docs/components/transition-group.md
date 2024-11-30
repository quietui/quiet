---
title: Transition Group
layout: component
---

Just wrap a collection of elements in a transition group and use normal DOM APIs to add, remove, and reorder them. The transition group will automatically apply the appropriate animations as elements enter and exit the group.

```html {.example}
<div id="transition-group__boxes">
  <!-- Add your elements here -->
  <quiet-transition-group>
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
    <div class="box">4</div>
    <div class="box">5</div>
    <div class="box">6</div>
    <div class="box">7</div>
    <div class="box">8</div>
  </quiet-transition-group>

  <div class="buttons">
    <quiet-button data-action="add">Add random</quiet-button>
    <quiet-button data-action="remove">Remove random</quiet-button>
    <quiet-button data-action="shuffle">Shuffle</quiet-button>
    <quiet-button data-action="disable" toggle="off">Disable transitions</quiet-button>
  </div>
</div>

<!-- Everything below is for the demo -->
<script>
  const container = document.getElementById('transition-group__boxes');
  const transitionGroup = container.querySelector('quiet-transition-group');
  const shuffleButton = container.querySelector('quiet-button[data-action="shuffle"]');
  const addButton = container.querySelector('quiet-button[data-action="add"]');
  const removeButton = container.querySelector('quiet-button[data-action="remove"]');
  const disableButton = container.querySelector('quiet-button[data-action="disable"]');
  let count = transitionGroup.children.length;

  function addRandomBox() {
    const children = [...transitionGroup.children];
    const randomSibling = children[Math.floor(Math.random() * children.length)];
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = String(++count);

    if (randomSibling) {
      randomSibling.before(box);
    } else {
      transitionGroup.append(box)
    }
  }

  function removeRandomBox() {
    const boxes = [...transitionGroup.children];
    if (boxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * boxes.length);
      boxes[randomIndex].remove();
    }
  }

  function shuffleBoxes() {
    const boxes = [...transitionGroup.children];
    boxes.sort(() => Math.random() - 0.5);
    boxes.forEach(box => transitionGroup.append(box));
  }

  // Handle button clicks
  addButton.addEventListener('quiet-click', addRandomBox);
  removeButton.addEventListener('quiet-click', removeRandomBox);
  shuffleButton.addEventListener('quiet-click', shuffleBoxes);
  disableButton.addEventListener('quiet-click', () => {
    transitionGroup.disableTransitions = disableButton.toggle === 'off';
  });
</script>

<style>
  #transition-group__boxes {
    quiet-transition-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      flex-direction: row;
      margin-block-end: 2rem;
    }

    .buttons {
      display: flex;
      gap: .5rem;
      flex-wrap: wrap;
    }

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      font-size: 1.5rem;
      font-weight: var(--quiet-font-weight-semibold);
      background: var(--quiet-primary-fill-mid);
      border-radius: var(--quiet-border-radius);
      color: var(--quiet-primary-text-on-mid);

      @media screen and (max-width: 959px) {
        font-size: 1.25rem;
        width: 80px;
        height: 80px;  
      }
    }
  }
</style>
```

This example includes logic and styles for the demo, but the minimal markup you need for a transition group is shown below. Note that only _direct children_ of the transition group will be animated.

```html
<quiet-transition-group>
  <div class="item">...</div>
  <div class="item">...</div>
  <div class="item">...</div>
</quiet-transition-group>
```

:::info
Transition groups honor the user's [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting. If you're not seeing animations, this might be why. To override this behavior, which is generally not recommended, use the `ignore-reduced-motion` attribute.
:::

## Examples

### Working with elements

Use standard DOM APIs to add, remove, and reorder elements and the transition group will automatically animate your changes. This example demonstrates how adding, removing, and reordering list items will be handled by the transition group.

```html {.example}
<div id="transition-group__list">
  <!-- A template for list items -->
  <template>
    <div class="list-item">
      <span class="label"></span>
      <quiet-button-group label="Sort">
        <quiet-button size="sm" data-action="up" icon-label="Move up"><quiet-icon name="arrow-up"></quiet-icon></quiet-button>
        <quiet-button size="sm" data-action="down" icon-label="Move down"><quiet-icon name="arrow-down"></quiet-icon></quiet-button>
      </quiet-button-group>
      <quiet-button size="sm" variant="text" data-action="delete" icon-label="Delete"><quiet-icon name="trash"></quiet-icon></quiet-button>
    </div>
  </template>

  <quiet-transition-group>
    <!-- Items are generated using the <template> above -->
  </quiet-transition-group>

  <form>
    <quiet-text-field placeholder="New item" appearance="filled" pill></quiet-text-field>
    <quiet-button type="submit" variant="primary" icon-label="Add to list" pill><quiet-icon name="plus"></quiet-icon></quiet-button>
    <quiet-divider orientation="vertical"></quiet-divider>
    <quiet-button pill data-action="shuffle">Shuffle</quiet-button>
  </form>
</div>

<script>
  const container = document.getElementById('transition-group__list');
  const transitionGroup = container.querySelector('quiet-transition-group');
  const template = container.querySelector('template');
  const addForm = container.querySelector('form');
  const shuffleButton = container.querySelector('[data-action="shuffle"]');
  let count = transitionGroup.children.length;

  function createListItem(label = '') {
    const listItem = template.content.cloneNode(true);
    listItem.querySelector('.label').textContent = label;
    return listItem;
  }

  // Create the initial list
  if (transitionGroup.children.length === 0) {
    ['Feed the cats', 'Change the litter box', 'Buy catnip', 'Playtime'].forEach(label => {
      const listItem = createListItem(label);
      transitionGroup.append(listItem);
      updateListItems();
    });
  }

  // Update the list now that the content has changed
  transitionGroup.addEventListener('quiet-content-changed', updateListItems);

  // Add an item
  addForm.addEventListener('submit', event => {
    const textField = addForm.querySelector('quiet-text-field');
    const label = textField.value;
    const listItem = createListItem(label || '(Untitled)');
    transitionGroup.append(listItem);
    textField.value = '';    

    event.preventDefault();
  });

  // Shuffle items
  shuffleButton.addEventListener('quiet-click', () => {
    const items = [...transitionGroup.children];
    items.sort(() => Math.random() - 0.5);
    items.forEach(item => transitionGroup.append(item));
  });

  // Handle item actions
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
    listItem.previousElementSibling.before(listItem);
    }

    // Move an item down 
    if (action === 'down' && listItem.nextElementSibling) {
    listItem.nextElementSibling.after(listItem);
    }
  });

  // Make sure the first/last items have the up/down buttons disabled
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
      background-color: var(--quiet-paper-color);
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

      quiet-button[data-action="delete"] quiet-icon {
        color: var(--quiet-destructive-text-colorful);
      }
    }      
  }
</style>
```

### Changing the layout

Transition groups use a columnar flex layout, by default. To change the layout, apply `flex-direction: row` to the transition group. You can add spacing between items by setting the `gap` property.

```css
quiet-transition-group {
  flex-direction: row;
  gap: 2rem;
}
```

:::warn
Support for non-flex layouts, including CSS Grid, is considered experimental.
:::

### Changing duration and easing

To change the animation speed and easing, set the `--duration` and `--easing` custom properties on the transition group.

```html {.example}
<quiet-transition-group 
  id="transition-group__duration"
  style="
    --duration: 1000ms;
    --easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  "
>
  <div class="box" style="background-color: deeppink;"></div>
  <div class="box" style="background-color: dodgerblue;"></div>
  <div class="box" style="background-color: rebeccapurple;"></div>
  <div class="box" style="background-color: tomato;"></div>
</quiet-transition-group>

<script>
  const transitionGroup = document.getElementById('transition-group__duration');

  function moveTheBox() {
    const lastChild = transitionGroup.lastElementChild;
    if (lastChild) {
      transitionGroup.prepend(lastChild);
    }
  }

  // Move the box again after the transition ends
  transitionGroup.addEventListener('quiet-transition-end', () => {
    setTimeout(moveTheBox, 1000);
  });

  // Ensure the element is registered
  Promise.all([
    customElements.whenDefined('quiet-transition-group'),
    transitionGroup.updateComplete
  ])
  .then(moveTheBox);
</script>

<style>
  #transition-group__duration {
    flex-direction: row;
    gap: 1rem;

    .box {
      width: 60px;
      height: 60px;
      border-radius: 3px;
    }
  }
</style>
```

### Disabling transitions

Add the `disable-transitions` attribute to disable transition animations. Note that the DOM will still be modified when this option is enabled.

```html {.example}
<div id="transition-group__disabling">
  <quiet-transition-group>
    <div class="circle" style="background-color: deeppink;"></div>
    <div class="circle" style="background-color: dodgerblue;"></div>
    <div class="circle" style="background-color: rebeccapurple;"></div>
  </quiet-transition-group>

  <quiet-switch label="Disable transitions"></quiet-switch>
</div>

<script>
  const container = document.getElementById('transition-group__disabling');
  const transitionGroup = container.querySelector('quiet-transition-group');
  const disableSwitch = container.querySelector('quiet-switch');

  // Toggle transitions
  disableSwitch.addEventListener('quiet-change', () => {
    transitionGroup.disableTransitions = !transitionGroup.disableTransitions;
  });

  // Rotate the circles every second
  setInterval(() => {
    const firstChild = transitionGroup.firstElementChild;
    if (firstChild) {
      transitionGroup.append(firstChild);
    }
  }, 1000);
</script>

<style>
  #transition-group__disabling {
    text-align: center;

    quiet-transition-group {
      --duration: 500ms;
      --easing: ease-in-out;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 50px;
      height: 180px;
      margin-block-end: 2rem;
    }

    .circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;

      &:nth-child(1) {
        grid-column: 1 / -1;
        grid-row: 1;
        justify-self: center;
      }

      &:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
        justify-self: end;
      }

      &:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
        justify-self: start;  
      }      
    }
  }
</style>
```
