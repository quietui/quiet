---
title: Slide Action
layout: component
---

```html {.example}
<quiet-slide-action id="slide-action" label="Slide to activate" style="max-width: 300px;"></quiet-slide-action>

<br>
<quiet-button id="down" type="button" icon-label="Decrease"><quiet-icon name="minus"></quiet-icon></quiet-button>
<quiet-button id="up" type="button" icon-label="Increase"><quiet-icon name="plus"></quiet-icon></quiet-button>

<script>
  const slide = document.getElementById('slide-action');
  const up = document.getElementById('up');
  const down = document.getElementById('down');

  up.addEventListener('click', () => {
    slide.progress += 10;
  });

  down.addEventListener('click', () => {
    slide.progress -= 10;
  });
</script>
```

## Examples

TODO

- label slot for HTML content
- dispatch `quiet-slide-complete` event
- follow mouse/touch but animate back when released
- pulse and delay for 500ms when reaching the end
- keyboard support
