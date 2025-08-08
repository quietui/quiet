---
title: Mesh Gradient
layout: component
---

Sunset vibes

```html {.example}
<quiet-mesh-gradient
  colors="#ff7043 #ff5722 #f44336 #9c27b0"
></quiet-mesh-gradient>
```

Ocean dreams

```html {.example}
<quiet-mesh-gradient
  colors="#667eea #764ba2 #f093fb #f5576c"
></quiet-mesh-gradient>
```

Cosmic purple

```html {.example}
<quiet-mesh-gradient
  colors="#4c1d95 #7c3aed #a855f7 #ec4899"
></quiet-mesh-gradient>
```

Tropical mint

```html {.example}
<quiet-mesh-gradient
  colors="#06ffa5 #ffffff #00d4ff #7209b7"
></quiet-mesh-gradient>
```

Warm earth

```html {.example}
<quiet-mesh-gradient
  colors="#deb887 #cd853f #d2691e #8b4513"
></quiet-mesh-gradient>
```

Soft pastels

```html {.example}
<quiet-mesh-gradient
  colors="#ff9ff3 #54a0ff #5f27cd #00d2d3"
></quiet-mesh-gradient>
```

## Examples

### Basic gradient

The simplest mesh gradient automatically distributes colors evenly across the canvas. Just provide space-delimited hex colors and the component handles the rest.

```html {.example}
<quiet-mesh-gradient
  colors="#ff006e #fb5607 #ffbe0b #8338ec"
></quiet-mesh-gradient>
```

### Custom color positions

Use the `points` property to specify exact positions for each color. Coordinates are normalized from 0-1, where `0,0` is top-left and `1,1` is bottom-right.

```html {.example}
<quiet-mesh-gradient
  colors="#7209b7 #3a0ca3 #4361ee #4cc9f0"
  points="0.1,0.1 0.9,0.2 0.8,0.9 0.2,0.8"
  width="500"
  height="300"
></quiet-mesh-gradient>
```

### Smooth interpolation

The `interpolation` property controls how colors blend. Use `smooth` for softer, more organic gradients with quadratic falloff.

```html {.example}
<!-- Linear interpolation (default) -->
<quiet-mesh-gradient
  colors="#f72585 #b5179e #7209b7 #4361ee"
  interpolation="linear"
></quiet-mesh-gradient>
```

```html {.example}
<!-- Smooth interpolation -->
<quiet-mesh-gradient
  colors="#f72585 #b5179e #7209b7 #4361ee"
  interpolation="smooth"
></quiet-mesh-gradient>
```

### Tension control

The `tension` property (0-1) controls blend intensity. Lower values create smoother, more diffuse gradients, while higher values create sharper color boundaries.

```html {.example}
<!-- Low tension (0.2) - very smooth blending -->
<quiet-mesh-gradient
  colors="#e63946 #f1faee #a8dadc #457b9d"
  tension="0.2"
></quiet-mesh-gradient>

<!-- High tension (0.8) - sharper color boundaries -->
<quiet-mesh-gradient
  colors="#e63946 #f1faee #a8dadc #457b9d"
  tension="0.8"
></quiet-mesh-gradient>
```

### Custom dimensions

Set explicit `width` and `height` in pixels. The gradient will scale to fill the specified dimensions while maintaining smooth color blending.

```html {.example}
<quiet-mesh-gradient
  colors="#03045e #0077b6 #00b4d8 #90e0ef #caf0f8"
  width="800"
  height="200"
></quiet-mesh-gradient>
```

### Multi-color gradients

Create complex gradients with many colors. The component supports up to 16 colors, automatically arranging them in a circular pattern when no points are specified.

```html {.example}
<quiet-mesh-gradient
  colors="#d00000 #dc2f02 #e85d04 #f48c06 #faa307 #ffba08"
  interpolation="smooth"
></quiet-mesh-gradient>
```

### Combining Features

Mix and match properties to create unique effects. This example combines custom positioning, smooth interpolation, and animation for an organic, flowing gradient.

```html {.example}
<quiet-mesh-gradient
  colors="#5e60ce #5390d9 #4ea8de #48bfe3 #56cfe1 #64dfdf"
  points="0.1,0.5 0.3,0.1 0.5,0.5 0.7,0.9 0.9,0.5 0.5,0.2"
  interpolation="smooth"
  tension="0.3"
  move
  animation-speed="0.2"
  width="600"
  height="400"
></quiet-mesh-gradient>
```

### Monochromatic Gradients

Create depth with shades of a single hue. This works particularly well with smooth interpolation for subtle, sophisticated effects.

```html {.example}
<quiet-mesh-gradient
  colors="#212529 #343a40 #495057 #6c757d #adb5bd #dee2e6"
  points="0.2,0.2 0.8,0.3 0.7,0.7 0.3,0.8"
  interpolation="smooth"
  tension="0.4"
></quiet-mesh-gradient>
```
