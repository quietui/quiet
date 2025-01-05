---
title: Slide Action
layout: component
---

Slide actions are unidirectional. Once activated by the user, they can only be reset programmatically. The deliberate friction in activation, followed by a locked state, helps prevent accidental triggering while ensuring intentional actions are committed.

```html {.example}
<quiet-slide-action 
  label="Slide to activate" 
  attention="shimmer" 
  id="slide-action__overview" 
  style="max-width: 340px;"
></quiet-slide-action>

<script>
  const slideAction = document.getElementById('slide-action__overview');
  const originalLabel = slideAction.getAttribute('label');

  // When the component is activated
  slideAction.addEventListener('quiet-activate', () => {
    // Update the label
    slideAction.label = 'Activated';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideAction.activated = false;
      slideAction.label = originalLabel;
    }, 2000);
  });
</script>
```

:::info
For demonstration purposes, most of the examples on this page reset themselves shortly after activation.
:::

## Examples

### Handling activation

When the user activates the slide action, a `quiet-activate` event will be emitted. If the programmatically deactivate the slide action, a `quiet-deactivate` event will be emitted.

You can use these events to update labels and execute code to run on activation and deactivation.

```html {.example}
<div id="slide-action__activation">
  <quiet-slide-action label="Slide to activate" style="max-width: 340px;"></quiet-slide-action>
  <quiet-button disabled>Deactivate</quiet-button>
</div>

<script>
const container = document.getElementById('slide-action__activation');
const slideAction = container.querySelector('quiet-slide-action');
const button = container.querySelector('quiet-button');
const originalLabel = slideAction.getAttribute('label');

// Deactivate it
button.addEventListener('click', () => {
  slideAction.activated = false;
});

// Update the label and button state when activated
slideAction.addEventListener('quiet-activate', () => {
  button.disabled = false;
  slideAction.label = 'Activated';
});

// Update the label and button state when deactivated
slideAction.addEventListener('quiet-deactivate', () => {
  button.disabled = true;
  slideAction.label = originalLabel;
});
</script>

<style>
  #slide-action__activation {
    quiet-slide-action {
      margin-bottom: 1rem; 
    }
  }
</style>
```

### Listening for progress

You can also listen to `quiet-progress`, which will be emitted as the user slides the thumb. This event is dispatched with an `event.detail.percentage` payload which is a number between 0 and 1, indicating the percentage of distance the user has slide the thumb towards activation. This can be useful if you want to apply custom styles or transitions at various thresholds.

```html {.example}
<div id="slide-action__progress">
  <quiet-slide-action label="Slide to place order" style="max-width: 340px;"></quiet-slide-action>
  Progress: <quiet-number number="0" type="percent"></quiet-number>
</div>

<script>
  const container = document.getElementById('slide-action__progress');
  const slideAction = container.querySelector('quiet-slide-action');
  const originalLabel = slideAction.getAttribute('label');
  const progress = container.querySelector('quiet-number');

  // Update progress as the user drags
  slideAction.addEventListener('quiet-progress', event => {
    progress.number = event.detail.percentage;
  });

  // Update the label and reset the demo when component is activated
  slideAction.addEventListener('quiet-activate', () => {
    // Update the label
    slideAction.label = 'Order received!';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideAction.activated = false;
      slideAction.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  #slide-action__progress {
    quiet-slide-action {
      margin-bottom: 1rem; 
    }
  }
</style>
```

### Customizing icons

Use the `thumb` slot to provide your own icon(s) for the thumb. If you want to change the icon depending on the activation state, use the `:state(activated)` selector to show/hide the respective icons with CSS.

```html {.example}
<quiet-slide-action 
  label="Slide to unlock" 
  id="slide-action__icons"
  style="max-width: 340px;"
>
  <quiet-icon slot="thumb" name="lock"></quiet-icon>
  <quiet-icon slot="thumb" name="lock-open-2"></quiet-icon>
</quiet-slide-action>

<script>
  const slideAction = document.getElementById('slide-action__icons');
  const originalLabel = slideAction.getAttribute('label');

  // When the component is activated
  slideAction.addEventListener('quiet-activate', () => {
    // Update the label
    slideAction.label = 'Unlocked';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideAction.activated = false;
      slideAction.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  quiet-slide-action#slide-action__icons {
    /* Show locked until activated, then show unlocked */
    &:state(activated) quiet-icon[name="lock"],
    &:not(:state(activated)) quiet-icon[name="lock-open-2"] {
      display: none;
    }
  }
</style>
```

