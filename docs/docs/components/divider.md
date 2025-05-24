---
title: Divider
layout: component
---

```html {.example}
<quiet-divider></quiet-divider>
```

## Examples

### Adding symbols

Add a decorative symbol or icon in the middle of the divider with the `symbol` slot. Symbols are presentational content, meaning they won't be announced by screen readers.

```html {.example .flex-col}
<quiet-divider>
  <quiet-icon slot="symbol" name="circle"></quiet-icon>
</quiet-divider>

<quiet-divider>
  <span slot="symbol">§</span>
</quiet-divider>

<quiet-divider>
  <span slot="symbol" style="font-size: .875rem;">break</span>
</quiet-divider>
```

### Changing the orientation

Set the `orientation` attribute to `vertical` for a vertical orientation. This is best used inside of flex containers.

```html {.example}
<div style="display: flex; align-items: center;">
  <span>First</span>
  <quiet-divider orientation="vertical"></quiet-divider>
  <span>Second</span>
  <quiet-divider orientation="vertical"></quiet-divider>
  <span>Third</span>
</div>
```

### Styling dividers

Use the `--color`, `--spacing`, and `--thickness` CSS properties to change the divider's appearance.

```html {.example}
<quiet-divider style="--color: royalblue; --thickness: 4px;"></quiet-divider>
```