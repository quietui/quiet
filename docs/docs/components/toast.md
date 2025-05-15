---
title: Toast
layout: component
---

Adding a single `<quiet-toast>` element to the page gives you the power to dispatch notifications any time. Notifications appear in the _toast stack_, which renders in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) and shows above everything else on the page.

```html {.example}
<quiet-toast id="toast__overview"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__overview');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.create(`
      <quiet-avatar slot="icon" label="Meowy McGee's avatar" image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
      <strong>Meowy McGee</strong><br>
      <small style="color: var(--quiet-text-muted);">has sent you a message</small>
    `, {
      allowHtml: true,
      variant: 'primary'
    });
  });
</script>
```

:::info
You can put the `<quiet-toast>` element anywhere in the DOM, as long as its somewhere inside the `<body>`.
:::

## Examples

### Creating notifications

Start by placing a `<quiet-toast>` somewhere on the page and obtain a reference to it. To dispatch a notification, call the toast's `create()` method as shown below.

```html
<quiet-toast></quiet-toast>

<script>
  const toast = document.querySelector('quiet-toast');
  const button = document.querySelector('quiet-button');

  button.addEventListener('click', () => { 
    toast.create('The notification has been sent', {
      allowHtml: false,
      duration: 5000,
      variant: 'primary'
    });
  });
</script>
```

The first argument is the content to show in the notification. The second argument is an object containing any of the following properties, all of which are optional.

| Property | Description | Default |
| -------- | ----------- | ------- |
| `allowHtml` | Set this to true to allow HTML content. Make sure you trust the included content, otherwise your app may become vulnerable to XSS exploits! | `false` |
| `duration` | The length of time in milliseconds to show the notification before removing it. Set this to `0` to show the notification until the user dismisses it. | `5000` |
| `variant` | The type of notification to render, either `primary`, `constructive`, `destructive`, or `default`. | `default` |

### Creating notifications from templates

To create notifications declaratively, place a single [`<quiet-toast-item>`](/docs/components/toast-item) in a [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) and call the toast's `createFromTemplate()` method. The toast item will be cloned and added to the stack.


```html {.example}
<div id="toast__declarative">
  <!-- Toast stack -->
  <quiet-toast></quiet-toast>

  <!-- The toast item must be in a <template>! -->
  <template>
    <quiet-toast-item variant="primary" duration="3000">
      <quiet-icon slot="icon" name="click"></quiet-icon>
      This was generated from a template.
    </quiet-toast-item>
  </template>

  <quiet-button>Show notification</quiet-button>
</div>

<script>
  const container = document.getElementById('toast__declarative');
  const toast = container.querySelector('quiet-toast');
  const template = container.querySelector('template');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => { 
    toast.createFromTemplate(template);
  });
</script>
```

:::info
Refer to the [toast item](/docs/components/toast-item) docs to see more examples of creating notifications declaratively.
:::

### Variants

When calling `create()`, set the `variant` option to `primary`, `constructive`, `destructive`, or `default` to change the type of notification.

```html {.example}
<div id="toast__variant">
  <quiet-toast></quiet-toast>

  <div style="display: flex; flex-wrap: wrap; gap: .5rem;">
    <quiet-button data-variant="default" data-icon="settings">Default</quiet-button>
    <quiet-button data-variant="primary" data-icon="info-circle">Primary</quiet-button>
    <quiet-button data-variant="constructive" data-icon="check">Constructive</quiet-button>
    <quiet-button data-variant="destructive" data-icon="alert-triangle">Destructive</quiet-button>
  </div>
</div>

<script>
  const container = document.getElementById('toast__variant');
  const toast = container.querySelector('quiet-toast');

  // Listen for button clicks
  container.addEventListener('click', event => {
    const button = event.target.closest('[data-variant]');
    const variant = button?.getAttribute('data-variant');
    const icon = button?.getAttribute('data-icon');
    if (!button) return;

    toast.create(`
      <quiet-icon slot="icon" name="${icon}"></quiet-icon>
      This is a ${variant} notification
    `, {
      allowHtml: true,
      variant
    });
  });
</script>
```

### Changing the duration

When calling `create()`, set the `duration` option to change how long notifications show before disappearing. The value is in milliseconds. A value of `0` will keep the notification open until the user dismisses it.

```html {.example}
<quiet-toast id="toast__duration"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__duration');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.create('You have 10 seconds to feed the cats', {
      duration: 10000
    });
  });
</script>
```

### Removing the close button

Use the `without-close-button` attribute to hide the close button and the progress ring. This is only recommended when a duration is set or when you're using custom buttons to dismiss the notification.

```html {.example}
<quiet-toast id="toast__no-close"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__no-close');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.create('This notification has no close button', {
      noCloseButton: true
    });
  });
</script>
```

:::warn
Do not use this as a way to force the notification to stay open. You should provide a custom close button when you use this option. Remember that users can also press <quiet-hotkey keys="$escape"></quiet-hotkey> to close a notification.
:::