### Drawing attention

Set the `attention` attribute to `shimmer` to provide a subtle visual hint via animation. The animation pauses when the slide action is activated.

```html {.example}
<quiet-slide-action 
  label="Slide to release cats" 
  attention="shimmer" 
  id="slide-action__attention" 
  style="max-width: 340px;"
>
  <quiet-icon slot="thumb" name="cat"></quiet-icon>
</quiet-slide-action>

<script>
  const slideAction = document.getElementById('slide-action__attention');
  const originalLabel = slideAction.getAttribute('label');

  // When the component is activated
  slideAction.addEventListener('quiet-activate', () => {
    // Update the label
    slideAction.label = 'Releasing cats…';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideAction.activated = false;
      slideAction.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  quiet-slide-action#slide-action__attention {
    /* Head tilt*/
    quiet-icon {
      transition: 300ms rotate ease-out;
    }

    &:state(activated) quiet-icon {
      rotate: 20deg;
    }
  }
</style>
```

### Disabling

Use the `disabled` attribute to disable the slide action. The control cannot be activated or focused while disabled.

```html {.example}
<quiet-slide-action label="Slide to activate" disabled style="max-width: 300px;"></quiet-slide-action>
```

### Styling slide actions

Slide actions come with a simple, minimal appearance. Feel free to customize them with your own styles, icons, and animations.

```html {.example}
<quiet-slide-action 
  label="Empty the litter box" 
  attention="shimmer" 
  id="slide-action__styling"
  style="max-width: 340px;"
>
  <quiet-icon slot="thumb" name="arrow-right"></quiet-icon>
  <quiet-spinner slot="thumb"></quiet-spinner>
</quiet-slide-action>

<script>
  const slideAction = document.getElementById('slide-action__styling');
  const originalLabel = slideAction.getAttribute('label');

  // When the component is activated
  slideAction.addEventListener('quiet-activate', () => {
    // Update the label
    slideAction.label = 'Emptying…';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideAction.activated = false;
      slideAction.label = originalLabel;
    }, 2000);
  });

  // Set a custom property to mirror the progress
  slideAction.addEventListener('quiet-progress', event => {
    slideAction.style.setProperty('--progress', `${event.detail.percentage * 100}%`);
  });
</script>

<style>
  quiet-slide-action#slide-action__styling {
    --border-radius: 0.5rem;
    --thumb-width: 4rem;
    --thumb-inset: 0.25rem;
    --shimmer-color: #fff2;
    --current-color: color-mix(in oklab, firebrick var(--progress, 0%), dodgerblue calc(100% - var(--progress, 0%)));
    height: 4rem;
    background-color: var(--current-color);
    font-weight: var(--quiet-font-weight-semibold);
    color: white;
    
    &:focus-within {
      outline-color: var(--current-color) !important;
    }

    /* Animate when activated */
    &:state(activated) {
      animation: pulse 0.6s ease-out forwards;
    }

    /* Slightly bigger icons */
    quiet-icon {
      font-size: 1.5rem;
    }

    quiet-spinner {
      --indicator-color: firebrick;
      --track-color: color-mix(in oklab, firebrick, transparent 80%);
    }

    /* Show arrow icon until activated, then show trash */
    &:state(activated) quiet-icon[name="arrow-right"],
    &:not(:state(activated)) quiet-spinner {
      display: none;
    }

    /* Bounce animation for fun */
    quiet-icon[name="arrow-right"] {
      animation: bounce-right 1s infinite;

      /* Flip for RTL */
      &:dir(rtl) {
        scale: -1;
      }
    }  
  }

  @keyframes bounce-right {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(6px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      filter: brightness(1);
    }
    20% {
      transform: scale(1.05);
      filter: brightness(1.2);
    }
    40% {
      transform: scale(0.95);
      filter: brightness(0.9);
    }
    60% {
      transform: scale(1.02);
      filter: brightness(1.1);
    }
    80% {
      transform: scale(0.98);
      filter: brightness(0.95);
    }
    100% {
      transform: scale(1);
      filter: brightness(1);
    }
  }
</style>
```