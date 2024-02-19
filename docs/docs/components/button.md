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

Buttons have three semantic variants.

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
```

### Adding icons

Use the `start` and `end` slots to add icons.

```html {.example}
<quiet-button>
  <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
  </svg>
  Start slot
</quiet-button>

<quiet-button>
  End slot
  <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
  </svg>
</quiet-button>

<quiet-button>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  Both slots
  <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
  </svg>
</quiet-button>
```

### Link buttons

Buttons can be rendered as links by setting the `href` attribute. This is useful to allow buttons to act as navigation. When `href` is present, other link options such as `download` and `target` also become available. By design, link buttons cannot be disabled.

```html {.example}
<quiet-button href="https://example.com/" target="_blank">
  I'm secretly a link
</quiet-button>

<quiet-button href="/assets/images/wordmark-light.svg" download>
  Download the logo
</quiet-button>
```

### Changing the size

Buttons are sized relative to the current font size. To change their size, apply `font-size` to the button or an ancestor element.

```html {.example}
<quiet-button style="font-size: .75rem;">
  I'm a bit smaller
</quiet-button>

<quiet-button style="font-size: 1.125rem;">
  I'm a bit bigger
</quiet-button>
```

:::info
Be careful to not make the button's text too small. Typically, 12px is the absolute smallest you should use to ensure your buttons are accessible.
:::


### Custom widths

To change a button's width, use the CSS `width` property.

```html {.example}
<quiet-button style="width: 100%">
  I'm much longer now
</quiet-button>
```

### Pill-shaped buttons

Buttons can be rendered with pill-shaped corners by applying the `pill` attribute.

```html {.example}
<quiet-button pill>
  I'm a pill button
</quiet-button>
```

### Loading

To show the button in a loading state, add the `loading` attribute. When a button is loading, the `quiet:click` event will not be emitted.

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
