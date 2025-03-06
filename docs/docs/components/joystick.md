---
title: Joystick
layout: component
---

Joysticks are ideal for directional input in games, simulations, and creative tools. They support touch and mouse interactions and feature customizable options for precise control.

```html {.example}
<quiet-joystick label="Basic joystick control"></quiet-joystick>
```

:::info
The joystick is designed to be used by touch and mouse users. It does not respond to key presses, as keyboard controls vary depending on each application’s needs. For optimal accessibility, you should consider adding keyboard alternatives on certain devices to ensure your application works well for all users.
:::

## Examples

### Responding to movement

The joystick emits `quiet-joystick-start`, `quiet-joystick-stop`, and `quiet-joystick-move` events that contain a `detail` object with the following properties:

- `angle`: degrees (0-359) from the top, increasing clockwise
- `distance`: The normalized distance from the center (0-1)
- `x`: the normalized horizontal position (-1 to 1)
- `y`: the normalized vertical position (-1 to 1)

The move event fires continuously while dragging, while start and stop events fire at the beginning and end of the interaction.

```html {.example}
<div id="joystick__events">
  <quiet-joystick label="Joystick with event feedback"></quiet-joystick>

  <div class="feedback">
    Angle: <span class="angle">0</span>°<br>
    Distance: <span class="distance">0</span><br>
    X: <span class="x">0</span><br>
    Y: <span class="y">0</span>
  </div>
</div>

<script>
  const container = document.getElementById('joystick__events');
  const joystick = container.querySelector('quiet-joystick');
  const angleEl = container.querySelector('.angle');
  const distanceEl = container.querySelector('.distance');
  const xEl = container.querySelector('.x');
  const yEl = container.querySelector('.y');

  function updateValues(detail) {
    angleEl.textContent = Math.round(detail.angle);
    distanceEl.textContent = detail.distance.toFixed(2);
    xEl.textContent = detail.x.toFixed(2);
    yEl.textContent = detail.y.toFixed(2);

  }

  joystick.addEventListener('quiet-joystick-start', event => {
    console.log('start');
    updateValues(event.detail);
  });

  joystick.addEventListener('quiet-joystick-move', event => {
    updateValues(event.detail);
  });

  joystick.addEventListener('quiet-joystick-stop', () => {
    console.log('stop');
    updateValues(event.detail);
  });
</script>

<style>
  #joystick__events {
    quiet-joystick {
      margin-block-end: 1.5rem;
    }
  }
</style>
```

### Adding an icon

Use the `thumb` slot to add an icon to the joystick's thumb.

```html {.example}
<quiet-joystick label="Joystick control with icon">
  <quiet-icon slot="thumb" name="arrows-move"></quiet-icon>
</quiet-joystick>
```

### Showing only on touch devices

If desired, you can use the `pointer: coarse` media query to hide the joystick on devices that don't support touch.

```css
/* Hide the joystick on non-touch devices */
@media not (pointer: coarse) {
  quiet-joystick {
    display: none;
  }
}
```

### Dead zone

The `dead-zone` attribute sets a normalized distance (0-1) from the center where joystick movement isn't registered. In this example, the joystick has a 30% dead zone, meaning the thumb must move at least 30% of the way from the center to the edge before events will fire with non-zero values. This can help prevent unintended micro-movements.

```html {.example}
<div id="joystick__dead-zone">
  <quiet-joystick 
    dead-zone="0.3" 
    label="Joystick with 30% dead zone"
  ></quiet-joystick>

  <div class="feedback">
    Angle: <span class="angle">0</span>°<br>
    Distance: <span class="distance">0</span><br>
    X: <span class="x">0</span><br>
    Y: <span class="y">0</span>
  </div>
</div>

<script>
  const container = document.getElementById('joystick__dead-zone');
  const joystick = container.querySelector('quiet-joystick');
  const angleEl = container.querySelector('.angle');
  const distanceEl = container.querySelector('.distance');
  const xEl = container.querySelector('.x');
  const yEl = container.querySelector('.y');

  function updateValues(detail) {
    angleEl.textContent = Math.round(detail.angle);
    distanceEl.textContent = detail.distance.toFixed(2);
    xEl.textContent = detail.x.toFixed(2);
    yEl.textContent = detail.y.toFixed(2);
  }

  joystick.addEventListener('quiet-joystick-move', event => {
    updateValues(event.detail);
  });

  joystick.addEventListener('quiet-joystick-start', event => {
    updateValues(event.detail);
  });

  joystick.addEventListener('quiet-joystick-stop', event => {
    updateValues(event.detail);
  });
</script>

<style>
  #joystick__dead-zone {
    quiet-joystick {
      margin-block-end: 1.5rem;
    }
  }
</style>
```

### Sticky mode

Set the `mode` attribute to `sticky` to make the joystick retain its last position after the user releases it, rather than snapping back to the center. This can be useful for scenarios where you want the joystick to hold a value, such as setting a persistent direction or throttle.

```html {.example}
<div id="joystick__sticky">
  <quiet-joystick mode="sticky" label="Sticky joystick control"></quiet-joystick><br>
  <quiet-button>Reset</quiet-button>
</div>

<script>
  const container = document.getElementById('joystick__sticky');
  const joystick = container.querySelector('quiet-joystick');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    joystick.reset();
  });
</script>
```

### Disabling

Set the `disabled` attribute to prevent the joystick from responding to touch or mouse input. This can be useful when you want to temporarily disable interaction, such as during a loading state or when the joystick's functionality is not applicable.

```html {.example}
<quiet-joystick disabled label="Disabled joystick control"></quiet-joystick>
```

### Styling joysticks

You can customize the joystick's appearance using CSS custom properties and parts. Use the `--distance` readonly custom property to style the joystick based on the distance the thumb has been pulled from the center (0-1). For best results, the joystick's height should always match its width.

```html {.example}
<quiet-joystick id="joystick__styling" label="Styled joystick control"></quiet-joystick>

<style>
  #joystick__styling {
    --size: 10rem;
    --thumb-size: 3rem;

    background-color: color-mix(in oklab, forestgreen, firebrick calc(var(--distance) * 100%));

    &::part(thumb) {
      background-color: white;
    }
  }
</style>
```
