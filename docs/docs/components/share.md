---
title: Share
layout: component
---

In [supportive browsers](https://caniuse.com/?search=navigator.share), the system's share interface will be shown. In unsupportive browsers or unsecure contexts, the data is copied to the user's clipboard instead.

```html {.example}
<quiet-share 
  label="Quiet UI" 
  text="An awesome library for building on the Web." 
  url="https://quietui.org/"
></quiet-share>
```

:::info
This component uses the Web Share API's [`share()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) method, which requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). In other words, for maximum browser support, make sure the URL starts with `https://`.
:::

## Examples

### Sharing a link

Set the `url` attribute to the URL you'd like to share. Although optional, it's usually a good idea to also provide a `label`.

```html {.example}
<quiet-share 
  label="Cat on Wikipedia" 
  url="https://en.wikipedia.org/wiki/Cat"
></quiet-share>
```

### Sharing plain text

Set the `text` attribute to the plain text you'd like to share. Although optional, it's usually a good idea to also provide a `label`.

```html {.example}
<quiet-share 
  label="Check this out"
  text="I'm sharing this text with you from my website"
></quiet-share>
```

### Sharing a file

Set the `files` property to an array of `File` objects you'd like to share. Although optional, it's usually a good idea to also provide a `label`.

```html {.example}
<div id="share__file">
  <quiet-file-input label="Select an image to share" accept="image/*"></quiet-file-input>
  <br>
  <quiet-share label="Share image">
    <quiet-button>
      <quiet-icon slot="start" name="upload"></quiet-icon>
      Share selected image
    </quiet-button>    
  </quiet-share>
</div>

<script>
  const container = document.getElementById('share__file');
  const fileInput = container.querySelector('quiet-file-input');    
  const share = container.querySelector('quiet-share');

  // When a file is selected, try to share it
  fileInput.addEventListener('input', async (event) => {
    const file = event.target.files[0];
    
    // Pass the selected file to the share component
    if (file) {
      share.files = [file];
    } else {
      share.files = [];
    }
  });
</script>
```

### Using custom buttons

Use a custom button by simply slotting it in. Both [Quiet buttons](/docs/components/button) and [native buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) are supported.

```html {.example}
<quiet-share
  label="Quiet UI" 
  text="An awesome library for building on the Web." 
  url="https://quietui.org/"
  style="margin-inline-end: 0.5rem;"
>
  <quiet-button>
    <quiet-icon slot="start" name="upload"></quiet-icon>
    Share
  </quiet-button>
</quiet-share>

<quiet-share 
  label="Quiet UI" 
  text="An awesome library for building on the Web." 
  url="https://quietui.org/"
>
  <button>Share</button>
</quiet-share>
```

:::info
If your button only has an icon, be sure to add an accessible label with `aria-label`.
:::
