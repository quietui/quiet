---
title: Color Input
layout: component
---

```html {.example}
<quiet-color-input 
  label="Select a color"
  description="The cats like violet, but any color works"
  name="color"
  value="#f0803a"
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "  
  with-input
  with-alpha
  with-eye-dropper
  with-clear
></quiet-color-input>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the color input. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-color-input 
  label="Select a color" 
  name="color"
>
  <span slot="description">
    For our cafe branding guidelines, <a href="https://example.com/" target="_blank">visit our style guide</a>.
  </span>
</quiet-color-input>
```

### Providing an initial value 

Use the `value` attribute to provide an initial value for the color input.

```html {.example}
<quiet-color-input 
  label="Select a color"
  value="#7578c5" 
></quiet-color-input>
```

### Enabling alpha

Add the `with-alpha` attribute to allow users to adjust opacity. Hex colors will become the eight-value syntax, e.g. `#rrggbbaa`, and other formats will include alpha as well.

```html {.example}
<quiet-color-input 
  label="Select a color"
  value="#ce238088" 
  with-alpha
></quiet-color-input>
```

### Adding a clear button

To add a clear button to the color input, use the `with-clear` attribute. The `quiet-input` event will be emitted when the clear button is activated.

```html {.example}
<quiet-color-input 
  label="Select a color"
  name="color"
  value="#21b8bc" 
  with-clear
></quiet-color-input>
```

### Setting the format

Use the `format` attribute to set the format of the value. Valid options include `hex` (default), `rgb,` and `hsl`.

```html {.example}
<quiet-color-input 
  label="Select a color (RGB)"
  value="rgb(255, 204, 0)"
  format="rgb"
></quiet-color-input>
```

### Filled and unstyled color inputs

Color inputs support multiple visual styles through the `appearance` attribute.

```html {.example}
<quiet-color-input 
  label="Normal" 
  appearance="normal"
  value="#6366f1"
></quiet-color-input>

<br>

<quiet-color-input 
  label="Filled" 
  appearance="filled"
  value="#6366f1"
></quiet-color-input>

<br>

<quiet-color-input 
  label="Unstyled" 
  appearance="unstyled"
  value="#6366f1"
></quiet-color-input>
```

### Pill-shaped text fields

Color inputs can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-color-input pill label="Pill-shaped"></quiet-color-input>
```

### Sizes

Use the `size` attribute to change the color input's size.

```html {.example}
<quiet-color-input size="xs" label="Extra small"></quiet-color-input><br>
<quiet-color-input size="sm" label="Small"></quiet-color-input><br>
<quiet-color-input size="md" label="Medium"></quiet-color-input><br>
<quiet-color-input size="lg" label="Large"></quiet-color-input><br>
<quiet-color-input size="xl" label="Extra large"></quiet-color-input>
```

### Disabling

Use the `disabled` attribute to disable the color input.

```html {.example}
<quiet-color-input 
  label="Disabled color input"
  disabled
  value="#6366f1"
></quiet-color-input>
```

### Showing swatches

Set the `swatches` attribute to one or more space-delimited hex colors or CSS color names, e.g. `lightblue`, to show as preset swatches below the color picker. This is useful for providing users with access to recent colors or a predefined color palette.

```html {.example}
<quiet-color-input
  label="Select a color"
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "
></quiet-color-input>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the color input. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-color-input
  class="quiet-side-label"
  style="--label-width: 10ch;"
  name="color" 
  label="Brand color" 
  description="Make it pop"
></quiet-color-input>
<br>
<quiet-color-input 
  class="quiet-side-label"
  style="--label-width: 10ch;"
  name="color" 
  label="Accent color" 
  description="Complementary colors work well here"
></quiet-color-input>
```

### Validation

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission when the color input is missing a value.

```html {.example}
<form action="about:blank" target="_blank">
  <quiet-color-input 
    name="color"
    label="Select a color" 
    required
    style="margin-block-end: 1rem;"
  ></quiet-color-input>
  <quiet-button type="submit">Submit</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the color input invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="color-input__custom">
  <quiet-color-input 
    name="color"
    label="Select a color"
    description="This field will be invalid until custom validation is removed"
  ></quiet-color-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('color-input__custom');
  const colorInput = form.querySelector('quiet-color-input');

  colorInput.setCustomValidity('Please select a different color!');
</script>
```

### Styling validation

You can style valid and invalid color inputs using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="field__validation-pseudo">
  <quiet-color-input 
    name="color"
    label="Select a color"
    description="This field is required"
    required
  ></quiet-color-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .field__validation-pseudo {
    quiet-color-input:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-color-input:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="field__validation-custom">
  <quiet-color-input 
    name="color"
    label="Select a color"
    description="This field is required"
    required
  ></quiet-color-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .field__validation-custom {
    quiet-color-input:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-color-input:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```