### Responding to events

The `create()` and `createFromTemplate()` methods return a reference to the generated toast item. You can use this to add a listener to respond when users click on the notification or dismiss it.

```html {.example}
<quiet-toast id="toast__click"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__click');
  const button = toast.nextElementSibling;

  button.addEventListener('click', async () => { 
    const toastItem = await toast.create('Click this and check the console');

    // Log to the console and remove the notification when clicked
    toastItem.addEventListener('click', () => {
      console.log('The cats appreciate your click');
      toastItem.remove();
    });

    // Log when the notification is dismissed
    toastItem.addEventListener('quiet-closed', () => {
      console.log('Closed');
    });
  });
</script>
```

### Responding to custom buttons

To respond to custom buttons inside a toast item, obtain a reference to the notification and attach event listeners directly to the buttons you're interested in.

```html {.example}
<quiet-toast id="toast__buttons"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__buttons');
  const button = toast.nextElementSibling;

  button.addEventListener('click', async () => {
    // Create the notification
    const toastItem = await toast.create(`
      <quiet-icon slot="icon" name="cat"></quiet-icon>
      <p>The cats really want you to feed them now</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5em;">
        <quiet-button class="complete" size="sm">Complete</quiet-button>
        <quiet-button class="later" size="sm">Remind me later</quiet-button>
      </div>
    `, {
      allowHtml: true,
      noCloseButton: true,
      variant: 'primary',
      duration: 0
    });

    // Obtain a reference to each button
    const complete = toastItem.querySelector('.complete');
    const later = toastItem.querySelector('.later');

    // When complete is clicked...
    complete.addEventListener('click', async () => {
      toastItem.remove();
      toast.create('OK, the cats are happy now!', { 
        variant: 'constructive',
        duration: 3000
      });
    });

    // When later is clicked...
    later.addEventListener('click', async () => {
      toastItem.remove();
      toast.create('The cats do not want to wait…', { 
        variant: 'destructive',
        duration: 3000
      });
    });
  });
</script>
```

### Custom progress bars

You can add custom progress indicators using the readonly `--progress` custom property, which updates as the timer counts down.

```html {.example}
<quiet-toast id="toast__progress"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__progress');
  const button = toast.nextElementSibling;

  button.addEventListener('click', async () => { 
    const toastItem = await toast.create(`
      <quiet-icon slot="icon" name="balloon"></quiet-icon>
      <p>This is fun, but the cats like the ring better.</p>
      <div class="custom-timer"></div>
    `, {
      allowHtml: true,
      variant: 'primary'
    });
  });
</script>

<style>
  #toast__progress {
    /** Hide the standard progress ring */
    quiet-toast-item::part(progress__track),
    quiet-toast-item::part(progress__indicator) {
      display: none;
    }

    .custom-timer {
      position: relative;
      height: 0.25em; 
      width: 100%; 
      border-radius: 9999px; 
      background-color: var(--quiet-neutral-fill-softer);
      box-shadow: var(--quiet-inset-shadow-soft);
      margin-block-start: -.5rem;
      margin-block-end: -.5rem;

      /** Custom progress bar */
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: var(--progress);
        background-color: var(--quiet-primary-fill-mid);
        border-radius: inherit;
        transition: 100ms width;
      }    
    }
  }
</style>
```

### Changing the placement

Use the placement `attribute` to set the position of the toast stack. The most recent notification will always shows on top since users read from top to bottom.

```html {.example}
<div id="toast__placement">
  <quiet-toast></quiet-toast>

  <quiet-select label="Placement" value="bottom-end" style="max-width: 300px;">
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

    toast.create(`
      <quiet-icon slot="icon" name="cat"></quiet-icon>
      Notified the cats ${numTimes}
    `, {
      allowHtml: true,
      variant: 'primary',
      duration: 0
    });
  });
</script>
```

:::info
It's possible, although not typically recommended, to have more than one `<quiet-toast>` element on the page at a time. If you need to do this, use a different placement for each and ensure they respond as expected on mobile devices.
:::

### Changing the animation

Toast uses a [transition group](/docs/components/transition-group) internally to handle enter and exit animations. To customize the animation, set the `transitionAnimation` property using JavaScript. This value will be passed through to the transition group's property of the same name.

See [changing the transition group's animation](/docs/components/transition-group#changing-the-animation) for more animations and examples.

```html {.example}
<quiet-toast id="toast__animation"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script type="module">
  import { allDefined } from '/dist/quiet.js';
  import { elevator } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@latest/dist/transition/elevator.js';  

  await allDefined();

  const toast = document.getElementById('toast__animation');
  const button = toast.nextElementSibling;

  // Set the new animation
  toast.transitionAnimation = elevator();

  button.addEventListener('click', () => { 
    toast.create(`
      <quiet-icon slot="icon" name="keyframes"></quiet-icon>
      This notification has a custom animation!
    `, {
      allowHtml: true,
      variant: 'primary'
    });
  });
</script>
```
