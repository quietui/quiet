---
title: Button
description: TODO
layout: component
---

```html {.example}
<quiet-button>Click me</quiet-button>
```

## Examples

### Variants

Buttons have four built-in variants. Primary buttons are intended for suggested behaviors and calls to action. Destructive buttons draw attention to dangerous operations, such as deletion. Secondary buttons are the default variant and are useful for secondary operations. Text buttons can be used as an alternative to secondary buttons when you want a simpler appearance with the same proportions.

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

### Start and end icons

Use the `start` and `end` slots to add icons.

```html {.example}
<quiet-button>
  <svg slot="start" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  Settings
</quiet-button>

<quiet-button>
  Favorite
  <svg slot="end" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
</quiet-button>

<quiet-button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
  Open
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
</quiet-button>
```

### Icon-only buttons

To create an icon button, place an icon into the button's default slot and set this attribute to an appropriate label. The label won't be visible, but it will be available to assistive devices.

```html {.example}
<quiet-button icon-label="Settings">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
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

### Pill-shaped buttons

Any buttons can be rendered with pill-shaped corners by applying the `pill` attribute.

```html {.example}
<quiet-button pill>
  I'm a pill button
</quiet-button>
```

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
