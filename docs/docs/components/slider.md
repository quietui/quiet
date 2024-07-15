---
title: Slider
layout: component
---

```html {.example}
<quiet-slider 
  label="Number of cats"
  description="Limit six per household"
  name="value" 
  value="3"
  min="0"
  max="6"
  with-markers
  with-tooltip
></quiet-slider>
```

## Examples

### Setting min, max, and step

Use the `min` and `max` attributes to set a minimum and maximum value for the slider. Use the `step` attribute to change the granularity the value must adhere to.

```html {.example}
<quiet-slider 
  label="Between zero and one"
  min="0"
  max="1"
  step="0.1"
  value="0.5"
  with-tooltip
></quiet-slider>
```

### Showing markers

Add the `--with-markers` attribute to show visual markers at each step. Markers work best with sliders that have shorter ranges.

```html {.example}
<quiet-slider 
  label="Size"
  name="size" 
  min="0"
  max="8"
  value="4"
  with-markers
></quiet-slider>
```

### Showing tooltips

Add the `with-tooltip` attribute to show a tooltip when the slider has focus or is dragged.

```html {.example}
<quiet-slider 
  label="Quality"
  name="quality" 
  min="0"
  max="100"
  value="50"
  with-tooltip
></quiet-slider>
```

### Formatting tooltips

To format the tooltip's value, set the `formatter` property to a function that accepts a numeric value and returns a string. The [`Intl.FormatNumber API`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) can be really useful here.

```html {.example}
<!-- Percent -->
<quiet-slider 
  id="slider__percent"
  label="Percentage"
  name="percentage"
  value="0.5"
  min="0"
  max="1"
  step=".01"
  with-tooltip
></quiet-slider><br>

<script>
  const percentSlider = document.getElementById('slider__percent');
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('quiet-slider').then(() => {
    percentSlider.tooltipFormatter = value => formatter.format(value);
  });
</script>

<!-- Duration -->
<quiet-slider 
  id="slider__duration"
  label="Duration"
  name="duration"
  value="12"
  min="0"
  max="24"
  with-tooltip
></quiet-slider><br>

<script>
  const hourSlider = document.getElementById('slider__duration');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'hour', unitDisplay: 'long' });

  customElements.whenDefined('quiet-slider').then(() => {
    hourSlider.tooltipFormatter = value => formatter.format(value);
  });
</script>

<!-- Angle -->
<quiet-slider 
  id="slider__angle"
  label="Angle"
  name="angle"
  min="0"
  max="360"
  value="180"
  with-tooltip
></quiet-slider><br>

<script>
  const angleSlider = document.getElementById('slider__angle');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'degree', unitDisplay: 'narrow' });

  customElements.whenDefined('quiet-slider').then(() => {
    angleSlider.tooltipFormatter = value => formatter.format(value);
  });
</script>

<!-- Currency -->
<quiet-slider 
  id="slider__currency"
  label="Currency"
  name="currency"
  min="0"
  max="100"
  value="50"
  with-tooltip
></quiet-slider>

<script>
  const currencySlider = document.getElementById('slider__currency');
  const formatter = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    currencyDisplay: 'symbol', 
    maximumFractionDigits: 0 
  });

  customElements.whenDefined('quiet-slider').then(() => {
    currencySlider.tooltipFormatter = value => formatter.format(value);
  });
</script>
```

### Changing the orientation

To make a vertical slider, set the `orientation` attribute to `vertical`. Vertical sliders are centered and will span 100% of the available space by default.

```html {.example}
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <quiet-slider
    orientation="vertical" 
    label="Volume" 
    name="volume"
    value="65"
    style="width: 80px"
  ></quiet-slider>

  <quiet-slider
    orientation="vertical" 
    label="Bass" 
    name="bass"
    value="50"
    style="width: 80px"
  ></quiet-slider>

  <quiet-slider
    orientation="vertical" 
    label="Treble" 
    name="treble"
    value="40"
    style="width: 80px"
  ></quiet-slider>
</div>
```

### Changing the size

Use the `size` attribute to change the slider's size.

```html {.example}
<quiet-slider size="xs" value="50" label="Extra small"></quiet-slider><br>
<quiet-slider size="sm" value="50" label="Small"></quiet-slider><br>
<quiet-slider size="md" value="50" label="Medium"></quiet-slider><br>
<quiet-slider size="lg" value="50" label="Large"></quiet-slider><br>
<quiet-slider size="xl" value="50" label="Extra large"></quiet-slider>
```

### Disabling sliders

Use the `disabled` attribute to disable the slider.

```html {.example}
<quiet-slider label="Disabled" value="50" disabled></quiet-slider>
```

### Using custom validation

