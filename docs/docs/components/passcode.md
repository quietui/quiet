---
title: Passcode
layout: component
---

```html {.example}
<quiet-passcode 
  name="code"
  label="Authorization code"
  description="Open your authenticator app to get the code."
  format="### ###"
></quiet-passcode>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the passcode. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-passcode name="code" label="Verification code">
  <span slot="description">
    If you can't access the code, you can <a href="https://example.com/" target="_blank">reset your account</a>.
  </span>
</quiet-passcode>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the passcode field.

```html {.example}
<quiet-passcode name="code" label="Verify PIN" value="5309"></quiet-passcode>
```

### Changing the input type

By default, only numbers are allowed in passcodes. To change this, set the `type` attribute to `alpha`, `alphanumeric`, or `any` to allow all characters. The component's [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) will be set automatically based on the type.

```html {.example}
<quiet-passcode label="Letters only" type="alpha"></quiet-passcode><br>
<quiet-passcode label="Letters and numbers" type="alphanumeric"></quiet-passcode><br>
<quiet-passcode label="Any character" type="any"></quiet-passcode>
```

### Changing the format

The `format` attribute dictates how many characters are allowed and where delimiters are shown. Use `#` to represent an allowed character. Use space, dash, or any other character to show a delimiter. Delimiters will not be included in the submitted value.

```html {.example}
<quiet-passcode label="Verification code" format="### ###" name="code"></quiet-passcode><br>
<quiet-passcode label="Super secret code" format="##–####" name="code"></quiet-passcode>
```

### Case sensitivity

For alpha and alphanumeric passcodes, the value is shown in uppercase letters by default. To allow case sensitivity, add the `case-sensitive` attribute. In both cases, the value will be submitted as it was entered by the user.

```html {.example}
<quiet-passcode 
  label="Case sensitive"
  type="alphanumeric"
  format="######"
  case-sensitive
></quiet-passcode>
```

### Masking the value

Add the `masked` attribute to prevent the value from being shown on screen.

```html {.example}
<quiet-passcode label="Masked" masked value="1234"></quiet-passcode>
```

### Filled and unstyled passcodes

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the passcode's appearance.

```html {.example}
<quiet-passcode appearance="normal" label="Normal passcode"></quiet-passcode><br>
<quiet-passcode appearance="filled" label="Filled passcode"></quiet-passcode><br>
<quiet-passcode appearance="unstyled" label="Unstyled passcode"></quiet-passcode>
```

### Changing the size

Use the `size` attribute to change the passcode's size.

```html {.example}
<quiet-passcode size="xs" label="Extra small"></quiet-passcode><br>
<quiet-passcode size="sm" label="Small"></quiet-passcode><br>
<quiet-passcode size="md" label="Medium"></quiet-passcode><br>
<quiet-passcode size="lg" label="Large"></quiet-passcode><br>
<quiet-passcode size="xl" label="Extra large"></quiet-passcode>
```

### Disabling

Use the `disabled` attribute to disable the passcode.

```html {.example}
<quiet-passcode label="Disabled" disabled></quiet-passcode>
```

### Validation

A couple attributes can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). These include `required` and `pattern`. They work exactly like their native counterparts.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-passcode 
    name="required" 
    label="Required" 
    description="The code must be filled in completely."
    required
  ></quiet-passcode><br>
  <quiet-passcode 
    name="pattern" 
    label="Pattern" 
    description="The code must start with a letter and end with numbers."
    type="alphanumeric" 
    required 
    pattern="[A-Za-z]{1}[0-9]{3}" 
    format="#–###"
  ></quiet-passcode><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

:::info
passcodes are fixed-length, so setting `required` will ensure that the field is not empty and contains the correct number of characters before submitting.
:::

### Using custom validation

Use the `setCustomValidity()` method to make the passcode invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="passcode__custom-validation">
  <quiet-passcode
    name="code"
    label="Authorization code"
    description="This field will be invalid until custom validation is removed"
  ></quiet-passcode>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('passcode__custom-validation');
  const passcode = form.querySelector('quiet-passcode');

  passcode.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid passcodes using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="passcode__validation-pseudo">
  <quiet-passcode
    name="name"
    label="Authorization code"
    description="This field is required"
    required
  ></quiet-passcode>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .passcode__validation-pseudo {
    quiet-passcode:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-passcode:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="passcode__validation-custom">
  <quiet-passcode
    name="name"
    label="Authorization code"
    description="This field is required"
    required
  ></quiet-passcode>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .passcode__validation-custom {
    quiet-passcode:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-passcode:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

### Styling passcodes

Passcodes are styled like form controls for consistency, but feel free to customize them to your liking. Here's an example using a [card](/docs/components/card) and some custom CSS.

```html {.example}
<quiet-card class="passcode__centered">
  <quiet-passcode 
    name="code"
    label="Access code"
    description="Enter the code we just texted you."
    format="### ###"
    class=""
  ></quiet-passcode>
  <quiet-button variant="primary">Submit</quiet-button>
</quiet-card>

<style>
  quiet-card.passcode__centered {
    max-width: 360px;
    margin-inline: auto;

    &::part(body) {
      padding: 2.5rem 3rem 3rem 3rem;
    }

    quiet-passcode {
      text-align: center;
      margin-block-end: 3rem;

      &::part(label) {
        max-width: none;
        font-size: 2rem;
      }

      &::part(description) {
        margin-block-end: 2rem;
      }

      &::part(visual-box) {
        margin-inline: auto;
      }
    }

    quiet-button {
      width: 100%;
    }
  }
</style>
```