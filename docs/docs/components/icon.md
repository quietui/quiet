---
title: Icon
description: TODO
layout: component
---

```html {.example}
<div style="font-size: 1.5rem;" id="container">
  <quiet-icon label="Undo" name="bell"></quiet-icon>
  <quiet-icon label="Globe" name="globe-americas"></quiet-icon>
  <quiet-icon label="Shopping cart" name="shopping-cart"></quiet-icon>
</div>
```

:::info
A common pitfall of this component is not [setting the library's path](/docs/#setting-the-library-path). It's easy to do and, if you're not using the CDN, some assets won't be able to load without it. If you're not seeing icons where they should be, this is probably why!
:::

## Examples

### Built-in icons

Quiet provides with the popular [Heroicons](https://heroicons.com/) icon library out of the box, but you can [register additional libraries](#registering-icon-libraries) as well. Use the `name` attribute to specify which icon should be drawn.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="home"></quiet-icon>
  <quiet-icon name="light-bulb"></quiet-icon>
  <quiet-icon name="printer"></quiet-icon>
</div>
```

:::info
For a list of all available icons, please refer to the [Heroicons website](https://heroicons.com/). Be careful to copy the name of the icon and _not the SVG code!_
:::

### Labeling icons

By default, icons are considered presentational elements. However, you can add the `label` attribute to any icon to make it available to assistive devices such as screen readers.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon label="Messages" name="envelope"></quiet-icon>
  <quiet-icon label="Favorites" name="heart"></quiet-icon>
  <quiet-icon label="Settings" name="cog-6-tooth" ></quiet-icon>
</div>
```

### Changing the size

Icons are sized based on the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the badge or an ancestor element.

```html {.example}
<quiet-icon name="hand-thumb-up" style="font-size: 1.5em;"></quiet-icon>
<quiet-icon name="hand-thumb-up" style="font-size: 2em;"></quiet-icon>
<quiet-icon name="hand-thumb-up" style="font-size: 2.5em;"></quiet-icon>
```

### Changing the color

Icons inherit the current text color. To change it, set the `color` property on the icon or an ancestor element.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="gift" style="color: royalblue;"></quiet-icon>
  <quiet-icon name="gift" style="color: deeppink;"></quiet-icon>
  <quiet-icon name="gift" style="color: forestgreen;"></quiet-icon>
</div>
```

### Changing the icon family

Some libraries have more than one family of icons. To specify the icon family, use the `family` attribute. The default library comes with four families: `outline`, `solid`, `mini`, and `micro`. If unspecified, `outline` will be the default.

```html {.example}
<quiet-icon family="outline" name="radio" style="font-size: 24px;"></quiet-icon>
<quiet-icon family="solid" name="radio" style="font-size: 24px;"></quiet-icon>
<quiet-icon family="mini" name="radio" style="font-size: 20px;"></quiet-icon>
<quiet-icon family="micro" name="radio" style="font-size: 16px;"></quiet-icon>
```

### Registering icon libraries

TODO

- adding new
- customizing default
- customizing system

- icon packs:
   - https://boxicons.com/
   - https://jam-icons.com/
   - https://lucide.dev/
   - https://remixicon.com/
   - https://tabler.io/icons

*should we provide these out of the box using a public CDN?
