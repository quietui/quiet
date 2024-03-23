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

Click on a color to copy its CSS custom property.

`--quiet-{variant}-{value}`

<div class="color-palettes">
  <h4>Primary</h4>
  <p class="description">Primary is your brand color. Use it for brand recognition and guiding attention through calls to action.</p>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-primary-50)">
      <button aria-label="Primary 50" style="background-color: var(--quiet-primary-50);"><span class="value">50</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-100)">
      <button aria-label="Primary 100" style="background-color: var(--quiet-primary-100);"><span class="value">100</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-200)">
      <button aria-label="Primary 200" style="background-color: var(--quiet-primary-200);"><span class="value">200</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-300)">
      <button aria-label="Primary 300" style="background-color: var(--quiet-primary-300);"><span class="value">300</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-400)">
      <button aria-label="Primary 400" style="background-color: var(--quiet-primary-400);"><span class="value">400</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-500)">
      <button aria-label="Primary 500" style="background-color: var(--quiet-primary-500);"><span class="value">500</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-600)">
      <button aria-label="Primary 600" style="background-color: var(--quiet-primary-600);"><span class="value">600</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-700)">
      <button aria-label="Primary 700" style="background-color: var(--quiet-primary-700);"><span class="value">700</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-800)">
      <button aria-label="Primary 800" style="background-color: var(--quiet-primary-800);"><span class="value">800</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-900)">
      <button aria-label="Primary 900" style="background-color: var(--quiet-primary-900);"><span class="value">900</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-950)">
      <button aria-label="Primary 950" style="background-color: var(--quiet-primary-950);"><span class="value">950</span></button>
    </quiet-copy>
  </div>

  <h4>Neutral</h4>
  <p class="description">Neutral is usually gray, representing surfaces and secondary objects.</p>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-neutral-50)">
      <button aria-label="Neutral 50" style="background-color: var(--quiet-neutral-50);"><span class="value">50</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-100)">
      <button aria-label="Neutral 100" style="background-color: var(--quiet-neutral-100);"><span class="value">100</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-200)">
      <button aria-label="Neutral 200" style="background-color: var(--quiet-neutral-200);"><span class="value">200</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-300)">
      <button aria-label="Neutral 300" style="background-color: var(--quiet-neutral-300);"><span class="value">300</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-400)">
      <button aria-label="Neutral 400" style="background-color: var(--quiet-neutral-400);"><span class="value">400</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-500)">
      <button aria-label="Neutral 500" style="background-color: var(--quiet-neutral-500);"><span class="value">500</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-600)">
      <button aria-label="Neutral 600" style="background-color: var(--quiet-neutral-600);"><span class="value">600</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-700)">
      <button aria-label="Neutral 700" style="background-color: var(--quiet-neutral-700);"><span class="value">700</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-800)">
      <button aria-label="Neutral 800" style="background-color: var(--quiet-neutral-800);"><span class="value">800</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-900)">
      <button aria-label="Neutral 900" style="background-color: var(--quiet-neutral-900);"><span class="value">900</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-950)">
      <button aria-label="Neutral 950" style="background-color: var(--quiet-neutral-950);"><span class="value">950</span></button>
    </quiet-copy>
  </div>

  <h4>Constructive</h4>
  <p class="description">Constructive is often green, indicating creation or success.</p>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-constructive-50)">
      <button aria-label="Constructive 50" style="background-color: var(--quiet-constructive-50);"><span class="value">50</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-100)">
      <button aria-label="Constructive 100" style="background-color: var(--quiet-constructive-100);"><span class="value">100</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-200)">
      <button aria-label="Constructive 200" style="background-color: var(--quiet-constructive-200);"><span class="value">200</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-300)">
      <button aria-label="Constructive 300" style="background-color: var(--quiet-constructive-300);"><span class="value">300</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-400)">
      <button aria-label="Constructive 400" style="background-color: var(--quiet-constructive-400);"><span class="value">400</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-500)">
      <button aria-label="Constructive 500" style="background-color: var(--quiet-constructive-500);"><span class="value">500</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-600)">
      <button aria-label="Constructive 600" style="background-color: var(--quiet-constructive-600);"><span class="value">600</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-700)">
      <button aria-label="Constructive 700" style="background-color: var(--quiet-constructive-700);"><span class="value">700</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-800)">
      <button aria-label="Constructive 800" style="background-color: var(--quiet-constructive-800);"><span class="value">800</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-900)">
      <button aria-label="Constructive 900" style="background-color: var(--quiet-constructive-900);"><span class="value">900</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-950)">
      <button aria-label="Constructive 950" style="background-color: var(--quiet-constructive-950);"><span class="value">950</span></button>
    </quiet-copy>
  </div>

  <h4>Destructive</h4>
  <p class="description">Destructive is often red, indicating deletion or danger.</p>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-destructive-50)">
      <button aria-label="Destructive 50" style="background-color: var(--quiet-destructive-50);"><span class="value">50</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-100)">
      <button aria-label="Destructive 100" style="background-color: var(--quiet-destructive-100);"><span class="value">100</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-200)">
      <button aria-label="Destructive 200" style="background-color: var(--quiet-destructive-200);"><span class="value">200</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-300)">
      <button aria-label="Destructive 300" style="background-color: var(--quiet-destructive-300);"><span class="value">300</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-400)">
      <button aria-label="Destructive 400" style="background-color: var(--quiet-destructive-400);"><span class="value">400</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-500)">
      <button aria-label="Destructive 500" style="background-color: var(--quiet-destructive-500);"><span class="value">500</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-600)">
      <button aria-label="Destructive 600" style="background-color: var(--quiet-destructive-600);"><span class="value">600</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-700)">
      <button aria-label="Destructive 700" style="background-color: var(--quiet-destructive-700);"><span class="value">700</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-800)">
      <button aria-label="Destructive 800" style="background-color: var(--quiet-destructive-800);"><span class="value">800</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-900)">
      <button aria-label="Destructive 900" style="background-color: var(--quiet-destructive-900);"><span class="value">900</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-950)">
      <button aria-label="Destructive 950" style="background-color: var(--quiet-destructive-950);"><span class="value">950</span></button>
    </quiet-copy>
  </div>      
