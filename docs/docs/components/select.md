---
title: Select
layout: component
---

This component works very similar to the `<select>` element. You can add `<option>`, `<optgroup>`, and `<hr>` elements to it to group and provide options, which are then copied into the component's shadow root.

```html {.example}
<quiet-select 
  name="cat" 
  label="Wild cats" 
  description="Select your favorite type of cat from the wild"
>
  <optgroup label="Small cats">
    <option value="bobcat">Bobcat</option>
    <option value="sand-cat">Sand cat</option>
    <option value="serval">Serval</option>
  </optgroup>
  <optgroup label="Big cats">
    <option value="cheetah">Cheetah</option>
    <option value="lion">Lion</option>
    <option value="tiger">Tiger</option>
  </optgroup>
</quiet-select>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the select. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-select name="zzz" label="Where to sleep">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
  <option value="box">Cardboard box</option>
  <option value="floor">Floor</option>
  <option value="laundry">Laundry</option>
  <option value="pillow">Pillow</option>
  <option value="sunbeam">Sunbeam</option>  
</quiet-select>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the select.

```html {.example}
<quiet-select name="size" label="Select a size" value="md">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select>
```

:::info
This behavior is different from native selects that use the option's `selected` attribute to set the value. With `<quiet-select>`, always use the `value` attribute to set the value.
:::

### Start and end content

Use the `start` and `end` slots to add presentational icons or text. Avoid interactive elements such as buttons, links, etc. Works well with [`<quiet-icon>`](/docs/components/icon) and `<svg>` elements.

```html {.example}
<quiet-select name="account" label="Account type">
  <quiet-icon slot="start" name="user"></quiet-icon>
  <option value="owner">Owner</option>
  <option value="admin">Administrator</option>
  <option value="user">User</option>
  <option value="guest">Guest</option>
</quiet-select>

<br>

<quiet-select name="contact" label="Preferred method of contact">
  <quiet-icon slot="end" name="mail"></quiet-icon>
  <option value="email">Email</option>
  <option value="phone">Phone</option>
  <option value="mail">Regular Mail</option>
  <option value="text">Text Message</option>
  <option value="none">None</option>
</quiet-select>
```

### Filled and unstyled selects

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the select's appearance.

```html {.example}
<quiet-select appearance="normal" label="Normal select" value="normal">
  <option value="normal">Normal</option>
  <option value="filled">Filled</option>
  <option value="unstyled">Unstyled</option>
</quiet-select><br>

<quiet-select appearance="filled" label="Filled select" value="filled">
  <option value="normal">Normal</option>
  <option value="filled">Filled</option>
  <option value="unstyled">Unstyled</option>
</quiet-select><br>

<quiet-select appearance="unstyled" label="Unstyled select" value="unstyled">
  <option value="normal">Normal</option>
  <option value="filled">Filled</option>
  <option value="unstyled">Unstyled</option>
</quiet-select>
```

### Pill-shaped selects

Selects can be rendered with pill-shaped edges by adding the `pill` attribute.

```html {.example}
<quiet-select pill label="Pill-shaped">
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</quiet-select>
```

### Changing the size

Use the `size` attribute to change the select's size.

```html {.example}
<quiet-select size="xs" label="Extra small" value="xs">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select><br>

<quiet-select size="sm" label="Small" value="sm">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select><br>

<quiet-select size="md" label="Medium" value="md">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select><br>

<quiet-select size="lg" label="Large" value="lg">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select><br>

<quiet-select size="xl" label="Extra large" value="xl">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select>
```

### Adding option groups

Use `<optgroup>` elements to add option groups. Set the `label` attribute to an appropriate label.

```html {.example}
<quiet-select name="cat" label="Wild cats">
  <optgroup label="Small cats">
    <option value="bobcat">Bobcat</option>
    <option value="sand-cat">Sand cat</option>
    <option value="serval">Serval</option>
  </optgroup>
  <optgroup label="Big cats">
    <option value="cheetah">Cheetah</option>
    <option value="lion">Lion</option>
    <option value="tiger">Tiger</option>
  </optgroup>
