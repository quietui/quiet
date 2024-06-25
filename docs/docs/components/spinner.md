---
title: Spinner
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

### Changing the colors

To change the spinner's colors, set the `--indicator-color` and `--track-color` custom properties on the spinner.

```html {.example}
<div style="font-size: 2rem;">
  <quiet-spinner style="--indicator-color: royalblue;"></quiet-spinner>
  <quiet-spinner style="--indicator-color: deeppink;"></quiet-spinner>
  <quiet-spinner style="--indicator-color: forestgreen;"></quiet-spinner>
</div>
```
