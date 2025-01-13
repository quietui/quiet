---
title: Copy
layout: component
---

```html {.example}
<quiet-copy data="https://quietui.org/"></quiet-copy>
```

:::info
This component uses the Clipboard API's [`writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) method, which requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). In other words, for maximum browser support, make sure the URL starts with `https://`.
:::

## Examples

### Copying text

Use the `data` attribute to set the text that will be copied when the button is activated.

```html {.example}
<quiet-copy data="Easy as 1-2-3"></quiet-copy>
```

### Using custom buttons

Use a custom button by simply slotting it in. Both [Quiet buttons](/docs/components/button) and [native buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) are supported.

```html {.example}
<quiet-copy data="Copied with a Quiet button" style="margin-inline-end: 0.5rem;">
  <quiet-button>
    <quiet-icon slot="start" name="clipboard"></quiet-icon>
    Copy
  </quiet-button>
</quiet-copy>

<quiet-copy data="Copied with a native button">
  <button>Copy</button>
</quiet-copy>
```

### Feedback placement

Copy feedback shows above the button by default. Use the `feedback-placement` attribute to change where it gets shown. The actual placement may vary if there's insufficient room to display it in the viewport. To hide the feedback, set it to `hidden`.

```html {.example}
<quiet-copy data="Top feedback"></quiet-copy>
<quiet-copy feedback-placement="bottom" data="Bottom feedback"></quiet-copy>
<quiet-copy feedback-placement="left" data="Left feedback"></quiet-copy>
<quiet-copy feedback-placement="right" data="Right feedback"></quiet-copy>
```

### Copying HTML content

You can copy HTML content using the [ClipboardItem API](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem). For best results, make sure to provide `text/html` and `text/plain` types.

```html {.example}
<p>
  This content will be copied to the <a href="https://en.wikipedia.org/wiki/Clipboard_(computing)" target="_blank">clipboard</a>. 
  <em>Try pasting it into another app.</em>
</p>

<quiet-copy id="copy__html">
  <quiet-button>Copy HTML</quiet-button>
</quiet-copy>

<script>
  const copyButton = document.getElementById('copy__html');
  const el = copyButton.previousElementSibling;

  if (window.ClipboardItem) {
    copyButton.data = [
      new ClipboardItem({
        'text/plain': new Blob([el.outerHTML], { type: 'text/plain' }),
        'text/html': new Blob([el.outerHTML], { type: 'text/html' })
      })
    ];
  }

  copyButton.addEventListener('quiet-copy-error', event => {
    event.preventDefault();
    alert(`Sorry, but your browser doesn't support this API yet.`);
  });
</script>
```

### Copying PNG images

Most browsers support writing PNG image data with the `ClipboardItem` API used in this example. Try copying the image using the button below, then paste it into an image editing app.

```html {.example}
<img src="/assets/examples/three-kittens.png" alt="Three tabby kittens" style="width: 200px; margin-block-end: 1rem;">

<quiet-copy id="copy__png">
  <quiet-button>Copy PNG image</quiet-button>
</quiet-copy>

<script>
  const copyButton = document.getElementById('copy__png');

  if (window.ClipboardItem) {
    fetch('/assets/examples/three-kittens.png')
      .then(res => res.blob())
      .then(blob => {
        copyButton.data = [new ClipboardItem({ 'image/png': blob })];
      });
  }

  copyButton.addEventListener('quiet-copy-error', event => {
    event.preventDefault();
    alert(`Sorry, but your browser doesn't support this API yet.`);
  });
</script>
```

### Copying non-PNG images

Copying non-PNG images a trickier due to limited browser support. You can use [web custom formats](https://developer.chrome.com/blog/web-custom-formats-for-the-async-clipboard-api), but they don't seem to be widely supported by platform applications yet.

For now, the most effective way to copy a non-PNG image is to render it in a `<canvas>` element, convert it to a blob, and copy it as a PNG.

```html {.example}
<img src="/assets/examples/kitten-behind-tree.jpeg" alt="A kitten posing behind a tree" style="width: 200px; margin-block-end: 1rem;">

<quiet-copy id="copy__other">
  <quiet-button>Copy JPEG image</quiet-button>
</quiet-copy>

<script>
  function setCopyDataFromCanvas(image) {
    // Render the image in a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);

    // Convert the image data to a blob
    canvas.toBlob(blob => {
      copyButton.data = [new ClipboardItem({ 'image/png': blob })];
    });
  }

  const copyButton = document.getElementById('copy__other');

  if (window.ClipboardItem) {
    // Load the image to copy
    const image = new Image();
    image.src = '/assets/examples/kitten-behind-tree.jpeg';
    image.addEventListener('load', () => setCopyDataFromCanvas(image));
  }

  copyButton.addEventListener('quiet-copy-error', event => {
    event.preventDefault();
    alert(`Sorry, but your browser doesn't support this API yet.`);
  });
</script>
```

### Disabling

Add the `disabled` attribute to disable the button and prevent copying.

```html {.example}
<quiet-copy data="https://quietui.org/" disabled></quiet-copy>
```
