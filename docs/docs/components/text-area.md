---
title: Text Area
layout: component
---

```html {.example}
<quiet-text-area name="feedback" label="Feedback"></quiet-text-area>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the text area. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-text-area name="feedback" label="Feedback">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-text-area>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the text area.

```html {.example}
<quiet-text-area name="feedback" label="Feedback" value="This is the greatest and best song in the world."></quiet-text-area>
```

### Adding a placeholder

Use the `placeholder` attribute to show a placeholder in the text area when it's empty.

```html {.example}
<quiet-text-area 
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself"
></quiet-text-area>
```

### Changing the number of rows

Use the `rows` attribute to set the default number of text rows.

```html {.example}
<quiet-text-area label="One row" rows="1"></quiet-text-area><br>
<quiet-text-area label="Five rows" rows="5"></quiet-text-area>
```

### Resizing to fit content

Text areas can grow with their content by setting the `resize` property to `auto`. The minimum number of rows is determine by the `rows` attribute.

```html {.example}
<quiet-text-area label="Resizing to fit" resize="auto"></quiet-text-area>
```

### Filled and unstyled text areas

Set the `variant` attribute to `normal`, `filled`, or `unstyled` to change the text area's appearance.

```html {.example}
<quiet-text-area variant="normal" label="Normal text field" placeholder="Enter some text"></quiet-text-area><br>
<quiet-text-area variant="filled" label="Filled" placeholder="Enter some text"></quiet-text-area><br>
<quiet-text-area variant="unstyled" label="Unstyled" placeholder="Enter some text"></quiet-text-area>
```

### Changing the size

Use the `size` attribute to change the text area's size.

```html {.example}
<quiet-text-area size="xs" label="Extra small"></quiet-text-area><br>
<quiet-text-area size="sm" label="Small"></quiet-text-area><br>
<quiet-text-area size="md" label="Medium"></quiet-text-area><br>
<quiet-text-area size="lg" label="Large"></quiet-text-area><br>
<quiet-text-area size="xl" label="Extra large"></quiet-text-area>
```

### Disabling text areas

Use the `disabled` attribute to disable the text area.

```html {.example}
<quiet-text-area label="Disabled" disabled></quiet-text-area>
```

### Showing labels on the side

With a bit of custom CSS, you can show labels on the side instead of on top of the text area.

```html {.example}

<div class="text-area__side-labels">
  <quiet-text-area name="name" label="Feedback" description="Let us know what you think"></quiet-text-area>
</div>

<style>
  .text-area__side-labels {
    quiet-text-area {
      --label-width: 6rem; /* Change this to make more room for the label */

      display: grid;
      grid: auto / var(--label-width) 1fr;
      gap: .25em;
      align-items: center;    
    }

    quiet-text-area::part(label) {
      text-align: end;
    }

    quiet-text-area::part(description) {
      grid-column-start: 2;
      order: 3;
    }
  }
</style>
```

### Validating text areas

A number of attributes can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). These include `required`, `minlength`, and `maxlength`. They work exactly like their native counterparts.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-text-area name="required" label="Required" required></quiet-text-area><br>
  <quiet-text-area name="minlength" label="Minimum length (enter at least five characters)" required minlength="5"></quiet-text-area><br>
  <quiet-text-area name="maxlength" label="Maximum length (enter no more than five characters)" required maxlength="5"></quiet-text-area><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `custom-validity` attribute to make the text area invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-text-area 
    name="feedback"
    label="Feedback"
    description="This field will be invalid until the custom-validity attribute is removed"
    custom-validity="Not so fast, bubba!"
  ></quiet-text-area>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of a `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::

### Styling validation

You can style valid and invalid text area using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="text-area__validation-pseudo">
  <quiet-text-area 
    name="feedback"
    label="Feedback"
    description="This field is required"
    required
  ></quiet-text-area>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .text-area__validation-pseudo {
    quiet-text-area:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-area:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="text-area__validation-custom">
  <quiet-text-area 
    name="feedback"
    label="Feedback"
    description="This field is required"
    required
  ></quiet-text-area>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .text-area__validation-custom {
    quiet-text-area:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-area:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```