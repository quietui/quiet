---
title: Number Field
layout: component
---

```html {.example}
<quiet-number-field 
  name="name" 
  label="Number" 
  value="0" 
  style="max-width: 200px;" style="max-width: 200px;"
></quiet-number-field>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the text field. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-number-field name="name" label="Name" style="max-width: 200px;">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-number-field>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the text field.

```html {.example}
<quiet-number-field name="name" label="Name" value="Meowy McGee" style="max-width: 200px;"></quiet-number-field>
```

### Adding a placeholder

Use the `placeholder` attribute to show a placeholder in the text field when it's empty.

```html {.example}
<quiet-number-field 
  type="email"
  label="Email"
  placeholder="you@example.com"
  style="max-width: 200px;"
></quiet-number-field>
```

### Filled and unstyled number fields

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the text field's appearance.

```html {.example}
<quiet-number-field appearance="normal" label="Normal text field" placeholder="Enter some text" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field appearance="filled" label="Filled text field" placeholder="Enter some text" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field appearance="unstyled" label="Unstyled text field" placeholder="Enter some text" style="max-width: 200px;"></quiet-number-field>
```

### Pill-shaped number fields

Text fields can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-number-field pill label="Pill-shaped" style="max-width: 200px;"></quiet-number-field>
```

### Changing the size

Use the `size` attribute to change the text field's size.

```html {.example}
<quiet-number-field size="xs" label="Extra small" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field size="sm" label="Small" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field size="md" label="Medium" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field size="lg" label="Large" style="max-width: 200px;"></quiet-number-field><br>
<quiet-number-field size="xl" label="Extra large" style="max-width: 200px;"></quiet-number-field>
```

### Disabling

Use the `disabled` attribute to disable the text field.

```html {.example}
<quiet-number-field label="Disabled" disabled style="max-width: 200px;"></quiet-number-field>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the text field. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-number-field
  class="quiet-side-label"
  style="--label-width: 8ch;"
  name="name" 
  label="Name" 
  description="What do people call you?"
  style="max-width: 200px;"
></quiet-number-field>
<br>
<quiet-number-field
  class="quiet-side-label"
  style="--label-width: 8ch;"
  type="email" 
  name="email" 
  label="Email" 
  description="How can we get in touch?"
  style="max-width: 200px;"
></quiet-number-field>
```

### Validation

A number of attributes can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). These include `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, and `step`. They work exactly like their native counterparts.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-number-field name="required" label="Required" required style="max-width: 200px;"></quiet-number-field><br>
  <quiet-number-field name="minlength" label="Minimum length (enter at least five characters)" required minlength="5" style="max-width: 200px;"></quiet-number-field><br>
  <quiet-number-field name="maxlength" label="Maximum length (enter no more than five characters)" required maxlength="5" style="max-width: 200px;"></quiet-number-field><br>
  <quiet-number-field name="pattern" label="Pattern (enter three to five letters)" required pattern="[A-Za-z]{3,5}" style="max-width: 200px;"></quiet-number-field><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the text field invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="number-field__custom-validation">
  <quiet-number-field 
    name="name"
    label="Name"
    description="This field will be invalid until custom validation is removed"
    style="max-width: 200px;"
  ></quiet-number-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('number-field__custom-validation');
  const textField = form.querySelector('quiet-number-field');

  textField.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid text fields using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="number-field__validation-pseudo">
  <quiet-number-field 
    name="name"
    label="Name"
    description="This field is required"
    required
    style="max-width: 200px;"
  ></quiet-number-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .number-field__validation-pseudo {
    quiet-number-field:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-number-field:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="number-field__validation-custom">
  <quiet-number-field 
    name="name"
    label="Name"
    description="This field is required"
    required
    style="max-width: 200px;"
  ></quiet-number-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .number-field__validation-custom {
    quiet-number-field:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-number-field:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
