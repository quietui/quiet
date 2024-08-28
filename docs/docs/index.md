---
title: Installation
description: Start using Quiet with just a couple lines of code.
layout: docs
---

Quiet is a user interface library for the modern Web. It features dozens of accessible, performant, and interoperable components along with an optional CSS reset to streamline development of websites and apps.

You might be curious to learn that Quiet's components aren't built with React, Vue, or any other framework. They're custom HTML elements, or [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), which means you can use them in plain ol' HTML pages as well as your favorite frameworks.

<img class="whiskers only-light" src="/assets/images/whiskers/whiskers-happy-light.svg" alt="Whiskers the mouse standing and smiling">
<img class="whiskers only-dark" src="/assets/images/whiskers/whiskers-happy-dark.svg" alt="Whiskers the mouse standing and smiling">

Every modern browser has the APIs necessary to create interoperable components that work everywhere. As a result, it makes little sense to continue building UI components in a specific framework — that promotes lock-in. [Many of the world's largest companies](https://arewebcomponentsathingyet.com/) have been using Web Components in production applications for years.

With Quiet, you no longer need to learn a new UI library when you switch frameworks. And since it's built on top of stable platform APIs, it will continue to work for many years to come.

**There are two ways to install Quiet.** [Autoloading](#autoloading) is the fastest way to get started — just copy, paste, and start coding. Or you can [import components manually](#manually-importing) from npm or the CDN.

:::info
Quiet uses a handful of modern Web APIs that were recently added to certain browsers. The most notable ones are [CSS nesting](https://caniuse.com/css-nesting), the [`color-mix()`](https://caniuse.com/?search=color-mix) function, the [`:has()`](https://caniuse.com/css-has) selector, and the [Popover API](https://caniuse.com/mdn-api_htmlelement_showpopover).

All of these features are part of [Baseline 2023–2024](https://web.dev/baseline), but please check your browser requirements to make sure this library is a good fit for your project.
:::

---

## Autoloading <quiet-badge variant="constructive" data-no-outline data-no-anchor>Recommended</quiet-badge>

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will automatically load components from the CDN as you add them to the DOM.

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>
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
window.addEventListener('quiet-discovery-complete', event => {
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

setLibraryPath('/path/to/quiet');
```

:::warn
If you're not seeing components or icons load, make sure you've copied the necessary files into your project and set the library path correctly!
:::
