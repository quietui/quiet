---
title: Callout
layout: component
---

```html {.example}
<quiet-callout variant="primary" with-icon>
  <quiet-icon slot="icon" name="book-open"></quiet-icon>
  A playful cat's antics can brighten any day with their boundless energy and curiosity. Watching a cat pounce and chase after toys is an endless source of entertainment.
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
  A cat's soft, gentle gaze can melt even the coldest of hearts.
</quiet-callout>

<quiet-callout variant="secondary" with-icon>
  <quiet-icon slot="icon" name="cog-6-tooth"></quiet-icon>
  Sleep mode has been enabled. You can disable it in settings.
</quiet-callout>

<quiet-callout variant="constructive" with-icon>
  <quiet-icon slot="icon" name="check-circle"></quiet-icon>
  Great job! The litter box has been successfully cleaned.
</quiet-callout>

<quiet-callout variant="destructive" with-icon>
  <quiet-icon slot="icon" name="exclamation-triangle"></quiet-icon>
  Doing this will anger the cats. Are you sure you want to continue?
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