---
title: Card
layout: component
---

```html {.example}
<quiet-card with-media with-footer style="max-width: 340px;">
  <img slot="media" src="https://images.unsplash.com/photo-1515073883629-5e2924e3e106?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A tabby kitten sleeps next to a toy mouse.">

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  <quiet-button slot="footer" variant="primary">Primary action</quiet-button>
  <quiet-button slot="footer">Secondary</quiet-button>
</quiet-card>
```

## Examples

### Basic card

Card are really just styled containers. You can put almost anything in them.

```html {.example}
<quiet-card style="max-width: 340px;">
  <h3 style="font-size: 1.2rem;">Lorem ipsum</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <p style="margin-block-end: 0;">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</quiet-card>
```

:::info
Cards are styled to remove margins from the top of the first element and the bottom of the last element in their body. This prevents extra vertical space, which is seldom desirable.
:::

### With header

Apply the `with-header` attribute and place elements into the `header` slot to add a title and some actions at the start of the card.

```html {.example}
<quiet-card with-header style="max-width: 340px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-inline-end: auto; margin-block: 0;">Lorem ipsum</h3>
  <quiet-button slot="header" variant="text" icon-label="Settings">
    <quiet-icon name="cog-6-tooth"></quiet-icon>
  </quiet-button>
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</quiet-card>
```

### With footer

Apply the `with-footer` attribute and place elements into the `footer` slot to add actions or other supplemental information at the end of the card.

```html {.example}
<quiet-card with-footer style="max-width: 340px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  <quiet-button slot="footer" variant="primary">Primary action</quiet-button>
  <quiet-button slot="footer">Secondary</quiet-button>
</quiet-card>
```

### With media

Apply the `with-media` attribute and place an image or video into the `media` slot to add media at the beginning of the card. For consistency, you can set a custom height on the media and it will be cropped and resized as needed.

```html {.example}
<quiet-card with-media style="max-width: 340px;">
  <h3 slot="header" style="font-size: 1.125rem; margin-inline-end: auto; margin-block: 0;">Lorem ipsum</h3>
  <img slot="media" style="height: 200px;" src="https://images.unsplash.com/photo-1498336179775-9836baef8fdf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A fluffy kitten sprawls out on a red pillow with its eyes closed and paws in the air.">

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</quiet-card>

<quiet-card with-media style="max-width: 340px; margin-block-start: 2rem;">
  <iframe slot="media" height="200" src="https://www.youtube.com/embed/fOd16PT1S7A?si=EOT0GM82FbYsNSzj&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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