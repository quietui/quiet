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

Set the `type` attribute to `ring` to show progress in the shape of a ring.

```html {.example .flex-row}
<quiet-progress label="Completion" appearance="ring" value="50">
  50%
</quiet-progress>
```

### Indeterminate progress

When the completion status can't be determined, the progress bar is considered indeterminate. Add the `indeterminate` attribute for tasks whose progress can't be reported.

```html {.example}
<quiet-progress label="Waiting for response" indeterminate></quiet-progress>

<br>

<quiet-progress label="Waiting for response" appearance="ring" indeterminate></quiet-progress>
```

### Changing the size

Use `--track-size` property to change the track size. For progress rings, use the `--diameter` custom property to change the size of the ring.

```html {.example}
<quiet-progress 
  label="Progress"
  value="50"
  style="--track-size: 10px;"
>
</quiet-progress>

<br>

<quiet-progress 
  label="Progress"
  value="50"
  style="--track-size: 60px; font-size: 1.5rem;"
>
  Loading
</quiet-progress>

<br>

<quiet-progress 
  appearance="ring"
  value="50"
  style="--track-size: 4px; --diameter: 100px;"
>
  50%
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

<br>

<quiet-progress 
  style="--track-color: mistyrose; --indicator-color: deeppink;"
  appearance="ring"
  label="Progress" 
  value="75"
>
  75%
</quiet-progress>
```
