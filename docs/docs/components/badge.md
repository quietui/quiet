---
title: Badge
layout: component
---

```html {.example .flex-row}
<quiet-badge>12 items</quiet-badge>
```

## Examples

### Variants

Set the `variant` attribute to `default`, `primary`, `constructive`, `destructive`, or `inverted` to change the badges's variant.

```html {.example .flex-row}
<quiet-badge variant="default">Default</quiet-badge>
<quiet-badge variant="primary">Primary</quiet-badge>
<quiet-badge variant="constructive">Constructive</quiet-badge>
<quiet-badge variant="destructive">Destructive</quiet-badge>
<quiet-badge variant="inverted">Inverted</quiet-badge>
```

### Outline badges

Set the `appearance` attribute to `outline` to draw outlined badges.

```html {.example .flex-row}
<quiet-badge appearance="outline" variant="default">Default</quiet-badge>
<quiet-badge appearance="outline" variant="primary">Primary</quiet-badge>
<quiet-badge appearance="outline" variant="constructive">Constructive</quiet-badge>
<quiet-badge appearance="outline" variant="destructive">Destructive</quiet-badge>
<quiet-badge appearance="outline" variant="inverted">Inverted</quiet-badge>
```

### Changing the size

Badges are sized relative to the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the badge or an ancestor element.

```html {.example .flex-row}
<quiet-badge>Normal</quiet-badge>
<quiet-badge style="font-size: 1rem;">Big</quiet-badge>
<quiet-badge style="font-size: 1.25rem;">Bigger</quiet-badge>
```

### Drawing attention

Set the `attention` attribute to `tap`, `shake`, or `sparkle` to draw attention to a badge with an animation. Remove the attribute to stop the animation. Users with a preference for reduced motion will see a more subtle pulse animation.

```html {.example .flex-row}
<quiet-badge attention="tap" variant="inverted">Primary</quiet-badge>
<quiet-badge attention="shake" variant="inverted">Shake</quiet-badge>
<quiet-badge attention="sparkle" variant="inverted">Sparkle</quiet-badge>
```

:::info
You can customize the speed and easing of attention animations using the `--attention-duration` and `--attention-easing` custom properties.
:::

### Styling badges

Use the `color`, `background-color`, and `border-color` properties to change badge colors. You can also apply gradients with the `background-image` property.

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