</div>

You should only use color primitives when you want a color that doesn't change in dark mode. For most styles, you probably want to use [adaptive colors](#adaptive-colors) instead.

:::info
While not recommended, it is technically possible to override the primitives for even more control over your application's color palettes.
:::

### Adaptive colors

Design tokens automatically change between light and dark modes. Instead of numeric values, they use a scale that indicates their "volume" relative to the the app's background. Thus, "softer" colors have less contrast than "louder" ones. This approach lets you style most elements one time, but they'll look great in both color schemes.

#### Fill colors

Fill colors are primarily used for backgrounds and surfaces. 

`--quiet-{variant}-fill-{volume}`

<div class="color-palettes">
  <h4>Primary fill colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-primary-fill-softer)">
      <button aria-label="Primary fill softer" style="background-color: var(--quiet-primary-fill-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-soft)">
      <button aria-label="Primary fill soft" style="background-color: var(--quiet-primary-fill-soft);"><span class="value">soft</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-mid)">
      <button aria-label="Primary fill mid" style="background-color: var(--quiet-primary-fill-mid);"><span class="value">mid</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-loud)">
      <button aria-label="Primary fill loud" style="background-color: var(--quiet-primary-fill-loud);"><span class="value">loud</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-fill-louder)">
      <button aria-label="Primary fill louder" style="background-color: var(--quiet-primary-fill-louder);"><span class="value">louder</span></button>
    </quiet-copy>
  </div>

  <h4>Neutral fill colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-neutral-fill-softer)">
      <button aria-label="Neutral fill softer" style="background-color: var(--quiet-neutral-fill-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-soft)">
      <button aria-label="Neutral fill soft" style="background-color: var(--quiet-neutral-fill-soft);"><span class="value">soft</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-mid)">
      <button aria-label="Neutral fill mid" style="background-color: var(--quiet-neutral-fill-mid);"><span class="value">mid</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-loud)">
      <button aria-label="Neutral fill loud" style="background-color: var(--quiet-neutral-fill-loud);"><span class="value">loud</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-fill-louder)">
      <button aria-label="Neutral fill louder" style="background-color: var(--quiet-neutral-fill-louder);"><span class="value">louder</span></button>
    </quiet-copy>
  </div>

  <h4>Constructive fill colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-constructive-fill-softer)">
      <button aria-label="Constructive fill softer" style="background-color: var(--quiet-constructive-fill-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-soft)">
      <button aria-label="Constructive fill soft" style="background-color: var(--quiet-constructive-fill-soft);"><span class="value">soft</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-mid)">
      <button aria-label="Constructive fill mid" style="background-color: var(--quiet-constructive-fill-mid);"><span class="value">mid</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-loud)">
      <button aria-label="Constructive fill loud" style="background-color: var(--quiet-constructive-fill-loud);"><span class="value">loud</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-fill-louder)">
      <button aria-label="Constructive fill louder" style="background-color: var(--quiet-constructive-fill-louder);"><span class="value">louder</span></button>
    </quiet-copy>  
  </div>

  <h4>Destructive fill colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-destructive-fill-softer)">
      <button aria-label="Constructive fill softer" style="background-color: var(--quiet-destructive-fill-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-soft)">
      <button aria-label="Constructive fill soft" style="background-color: var(--quiet-destructive-fill-soft);"><span class="value">soft</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-mid)">
      <button aria-label="Constructive fill mid" style="background-color: var(--quiet-destructive-fill-mid);"><span class="value">mid</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-loud)">
      <button aria-label="Constructive fill loud" style="background-color: var(--quiet-destructive-fill-loud);"><span class="value">loud</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-fill-louder)">
      <button aria-label="Constructive fill louder" style="background-color: var(--quiet-destructive-fill-louder);"><span class="value">louder</span></button>
    </quiet-copy>        
  </div>  
