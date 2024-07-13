---
title: Slider
layout: component
---

```html {.example}
<quiet-slider 
  label="Number of cats"
  description="More cats will mean you have more fun."
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
  label="Choose a value between 1 and 0"
  min="0"
  max="1"
  step="0.1"
  value="0.5"
  with-tooltip
></quiet-slider>
```

### Showing markers

Add the `--with-markers` attribute to show visual markers at each step. This works best with sliders that have smaller ranges, e.g. 1–10.

```html {.example}
<quiet-slider 
  label="How many cats would you like"
  name="cats" 
  min="0"
  max="10"
  value="5"
  with-markers
></quiet-slider>
```

### Showing tooltips

Add the `with-tooltip` attribute to show a tooltip when the slider is dragged or focused.

```html {.example}
<quiet-slider 
  label="Number of cats"
  description="More cats will mean you have more fun."
  name="value" 
  value="5"
  min="1"
  max="10"
  with-tooltip
></quiet-slider>
```

### Formatting tooltips

To format the tooltip's value, set the `tooltipFormatter` property to a function that accepts a numeric value and returns a string. The [`Intl.FormatNumber API`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) can be really useful here.

```html {.example}
<quiet-slider 
  id="slider__percent"
  label="Percentage"
  name="percentage"
  value="0.5"
  min="0"
  max="1"
  step=".01"
  with-tooltip
></quiet-slider>

<script>
  const percentSlider = document.getElementById('slider__percent');
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('quiet-slider').then(() => {
    percentSlider.tooltipFormatter = value => formatter.format(value);
  });
</script>

<br>

<quiet-slider 
  id="slider__hour"
  label="Duration"
  name="duration"
  value="12"
  min="0"
  max="24"
  with-tooltip
></quiet-slider>

<script>
  const hourSlider = document.getElementById('slider__hour');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'hour', unitDisplay: 'long' });

  customElements.whenDefined('quiet-slider').then(() => {
    hourSlider.tooltipFormatter = value => formatter.format(value);
  });
</script>
```

### Changing the orientation

To make a vertical slider, set the `orientation` attribute to `vertical`. Vertical sliders are centered and will span 100% of the available space by default.

```html {.example}
<div style="display: flex; gap: 1rem;">
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
    value="35"
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
<quiet-slider label="Disabled" disabled></quiet-slider>
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
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of a `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::


### Styling validation

You can style valid and invalid sliders using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="slider__validation-pseudo">
  <quiet-slider
    name="value"
    label="Select a value"
    custom-validity="Please select a value"
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

  slider.addEventListener('quiet-input', () => {
    slider.customValidity = slider.value > 0 ? '' : 'Please select a value';
  });
</script>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="slider__validation-custom">
  <quiet-slider
    name="value"
    label="Select a value"
    custom-validity="Please select a value"
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

  slider.addEventListener('quiet-input', () => {
    slider.customValidity = slider.value > 0 ? '' : 'Please select a value';
  });
</script>
```

### Styling sliders

Sliders come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<div style="display: flex; gap: 2rem;">
  <div class="slider__brightness">
    <quiet-slider 
      label="Brightness"
      orientation="vertical"
      name="value" 
      value="60"
      min="1"
      max="100"    
    ></quiet-slider>
    <quiet-icon name="sun"></quiet-icon>
  </div>

  <div class="slider__brightness">
    <quiet-slider 
      label="Volume"
      orientation="vertical"
      name="value" 
      value="40"
      min="1"
      max="100"    
    ></quiet-slider>
    <quiet-icon name="volume"></quiet-icon>
  </div>
</div>

<style>
  .slider__brightness {
    position: relative;
    max-width: fit-content;

    quiet-slider {
      max-width: fit-content;

      &::part(slider) {
        width: 4rem;
        background-color: var(--quiet-neutral-fill-softer);
        cursor: pointer;
        overflow: hidden;
      }

      &::part(indicator) {
        background-color: var(--quiet-primary-fill-mid);
        border-radius: 0;
      }    

      &::part(thumb) {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        white-space: nowrap;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
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
```
