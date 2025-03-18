---
title: Text Mask
layout: component
---

Text masks create eye-catching headlines that capture visitors' attention, making them great for landing pages. For best results, use a font with a heavy weight, e.g. 700+ or bold/black variants, as thicker letter forms provide more surface area for the image to show through.

```html {.example}
<quiet-text-mask 
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  fixed
  style="
    font-family: 'Fira Sans', sans-serif;
    font-size: 7em; 
    font-weight: 900; 
    line-height: 1; 
    text-align: center;
    --brightness: 90%;
    --contrast: 60%;
  "
>
  <quiet-fit-text>LOVE WHAT</quiet-fit-text>
  <quiet-fit-text>YOU CREATE</quiet-fit-text>
</quiet-text-mask>
```

:::info
If you're using light and dark color schemes, ensure the text has sufficient contrast for both by selecting images with high color variation or adjusting the brightness/contrast to ensure readability regardless of the background.
:::

## Examples

### Providing text

All text inside the text mask will be masked. The font, size, weight, etc. is inherited, meaning you can provide them on the text mask or an ancestor element.

```html {.example}
<quiet-text-mask 
  image="https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  style="
    font-family: 'Fira Sans', sans-serif;
    font-size: 2rem; 
    font-weight: 900; 
    line-height: 1.5; 
    text-transform: uppercase;
  "
>
  <h4 style="font: inherit; font-size: 3rem;">Joy &amp; Mystery</h4>
  <p>Whether lounging in a sunbeam or chasing invisible prey, cats bring joy and mystery to our homes.</p>
</quiet-text-mask>
```

:::info
Most text decorations, such as underlines and text shadows, will not work as expected inside text masks.
:::

### Fitting text

Use the [fit text](/docs/components/fit-text) component to draw a text mask that fits the full width of its container without wrapping.

```html {.example}
<quiet-text-mask 
  image="https://images.unsplash.com/photo-1527416876370-fb74d128c3dc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  style="
    font-family: 'Fira Sans', sans-serif;
    font-size: 4em; 
    font-weight: 900; 
    line-height: 1; 
    text-align: center;
    --brightness: 90%;
    --contrast: 60%;
  "
>
  <quiet-fit-text>
    LOVE WHAT YOU CREATE
  </quiet-fit-text>
</quiet-text-mask>
```

### Repeating patterns

For a tiled background, use a repeating image and set `background-repeat` and `background-size` to the appropriate values in your CSS.

```html {.example}
<quiet-text-mask 
  image="/assets/images/purple-tile.webp"
  style="
    font-family: 'Fira Sans', sans-serif;
    font-size: 4em; 
    font-weight: 900;
    text-align: center;
    line-height: 1;
    background-repeat: repeat;
    background-size: 140px;
  "
>
  PATTERNS<br>
  REPEAT<br>
  FOREVER
</quiet-text-mask>
```

### Fixed backgrounds

Use the `fixed` attribute to create a parallax-like effect where the image stays fixed while scrolling.

```html {.example}
<quiet-text-mask 
  image="https://images.unsplash.com/photo-1527416876370-fb74d128c3dc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  fixed
  style="
    font-family: 'Fira Sans', sans-serif;
    font-size: 4em; 
    font-weight: 900;
    text-align: center;
    --brightness: 90%;
    --contrast: 60%;
  "
>
  <quiet-fit-text>FIXED BACKGROUND</quiet-fit-text>
</quiet-text-mask>
```

:::warn
Due to [a very old bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1313757), this feature is disabled in Firefox. If you'd like to see this fixed, consider logging and and voting for the bug.
:::

### Brightness

Adjust the brightness of the masked image using the `--brightness` custom property (0-200%). Normal brightness is 100%. Values below 100% darken the image, and values above 100% brighten it.

