---
title: Mesh Gradient
layout: component
---

```html {.example}
<quiet-mesh-gradient></quiet-mesh-gradient>
```

TODO - add a refresh button to regenerate a random one

## Examples

### Basic Usage

The simplest way to use the mesh gradient is without any properties. It will generate a random gradient each time:

```html {.example}
<quiet-mesh-gradient></quiet-mesh-gradient>
```

### Base Color

Set a specific base color for the gradient using hex format:

```html {.example .flex-col}
<quiet-mesh-gradient base-color="red"></quiet-mesh-gradient>
<quiet-mesh-gradient base-color="green"></quiet-mesh-gradient>
<quiet-mesh-gradient base-color="blue"></quiet-mesh-gradient>
```

TODO - add a color input for base color

### Tones

```html {.example .flex-col}
<!-- Light, airy gradient -->
<quiet-mesh-gradient tone="light" base-color="#4F46E5"></quiet-mesh-gradient>

<!-- Default medium tone (current behavior) -->
<quiet-mesh-gradient tone="medium" base-color="#4F46E5"></quiet-mesh-gradient>

<!-- Dark, moody gradient -->
<quiet-mesh-gradient tone="dark" base-color="#4F46E5"></quiet-mesh-gradient>

<!-- Vibrant, punchy gradient -->
<quiet-mesh-gradient tone="vibrant" base-color="4F46E5"></quiet-mesh-gradient>
```

TODO - add a radio to select tone and use a seed
TODO - can we create a more sensible scale with a more consistent visual result?

### Custom Complexity

Control the number of gradient layers with the `complexity` property:

```html {.example .flex-col}
<quiet-mesh-gradient complexity="2" base-color="#FF6B6B"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="6" base-color="#FF6B6B"></quiet-mesh-gradient>
<quiet-mesh-gradient complexity="8" base-color="#FF6B6B"></quiet-mesh-gradient>
```

TODO - add a slider and use a seed for this

### Seeded Gradients

Use a seed value for consistent gradient generation:

```html {.example .flex-col}
<quiet-mesh-gradient seed="42" base-color="#9B59B6"></quiet-mesh-gradient>
<quiet-mesh-gradient seed="42" base-color="#9B59B6"></quiet-mesh-gradient>
<!-- These two will look identical -->
```

### Providing content

Place content over the gradient using the default slot:

```html {.example}
<quiet-mesh-gradient base-color="steelblue" tone="dark">
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
  base-color="#2ECC71">
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
    base-color="#FF6B6B"
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
  base-color="#787cbf"
  tone="medium"
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