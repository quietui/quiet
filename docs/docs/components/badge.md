---
title: Badge
layout: component
---

```html {.example .flex-row}
<quiet-badge>12 items</quiet-badge>
```

## Examples

### Variants

Badges have five built-in variants. Set the `variant` attribute to `default`, `primary`, `constructive`, `destructive`, or `inverted` to change the badges's appearance.

```html {.example .flex-row}
<quiet-badge variant="default">Default</quiet-badge>
<quiet-badge variant="primary">Primary</quiet-badge>
<quiet-badge variant="constructive">Constructive</quiet-badge>
<quiet-badge variant="destructive">Destructive</quiet-badge>
<quiet-badge variant="inverted">Inverted</quiet-badge>
```

### Changing the size

Badges are sized relative to the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the badge or an ancestor element.

```html {.example .flex-row}
<quiet-badge>Normal</quiet-badge>
<quiet-badge style="font-size: 1rem;">Big</quiet-badge>
<quiet-badge style="font-size: 1.25rem;">Bigger</quiet-badge>
```

### Changing the color

Use the `color` and `background-color` properties to change badge colors. You can also apply borders with `border` and gradients with the `background-image` property.

```html {.example .flex-row}
<quiet-badge style="background-color: royalblue; color: white; border: none;">Royal Blue</quiet-badge>
<quiet-badge style="background-color: deeppink; color: white; border: none;">Deep Pink</quiet-badge>
<quiet-badge style="background-color: forestgreen; color: white; border: none;">Forest Green</quiet-badge>
```

### Using icons

Icons can be added before or after the badge's text.

```html {.example .flex-row}
<quiet-badge style="background-color: firebrick; color: white;"><quiet-icon name="bug"></quiet-icon> Bug</quiet-badge>
<quiet-badge style="background-color: #2563eb; color: white;"><quiet-icon name="book-2"></quiet-icon> Documentation</quiet-badge>
<quiet-badge style="background-color: #d97706; color: white;"><quiet-icon name="copy"></quiet-icon> Duplicate</quiet-badge>
```

Badges can also be icon-only.

```html {.example .flex-row}
<quiet-badge style="background-color: #ea580c; color: white;"><quiet-icon label="Cat" name="cat"></quiet-icon></quiet-badge>
<quiet-badge style="background-color: #059669; color: white;"><quiet-icon label="Dog" name="dog"></quiet-icon></quiet-badge>
<quiet-badge style="background-color: #4f46e5; color: white;"><quiet-icon label="Mouse" name="mouse"></quiet-icon></quiet-badge>
```

### Drawing attention

Use the `attention` attribute to draw attention to a badge with an animation. Remove the attribute to stop the animation. Users with a preference for reduced motion will see a more subtle pulse instead of the default bounce.

```html {.example .flex-row}
<quiet-badge attention style="background-color: #2563eb; color: white;">4 new messages</quiet-badge>
```

:::info
You can customize the speed and easing of attention animations using the `--attention-duration` and `--attention-easing` custom properties.
:::
