---
title: Mesh Gradient
layout: component
---

```html {.example}
<div id="mesh__overview">
  <!-- This generates a mesh gradient -->
  <quiet-mesh-gradient 
    style="--gradient-color: #f97316;"
    complexity="3" 
    seed="75"
    brightness="40"
  >
    <h2>A Purrfect Mesh</h2>
    <p>Text colors automatically adjusts to ensure readability</p>
  </quiet-mesh-gradient>

  <!-- Everything below is code for the demo -->
  <div class="row">
    <quiet-color-input 
      label="Base color"
      value="#f97316"
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

  <quiet-slider
    label="Brightness"
    min="-100"
    max="100"
    value="40"
    with-tooltip
  ></quiet-slider>

  <div class="row">
    <quiet-copy class="copy-html">
      <quiet-button>
        <quiet-icon slot="start" name="file-type-html"></quiet-icon>
        Copy Component HTML
      </quiet-button>
    </quiet-copy>

    <quiet-copy class="copy-css">
      <quiet-button>
        <quiet-icon slot="start" name="file-type-css"></quiet-icon>
        Copy Gradient CSS
      </quiet-button>
    </quiet-copy>
  </div>
</div>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  const container = document.getElementById('mesh__overview');
  const meshGradient = container.querySelector('quiet-mesh-gradient');
  const colorInput = container.querySelector('quiet-color-input');
  const complexitySlider = container.querySelector('quiet-slider[label="Complexity"]');
  const brightnessSlider = container.querySelector('quiet-slider[label="Brightness"]');
  const seedButton = container.querySelector('quiet-button');
  const copyHtmlButton = container.querySelector('.copy-html');
  const copyCssButton = container.querySelector('.copy-css');  

  // Track current values
  let currentValues = {
    color: '#f97316',
    complexity: 3,
    seed: 75,
    brightness: 40
  };

  colorInput.addEventListener('input', () => {
    currentValues.color = colorInput.value;
    meshGradient.style.setProperty('--gradient-color', currentValues.color);
    updateCopyData();
  });

  complexitySlider.addEventListener('input', () => {
    currentValues.complexity = complexitySlider.value;
    meshGradient.complexity = currentValues.complexity;
    updateCopyData();
  });

  brightnessSlider.addEventListener('input', () => {
    currentValues.brightness = brightnessSlider.value;
    meshGradient.brightness = currentValues.brightness;
    updateCopyData();
  });

  seedButton.addEventListener('click', () => {
    currentValues.seed = Math.floor(Math.random() * 1000) + 1;
    meshGradient.seed = currentValues.seed;
    updateCopyData();
  });
  
  // Update the copy button's data
  function updateCopyData() {
    copyHtmlButton.data = `
  <quiet-mesh-gradient
    style="--gradient-color: ${currentValues.color};"
    complexity="${currentValues.complexity}"
    seed="${currentValues.seed}"
    brightness="${currentValues.brightness}"
  >
    <!-- Your content here -->
  </quiet-mesh-gradient>
  `.trim();

    // Get CSS from the component's rendered styles
    const textColor = meshGradient.style.getPropertyValue('--optimal-text-color') || 'inherit';
    const gradientEl = meshGradient.shadowRoot.querySelector('#gradient');
    const gradientStyle = gradientEl.getAttribute('style') || '';    
    const cssProperties = gradientStyle.trim().replace(/;\s*/g, ';\n  ').replace(/;\n  $/, ';');

    copyCssButton.data = `
.mesh-gradient {
  color: ${textColor};
  ${cssProperties}
}
    `.trim();
  }
  
  await allDefined();

  // Initialize copy data
  updateCopyData();
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

    quiet-color-input {
      flex: 1;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: end;
    }
  }
</style>
```

:::info
This component is convenient, but it adds a lot more bytes than the gradient's CSS alone. If you don't need to generate mesh gradients dynamically, you'll get better performance using this generator and copying the gradient's CSS directly into your project.
:::

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

### Brightness Control

Adjust the brightness from -100 (darker) to +100 (lighter). Positive values create a tinted effect (lighter and slightly desaturated), while negative values create a shaded effect (darker while maintaining richness):

```html {.example .flex-col}
<quiet-mesh-gradient style="--gradient-color: #3b82f6;" brightness="-50" seed="100">
  <p>Darker shade (-50)</p>
</quiet-mesh-gradient>
<quiet-mesh-gradient style="--gradient-color: #3b82f6;" brightness="0" seed="100">
  <p>Original color (0)</p>
</quiet-mesh-gradient>
<quiet-mesh-gradient style="--gradient-color: #3b82f6;" brightness="50" seed="100">
  <p>Lighter tint (+50)</p>
</quiet-mesh-gradient>
```

### Automatic Text Color

The component automatically calculates the optimal text color (black or white) based on the gradient's base color and brightness:

```html {.example .flex-col}
<quiet-mesh-gradient class="gradient-demo" style="--gradient-color: #ffd93d;">
  <h3>Light Background</h3>
  <p>Automatically uses dark text</p>
</quiet-mesh-gradient>

<quiet-mesh-gradient class="gradient-demo" style="--gradient-color: #1e3a8a;">
  <h3>Dark Background</h3>
  <p>Automatically uses light text</p>
</quiet-mesh-gradient>

<quiet-mesh-gradient class="gradient-demo" style="--gradient-color: #808080;" brightness="60">
  <h3>Brightened Gray</h3>
  <p>Text color adjusts with brightness</p>
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

### Dramatic Effects with Brightness

Create dramatic light and dark variations of the same color:

```html {.example .flex-col}
<quiet-mesh-gradient 
  style="--gradient-color: #ec4899; height: 150px; padding: 2rem;"
  brightness="-75"
  seed="200"
>
  <h3>Deep Shadow</h3>
  <p>Rich, vibrant dark variant</p>
</quiet-mesh-gradient>

<quiet-mesh-gradient 
  style="--gradient-color: #ec4899; height: 150px; padding: 2rem;"
  brightness="75"
  seed="200"
>
  <h3>Soft Glow</h3>
  <p>Light, luminous variant</p>
</quiet-mesh-gradient>
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
  brightness="20"
>
  <h1>Welcome to QuietUI</h1>
  <p>Beautiful, accessible web components</p>
  <quiet-button pill>Get Started</quiet-button>
</quiet-mesh-gradient>
```