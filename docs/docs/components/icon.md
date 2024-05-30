---
title: Icon
layout: component
---

Quiet includes hundreds of beautifully designed SVG icons from the popular [Tabler Icons](https://tabler.io/icons) library. In addition, it's flexible enough that you can [replace](#the-default-icon-library) or [supplement](#registering-icon-libraries) the default icon set.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="pencil"></quiet-icon>
  <quiet-icon name="settings"></quiet-icon>
  <quiet-icon name="trash"></quiet-icon>  
</div>
```

:::info
A common pitfall of this component is not [setting the library's path](/docs/#setting-the-library-path). It's easy to do and, if you're not using the CDN, some assets won't be able to load without it. If you're not seeing icons where they should be, this is probably why!
:::

## Examples

### Built-in icons

Quiet includes the popular [Tabler Icons](https://tabler.io/icons) icon library out of the box. Use the `name` attribute to specify which icon should be drawn.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="home"></quiet-icon>
  <quiet-icon name="bug"></quiet-icon>
  <quiet-icon name="bell"></quiet-icon>
  <quiet-icon name="microphone"></quiet-icon>
  <quiet-icon name="message"></quiet-icon>
</div>
```

:::info
For a list of all available icons, please refer to the [Tabler Icons](https://tabler.io/icons). Be careful to copy the _name_ of the icon, e.g. `arrow-up`, and not the SVG code!
:::

### Labeling icons

By default, icons are considered presentational elements. However, you can add the `label` attribute to any icon to make it available to assistive devices such as screen readers.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon label="Edit" name="pencil"></quiet-icon>
  <quiet-icon label="Settings" name="settings"></quiet-icon>
  <quiet-icon label="Delete" name="trash"></quiet-icon>  
</div>
```

### Changing the size

Icons are sized relative to the current font size. This allows you to place them into many contexts without having to explicitly size them. To change the size, set the `font-size` property on the icon or an ancestor element.

```html {.example}
<quiet-icon name="thumb-up" style="font-size: 1.5em;"></quiet-icon>
<quiet-icon name="thumb-up" style="font-size: 2em;"></quiet-icon>
<quiet-icon name="thumb-up" style="font-size: 2.5em;"></quiet-icon>
```

### Changing the stroke

You can change the thickness of the default icon library's icons by setting the `stroke-width` property on the icon. For best results, use a value between 1px and 2px at 0.25px intervals.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="cat" style="stroke-width: 1px;"></quiet-icon>
  <quiet-icon name="cat" style="stroke-width: 1.5px;"></quiet-icon>
  <quiet-icon name="cat" style="stroke-width: 2px;"></quiet-icon>
</div>
```

:::info
This will only work for SVG icons designed to have customizable strokes.
:::

### Changing the color

Icons inherit the current text color. To change it, set the `color` property on the icon or an ancestor element.

```html {.example}
<div style="font-size: 1.5rem;">
  <quiet-icon name="gift" style="color: royalblue;"></quiet-icon>
  <quiet-icon name="gift" style="color: deeppink;"></quiet-icon>
  <quiet-icon name="gift" style="color: forestgreen;"></quiet-icon>
</div>
```

## Registering icon libraries

You can register additional icon libraries using the `registerIconLibrary()` function. The example below has detailed comments explaining each step of the registration process, and additional examples can be found later in this section.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/quiet.js';

  // This registers a new icon library called "my-icons"
  registerIconLibrary('my-icons', {
    //
    // The resolve function is required. It must be a callback that 
    // accepts two string arguments: the name of the icon and an 
    // optional icon family (e.g. solid, outline). These values are 
    // passed through from: <quiet-icon name="..." family="...">
    //
    // The resolver must return a URL of an SVG located at a 
    // CORS-enabled endpoint. You can also return SVG data URIs.
    //
    resolve: (name, family) => {
      return `https://example.com/path/to/icons/${family}/${name}.svg`
    },
    //
    // The mutate function is optional. It must be a callback that 
    // accepts one argument, an `SVGElement`, you can use to modify 
    // the icon before it gets rendered.
    //
    // The mutator is handy when you're pulling in SVGs from, for 
    // example, a  CDN and you need to adjust the fill, stroke, and 
    // other properties.
    //
    mutate: svg =>  {
      svg.setAttribute('fill', 'currentColor');
    }
  });
</script>
```

It's fine to add icons to the page before registering an icon library. They just won't be fetched or rendered until registration.

You can unregister icon libraries using the `unregisterIconLibrary()` function. However, this will cause existing icons that reference the library to disappear. Unregistering can be useful when you no longer need to display icons from a specific library.

```js
import { unregisterIconLibrary } from '/dist/quiet.js';

unregisterIconLibrary('my-icons');
```

### Changing the default icon library

To change the default icon library, override it by registering a new one called `default`. This will let you skip setting `<quiet-icon library="...">` on every single icon. This is only recommended if you want to completely replace the default icon library.

```js
import { registerIconLibrary } from '/dist/quiet.js';

registerIconLibrary('default', {
  // ...
});
```

### Changing the system icon library

Quiet also has a system icon library that provides a small number of icons for internal use. These icons are served as base64-encoded data URIs, which allows them to load instantly and not require the [library path](/docs/#setting-the-library-path) to be set.

Changing the system library isn't recommended, but it is possible. To change the system icon library, override it by registering a new one called `system`.

```js
import { registerIconLibrary } from '/dist/quiet.js';

registerIconLibrary('system', {
  // ...
});
```

:::danger
If you choose to change the system library, you must reimplement _all_ of the system icons found in `src/utilities/icon-library.ts`. Otherwise, icons will be absent from the components that use them.
:::

### Bootstrap icons

This examples demonstrates how to load the [Bootstrap Icons](https://icons.getbootstrap.com/) library using the jsDelivr CDN. Available families include `regular` (default) and `filled`.

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/quiet.js';

  registerIconLibrary('bootstrap', {
    resolve: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`
    }
  });
