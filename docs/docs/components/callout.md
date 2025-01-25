---
title: Callout
layout: component
---

```html {.example}
<quiet-callout variant="primary">
  <quiet-icon slot="icon" name="book"></quiet-icon>
  A playful cat's antics can brighten any day with their boundless energy and curiosity. Watching a cat pounce and chase after toys is an endless source of entertainment.
</quiet-callout>
```

## Examples

### Variants

Callouts have five built-in variants. Set the `variant` attribute to `default`, `primary`, `constructive`, `destructive`, or `inverted` to change the callout's appearance.

```html {.example}
<quiet-callout variant="default">
  This is a default callout. Use me for informative content.
</quiet-callout>

<quiet-callout variant="primary">
  This is a primary callout. Use me for informative content that stands out.  
</quiet-callout>

<quiet-callout variant="constructive">
  This is a constructive callout. Use me to show confirmations.
</quiet-callout>

<quiet-callout variant="destructive">
  This is a destructive callout. Use me when danger lies ahead.
</quiet-callout>

<quiet-callout variant="inverted">
  This is an inverted callout. Use me when you need extra contrast.
</quiet-callout>
```

### Adding icons

Add an icon to a callout using the `icon` slot. Works best with `<quiet-icon>` and `<svg>` elements.

```html {.example}
<quiet-callout variant="default">
  <quiet-icon slot="icon" name="settings"></quiet-icon>
  Sleep mode has been enabled. You can disable it in settings.
</quiet-callout>

<quiet-callout variant="primary">
  <quiet-icon slot="icon" name="info-circle"></quiet-icon>  
  A cat's soft, gentle gaze can melt even the coldest of hearts.
</quiet-callout>

<quiet-callout variant="constructive">
  <quiet-icon slot="icon" name="circle-check"></quiet-icon>
  Great job! The litter box has been successfully cleaned.
</quiet-callout>

<quiet-callout variant="destructive">
  <quiet-icon slot="icon" name="alert-triangle"></quiet-icon>
  Doing this will anger the cats. Are you sure you want to continue?
</quiet-callout>

<quiet-callout variant="inverted">
  <quiet-icon slot="icon" name="moon"></quiet-icon>
  The cats are most active during their midnight zoomies.
</quiet-callout>
```

### Changing the size

Callouts are sized relative to the current font size. To change their size, apply `font-size` to the callout or an ancestor element.

```html {.example}
<quiet-callout variant="primary" style="font-size: 1.25rem;">
  <quiet-icon slot="icon" name="rocket"></quiet-icon>
  It's a magical world, ol' buddy…let's go exploring!
</quiet-callout>

<quiet-callout variant="constructive" style="font-size: 1.25rem;">
  <quiet-icon slot="icon" name="bulb"></quiet-icon>
  You know what's weird? Day by day nothing seems to change, but pretty soon…everything is different.
</quiet-callout>
```