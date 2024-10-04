---
title: Scalable Text
layout: component
---

```html {.example}
<quiet-scalable-text id="st" text="Be Quiet"></quiet-scalable-text>

<br>

<quiet-text-field id="tf" value="Be Quiet"></quiet-scalable-text>

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
