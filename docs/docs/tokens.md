---
title: Style Tokens
description:
layout: docs
---

The following tokens are available as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

TODO:

- explain how to customize tokens
- find a nice way to show off base tokens
- let users change base colors right in the docs
- list out all other tokens and what they do

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
  <div class="color" style="background-color: var(--quiet-confirmative-50);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-100);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-200);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-300);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-400);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-500);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-600);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-700);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-800);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-900);"></div>
  <div class="color" style="background-color: var(--quiet-confirmative-950);"></div>
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

<style>
  .colors {
    display: grid;
    grid-template-columns: repeat(11, 40px);
    gap: .125rem;
    margin-block-end: .125rem;

    .color {
      height: 40px;
      border-radius: calc(var(--quiet-base-border-radius) / 2);
    }
  }
</style>