---
title: Spoiler
layout: component
---

Content inside a spoiler is rendered [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and cannot be focused or read by a screen reader until the user explicitly shows it. It will, however, show up in the source and in dev tools. This pattern is based off Scott O'Hara's [accessible spoiler post](https://www.scottohara.me/blog/2024/08/22/spoiler.html).

```html {.example}
<quiet-spoiler>
  Spoiling a book or movie, especially one centered around a theme as universally beloved as cats, can significantly 
  detract from the enjoyment of the narrative. The joy of diving into a story about cats, with their mysterious and 
  often whimsical nature, lies in the unexpected twists and turns that mirror their unpredictable behavior.
</quiet-spoiler>
```

## Examples

### Changing the reveal label

Use the `label` attribute to provide a plain text label for the spoiler's reveal. If you want to provide HTML, use the `label` slot instead.

```html {.example}
<quiet-spoiler class="spoiler__reveal">
  <span slot="label">
    <quiet-icon name="hand-stop"></quiet-icon><br>
    Warning! NSFW
  </span>
  In the quiet hours of the night, when the house is still, the kittens decide it's time for their raucous escapades. They've discovered the laundry basket, not for napping, but for a game of 'who can make the most noise with the least amount of fabric. Tumbling into a pile of freshly washed socks, they wrestle and roll, occasionally getting their tiny claws stuck in more intimate articles of clothing, leading to a flurry of playful, albeit slightly embarrassing, attempts to free themselves. Their innocent chaos turns the bedroom into a scene that's part comedy, part mild scandal, as they inadvertently create a kitten burlesque show with every leap and pounce.
</quiet-spoiler>

<style>
  .spoiler__reveal {
    quiet-icon {
      font-size: 1.5rem;
    }

    &::part(label) {
      border-radius: 1rem;
      padding-block: 1rem;
    }
  }
</style>
```

### Inline spoilers

Add the `inline` attribute to render the spoiler inline.

```html {.example}
My favorite cats are <quiet-spoiler inline label="?">tabby cats</quiet-spoiler> and <quiet-spoiler inline label="?">flabby cats</quiet-spoiler>.
```

:::info
Keep it short! The content within inline spoilers won't wrap.
:::

### Changing the effect

The default spoiler effect is `blur`, which blurs the content but still leaves a visual hint. To completely cover the spoiler, use the `solid` effect. To add noise, use the `noise` effect.

```html {.example .flex-column}
<quiet-spoiler effect="solid">
  Spoiling a good book, even one about something as universally beloved as kittens, robs you of the journey the author 
  intended. Imagine unfolding a mystery only to have the solution handed to you at the start; the delight of discovery, 
  the emotional rollercoaster, and the gradual unveiling of characters' depths are all diminished. In a book about 
  kittens, you might expect tales of mischief, growth, and perhaps even a bit of heart-warming drama.
</quiet-spoiler>

<quiet-spoiler effect="noise">
  Spoiling a good book, even one about something as universally beloved as kittens, robs you of the journey the author 
  intended. Imagine unfolding a mystery only to have the solution handed to you at the start; the delight of discovery, 
  the emotional rollercoaster, and the gradual unveiling of characters' depths are all diminished. In a book about 
  kittens, you might expect tales of mischief, growth, and perhaps even a bit of heart-warming drama.
</quiet-spoiler>
```

### Showing images

You can show images in a spoiler just like any other content.

```html {.example}
<quiet-spoiler>
  <span slot="label">Show me the kitten!</span>
  <img src="https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten plays with toys">
</quiet-spoiler>
```

### Showing videos

You can show videos in a spoiler just like any other content.

```html {.example}
<quiet-spoiler label="Show the video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/fOd16PT1S7A?si=J8Z5QmCZvUhZ4r1M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="margin-block-end: 0;"></iframe>
</quiet-spoiler>
```

### Persisting spoilers

To persist the spoiler once shown, add the `persist` attribute. This will remove the spoiler's close button. To programmatically hide it again, set the `visible` property to `false`.

```html {.example}
<div id="spoiler__persist">
  <quiet-spoiler persist>
    Spoiling a book or movie, especially one centered around a theme as universally beloved as cats, can significantly 
    detract from the enjoyment of the narrative. The joy of diving into a story about cats, with their mysterious and 
    often whimsical nature, lies in the unexpected twists and turns that mirror their unpredictable behavior.
  </quiet-spoiler>

  <p style="margin-block-start: 2rem;">
    If you really want to know, just ask <quiet-spoiler persist inline label="?">the gray cat</quiet-spoiler>!
  </p>

  <quiet-button>Reset demos</quiet-button>
</div>

<script>
  const container = document.getElementById('spoiler__persist');
  const resetButton = container.querySelector('quiet-button');

  resetButton.addEventListener('quiet-click', () => {
    container.querySelectorAll('quiet-spoiler').forEach(spoiler => spoiler.visible = false);
  });
</script>
```

### Grouping spoilers

Set the `name` attribute to the same value to group spoilers. Only one spoiler in a group will be shown at a time.

```html {.example .flex-column}
<quiet-spoiler name="lorem" label="Section 1">
  Kittens, with their boundless energy, are the epitome of play. They chase after anything that moves, honing their hunting skills through endless games. Their playful tumbles not only entertain but also strengthen bonds with their human families.
</quiet-spoiler>

<quiet-spoiler name="lorem" label="Section 2">
  In a kitten's world, every object is a potential toy. A simple string or a feather can become a dragon to chase or a bird to catch. This playfulness is essential for their development, teaching them skills they'll need as adults.
</quiet-spoiler>

<quiet-spoiler name="lorem" label="Section 3">
  Watching kittens play is like witnessing a circus act. They leap and tumble with a grace that belies their tiny size, turning every moment into a spectacle of joy. Their antics remind us to find joy in the simplest of things.
</quiet-spoiler>
```

### Styling spoilers

Spoilers come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-spoiler class="spoiler__bg">
  <span slot="label">
    <quiet-icon name="book"></quiet-icon><br>
    Reveal the ending
  </span>
  <p>With the sun setting behind them, the kittens stood at the forest's edge. Smudge, the wise gray tabby, looked at his siblings. "We've seen the world," he meowed softly.</p>
  <p>Luna, ever the brave one, nodded. "And it's all ours."</p>
  <p>Together, they stepped into the woods, their tiny paws barely making a sound. The forest, dark and full of whispers, welcomed them. As night fell, their eyes gleamed like stars, leading them into the unknown, where every shadow held a new tale. And so, their adventure continued, into the heart of the wild, forever chasing the next horizon.</p>
  </quiet-spoiler>

<style>
  .spoiler__bg {
    quiet-icon {
      font-size: 1.5rem;
    }

    &::part(cover) {
      background-color: hsla(0, 100%, 50%, 1);
      background-image:
        radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
        radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);
      background-size: 100%;
    }

    &::part(cover):focus-visible {
      outline-color: #7b60eb;
    }

    &::part(label) {
      background-color: #0006;
      color: white;
      padding-inline: 2rem;
      padding-block: 1rem;
    }

    &::part(hide-button) {
      background-color: #7b60eb;
      color: white;
    }

    &::part(hide-button):focus-visible {
      outline-color: #7b60eb;
    }

    p:last-child {
      margin-block-end: 0;
    }
  }
</style>
```