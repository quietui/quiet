---
title: Progress
description: TODO
layout: component
---

```html {.example}
<quiet-progress label="Downloading" value="50">
  50%
</quiet-progress>
```

## Examples

### Adding a label

Labels aren't displayed in the progress bar, but they're required for assistive devices such as screen readers. You can add a label using the `label` attribute.

```html {.example}
<quiet-progress label="Progress" value="50"></quiet-progress>
```

### Showing content

Slot in some text to show content in the progress bar's indicator.

```html {.example}
<quiet-progress label="Progress" value="75">75%</quiet-progress>
```

### Indeterminate progress

When the completion status can't be determined, the progress bar is considered indeterminate. Add the `indeterminate` attribute for tasks whose progress can't be reported.

```html {.example}
<quiet-progress label="Waiting for response" indeterminate></quiet-progress>
```

### Changing the size

Use the `width` and `height` properties to change the progress bar's size. If you're displaying text inside the progress bar, use `font-size` to change its size.

```html {.example}
<quiet-progress 
  style="width: 50%; height: 10px;"
  label="Progress"
  value="50"
>
</quiet-progress>

<br>

<quiet-progress 
  style="width: 50%; height: 60px; font-size: 1.25rem;"
  label="Progress"
  value="50"
>
  Loading
</quiet-progress>
```

### Changing the colors

Use the `--track-color` custom property to change the progress bar's track color. Use the `--indicator-color` custom property to change the color of the progress indicator.

```html {.example}
<quiet-progress 
  style="--track-color: mistyrose; --indicator-color: deeppink; color: white;"
  label="Progress" 
  value="75"
>
  Almost there!
</quiet-progress>
```
