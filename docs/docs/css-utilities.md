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

## Color scheme utilities

Sometimes it's useful to conditionally show content based on the current color scheme. This is especially true for images, where you can't easily change its colors with CSS. Elements with these classes will only be shown when the respective light or dark color scheme is showing.

- `quiet-if-light` - Use when you want to show an element only in light mode.
- `quiet-if-dark` - Use when you want to show an element only in dark mode.

```html
<!-- Shown only in light mode -->
<img class="quiet-if-light" src="..." alt="...">

<!-- Shown only in dark mode -->
<img class="quiet-if-dark" src="..." alt="...">
```

:::info
Because Quiet's [theming API](/docs/theming) allows dark and light themes to coexist on the page, color scheme detection is based on the use of `quiet-light` and `quiet-dark`, not the browser's `prefers-color-scheme` preference.
:::

## Visually hidden elements

Visually hidden classes provide ways to hide content from the screen while maintaining accessibility for assistive technologies.

- `quiet-vh` (visually hidden) - Use when an element must be accessible to assistive technologies like screen readers but should remain hidden in other circumstances.
- `quiet-vh-focusable` - The same as `quiet-vh`, but it will show when the element or any of its children receive focus. Useful for things like "skip to content" links.
- `quiet-vh-label` - Apply this to any Quiet form control that has a `label` part to visually hide the label.
- `quiet-vh-description` - Apply this to any Quiet form control that has a `description` part to visually hide the description.

```html
<!-- Hidden but discoverable by screen readers -->
<h3 class="quiet-vh">...</h3>
```

## Form controls

### Automatic validation styles

If you're using [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation), add the `quiet-user-valid` and/or `quiet-user-invalid` classes to any form control to automatically show the appropriate validity state _after_ the user interacts with the control. 

```html {.example}
<quiet-text-field
  class="quiet-user-valid"
  label="Enter text, then blur" 
  description="I automatically show the valid state after user interaction" 
  required
  clearable
></quiet-text-field>

<br>

<quiet-text-field
  class="quiet-user-invalid"
  label="Hit the clear button" 
  description="I automatically show the invalid state after user interaction" 
  value="Delete this text"
  required
  clearable
></quiet-text-field>

<br>

<quiet-text-field
  class="quiet-user-valid quiet-user-invalid"
  label="Enter text, then blur, then clear" 
  description="I automatically show the valid or invalid state after user interaction" 
  required
  clearable
></quiet-text-field>
```

### Manual validation styles

If you need to control validation styles manually, add the `quiet-force-valid` or `quiet-force-invalid` class. This will force the form control to appear as valid or invalid, regardless of its actual validity.

```html {.example}
<quiet-text-field
  class="quiet-force-valid"
  label="I totally am valid" 
  description="Hints are also valid" 
></quiet-text-field>

<br>

<quiet-text-field
  class="quiet-force-invalid"
  label="I'm totally not valid" 
  description="Hints are also invalid" 
></quiet-text-field>
```

:::warn
Manual validation styles are primarily used for server-side validation. Avoid using them with [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation).
:::

### Showing labels on the side

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