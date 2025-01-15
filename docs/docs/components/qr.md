---
title: QR Code
layout: component
---

[QR codes](https://www.qrcode.com/) offer an efficient way to direct mobile users to websites, exchange contact details, process mobile transactions, and other digital interactions through a simple scan.

```html {.example}
<quiet-qr data="https://quietui.org/" label="QR code to visit Quiet UI on the Web"></quiet-qr>
```

:::info
In the same way that images require `alt` text, you should add a label to every QR code. The label won't be displayed, but it will be announced by assistive devices.
:::

## Examples

### Setting data

Set the `data` attribute to a URL, email address, or any other string you want to encode.

```html {.example}
<div id="qr__text">
  <quiet-qr data="https://quietui.org/"></quiet-qr>
  <quiet-text-field label="URL, email address, or other text" value="https://quietui.org/" clearable></quiet-text-field>
</div>

<script>
  const container = document.getElementById('qr__text');
  const qrCode = container.querySelector('quiet-qr');
  const textField = container.querySelector('quiet-text-field');

  textField.addEventListener('quiet-input', () => {
    qrCode.data = textField.value;
  });
</script>

<style>
  #qr__text quiet-text-field {
    margin-block-start: 1rem;
  }
</style>
```

### Changing the size

Use the `size` attribute to set the QR code's generated size in pixels. The internal image is rendered at 2&times; the specified size so the QR code will be clear even on high pixel density displays.

```html {.example}
<div id="qr__size">
  <quiet-slider label="Size" min="64" max="256" value="160" orientation="vertical" with-tooltip tooltip-placement="left"></quiet-slider>
  <quiet-qr data="https://x.com/quiet_ui/" size="160"></quiet-qr>
</div>

<script>
  const container = document.getElementById('qr__size');
  const slider = container.querySelector('quiet-slider');
  const qrCode = container.querySelector('quiet-qr');

  slider.addEventListener('quiet-input', () => {
    qrCode.size = slider.value;
  });
</script>

<style>
  #qr__size {
    display: flex;
    align-items: center;
    gap: 4rem;
    min-height: 256px;
  }
</style>
```

:::info
You can apply `max-width` and/or `max-height` styles to the host element to make the QR code responsive.
:::

### Changing the color

The QR code's color is determined by the current text color. To change it, set the CSS `color` property on the host element or an ancestor element.

```html {.example}
<quiet-qr 
  data="Cats cannot scan these codes" 
  style="color: deeppink;"
></quiet-qr>
```

### Styling QR codes

The element's background is transparent by default, but you can style it with CSS if you want a solid color, gradient, padding, etc. Set the `corners` attribute to a value between 0 and 0.5 to make the inside corners of the QR code's bits sharp or round.

```html {.example .flex-row}
<quiet-qr 
  data="https://quietui.org/" 
  corners="0.5"
  style="
    background: radial-gradient(circle at 10% 20%, rgb(255, 200, 124) 0%, rgb(252, 251, 121) 90%);
    color: #4e3f26;
    padding: 1rem;
    border-radius: .5rem;
  "
></quiet-qr>

<quiet-qr 
  data="https://x.com/quiet_ui/" 
  corners="0"
  style="
    background: radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%);
    color: white;
    padding: 1rem;
    border-radius: .5rem;
  "
></quiet-qr>
```
