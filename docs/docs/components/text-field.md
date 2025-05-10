---
title: Text Field
layout: component
---

```html {.example}
<quiet-text-field name="name" label="Name"></quiet-text-field>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the text field. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-text-field name="name" label="Name">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-text-field>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the text field.

```html {.example}
<quiet-text-field name="name" label="Name" value="Meowy McGee"></quiet-text-field>
```

### Changing the type

Text fields support more than just text. Use the `type` attribute to change the type of input they accept.

```html {.example}
<quiet-text-field type="color" label="Color" value="#787acf"></quiet-text-field><br>
<quiet-text-field type="date" label="Date" value="1989-03-12"></quiet-text-field><br>
<quiet-text-field type="time" label="Time" value="12:00:00"></quiet-text-field><br>
<quiet-text-field type="number" label="Number" value="42" inputmode="numeric"></quiet-text-field><br>
<quiet-text-field type="password" label="Password" value="hunter2"></quiet-text-field>
```

### Adding a placeholder

Use the `placeholder` attribute to show a placeholder in the text field when it's empty.

```html {.example}
<quiet-text-field 
  type="email"
  label="Email"
  placeholder="you@example.com"
></quiet-text-field>
```

### Adding a clear button

To add a clear button to the text field, use the `with-clear` attribute. The `quiet-input` event will be emitted when the clear button is activated.

```html {.example}
<quiet-text-field 
  name="name" 
  label="Name" 
  value="Meowy McGee"
  with-clear
></quiet-text-field>
```

### Start and end content

Use the `start` and `end` slots to add presentational icons or text. Avoid interactive elements such as buttons, links, etc. Works well with [`<quiet-icon>`](/docs/components/icon) and `<svg>` elements.

```html {.example}
<quiet-text-field name="search" label="Search">
  <quiet-icon slot="start" name="search"></quiet-icon>
</quiet-text-field>

<br>

<quiet-text-field type="email" name="email" label="Email">
  <quiet-icon slot="end" name="mail"></quiet-icon>
</quiet-text-field>

<br>

<quiet-text-field type="url" name="url" label="URL">
  <span slot="start">https://</span>
</quiet-text-field>
```

### Autocomplete

Slot a [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) into the text field's default slot to show a list of autocomplete options. Unlike native `<input>` elements, there's no need to provide a `list` attribute.

```html {.example}
<quiet-text-field label="Browser" name="browser">
  <datalist>
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Edge"></option>
    <option value="Opera"></option>
    <option value="Other"></option>
  </datalist>
</quiet-text-field>
```

### Filled and unstyled text fields

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the text field's appearance.

```html {.example}
<quiet-text-field appearance="normal" label="Normal text field" placeholder="Enter some text"></quiet-text-field><br>
<quiet-text-field appearance="filled" label="Filled text field" placeholder="Enter some text"></quiet-text-field><br>
<quiet-text-field appearance="unstyled" label="Unstyled text field" placeholder="Enter some text"></quiet-text-field>
```

### Pill-shaped text fields

Text fields can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-text-field pill label="Pill-shaped"></quiet-text-field>
```

### Changing the size

Use the `size` attribute to change the text field's size.

```html {.example}
<quiet-text-field size="xs" label="Extra small"></quiet-text-field><br>
<quiet-text-field size="sm" label="Small"></quiet-text-field><br>
<quiet-text-field size="md" label="Medium"></quiet-text-field><br>
<quiet-text-field size="lg" label="Large"></quiet-text-field><br>
<quiet-text-field size="xl" label="Extra large"></quiet-text-field>
```

### Disabling

Use the `disabled` attribute to disable the text field.

```html {.example}
<quiet-text-field label="Disabled" disabled></quiet-text-field>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the text field. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-text-field
  class="quiet-side-label"
  style="--label-width: 8ch;"
  name="name" 
  label="Name" 
  description="What do people call you?"
></quiet-text-field>
<br>
<quiet-text-field
  class="quiet-side-label"
  style="--label-width: 8ch;"
  type="email" 
  name="email" 
  label="Email" 
  description="How can we get in touch?"
></quiet-text-field>
```

### Validation

A number of attributes can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). These include `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, and `step`. They work exactly like their native counterparts.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-text-field name="required" label="Required" required></quiet-text-field><br>
  <quiet-text-field name="minlength" label="Minimum length (enter at least five characters)" required minlength="5"></quiet-text-field><br>
  <quiet-text-field name="maxlength" label="Maximum length (enter no more than five characters)" required maxlength="5"></quiet-text-field><br>
  <quiet-text-field name="pattern" label="Pattern (enter three to five letters)" required pattern="[A-Za-z]{3,5}"></quiet-text-field><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the text field invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="text-field__custom-validation">
  <quiet-text-field 
    name="name"
    label="Name"
    description="This field will be invalid until custom validation is removed"
  ></quiet-text-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('text-field__custom-validation');
  const textField = form.querySelector('quiet-text-field');

  textField.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid text fields using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="text-field__validation-pseudo">
  <quiet-text-field 
    name="name"
    label="Name"
    description="This field is required"
    required
  ></quiet-text-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .text-field__validation-pseudo {
    quiet-text-field:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-field:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="text-field__validation-custom">
  <quiet-text-field 
    name="name"
    label="Name"
    description="This field is required"
    required
  ></quiet-text-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .text-field__validation-custom {
    quiet-text-field:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-field:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
