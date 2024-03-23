---
title: Themes
description: Customize Quiet with themes.
layout: docs
---

The default theme provides simple, elegant styles with support for light and dark modes. A number of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are exposed, giving you an easy way to make high-level changes to the library.

## Using the default theme

To import the default theme from the CDN, add the following code to the `<head>` of your page.

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/quiet.css' %}">
```

### Activating dark mode

Light mode "just works" once you import the default theme. To switch to dark mode, add the `quiet-dark` class to the `<html>` element as shown below. Removing the class will switch back to light mode.

```html
<html class="quiet-dark">
  ...
</html>
```

If you're using [Quiet Restyle](/docs/restyle), the entire page will enter dark mode. If you're not using Restyle, only the components will change and it's up to you to style the rest of your app accordingly.

## Theme concepts

Quiet's default theme is designed to be highly customizable with minimal effort. The following seed colors are used to generate color palettes with pure CSS — one for each variant.


```css
:root {
  --quiet-primary-seed: #989cff;
  --quiet-neutral-seed: #a4a6b0;
  --quiet-constructive-seed: #7db664;
  --quiet-destructive-seed: #f86565;
}
```

This means you can customize an entire palette by setting a single custom property in your stylesheet. For example, this will change the primary color palette from violet to orange.

```css
:root {
  --quiet-primary-seed: #e98d61;
}
```

:::info
For best results, use midtone colors to seed palettes. Any of the 500-level colors from [color.surf](https://color.surf) or similar palettes will work well.
:::

### Color primitives

Four primitive color palettes are generated based on the aforementioned seed colors. These palettes correspond with the four variants used throughout the library and remain static in light and dark mode.

Think of the primary variant as your brand color; neutral is usually gray, representing surfaces and secondary objects; constructive is often green, indicating creation or success; and destructive is often red, indicating deletion or danger.

<div class="colors">
  <div class="color" style="background-color: var(--quiet-primary-50);"></div>
  <div class="color" style="background-color: var(--quiet-primary-100);"></div>
  <div class="color" style="background-color: var(--quiet-primary-200);"></div>
  <div class="color" style="background-color: var(--quiet-primary-300);"></div>
  <div class="color" style="background-color: var(--quiet-primary-400);"></div>
  <div class="color" style="background-color: var(--quiet-primary-500);"></div>
  <div class="color" style="background-color: var(--quiet-primary-600);"></div>
  <div class="color" style="background-color: var(--quiet-primary-700);"></div>
  <div class="color" style="background-color: var(--quiet-primary-800);"></div>
  <div class="color" style="background-color: var(--quiet-primary-900);"></div>
  <div class="color" style="background-color: var(--quiet-primary-950);"></div>
</div>
<div class="colors">
  <div class="color" style="background-color: var(--quiet-neutral-50);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-100);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-200);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-300);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-400);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-500);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-600);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-700);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-800);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-900);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-950);"></div>
</div>
<div class="colors">
  <div class="color" style="background-color: var(--quiet-constructive-50);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-100);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-200);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-300);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-400);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-500);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-600);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-700);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-800);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-900);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-950);"></div>
</div>
<div class="colors">
  <div class="color" style="background-color: var(--quiet-destructive-50);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-100);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-200);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-300);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-400);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-500);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-600);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-700);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-800);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-900);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-950);"></div>
</div>

==TODO - figure out a good way to visualize these colors and vars and add click-to-copy==

You should only use color primitives when you want a color that doesn't change in dark mode. For most styles, you probably want to use [adaptive colors](#adaptive-colors) instead.

:::info
While not recommended, it is technically possible to override the primitives for even more control over your application's color palettes.
:::

### Adaptive colors

Design tokens automatically change between light and dark modes. Instead of numeric values, they use a scale that indicates their "volume" relative to the the app's background. Thus, "softer" colors have less contrast than "louder" ones. This approach lets you style most elements one time, but they'll look great in both color schemes.

Fill tokens are primarily used for backgrounds and surfaces; text-on colors provide adequate contrast when used on top of the respective fill color; and stroke colors are used to draw borders and outlines.

Replace `{variant}` with one of `primary`, `neutral`, `constructive`, or `destructive` in any of the tokens below.

<quiet-tab-list label="Color tokens">
<quiet-tab slot="tab" panel="fill">Fill colors</quiet-tab>
<quiet-tab slot="tab" panel="text">Text color</quiet-tab>
<quiet-tab slot="tab" panel="stroke">Stroke colors</quiet-tab>

<quiet-tab-panel name="fill">

| Custom property                 | Used for                                       |
| ------------------------------- | ---------------------------------------------- |
| `--quiet-{variant}-fill-softer` | Very subtle backgrounds with minimal contrast  |
| `--quiet-{variant}-fill-soft`   | Subtle backgrounds with little contrast        |
| `--quiet-{variant}-fill-mid`    | A midtone fill with moderate contrast          |
| `--quiet-{variant}-fill-loud`   | Strong backgrounds with a lot of contrast      |
| `--quiet-{variant}-fill-louder` | Very strong backgrounds with extra contrast    |

</quiet-tab-panel>

<quiet-tab-panel name="text">

| Custom property                  | Used for                       |
| -------------------------------- | ------------------------------ |
| `--quiet-{variant}-text-on-soft` | Text on top of soft fills      |
| `--quiet-{variant}-text-on-mid`  | Text on top of midtone fills   |
| `--quiet-{variant}-text-on-loud` | Text on top of loud fills      |
| `--quiet-neutral-text-colorful`  | Colored text, such as links    |

</quiet-tab-panel>

<quiet-tab-panel name="stroke">

| Custom property                   | Used for                              |
| --------------------------------- | ------------------------------------- |
| `--quiet-{variant}-stroke-softer` | Very subtle borders and outlines      |
| `--quiet-{variant}-stroke-soft`   | Subtle borders and outlines           |

</quiet-tab-panel>
</quiet-tab-list>

==TODO - figure out a good way to visualize these colors and vars and add click-to-copy==

### Design tokens

Aside from color palettes, the following tokens can be used to customize the overall appearance of the default theme. More granular customizations can be made to components with [CSS parts](/docs/using-web-components/#css-parts).

#### Application tokens

==TODO==

#### Typography tokens

==TODO==

#### Form tokens

==TODO==

<style>
  .colors {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    justify-content: center;
    gap: .25rem;
    margin-block-end: var(--quiet-content-spacing);

    .color {
      aspect-ratio: 2 / 1.25;
      border-radius: 2px;
    }
  }

  .colors:has(+ .colors) {
    margin-block-end: .25rem;
  }
</style>
