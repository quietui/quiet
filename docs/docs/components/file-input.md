---
title: File Input
layout: component
---

```html {.example}
<form id="file-input__overview" enctype="multipart/form-data" method="post" action="about:blank" target="_blank">
  <quiet-file-input 
    name="file"
    label="Select a file" 
    description="Files must be 20MB or less"
    multiple
  ></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Upload</quiet-button>
</form>

<script>
  const form = document.getElementById('file-input__overview');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(...formData.values());
  });
</script>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the file input. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-file-input 
  name="file"
  label="Select a file" 
>
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-file-input>
```

### Accepting multiple files

Add the `multiple` attribute to allow the file input to accept more than one file.

```html {.example}
<quiet-file-input 
  name="file" 
  label="Upload your cat's vet records" 
  multiple
>
</quiet-file-input>
```

### Accepting file types

To limit the file input to certain file types, set the `accept` attribute to a comma-separated string of [unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).

```html {.example}
<quiet-file-input 
  name="file" 
  label="Upload a picture of your cat" 
  accept="image/jpeg, image/png, image/gif, image/webp"
>
</quiet-file-input>
```

### Changing the size

```html {.example}
<quiet-file-input size="xs" name="xs" label="Extra small"></quiet-file-input><br>
<quiet-file-input size="sm" name="sm" label="Small"></quiet-file-input><br>
<quiet-file-input size="md" name="md" label="Medium"></quiet-file-input><br>
<quiet-file-input size="lg" name="lg" label="Large"></quiet-file-input><br>
<quiet-file-input size="xl" name="xl" label="Extra large"></quiet-file-input>
```

### Custom dropzone content

Use the `dropzone` slot to customize what appears inside the dropzone.

```html {.example}
<quiet-file-input name="file" label="Select a file">
  <div slot="dropzone">
    <quiet-icon name="cloud-upload" style="font-size: 2rem;"></quiet-icon>
    <br>
    Send it to the cloud
  </div>
</quiet-file-input>
```

### Validating file inputs

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until the user has selected a file.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-file-input name="file" label="Select a file" required></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `custom-validity` attribute to make the file input invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-file-input 
    name="file" 
    label="Select a file" 
    custom-validity="Not so fast, bubba!" 
    required
  ></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Styling validation

You can style valid and invalid file inputs using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="file-input__validation-pseudo">
  <quiet-file-input name="file" label="Select a file" required></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .file-input__validation-pseudo {
    quiet-file-input:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-file-input:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="file-input__validation-custom">
  <quiet-file-input name="file" label="Select a file" required></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .file-input__validation-custom {
    quiet-file-input:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-file-input:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
