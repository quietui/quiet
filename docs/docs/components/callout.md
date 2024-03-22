---
title: Callout
layout: component
---

```html {.example}
<quiet-callout variant="primary" with-icon>
  <quiet-icon slot="icon" name="book-open"></quiet-icon>
  Volutpat commodo sed egestas egestas fringilla phasellus. Massa vitae tortor condimentum lacinia quis vel.
</quiet-callout>
```

## Examples

### Variants

Callouts have four built-in variants. Set the `variant` attribute to `primary`, `secondary`, `constructive`, or `destructive` to change the callout's appearance.

```html {.example}
<quiet-callout variant="primary">
  This is a primary callout. Use me for informative content that stands out.
</quiet-callout>

<quiet-callout variant="secondary">
  This is a secondary callout. Use me for informative content.
</quiet-callout>

<quiet-callout variant="constructive">
  This is a constructive callout. Use me to show confirmations.
</quiet-callout>

<quiet-callout variant="destructive">
  This is a destructive callout. Use me when danger lies ahead.
</quiet-callout>
```

### Adding icons

Add an icon to a callout using the `icon` slot. Works best with `<quiet-icon>` and `<svg>` elements.

```html {.example}
<quiet-callout variant="primary" with-icon>
  <quiet-icon slot="icon" name="information-circle"></quiet-icon>
  Dui vivamus arcu felis bibendum ut tristique et egestas. Tortor condimentum lacinia quis vel eros.
</quiet-callout>

<quiet-callout variant="secondary" with-icon>
  <quiet-icon slot="icon" name="cog-6-tooth"></quiet-icon>
  Maecenas sed enim ut sem viverra aliquet eget sit amet. Id diam maecenas ultricies mi eget.
</quiet-callout>

<quiet-callout variant="constructive" with-icon>
  <quiet-icon slot="icon" name="check-circle"></quiet-icon>
  Nunc sed augue lacus viverra vitae congue. Mattis nunc sed blandit libero volutpat sed cras.
</quiet-callout>

<quiet-callout variant="destructive" with-icon>
  <quiet-icon slot="icon" name="exclamation-triangle"></quiet-icon>
  Sagittis purus sit amet volutpat consequat mauris nunc congue nisi. Sociis natoque penatibus et magnis dis.
</quiet-callout>
```

### Changing the size

Callouts are sized relative to the current font size. To change their size, apply `font-size` to the button or an ancestor element.

```html {.example}
<quiet-callout variant="primary" with-icon style="font-size: 1.25rem;">
  <quiet-icon slot="icon" name="rocket-launch"></quiet-icon>
  It's a magical world, ol' buddy…let's go exploring!
</quiet-callout>

<quiet-callout variant="constructive" with-icon style="font-size: 1.25rem;">
  <quiet-icon slot="icon" name="paper-airplane"></quiet-icon>
  Your message has been sent successfully!
</quiet-callout>
```