</div>

#### Text-on colors

Text-on colors provide adequate contrast when used on top of the respective fill color. 

`--quiet-{variant}-text-on-{volume}`

<div class="color-palettes">
  <h4>Primary text-on colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-primary-text-on-soft)">
      <button aria-label="Primary text-on soft" style="background-color: var(--quiet-primary-fill-soft); color: var(--quiet-primary-text-on-soft);">soft</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-text-on-mid)">
      <button aria-label="Primary text-on mid" style="background-color: var(--quiet-primary-fill-mid); color: var(--quiet-primary-text-on-mid);">mid</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-text-on-loud)">
      <button aria-label="Primary text-on loud" style="background-color: var(--quiet-primary-fill-loud); color: var(--quiet-primary-text-on-loud);">loud</button>
    </quiet-copy>
  </div>

  <h4>Neutral text-on colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-neutral-text-on-soft)">
      <button aria-label="Neutral text-on soft" style="background-color: var(--quiet-neutral-fill-soft); color: var(--quiet-neutral-text-on-soft);">soft</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-text-on-mid)">
      <button aria-label="Neutral text-on mid" style="background-color: var(--quiet-neutral-fill-mid); color: var(--quiet-neutral-text-on-mid);">mid</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-text-on-loud)">
      <button aria-label="Neutral text-on loud" style="background-color: var(--quiet-neutral-fill-loud); color: var(--quiet-neutral-text-on-loud);">loud</button>
    </quiet-copy>
  </div>

  <h4>Constructive text-on colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-constructive-text-on-soft)">
      <button aria-label="Constructive text-on soft" style="background-color: var(--quiet-constructive-fill-soft); color: var(--quiet-constructive-text-on-soft);">soft</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-text-on-mid)">
      <button aria-label="Constructive text-on mid" style="background-color: var(--quiet-constructive-fill-mid); color: var(--quiet-constructive-text-on-mid);">mid</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-text-on-loud)">
      <button aria-label="Constructive text-on loud" style="background-color: var(--quiet-constructive-fill-loud); color: var(--quiet-constructive-text-on-loud);">loud</button>
    </quiet-copy>
  </div>

  <h4>Destructive text-on colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-destructive-text-on-soft)">
      <button aria-label="Destructive text-on soft" style="background-color: var(--quiet-destructive-fill-soft); color: var(--quiet-destructive-text-on-soft);">soft</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-text-on-mid)">
      <button aria-label="Destructive text-on mid" style="background-color: var(--quiet-destructive-fill-mid); color: var(--quiet-destructive-text-on-mid);">mid</button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-text-on-loud)">
      <button aria-label="Destructive text-on loud" style="background-color: var(--quiet-destructive-fill-loud); color: var(--quiet-destructive-text-on-loud);">loud</button>
    </quiet-copy>
  </div>
