---
title: Divider
layout: component
---

```html {.example}
<quiet-divider></quiet-divider>
```

## Examples

### Changing the orientation

Set the `orientation` attribute to `vertical` for a vertical orientation. This is best used inside of flex containers.

```html {.example}
<div style="display: flex; align-items: center; height: 2rem;">
  <span>First</span>
  <quiet-divider orientation="vertical"></quiet-divider>
  <span>Second</span>
  <quiet-divider orientation="vertical"></quiet-divider>
  <span>Third</span>
</div>
```

### Customizing styles

Use the `--color`, `--spacing`, and `--thickness` custom properties to change how the divider looks.

```html {.example}
<quiet-divider style="--color: royalblue; --thickness: 4px;"></quiet-divider>
```