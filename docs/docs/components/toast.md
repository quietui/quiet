---
title: Toast
layout: component
---

```html {.example}
<div id="toast__overview">
  <quiet-toast></quiet-toast>

  <quiet-button data-variant="default" data-icon="settings">Default</quiet-button>
  <quiet-button data-variant="primary" data-icon="click">Primary</quiet-button>
  <quiet-button data-variant="constructive" data-icon="circle-check">Constructive</quiet-button>
  <quiet-button data-variant="destructive" data-icon="alert-triangle">Destructive</quiet-button>
</div>

<script>
  const container = document.getElementById('toast__overview');
  const toast = container.querySelector('quiet-toast');

  // Listen for button clicks
  container.addEventListener('click', event => {
    const button = event.target.closest('[data-variant]');
    if (!button) return;

    toast.notify({
      content: toast.html(`Your changes <em>have</em> been saved!`),
      visual: toast.html(`<quiet-icon name="${button.dataset.icon}"></quiet-icon>`),
      variant: button.dataset.variant,
      closable: true,
      duration: 5000,
      showDuration: true,
    });
  });

</script>


<script>

  // toast.notify(`
    
  // `);


</script>
```

## Examples

Use the placement `attribute` to set the position of the toast stack.

```html {.example}
<div id="toast__placement">
  <quiet-toast></quiet-toast>

  <quiet-select label="Placement" value="top-end" style="max-width: 300px;">
    <option value="top-start">top-start</option>
    <option value="top-center">top-center</option>
    <option value="top-end">top-end</option>
    <option value="bottom-start">bottom-start</option>
    <option value="bottom-center">bottom-center</option>
    <option value="bottom-end">bottom-end</option>
  </quiet-select>
  <br>
  <quiet-button>Alert the cats</quiet-button>
</div>

<script>
  const container = document.getElementById('toast__placement');
  const toast = container.querySelector('quiet-toast');
  const button = container.querySelector('quiet-button');
  const placementSelect = container.querySelector('quiet-select');
  let count = 0;

  // Update the stack's position
  placementSelect.addEventListener('input', () => {
    toast.placement = placementSelect.value;
  });

  // Send a notification
  button.addEventListener('click', event => {
    const numTimes = ++count === 1 ? '1 time' : `${count} times`;

    toast.notify({
      content: `The cats have been alerted ${numTimes}`,
      visual: toast.html(`<quiet-icon name="cat"></quiet-icon>`),
      variant: 'primary',
      duration: 3000
    });
  });
</script>
```
