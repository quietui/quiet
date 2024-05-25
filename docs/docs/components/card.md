---
title: Card
layout: component
---

```html {.example}
<quiet-card with-media with-footer style="max-width: 340px;">
  <img slot="media" src="https://images.unsplash.com/photo-1515073883629-5e2924e3e106?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A tabby kitten sleeps next to a toy mouse.">

  There's nothing more delightful than watching a curious kitten explore the world with big, innocent eyes and tiny, playful paws.

  <quiet-button slot="footer" variant="primary">I agree</quiet-button>
  <quiet-button slot="footer">Learn more</quiet-button>
</quiet-card>
```

## Examples

### Basic card

Cards are really just styled containers. You can put almost anything in them.

```html {.example}
<quiet-card style="max-width: 340px;">
  <h3 style="font-size: 1.2rem;">Cats are awesome</h3>
  <p>A cat is a bundle of energy, always ready for playtime and filled with amusing antics.</p>
  <p style="margin-block-end: 0;">The playful nature of a fun cat is contagious, as their curiosity and mischievous behavior make for endless entertainment and laughter.</p>
</quiet-card>
```

### With header

Add the `with-header` attribute and place elements into the `header` slot to add content at the start of the card. Enabling the header also enables the `actions` slot, which is a good place to put relevant icon buttons.

```html {.example}
<quiet-card with-header style="max-width: 340px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-block: 0;">Fact of the day</h3>
  <quiet-button slot="actions" variant="text" icon-label="Settings">
    <quiet-icon name="cog-6-tooth"></quiet-icon>
  </quiet-button>

  Playful cats thrive on interaction with their human companions, and their spirited nature can strengthen the bond between them, making for a loving and enriching relationship.
</quiet-card>
```

### With footer

Add the `with-footer` attribute and place elements into the `footer` slot to add actions or other supplemental information at the end of the card.

```html {.example}
<quiet-card with-footer style="max-width: 340px;">
  Playful cats are known for their lively and energetic nature, often engaging in interactive games and activities that stimulate their physical and mental well-being.

  <quiet-button slot="footer" variant="primary">Learn more</quiet-button>
  <quiet-button slot="footer">Continue reading</quiet-button>
</quiet-card>
```

### With media

Add the `with-media` attribute and place an image or video into the `media` slot to add media at the beginning of the card. For consistency, you can set a custom height on the media and it will be cropped and resized as needed.

```html {.example}
<quiet-card with-media style="max-width: 340px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-inline-end: auto; margin-block: 0;">Lorem ipsum</h3>
  <img slot="media" style="height: 200px;" src="https://images.unsplash.com/photo-1498336179775-9836baef8fdf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A fluffy kitten sprawls out on a red pillow with its eyes closed and paws in the air.">

  A young light gray medium-haired cat, with its soft fur and gentle paws, sprawls contentedly on a vibrant red pillow, basking in the warmth and comfort it provides.
</quiet-card>

<quiet-card with-media style="max-width: 340px; margin-block-start: 2rem;">
  <iframe slot="media" height="200" src="https://www.youtube.com/embed/fOd16PT1S7A?si=EOT0GM82FbYsNSzj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  Watching a cute cat video can instantly brighten your day, as you witness the playful antics and adorable expressions of these charming creatures, leaving you with a warm smile and a heart full of joy.
</quiet-card>
</div>
```

### Wrapping with a link

You can wrap links around cards to make the entire card clickable. You might need to add custom styles to prevent unwanted colors, underlines, and transitions from leaking into the card. Consider using styles that make it obvious to users that the card is clickable.

```html {.example}
<a 
  href="https://example.com/" 
  target="_blank" 
  style="display: inline-block; font: inherit; color: inherit; text-decoration: inherit;"
>
  <quiet-card style="max-width: 340px;">
    Clicking anywhere on this card will take you somewhere because it's surrounded by a link.
  </quiet-card>
</a>
```

:::info
If you wrap a card with a link, avoid nesting buttons, form controls, links, videos, and other interactive content inside of the card.
:::