Sliders don't have built-in validation attributes like many other form controls. However, you can use the `custom-validity` attribute to make the slider invalid and show a custom error message on submit. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-slider
    name="value"
    label="Select a value"
    description="This field will be invalid until the custom-validity attribute is removed"
    custom-validity="Not so fast, bubba!"
  ></quiet-slider>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of the `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::


### Styling validation

You can style valid and invalid sliders using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="slider__validation-pseudo">
  <quiet-slider
    name="value"
    label="Select a value"
    custom-validity="Select a number greater than zero"
    min="0"
    max="5"
    value="0"
    with-markers
    with-tooltip
  ></quiet-slider>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .slider__validation-pseudo {
    quiet-slider:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: 1rem;
    }

    quiet-slider:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: 1rem;
    }
  }
</style>

<script>
  const form = document.querySelector('.slider__validation-pseudo');
  const slider = form.querySelector('quiet-slider');

  async function updateValidity() {
    await slider.updateComplete;
    slider.customValidity = slider.value > 0 ? '' : 'Select a number greater than zero';
  }

  slider.addEventListener('quiet-input', () => updateValidity());
  form.addEventListener('reset', () => updateValidity());
</script>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="slider__validation-custom">
  <quiet-slider
    name="value"
    label="Select a value"
    custom-validity="Select a number greater than zero"
    min="0"
    max="5"
    value="0"
    with-markers
    with-tooltip
  ></quiet-slider>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .slider__validation-custom {
    quiet-slider:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: 1rem;
    }

    quiet-slider:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: 1rem;
    }
  }
</style>

<script>
  const form = document.querySelector('.slider__validation-custom');
  const slider = form.querySelector('quiet-slider');

  async function updateValidity() {
    await slider.updateComplete;
    slider.customValidity = slider.value > 0 ? '' : 'Select a number greater than zero';
  }

  slider.addEventListener('quiet-input', () => updateValidity());
  form.addEventListener('reset', () => updateValidity());
</script>
```

### Styling sliders

Sliders come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<div style="display: flex; gap: 2rem;">
  <div class="slider__touch">
    <quiet-slider 
      label="Brightness"
      orientation="vertical"
      name="value" 
      min="0"
      max="1"
      step=".01"
      value="0.6"
      with-tooltip
      tooltip-distance="20"
    ></quiet-slider>
    <quiet-icon name="sun"></quiet-icon>
  </div>

  <div class="slider__touch">
    <quiet-slider 
      label="Volume"
      orientation="vertical"
      name="value" 
      min="0"
      max="1"
      step=".01"
      value="0.4"
      with-tooltip
      tooltip-distance="20"
    ></quiet-slider>
    <quiet-icon name="volume"></quiet-icon>
  </div>
</div>

<style>
  .slider__touch {
    position: relative;
    max-width: fit-content;

    quiet-slider {
      max-width: fit-content;

      &::part(slider) {
        width: 4rem;
        background-color: var(--quiet-neutral-fill-softer);
        box-shadow: inset 0 1px 2px color-mix(in oklab, var(--quiet-neutral-fill-softer), black 5%);
        cursor: pointer;
        overflow: hidden;
      }

      &::part(indicator) {
        background-color: #22c55e;
        border-radius: 0;
      }    

      &::part(thumb) {
        opacity: 0;
      }

      &::part(tooltip__arrow) {
        display: none;
      }

      &::part(tooltip__content) {
        background-color: var(--quiet-neutral-fill-louder);
        border: none;
        color: var(--quiet-primary-text-on-loud);
      }

      &:focus-within {
        outline: var(--quiet-focus-ring);
        outline-offset: var(--quiet-focus-offset);
      }
    }

    quiet-icon {
      position: absolute;
      bottom: 3.5rem;
      left: calc(50% - 1rem);
      font-size: 2rem;
      color: var(--quiet-strident);
      pointer-events: none;
    }
  }
</style>

<script>
  // Format tooltips as a percentage
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('quiet-slider').then(() => {
    document.querySelectorAll('.slider__touch').forEach(el => {
      el.querySelector('quiet-slider').tooltipFormatter = value => formatter.format(value);
    });
  });
</script>
```

```html {.example}
<quiet-slider 
  id="slider__color"
  label="Color"
  name="color" 
  min="0"
  max="360"
  style="--hue: hsl(0deg 100% 50%);"
></quiet-slider>

<br>

<quiet-slider 
  id="slider__opacity"
  label="Opacity"
  name="opacity" 
  min="0"
  max="1"
  step=".01"
  style="--opacity: 0%;"
></quiet-slider>

<style>
  #slider__color,
  #slider__opacity {
    &::part(thumb) {
      --thumb-width: 1.5em;
      --thumb-height: 1.5em;
      border-color: var(--quiet-silent);
      box-shadow: 0 0 0 2px var(--quiet-strident);
      outline-offset: 3px;
    }
  }

  #slider__color {
    &::part(slider) {
      height: 1em;
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

    &::part(indicator) {
      display: none;
    }

    &::part(thumb) {
      background-color: var(--hue);
    }    
  }

  #slider__opacity {
    &::part(slider) {
      height: 1em;
      background: var(--quiet-silent);
      background-size: 12px 12px;
      background-position: 0px 0px, 0px 0px, -6px -6px, 6px 6px;
      background-image: 
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
    }

    &::part(indicator) {
      width: 100% !important;
      background-color: transparent;
      background-image: linear-gradient(to right, #0000 0%, #000f 100%);
    }    

    &::part(thumb) {
      background-color: color-mix(in oklab, white, black var(--opacity));
    }
  }
</style>

<script>
  const colorSlider = document.getElementById('slider__color');
  const opacitySlider = document.getElementById('slider__opacity');
  
  // Set the color slider's thumb color when the value changes
  colorSlider.addEventListener('input', () => {
    colorSlider.style.setProperty('--hue', `hsl(${colorSlider.value}deg 100% 50%)`);
  });

  // Set the opacity slider's thumb color when the value changes
  opacitySlider.addEventListener('input', () => {
    opacitySlider.style.setProperty('--opacity', `${opacitySlider.value * 100}%`);
  });
</script>
```
