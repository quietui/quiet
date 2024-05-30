---
title: Checkbox
layout: component
---

```html {.example}
<quiet-checkbox name="feed" value="yes">I will feed the cats</quiet-checkbox>
```

## Examples

### Checked initially

Add the `checked` attribute to check the checkbox initially.

```html {.example}
<quiet-checkbox name="feed" value="yes" checked>I will feed the cats</quiet-checkbox>
```

### Filled and unstyled checkboxes

Set the `variant` attribute to `normal` or `filled` to change the checkbox's appearance.

```html {.example}
<quiet-checkbox variant="normal">Normal checkbox</quiet-checkbox>
<br>
<quiet-checkbox variant="filled">Filled checkbox</quiet-checkbox>
```

### Changing the size

Use the `size` attribute to change the checkbox's size.

```html {.example}
<quiet-checkbox size="xs">Extra small</quiet-checkbox><br>
<quiet-checkbox size="sm">Small</quiet-checkbox><br>
<quiet-checkbox size="md">Medium</quiet-checkbox><br>
<quiet-checkbox size="lg">Large</quiet-checkbox><br>
<quiet-checkbox size="xl">Extra large</quiet-checkbox>
```

### Indeterminate checkboxes

Use the `indeterminate` attribute to put the checkbox in an indeterminate state. This can be used to show a mixed selection in a group of "child" checkboxes.

```html {.example}
<quiet-checkbox indeterminate>Indeterminate</quiet-checkbox>
```

### Disabling checkboxes

Use the `disabled` attribute to disable the checkbox.

```html {.example}
<quiet-checkbox disabled>Unchecked and disabled</quiet-checkbox><br>
<quiet-checkbox checked disabled>Checked and disabled</quiet-checkbox><br>
<quiet-checkbox indeterminate disabled>Indeterminate and disabled</quiet-checkbox>
```

### Validating checkboxes

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until the checkbox is checked.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-checkbox name="feed" value="yes" required>I will feed the cats</quiet-checkbox>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `custom-validity` attribute to make the checkbox invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-checkbox name="feed" value="yes" required custom-validity="Don't forget to clean the litter box!">I will feed the cats</quiet-checkbox>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of a `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::

### Styling validation

You can style valid and invalid checkboxes using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="checkbox__validation-pseudo">
  <quiet-checkbox name="feed" value="yes" required>I will feed the cats</quiet-checkbox>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .checkbox__validation-pseudo {
    quiet-checkbox:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-checkbox:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="checkbox__validation-custom">
  <quiet-checkbox name="feed" value="yes" required>I will feed the cats</quiet-checkbox>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .checkbox__validation-custom {
    quiet-checkbox[data-state-user-valid] {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-checkbox[data-state-user-invalid] {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```