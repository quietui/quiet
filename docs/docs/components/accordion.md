---
title: Accordion
layout: component
---

Accordions follow the [ARIA APG accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for accessibility. They are comprised of two different components. A single accordion surrounds one or more accordion items.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item>
    <span slot="label">What is a cat?</span>
    <p>A cat is a small, independent feline companion known for their purring, hunting skills, and tendency to knock things off tables. They're perfect for providing endless entertainment, companionship, and the occasional hairball surprise.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <span slot="label">When should I adopt one?</span>
    <p>Adopt a cat when you're ready for a lifetime commitment of love, responsibility, and being owned by a furry overlord. They're ideal when you need a companion who will judge your life choices while simultaneously demanding treats.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <span slot="label">Cat care best practices</span>
    <p>Essential cat care includes keeping litter boxes clean and accessible, providing scratching posts to save your furniture, scheduling regular vet checkups, and ensuring they have cozy hiding spots and sunny windowsills for optimal feline happiness.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

## Examples

### Providing content

Use the `label` attribute to provide a plain text label. To provide icons and other HTML, use the `label` slot instead.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item label="Why do cats purr?">
    <p>Cats purr for many reasons including contentment, self-healing, and communication. It's their built-in happiness meter!</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Why do cats knead with their paws?">
    <p>Kneading is a comfort behavior from kittenhood when they kneaded their mother's belly for milk. Adult cats knead when they're happy and relaxed.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <quiet-icon slot="label" name="cat"></quiet-icon>
    <span slot="label">Cat behavior mysteries</span>
    <p>From zoomies at 3 AM to bringing you "gifts" of dead mice, cats are wonderfully mysterious creatures with behaviors that keep us guessing.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Expanded initially

Add the `expanded` attribute to any accordion item that should be expanded initially.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item expanded>
    <span slot="label">What is a cat?</span>
    <p>A cat is a small, independent feline companion known for their purring, hunting skills, and tendency to knock things off tables. They're perfect for providing endless entertainment, companionship, and the occasional hairball surprise.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <span slot="label">When should I adopt one?</span>
    <p>Adopt a cat when you're ready for a lifetime commitment of love, responsibility, and being owned by a furry overlord. They're ideal when you need a companion who will judge your life choices while simultaneously demanding treats.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <span slot="label">Cat care best practices</span>
    <p>Essential cat care includes keeping litter boxes clean and accessible, providing scratching posts to save your furniture, scheduling regular vet checkups, and ensuring they have cozy hiding spots and sunny windowsills for optimal feline happiness.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Changing the appearance

Set the `appearance` attribute to `normal`, `contained`, `separated`, or `unstyled` to control the accordion's appearance.

```html {.example}
<div id="accordion__appearance">
  <quiet-radio label="Appearance" value="normal">
    <quiet-radio-item value="normal">Normal</quiet-radio-item>
    <quiet-radio-item value="contained">Contained</quiet-radio-item>
    <quiet-radio-item value="separated">Separated</quiet-radio-item>
    <quiet-radio-item value="unstyled">Unstyled</quiet-radio-item>
  </quiet-radio>

  <quiet-accordion>
    <quiet-accordion-item expanded>
      <span slot="label">What is a cat?</span>
      <p>A cat is a small, independent feline companion known for their purring, hunting skills, and tendency to knock things off tables. They're perfect for providing endless entertainment, companionship, and the occasional hairball surprise.</p>
    </quiet-accordion-item>

    <quiet-accordion-item>
      <span slot="label">When should I adopt one?</span>
      <p>Adopt a cat when you're ready for a lifetime commitment of love, responsibility, and being owned by a furry overlord. They're ideal when you need a companion who will judge your life choices while simultaneously demanding treats.</p>
    </quiet-accordion-item>

    <quiet-accordion-item>
      <span slot="label">Cat care best practices</span>
      <p>Essential cat care includes keeping litter boxes clean and accessible, providing scratching posts to save your furniture, scheduling regular vet checkups, and ensuring they have cozy hiding spots and sunny windowsills for optimal feline happiness.</p>
    </quiet-accordion-item>
  </quiet-accordion>
</div>

<script>
  const container = document.getElementById('accordion__appearance');
  const accordion = container.querySelector('quiet-accordion');
  const radio = container.querySelector('quiet-radio');

  radio.addEventListener('input', () => {
    accordion.appearance = radio.value;
  });
</script>

<style>
  #accordion__appearance {
    quiet-radio {
      margin-block-end: 2rem;
    }
  }
</style>
```

### Changing the size

Accordions are sized based on the current font size. To change their size, set the `font-size` on the accordion or an ancestor element.

```html {.example}
<quiet-accordion style="font-size: 1.25rem;">
  <quiet-accordion-item label="Why do cats purr?">
    <p>Cats purr for many reasons including contentment, self-healing, and communication. It's their built-in happiness meter!</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Cat grooming habits">
    <p>Cats spend 30-50% of their day grooming themselves to stay clean, regulate temperature, and reduce stress.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Why do cats sleep so much?">
    <p>Cats sleep 12-16 hours a day because they're natural predators who conserve energy for hunting (even if they're just hunting dust bunnies).</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Disabling items

Use the `disabled` attribute to prevent users from expanding certain accordion items. This is useful for sections that require certain conditions to be met before they can be accessed.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item label="Indoor cats">
    <p>Indoor cats live longer, safer lives and are protected from outdoor dangers like traffic, predators, and diseases.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Outdoor cats" disabled>
    <p>This section about outdoor cats is disabled until you've completed the indoor cat safety course.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Senior cat care">
    <p>Senior cats need extra attention with diet, comfort, and regular health monitoring as they age gracefully.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Auto-collapsing

By default, multiple accordion items can be expanded at the same time. Add the `auto-collapse` attribute to ensure only one item is expanded at a time.

```html {.example}
<quiet-accordion auto-collapse>
  <quiet-accordion-item label="Kitten care" expanded>
    <p>When auto-collapse is enabled, opening another section will automatically close this one. Kittens need frequent feeding, socialization, and lots of love!</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Adult cat care">
    <p>Click me to see the kitten section collapse automatically. Adult cats are more independent but still need daily attention and care.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Senior cat care">
    <p>Only one cat life stage can be discussed at a time with auto-collapse enabled. Senior cats deserve extra comfort and patience.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Changing the icon position

Set the `icon-position` to `start` to render the icon on the front of the header.

```html {.example}
<quiet-accordion icon-position="start">
  <quiet-accordion-item label="Why do cats sleep so much?">
    <p>Cats sleep 12-16 hours a day because they're natural predators who conserve energy for hunting (even if they're just hunting dust bunnies).</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Do cats dream?">
    <p>Yes! Cats experience REM sleep and likely dream about hunting, playing, or plotting world domination.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Customizing the icon

The expand/collapse icon can be customized by slotting in your own icon. If you don't want the default rotation, target the `icon` part and set the `rotate` property to a custom rotation angle.

```html {.example}
<quiet-accordion id="accordion__custom-icon">
  <quiet-accordion-item label="Cat communication">
    <quiet-icon slot="icon" name="chevron-right"></quiet-icon>
    <p>Cats communicate through meowing, purring, chirping, and the infamous slow blink of love.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Cat body language">
    <quiet-icon slot="icon" name="chevron-right"></quiet-icon>
    <p>A cat's tail, ears, and posture tell you everything about their mood - from happy to "I'm plotting your demise."</p>
  </quiet-accordion-item>
</quiet-accordion>

<style>
  #accordion__custom-icon {
    quiet-accordion-item::part(icon) {
      rotate: 0deg;
    }

    quiet-accordion-item:state(expanded)::part(icon) {
      rotate: 90deg;
    }
  }
