---
title: Animation
description: Animations, easings, and utilities for use with the Web Animations API.
layout: docs
---


TODO - to make this page more impressive, add great examples and take time with them.


Quiet offers an optional, in-house library for animation called [Scurry](https://github.com/quietui/scurry). Scurry was designed to work well with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

## Installation

If you're using the CDN, you can skip this section. For npm users, Scurry must be installed separately using the following command.

```sh
npm install @quietui/scurry
```

## Animations

Almost 100 animations are built-in to Scurry. To import an animation:

TODO - some way to click to copy here
TODO - update scurry versions in each URL

<quiet-tab-list class="import-tabs" label="How would you like to import animations?">
<quiet-tab slot="tab" panel="cdn">CDN</quiet-tab>
<quiet-tab slot="tab" panel="npm">npm</quiet-tab>
<quiet-tab-panel name="cdn">

```js
import { tada } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@3.0.1/dist/animations/tada.js';
```

</quiet-tab-panel>
<quiet-tab-panel name="npm">

```js
import { tada } from '@quietui/scurry/dist/animations/tada.js';
```

</quiet-tab-panel>
</quiet-tab-list>

<details>
  <summary>Show all available animations</summary>
  <ul>
    <li>back-in-down</li>
    <li>back-in-left</li>
    <li>back-in-right</li>
    <li>back-in-up</li>
    <li>back-out-down</li>
    <li>back-out-left</li>
    <li>back-out-right</li>
    <li>back-out-up</li>
    <li>bounce-in-down</li>
    <li>bounce-in-left</li>
    <li>bounce-in-right</li>
    <li>bounce-in-up</li>
    <li>bounce-in</li>
    <li>bounce-out-down</li>
    <li>bounce-out-left</li>
    <li>bounce-out-right</li>
    <li>bounce-out-up</li>
    <li>bounce-out</li>
    <li>bounce</li>
    <li>fade-in-bottom-left</li>
    <li>fade-in-bottom-right</li>
    <li>fade-in-down-big</li>
    <li>fade-in-down</li>
    <li>fade-in-left-big</li>
    <li>fade-in-left</li>
    <li>fade-in-right-big</li>
    <li>fade-in-right</li>
    <li>fade-in-top-left</li>
    <li>fade-in-top-right</li>
    <li>fade-in-up-big</li>
    <li>fade-in-up</li>
    <li>fade-in</li>
    <li>fade-out-bottom-left</li>
    <li>fade-out-bottom-right</li>
    <li>fade-out-down-big</li>
    <li>fade-out-down</li>
    <li>fade-out-left-big</li>
    <li>fade-out-left</li>
    <li>fade-out-right-big</li>
    <li>fade-out-right</li>
    <li>fade-out-top-left</li>
    <li>fade-out-top-right</li>
    <li>fade-out-up-big</li>
    <li>fade-out-up</li>
    <li>fade-out</li>
    <li>flash</li>
    <li>flip-in-x</li>
    <li>flip-in-y</li>
    <li>flip-out-x</li>
    <li>flip-out-y</li>
    <li>flip</li>
    <li>head-shake</li>
    <li>heart-beat</li>
    <li>hinge</li>
    <li>jack-in-the-box</li>
    <li>jello</li>
    <li>light-speed-in-left</li>
    <li>light-speed-in-right</li>
    <li>light-speed-out-left</li>
    <li>light-speed-out-right</li>
    <li>pulse</li>
    <li>roll-in</li>
    <li>roll-out</li>
    <li>rotate-in-down-left</li>
    <li>rotate-in-down-right</li>
    <li>rotate-in-up-left</li>
    <li>rotate-in-up-right</li>
    <li>rotate-in</li>
    <li>rotate-out-down-left</li>
    <li>rotate-out-down-right</li>
    <li>rotate-out-up-left</li>
    <li>rotate-out-up-right</li>
    <li>rotate-out</li>
    <li>rubber-band</li>
    <li>shake-x</li>
    <li>shake-y</li>
    <li>shake</li>
    <li>slide-in-down</li>
    <li>slide-in-left</li>
    <li>slide-in-right</li>
    <li>slide-in-up</li>
    <li>slide-out-down</li>
    <li>slide-out-left</li>
    <li>slide-out-right</li>
    <li>slide-out-up</li>
    <li>swing</li>
    <li>tada</li>
    <li>wobble</li>
    <li>zoom-in-down</li>
    <li>zoom-in-left</li>
    <li>zoom-in-right</li>
    <li>zoom-in-up</li>
    <li>zoom-in</li>
    <li>zoom-out-down</li>
    <li>zoom-out-left</li>
    <li>zoom-out-right</li>
    <li>zoom-out-up</li>
    <li>zoom-out</li>
  </ul>
</details>


## Easings

There are many commonly used easings built-in to Scurry. To import an easing:

<quiet-tab-list class="import-tabs" label="How would you like to import easings?">
<quiet-tab slot="tab" panel="cdn">CDN</quiet-tab>
<quiet-tab slot="tab" panel="npm">npm</quiet-tab>
<quiet-tab-panel name="cdn">

```js
import { easeInOut } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@3.0.1/dist/easings/ease-in-out.js';
```

</quiet-tab-panel>
<quiet-tab-panel name="npm">

```js
import { easeInOut } from '@quietui/scurry/dist/easings/ease-in-out.js';
```

</quiet-tab-panel>
</quiet-tab-list>


TODO - grid here too


<details>
  <summary>Show all available easings</summary>
  <ul>
    <li>ease-in-sine</li>
    <li>ease-out-sine</li>
    <li>ease-in-out-sine</li>
    <li>ease-in-quad</li>
    <li>ease-out-quad</li>
    <li>ease-in-out-quad</li>
    <li>ease-in-cubic</li>
    <li>ease-out-cubic</li>
    <li>ease-in-out-cubic</li>
    <li>ease-in-quart</li>
    <li>ease-out-quart</li>
    <li>ease-in-out-quart</li>
    <li>ease-in-quint</li>
    <li>ease-out-quint</li>
    <li>ease-in-out-quint</li>
    <li>ease-in-expo</li>
    <li>ease-out-expo</li>
    <li>ease-in-out-expo</li>
    <li>ease-in-circ</li>
    <li>ease-out-circ</li>
    <li>ease-in-out-circ</li>
    <li>ease-in-back</li>
    <li>ease-out-back</li>
    <li>ease-in-out-back</li>
  </ul>  
</details>


## Utilities

The following functions are included to facilitate animation. Behind the scenes, they all use the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to guarantee a performant result.

### `animate()`

Runs an animation on an element, canceling any existing animations immediately. Returns a promise that resolves when the animation finishes or is canceled.

To import this function in your app:

<quiet-tab-list class="import-tabs" label="How would you like to import the function?">
<quiet-tab slot="tab" panel="cdn">CDN</quiet-tab>
<quiet-tab slot="tab" panel="npm">npm</quiet-tab>
<quiet-tab-panel name="cdn">

```js
import { animate } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@3.0.1/dist/utilities/animate.js';
```

</quiet-tab-panel>
<quiet-tab-panel name="npm">

```js
import { animate } from '@quietui/scurry/dist/utilities/animate.js';
```

</quiet-tab-panel>
</quiet-tab-list>

#### Arguments

1. The HTML element you want animate
2. The animation ([keyframes](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)) to use for the animation
3. [KeyframeEffect options](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#options) to control the animation


#### Example

```html {.example}
<div id="box" style="display: block; width: 100px; height: 100px; background: var(--quiet-primary-fill-mid); margin: 2rem;"></div>

<script type="module">
  import { animate } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/utilities/index.js';
  import { flip } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/animations/flippers/flip.js';
  import { easings } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/easings/index.js';

  //
  // TODO - export each easing from easings so we can do: `import { easeInSince } from '...'`
  //
  
  const box = document.getElementById('box');

  animate(box, flip, {
    duration: 2000,
    iterations: Infinity,
    easing: easings.easeInSine
  }).then(() => {
    // The animation has finished
  });
</script>
```

#### Using a custom

TODO

### `animateWithClass()`

This function applies a CSS class to the specified element to animate it. The class is removed after the animation finishes or is canceled, then the promise resolves. If applying the class doesn't trigger an animation, the promise resolves immediately.

To import this function in your app:

<quiet-tab-list class="import-tabs" label="How would you like to import the function?">
<quiet-tab slot="tab" panel="cdn">CDN</quiet-tab>
<quiet-tab slot="tab" panel="npm">npm</quiet-tab>
<quiet-tab-panel name="cdn">

```js
import { animateWithClass } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@3.0.1/dist/utilities/animate-with-class.js';
```

</quiet-tab-panel>
<quiet-tab-panel name="npm">

```js
import { animateWithClass } from '@quietui/scurry/dist/utilities/animateWithClass.js';
```

</quiet-tab-panel>
</quiet-tab-list>

### Example

```html {.example}
<div id="box" style="display: block; width: 100px; height: 100px; background: var(--quiet-primary-fill-mid); margin: 2rem;"></div>

<style>
  /* Define a class that triggers an animation */
  .bounce {
    animation: bounce 0.5s;
    animation-timing-function: cubic-bezier(0.2, 0.65, 0.6, 1.35);
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes bounce {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-20px);
    }
  }
</style>

<script type="module">
  import { animateWithClass } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/utilities/index.js';

  const box = document.getElementById('box');

  animateWithClass(box, 'bounce', { duration: 2000, iterations: Infinity }).then(() => {
    // The animation has finished
  });
</script>
```

## Using `Element.animate()`

You can also animate elements directly with the Web Animations API's [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) function.

```html {.example}
<div id="box" style="display: block; width: 100px; height: 100px; background: var(--quiet-primary-fill-mid); margin: 2rem;"></div>

<script type="module">
  import { flip } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/animations/flippers/flip.js';
  import { easings } from 'https://cdn.jsdelivr.net/npm/@quietui/scurry@2.0.0/dist/easings/index.js';

  const box = document.getElementById('box');

  box.animate(flip, {
    duration: 2000,
    iterations: Infinity,
    easing: easings.easeInSine
  });
</script>
```

## Attribution

Animations are based on the great [Animate.css](https://animate.style/) library.
