---
title: Theming
description: Theme concepts, color palettes, and design tokens.
layout: docs
---

Quiet features a sleek, modern aesthetic that looks great out of the box, especially when coupled with [Restyle](/docs/restyle). But it's also designed to be highly customizable — with pure CSS — for those who want something a little different.

The default theme provides simple, elegant styles with support for light and dark modes and 21 built-in color presets. A number of [design tokens](#design-tokens) are exposed, giving you an easy way to make high-level changes to the library.

## Using the default theme

To import the default theme from the CDN, add the following code to the `<head>` section of each page.

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
```

### Activating dark mode

Light mode "just works" once you import the default theme. To switch to dark mode, add the `quiet-dark` class to the `<html>` element as shown below. Removing the class will switch back to light mode.

```html
<html class="quiet-dark">
  ...
</html>
```

:::info
If you're using [Quiet Restyle](/docs/restyle), the entire page will enter dark mode. If you're not using Restyle, only the components will change and it's up to you to style the rest of your app accordingly.
:::

### Using light and dark on the same page

Sometimes, it's desirable to have a contrasting theme for certain sections of the page. For example, a light-themed page might have a dark-themed sidebar or footer. You can achieve this by applying the `quiet-light` or `quiet-dark` class to any element on the page.

```html {.example .no-buttons .flex-row}
<quiet-card class="quiet-light" style="text-align: center;">
  <p>This is a light card.</p>
  <quiet-button>
    Light button
  </quiet-button>
</quiet-card>

<quiet-card class="quiet-dark" style="text-align: center;">
  <p>This is a dark card.</p>
  <quiet-button>
    Dark button
  </quiet-button>
</quiet-card>
```

:::info
When using `quiet-light` and `quiet-dark`, you may want to set the background color to an appropriate value. You can use `--quiet-background-color` for an adaptive background. [Learn more about design tokens](#design-tokens)
:::

## Cascade Layers

Quiet uses [Cascade Layers](https://developer.mozilla.org/en-docs/Learn_web_development/Core/Styling_basics/Cascade_layers) to organize CSS with predictable specificity and allow easy customization. The library defines three layers:

- `quiet` - core theme styles
- `quiet-restyle` - optional CSS reset  
- `quiet-utilities` - optional utility classes

This approach ensures your custom styles will override library defaults simply by placing them in higher layers or using normal cascade rules, giving you complete control over styling precedence while maintaining the library's internal organization.

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

This means you can customize an entire palette by setting a single custom property in your stylesheet. For example, this will change the primary color palette to orange.

```css
:root {
  --quiet-primary-seed: #e98d61;
}
```

:::info
For best results, use midtone colors to seed palettes. Any of the 500-level colors from [color.surf](https://color.surf) or similar palettes will work well.
:::

### Built-in presets

For convenience, Quiet's default theme ships with 21 color presets to alter the library's primary color. The theme picker at the top of the page allows you to preview them.

To use a preset in your app, add the `quiet-{preset}` class to the `<html>` element, where `{preset}` is one of the following values: default, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, zinc, or stone.

```html
<html class="quiet-blue">
  ...
</html>
```

:::info
Presets must be added to the `<html>` element. They won't have any affect if you place them elsewhere on the page.
:::

### Adapting to existing brands

Using a preset is an easy way to change the library's overall appearance, but it probably won't be a perfect match if you already have brand guidelines to follow. In that case, it might be tempting to set `--quiet-primary-seed` to whatever your brand color is.

However, that will only work well if your brand color happens to be a midtone, otherwise the generated color tokens may not have enough contrast. A better approach is to use the nearest midtone color that fits with your brand.

_"But my buttons don't match my brand color exactly…"_

Components should absolutely be _on brand_, but that doesn't mean buttons have to be the exact hex color as your logo! However, if you insist on such a style, the correct way to achieve it is by overriding the generated palettes and/or component styles with CSS and ensuring proper contrast manually.

### Color primitives

Four primitive color palettes are generated based on the aforementioned seed colors. These palettes correspond with the four variants used throughout the library and remain static in light and dark mode.

You should only use color primitives when you want a color that doesn't change in dark mode. For most styles, you probably want to use [adaptive colors](#adaptive-colors) instead.

**Syntax:** `--quiet-{variant}-{number}`

<div class="palette">
  <h5>Primary</h5>
  <p class="description">This is your brand color. Use it for brand recognition and guiding attention through calls to action.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-primary-50)">
      <button aria-label="Primary 50" style="background-color: var(--quiet-primary-50);"></button> 50
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-100)">
      <button aria-label="Primary 100" style="background-color: var(--quiet-primary-100);"></button> 100
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-200)">
      <button aria-label="Primary 200" style="background-color: var(--quiet-primary-200);"></button> 200
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-300)">
      <button aria-label="Primary 300" style="background-color: var(--quiet-primary-300);"></button> 300
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-400)">
      <button aria-label="Primary 400" style="background-color: var(--quiet-primary-400);"></button> 400
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-500)">
      <button aria-label="Primary 500" style="background-color: var(--quiet-primary-500);"></button> 500
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-600)">
      <button aria-label="Primary 600" style="background-color: var(--quiet-primary-600);"></button> 600
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-700)">
      <button aria-label="Primary 700" style="background-color: var(--quiet-primary-700);"></button> 700
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-800)">
      <button aria-label="Primary 800" style="background-color: var(--quiet-primary-800);"></button> 800
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-900)">
      <button aria-label="Primary 900" style="background-color: var(--quiet-primary-900);"></button> 900
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-950)">
      <button aria-label="Primary 950" style="background-color: var(--quiet-primary-950);"></button> 950
    </quiet-copy>
  </div>

  <h5>Neutral</h5>
  <p class="description">Neutral is usually gray, representing surfaces, borders, and secondary objects.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-neutral-50)">
      <button aria-label="Neutral 50" style="background-color: var(--quiet-neutral-50);"></button> 50
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-100)">
      <button aria-label="Neutral 100" style="background-color: var(--quiet-neutral-100);"></button> 100
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-200)">
      <button aria-label="Neutral 200" style="background-color: var(--quiet-neutral-200);"></button> 200
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-300)">
      <button aria-label="Neutral 300" style="background-color: var(--quiet-neutral-300);"></button> 300
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-400)">
      <button aria-label="Neutral 400" style="background-color: var(--quiet-neutral-400);"></button> 400
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-500)">
      <button aria-label="Neutral 500" style="background-color: var(--quiet-neutral-500);"></button> 500
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-600)">
      <button aria-label="Neutral 600" style="background-color: var(--quiet-neutral-600);"></button> 600
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-700)">
      <button aria-label="Neutral 700" style="background-color: var(--quiet-neutral-700);"></button> 700
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-800)">
      <button aria-label="Neutral 800" style="background-color: var(--quiet-neutral-800);"></button> 800
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-900)">
      <button aria-label="Neutral 900" style="background-color: var(--quiet-neutral-900);"></button> 900
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-950)">
      <button aria-label="Neutral 950" style="background-color: var(--quiet-neutral-950);"></button> 950
    </quiet-copy>
  </div>

  <h5>Constructive</h5>
  <p class="description">Constructive is often green, indicating creation or success.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-constructive-50)">
      <button aria-label="Constructive 50" style="background-color: var(--quiet-constructive-50);"></button> 50
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-100)">
      <button aria-label="Constructive 100" style="background-color: var(--quiet-constructive-100);"></button> 100
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-200)">
      <button aria-label="Constructive 200" style="background-color: var(--quiet-constructive-200);"></button> 200
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-300)">
      <button aria-label="Constructive 300" style="background-color: var(--quiet-constructive-300);"></button> 300
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-400)">
      <button aria-label="Constructive 400" style="background-color: var(--quiet-constructive-400);"></button> 400
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-500)">
      <button aria-label="Constructive 500" style="background-color: var(--quiet-constructive-500);"></button> 500
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-600)">
      <button aria-label="Constructive 600" style="background-color: var(--quiet-constructive-600);"></button> 600
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-700)">
      <button aria-label="Constructive 700" style="background-color: var(--quiet-constructive-700);"></button> 700
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-800)">
      <button aria-label="Constructive 800" style="background-color: var(--quiet-constructive-800);"></button> 800
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-900)">
      <button aria-label="Constructive 900" style="background-color: var(--quiet-constructive-900);"></button> 900
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-950)">
      <button aria-label="Constructive 950" style="background-color: var(--quiet-constructive-950);"></button> 950
    </quiet-copy>
  </div>

  <h5>Destructive</h5>
  <p class="description">Destructive is often red, indicating deletion or danger.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-destructive-50)">
      <button aria-label="Destructive 50" style="background-color: var(--quiet-destructive-50);"></button> 50
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-100)">
      <button aria-label="Destructive 100" style="background-color: var(--quiet-destructive-100);"></button> 100
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-200)">
      <button aria-label="Destructive 200" style="background-color: var(--quiet-destructive-200);"></button> 200
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-300)">
      <button aria-label="Destructive 300" style="background-color: var(--quiet-destructive-300);"></button> 300
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-400)">
      <button aria-label="Destructive 400" style="background-color: var(--quiet-destructive-400);"></button> 400
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-500)">
      <button aria-label="Destructive 500" style="background-color: var(--quiet-destructive-500);"></button> 500
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-600)">
      <button aria-label="Destructive 600" style="background-color: var(--quiet-destructive-600);"></button> 600
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-700)">
      <button aria-label="Destructive 700" style="background-color: var(--quiet-destructive-700);"></button> 700
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-800)">
      <button aria-label="Destructive 800" style="background-color: var(--quiet-destructive-800);"></button> 800
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-900)">
      <button aria-label="Destructive 900" style="background-color: var(--quiet-destructive-900);"></button> 900
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-950)">
      <button aria-label="Destructive 950" style="background-color: var(--quiet-destructive-950);"></button> 950
    </quiet-copy>
  </div>
</div>

:::info
You can tap on any swatch on this page to copy the corresponding custom property.
:::

### Adaptive colors

Adaptive colors automatically change between light and dark modes. Instead of numeric values, they use a scale that indicates their "volume" relative to the the app's background. Thus, "softer" colors have less contrast than "louder" ones. This approach lets you style things once, but have them look great in light and dark modes.

#### Fill colors

Fill colors are primarily used for backgrounds and surfaces. For example, certain buttons use midtone fills for their backgrounds.

**Syntax:** `--quiet-{variant}-fill-{volume}`

<div class="palette">
  <h5>Primary fill colors</h5>
  <p class="description">Used for calls to action and brand accents.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-primary-fill-softer)">
      <button aria-label="Primary fill softer" style="background-color: var(--quiet-primary-fill-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-soft)">
      <button aria-label="Primary fill soft" style="background-color: var(--quiet-primary-fill-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-mid)">
      <button aria-label="Primary fill mid" style="background-color: var(--quiet-primary-fill-mid);"></button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-loud)">
      <button aria-label="Primary fill loud" style="background-color: var(--quiet-primary-fill-loud);"></button> loud
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-louder)">
      <button aria-label="Primary fill louder" style="background-color: var(--quiet-primary-fill-louder);"></button> louder
    </quiet-copy>
  </div>

  <h5>Neutral fill colors</h5>
  <p class="description">Used for secondary elements and UI chrome.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-neutral-fill-softer)">
      <button aria-label="Neutral fill softer" style="background-color: var(--quiet-neutral-fill-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-soft)">
      <button aria-label="Neutral fill soft" style="background-color: var(--quiet-neutral-fill-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-mid)">
      <button aria-label="Neutral fill mid" style="background-color: var(--quiet-neutral-fill-mid);"></button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-loud)">
      <button aria-label="Neutral fill loud" style="background-color: var(--quiet-neutral-fill-loud);"></button> loud
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-louder)">
      <button aria-label="Neutral fill louder" style="background-color: var(--quiet-neutral-fill-louder);"></button> louder
    </quiet-copy>
  </div>

  <h5>Constructive fill colors</h5>
  <p class="description">Used for successful operations such as creations.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-constructive-fill-softer)">
      <button aria-label="Constructive fill softer" style="background-color: var(--quiet-constructive-fill-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-soft)">
      <button aria-label="Constructive fill soft" style="background-color: var(--quiet-constructive-fill-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-mid)">
      <button aria-label="Constructive fill mid" style="background-color: var(--quiet-constructive-fill-mid);"></button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-loud)">
      <button aria-label="Constructive fill loud" style="background-color: var(--quiet-constructive-fill-loud);"></button> loud
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-louder)">
      <button aria-label="Constructive fill louder" style="background-color: var(--quiet-constructive-fill-louder);"></button> louder
    </quiet-copy>
  </div>
  
  <h5>Destructive fill colors</h5>
  <p class="description">Used for dangerous operations such as deletions.</p>
  <div class="swatches">
    <quiet-copy data="var(--quiet-destructive-fill-softer)">
      <button aria-label="Destructive fill softer" style="background-color: var(--quiet-destructive-fill-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-soft)">
      <button aria-label="Destructive fill soft" style="background-color: var(--quiet-destructive-fill-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-mid)">
      <button aria-label="Destructive fill mid" style="background-color: var(--quiet-destructive-fill-mid);"></button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-loud)">
      <button aria-label="Destructive fill loud" style="background-color: var(--quiet-destructive-fill-loud);"></button> loud
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-louder)">
      <button aria-label="Destructive fill louder" style="background-color: var(--quiet-destructive-fill-louder);"></button> louder
    </quiet-copy>
  </div>
</div>

#### Text-on colors

Text-on colors provide adequate contrast when used on top of their respective fill colors. Soft works on soft and softer fills whereas loud works on loud and louder fills.

**Syntax:** `--quiet-{variant}-text-on-{volume}`

<div class="palette">
  <h5>Primary text-on colors</h5>
  <p class="description">Used for text that sits on top of primary fills.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-primary-text-on-soft)">
      <button aria-label="Primary text-on soft" style="background-color: var(--quiet-primary-fill-soft); color: var(--quiet-primary-text-on-soft);">Lorem ipsum dolor</button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-text-on-mid)">
      <button aria-label="Primary text-on mid" style="background-color: var(--quiet-primary-fill-mid); color: var(--quiet-primary-text-on-mid);">Lorem ipsum dolor</button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-text-on-loud)">
      <button aria-label="Primary text-on loud" style="background-color: var(--quiet-primary-fill-loud); color: var(--quiet-primary-text-on-loud);">Lorem ipsum dolor</button> loud
    </quiet-copy>
  </div>

  <h5>Neutral text-on colors</h5>
  <p class="description">Used for text that sits on top of neutral fills.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-neutral-text-on-soft)">
      <button aria-label="Neutral text-on soft" style="background-color: var(--quiet-neutral-fill-soft); color: var(--quiet-neutral-text-on-soft);">Lorem ipsum dolor</button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-text-on-mid)">
      <button aria-label="Neutral text-on mid" style="background-color: var(--quiet-neutral-fill-mid); color: var(--quiet-neutral-text-on-mid);">Lorem ipsum dolor</button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-text-on-loud)">
      <button aria-label="Neutral text-on loud" style="background-color: var(--quiet-neutral-fill-loud); color: var(--quiet-neutral-text-on-loud);">Lorem ipsum dolor</button> loud
    </quiet-copy>
  </div>

  <h5>Constructive text-on colors</h5>
  <p class="description">Used for text that sits on top of constructive fills.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-constructive-text-on-soft)">
      <button aria-label="Constructive text-on soft" style="background-color: var(--quiet-constructive-fill-soft); color: var(--quiet-constructive-text-on-soft);">Lorem ipsum dolor</button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-text-on-mid)">
      <button aria-label="Constructive text-on mid" style="background-color: var(--quiet-constructive-fill-mid); color: var(--quiet-constructive-text-on-mid);">Lorem ipsum dolor</button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-text-on-loud)">
      <button aria-label="Constructive text-on loud" style="background-color: var(--quiet-constructive-fill-loud); color: var(--quiet-constructive-text-on-loud);">Lorem ipsum dolor</button> loud
    </quiet-copy>
  </div>

  <h5>Destructive text-on colors</h5>
  <p class="description">Used for text that sits on top of destructive fills.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-destructive-text-on-soft)">
      <button aria-label="Destructive text-on soft" style="background-color: var(--quiet-destructive-fill-soft); color: var(--quiet-destructive-text-on-soft);">Lorem ipsum dolor</button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-text-on-mid)">
      <button aria-label="Destructive text-on mid" style="background-color: var(--quiet-destructive-fill-mid); color: var(--quiet-destructive-text-on-mid);">Lorem ipsum dolor</button> mid
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-text-on-loud)">
      <button aria-label="Destructive text-on loud" style="background-color: var(--quiet-destructive-fill-loud); color: var(--quiet-destructive-text-on-loud);">Lorem ipsum dolor</button> loud
    </quiet-copy>
  </div>  
</div>

:::details A note about WCAG 2
You might discover that some elements are reported to have insufficient contrast, according to [WCAG 2](https://www.w3.org/WAI/standards-guidelines/wcag/). This occurs due to the standard not accounting for _perceptual_ contrast and only affects Quiet's text-on midtone colors.

Technically, <quiet-badge variant="primary" style="font-size: 0.9375rem; color: black;">black text</quiet-badge> has a higher contrast ratio than <quiet-badge variant="primary" style="font-size: 0.9375rem;">white text</quiet-badge> on these backgrounds, despite the former being harder for most people to see. While these color token combinations don't meet WCAG 2, they do meet the the forthcoming [APCA](https://github.com/Myndex/SAPC-APCA) standard, which is the likely candidate contrast method for WCAG 3.

_[Refer to this article](https://medium.com/@think_ui/why-color-contrast-is-not-as-black-and-white-as-it-seems-94197a72b005) to learn more about why WCAG 2 isn't a great standard for measuring perceptual contrast._
:::

#### Stroke colors

Stroke colors are used to draw borders and outlines around elements and UI chrome. By design, strokes have no loud variants.

**Syntax:** `--quiet-{variant}-stroke-{volume}`

<div class="palette">
  <h5>Primary stroke colors</h5>
  <p class="description">Used for outlining primary elements.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-primary-stroke-softer)">
      <button aria-label="Primary stroke softer" style="background-color: var(--quiet-primary-fill-softer); border: solid 1px var(--quiet-primary-stroke-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-stroke-soft)">
      <button aria-label="Primary stroke soft" style="background-color: var(--quiet-primary-fill-softer); border: solid 1px var(--quiet-primary-stroke-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-stroke-mid)">
      <button aria-label="Primary stroke mid" style="background-color: var(--quiet-primary-fill-softer); border: solid 1px var(--quiet-primary-stroke-mid);"></button> mid
    </quiet-copy>
  </div>

  <h5>Neutral stroke colors</h5>
  <p class="description">Used for outlining secondary elements.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-neutral-stroke-softer)">
      <button aria-label="Neutral stroke softer" style="background-color: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-stroke-soft)">
      <button aria-label="Neutral stroke soft" style="background-color: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-stroke-mid)">
      <button aria-label="Neutral stroke mid" style="background-color: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-mid);"></button> mid
    </quiet-copy>
  </div>

  <h5>Constructive stroke colors</h5>
  <p class="description">Used for outlining constructive elements.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-constructive-stroke-softer)">
      <button aria-label="Constructive stroke softer" style="background-color: var(--quiet-constructive-fill-softer); border: solid 1px var(--quiet-constructive-stroke-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-stroke-soft)">
      <button aria-label="Constructive stroke soft" style="background-color: var(--quiet-constructive-fill-softer); border: solid 1px var(--quiet-constructive-stroke-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-stroke-mid)">
      <button aria-label="Constructive stroke mid" style="background-color: var(--quiet-constructive-fill-softer); border: solid 1px var(--quiet-constructive-stroke-mid);"></button> mid
    </quiet-copy>
  </div>

  <h5>Destructive stroke colors</h5>
  <p class="description">Used for outlining destructive elements.</p>
  <div class="swatches swatches-text-on">
    <quiet-copy data="var(--quiet-destructive-stroke-softer)">
      <button aria-label="Destructive stroke softer" style="background-color: var(--quiet-destructive-fill-softer); border: solid 1px var(--quiet-destructive-stroke-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-stroke-soft)">
      <button aria-label="Destructive stroke soft" style="background-color: var(--quiet-destructive-fill-softer); border: solid 1px var(--quiet-destructive-stroke-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-stroke-mid)">
      <button aria-label="Destructive stroke mid" style="background-color: var(--quiet-destructive-fill-softer); border: solid 1px var(--quiet-destructive-stroke-mid);"></button> mid
    </quiet-copy>
  </div>    
</div>

#### Tinting & shading

These tokens represent pure black and white, but their values invert in dark mode. They're most commonly used to tint and shade existing colors with <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix"><code>color-mix()</code></a>.

**Syntax:** `--quiet-silent`, `--quiet-strident`

<div class="swatches">
  <quiet-copy data="var(--quiet-silent)">
    <button aria-label="Silent" style="background-color: var(--quiet-silent); border: solid 1px color-mix(in oklab, var(--quiet-strident), transparent 75%);"></button> silent
  </quiet-copy>
  <quiet-copy data="var(--quiet-strident)">
    <button aria-label="Strident" style="background-color: var(--quiet-strident); border: solid 1px var(--quiet-silent);"></button> strident
  </quiet-copy>
</div>

## Design tokens

Quiet uses a relatively small set of design tokens to create a consistent look and feel throughout the library. Design tokens are provided in the form of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties). The tokens are used internally by many components, and you can customize them to make the library better match your brand.

To customize design tokens, reassign them in CSS as shown below.

```css
/* Light theme Design token overrides */
:root,
.quiet-light {
  --quiet-background-color: white;
  --quiet-text-body: black;
}

/* Dark theme design token overrides */
.quiet-dark {
  --quiet-background-color: black;
  --quiet-text-body: white;
}
```

:::warn
Always scope design token overrides to the root node (i.e. the `<html>` element), otherwise calculated values may not propagate as expected.
:::

### Surface tokens

These tokens control various types of backgrounds, or "surfaces."

<quiet-scroller>

| Custom property | Description |
| --------------- | ----------- |
| `--quiet-background-color` | The application's background color. |
| `--quiet-paper-color` | An alternative background color for slightly lifted surfaces such as a card. |

</quiet-scroller>

### Typography tokens

These tokens control text and content.

<quiet-scroller>

| Custom property | Description |
| --------------- | ----------- |
| `--quiet-text-body` | The default text color of the app. |
| `--quiet-text-muted` | The color to use for muted text such as form control descriptions. |
| `--quiet-font-family` | The default font. |
| `--quiet-font-family-heading` | The font used for headings. |
| `--quiet-font-family-code` | The font used for code and code blocks. |
| `--quiet-font-size` | The base font size for the application. (The default theme is optimized for a 16px font size.)  |
| `--quiet-font-weight-normal` | The font weight for normal text. |
| `--quiet-font-weight-semibold` | The font weight for semibold text. |
| `--quiet-font-weight-bold` | The font weight for bold text. |
| `--quiet-line-height` | The default line height for text. |
| `--quiet-content-spacing` | The spacing between blocks of content. Used primarily in Restyle to space content consistently. |
| `--quiet-focus-color` | The color of the focus ring. |
| `--quiet-focus-ring` | The outline-friendly property used to show focus rings. |
| `--quiet-focus-width` | The width of the focus ring's border. |
| `--quiet-focus-offset` | The outline offset of the focus ring. |
| `--quiet-selection-background-color` | The background color of selected text. |
| `--quiet-selection-color` | The color of selected text. |

</quiet-scroller>

### Border tokens

These tokens control borders and edges.

<quiet-scroller>

| Custom property | Description |         |
| --------------- | ----------- | ------- |
| `--quiet-border-style` | The default border style for most elements. | |
| `--quiet-border-width` | The default border width for most elements. | |
| `--quiet-border-radius-xs` | Extra small border radii. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-xs);">xs</div> |
| `--quiet-border-radius-sm` | Small border radii. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-sm);">sm</div> |
| `--quiet-border-radius-md` | Medium border radii. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-md);">md</div> |
| `--quiet-border-radius-lg` | Large border radii. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-lg);">lg</div> |
| `--quiet-border-radius-xl` | Extra large border radii. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-xl);">xl</div> |
| `--quiet-border-radius-pill` | Pill-shaped borders. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-pill);">pill</div> |
| `--quiet-border-radius-circle` | Circular borders. | <div class="border" style="border: var(--quiet-border-width) solid var(--quiet-neutral-stroke-soft); border-radius: var(--quiet-border-radius-circle); width: 50px;"></div> |

</quiet-scroller>

### Shadow tokens

These tokens controls shadows and can be used with the `box-shadow` property.

<quiet-scroller>

| Custom property | Description |         |
| --------------- | ----------- | ------- |
| `--quiet-shadow-color` | The base color used in all shadows. | |
| `--quiet-shadow-softer` | The softest shadow, for subtle elevation effects. | <div class="shadow" style="box-shadow: var(--quiet-shadow-softer);">softer</div> |
| `--quiet-shadow-soft` | A gentle shadow, for light elevation effects. | <div class="shadow" style="box-shadow: var(--quiet-shadow-soft);">soft</div> |
| `--quiet-shadow-mid` | A moderate shadow, for clear elevation effects. | <div class="shadow" style="box-shadow: var(--quiet-shadow-mid);">mid</div> |
| `--quiet-shadow-loud` | A strong shadow, for prominent elevation effects. | <div class="shadow" style="box-shadow: var(--quiet-shadow-loud);">loud</div> |
| `--quiet-shadow-louder` | The strongest shadow, for maximum elevation effects. | <div class="shadow" style="box-shadow: var(--quiet-shadow-louder);">louder</div> |
| `--quiet-inset-shadow-softer` | The softest inset shadow, for subtle depression effects. | <div class="shadow" style="box-shadow: var(--quiet-inset-shadow-softer);">softer</div> |
| `--quiet-inset-shadow-soft` | A gentle inset shadow, for light depression effects. | <div class="shadow" style="box-shadow: var(--quiet-inset-shadow-soft);">soft</div> |
| `--quiet-inset-shadow-mid` | A moderate inset shadow, for clear depression effects. | <div class="shadow" style="box-shadow: var(--quiet-inset-shadow-mid);">mid</div> |
| `--quiet-inset-shadow-loud` | A strong inset shadow, for prominent depression effects. | <div class="shadow" style="box-shadow: var(--quiet-inset-shadow-loud);">loud</div> |
| `--quiet-inset-shadow-louder` | The strongest inset shadow, for maximum depression effects. | <div class="shadow" style="box-shadow: var(--quiet-inset-shadow-louder);">louder</div> |

</quiet-scroller>

### Form controls

These tokens control form control styles.

<quiet-scroller>

| Custom property | Description |
| --------------- | ----------- |
| `--quiet-form-control-height-xs` | The height of extra small form controls. |
| `--quiet-form-control-height-sm` | The height of small form controls. |
| `--quiet-form-control-height-md` | The height of medium form controls. |
| `--quiet-form-control-height-lg` | The height of large form controls. |
| `--quiet-form-control-height-xl` | The height of extra large form controls. |
| `--quiet-form-control-font-size-xs` | The font size of extra small form controls. |
| `--quiet-form-control-font-size-sm` | The font size of small form controls. |
| `--quiet-form-control-font-size-md` | The font size of medium form controls. |
| `--quiet-form-control-font-size-lg` | The font size of large form controls. |
| `--quiet-form-control-font-size-xl` | The font size of extra large form controls. |
| `--quiet-form-control-required-content` | The content to show next to the label when the form control is required. |
| `--quiet-form-control-placeholder-color` | The color of placeholder text |
| `--quiet-button-active-offset` | The amount of vertical shift to apply to buttons when they're pressed. |

</quiet-scroller>

### Miscellaneous tokens

Here are some additional tokens you can use and customize for various purposes.

<quiet-scroller>

| Custom property | Description |
| --------------- | ----------- |
| `--quiet-backdrop-color` | The color of backdrops for modal components such as dialog.  |
| `--quiet-backdrop-filter` | The filter to apply to dialog backdrops and similar overlays. |

</quiet-scroller>

## Creating your own theme

Quiet uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to manage specificity. This means your custom styles will automatically take precedence over the library's styles without needing to use `!important` or increase selector specificity.

If you just want to change a few things here and there, it's usually better to leave the default theme intact and _extend it_ by adding your own stylesheet with the specific rules you want. Use [design tokens](#design-tokens), [CSS custom properties](/docs/using-components/#css-custom-properties), [CSS parts](/docs/using-components/#css-parts), and [custom states](/docs/using-components/#custom-states) to customize virtually anything on any component.

This is the recommended approach. 👆

If you _really_ want to create an entirely new theme, the most efficient way is to fork ("copy") the [default theme's CSS](https://github.com/quietui/quiet/blob/main/src/themes/quiet.css) and modify it. This is faster, easier, and will result in less mistakes than starting from scratch.

## Adding custom variants

Some components offer multiple variants and appearances. Consider buttons, for example:

```html
<quiet-button>Normal button</quiet-button>
<quiet-button variant="primary">Primary button</quiet-button>
<quiet-button variant="destructive">Destructive button</quiet-button>
```

It may be tempting to add your own variants using attribute selectors.

```html
<quiet-button variant="custom-variant">Custom button</quiet-button>

<style>
  quiet-button[custom-variant] {
    /* custom styles */
  }
</style>
```

But it's much better to use classes for this purpose.

```html
<quiet-button class="custom-variant">Custom button</quiet-button>

<style>
  quiet-button.custom-variant {
    /* custom styles */
  }
</style>
```

This prevents type errors for users who have type checking enabled. It also maintains a clear separation between the library's responsibilities and your app's customizations.

<!-- Page styles -->
<style>
  .palette {
    margin-block-end: 2rem;

    h5 {
      font-size: 1rem;
      margin-block-start: 1rem;
      margin-block-end: .25rem;
    }

    .description {
      font-size: .875rem;
      color: var(--quiet-text-muted);
      margin-block-end: .5rem;
    }
  }

  .swatches {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 1.5rem .25rem;
    font-size: .75rem;
    color: var(--quiet-text-muted);
    text-align: center;

    quiet-copy {
      display: flex;
      flex-direction: column;
    }

    button {
      aspect-ratio: 1 / .95;
      border: none;
      border-radius: var(--quiet-border-radius-md);
      cursor: pointer;
      transition: 100ms translate ease;

      &:active {
        translate: 0 1px;
      }
    }

    @media screen and (max-width: 959px) {
      grid-template-columns: repeat(5, 1fr);
      
      gap: .5rem 1rem;

      button {
        height: 3rem;
        aspect-ratio: unset;
      }
    }
  }

  .swatches-text-on {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: auto;
      min-height: 3rem;
      font-size: .875rem;
      line-height: 1;
      padding: 1rem;
    }

    @media screen and (max-width: 959px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  quiet-scroller td:nth-child(1) {
    white-space: nowrap;
  }

  quiet-scroller td:nth-child(2) {
    min-width: 40ch;
  }

  /* Demo styles */
  .border {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #495057;
    margin: 8px 0;
  }

  .shadow {
    width: 100px;
    height: 50px;
    background: var(--quiet-background-color);
    border-radius: var(--quiet-border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #495057;
    margin: 8px 0;
  }
</style>

<img class="whiskers-center" src="/assets/images/whiskers/painting-fence.svg" alt="Whiskers the mouse painting a wooden fence">
