---
title: Slide Action
layout: component
---

```html {.example}
<quiet-slide-action label="Slide to activate" attention="shimmer" style="max-width: 340px;"></quiet-slide-action>
```

## Examples

TODO

- label slot for HTML content
- dispatch `quiet-slide-complete` event
- follow mouse/touch but animate back when released
- pulse and delay for 500ms when reaching the end
- keyboard support

### Listening for completion

TODO - show how to listen and play a sound/vibrate on completion

### Showing an animation

Set the `attention` attribute to `shimmer` to draw attention to the control with a subtle animation.

```html {.example}
<quiet-slide-action label="Slide to activate" attention="shimmer" style="max-width: 300px;"></quiet-slide-action>
```

### Disabling

Use the `disabled` attribute to disable the slide action.

```html {.example}
<quiet-slide-action label="Slide to activate" disabled style="max-width: 300px;"></quiet-slide-action>
```

### Setting a label

TODO

### Customizing the thumb

TODO - custom icon

### Styling slide actions

TODO
