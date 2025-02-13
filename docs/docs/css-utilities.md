---
title: CSS Utilities
description: It's dangerous to go alone. Take these optional CSS utilities!
layout: docs
---

A handful of optional CSS utilities are provided to make common things a little easier. The goal isn't to be comprehensive, but to reduce boilerplate in your stylesheet.

## Usage

To add the CSS utilities to your app, add the following markup to the `<head>` of your document. If you haven't included a theme yet, make sure to add the default theme as well.

```html
<!-- Default theme (if not already installed) -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">

<!-- CSS utilities -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/utilities.css' %}">
```

## Flex utilities [experimental]

Flex utilities let you create rows and columns with consistent spacing and without extra styles.

### Inline

To create a horizontal flex container that wraps, use the `quiet-inline-{size}` class where `{size}` is `0`, `xs`, `sm`, `md`, `lg`, or `xl`.

```html {.example}
<div class="quiet-inline-0" style="margin-block-end: .5rem;">
  <div class="box">0</div>
  <div class="box">0</div>
  <div class="box">0</div>
  <div class="box">0</div>
</div>
<div class="quiet-inline-xs" style="margin-block-end: .5rem;">
  <div class="box">xs</div>
  <div class="box">xs</div>
  <div class="box">xs</div>
  <div class="box">xs</div>
</div>
<div class="quiet-inline-sm" style="margin-block-end: .5rem;">
  <div class="box">sm</div>
  <div class="box">sm</div>
  <div class="box">sm</div>
  <div class="box">sm</div>
</div>
<div class="quiet-inline-md" style="margin-block-end: .5rem;">
  <div class="box">md</div>
  <div class="box">md</div>
  <div class="box">md</div>
  <div class="box">md</div>
</div>
<div class="quiet-inline-lg" style="margin-block-end: .5rem;">
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

To create a vertical flex container, use the `quiet-stack-{size}` class where `{size}` is `0`, `xs`, `sm`, `md`, `lg`, or `xl`.

```html {.example}
<div class="quiet-inline-sm">
  <div class="quiet-stack-0">
    <div class="box">0</div>
    <div class="box">0</div>
    <div class="box">0</div>
    <div class="box">0</div>
  </div>
  <div class="quiet-stack-xs">
    <div class="box">xs</div>
    <div class="box">xs</div>
    <div class="box">xs</div>
    <div class="box">xs</div>
  </div>
  <div class="quiet-stack-sm">
    <div class="box">sm</div>
    <div class="box">sm</div>
    <div class="box">sm</div>
    <div class="box">sm</div>
  </div>
  <div class="quiet-stack-md">
    <div class="box">md</div>
    <div class="box">md</div>
    <div class="box">md</div>
    <div class="box">md</div>
  </div>
  <div class="quiet-stack-lg">
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

## Side labels

Add `class="quiet-side-label"` to any Quiet form control that has a label, description, and text box to move the label to the side. To change the width of the label, set the `--label-width` custom property on the respective elements.

```html {.example}
<quiet-text-field 
  class="quiet-side-label"
  style="--label-width: 8ch;"
  label="Name" 
  description="What do you like to be called?" 
></quiet-text-field>

<br>

<quiet-color-input
  class="quiet-side-label"
  style="--label-width: 8ch;"
  name="color" 
  label="Color" 
  description="Make it pop"
></quiet-color-input>

<br>

<quiet-slider
  class="quiet-side-label"
  style="--label-width: 8ch;"
  label="Quantity" 
  description="How much do you want?"
  with-markers
  min="0"
  max="10"
  value="5"
></quiet-slider>

<br>

<quiet-text-area 
  class="quiet-side-label"
  style="--label-width: 8ch;"
  name="Instructions" 
  description="Tell us the good and the bad"
  label="Feedback"
></quiet-text-area>
```

:::info
The `quiet-side-label` class doesn't work on native form controls.
:::

## Visually hidden

Visually hidden classes provide ways to hide content from the screen while maintaining accessibility for assistive technologies.

- `quiet-vh` (visually hidden) - Use when an element must be accessible to assistive technologies like screen readers but should remain hidden in other circumstances.
- `quiet-vh-focusable` - The same as `quiet-vh`, but it will show when the element or any of its children receive focus. Useful for things like "skip to content" links.
- `quiet-vh-label` - Apply this to any Quiet form control that has a `label` part to visually hide the label.
- `quiet-vh-description` - Apply this to any Quiet form control that has a `description` part to visually hide the description.

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