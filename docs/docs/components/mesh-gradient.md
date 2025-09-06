---
title: Mesh Gradient
layout: component
---

```html {.example}
<div id="mesh__overview">
  <quiet-mesh-gradient 
    style="--gradient-color: #b8edf1;"
    complexity="5" 
    seed="653"
  >
    <h2>A Purrfect Mesh</h2>
    <p>Text colors automatically adjusts to ensure readability</p>
  </quiet-mesh-gradient>

  <div class="row">
    <quiet-color-input 
      label="Base color"
      value="#b8edf1"
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
    value="5"
    with-markers
    with-tooltip
  ></quiet-slider>
</div>

<script>
  const container = document.getElementById('mesh__overview');
  const meshGradient = container.querySelector('quiet-mesh-gradient');
  const colorInput = container.querySelector('quiet-color-input');
  const complexitySlider = container.querySelector('quiet-slider[label="Complexity"]');
  const seedButton = container.querySelector('quiet-button');

  colorInput.addEventListener('input', () => {
    meshGradient.style.setProperty('--gradient-color', colorInput.value);
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
      padding: 2rem;
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

## Examples

### Base Color

Set a specific base color for the gradient using the CSS custom property:

```html {.example .flex-col}
<quiet-mesh-gradient style="--gradient-color: #ff9797;">
  <p>Light gradient with dark text</p>
</quiet-mesh-gradient>
<quiet-mesh-gradient style="--gradient-color: #2c3e50;">
  <p>Dark gradient with light text</p>
</quiet-mesh-gradient>
<quiet-mesh-gradient style="--gradient-color: #468df8;">
  <p>Medium gradient with optimal contrast</p>
</quiet-mesh-gradient>
```

### Automatic Text Color

The component automatically calculates the optimal text color (black or white) based on the gradient's base color:

```html {.example .flex-col}
<quiet-mesh-gradient class="gradient-demo" style="--gradient-color: #ffd93d;">
  <h3>Light Background</h3>
  <p>Automatically uses dark text</p>
</quiet-mesh-gradient>

<quiet-mesh-gradient class="gradient-demo" style="--gradient-color: #1e3a8a;">
  <h3>Dark Background</h3>
  <p>Automatically uses light text</p>
</quiet-mesh-gradient>
```

### Custom Complexity

Control the number of gradient layers with the `complexity` property:

```html {.example .flex-col}
<quiet-mesh-gradient complexity="2" style="--gradient-color: #FF6B6B;" seed="100"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="6" style="--gradient-color: #FF6B6B;" seed="100"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="8" style="--gradient-color: #FF6B6B;" seed="100"></quiet-mesh-gradient>
```

### Seeded Gradients

Use a seed value for consistent gradient generation:

```html {.example .flex-col}
<quiet-mesh-gradient seed="42" style="--gradient-color: #9B59B6;"></quiet-mesh-gradient>
<quiet-mesh-gradient seed="42" style="--gradient-color: #9B59B6;"></quiet-mesh-gradient>
<!-- These two will look identical -->
```

### Providing Content

Place content over the gradient using the default slot with automatic text color:

```html {.example}
<quiet-mesh-gradient class="content-example" style="--gradient-color: steelblue;">
  <h2>Beautiful Mesh Gradient</h2>
  <p>Content displayed with optimal text color</p>
</quiet-mesh-gradient>
```

### Card Backgrounds

Use in the media slot for cards with readable text:

```html {.example}
<quiet-card style="max-width: 340px;">
  <quiet-mesh-gradient 
    slot="media"
    complexity="3" 
    style="--gradient-color: #FF6B6B; height: 200px; padding: 2rem;"
  >
    <h3>Card Title</h3>
    <p>This card has a beautiful mesh gradient background with readable text.</p>
  </quiet-mesh-gradient>  

  <p>There's nothing more delightful than watching a curious kitten explore the world with big, innocent eyes and tiny, playful paws.</p>
  <quiet-button slot="footer" variant="primary">I agree</quiet-button>
  <quiet-button slot="footer">Learn more</quiet-button>
</quiet-card>
```

### Hero Section

Create an eye-catching hero section with automatic text contrast:

```html {.example}
<style>
  .hero-section {
    height: 400px;
    padding: 3rem;
    text-align: center;
  }
  
  .hero-section h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero-section p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
</style>

<quiet-mesh-gradient 
  class="hero-section"
  complexity="3"
  seed="123"
  style="--gradient-color: #787cbf;"
>
  <h1>Welcome to QuietUI</h1>
  <p>Beautiful, accessible web components</p>
  <quiet-button pill>Get Started</quiet-button>
</quiet-mesh-gradient>
```