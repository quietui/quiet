---
title: Button
layout: component
---

```html {.example}
<quiet-button>Click me</quiet-button>
```

## Examples

### Variants

Buttons have four built-in variants. Set the `variant` attribute to `primary`, `secondary`, or `destructive` to change the button's appearance.

```html {.example .flex-row}
<quiet-button variant="primary">
  Primary
</quiet-button>

<quiet-button variant="secondary">
  Secondary
</quiet-button>

<quiet-button variant="destructive">
  Destructive
</quiet-button>
```

:::info
There is no `constructive` variant by design. Use the `primary` variant for constructive actions.
:::

### Start & end icons

Use the `start` and `end` slots to add icons. For best results, use a [`<quiet-icon>`](/docs/components/icon) or an `<svg>` element.

```html {.example .flex-row}
<quiet-button>
  <quiet-icon slot="start" name="settings"></quiet-icon>
  Settings
</quiet-button>

<quiet-button>
  Favorite
  <quiet-icon slot="end" name="heart"></quiet-icon>
</quiet-button>

<quiet-button>
  <quiet-icon slot="start" name="link"></quiet-icon>
  Open
  <quiet-icon slot="end" name="external-link"></quiet-icon>
</quiet-button>
```

### Link buttons

Any button can be rendered as a link by setting the `href` attribute. This is useful to allow buttons to act as navigation. When `href` is present, other link options such as `download`, `rel`, and `target` also become available.

```html {.example .flex-row}
<quiet-button href="https://example.com/" target="_blank" rel="noreferrer noopener">
  I'm secretly a link
</quiet-button>

<quiet-button href="/assets/images/wordmark-light.svg" download>
  Download the logo
</quiet-button>
```

:::info
Because link buttons become anchors, they cannot be used with `disabled` or `loading`.
:::

### Changing the width

To change a button's width, use the CSS `width` property.

```html {.example}
<quiet-button style="width: 100%">
  I'm much longer now
</quiet-button>
```

### Changing the size

Use the `size` attribute to change the button's size. Available sizes include `xs`, `sm`, `md`, `lg`, and `xl`, with the default being `md`.

```html {.example .flex-row}
<quiet-button size="xs">Extra small</quiet-button>
<quiet-button size="sm">Small</quiet-button>
<quiet-button size="md">Medium</quiet-button>
<quiet-button size="lg">Large</quiet-button>
<quiet-button size="xl">Extra large</quiet-button>
```

### Outline buttons

Set the `appearance` attribute to `outline` to draw outlined buttons.

```html {.example .flex-row}
<quiet-button appearance="outline" variant="primary">
  I'm outline
</quiet-button>

<quiet-button appearance="outline" variant="secondary">
  I'm outline
</quiet-button>

<quiet-button appearance="outline" variant="destructive">
  I'm outline
</quiet-button>
```

### Text buttons

Set the `appearance` attribute to `text` to draw text buttons. Text buttons share the same side and padding as normal buttons, but don't have a background.

```html {.example .flex-row}
<quiet-button appearance="text">
  I'm text
</quiet-button>
```

### Image buttons

Image buttons are a special appearance that let you create application icons and other picture-based buttons using images. Set the `appearance` attribute to `image` to create an image button. Image buttons are designed to conform to the size of the image you slot in.

```html {.example}
<quiet-button appearance="image">
  <img src="/assets/images/app-icon.png" alt="Launch Quiet" style="width: 60px; height: 60px;">
</quiet-button>
```

:::info
Don't forget to include `alt` text on images for assistive devices.
:::

### Pill-shaped buttons

Buttons can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example .flex-row}
<quiet-button pill variant="primary">
  I'm a pill button
</quiet-button>

<quiet-button pill variant="secondary">
  I'm a pill button
</quiet-button>

<quiet-button pill variant="destructive">
  I'm a pill button
</quiet-button>
```

### Icon buttons

To create an icon button, place an icon into the button's default slot and set the `icon-label` attribute to an appropriate label. The label won't be visible, but it will be available to assistive devices.

```html {.example .flex-row}
<quiet-button icon-label="Accept" variant="primary">
  <quiet-icon name="check"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Reload">
  <quiet-icon name="refresh"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Delete" variant="destructive">
  <quiet-icon name="trash"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Close" appearance="text">
  <quiet-icon name="x"></quiet-icon>
</quiet-button>
```

### Toggle buttons

Create a toggle button by adding the `toggle="off"` attribute. To make it active by default, use `toggle="on"` instead. An indicator is shown to make it obvious when the toggle is selected.

```html {.example .flex-row}
<quiet-button variant="primary" toggle="off" icon-label="Alarm">
  <quiet-icon name="bell"></quiet-icon>
</quiet-button>

<quiet-button variant="secondary" toggle="off" icon-label="Filter">
  <quiet-icon name="filter"></quiet-icon>
</quiet-button>

<quiet-button variant="destructive" toggle="off" icon-label="Record">
  <quiet-icon name="camera"></quiet-icon>
</quiet-button>

<quiet-button appearance="text" toggle="off" icon-label="Mute">
  <quiet-icon name="volume-3"></quiet-icon>
</quiet-button>
```

:::warn
Toggle buttons cannot be used with link buttons or submit buttons.
:::

### Loading buttons

To show the button in a loading state, add the `loading` attribute. When a button is loading, it is effectively disabled and the `quiet-click` event will not be emitted.

```html {.example}
<quiet-button loading>
  I'm loading
</quiet-button>
```

### Disabling

To disable a button, add the `disabled` attribute. When a button is disabled, the `quiet-click` event will not be emitted.

```html {.example .flex-row}
<quiet-button disabled>Regular button</quiet-button>
<quiet-button href="https://example.com/" disabled>Link button</quiet-button>
```

### Adding a dropdown caret

A caret can be shown to indicate the button opens a dropdown menu by adding the `with-caret` attribute.

```html {.example}
<quiet-button with-caret>Dropdown</quiet-button>
```

### Listening for long press

A common request, especially on mobile, is to be able to detect a long press. Buttons dispatch a `quiet-long-press` event when the button is clicked or tapped and held for 500 milliseconds. You can determine if the event was triggered by a click (`pointerdown`) or tap (`touchstart`) by looking at `event.detail.originalEvent.type`.

```html {.example}
<quiet-button id="button__long-press">Press and hold</quiet-button>

<script>
  const button = document.getElementById('button__long-press');

  button.addEventListener('quiet-long-press', async event => {
    // Log the type of event that initiated the long press, 
    // i.e. pointerdown or touchstart
    console.log(event.detail.originalEvent.type);    

    // Animate the button
    button.animate([
      { scale: 1, offset: 0 },
      { scale: 1.2, offset: 0.1 },
      { scale: 1, offset: 1 }
    ], {
      duration: 500,
      easing: 'linear'
    });
  });
</script>
```