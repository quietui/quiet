---
title: Comparison
layout: component
---

```html {.example}
<quiet-comparison>
  <img slot="start" src="https://plus.unsplash.com/premium_photo-1707353402061-c31b6ba8562e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Three kittens on a vibrant orange background">
  <img slot="end" src="https://plus.unsplash.com/premium_photo-1707353402061-c31b6ba8562e?q=80&w=1000&sat=-100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="The same three kittens in a grayscale photo">
</quiet-comparison>
```

## Examples

### Providing content

Comparisons are commonly used for images, but you can compare just about any content. Use the `start` and `end` slots to place content on each side of the comparison.

For best results, use elements that shares the same dimensions.

```html {.example}
<quiet-comparison style="max-width: 380px;">
  <quiet-card slot="start" inert class="quiet-light">
    <h3 slot="header">Secret Scientists</h3>
    When nobody's watching, cats conduct elaborate scientific experiments to determine if gravity still works by knocking things off shelves with deliberate precision.
    <quiet-button slot="footer" variant="primary">Tell me more</quiet-button>
    <quiet-button slot="footer">I'm skeptical</quiet-button>
  </quiet-card>

  <quiet-card slot="end" inert class="quiet-dark">
    <h3 slot="header">Secret Scientists</h3>
    When nobody's watching, cats conduct elaborate scientific experiments to determine if gravity still works by knocking things off shelves with deliberate precision.
    <quiet-button slot="footer" variant="primary">Tell me more</quiet-button>
    <quiet-button slot="footer">I'm skeptical</quiet-button>
  </quiet-card>
</quiet-comparison>
```

:::info
For a strict visual comparison, i.e. no interaction, add the [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) attribute to the slotted elements as shown above.
:::

### Setting the initial position

Add the `disabled` attribute to lock the comparison in its current position.

```html {.example}
<quiet-comparison position="75">
  <img slot="start" src="https://images.unsplash.com/photo-1736593494119-d0a69181b414?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten lays in its bed and cuddles a pillow">
  <img slot="end" src="https://images.unsplash.com/photo-1736593494119-d0a69181b414?q=80&w=1000&sat=-100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="The same kitten in a grayscale photo">
</quiet-comparison>
```

### Using a custom icon

Slot an icon or similar in the `handle-icon` slot to use a custom icon in the handle.

```html {.example}
<quiet-comparison>
  <quiet-icon slot="handle-icon" name="arrow-bar-both"></quiet-icon>
  <img slot="start" src="https://images.unsplash.com/photo-1719310694054-6fc99b7c14ec?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="An orange kitten explores a tall grassy yard">
  <img slot="end" src="https://images.unsplash.com/photo-1719310694054-6fc99b7c14ec?q=80&w=1000&sat=-100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="The same kitten in a grayscale photo">
</quiet-comparison>
```

### Disabling

Add the `disabled` attribute to lock the comparison in place. You can still change the position programmatically when disabled.

```html {.example}
<quiet-comparison position="66" disabled>
  <img slot="start" src="https://images.unsplash.com/photo-1601217156006-3358e1514676?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten peeks out from inside a cardboard box">
  <img slot="end" src="https://images.unsplash.com/photo-1601217156006-3358e1514676?q=80&w=1000&sat=-100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="The same kitten in a grayscale photo">
</quiet-comparison>
```
