---
title: Text Field
layout: component
---

```html {.example}
<quiet-text-field name="name" label="Name" type="number"></quiet-text-field>
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
<quiet-text-field name="name" label="Name" value="Bobby McGee"></quiet-text-field>
```

### Changing the type

Text fields support more than just text. Use the `type` attribute to change the type of input they accept.

```html {.example}
<quiet-text-field type="color" label="Color" value="#787acf"></quiet-text-field><br>
<quiet-text-field type="date" label="Date" value="1989-03-12"></quiet-text-field><br>
<quiet-text-field type="number" label="Amount" value="42"></quiet-text-field><br>
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

To add a clear button to the text field, use the `clearable` attribute. The `quiet-input` event will be emitted when the clear button is activated.

```html {.example}
<quiet-text-field 
  name="name" 
  label="Name" 
  value="Bobby McGee"
  clearable
></quiet-text-field>
```

### Start and end content

Use the `start` and `end` slots to add presentational icons or text. Avoid interactive elements such as buttons, links, etc. Works well with [`<quiet-icon>`](/docs/components/icon) and `<svg>` elements.

```html {.example}
<quiet-text-field name="search" label="Search">
  <quiet-icon slot="start" name="magnifying-glass"></quiet-icon>
</quiet-text-field>

<br>

<quiet-text-field type="email" name="email" label="Email">
  <quiet-icon slot="end" name="envelope"></quiet-icon>
</quiet-text-field>

<br>

<quiet-text-field type="url" name="url" label="URL">
  <span slot="start">https://</span>
</quiet-text-field>
```

### Filled and unstyled text fields

Set the `variant` attribute to `filled` or `unstyled` to change the text field's appearance.

```html {.example}
<quiet-text-field variant="filled" label="Filled" placeholder="Enter some text"></quiet-text-field>
<br>
<quiet-text-field variant="unstyled" label="Unstyled" placeholder="Enter some text"></quiet-text-field>
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

### Disabling text fields

Use the `disabled` attribute to disable the text field.

```html {.example}
<quiet-text-field label="Disabled" disabled></quiet-text-field>
```

### Showing labels on the side

With a bit of custom CSS, you can show labels on the side instead of on top of the text field.

```html {.example}

<div class="text-field__side-labels">
  <quiet-text-field name="name" label="Name" description="What do people call you?"></quiet-text-field>
  <br>
  <quiet-text-field type="email" name="email" label="Email" description="How can we get in touch?"></quiet-text-field>
</div>

<style>
  .text-field__side-labels {
    quiet-text-field {
      --label-width: 4.5rem; /* Change this to make more room for the label */

      display: grid;
      grid: auto / var(--label-width) 1fr;
      gap: .25em;
      align-items: center;    
    }

    quiet-text-field::part(label) {
      text-align: end;
    }

    quiet-text-field::part(description) {
      grid-column-start: 2;
      order: 3;
    }
  }
</style>
```

### Validating text fields

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

Use the `custom-validity` attribute to make the text field invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-text-field 
    name="name"
    label="Name"
    description="This field will be invalid until the custom-validity attribute is removed"
    custom-validity="Not so fast, bubba!"
  ></quiet-text-field>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of a `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::


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
    quiet-text-field[data-state-user-valid] {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-field[data-state-user-invalid] {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