</style>
```

A common way to style accordion icons is with plus and minus icons. For this, you can toggle which icon shows when the accordion item is expanded using the `:state(expanded)` CSS selector.

```html {.example}
<quiet-accordion id="accordion__plus-minus">
  <quiet-accordion-item label="Cat breeds">
    <quiet-icon slot="icon" name="plus" class="plus"></quiet-icon>
    <quiet-icon slot="icon" name="minus" class="minus"></quiet-icon>
    <p>From fluffy Maine Coons to hairless Sphynx cats, there are over 40 recognized cat breeds, each with their own personality traits.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Cat colors and patterns">
    <quiet-icon slot="icon" name="plus" class="plus"></quiet-icon>
    <quiet-icon slot="icon" name="minus" class="minus"></quiet-icon>
    <p>Cats come in amazing colors and patterns like tabby, calico, tuxedo, and tortoiseshell - nature's own art gallery!</p>
  </quiet-accordion-item>
</quiet-accordion>

<style>
  #accordion__plus-minus .minus {
    display: none;
  }

  /* When expanded: hide plus and show minus */
  #accordion__plus-minus quiet-accordion-item:state(expanded) .plus {
    display: none;
  }

  #accordion__plus-minus quiet-accordion-item:state(expanded) .minus {
    display: block;
  }
</style>
```

### Styling accordions

Accordions come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-accordion appearance="contained" auto-collapse id="accordion__styling">
  <quiet-accordion-item>
    <div slot="label">
      <quiet-avatar label="Meowy McGee" image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
      <div>
        Meowy McGee
        <p><small>Freedom's just another word for nothing left to lose</small></p>
      </div>
    </div>
    <p>
      A philosophical feline with a rebellious streak, Meowy spends their days contemplating the deeper meaning of cardboard boxes and refusing to acknowledge the concept of "off-limits" furniture. When not busy knocking things off counters with purposeful intent, they can be found staring intensely at walls, presumably seeing things the rest of us mere mortals cannot.
    </p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <div slot="label">
      <quiet-avatar label="Lady Pawington" image="https://images.unsplash.com/photo-1516310789627-2ff305829fbb?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
      <div>
        Lady Pawington
        <p><small>Professional sunbeam chaser and nap enthusiast</small></p>
      </div>
    </div>
    <p>
      The epitome of feline sophistication, Lady Pawington has mastered the art of finding the perfect sunbeam at precisely 2:47 PM every day. She maintains a rigorous schedule of 16-hour power naps, interrupted only by brief but important meetings with her food bowl and the occasional judgmental stare at the humans who dare to disturb her royal slumber.
    </p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <div slot="label">
      <quiet-avatar label="Sir Whiskertons III" image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
      <div>
        Sir Whiskertons III
        <p><small>Living all nine lives to the fullest, one treat at a time</small></p>
      </div>
    </div>
    <p>
      A distinguished gentleman cat with an insatiable appetite for adventure (and treats), Sir Whiskertons approaches each day like it's his personal buffet of experiences. Whether he's conducting important business meetings with dust bunnies under the couch or hosting diplomatic summits with the neighborhood squirrels from his window perch, he does it all with the confidence of someone who knows they've got eight lives in reserve.
    </p>
  </quiet-accordion-item>
</quiet-accordion>

<style>
  #accordion__styling {
    div[slot="label"] {
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        line-height: 1.2;
      }
    }

  }
</style>
```
