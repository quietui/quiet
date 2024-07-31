---
title: Color Picker
layout: component
---

```html {.example}
<quiet-color-picker 
  label="Select a color"
  description="Your preferences will be saved."
  name="color"
  value="#7578c5" 
  with-opacity
  with-eye-dropper
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "  
></quiet-color-picker>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the color picker. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-color-picker name="color" label="Select a color">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-color-picker>
```

### Setting an initial value

Use the `value` attribute to provide an initial value for the color picker. You can specify values in a variety of formats as well as CSS colors names. Parsing of color values is very permissive. See the [TinyColor docs](https://www.npmjs.com/package/@ctrl/tinycolor) for more details on acceptable color formats.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  name="color" 
  value="#71e0f3"
>
</quiet-color-picker>
```

### Enabling opacity

Add the `with-opacity` attribute to allow the user to adjust transparency.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  name="color"
  value="##ce2380cc" 
  with-opacity 
></quiet-color-picker>
```

### Enabling the eye dropper

Add the `with-eye-dropper` attribute to show the eye dropper button, which allows the user to select a color from anywhere on the screen.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  name="color"
  with-eye-dropper
></quiet-color-picker>
```

:::warn
The EyeDropper API is only available in [supportive browsers](https://caniuse.com/?search=eyedropper%20API).
:::

### Showing swatches

Set the `swatches` attribute to one or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the color picker. This is useful for providing users with access to recent colors or a predefined color palette.

```html {.example}
<quiet-color-picker
  label="Select a color"
  name="color"
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
  name="color"
  value="#ffcc00"
  format="rgb"
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
You can set the color picker's value using any format and it will immediately be converted to the format specified by the `format` attribute.
:::

### Getting the value as an object

If you need to access the value as an object instead of a string, use the `getValueAsObject()` method. You can pass `rgb` (default) or `hsl` to get a corresponding object back.

For `rgb`, an object with `{ r, g, b, a }` properties will be returned where `r`/`g`/`b` range from 0-255 and `a` (alpha) ranges from 0–1. For `hsl`, an object with `{ h, s, l, a }` properties will be returned where `h` ranges from 0–360 and `s`/`l`/`a` range from 0–1/

```html {.example}
<quiet-color-picker 
  label="Select a color"
  name="color"
  value="tomato"
  format="rgb"
  id="color-picker__object"
></quiet-color-picker>

<script>
  const colorPicker = document.getElementById('color-picker__object');

  // Outputs two objects when the color changes
  colorPicker.addEventListener('quiet-change', () => {
    console.log(
      colorPicker.getValueAsObject('rgb'),
      colorPicker.getValueAsObject('hsl')
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
  with-opacity
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

### Disabling color pickers

To disable a color picker, add the `disabled` attribute.

```html {.example}
<quiet-color-picker 
  label="Select a color"
  disabled
  name="color"
  value="#6366f1"
  with-opacity 
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899  
  "
></quiet-color-picker>
```

### Using custom validation

Color pickers don't have built-in validation attributes like many other form controls. However, you can use the `custom-validity` attribute to make the color picker invalid and show a custom error message on submit. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-color-picker
    label="Select a color"
    name="color"
    description="This field will be invalid until the custom-validity attribute is removed"
    custom-validity="Not so fast, bubba!"
  ></quiet-color-picker>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of the `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::


### Styling validation

You can style valid and invalid sliders using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="color-picker__validation-pseudo">
  <quiet-color-picker
    label="Select a color"
    name="color"
    value="#ff0000"
    custom-validity="The selected color must be white or black"
  ></quiet-color-picker>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .color-picker__validation-pseudo {
    quiet-color-picker:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: 1rem;
    }

    quiet-color-picker:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: 1rem;
    }
  }
</style>

<script>
  const form = document.querySelector('.color-picker__validation-pseudo');
  const colorPicker = form.querySelector('quiet-color-picker');

  async function updateValidity() {
    await colorPicker.updateComplete;
    const isValid = ['#ffffff', '#000000'].includes(colorPicker.value);
    colorPicker.customValidity = isValid ? '' : 'Select white or black only';
  }

  colorPicker.addEventListener('quiet-input', () => updateValidity());
  form.addEventListener('reset', () => updateValidity());
</script>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="color-picker__validation-custom">
  <quiet-color-picker
    label="Select a color"
    name="color"
    value="#ff0000"
    custom-validity="The selected color must be white or black"
  ></quiet-color-picker>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .color-picker__validation-custom {
    quiet-color-picker:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: 1rem;
    }

    quiet-color-picker:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: 1rem;
    }
  }
</style>

<script>
  const form = document.querySelector('.color-picker__validation-custom');
  const colorPicker = form.querySelector('quiet-color-picker');

  async function updateValidity() {
    await colorPicker.updateComplete;
    const isValid = ['#ffffff', '#000000'].includes(colorPicker.value);
    colorPicker.customValidity = isValid ? '' : 'Select white or black only';
  }

  colorPicker.addEventListener('quiet-input', () => updateValidity());
  form.addEventListener('reset', () => updateValidity());
</script>
```
