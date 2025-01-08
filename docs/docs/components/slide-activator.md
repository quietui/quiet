---
title: Slide Activator
layout: component
---

Slide activators are unidirectional. Once activated by the user, they can only be reset programmatically. The deliberate friction in activation, followed by a locked state, helps prevent accidental triggering and ensures intentional actions are committed.

```html {.example}
<quiet-slide-activator 
  label="Slide to activate" 
  attention="shimmer" 
  id="slide-activator__overview" 
  style="max-width: 340px;"
></quiet-slide-activator>

<script>
  const slideActivator = document.getElementById('slide-activator__overview');
  const originalLabel = slideActivator.getAttribute('label');

  // When the component is activated
  slideActivator.addEventListener('quiet-activated', () => {
    // Update the label
    slideActivator.label = 'Activated';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
      slideActivator.label = originalLabel;
    }, 2000);
  });
</script>
```

:::info
For demonstration purposes, most of the examples on this page reset themselves shortly after activation.
:::

## Examples

### Handling activation

When the control is activated, a `quiet-activate` event will be emitted. You can call `event.preventDefault()` to prevent the activation if needed. Upon activation, a subsequent `quiet-activated` event will be emitted.

If you deactivate the control programmatically, a corresponding `quiet-deactivate` and `quiet-deactivated` event will be emitted.

You can use these events to update labels and execute code to run on activation and deactivation.

```html {.example}
<div id="slide-activator__activation">
  <quiet-slide-activator label="Slide to activate"></quiet-slide-activator>
  <quiet-button disabled>Deactivate</quiet-button>
</div>

<script>
const container = document.getElementById('slide-activator__activation');
const slideActivator = container.querySelector('quiet-slide-activator');
const button = container.querySelector('quiet-button');
const originalLabel = slideActivator.getAttribute('label');

// Deactivate it
button.addEventListener('click', () => {
  slideActivator.activated = false;
});

// Update the label and button state when activated
slideActivator.addEventListener('quiet-activated', () => {
  button.disabled = false;
  slideActivator.label = 'Activated';
});

// Update the label and button state when deactivated
slideActivator.addEventListener('quiet-deactivated', () => {
  button.disabled = true;
  slideActivator.label = originalLabel;
});
</script>

<style>
  #slide-activator__activation {
    quiet-slide-activator {
      max-width: 340px;
      margin-bottom: 1rem; 
    }
  }
</style>
```

### Tracking slide progress

The readonly `--thumb-position` custom property will be set to a value between 0 and 1 on the host element, representing how far the user has slid the thumb toward activation. You can use this to transition styles at different thresholds.

Additionally, a `quiet-progress` event will be emitted while the user slides the thumb. This event contains an `event.detail.percentage` payload with a corresponding number between 0 and 1.

```html {.example}
<div id="slide-activator__progress">
  <quiet-slide-activator label="Slide to place order"></quiet-slide-activator>
  Progress: <quiet-number number="0" type="percent"></quiet-number>
</div>

<script>
  const container = document.getElementById('slide-activator__progress');
  const slideActivator = container.querySelector('quiet-slide-activator');
  const originalLabel = slideActivator.getAttribute('label');
  const progress = container.querySelector('quiet-number');

  // Update progress as the user drags
  slideActivator.addEventListener('quiet-progress', event => {
    progress.number = event.detail.percentage;
  });

  // Update the label and reset the demo when component is activated
  slideActivator.addEventListener('quiet-activated', () => {
    // Update the label
    slideActivator.label = 'Order received!';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
      slideActivator.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  #slide-activator__progress {
    quiet-slide-activator {
      max-width: 340px;
      margin-bottom: 1rem;

      /* Change the background color as the user slides the thumb */
      background-color: 
        color-mix(
          in oklab, 
          var(--quiet-neutral-fill-soft) calc((1 - var(--thumb-position)) * 100%), 
          var(--quiet-primary-fill-mid) calc(var(--thumb-position) * 100%)
        );

      /* Change the text color when activated */
      &:state(activated) {
        color: var(--quiet-primary-text-on-mid);
      }
    }
  }
</style>
```

### Customizing icons

