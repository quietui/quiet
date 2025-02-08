---
title: CSS Utilities
description: A handful of convenient utilities for common things.
layout: docs
---

Quiet offers a small collection of CSS utility classes you can use by adding the following stylesheet to your project. These utilities are optional and are not a replacement for writing CSS. Instead, they're intended to reduce some of the most common boilerplate for common use cases through sensible, easy to remember utilities.

## Usage

To add the CSS utilities to your app, add the following markup to the `<head>` of your document. If you haven't included a theme yet, make sure to add the default theme as well.

```html
<!-- Default theme (if not already installed) -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">

<!-- CSS utilities -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/utilities.css' %}">
```

## Flex utilities [experimental]

Flex utilities provide create rows and columns with consistent spacing. The sizes correspond to their respective spacing [design tokens](http://localhost:4000/docs/theming/#design-tokens).

### Inline

To create a horizontal flex container that wraps, use the `quiet-inline-{size}` class where `{size}` is `xs`, `sm`, `md`, `lg`, `xl`, or `0`.

```html {.example}
<div class="quiet-inline-0 quiet-mbe-md">
  <div class="box">0</div>
  <div class="box">0</div>
  <div class="box">0</div>
  <div class="box">0</div>
</div>

<div class="quiet-inline-xs quiet-mbe-md">
  <div class="box">xs</div>
  <div class="box">xs</div>
  <div class="box">xs</div>
  <div class="box">xs</div>
</div>

<div class="quiet-inline-sm quiet-mbe-md">
  <div class="box">sm</div>
  <div class="box">sm</div>
  <div class="box">sm</div>
  <div class="box">sm</div>
</div>

<div class="quiet-inline-md quiet-mbe-md">
  <div class="box">md</div>
  <div class="box">md</div>
  <div class="box">md</div>
  <div class="box">md</div>
</div>

<div class="quiet-inline-lg quiet-mbe-md">
  <div class="box">lg</div>
  <div class="box">lg</div>
  <div class="box">lg</div>
  <div class="box">lg</div>
</div>

<div class="quiet-inline-xl">
  <div class="box">xl</div>
  <div class="box">xl</div>
  <div class="box">xl</div>
  <div class="box">xl</div>
</div>
```

### Stack

To create a vertical flex container, use the `quiet-stack-{size}` class where `{size}` is `xs`, `sm`, `md`, `lg`, `xl`, or `0`.

```html {.example}
<div class="quiet-inline-md">
  <div class="quiet-stack-0 quiet-mie-xs">
    <div class="box">0</div>
    <div class="box">0</div>
    <div class="box">0</div>
    <div class="box">0</div>
  </div>

  <div class="quiet-stack-xs quiet-mie-xs">
    <div class="box">xs</div>
    <div class="box">xs</div>
    <div class="box">xs</div>
    <div class="box">xs</div>
  </div>

  <div class="quiet-stack-sm quiet-mie-xs">
    <div class="box">sm</div>
    <div class="box">sm</div>
    <div class="box">sm</div>
    <div class="box">sm</div>
  </div>

  <div class="quiet-stack-md quiet-mie-xs">
    <div class="box">md</div>
    <div class="box">md</div>
    <div class="box">md</div>
    <div class="box">md</div>
  </div>

  <div class="quiet-stack-lg quiet-mie-xs">
    <div class="box">lg</div>
    <div class="box">lg</div>
    <div class="box">lg</div>
    <div class="box">lg</div>
  </div>

  <div class="quiet-stack-xl">
    <div class="box">xl</div>
    <div class="box">xl</div>
    <div class="box">xl</div>
    <div class="box">xl</div>
  </div>
</div>
```

## Spacing utilities [experimental]

Padding and margins can be controlled with the following utility classes. Class names follow a consistent pattern where `p` is for padding and `m` is for margin, followed by directional indicators and size values.

[Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) are used instead of physical properties (e.g., `inline-start` instead of `left`) to effortlessly support different writing modes and RTL layouts.

Padding utilities are formatted as `.quiet-{property}{direction}-{size}` where:

### Properties

- `p` - for classes that set `padding`
- `m` - for classes that set `margin`

### Directions

- `is` - for classes that set `inline-start` (logical equivalent of left in LTR)
- `ie` - for classes that set `inline-end` (logical equivalent of right in LTR)
- `bs` - for classes that set `block-start` (logical equivalent of top)
- `be` - for classes that set `block-end` (logical equivalent of bottom)
- `i` - shorthand for setting both inline sides
- `b` - shorthand for setting both block sides

### Sizes

- `0` - eliminates spacing by setting it to `0`
- `xs` - sets spacing to `var(--quiet-space-xs)`
- `sm` - sets spacing to `var(--quiet-space-sm)`
- `md` - sets spacing to `var(--quiet-space-md)`
- `lg` - sets spacing to `var(--quiet-space-lg)`
- `xl` - sets spacing to `var(--quiet-space-xl)`
- `auto` - (margin only) sets margin to `auto`

### Padding classes

- `quiet-pis-{size}` - `padding inline start
- `quiet-pie-{size}` - padding inline end
- `quiet-pbs-{size}` - padding block start
- `quiet-pbe-{size}` - padding block end
- `quiet-pi-{size}` - padding inline (shorthand for start + end)
- `quiet-pb-{size}` - padding block (shorthand for start + end)

### Margin classes

- `quiet-mis-{size}` - margin inline start
- `quiet-mie-{size}` - margin inline end
- `quiet-mbs-{size}` - margin block start
- `quiet-mbe-{size}` - margin block end
- `quiet-mi-{size}` - margin inline (shorthand for start + end)
- `quiet-mb-{size}` - margin block (shorthand for start + end)

Margin utilities also support an additional `auto` property for alignment purposes.

## Visually hidden [stable]

Use these utilities to hide content visually while keeping it accessible to screen readers:

- `quiet-vh`: Hides content visually
- `quiet-vh-focusable`: Hides content visually but shows it when focused
- `quiet-vh-label`: Hides the label part of a component
- `quiet-vh-description`: Hides the description part of a component

<!-- Demo styles -->
<style>
  .box {
    display: flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    background-color: var(--quiet-primary-fill-mid);
    border-radius: var(--quiet-border-radius);
    color: var(--quiet-primary-text-on-mid);
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.2;
  }
</style>
