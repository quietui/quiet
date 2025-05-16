---
title: Number Field
layout: component
---

```html {.example}
<quiet-number-field 
  name="name" 
  label="Lives" 
  value="9"
  style="max-width: 200px;"
></quiet-number-field>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the text field. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-number-field name="name" label="Kitten age (months)" style="max-width: 200px;">
  <span slot="description">
    <a href="https://example.com/" target="_blank">How to determine age</a>
  </span>
</quiet-number-field>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the text field.

```html {.example}
<quiet-number-field 
  name="name" 
  label="Treats given today"
  value="9" style="max-width: 200px;"
>
</quiet-number-field>
```

### Setting min, max, and step

Use the `min` and `max` attributes to set a minimum and maximum value for the number field. Use the `step` attribute to change the granularity the value must adhere to.

```html {.example}
<quiet-number-field 
  name="donation" 
  label="Monthly shelter donation"
  description="Amount in dollars (5-100)"
  min="5"
  max="100"
  step="5"
  value="25"
  style="max-width: 200px;"
></quiet-number-field>
```

### Adding a placeholder

Use the `placeholder` attribute to show a placeholder in the text field when it's empty.

```html {.example}
<quiet-number-field 
  type="number"
  label="Weight"
  description="Measured in pounds"
  min="0"
  step="0.5"
  placeholder="10.5"
  style="max-width: 200px;"
></quiet-number-field>
```

### Start and end content

Use the `start` and `end` slots to add presentational icons or text. Avoid interactive elements such as buttons, links, etc. Works well with [`<quiet-icon>`](/docs/components/icon) and `<svg>` elements.

```html {.example}
<div style="max-width: 200px;">
  <quiet-number-field type="number" value="100" name="adoption" label="Adoption fee">
    <span slot="start">$</span>
  </quiet-number-field>  

  <br>

  <quiet-number-field type="number" value="30" name="playtime" label="Playtime minutes">
    <quiet-icon slot="end" name="clock"></quiet-icon>
  </quiet-number-field>

  <br>

  <quiet-number-field name="treats" value="2" label="Daily treats">
    <quiet-icon slot="start" name="cat"></quiet-icon>
    <quiet-icon slot="end" name="cookie"></quiet-icon>
  </quiet-number-field>
</quiet-number-field>
```

### Filled and unstyled number fields

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the text field's appearance.

```html {.example}
<div style="max-width: 200px;">
  <quiet-number-field appearance="normal" label="Normal number field" placeholder="Enter number" style="max-width: 200px;"></quiet-number-field><br>
  <quiet-number-field appearance="filled" label="Filled number field" placeholder="Enter number" style="max-width: 200px;"></quiet-number-field><br>
  <quiet-number-field appearance="unstyled" label="Unstyled number field" placeholder="Enter number" style="max-width: 200px;"></quiet-number-field>
</div>
```

### Pill-shaped number fields

Text fields can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-number-field pill label="Whiskers count" style="max-width: 200px;"></quiet-number-field>
```

### Without steppers

Add the `without-steppers` attribute to remove the stepper buttons.

```html {.example}
<quiet-number-field 
  name="name" 
  label="Purrs per minute" 
  value="25"
  without-steppers
  style="max-width: 200px;"
></quiet-number-field>
```

:::info
This will remove the stepper buttons, but keyboard users can still modify the value using the arrow keys.
:::

### Changing the size

Use the `size` attribute to change the text field's size.

```html {.example}
<div style="max-width: 200px;">
  <quiet-number-field size="xs" label="Hairball count (xs)"></quiet-number-field><br>
  <quiet-number-field size="sm" label="Meows per hour (sm)"></quiet-number-field><br>
  <quiet-number-field size="md" label="Zoomies today (md)"></quiet-number-field><br>
  <quiet-number-field size="lg" label="Treats budget (lg)"></quiet-number-field><br>
  <quiet-number-field size="xl" label="Seconds until empty bowl (xl)"></quiet-number-field>
</div>
```

### Disabling

Use the `disabled` attribute to disable the text field.

```html {.example}
<quiet-number-field label="Limit reached (no more cats!)" disabled style="max-width: 200px;"></quiet-number-field>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the text field. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<div style="max-width: 300px;">
  <quiet-number-field
    class="quiet-side-label"
    style="--label-width: 12ch;"
    name="name" 
    label="Age" 
    description="How old is your feline friend?"
  ></quiet-number-field>
  <br>
  <quiet-number-field
    class="quiet-side-label"
    style="--label-width: 12ch;"
    type="number" 
    name="email" 
    label="Weight" 
    description="In pounds, please be honest!"
  ></quiet-number-field>
</div>
```

### Validation

A number of attributes can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). These include `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, and `step`. They work exactly like their native counterparts.

```html {.example}
<form action="about:blank" method="get" target="_blank" style="max-width: 200px;">
  <quiet-number-field name="required" label="Number of cats" required></quiet-number-field><br>
  <quiet-number-field name="min" label="Minimum cats (min 3)" required min="3"></quiet-number-field><br>
  <quiet-number-field name="max" label="Maximum cats (max 10)" required max="10"></quiet-number-field><br>
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
    label="Happiness level (1-10)"
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
    label="Toy budget"
    description="Must be at least $50"
    min="50"
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
    label="Cat videos watched"
    description="Be honest…"
    required
    style="max-width: 200px;"
    value="1000"
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