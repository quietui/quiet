---
title: Toast
layout: component
---

Adding a single `<quiet-toast>` element to the page gives you the power to dispatch one or more notifications at any time. Notifications will appear in the _toast stack_, a container that renders in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) and shows above everything else on the page.

```html {.example}
<quiet-toast id="toast__overview"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__overview');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.notify('The notification has been sent', {
      icon: toast.html(`<quiet-icon name="send"></quiet-icon>`),
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

Start by placing a `<quiet-toast>` somewhere on the page and obtain a reference to it. To dispatch a notification, call the toast's `notify()` method as shown below.

```html
<quiet-toast></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.querySelector('quiet-toast');
  const button = document.querySelector('quiet-button');

  button.addEventListener('click', () => { 
    toast.notify('The notification has been sent', {
      variant: 'primary',
      duration: 5000,
      closeButton: true
    });
  });
</script>
```

The first argument is the content to show in the notification and is required. The second argument is an object containing the following properties, all of which are optional.

- `variant` - The type of notification to render, either `primary`, `constructive`, `destructive`, or `default`.
- `duration` - The length of time in milliseconds to show the notification before removing it. Set this to `0` to show the notification until the user dismisses it.
- `icon` - Optional content to show at the start of the notification. Usually an icon, image, avatar, or similar content. Avoid placing interactive content in the icon. To provide HTML content, wrap the HTML string in the toast's `html()` method. All user-provided content must be properly sanitized to prevent XSS vulnerabilities.
- `closeButton` - Set this to `false` to hide the the close button.

### Showing HTML content

Content shown in the notification will be rendered as plain text by default. To show HTML instead, wrap the content in the toast's `html()` method. This works for both content and the `icon` option. For accessibility reasons, it's usually better to avoid placing interactive content inside notifications.

```html {.example}
<quiet-toast id="toast__html"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__html');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.notify(toast.html(`The <s>mice</s> <em>cats</em> have discovered how to use HTML`), {
      icon: toast.html(`<quiet-icon name="cat"></quiet-icon>`)
    });
  });
</script>
```

:::warn
Using this option can be dangerous! Make sure you trust the included content, otherwise your app may become vulnerable to XSS exploits!
:::

:::info
Notifications are rendered in the toast's shadow root, so HTML content may not appear with the same styles as the rest of your page. If necessary, you can add a `<style>` block to the HTML with any styles you'd like to pass to the notification.
:::

### Variants

When calling `notify()`, set the `variant` option to `primary`, `constructive`, `destructive`, or `default` to change the type of notification.

```html {.example}
<div id="toast__variant">
  <quiet-toast></quiet-toast>

  <div class="flex-row" style="gap: .25rem;">
    <quiet-button data-variant="default">Default</quiet-button>
    <quiet-button data-variant="primary">Primary</quiet-button>
    <quiet-button data-variant="constructive">Constructive</quiet-button>
    <quiet-button data-variant="destructive">Destructive</quiet-button>
  </div>
</div>

<script>
  const container = document.getElementById('toast__variant');
  const toast = container.querySelector('quiet-toast');

  // Listen for button clicks
  container.addEventListener('click', event => {
    const button = event.target.closest('[data-variant]');
    const variant = button?.getAttribute('data-variant');
    if (!button) return;

    toast.notify(`This is a ${variant} notification`, {
      icon: toast.html(`<quiet-icon name="click"></quiet-icon>`),
      variant
    });
  });
</script>
```

### Setting a duration

When calling `notify()`, set the `duration` option to change how long notifications show before disappearing. The value is in milliseconds. A value of `0` will keep the notification open until the user dismisses it.

```html {.example}
<quiet-toast id="toast__duration"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__duration');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.notify('You have 10 seconds to feed the cats', {
      duration: 10000
    });
  });
</script>
```

### Custom content

TODO - this doesn't work because the toast is rendered in the shadow root

```html {.example}
<quiet-toast id="toast__custom"></quiet-toast>
<quiet-button>Show notification</quiet-button>

<script>
  const toast = document.getElementById('toast__custom');
  const button = toast.nextElementSibling;

  button.addEventListener('click', () => { 
    toast.notify(toast.html(`
      <strong>Meowy McGee</strong><br>
      has sent you a message
    `), {
      icon: toast.html(`
        <quiet-avatar label="Chill kitty" image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>      
      `)
    });
  });
</script>
```

### Changing the placement

Use the placement `attribute` to set the position of the toast stack. The most recent notification will always shows on top since users read from top to bottom.

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

    toast.notify(`Notified the cats ${numTimes}`, {
      icon: toast.html(`<quiet-icon name="cat"></quiet-icon>`),
      variant: 'primary',
      duration: 3000
    });
  });
</script>
```

:::info
It's possible, although not usually recommended, to have more than one `<quiet-toast>` element on the page at a time.
:::

