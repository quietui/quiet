---
title: Installation
description: Start using Quiet with just a couple lines of code.
layout: docs
---

Quiet is an [open source](/support) UI library for building modern user interfaces on the Web. It features {{ components.length }} high-quality, accessible,  interoperable [components](/components), a [modern theme](/docs/theming) with light and darks modes that can adapt to any brand, an optional [CSS reset](/docs/restyle), and more!

**There are two ways to install Quiet components.** [Autoloading](#autoloading) is the fastest way to get started — just copy, paste, and start coding. Or you can [import components manually](#manually-importing) from npm or the CDN.

:::info
Quiet uses modern Web APIs such as [CSS nesting](https://caniuse.com/css-nesting), the [`color-mix()`](https://caniuse.com/?search=color-mix) function, the [`:has()`](https://caniuse.com/css-has) selector, and the [Popover API](https://caniuse.com/mdn-api_htmlelement_showpopover).

All of these features are part of [Baseline 2023–2024](https://web.dev/baseline), but please check your browser requirements to make sure this library is a good fit for your project.
:::

## Autoloading <quiet-badge variant="constructive" data-no-outline data-no-anchor>Recommended</quiet-badge>

Copy and paste the following code into the `<head>` section of any HTML document. The autoloader will fetch components from the CDN as you add them to the DOM.

```html
<!-- Quiet theme + autoloader -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">
<script type="module" src="{% cdnUrl '/dist/quiet.loader.js' %}"></script>

<!-- Optional CSS reset -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

Now you can use [any component](/components) in your HTML!

```html {.example .no-buttons .flex-row}
<quiet-button variant="primary">
  This is amazing
</quiet-button>
```

### Discovery complete

As a convenience, Quiet's autoloader emits an event called `quiet-discovery-complete` when all elements on the page have been "discovered" and registered. This is useful if you want to show, for example, a loading indicator until all components are registered.

```js
document.addEventListener('quiet-discovery-complete', event => {
  // All custom elements have been registered!
}, { once: true });
```

You can inspect `event.detail.registered` to see an array of tag names that were found and registered. Similarly, `event.detail.unknown` will be an array of `<quiet-*>` tags that were found in the document but couldn't be registered. This can happen if you use the wrong tag name, if the files are missing, or if you're trying to use new components with an older version of the library.

### Reducing FOUCE

Custom elements are registered with JavaScript, so you might experience [FOUCE](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) on page load as the autoloader fetches components.

To reduce FOUCE, add the `quiet-cloak` class to the `<html>` element as shown below. Avoid adding the class with JavaScript — it needs to be present when the browser first renders the page to work properly.

```html
<html class="quiet-cloak">
  ...
</html>
```

As soon as all components are defined or after two seconds elapse, the content will be shown and the class will be removed, eliminating most FOUCE. The two second timeout ensures users don't see a blank page even when networks are slow or have problems.

:::details Hotwire: Turbo users

Many multi-page applications (MPAs) use [Hotwire: Turbo](https://turbo.hotwired.dev/) to provide a SPA-like experience for users. When visiting links, Turbo intercepts the click, fetches the new page, and updates metadata and content without redirecting, resulting in a buttery smooth transition when going from one page to another.

However, when you use Turbo with Quiet's autoloader, you may see FOUCE when visiting new pages for the first time. This is because Turbo renders the new page and _then_ the autoloader fetches unregistered components.

To solve that, call the `preventTurboFouce()` function in your app. The function adds a listener that hooks into Turbo's `turbo:before-render` event and registers all components before the new page is rendered, effectively eliminating FOUCE for page-to-page navigation.

The function accepts one argument: an optional timeout in milliseconds to prevent issues with errors or slow networks. For most use cases, the default value of `2000` is optimal.

```js
import { preventTurboFouce } from '/dist/quiet.js';

preventTurboFouce();
```

:::

### Preloading components

You can tell the autoloader to preload components that aren't initially on the page by adding the `data-quiet-preload` attribute anywhere in the document. Tags must be separated by a space, as shown below. A good practice is to add it to the `<html>` element.

```html
<!-- 
  This will load <quiet-button> and <quiet-tooltip> 
  even if they're not on the page at first
-->
<html data-quiet-preload="quiet-button quiet-tooltip">
  ...
</html>
```

## Manually importing <quiet-badge variant="destructive" data-no-outline data-no-anchor>Advanced</quiet-badge>

If you don't want to use the autoloader, you can import components manually from npm or from the CDN. Quiet provides two npm packages to pick from, depending on how you want to use it.

- [`@quietui/quiet`](https://www.npmjs.com/package/@quietui/quiet) - use this if you're using a bundler or a framework
- [`@quietui/quiet-browser`](https://www.npmjs.com/package/@quietui/quiet-browser) - use this if you're using Quiet directly in a browser or serving it via CDN

The following commands will install Quiet via npm.

```sh
# Use this for bundlers and frameworks
npm install @quietui/quiet

# Use this for browsers and CDNs
npm install @quietui/quiet-browser
```

:::details What's the difference?
The `@quietui/quiet` package contains [bare module specifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_as_bare_names), allowing bundlers to deduplicate dependencies for a more efficient bundle. This means dependencies are excluded from the distribution and must be resolved at build time.

The `@quietui/quiet-browser` package contains all dependencies baked in, meaning it works directly in the browser and CDNs with no bundling necessary. However, this means bundlers can't deduplicate dependencies.
:::

Add the [default theme](/docs/theming) and the [optional CSS reset](/docs/restyle). You may need to configure your app to serve Quiet from a path of your choice.

```html
<!-- Quiet styles -->
<link rel="stylesheet" href="/path/to/quiet/themes/quiet.css">

<!-- Optional CSS reset -->
<link rel="stylesheet" href="/path/to/quiet/themes/restyle.css">
```

Quiet ships standard ES modules, so you can use [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) or [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) to pull in exactly the components and utilities you need.

```js
// Static imports are the most common
import '@quietui/quiet/components/badge/badge.js';
import '@quietui/quiet/components/button/button.js';
import '@quietui/quiet/components/card/card.js';

// ...but you can also import components dynamically
await Promise.all([
  import '@quietui/quiet/components/badge/badge.js',
  import '@quietui/quiet/components/button/button.js',
  import '@quietui/quiet/components/card/card.js'
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

<img class="whiskers-center" src="/assets/images/whiskers/with-book.svg" alt="Whiskers the mouse holding a book">
