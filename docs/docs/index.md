---
title: Installation
description: Start using Quiet with just a couple lines of code.
layout: docs
---

Quiet is an open source library for building modern user interfaces on the Web. Here's what's in the box and how you can start using it.

<ul class="features-grid">
  <li>
    <a class="stretch" href="/docs/using-components">
      <quiet-icon name="packages" style="color: #b394f4;"></quiet-icon><br>
      Dozens of high-quality, accessible, interoperable UI components
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/theming">
      <quiet-icon name="palette" style="color: #e98d61;"></quiet-icon><br>
      Modern theme with light and dark mode and 21 color presets
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/restyle">
      <quiet-icon name="seeding" style="color: #7db664;"></quiet-icon><br>
      Optional CSS reset for jump-starting new apps with consistent styles
    </a>
  </li>
  <li>
    <a class="stretch" href="/docs/localization">
      <quiet-icon name="language" style="color: #58acf2;"></quiet-icon><br>
      Localized components with translations in multiple languages
    </a>
  </li>  
</ul>

**There are two ways to install Quiet.** [Autoloading](#autoloading) is the fastest way to get started — just copy, paste, and start coding. Or you can [import components manually](#manually-importing) from npm or the CDN.

:::info
Quiet uses a handful of modern Web APIs that were recently added to some browsers. The most notable are [CSS nesting](https://caniuse.com/css-nesting), the [`color-mix()`](https://caniuse.com/?search=color-mix) function, the [`:has()`](https://caniuse.com/css-has) selector, and the [Popover API](https://caniuse.com/mdn-api_htmlelement_showpopover).

All of these features are part of [Baseline 2023–2024](https://web.dev/baseline), but please check your browser requirements to make sure this library is a good fit for your project.
:::

## Autoloading <quiet-badge variant="constructive" data-no-outline data-no-anchor>Recommended</quiet-badge>

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will automatically load components from the CDN as you add them to the DOM.

```html
<!-- Quiet theme + components -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>

<!-- Optional CSS reset -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

Now you can use any component in your HTML!

```html {.example .no-buttons .flex-row}
<quiet-button variant="primary">
  This is amazing
</quiet-button>
```

### Autoloader events

Custom elements are registered with JavaScript, so you might experience <abbr title="Flash of undefined custom elements">FOUCE</abbr> when the page first loads. You can [learn more about FOUCE](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) and various ways to deal with it on my blog.

As a convenience, Quiet's autoloader emits an event called `quiet-discovery-complete` when all elements on the page have been "discovered" and registered. This is useful if you want to show, for example, a loading indicator until all components are registered.

```js
document.addEventListener('quiet-discovery-complete', event => {
  // All custom elements have been registered!
}, { once: true });
```

You can inspect `event.detail.registered` to see an array of tag names that were found and registered. Similarly, `event.detail.unknown` will be an array of `<quiet-*>` tags that were found in the document but couldn't be registered. This can happen if you use the wrong tag name, if the files are missing, or if you're trying to use new components with an older version of the library.

---

## Manually importing <quiet-badge variant="destructive" data-no-outline data-no-anchor>Advanced</quiet-badge>

If you don't want to use the autoloader, you can import components manually from the CDN or from a local npm installation. For npm, use the following command to install Quiet.

```sh
npm install @quietui/quiet
```

First, add the [default theme](/docs/theming) and the [optional CSS reset](/docs/restyle).

```html
<!-- Quiet styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@quietui/quiet@1.0.0/dist/themes/quiet.css">

<!-- Optional CSS reset -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@quietui/quiet@1.0.0/dist/themes/restyle.css">
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
The imports above are just examples. You can copy and paste the import code for each component you need from the _Importing_ section of the docs.
:::

## Setting the library path

Quiet uses something called the _library path_ to load components and assets at runtime. It will try to guess the library path by looking for a script called `quiet.js` or `quiet.loader.js` on the page. If you're using the CDN or consuming the library in a similar way, you can probably skip this section.

**If you're using a bundler,** you will need to create a task that copies Quiet's `dist` folder into your project and set the library path to point to there.

You can set the library path by adding the `data-quiet` attribute to any element on the page.

```html
<html data-quiet="/path/to/quiet/dist">
```

Alternatively, you can set it programmatically using the `setLibraryPath()` function.

```js
import { setLibraryPath } from '/path/to/quiet.js';

setLibraryPath('/path/to/quiet/dist');
```

:::warn
If components or icons aren't loading, make sure you've copied the necessary files into your project and set the library path correctly!
:::
