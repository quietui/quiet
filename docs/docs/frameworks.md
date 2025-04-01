---
title: Frameworks
description: How to get started with Quiet and your favorite framework.
layout: docs
---

<img class="whiskers-end" src="/assets/images/whiskers/with-skateboard.svg" alt="Whiskers the mouse skateboarding">

If you're using a framework, you shouldn't use the autoloader. Frameworks should typically be bundled to avoid timing issues with your app's lifecycle and autoloading.

Instead, install Quiet via npm and manually [import each component](/docs/#manually-importing) as shown in the examples below.

To install Quiet via npm, use the following command.

```sh
npm install @quietui/quiet
```

Next, load the default theme and the optional CSS reset. Depending on your framework, you might need to adjust the way these stylesheets are imported.

```html
<!-- Quiet theme -->
<link rel="stylesheet" href="@quietui/quiet/dist/themes/quiet.css">

<!-- Optional CSS reset -->
<link rel="stylesheet" href="@quietui/quiet/dist/themes/restyle.css">
```

If you're using icons or other assets, you will need to copy Quiet's `dist/assets` folder into your app and [configure the library path](/docs/#setting-the-library-path) for icons and other assets to work.

```js
import { setLibraryPath } from '@quietui/quiet';

setLibraryPath('/path/to/quiet/dist');
```

:::info
Since you're using npm instead of the autoloader, you only need to copy `dist/assets`. You can safely ignore all other files and folders in `dist`. However, make sure the library path points to `dist` and not `dist/assets`.
:::

Some frameworks require configuration for them to recognize custom elements. Look for your framework below for more details.

## Angular

Import Quiet components into the root app module and enable the custom elements schema as shown below.

```ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// Import one or more Quiet components here
import '@quietui/quiet/components/button/button.js';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  // ...
}
```

Now you can import Quiet components and use them in your Angular app like regular HTML elements.

## Vue

Configure Vue's compiler options to recognize Quiet components.

```ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Tell Vue that all <quiet-*> elements are custom elements
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('quiet-');

app.mount('#app');
```

Now you can import Quiet components and use them in your Vue app like regular HTML elements.

```html
<template>
  <quiet-button variant="primary">Click me</quiet-button>
</template>

<script>
import '@quietui/quiet/components/button/button.js';

export default {
  name: 'App',
  // ...
}
</script>
```

## Preact

Preact plays nicely with custom elements without additional configuration. Just import the component and use it like a regular HTML element.

```tsx
import { h } from 'preact';
import { useState } from 'preact/hooks';
import '@quietui/quiet/dist/components/button/button.js';

export function Component() {
  return (
    <quiet-button variant="primary">Click me</quiet-button>
  );
}
```

## SolidJS

SolidJS plays nicely with custom elements without additional configuration. Just import the component and use it like a regular HTML element.

```tsx
import '@quietui/quiet/components/button/button.js';

function App() {
  return (
    <quiet-button variant="primary">
      Click me
    </quiet-button>
  );
}

export default App;
```

## Svelte

Svelte plays nicely with custom elements without additional configuration. Just import the component and use it like a regular HTML element.

```html
<script>
  import '@quietui/quiet/components/button/button.js';
</script>

<quiet-button variant="primary">
  Click me
</quiet-button>
```

## React

React 18 and below is [harder to work](https://custom-elements-everywhere.com/#react) with because:

> React passes all data to Custom Elements in the form of HTML attributes. For primitive data this is fine, but the system breaks down when passing rich data, like objects or arrays. In these instances you end up with stringified values like `some-attr="[object Object]"` which can't actually be used.

React also struggles with native events:

> Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements without the use of a workaround. Developers will need to reference their Custom Elements using a ref and manually attach event listeners with addEventListener. This makes working with Custom Elements cumbersome.

While it's possible to use custom elements in React 18, the experience is less than optimal. The story is improving, however, as [React 19 has added full support for custom elements](https://react.dev/blog/2024/04/25/react-19#support-for-custom-elements).

Some custom element libraries provide wrappers to improve the experience in older versions of React, but supporting legacy frameworks isn't an objective of this project. If you need to use Quiet with React 18 or below, consider trying [this utility](https://www.npmjs.com/package/@lit-labs/react) for a more idiomatic experience.
