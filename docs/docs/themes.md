---
title: Themes
description: Customize Quiet with themes.
layout: docs
---

The default theme provides simple, elegant styles with support for light and dark modes. A number of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are exposed, giving you an easy way to make high-level changes to the library.

## Using the default theme

To import the default theme from the CDN, add the following code to the `<head>` of your page.

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

### Built-in presets

For convenience, Quiet ships with 21 built-in color presets you can use to change the primary seed color. The theme picker at the top of the page allows you to preview them.

To use a preset in your app, add the `quiet-{preset}` class to the `<html>` element, where `{preset}` is one of the following values: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuschia, pink, rose, slate, zinc, stone, or sand.

```html
<html class="quiet-blue">
  ...
</html>
```

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
While not recommended, it is possible to override primitives for even more control over your application's color palettes. Refer to [`quiet.css`](https://github.com/quietui/quiet/blob/main/src/themes/quiet.css) to see how colors are generated.
:::

### Adaptive colors

Adaptive colors automatically change between light and dark modes. Instead of numeric values, they use a scale that indicates their "volume" relative to the the app's background. Thus, "softer" colors have less contrast than "louder" ones. This approach lets you style things once, but have them look great in light and dark modes.

#### Fill colors

Fill colors are primarily used for backgrounds and surfaces. For example, buttons use midtone fills for their backgrounds.

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

Technically, <quiet-badge variant="primary" style="font-size: 0.9375rem; color: black;">black text</quiet-badge> has a higher contrast ratio than <quiet-badge variant="primary" style="font-size: 0.9375rem;">white text</quiet-badge> on these backgrounds, despite the former being harder for most people to see. While these design token combinations don't meet WCAG 2, they do meet the the forthcoming [APCA](https://github.com/Myndex/SAPC-APCA) standard, which is the likely candidate contrast method for WCAG 3.

_[Refer to this article](https://medium.com/@think_ui/why-color-contrast-is-not-as-black-and-white-as-it-seems-94197a72b005) to learn more about why WCAG 2 isn't a great standard for measuring perceptual contrast._
:::

#### Stroke colors

Stroke colors are used to draw borders and outlines around elements and UI chrome.

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
    <quiet-copy data="var(--quiet-secondary-stroke-softer)">
      <button aria-label="Neutral stroke softer" style="background-color: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-softer);"></button> softer
    </quiet-copy>
    <quiet-copy data="var(--quiet-secondary-stroke-soft)">
      <button aria-label="Neutral stroke soft" style="background-color: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-soft);"></button> soft
    </quiet-copy>
    <quiet-copy data="var(--quiet-secondary-stroke-mid)">
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
    <button aria-label="Silent" style="background-color: var(--quiet-silent); border: solid 1px var(--quiet-strident);"></button> silent
  </quiet-copy>
  <quiet-copy data="var(--quiet-strident)">
    <button aria-label="Strident" style="background-color: var(--quiet-strident); border: solid 1px var(--quiet-silent);"></button> strident
  </quiet-copy>
</div>

### Design tokens

The following tokens are used to set the overall appearance of the default theme. More granular customizations can be made to components with [CSS parts](/docs/using-components/#css-parts).

#### Application tokens

==TODO - document color app tokens==

==TODO - document shadow tokens with examples==

<div class="table-scroll table-theme" tabindex="0">

| Custom property | Description | Default |
| --------------- | ----------- | ------- |
| `--quiet-border-style` | The default border style for most elements. | `solid` |
| `--quiet-border-width` | The default border width for most elements. | `1px` |
| `--quiet-border-radius` | The base border radius for elements. Often used with `calc()` to scale to smaller and larger elements. | `0.375rem` |
| `--quiet-content-spacing` | The spacing between blocks of content. Used primarily in Restyle to space content consistently. | `2rem` |
| `--quiet-font-family` | The default font. | `system-ui, sans-serif` |
| `--quiet-font-heading` | The font used for headings. | `var(--quiet-font-family)` |
| `--quiet-font-code` | The font used for code and code blocks. | `SFMono-Regular, Consolas, Menlo, Monaco, 'liberation mono', 'courier new', monospace` |
| `--quiet-font-size` | The base font size for the application. (The default theme is optimized for a 16px font size.) | `16px` |
| `--quiet-font-weight-normal` | The font weight for normal text. | `400` |
| `--quiet-font-weight-semibold` | The font weight for semibold text. | `500` |
| `--quiet-font-weight-bold` | The font weight for bold text. | `600` |
| `--quiet-line-height` | The default line height for text. | `1.6` |
| `--quiet-focus-width` | The width of the focus ring's border. | `3px` |
| `--quiet-focus-offset` | The outline offset of the focus ring. | `1px` |
| `--quiet-backdrop-filter` | The filter to apply to dialog backdrops and similar overlays. | `blur(6px)` |

</div>

#### Form control tokens

<div class="table-scroll table-theme" tabindex="0">

| Custom property | Description | Default |
| --------------- | ----------- | ------- |
| `--quiet-form-control-height-xs` | The height of extra small form controls. | `1.5rem` |
| `--quiet-form-control-height-sm` | The height of small form controls. | `2rem` |
| `--quiet-form-control-height-md` | The height of medium form controls. | `2.75rem` |
| `--quiet-form-control-height-lg` | The height of large form controls. | `3.25rem` |
| `--quiet-form-control-height-xl` | The height of extra large form controls. | `4rem` |
| `--quiet-form-control-font-size-xs` | The font size of extra small form controls. | `0.75rem` |
| `--quiet-form-control-font-size-sm` | The font size of small form controls. | `0.875rem` |
| `--quiet-form-control-font-size-md` | The font size of medium form controls. | `0.9375rem` |
| `--quiet-form-control-font-size-lg` | The font size of large form controls. | `1.25rem` |
| `--quiet-form-control-font-size-xl` | The font size of extra large form controls. | `1.5rem` |

</div>

<style>
  .palette {
    margin-block-end: var(--quiet-content-spacing);

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
      border-radius: calc(var(--quiet-border-radius) / 2);
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

  .table-scroll td:nth-child(2) {
    min-width: 40ch;
  }
</style>
