---
title: Fit Text
layout: component
---

The fit text component is useful for displaying titles, headings, and content of varying lengths. The text will automatically scale to fit its container within the minimum and maximum font sizes allowed.

```html {.example}
<quiet-fit-text 
  id="fit-text__overview" 
  style="border: dashed 1px var(--quiet-neutral-stroke-mid);"
>
  The text will always fit inside of this box
</quiet-fit-text>

<br>

<quiet-text-field 
  id="fit-text__overview-input" 
  value="The text will always fit inside of this box" 
  clearable
></quiet-text-field>

<script>
  const text = document.getElementById('fit-text__overview');
  const input = document.getElementById('fit-text__overview-input');

  input.addEventListener('quiet-input', () => {
    text.textContent = input.value;
  });
</script>
```

:::info
Only slotted text nodes will be shown. Slotted HTML elements will be ignored.
:::

## Examples

### Custom fonts

TODO

### Fitting text inside a max-width label

TODO