---
title: Typewriter
layout: component
---

```html {.example}
<quiet-typewriter 
  text="Hello, World!" 
  speed="100"
  delay="500"
  loop
  with-cursor
  style="font-size: 2.5rem; font-weight: var(--quiet-font-weight-bold);"
></quiet-typewriter>
```

:::info
Typewriter honors the user's [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting. If you're not seeing animations, this might be why. To override this behavior, which is generally not recommended, use the `ignore-reduced-motion` attribute.
:::

## Examples

### Providing text

Use the `text` attribute set the text to animate.

```html {.example}
<div id="typewriter__text">
  <p>
    <quiet-typewriter text="Cats are fluffy masters of stealth and napping."></quiet-typewriter>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('typewriter__text');
  const typewriter = container.querySelector('quiet-typewriter');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    typewriter.restart();
  });
</script>
```

### Showing the cursor

Add `with-cursor` to show a cursor while typing. If desired, use `--cursor-color` to change the cursor's color.

```html {.example}
<div id="typewriter__cursor">
  <p>
    <quiet-typewriter 
      text="Cats are agile hunters with a knack for ignoring you."
      with-cursor
    ></quiet-typewriter>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('typewriter__cursor');
  const typewriter = container.querySelector('quiet-typewriter');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    typewriter.restart();
  });
</script>
```

### Looping

Use the `loop` attribute to make the typewriter delete the text and type it again when it finishes typing. The `loop-delay` attribute controls the pause between typing and erasing.

```html {.example}
<quiet-typewriter 
  text="Cats love chasing their tails in an endless loop of chaos." 
  loop 
  loop-delay="1000"
></quiet-typewriter>
```

### Controlling speed and delay

Use the `delay` attribute to set the time before typing begins and the `speed` attribute to control the average typing speed.

```html {.example}
<div id="typewriter__speed">
  <p>
    <quiet-typewriter 
      text="Cats type slowly with a dramatic pause." 
      delay="1500" 
      speed="300"
      with-cursor
    ></quiet-typewriter>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('typewriter__speed');
  const typewriter = container.querySelector('quiet-typewriter');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    typewriter.restart();
  });
</script>
```

### Pausing

Add and remove the `pause` attribute to pause and restart typing at any time. This is typically used with `loop`.

```html {.example}
<div id="typewriter__pause">
  <p>
    <quiet-typewriter 
      id="typewriter__pause" 
      text="I said pause, not paws!" 
      loop
      with-cursor
    ></quiet-typewriter>
  </p>

  <quiet-button 
    variant="primary" 
    toggle="off" 
    icon-label="Toggle Pause"
  >
    Pause
  </quiet-button>
</div>

<script>
  const container = document.getElementById('typewriter__pause');
  const typewriter = container.querySelector('quiet-typewriter');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    typewriter.pause = button.toggle === 'on';
  });
</script>
```

### Starting when in view

Use the `start-on-view` attribute to start the animation when the element scrolls into view.

```html {.example}
<quiet-typewriter 
  text="I started as soon as I came into view! Refresh the page to watch again." 
  start-on-view 
  with-cursor
></quiet-typewriter>
```

### Listening for completion

Listen for the `quiet-animation-complete` event to trigger actions when the animation finishes. When using `loop`, the event will be dispatched each time typing completes.

```html {.example}
<div id="typewriter__complete">
  <p>
    <quiet-typewriter 
      id="typewriter__complete" 
      text="Check the console when this finishes."
    ></quiet-typewriter>
  </p>

  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('typewriter__complete');
  const typewriter = container.querySelector('quiet-typewriter');
  const button = container.querySelector('quiet-button');

  typewriter.addEventListener('quiet-animation-complete', () => {
    console.log('Typewriter animation completed!');
  });
  
  button.addEventListener('click', () => {
    typewriter.restart();
  });
</script>
```

### Styling the typewriter

Customize the appearance with CSS for a unique typing effect. Use the `--cursor-color` and `--cursor-width` custom properties to change the cursor.

```html {.example}
<quiet-typewriter
  text="Styled typewriter effect" 
  with-cursor
  loop
  id="typewriter__styling"
></quiet-typewriter>

<style>
  #typewriter__styling {
    --cursor-color: #ff0000;
    --cursor-width: 0.5em;
    font-size: 24px;
    color: #0066cc;
    font-family: monospace;
  }
</style>
```
