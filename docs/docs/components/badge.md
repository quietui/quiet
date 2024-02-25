---
title: Badge
description: TODO
layout: component
---

```html {.example}
<quiet-badge>12 items</quiet-badge>
```

## Examples

### Variants

Badges have four variants. Primary badges are intended to be more obvious. Secondary badges are the default variant and are useful when you want to tag something with less importance. Confirmative badges are indicative of success, whereas destructive badges are indicative of danger.

```html {.example}
<quiet-badge variant="primary">Primary</quiet-badge>
<quiet-badge variant="secondary">Secondary</quiet-badge>
<quiet-badge variant="confirmative">Confirmative</quiet-badge>
<quiet-badge variant="destructive">Destructive</quiet-badge>
```

### Changing the size

Spinners are sized relative to the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the badge or an ancestor element.

```html {.example}
<quiet-badge>Normal</quiet-badge>
<quiet-badge style="font-size: 1rem;">Big</quiet-badge>
<quiet-badge style="font-size: 1.25rem;">Bigger</quiet-badge>
```

### Changing the color

Use the `color` and `background-color` properties to change badge colors. You can also apply borders with `border` and gradients with the `background-image` property.

```html {.example}
<quiet-badge style="background-color: royalblue; color: white; border: none;">Royal Blue</quiet-badge>
<quiet-badge style="background-color: deeppink; color: white; border: none;">Deep Pink</quiet-badge>
<quiet-badge style="background-color: forestgreen; color: white; border: none;">Cadet Blue</quiet-badge>
<quiet-badge style="background-image: linear-gradient(45.8deg, #af68fe 9.3%, #65dfff 75.1%); color: black; border: none;">Gradient</quiet-badge>
```

### Getting attention with animation

Use the `attention` attribute to draw attention to a badge with an animation.

```html {.example}
<quiet-badge attention="pulse" variant="primary">Pulse</quiet-badge>
<quiet-badge attention="shake" variant="primary">Shake</quiet-badge>
<quiet-badge attention="wobble" variant="primary">Wobble</quiet-badge>
```

:::info
You can customize the speed and easing of attention animations using the `--attention-duration` and `--attention-easing` custom properties.
:::
