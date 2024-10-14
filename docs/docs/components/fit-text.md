---
title: Fit Text
layout: component
---

The fit text component is useful for displaying titles, headings, and content of varying lengths. Instead of wrapping, the text will automatically scale to fit its container within the minimum and maximum font sizes allowed.

```html {.example}
<quiet-fit-text 
  id="fit-text__overview" 
  style="border: dashed 1px var(--quiet-neutral-stroke-mid);"
>
  The quick brown fox jumped over the lazy dog
</quiet-fit-text>

<br>

<quiet-text-field 
  id="fit-text__overview-input" 
  label="Customize the text"
  value="The quick brown fox jumped over the lazy dog" 
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

Fit text works with most fonts. Just set the `font-family` property on the component or a parent element.

```html {.example .flex-column}
<quiet-fit-text style="font-family: Georgia, 'Times New Roman', serif; border: dashed 1px var(--quiet-neutral-stroke-mid);">
  This is text that will fix inside of the box
</quiet-fit-text>

<quiet-fit-text style="font-family: 'Comic Sans MS', cursive; border: dashed 1px var(--quiet-neutral-stroke-mid);">
  This is text that will fix inside of the box
</quiet-fit-text>

<quiet-fit-text style="font-family: Consolas, Monaco, monospace; border: dashed 1px var(--quiet-neutral-stroke-mid);">
  This is text that will fix inside of the box
</quiet-fit-text>
```
