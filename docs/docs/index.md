---
title: Installation
description:
layout: docs
---

There are two ways to install Quiet.

## Autoloading

The autoloader is the recommended way to use Quiet. It will automatically register components as you add them to the DOM.

```html
<script src="/dist/quiet.loader.js" type="module"></script>
```

- how asset paths work and how to set them
- event: quiet-discovery-complete `{ detail: { registered: [], unknown: [] }`
- how to force discovery with `discoverElements()`

## Importing

If you don't want to use the autoloader, you can import components individually.

```html
TODO
```

## Setting the library path

TODO