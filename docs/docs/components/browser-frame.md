---
title: Browser Frame
layout: component
---

```html {.example}
<quiet-browser-frame href="https://quietui.org/" target="_blank">
  <img slot="icon" src="/assets/images/logo-light.svg" alt="" style="align-self: end;">
  <quiet-empty-state>
    <quiet-icon slot="illustration" name="cheese"></quiet-icon>
    Who moved my cheese?
  </quiet-empty-state>
</quiet-browser-frame>
```

## Examples

### Showing the address bar

Use the `label` attribute to show text in the address bar.

```html {.example}
<quiet-browser-frame label="Sleepy cat facts" style="--body-padding: 4rem 1rem; text-align: center;">
  Cats sleep for around 70% of their lives.
</quiet-browser-frame>
```

### Showing an icon

To show an icon or favicon in the address bar, use the `icon` slot.

```html {.example}
<quiet-browser-frame label="Secure" style="--body-padding: 4rem 1rem; text-align: center;">
  <quiet-icon slot="icon" name="lock"></quiet-icon>
  A group of cats is called a <em>clowder</em>.
</quiet-browser-frame>
```

### Providing a link

Use the `href` attribute to make the address bar a link. You can also use the `target`, `rel`, and `download` attributes for links.

When `label` is used, it will be shown as-is in the address bar. Otherwise, a simplified domain will be shown based on the value provided in `href`.

```html {.example}
<quiet-browser-frame
  href="https://quietui.org/docs"
  label="quietui.org"
  target="_blank"
  rel="noreferrer noopener"
  style="--body-padding: 4rem 1rem; text-align: center;"
>
  The browser frame will open the linked URL when clicked.
</quiet-browser-frame>
```

### Selecting the platform

The browser frame will automatically adapt to the user's platform (Windows or Mac/*nix). To show a specific one, set the `platform` attribute to `mac` or `windows`.

```html {.example .flex-row}
<quiet-browser-frame 
  label="Mac" 
  platform="mac"
  style="--body-padding: 2rem 1rem; width: 300px; text-align: center;"
>
  I'm a Mac
</quiet-browser-frame>

<quiet-browser-frame 
  label="Windows" 
  platform="windows"
  style="--body-padding: 2rem 1rem; width: 300px; text-align: center;"
>
  And I'm a PC
</quiet-browser-frame>
```

### Embedding content

The browser frame works well for embedding content like iframes, images, and other components to simulate how they would appear in a browser. Use the `flush` attribute to remove padding from within the body, which is useful for embedding edge-to-edge content.

```html {.example}
<quiet-browser-frame label="unsplash.com/photos/cat" flush>
  <img
    alt="A gray tabby kitten meows"
    src="https://images.unsplash.com/photo-1600440090763-b942f3c562b6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  >
</quiet-browser-frame>
```

You can also embed videos.

```html {.example}
<quiet-browser-frame label="youtube.com" flush>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=vN-Q9GI9UK5jH6f6" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen
  ></iframe>
</quiet-browser-frame>
```

### Theming

Browser frames automatically adapt to light and dark mode. To force a specific color scheme, add `class="quiet-light"` or `class="quiet-dark"`.

```html {.example .flex-row}
<quiet-browser-frame 
  class="quiet-light" 
  label="example.com" 
  style="--body-padding: 2rem 1rem; width: 300px; text-align: center;"
>
  This is the light theme
</quiet-browser-frame>

<quiet-browser-frame 
  class="quiet-dark" 
  label="example.com" 
  style="--body-padding: 2rem 1rem; width: 300px; text-align: center;"
>
  This is the dark theme
</quiet-browser-frame>
```

### Scrolling

Set a `max-height` on the component. Content will scroll within the body when it overflows.

```html {.example}
<quiet-browser-frame label="example.com" style="max-height: 250px;">
  <p>Cats, with their graceful movements and independent personalities, have been companions to humans for millennia. Their hunting prowess, keen senses, and remarkable agility make them both effective predators and beloved pets. With their soft fur and mesmerizing eyes, cats have an undeniable aesthetic appeal that draws people to them.</p>
  <p>Though often seen as aloof, cats form meaningful bonds with their humans, communicating through various vocalizations and body language. Their playful nature and comfort-seeking behaviors bring warmth to the households they share. From their quiet purrs to their spirited pounces, cats express themselves in ways that captivate their human companions.</p>
  <p>Whether they're exploring high perches, napping in sunbeams, or stalking imaginary prey, cats live according to their own mysterious agenda. This independence, combined with moments of affection on their terms, creates a unique relationship between cats and humans that has endured throughout history. Their curious nature and territorial instincts make them fascinating creatures to observe and interact with daily.</p>
</quiet-browser-frame>
```

### Custom styling

You can customize the appearance of the browser frame using CSS custom properties and CSS parts.

```html {.example}
<quiet-browser-frame
  id="browser__styling"
  label="example.com"
  platform="windows"
>
  <quiet-icon slot="icon" name="sparkles"></quiet-icon>
  This frame has custom styling with a violet theme.
</quiet-browser-frame>

<style>
  #browser__styling {
    --border-color: #d8d9ff;
    --body-padding: 4rem 1rem;
    --header-background-color: #989cff;
    --address-background-color: #7a7dff;
    --address-color: white;
    --windows-control-color: white;

    color: #4f51a8;
    text-align: center;
    background-color: #f5f5ff;
    border-width: 0;

  &::part(address-bar) {
    font-weight: var(--quiet-font-weight-semibold);
  }
} 
</style>
```