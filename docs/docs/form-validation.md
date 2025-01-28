---
title: Form validation
description: Learn how to validate forms using Quiet's form controls.
layout: docs
---

Quiet form controls are built on top of the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation), allowing them to work seamlessly with native form validation. This means you can use most standard HTML validation attributes and access validation states and methods similar to how you would with native form controls.

## Basic validation

The simplest way to validate a form control is with HTML validation attributes. For example, you can make a text field required by adding the `required` attribute.

```html {.example .no-buttons}
<form action="about:blank" target="_blank">
  <quiet-text-field
    name="username"
    label="Username"
    required
    style="margin-block-end: 1rem;"
  ></quiet-text-field>
  <quiet-button type="submit">Submit</quiet-button>
</form>
```

Each component defines its own validation attributes, but the most common ones include:

- `required` - Makes the field required
- `pattern` - Validates against a regular expression
- `minlength` + `maxlength` - Sets minimum and maximum length requirements
- `min` + `max` - Sets minimum and maximum value requirements
- `step` - Controls value increments
- `type` - Validates against a specific input type (e.g. email, url, number)

Refer to each component's documentation for a complete list of supported attributes.

## Custom validation messages

While browsers provide default validation messages, you can customize them using the `setCustomValidity()` method, just like native form controls.

```html {.example .no-buttons}
<form action="about:blank" target="_blank">

  <quiet-text-field
    id="password"
    name="password"
    label="Password"
    required
    minlength="8"
    style="margin-block-end: 1rem;"
  ></quiet-text-field>

  <quiet-button type="submit">Submit</quiet-button>
</form>

<script type="module">
  const password = document.querySelector('#password');

  await customElements.whenDefined('quiet-text-field');

  password.setCustomValidity('The cats will not be happy until your password is at least 8 characters');
</script>
```

:::info
Remember to clear the custom validity message by calling `setCustomValidity('')` when the input becomes valid, otherwise the field will remain invalid and won't allow the form to submit.
:::

## Validation states

Form controls have [various states](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) that reflect their validation status. You can use these states for styling or to provide feedback to users.

```html
<quiet-text-field
  id="email"
  name="email"
  label="Email"
  type="email"
  required
></quiet-text-field>

<script>
  const email = document.querySelector('#email');

  // Check if the field is valid
  console.log(email.validity.valid);

  // Check specific validation states
  console.log(email.validity.valueMissing); // is required but empty
  console.log(email.validity.typeMismatch); // doesn't match type="email"
</script>
```

:::info
Validation states are updated automatically as the user interacts with the form control. You can also trigger validation programmatically using the [`reportValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity) method. To check validity without showing the browser's error message, [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity) instead.
:::

## Styling validation

Quiet form controls expose custom states you can target with CSS. These states make it easy to style controls based on their current state.

```html {.example .no-buttons}
<form action="about:blank" target="_blank" id="example__styling">
  <quiet-text-field
    name="email"
    label="Email"
    type="email"
    placeholder="Enter a value and blur the field"
    required
    id="example__styling"
  ></quiet-text-field>
  <quiet-button type="submit">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  #example__styling {
    quiet-text-field:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-field:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-text-field {
      margin-block-end: 1rem;
    }
  }
</style>
```

The following pseudo-classes are available to style all form controls.

- `:valid` - Applied immediately and always when the control is valid.
- `:invalid` - Applied immediately and always when the control is invalid.

You can also use various custom states, which must be wrapped in the [`:state()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:state) selector. Here are some examples, but remember that not all components implement all of these states, so please refer to the respective component's documentation.

- `:state(disabled)` - Applied when the control is disabled
- `:state(blank)` - Applied when the control has a blank value
- `:state(focused)` - Applied when the control has focus
- `:state(user-valid)` - Applied when the control is valid and the user has interacted with it
- `:state(user-invalid)` - Applied when the control is invalid and the user has interacted with it

:::info
The `user-valid` and `user-invalid` states are only applied after user interaction to prevent premature validation feedback.
:::

## Validating entire forms

To validate an entire form, you can use the form's `checkValidity()` method. This will trigger validation on all form controls within the form, including Quiet and native elements.

```html {.example .no-buttons}
<form action="about:blank" target="_blank" id="signup-form">
  <quiet-text-field
    name="username"
    label="Username"
    required
    style="margin-block-end: 1rem;"
  ></quiet-text-field>

  <quiet-text-field
    name="email"
    label="Email"
    type="email"
    required
    style="margin-block-end: 1rem;"
  ></quiet-text-field>

  <quiet-button type="submit">
    Sign up
  </quiet-button>
</form>

<script>
  const form = document.querySelector('#signup-form');

  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault();
    }
  });
</script>
```
