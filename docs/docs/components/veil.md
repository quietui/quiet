---
title: Veil
layout: component
---

```html {.example}
<div id="veil__overview">
  <quiet-veil id="veil__overview">
    <quiet-card>
      <form>
        <quiet-text-field label="Name" name="name" placeholder="Meowy McGee"></quiet-text-field>
        <quiet-text-area label="Feedback" name="feedback" placeholder="Tell us about your experience!"></quiet-text-area>
        <quiet-button type="submit" variant="primary">Submit</quiet-button>
      </form>
    </quiet-card>
  </quiet-veil>
</div>

<script>
  const container = document.getElementById('veil__overview');
  const form = container.querySelector('form');
  const veil = container.querySelector('quiet-veil');
  
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Show the veil
    veil.active = true;

    // Simulate an async operation, then hide it
    setTimeout(() => veil.active = false, 2000);
  });
</script>

<style>
  #veil__overview {
    quiet-veil {
      max-width: 360px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }
</style>
```

## Examples

### Controlling the veil

Veils are designed to wrap block-level content. They are invisible and remain dormant until you activate them. When a veil is activated, it will show its `front` slot and everything inside of it will become [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) until deactivated.

To activate a veil, set the `active` property to `true`. To deactivate a veil, set the `active` property to `false`.

```html
<quiet-veil>
  <!-- Content to cover -->
</quiet-veil>

<script>
  // Obtain a reference
  const veil = document.querySelector('quiet-veil');

  // ...

  async function doSomething() {
    // Show the veil
    veil.active = true;

    // Do something, like post to the server
    await fetch('...');

    // Hide the veil
    veil.active = false;
  }
</script>
```

### Customizing the content

You can customize the content that appears in front of the veil using the `front` slot. This example shows a progress ring to reflect its progress while simulating an async save operation.

```html {.example}
<div id="veil__progress">
  <quiet-veil>
    <!-- Content to cover -->
    <quiet-card>
      <form>
        <quiet-rating name="name" label="How would you rate our catnip?">
          <span slot="description">
            For details, please <a href="https://example.com/" target="_blank">visit our website</a>.
          </span>
        </quiet-rating>
        <quiet-button type="submit" variant="primary">Rate</quiet-button>
      </form>
    </quiet-card>

    <!-- Content in the front -->
    <quiet-progress slot="front" appearance="ring" label="Progress">
      <span class="message">Updating…</span>
      <quiet-icon name="check"></quiet-icon>
    </quiet-progress>
  </quiet-veil>
</div>

<script>
  const container = document.getElementById('veil__progress');
  const veil = container.querySelector('quiet-veil');
  const progress = container.querySelector('quiet-progress');
  const saveButton = container.querySelector('quiet-button');
  const form = container.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Set the initial state
    progress.value = 0;
    veil.classList.remove('saved');
    veil.active = true;

    // Simulate a long running async task
    const interval = setInterval(() => {
      progress.value += 5;
      
      // Show saved state when it reaches 100%
      if (progress.value >= 100) {
        clearInterval(interval);

        veil.classList.add('saved');

        // Automatically dismiss after a moment
        setTimeout(() => veil.active = false, 1000);
      }
    }, 50);
  });
</script>

<style>
  #veil__progress {
    quiet-veil {
      max-width: 360px;

      &.saved {    
        quiet-progress {    
          --indicator-color: var(--quiet-constructive-fill-mid);
        }

        quiet-icon[name="check"] {
          color: var(--quiet-constructive-fill-mid);
        }

        .message {
          display: none;
        }
      }

      &:not(.saved) {
        quiet-icon[name="check"] {
          display: none;
        }
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    quiet-progress {
      --track-size: .5rem;
      --track-color: #0002;
      max-width: 300px;

      quiet-icon {
        font-size: 5rem;
        stroke-width: .15rem;
        color: var(--quiet-primary-fill-mid);
      }
    }

    .message {
      font-size: 1rem;
      color: var(--quiet-text-muted);
    }
  }
</style>
```