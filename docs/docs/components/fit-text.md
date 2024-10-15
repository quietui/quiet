---
title: Fit Text
layout: component
---

The fit text component is useful for displaying titles, headings, and content of varying lengths on a single line. Instead of wrapping, the text will scale to fit its container within the minimum and maximum font sizes allowed.

A [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) is used internally to make the text respond to window resizing and orientation changes. Try resizing the window or turning your devices to see the text update.

```html {.example}
<quiet-fit-text id="fit-text__editable" style="border: dashed 2px var(--quiet-neutral-stroke-soft);">
  The cute gray kitten jumped into the flower pot
</quiet-fit-text>

<br>

<quiet-text-field
  id="fit-text__editable-input"
  label="Customize the text"
  value="The cute gray kitten jumped into the flower pot"
  clearable
></quiet-text-field>

<script>
  const text = document.getElementById('fit-text__editable');
  const input = document.getElementById('fit-text__editable-input');

  input.addEventListener('quiet-input', () => {
    text.textContent = input.value;
  });
</script>
```

:::info
Only slotted text nodes will be shown. All other [nodes types](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) will be ignored.
:::

## Examples

### Adjusting the width

By default, fit text has `block` styling so it stretches to fit its containing element. You can set a width or max-width on the component (or a parent element) if you need to constrain it.

```html {.example .flex-column}
<quiet-fit-text style="max-width: 200px; border: dashed 2px var(--quiet-neutral-stroke-soft);">
  Be Quiet
</quiet-fit-text>
```

### Changing text styles

Text styles are inherited, so you can set text-related properties on the component itself or an ancestor element.

```html {.example .flex-column}
<div style="border: dashed 2px var(--quiet-neutral-stroke-soft);">
  <quiet-fit-text style="font-family: Georgia, serif;">
    The cute gray kitten jumped into the flower pot
  </quiet-fit-text>

  <quiet-fit-text style="font-family: Impact, sans-serif;">
    The cute gray kitten jumped into the flower pot
  </quiet-fit-text>

  <quiet-fit-text style="font-family: 'Trebuchet MS', Verdana, sans-serif;">
    The cute gray kitten jumped into the flower pot
  </quiet-fit-text>

  <quiet-fit-text style="font-family: 'Marker Felt', 'Comic Sans MS', cursive;">
    The cute gray kitten jumped into the flower pot
  </quiet-fit-text>

  <quiet-fit-text style="font-family: Consolas, Monaco, monospace;">
    The cute gray kitten jumped into the flower pot
  </quiet-fit-text>
</div>
```
