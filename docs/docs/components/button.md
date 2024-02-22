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

Buttons have four variants. Primary buttons are intended for suggested behaviors and calls to action. Destructive buttons draw attention to dangerous operations, such as deletion. Secondary buttons are the default variant and are useful for secondary operations. Text buttons can be used as an alternative to secondary buttons when you want a simpler appearance with the same proportions.

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
  <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
  </svg>
  Settings
</quiet-button>

<quiet-button>
  Favorite
  <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
  </svg>

</quiet-button>

<quiet-button>
  <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  Open
  <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
  </svg>

</quiet-button>
```

### Icon-only buttons

To create an icon button, place an icon into the button's default slot and set this attribute to an appropriate label. The label won't be visible, but it will be available to assistive devices.

```html {.example}
<quiet-button icon-label="Settings">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
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

:::warning
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

To show the button in a loading state, add the `loading` attribute. When a button is loading, it is effectively disabled and the `quiet:click` event will not be emitted.

```html {.example}
<quiet-button loading>
  I'm loading
</quiet-button>
```

### Disabling

To disable a button, add the `disabled` attribute. When a button is disabled, the `quiet:click` event will not be emitted.

```html {.example}
<quiet-button disabled>Click me</quiet-button>
```
