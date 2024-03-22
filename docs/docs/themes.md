---
title: Themes
description: Customize Quiet with themes.
layout: docs
---

The following tokens are available as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

TODO:

- explain how color palettes are generated and when to NOT use primitives
- explain how light and dark mode tokens map to palettes
- let users change base colors right in the docs
- find a nice way to show off base tokens
- list out all other tokens and what they do

<div style="display: none;">

## Palettes

<div class="colors">
  <div class="color" style="background-color: var(--quiet-primary-50);"></div>
  <div class="color" style="background-color: var(--quiet-primary-100);"></div>
  <div class="color" style="background-color: var(--quiet-primary-200);"></div>
  <div class="color" style="background-color: var(--quiet-primary-300);"></div>
  <div class="color" style="background-color: var(--quiet-primary-400);"></div>
  <div class="color" style="background-color: var(--quiet-primary-500);"></div>
  <div class="color" style="background-color: var(--quiet-primary-600);"></div>
  <div class="color" style="background-color: var(--quiet-primary-700);"></div>
  <div class="color" style="background-color: var(--quiet-primary-800);"></div>
  <div class="color" style="background-color: var(--quiet-primary-900);"></div>
  <div class="color" style="background-color: var(--quiet-primary-950);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-neutral-50);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-100);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-200);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-300);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-400);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-500);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-600);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-700);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-800);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-900);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-950);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-constructive-50);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-100);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-200);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-300);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-400);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-500);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-600);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-700);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-800);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-900);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-950);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-destructive-50);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-100);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-200);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-300);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-400);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-500);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-600);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-700);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-800);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-900);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-950);"></div>
</div>

</div>

## Theme colors

<div class="colors">
  <div class="color" style="background-color: var(--quiet-primary-fill-softer);"></div>
  <div class="color" style="background-color: var(--quiet-primary-fill-soft);"></div>
  <div class="color" style="background-color: var(--quiet-primary-fill-moderate);"></div>
  <div class="color" style="background-color: var(--quiet-primary-fill-loud);"></div>
  <div class="color" style="background-color: var(--quiet-primary-fill-louder);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-neutral-fill-softer);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-fill-soft);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-fill-moderate);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-fill-loud);"></div>
  <div class="color" style="background-color: var(--quiet-neutral-fill-louder);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-constructive-fill-softer);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-fill-soft);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-fill-moderate);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-fill-loud);"></div>
  <div class="color" style="background-color: var(--quiet-constructive-fill-louder);"></div>
</div>

<div class="colors">
  <div class="color" style="background-color: var(--quiet-destructive-fill-softer);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-fill-soft);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-fill-moderate);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-fill-loud);"></div>
  <div class="color" style="background-color: var(--quiet-destructive-fill-louder);"></div>
</div>

<br>

<quiet-button variant="primary">
  Primary
</quiet-button>

<quiet-button variant="secondary">
  Secondary
</quiet-button>

<quiet-button variant="destructive">
  Destructive
</quiet-button>

<quiet-button variant="text">
  Text Button
</quiet-button>

<div style="margin-block: 1.5rem;"></div>

<quiet-badge variant="primary">Primary</quiet-badge>
<quiet-badge variant="secondary">Secondary</quiet-badge>
<quiet-badge variant="constructive">Constructive</quiet-badge>
<quiet-badge variant="destructive">Destructive</quiet-badge>

<p style="color: var(--quiet-primary-colored-text);">
  This is primary colored text on a background, like for links.
</p>

<p style="color: var(--quiet-neutral-colored-text);">
  This is neutral colored text on a background, like for muted text.
</p>

<p style="color: var(--quiet-constructive-colored-text);">
  This is constructive colored text on a background, like for success messages.
</p>

<p style="color: var(--quiet-destructive-colored-text);">
  This is destructive colored text on a background, like for dangerous messages.
</p>

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

<div style="background: var(--quiet-raised-background-color); border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer); padding: 2rem; border-radius: var(--quiet-border-radius);">
  This content is raised up and has <a href="#">links too</a>.
  <br><br>
  <quiet-button variant="primary">
    Primary
  </quiet-button>

  <quiet-button variant="secondary">
    Secondary
  </quiet-button>

  <quiet-button variant="destructive">
    Destructive
  </quiet-button>

  <quiet-button variant="text">
    Text Button
  </quiet-button>
</div>

<style>
  .colors {
    display: grid;
    grid-template-columns: repeat(11, 40px);
    gap: .125rem;
    margin-block-end: .125rem;

    .color {
      height: 40px;
      border-radius: calc(var(--quiet-border-radius) / 2);
    }
  }
</style>

## How to create a theme

TODO