</quiet-select>
```

### Adding dividers

Use `<hr>` to add dividers between options.

```html {.example}
<quiet-select name="animal" label="Animal">
  <option value="bird">Bird</option>
  <option value="cat">Cat</option>
  <option value="dog">Dog</option>
  <option value="lizard">Lizard</option>
  <hr>
  <option value="other">Other</option>
</quiet-select>
```

### Disabling options

Use the `disabled` attribute to disable individual options.

```html {.example}
<quiet-select label="Disabled options">
  <option value="bird">Bird</option>
  <option value="cat">Cat</option>
  <option value="dog" disabled>Dog</option>
  <option value="lizard">Lizard</option>
</quiet-select>
```

### Disabling option groups

Use the `disabled` attribute to disable an option group.

```html {.example}
<quiet-select label="Disabled option groups">
  <optgroup label="Group one">
    <option value="morning-1">Morning</option>
    <option value="afternoon-1">Afternoon</option>
    <option value="evening-1">Evening</option>
  </optgroup>
  <optgroup label="Group two" disabled>
    <option value="morning-2">Morning</option>
    <option value="afternoon-2">Afternoon</option>
    <option value="evening-2">Evening</option>
  </optgroup>
</quiet-select>
```

:::warn
Disabled option groups [don't currently work](https://bugs.webkit.org/show_bug.cgi?id=227042) in iOS Safari.
:::

### Disabling selects

Use the `disabled` attribute to disable the select.

```html {.example}
<quiet-select label="Disabled" disabled>
  <option value="bird">Bird</option>
  <option value="cat">Cat</option>
  <option value="dog">Dog</option>
  <option value="lizard">Lizard</option>
</quiet-select>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#showing-labels-on-the-side) utility, you can show labels on the side instead of on top of the select. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-select 
  class="quiet-side-label" 
  style="--label-width: 8ch;"
  name="quantity" 
  label="Quantity" 
  description="How many do you need?"
>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</quiet-select>
<br>
<quiet-select 
  class="quiet-side-label" 
  style="--label-width: 8ch;"
  name="delivery" 
  label="Delivery" 
  description="How soon do you need it?"
>
  <option value="next">Next-day</option>
  <option value="priority">Priority</option>
  <option value="ground">Ground</option>
</quiet-select>
```

### Validation

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until an option with a non-empty value is selected.


```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-select name="required" label="Required" required>
    <option value=""></option>
    <option value="bird">Bird</option>
    <option value="cat">Cat</option>
    <option value="dog">Dog</option>
    <option value="lizard">Lizard</option>
  </quiet-select>
  <br>
  <quiet-button type="submit">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the select invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="select__custom-validation">
  <quiet-select 
    name="animal"
    label="Animal"
    description="This field will be invalid until custom validation is removed"
  >
    <option value="bird">Bird</option>
    <option value="cat">Cat</option>
    <option value="dog">Dog</option>
    <option value="lizard">Lizard</option>
  </quiet-select>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('select__custom-validation');
  const select = form.querySelector('quiet-select');

  select.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid selects using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="select__validation-pseudo">
  <quiet-select 
    name="animal"
    label="Animal"
    description="This field is required"
    required
  >
    <option value=""></option>
    <option value="bird">Bird</option>
    <option value="cat">Cat</option>
    <option value="dog">Dog</option>
    <option value="lizard">Lizard</option>
  </quiet-select>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .select__validation-pseudo {
    quiet-select:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-select:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="select__validation-custom">
  <quiet-select 
    name="animal"
    label="Animal"
    description="This field is required"
    required
  >
    <option value=""></option>
    <option value="bird">Bird</option>
    <option value="cat">Cat</option>
    <option value="dog">Dog</option>
    <option value="lizard">Lizard</option>
  </quiet-select>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .select__validation-custom {
    quiet-select:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-select:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```