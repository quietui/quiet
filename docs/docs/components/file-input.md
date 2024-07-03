---
title: File Input
layout: component
---

```html {.example}
<quiet-file-input 
  name="files"
  label="Select a file" 
  description="Files must be 20MB or less"
  multiple
></quiet-file-input>
```

:::info
This component works like a [native file input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file). Files can be posted to your server as multipart form data or you can access them via JavaScript for processing.
:::

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the file input. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-file-input name="file" label="Select a file">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-file-input>
```

### Uploading with forms

When uploading a file from a form, you'll probably want to add [`method="post"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method) and [`enctype="multipart/form-data"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype) to the form so the files will be sent to the server correctly.

```html {.example}
<form 
  id="file-input__uploading" 
  enctype="multipart/form-data" 
  method="post" 
  action="about:blank" 
  target="_blank"
>
  <quiet-file-input 
    name="files"
    label="Select some files" 
    description="Files must be 20MB or less"
    multiple
  ></quiet-file-input>
  <br>
  <quiet-button type="submit" variant="primary">Upload</quiet-button>
</form>

<script>
  const form = document.getElementById('file-input__uploading');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(...formData.values());
  });
</script>
```

### Working with files

Use the `files` property to get an array of selected files. Note the use of an array instead of a [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList), which allows you to add, modify, and remove files more easily than a native file input.

Try selecting a few files and then clicking each button.

```html {.example}
<quiet-file-input 
  id="file-input__accessing"
  name="files"
  label="Select some files" 
  description="Files must be 20MB or less"
  multiple
></quiet-file-input>
<br>
<quiet-button type="submit">Reverse</quiet-button>
<quiet-button type="submit">Clear</quiet-button>

<script>
  const fileInput = document.getElementById('file-input__accessing');
  const reverseButton = fileInput.nextElementSibling.nextElementSibling;
  const clearButton = reverseButton.nextElementSibling;

  // Reverse
  reverseButton.addEventListener('quiet-click', event => {
    fileInput.files = fileInput.files.toReversed();
  });

  // Clear
  clearButton.addEventListener('quiet-click', event => {
    fileInput.files = [];
  });
</script>
```

:::warn
The `files` property must be reassigned, not mutated! Avoid using functions that mutate the array, such as [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) and [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), because they won't trigger an update.
:::

### Accepting multiple files

Add the `multiple` attribute to allow the file input to accept more than one file.

```html {.example}
<quiet-file-input 
  name="files" 
  label="Select the files you want to upload" 
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
<quiet-file-input name="files" label="Upload a file" multiple>
  <div slot="dropzone">
    <quiet-icon name="cloud-upload" style="font-size: 2rem;"></quiet-icon>
    <br>
    Choose some files to send to the cloud
  </div>
</quiet-file-input>
```

### Button-only file inputs

Button-only file inputs aren't supported, but you can achieve this pattern with a button, a native `<input type="file">`, and a bit of JavaScript. If you're using [Quiet Restyle](/docs/restyle), you can use the `visually-hidden` utility class to hide the input.

```html {.example}
<quiet-button id="file-input__button-only">Select files</quiet-button>
<input class="visually-hidden" type="file" name="file">

<script>
  const button = document.getElementById('file-input__button-only');
  const fileInput = button.nextElementSibling;

  // Open the system file browser when the button is clicked
  button.addEventListener('click', () => {
    fileInput.click();
  });

  // Listen for files to be selected
  fileInput.addEventListener('change', () => {
    // Do something with the files
    console.log(...fileInput.files);

    // Reset the input
    fileInput.value = '';
  });
</script>
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
