---
title: Scalable Text
layout: component
---

```html {.example}
<quiet-scalable-text id="st" text="The text will scale to fit inside the box" style="min-height: 1lh; border: dashed 1px var(--quiet-neutral-stroke-mid);"></quiet-scalable-text>

<br>

<quiet-text-field id="tf" value="The text will scale to fit inside the box" clearable></quiet-scalable-text>

<script>
  const text = document.getElementById('st');
  const input = document.getElementById('tf');

  input.addEventListener('quiet-input', () => {
    text.text = input.value;
  });
</script>
```

## Examples

TODO
