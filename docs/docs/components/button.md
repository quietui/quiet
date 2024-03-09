---
title: Button
layout: component
---

```html {.example}
<quiet-button>Click me</quiet-button>
```

## Examples

### Variants

Buttons have four standard variants. Primary buttons are intended for suggested behaviors and calls to action. Destructive buttons draw attention to dangerous operations, such as deletion. Secondary buttons are the default variant and are useful for secondary operations. Text buttons can be used as an alternative to secondary buttons when you want a simpler appearance with the same proportions.

```html {.example}
<quiet-button variant="primary">
  Primary
</quiet-button>

<quiet-button variant="secondary">
  Secondary
</quiet-button>

<quiet-button variant="destructive">
  Destructive
</quiet-button>

<quiet-button variant="text">
  Text Button
</quiet-button>
```

### Start and end icons

Use the `start` and `end` slots to add icons. For best results, use a [`<quiet-icon>`](/docs/components/icon) or an `<svg>` element.

```html {.example}
<quiet-button>
  <quiet-icon slot="start" name="cog-6-tooth"></quiet-icon>
  Settings
</quiet-button>

<quiet-button>
  Favorite
  <quiet-icon slot="end" name="heart"></quiet-icon>
</quiet-button>

<quiet-button>
  <quiet-icon slot="start" name="link"></quiet-icon>
  Open
  <quiet-icon slot="end" name="arrow-top-right-on-square"></quiet-icon>
</quiet-button>
```

### Link buttons

Any button can be rendered as a link by setting the `href` attribute. This is useful to allow buttons to act as navigation. When `href` is present, other link options such as `download` and `target` also become available.

```html {.example}
<quiet-button loading href="https://example.com/" target="_blank">
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

Buttons are sized relative to the current font size. To change their size, apply `font-size` to the button or an ancestor element.

```html {.example}
<quiet-button style="font-size: .875rem;">
  I'm a bit smaller
</quiet-button>

<quiet-button style="font-size: 1.125rem;">
  I'm a bit bigger
</quiet-button>
```

:::info
Be careful to not make the button's text too small. Typically, 12px is the absolute smallest you should use to ensure your buttons are accessible.
:::

### Pill-shaped buttons

Any button can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-button pill>
  I'm a pill button
</quiet-button>
```

### Icon buttons

To create an icon button, place an icon into the button's default slot and set the `icon-label` attribute to an appropriate label. The label won't be visible, but it will be available to assistive devices.

```html {.example}
<quiet-button icon-label="Accept" variant="primary">
  <quiet-icon name="check"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Reload">
  <quiet-icon name="arrow-path"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Delete" variant="destructive">
  <quiet-icon name="trash"></quiet-icon>
</quiet-button>

<quiet-button icon-label="Close" variant="text">
  <quiet-icon name="x-mark"></quiet-icon>
</quiet-button>
```

### Toggle buttons

Create a toggle button by adding the `toggle="off"` attribute. If you want the default state to be pressed, use `toggle="on"` instead. Toggle buttons cannot be used with link buttons or submit buttons.

```html {.example}
<quiet-button toggle="off" icon-label="Bold">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
  </svg>
</quiet-button>

<quiet-button toggle="off" icon-label="Italic">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
  </svg>
</quiet-button>

<quiet-button toggle="off" icon-label="Underline">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
  </svg>
</quiet-button>
```

### Image buttons

Image buttons are a special variant that let you create application icons and other picture-based buttons using images. Unlike other variants, image buttons conform to the size of the image you slot in.

```html {.example}
<quiet-button variant="image">
  <img src="/assets/images/app-icon.png" alt="Launch Quiet" style="width: 60px; height: 60px;">
</quiet-button>
```

:::info
Don't forget to include `alt` text on images for assistive devices.
:::

### Loading

To show the button in a loading state, add the `loading` attribute. When a button is loading, it is effectively disabled and the `quiet-click` event will not be emitted.

```html {.example}
<quiet-button loading>
  I'm loading
</quiet-button>
```

### Disabling

To disable a button, add the `disabled` attribute. When a button is disabled, the `quiet-click` event will not be emitted.

```html {.example}
<quiet-button disabled>Click me</quiet-button>
```