Use the `thumb` slot to provide your own icon(s) for the thumb. If you want to change the icon depending on the activation state, use the `:state(activated)` selector to show/hide the respective icons with CSS.

```html {.example}
<quiet-slide-activator 
  label="Slide to unlock" 
  id="slide-activator__icons"
>
  <quiet-icon slot="thumb" name="lock"></quiet-icon>
  <quiet-icon slot="thumb" name="lock-open-2"></quiet-icon>
</quiet-slide-activator>

<script>
  const slideActivator = document.getElementById('slide-activator__icons');
  const originalLabel = slideActivator.getAttribute('label');

  // When the component is activated
  slideActivator.addEventListener('quiet-activated', () => {
    // Update the label
    slideActivator.label = 'Unlocked';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
      slideActivator.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  quiet-slide-activator#slide-activator__icons {
    max-width: 340px;

    /* Show locked until activated, then show unlocked */
    &:state(activated) quiet-icon[name="lock"],
    &:not(:state(activated)) quiet-icon[name="lock-open-2"] {
      display: none;
    }
  }
</style>
```

### Drawing attention

Set the `attention` attribute to `shimmer` to provide a subtle visual hint via animation. The animation pauses when the slide activator is activated.

```html {.example}
<quiet-slide-activator 
  label="Slide to release cats" 
  attention="shimmer" 
  id="slide-activator__attention" 
>
  <quiet-icon slot="thumb" name="cat"></quiet-icon>
</quiet-slide-activator>

<script>
  const slideActivator = document.getElementById('slide-activator__attention');
  const originalLabel = slideActivator.getAttribute('label');

  // When the component is activated
  slideActivator.addEventListener('quiet-activated', () => {
    // Update the label
    slideActivator.label = 'Releasing cats…';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
      slideActivator.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  quiet-slide-activator#slide-activator__attention {
    max-width: 340px;

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

Use the `disabled` attribute to disable the slide activator. The control cannot be activated or focused while disabled.

```html {.example}
<quiet-slide-activator 
  label="Slide to activate" 
  disabled 
  style="max-width: 340px;"
></quiet-slide-activator>
```

### Submitting forms

While not a form control itself, the slide activator is often used to trigger form submission. You can hook into the `quiet-activated` event and use [`requestSubmit()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) to achieve this.

```html {.example}
<form action="about:blank" target="_blank" id="slide-activator__form">
  <quiet-text-field label="Name" name="name" value="Meowy McGee"></quiet-text-field>
  <quiet-slide-activator label="Slide to submit" attention="shimmer"></quiet-slide-activator>
</form>

<script>
  const form = document.getElementById('slide-activator__form');
  const slideActivator = form.querySelector('quiet-slide-activator');

  slideActivator.addEventListener('quiet-activated', () => {
    form.requestSubmit();

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
    }, 2000);
  });
</script>

<style>
  #slide-activator__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 340px;
  }
</style>
```

### Styling slide activators

Slide activators come with a simple, minimal appearance. Feel free to customize them with your own styles, icons, and animations.

```html {.example}
<quiet-slide-activator 
  label="Empty the litter box" 
  attention="shimmer" 
  id="slide-activator__styling"
>
  <quiet-icon slot="thumb" name="arrow-right"></quiet-icon>
  <quiet-spinner slot="thumb"></quiet-spinner>
</quiet-slide-activator>

<script>
  const slideActivator = document.getElementById('slide-activator__styling');
  const originalLabel = slideActivator.getAttribute('label');

  // When the component is activated
  slideActivator.addEventListener('quiet-activated', () => {
    // Update the label
    slideActivator.label = 'Emptying…';

    // Deactivate it for the demo after two seconds
    setTimeout(() => {
      slideActivator.activated = false;
      slideActivator.label = originalLabel;
    }, 2000);
  });
</script>

<style>
  quiet-slide-activator#slide-activator__styling {
    --border-radius: 0.5rem;
    --thumb-width: 4rem;
    --thumb-inset: 0.25rem;
    --shimmer-color: #fff2;
    --current-color: 
      color-mix(
        in oklab, 
        firebrick calc(var(--thumb-position) * 100%), 
        #0284c7 calc((1 - var(--thumb-position)) * 100%)
      );
    height: 4rem;
    max-width: 340px;
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