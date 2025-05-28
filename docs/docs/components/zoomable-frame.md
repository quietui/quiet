---
title: Zoomable Frame
layout: component
---

```html {.example}
<quiet-zoomable-frame src="https://quietui.org/" zoom="0.5">
</quiet-zoomable-frame>
```

## Examples

### Providing content

Use the `src` attribute to load content from a URL. This is useful for embedding external websites or resources. Ensure the URL is accessible and, if cross-origin, be aware that access to the iframe’s `document` or `window` may be restricted due to the Same-Origin Policy.

```html
<quiet-zoomable-frame src="https://example.com/">
</quiet-zoomable-frame>
```

By default, the zoomable frame spans 100% of the width and uses a 16/9 aspect ratio. You can adjust this using the `aspect-ratio` CSS property.

```html
<quiet-zoomable-frame src="https://example.com/" style="aspect-ratio: 4/3;">
</quiet-zoomable-frame>
```

Use the `srcdoc` attribute or property to render inline HTML content directly within the iframe. This is ideal for displaying custom HTML without needing an external resource.

```html
<quiet-zoomable-frame srcdoc="<html><body><h1>Hello, World!</h1><p>This is inline content.</p></body></html>">
</quiet-zoomable-frame>
```

:::info
If both `src` and `srcdoc` are provided, `srcdoc` takes precedence.
:::

### Zooming

Set the `zoom` attribute to change the frame's zoom level. A value of `1` means 100%, a value of `2` means 200%, etc. Use the `zoom-levels` attribute to define specific zoom steps that users can navigate through with the zoom controls. You can specify levels as percentages or decimal values, or a mix of both.

```html {.example}
<quiet-zoomable-frame 
  src="https://quietui.org/" 
  zoom="0.75"
  zoom-levels="50% 75% 100%"
>
</quiet-zoomable-frame>
```

### Removing zoom controls

Add the `without-controls` attribute to remove the zoom controls from the frame.

```html {.example}
<quiet-zoomable-frame 
  src="https://quietui.org/"
  without-controls 
  zoom="0.5"
>
</quiet-zoomable-frame>
```

### Disabling interactions

To make the frame inert, add the `without-interaction` attribute. Users won't be able to scroll or tab into the frame when this is applied.

```html {.example}
<quiet-zoomable-frame
  src="https://quietui.org/"
  zoom="0.5" 
  without-interaction
>
</quiet-zoomable-frame>
```

### Browser frame example

Zoomable frames work really well with [browser frames](/docs/components/browser-frame).

```html {.example}
<quiet-browser-frame label="Quiet UI" style="--body-padding: 0;">
  <quiet-zoomable-frame src="https://quietui.org/" zoom="0.5">
  </quiet-zoomable-frame>
</quiet-browser-frame>
```