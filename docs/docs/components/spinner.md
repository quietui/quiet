---
title: Spinner
description: TODO
layout: component
---

```html {.example}
<quiet-spinner></quiet-spinner>
```

## Examples

### Changing the size

Spinners are sized relative to the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the spinner or an ancestor element.

```html {.example}
<quiet-spinner style="font-size: 1rem;"></quiet-spinner>
<quiet-spinner style="font-size: 2rem;"></quiet-spinner>
<quiet-spinner style="font-size: 3rem;"></quiet-spinner>
```

### Changing the color

To change the color, set the `--color` custom property on the spinner.

```html {.example}
<div style="font-size: 2rem;">
  <quiet-spinner style="--color: royalblue;"></quiet-spinner>
  <quiet-spinner style="--color: deeppink;"></quiet-spinner>
  <quiet-spinner style="--color: forestgreen;"></quiet-spinner>
</div>
```
