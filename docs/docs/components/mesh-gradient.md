---
title: Mesh Gradient
layout: component
---

TODO - calculate the YIQ and set the `--color` to white or black 

```html {.example}
<div id="mesh__overview">
  <quiet-mesh-gradient 
    color="#3ad1ff" 
    complexity="3" 
    seed="952"
  ></quiet-mesh-gradient>

  <div class="row">
    <quiet-color-input 
      label="Base color"
      value="#3ad1ff"
      swatches="
        #09090b; #71717a; #ef4444; #f97316; 
        #f59e0b; #eab308; #84cc16; #22c55e; 
        #10b981; #14b8a6; #06b6d4; #3b82f6; 
        #6366f1; #a855f7; #d946ef; #ec4899
      "  
      with-input
      with-eye-dropper
      with-clear
    ></quiet-color-input>

    <quiet-button>
      <quiet-icon slot="start" name="reload"></quiet-icon>
      Random seed
    </quiet-button>
  </div>

  <quiet-slider
    label="Complexity"
    min="1"
    max="8"
    value="3"
    with-markers
    with-tooltip
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mesh__overview');
  const meshGradient = container.querySelector('quiet-mesh-gradient');
  const colorInput = container.querySelector('quiet-color-input');
  const complexitySlider = container.querySelector('quiet-slider');
  const seedButton = container.querySelector('quiet-button');

  colorInput.addEventListener('input', () => {
    meshGradient.color = colorInput.value;
  });

  complexitySlider.addEventListener('input', () => {
    meshGradient.complexity = complexitySlider.value;
  });

  seedButton.addEventListener('click', () => {
    meshGradient.seed = Math.floor(Math.random() * 1000) + 1;
  });
</script>

<style>
  #mesh__overview {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    quiet-mesh-gradient {
      height: 300px;
    }

  .row {
    display: flex;
    flex-wrap: normal;
    gap: 1.5rem;
    align-items: end;
  }
  }
</style>
```

TODO - add a refresh button to regenerate a random one

## Examples

### Base Color

Set a specific base color for the gradient using hex format:

```html {.example .flex-col}
<quiet-mesh-gradient color="#ff9797"></quiet-mesh-gradient>
<quiet-mesh-gradient color="#6ce498"></quiet-mesh-gradient>
<quiet-mesh-gradient color="#468df8"></quiet-mesh-gradient>
```

TODO - add a color input for base color


### Custom Complexity

Control the number of gradient layers with the `complexity` property:

```html {.example .flex-col}
<quiet-mesh-gradient complexity="2" color="#FF6B6B"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="6" color="#FF6B6B"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="8" color="#FF6B6B"></quiet-mesh-gradient>
```

TODO - add a slider and use a seed for this

### Seeded Gradients

Use a seed value for consistent gradient generation:

```html {.example .flex-col}
<quiet-mesh-gradient seed="42" color="#9B59B6"></quiet-mesh-gradient>
<quiet-mesh-gradient seed="42" color="#9B59B6"></quiet-mesh-gradient>
<!-- These two will look identical -->
```

### Providing content

Place content over the gradient using the default slot:

```html {.example}
<quiet-mesh-gradient color="steelblue">
  <h2>Beautiful Mesh Gradient</h2>
  <p>Content displayed over the gradient</p>
</quiet-mesh-gradient>
```

### CSS Custom Properties

Customize the gradient appearance with CSS properties:

```html {.example}
<quiet-mesh-gradient 
  style="
    --gradient-opacity: 0.8;
    --gradient-saturation: 50%;
    --gradient-brightness: 100%;
  "
  seed="42"
  color="#2ECC71">
</quiet-mesh-gradient>
```

TODO - color input for base color and sliders for opacity, saturation, and brightness

### Card Backgrounds

Use in the media slot for cards:

```html {.example}
<quiet-card style="max-width: 340px;">
  <quiet-mesh-gradient 
    slot="media"
    complexity="3" 
    color="#FF6B6B"
    style="height: 200px;"
  >
    <h3>Card Title</h3>
    <p>This card has a beautiful mesh gradient background.</p>
  </quiet-mesh-gradient>  

  <p>There's nothing more delightful than watching a curious kitten explore the world with big, innocent eyes and tiny, playful paws.</p>
  <quiet-button slot="footer" variant="primary">I agree</quiet-button>
  <quiet-button slot="footer">Learn more</quiet-button>
</quiet-card>
```

### Hero Section

Create an eye-catching hero section:

```html {.example}
<quiet-mesh-gradient 
  complexity="3"
  seed="123"
  color="#787cbf"
  style="height: 400px;"
>
  <h1>Welcome to QuietUI</h1>
  <p>
    Beautiful, accessible web components
  </p>
  <quiet-button\\ pill>Get Started</quiet-button>
</quiet-mesh-gradient>
```

TODO - convert rgba and similar to new syntax