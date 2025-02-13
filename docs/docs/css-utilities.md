---
title: CSS Utilities
description: It's dangerous to go alone. Take these optional CSS utilities!
layout: docs
---

A handful of optional CSS utilities are provided to make common things a little easier.

## Usage

To add the CSS utilities to your app, add the following markup to the `<head>` of your document. If you haven't included a theme yet, make sure to add the default theme as well.

```html
<!-- Default theme (if not already installed) -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">

<!-- CSS utilities -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/utilities.css' %}">
```

### Side labels

Add `class="quiet-side-label"` to any Quiet form control that has a label, description, and text box to move the label to the side. To change the width of the label, set the `--label-width` custom property on the respective elements.

```html {.example}
<quiet-text-field 
  class="quiet-side-label"
  style="--label-width: 8ch;"
  label="Name" 
  description="What do you like to be called?" 
></quiet-text-field>

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

### Visually hidden

Visually hidden classes provide ways to hide content from the screen while maintaining accessibility for assistive technologies.

- `quiet-vh` (visually hidden) - Use when an element must be accessible to assistive technologies like screen readers but should remain hidden in other circumstances.
- `quiet-vh-focusable` - The same as `quiet-vh`, but it will show when the element or any of its children receive focus. Useful for things like "skip to content" links.
- `quiet-vh-label` - Apply this to any Quiet form control that has a `label` part to visually hide the label.
- `quiet-vh-description` - Apply this to any Quiet form control that has a `description` part to visually hide the description.
