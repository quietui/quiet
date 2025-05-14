---
title: Expander
layout: component
---

```html {.example}
<quiet-expander>
  <img 
    src="https://images.unsplash.com/photo-1746104718755-9c6499747f8d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Portrait of a gray cat looking towards the bottom left." 
    style="max-width: 200px; float: right; margin-inline-start: 2rem; margin-block-end: 2rem;"
  >
  <p>Cats can jump up to five times their own height in a single leap, making them the acrobats of the animal kingdom. Picture a cat vaulting over a coffee table like a furry superhero, landing with a smug glance that says, "Nailed it!"</p>
  <p>A cat’s whiskers are not just for show—they’re precision tools, roughly as wide as the cat’s body, helping them gauge if they can squeeze through tight spaces. This explains why your cat insists on "fitting" into that tiny box, even if it’s mostly wishful thinking.</p>
  <p>Cats have a special vocal talent: the purr, which they use to express contentment, hunger, or even self-soothing. Each cat’s purr is as unique as a signature, a melodic hum that can charm treats out of even the toughest humans.</p>
</quiet-expander>
```

## Examples

### Expanded initially

Add the `expanded` attribute to expand the content by default.

```html {.example}
<quiet-expander expanded>
  <p>Cats possess an astonishing 230 bones in their bodies, compared to a human’s mere 206, granting them their signature slinky grace. Imagine them weaving through furniture like liquid fur, smirking at our clumsy two-legged attempts to keep up!</p>
  <p>When cats gather, it’s dubbed a "glaring," a term that perfectly captures their judgmental stares. Good luck convincing these furry monarchs to align for anything but a sunbeam or the faint crinkle of a treat bag.</p>
  <p>Each cat’s eyes are a cosmic masterpiece, with pupils that shift from slits to full moons, adapting to light with eerie precision. No two cats share the exact same iris patterns, making their gaze a one-of-a-kind spell that demands your undivided attention.</p>
</quiet-expander>
```

### Changing the height

You can change the height of the preview that shows when the expander is collapsed by setting the `--preview-height` custom property.

```html {.example}
<quiet-expander style="--preview-height: 6lh;">
  <p>Cats can hear ultrasonic sounds, picking up frequencies far beyond human ears, like secret whispers from another realm. Envision them tilting their heads, catching the faintest squeak of a toy or the distant rustle of a snack bag!</p>
  <p>A cluster of cats is playfully called a “cabal,” hinting at their mysterious, scheming nature. Try gathering these whiskered conspirators, and you’ll find they only unite for a fleeting moment—usually when a cardboard box begs to be claimed.</p>
  <p>Every cat’s coat is a unique tapestry, with patterns of tabby swirls, tortoiseshell patches, or sleek solids. This furry artwork is their personal signature, ensuring no two cats ever wear quite the same masterpiece!</p>
</quiet-expander>
```

### Customizing labels

To provide custom labels for the trigger, use the `expand-label` and `collapse-label` slots.

```html {.example}
<quiet-expander>
  <span slot="expand-label">Show me more</span>
  <span slot="collapse-label">Never mind</span>
  <p>Cats spend approximately 70% of their lives sleeping, which amounts to about 13-16 hours a day. Just imagine having that kind of schedule – sleeping two-thirds of your life away and still being considered a perfectly functional adult!</p>
  <p>A group of cats is called a "clowder," though most cat owners know that trying to organize multiple cats into any kind of group is nearly impossible. Cats are notorious individualists who come together only when the treats bag rustles.</p>
  <p>A cat's nose print is unique, just like a human's fingerprint. Each cat has its own distinct pattern of bumps and ridges on its nose, which could theoretically be used for identification – if cats would ever cooperate with being fingerprinted.</p>
</quiet-expander>
```

### Hiding the shadow

Add the `without-shadow` attribute to remove the shadow that appears above collapsed content.

```html {.example}
<quiet-expander without-shadow>
  <p>Cats can rotate their ears 180 degrees, tuning into the faintest sounds like furry satellite dishes. Imagine them eavesdropping on your whispers from across the room, plotting their next treat heist with a flick of their ears!</p>
  <p>A gathering of cats is whimsically called a "pounce," though herding these solo artists is like convincing stars to align. They’ll only unite for the irresistible jingle of a toy mouse or a freshly opened can of tuna.</p>
  <p>Every cat’s tongue is a tiny marvel, covered in spiky papillae that act like a built-in comb. This unique texture not only keeps their fur pristine but also makes each lick a one-of-a-kind grooming session, if only they’d share the spa secrets!</p>
</quiet-expander>
```

### Disabling

Add the `disabled` attribute to disable the expand/collapse functionality. When disabled, the expander can still be toggled programmatically.

```html {.example}
<quiet-expander disabled>
  <p>Cats boast a secret weapon: their retractable claws, which they keep sharp by sheathing them like tiny daggers. Picture them strutting past your couch, deciding whether to unleash their ninja skills or graciously spare your furniture today!</p>
  <p>A band of cats is charmingly termed a “clutter,” though corralling these furry rebels is a fool’s errand. They’ll only deign to assemble when the scent of catnip wafts through the air or a laser pointer dances into view.</p>
  <p>Each cat’s tail is a unique communicator, with patterns of stripes, swirls, or spots that rival a painter’s palette. This expressive appendage waves like a personalized flag, broadcasting moods—if only we could decode the full saga of every twitch!</p>
</quiet-expander>
```

### Styling expanders

You can customize the expander's appearance with CSS custom properties and parts.

```html {.example}
<quiet-expander id="expander__styling">
  <p>Cats have a remarkable sense of balance, thanks to their flexible spines and inner ear mechanisms. Imagine them tightrope-walking along a fence, flicking their tails like seasoned acrobats, completely unfazed by gravity’s pull!</p>
  <p>A group of cats is called a “colony,” though these independent souls rarely agree to collective plans. They might briefly unite for a sunny nap spot, but good luck getting them to share the prime real estate!</p>
  <p>Each cat’s paw pads are uniquely textured, acting like tiny shock absorbers for stealthy landings. These cushioned marvels are as individual as a signature, making every step a masterpiece of feline engineering.</p>
</quiet-expander>

<style>
  #expander__styling {
    --duration: 350ms;
    --easing: cubic-bezier(0.4, 0.0, 0.2, 1);

    &::part(trigger) {
      display: block;
      width: fit-content;
      margin: 1rem auto 0;
      padding: 0.5rem 1.25rem;
      background-color: #4a6cf7;
      color: white;
      border: none;
      border-radius: 9999px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    &::part(trigger):hover {
      background-color: #3a5ce5;
    }

    &::part(trigger):active {
      transform: translateY(1px);
    }

    &::part(trigger):focus-visible {
      outline-color: #4a6cf7;
    }
  }
</style>
```