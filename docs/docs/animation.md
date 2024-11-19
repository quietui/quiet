---
title: Animation
description: Animations, easings, and utilities for use with the Web Animations API.
layout: docs
---

Quiet offers an optional, in-house library for animation called [Scurry](https://github.com/quietui/scurry). Scurry was designed to work well with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), but also includes utility functions to make animation even easier.

TODO - animate + all easings + all utilities === 4.1kb gzipped size

Click or tap the box to animate it.

```html {.example}
<div 
  id="flip-box" 
  style="
    width: 100px; 
    height: 100px; 
    background: var(--quiet-primary-fill-mid); 
    margin: 1rem;
    cursor: pointer
  "
></div>

<script type="module">
  import { animate, flip, easeInOutSine } from '/dist/animation.js';

  const box = document.getElementById('flip-box');

  box.addEventListener('click', () => {
    animate(box, flip, {
      duration: 1000,
      easing: easeInOutSine
    });
  });
</script>
```
