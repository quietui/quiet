---
title: Progress
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

### Progress rings

Set the `appearance` attribute to `ring` to show progress in the shape of a ring.

```html {.example .flex-row}
<quiet-progress label="Completion" appearance="ring" value="50">
  50%
</quiet-progress>
```

### Progress pie charts

Set the `appearance` attribute to `pie` to show progress in the shape of a filled pie chart.

```html {.example .flex-row}
<quiet-progress label="Completion" appearance="pie" value="66"></quiet-progress>
```

### Indeterminate progress

When the completion status can't be determined, the progress bar is considered indeterminate. Add the `indeterminate` attribute for tasks whose progress can't be reported.

```html {.example}
<quiet-progress label="Waiting for response" indeterminate></quiet-progress>

<br>

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <quiet-progress label="Waiting for response" appearance="ring" indeterminate></quiet-progress>
  <quiet-progress label="Waiting for response" appearance="pie" indeterminate></quiet-progress>
</div>
```

### Changing the size

Use `--track-size` property to change the track size for bars and rings. For rings and pie charts, use the `--diameter` custom property to change the size.

```html {.example}
<quiet-progress 
  label="Progress"
  value="75"
  style="--track-size: 10px;"
>
</quiet-progress>

<br>

<quiet-progress 
  label="Progress"
  value="75"
  style="--track-size: 60px; font-size: 1.5rem;"
>
  Loading
</quiet-progress>

<br>

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <quiet-progress 
    appearance="ring"
    value="75"
    style="--track-size: 4px; --diameter: 100px;"
  >
    75%
  </quiet-progress>

  <quiet-progress 
    appearance="pie"
    value="75"
    style="--diameter: 100px;"
  >
  </quiet-progress>
</div>
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

<br>

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <quiet-progress 
    style="--track-color: mistyrose; --indicator-color: deeppink;"
    appearance="ring"
    label="Progress" 
    value="75"
  >
    75%
  </quiet-progress>

  <quiet-progress 
    style="--track-color: mistyrose; --indicator-color: deeppink;"
    appearance="pie"
    label="Progress" 
    value="75"
  >
  </quiet-progress>
</div>
```
