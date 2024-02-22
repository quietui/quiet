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
<quiet-spinner style="font-size: .5rem;"></quiet-spinner>
<quiet-spinner style="font-size: 1rem;"></quiet-spinner>
<quiet-spinner style="font-size: 2rem;"></quiet-spinner>
```

### Changing the color

Spinners derive their color from the current text color. This allows you to place them in various locations without having to explicitly set a color. To change the color, set the `color` property on the spinner or an ancestor element.

```html {.example}
<div style="font-size: 2rem;">
  <quiet-spinner style="color: royalblue;"></quiet-spinner>
  <quiet-spinner style="color: deeppink;"></quiet-spinner>
  <quiet-spinner style="color: forestgreen;"></quiet-spinner>
</div>
```

### Changing the width

Use the `border-width` property to adjust the width of the spinner.

```html {.example}
<div style="font-size: 2rem;">
  <quiet-spinner style="border-width: 1px;"></quiet-spinner>
  <quiet-spinner style="border-width: 8px;"></quiet-spinner>
</div>
```
