---
title: Transition Group
layout: component
---

```html {.example}
<quiet-transition-group style="display: flex; flex-wrap: wrap; gap: 1rem; margin-block-end: 1rem;" id="tg__overview">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
</quiet-transition-group>

<quiet-button id="tg__randomize">Randomize</quiet-button>
<quiet-button id="tg__add">Add</quiet-button>

<script>
  const transitionGroup = document.getElementById('tg__overview');
  const randomizeButton = document.getElementById('tg__randomize');
  const addButton = document.getElementById('tg__add');
  let count = transitionGroup.children.length;

  // Randomize boxes
  randomizeButton.addEventListener('quiet-click', () => {
    const boxes = [...transitionGroup.children];
    boxes.sort(() => Math.random() - 0.5);
    boxes.forEach(box => transitionGroup.append(box));
  });

  // Add a box
  addButton.addEventListener('quiet-click', () => {
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
```

## Examples

TODO


<style>
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: var(--quiet-primary-fill-mid);
    border-radius: .125rem;
    color: white;
    cursor: pointer;
  }
</style>