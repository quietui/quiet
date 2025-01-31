---
title: Switch
layout: component
---

```html {.example}
<quiet-switch name="mode" value="kitten">Kitten mode</quiet-switch>
```

## Examples

### Checked initially

Add the `checked` attribute to check the switch initially.

```html {.example}
<quiet-switch name="mode" value="kitten" checked>Kitten mode</quiet-switch>
```

## Adding inner labels

Use the `on` and `off` slots to show inner labels or icons that align with the switch's checked state. Space is very limited, so make sure the labels are short enough to fit.

```html {.example .flex-col}
<quiet-switch name="mode" value="kitten">
  Kitten mode
  <span slot="on-label">on</span>
  <span slot="off-label">off</span>
</quiet-switch>

<quiet-switch name="mode" value="kitten">
  Kitten mode
  <quiet-icon slot="on-label" name="check" label="On"></quiet-icon>
  <quiet-icon slot="off-label" name="x" label="Off"></quiet-icon>
</quiet-switch>
```

### Changing the size

Use the `size` attribute to change the text field's size.

```html {.example .flex-col}
<quiet-switch size="xs">Extra small</quiet-switch>
<quiet-switch size="sm">Small</quiet-switch>
<quiet-switch size="md">Medium</quiet-switch>
<quiet-switch size="lg">Large</quiet-switch>
<quiet-switch size="xl">Extra large</quiet-switch>
```

### Disabling

Use the `disabled` attribute to disable the switch.

```html {.example .flex-col}
<quiet-switch disabled>Unchecked and disabled</quiet-switch><br>
<quiet-switch checked disabled>Checked and disabled</quiet-switch>
```

### Validation

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until the switch is checked.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-switch name="sleep" value="zzz" required>Sleep mode</quiet-switch>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `custom-validity` attribute to make the switch invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-switch name="sleep" value="zzz" required custom-validity="Have you taken a nap first?">Sleep mode</quiet-switch>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of the `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::

### Styling validation

You can style valid and invalid switches using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="switch__validation-pseudo">
  <quiet-switch name="sleep" value="zzz" required>Sleep mode</quiet-switch>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .switch__validation-pseudo {
    quiet-switch:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-switch:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="switch__validation-custom">
  <quiet-switch name="sleep" value="zzz" required>Sleep mode</quiet-switch>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .switch__validation-custom {
    quiet-switch:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-switch:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
