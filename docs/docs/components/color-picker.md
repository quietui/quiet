---
title: Color Picker
layout: component
---

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="#7578c5" 
  with-input
  with-alpha
  with-eye-dropper
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "  
></quiet-color-picker>
```

:::info
This component is a primitive for enabling color selection. It is not a form control, so it will not submit a value to a form. See [color input](/docs/components/color-input) for a color picker suitable for using with forms.
:::

## Examples

### Labels

Use the `label` attribute to provide an accessible label for the color picker. This won't be shown, but it will be read to assistive devices.

```html {.example}
<quiet-color-picker label="Select a color"></quiet-color-picker>
```

### Setting an initial value

Use the `value` attribute to provide an initial value for the color picker. You can specify values in a variety of formats as well as CSS colors names. Parsing of color values is very permissive. See the [TinyColor docs](https://www.npmjs.com/package/@ctrl/tinycolor) for more details on acceptable color formats.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="#71e0f3"
>
</quiet-color-picker>
```

### Enabling alpha

Add the `with-alpha` attribute to allow the user to adjust opacity.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="#ce238088" 
  with-alpha
></quiet-color-picker>
```

### Enabling the eye dropper

Add the `with-eye-dropper` attribute to show the eye dropper button, which allows the user to select a color from anywhere on the screen.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  with-eye-dropper
></quiet-color-picker>
```

:::warn
The [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) is only available in [supportive browsers](https://caniuse.com/?search=eyedropper%20API).
:::

### Enabling the color input

Add the `with-input` attribute to show the color input, a text field the user can type into.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="#4716ce" 
  with-input
></quiet-color-picker>
```

### Showing swatches

Set the `swatches` attribute to one or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the color picker. This is useful for providing users with access to recent colors or a predefined color palette.

```html {.example}
<quiet-color-picker
  label="Select a color"
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "
></quiet-color-picker>
```

### Setting the format

Use the `format` attribute to set the format of the value. Valid options include `hex` (default), `rgb,` and `hsl`.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="#ffcc00"
  format="rgb"
  with-input
  id="color-picker__format"
></quiet-color-picker>

<script>
  const colorPicker = document.getElementById('color-picker__format');

  // This will output an RGB string when the color changes
  colorPicker.addEventListener('quiet-change', () => {
    console.log(colorPicker.value);
  });
</script>
```

:::info
You can set the color picker's value using any format and it will automatically be converted to the format specified by the `format` attribute.
:::

### Getting the value programmatically

If you need to access the value in a specific format, use the `getValueAs()` method. You can pass `rgb` (default), `hsl`, `hex`, or `hex8` to get a corresponding value.

For `rgb`, an object with `{ r, g, b, a }` properties will be returned where `r`, `g`, and `b` range from 0-255 and `a` (alpha) ranges from 0–1. For `hsl`, an object with `{ h, s, l, a }` properties will be returned where `h` ranges from 0–360 and `s`, `l`, and `a` range from 0–1. For `hex` and `hex8`, a string in the format of `#RRGGBB` and `#RRGGBBAA` will be returned, respectively.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  value="tomato"
  format="rgb"
  id="color-picker__object"
></quiet-color-picker>

<script>
  const colorPicker = document.getElementById('color-picker__object');

  // Outputs two objects when the color changes
  colorPicker.addEventListener('quiet-change', () => {
    console.log(
      colorPicker.getValueAs('rgb'),
      colorPicker.getValueAs('hex'),
      colorPicker.getValueAs('hex8'),
      colorPicker.getValueAs('hsl')
    );
  });
</script>
```

### Changing the size

Use the `size` attribute to change the color pickers's size.

```html {.example}
<quiet-select label="Select a size" style="max-width: 18rem; margin-block-end: 2rem;">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select>

<quiet-color-picker 
  size="xs" 
  label="Color picker sizes"
    swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "
  with-input
  with-alpha
  with-eye-dropper
  id="color-picker__size"
></quiet-color-picker>

<script>
  const colorPicker = document.getElementById('color-picker__size');
  const select = colorPicker.previousElementSibling;

  select.addEventListener('quiet-change', () => {
    colorPicker.size = select.value;
  });  
</script>
```

### Disabling

To disable a color picker, add the `disabled` attribute.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  disabled
  value="#6366f1"
  with-alpha 
  with-input
  with-eye-dropper
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899  
  "
></quiet-color-picker>
```
