---
title: Installation
description: Learn how to install the library.
layout: docs
---

There are two ways to install Quiet. Autoloading is the easiest way to get started using components. However, you can also import them manually from the CDN or using a bundler.

## Autoloading <quiet-badge variant="constructive" data-no-outline data-no-anchor>Recommended</quiet-badge>

The autoloader will automatically register components as you add them to the DOM. Just place the following code into the `<head>` section of an HTML document and you can use all of Quiet's components via CDN without any further effort.

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/quiet.css' %}">
<script src="{% cdnUrl '/dist/quiet.loader.js' %}" type="module"></script>
```

Now you can use any component in your HTML!

```html {.example .no-buttons}
<quiet-button variant="primary">
  Click me
</quiet-button>
```

:::info
Quiet components are [custom HTML elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). They're built with platform APIs, so you can use them anywhere — even in your favorite framework!
:::

### Discovery complete

Custom elements are registered with JavaScript, so you might experience <abbr title="Flash of undefined custom elements">FOUCE</abbr> when the page first loads. You can [learn more about FOUCE](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) and various ways to deal with it on my blog.

As a convenience, Quiet's autoloader emits an event called `quiet-discovery-complete` when all elements on the page have been "discovered" and registered. This is useful if you want to show, for example, a loading indicator until all components are registered.

```js
window.addEventListener('quiet-discovery-complete', event => {
  // All custom elements have been registered!
}, { once: true });
```

You can inspect `event.detail.registered` to see an array of tag names that were found and registered. Similarly, `event.detail.unknown` will be an array of `<quiet-*>` tags that were found in the document but couldn't be registered. This can happen if you use the wrong tag name, if the files are missing, or if you're trying to use new components with an older version of the library.

### Awaiting discovery

The autoloader will automatically discover and register elements you add to the document after the page loads. If necessary, you can force discovery and await registration with the `discoverElements()` function.

```js
import { discoverElements } from '/dist/quiet.js';

// Add components to the DOM here

await discoverElements();

// All custom elements have been registered!
```

## Manually importing <quiet-badge variant="destructive" data-no-outline data-no-anchor>Advanced</quiet-badge>

If you don't want to use the autoloader, you can import components manually from the CDN or from a local npm installation. For npm, use the following command to install Quiet.

```sh
npm install @quietui/quiet
```


Quiet ships standard ES modules, so you can use [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) or [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) to pull in exactly the components and utilities you need.

```js
// Static imports are the most common
import '/dist/components/badge/badge.js';
import '/dist/components/button/button.js';
import '/dist/components/card/card.js';

// ...but you can also import components dynamically
await Promise.all([
  import '/dist/components/badge/badge.js',
  import '/dist/components/button/button.js',
  import '/dist/components/card/card.js'
]);
```

:::info
You can copy and paste the code to import a component from the _Importing_ section of its documentation.
:::

## Setting the library path

Quiet uses something called the _library path_ to load components and assets at runtime. It will try to guess the library path by looking for a script called `quiet.js` or `quiet.loader.js` on the page. If you're using the CDN or consuming the library in a similar way, you can skip this section.

**If you're using a bundler,** you will need to create a task that copies Quiet's `dist` folder into your project and set the library path to point to there.

You can set the library path by adding the `data-quiet` attribute to any element on the page.

```html
<html data-quiet="/path/to/quiet/dist">
```

Alternatively, you can set it programmatically using the `setLibraryPath()` function.

```js
import { setLibraryPath } from '/path/to/quiet.js';

setLibraryPath('/path/to/quiet');
```

:::danger
If you're not seeing components or icons load, make sure you've copied the necessary files into your project and set the library path correctly!
:::
