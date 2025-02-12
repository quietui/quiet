---
title: Color Input
layout: component
---

```html {.example}
<quiet-color-input 
  label="Select a color"
  description="It doesn't have to be your favorite"
  name="color"
  value="#7578c5" 
  with-input
  with-opacity
  with-eye-dropper
  clearable
></quiet-color-input>
```

## Examples

### Labels and Descriptions

Use the `label` attribute to provide an accessible label, and `description` to add additional context. Both support HTML content via slots.

```html {.example}
<quiet-color-input 
  label="Brand color" 
  description="Choose your primary brand color"
></quiet-color-input>

<br>

<quiet-color-input>
  <span slot="label">Custom label <em>with markup</em></span>
  <span slot="description">And a <strong>rich text</strong> description</span>
</quiet-color-input>
```

### Appearances

Color inputs support multiple visual styles through the `appearance` attribute.

```html {.example}
<quiet-color-input 
  label="Normal appearance" 
  appearance="normal"
  value="#6366f1"
></quiet-color-input>

<br>

<quiet-color-input 
  label="Filled appearance" 
  appearance="filled"
  value="#6366f1"
></quiet-color-input>

<br>

<quiet-color-input 
  label="Unstyled appearance" 
  appearance="unstyled"
  value="#6366f1"
></quiet-color-input>
```

### Enabling Opacity

Add the `with-opacity` attribute to allow users to adjust color transparency.

```html {.example}
<quiet-color-input 
  label="Select a color"
  value="#ce2380cc" 
  with-opacity
></quiet-color-input>
```

### Setting the Format

Use the `format` attribute to set the color value format. Valid options include `hex` (default), `rgb`, and `hsl`.

```html {.example}
<quiet-color-input 
  label="RGB color input"
  value="#ffcc00"
  format="rgb"
></quiet-color-input>
```

### Using Swatches

Set the `swatches` attribute to display preset color options. Specify colors as space-delimited hex values or CSS color names.

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

### Sizes

Use the `size` attribute to change the input's size.

```html {.example}
<quiet-color-input size="xs" label="Extra small"></quiet-color-input><br>
<quiet-color-input size="sm" label="Small"></quiet-color-input><br>
<quiet-color-input size="md" label="Medium"></quiet-color-input><br>
<quiet-color-input size="lg" label="Large"></quiet-color-input><br>
<quiet-color-input size="xl" label="Extra large"></quiet-color-input>
```

### Disabling

Add the `disabled` attribute to prevent user interaction.

```html {.example}
<quiet-color-input 
  label="Disabled color input"
  disabled
  value="#6366f1"
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
    description="This field will be invalid until the custom-validity attribute is removed"
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