</div>

### Stroke colors

Stroke colors are used to draw borders and outlines.  

`--quiet-{variant}-stroke-{volume}`

<div class="color-palettes">
  <h4>Primary stroke colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-primary-stroke-softer)">
      <button aria-label="Primary stroke softer" style="background: var(--quiet-primary-fill-softer); border: solid 1px var(--quiet-primary-stroke-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-primary-stroke-soft)">
      <button aria-label="Primary stroke soft" style="background: var(--quiet-primary-fill-softer); border: solid 1px var(--quiet-primary-stroke-soft);"><span class="value">soft</span></button>
    </quiet-copy>
  </div>

  <h4>Neutral stroke colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-neutral-stroke-softer)">
      <button aria-label="Neutral stroke softer" style="background: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-neutral-stroke-soft)">
      <button aria-label="Neutral stroke soft" style="background: var(--quiet-neutral-fill-softer); border: solid 1px var(--quiet-neutral-stroke-soft);"><span class="value">soft</span></button>
    </quiet-copy>
  </div>

  <h4>Constructive stroke colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-constructive-stroke-softer)">
      <button aria-label="Constructive stroke softer" style="background: var(--quiet-constructive-fill-softer); border: solid 1px var(--quiet-constructive-stroke-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-constructive-stroke-soft)">
      <button aria-label="Constructive stroke soft" style="background: var(--quiet-constructive-fill-softer); border: solid 1px var(--quiet-constructive-stroke-soft);"><span class="value">soft</span></button>
    </quiet-copy>
  </div>

  <h4>Destructive stroke colors</h4>
  <div class="swatches swatches-11">
    <quiet-copy data="var(--quiet-destructive-stroke-softer)">
      <button aria-label="Destructive stroke softer" style="background: var(--quiet-destructive-fill-softer); border: solid 1px var(--quiet-destructive-stroke-softer);"><span class="value">softer</span></button>
    </quiet-copy>
    <quiet-copy data="var(--quiet-destructive-stroke-soft)">
      <button aria-label="Destructive stroke soft" style="background: var(--quiet-destructive-fill-softer); border: solid 1px var(--quiet-destructive-stroke-soft);"><span class="value">soft</span></button>
    </quiet-copy>
  </div>
</div>

---

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

==TODO - 0 and 1000 color names and documentation==
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

  .color-palettes {
    h4 {
      font-size: 1rem;
      margin-block-end: .25rem;
    }
    
    .description {
      font-size: .875rem;
      color: var(--quiet-text-muted);
      margin-block-start: -.25rem;
      margin-block-end: .25rem;
    }
  }

  .swatches {
    display: grid;
    justify-content: center;
    gap: 1.5rem .25rem;
    margin-block-end: calc(var(--quiet-content-spacing) + 1.25rem);

    &.swatches-11 {
      grid-template-columns: repeat(11, 1fr);

      @media screen and (max-width: 700px) {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    & > quiet-copy {
      display: flex;
      position: relative;
    }

    & > quiet-copy > button {
      position: relative;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      align-items: end;
      justify-content: center;
      aspect-ratio: 2 / 1.75;
      font-size: .75rem;
      font-weight: var(--quiet-font-weight-semibold);
      color: var(--quiet-text-muted);
      background: none;
      border: none;
      border-radius: calc(var(--quiet-border-radius) / 2);
      padding-inline: .25rem;
      cursor: pointer;
      transition: 100ms translate ease;

      &:active {
        translate: 0 1px;

        .value {
          translate: 0 calc(1.25rem - 1px);
        }
      }
    }

    .value {
      display: flex;
      position: absolute;
      align-items: end;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: 100ms translate ease;
      translate: 0 1.25rem;
      pointer-events: none;
    }
  }
</style>

<script>
  document.addEventListener('click', event => {
    const button = event.target.closest('button.color');

    if (button) {
      navigator.clipboard.writeText(button.dataset.copy);
    }
  });
</script>