</script>

<div style="font-size: 1.5em;">
  <quiet-icon library="bootstrap" name="house"></quiet-icon>
  <quiet-icon library="bootstrap" name="bug"></quiet-icon>
  <quiet-icon library="bootstrap" name="bell"></quiet-icon>
  <quiet-icon library="bootstrap" name="mic"></quiet-icon>
  <quiet-icon library="bootstrap" name="chat"></quiet-icon>

  <br>

  <quiet-icon library="bootstrap" family="filled" name="house"></quiet-icon>
  <quiet-icon library="bootstrap" family="filled" name="bug"></quiet-icon>
  <quiet-icon library="bootstrap" family="filled" name="bell"></quiet-icon>
  <quiet-icon library="bootstrap" family="filled" name="mic"></quiet-icon>
  <quiet-icon library="bootstrap" family="filled" name="chat"></quiet-icon>
</div>
```

### Boxicons

This example demonstrates how to load the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. Available families include `regular` (default), `solid`, and `logos`.

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/quiet.js';

  registerIconLibrary('boxicons', {
    resolve: (name, family = 'regular') => {
      const baseUrl = 'https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/';

      switch (family) {
        case 'solid':
          return `${baseUrl}solid/bxs-${name}.svg`;
        case 'logos':
          return `${baseUrl}logos/bxl-${name}.svg`;
        default:
          return `${baseUrl}regular/bx-${name}.svg`;
      }
    },
    mutate: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 1.5em;">
  <quiet-icon library="boxicons" name="home"></quiet-icon>
  <quiet-icon library="boxicons" name="bug"></quiet-icon>
  <quiet-icon library="boxicons" name="bell"></quiet-icon>
  <quiet-icon library="boxicons" name="microphone"></quiet-icon>
  <quiet-icon library="boxicons" name="chat"></quiet-icon>

  <br>

  <quiet-icon library="boxicons" family="solid" name="home"></quiet-icon>
  <quiet-icon library="boxicons" family="solid" name="bug"></quiet-icon>
  <quiet-icon library="boxicons" family="solid" name="bell"></quiet-icon>
  <quiet-icon library="boxicons" family="solid" name="microphone"></quiet-icon>
  <quiet-icon library="boxicons" family="solid" name="chat"></quiet-icon>
</div>
```

### Jam icons

This example demonstrates how to load the [Jam icons](https://jam-icons.com/) library using the jsDelivr CDN. Available families include `outline` (default) and `filled`.

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/quiet.js';

  registerIconLibrary('jam', {
    resolve: (name, family) => {
      const suffix = family === 'filled' ? '-f' : '';
      return `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}${suffix}.svg`;
    },
    mutate: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 1.5em;">
  <quiet-icon library="jam" name="home"></quiet-icon>
  <quiet-icon library="jam" name="bug"></quiet-icon>
  <quiet-icon library="jam" name="bell"></quiet-icon>
  <quiet-icon library="jam" name="mic"></quiet-icon>
  <quiet-icon library="jam" name="message-alt"></quiet-icon>

  <br>

  <quiet-icon library="jam" family="filled" name="home"></quiet-icon>
  <quiet-icon library="jam" family="filled" name="bug"></quiet-icon>
  <quiet-icon library="jam" family="filled" name="bell"></quiet-icon>
  <quiet-icon library="jam" family="filled" name="mic"></quiet-icon>
  <quiet-icon library="jam" family="filled" name="message-alt"></quiet-icon>
</div>
```

### Lucide icons

This example demonstrates how to load the [Lucide](https://lucide.dev/icons/) library using the jsDelivr CDN. Only one family is available from this set.

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/quiet.js';

  registerIconLibrary('lucide', {
    resolve: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/${name}.svg`
  });
</script>

<div style="font-size: 1.5em;">
  <quiet-icon library="lucide" name="home"></quiet-icon>
  <quiet-icon library="lucide" name="bug"></quiet-icon>
  <quiet-icon library="lucide" name="bell"></quiet-icon>
  <quiet-icon library="lucide" name="mic"></quiet-icon>
  <quiet-icon library="lucide" name="message-circle"></quiet-icon>
</div>
```