```html {.example}
<div id="mask__brightness">
  <quiet-text-mask
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style="
      font-family: 'Fira Sans', sans-serif;
      font-size: 4em;
      font-weight: 900;
      text-align: center;
      --brightness: 75%;
    "
  >
    <quiet-fit-text>BRIGHTNESS</quiet-fit-text>
  </quiet-text-mask>

  <quiet-slider 
    label="Brightness" 
    min="0" 
    max="200" 
    value="75" 
    indicator-offset="100"
    with-tooltip 
    class="quiet-vh-label"
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mask__brightness');
  const mask = container.querySelector('quiet-text-mask');
  const slider = container.querySelector('quiet-slider');

  slider.addEventListener('quiet-input', () => {
    mask.style.setProperty('--brightness', `${slider.value}%`);
  });
</script>
```

### Contrast

Control the contrast of the masked image with the `--contrast` custom property (0-200%). Normal contrast is 100%. Lower values reduce contrast for a more subtle effect, while higher values increase it for more dramatic definition in the text mask.

```html {.example}
<div id="mask__contrast">
  <quiet-text-mask
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style="
      font-family: 'Fira Sans', sans-serif;
      font-size: 4em;
      font-weight: 900;
      text-align: center;
      --contrast: 50%;
    "
  >
    <quiet-fit-text>CONTRAST</quiet-fit-text>
  </quiet-text-mask>

  <quiet-slider 
    label="Contrast" 
    min="0" 
    max="200" 
    value="50" 
    indicator-offset="100"
    with-tooltip 
    class="quiet-vh-label"
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mask__contrast');
  const mask = container.querySelector('quiet-text-mask');
  const slider = container.querySelector('quiet-slider');

  slider.addEventListener('quiet-input', () => {
    mask.style.setProperty('--contrast', `${slider.value}%`);
  });
</script>
```

### Grayscale

Remove color from the masked image using the `--grayscale` custom property (0-100%). A value of 100% creates a completely black and white effect, while lower values retain some of the original color.

```html {.example}
<div id="mask__grayscale">
  <quiet-text-mask
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style="
      font-family: 'Fira Sans', sans-serif;
      font-size: 4em;
      font-weight: 900;
      text-align: center;
      --grayscale: 100%;
    "
  >
    <quiet-fit-text>GRAYSCALE</quiet-fit-text>
  </quiet-text-mask>

  <quiet-slider 
    label="Grayscale" 
    min="0" 
    max="100" 
    value="100" 
    with-tooltip 
    class="quiet-vh-label"
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mask__grayscale');
  const mask = container.querySelector('quiet-text-mask');
  const slider = container.querySelector('quiet-slider');

  slider.addEventListener('quiet-input', () => {
    mask.style.setProperty('--grayscale', `${slider.value}%`);
  });
</script>
```

### Hue rotation

Transform the colors of the masked image with the `--hue-rotate` custom property (0-360deg). Values represent degrees of rotation around the color wheel, creating unique color shifts while maintaining the original luminosity.

```html {.example}
<div id="mask__hue">
  <quiet-text-mask
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    style="
      font-family: 'Fira Sans', sans-serif;
      font-size: 4em;
      font-weight: 900;
      text-align: center;
      --hue-rotate: 180deg;
    "
  >
    <quiet-fit-text>HUE ROTATE</quiet-fit-text>
  </quiet-text-mask>

  <quiet-slider 
    label="Hue Rotation" 
    min="0" 
    max="360" 
    value="180" 
    with-tooltip 
    class="quiet-vh-label"
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mask__hue');
  const mask = container.querySelector('quiet-text-mask');
  const slider = container.querySelector('quiet-slider');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'degree', unitDisplay: 'narrow' });

  // Format the slider's tooltip as an angle
  customElements.whenDefined('quiet-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });

  // Change with the slider
  slider.addEventListener('quiet-input', () => {
    mask.style.setProperty('--hue-rotate', `${slider.value}deg`);
  });
</script>

<style>
  #mask__hue {
    quiet-slider::part(track) {
      background-image: 
        linear-gradient(
          to right,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
    }

    quiet-slider::part(indicator) {
      display: none;
    }
  }
</style>
```

<!-- Font for demos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">