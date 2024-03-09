---
title: Using Web Components
description: Quiet is built using platform APIs that allow components to work anywhere.
layout: docs
---

You might be curious to find that Quiet's components aren't built with React, Vue, or any other framework. They're custom HTML elements, or [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), which means you can use them in regular HTML pages as well as your favorite framework.

The Web platform has evolved a lot over the last few years! Every modern browser has the APIs necessary to create interoperable components that work everywhere. As a result, it makes little sense to continue building UI components in a specific framework — that creates lock-in.

[Many of the world's largest companies](https://arewebcomponentsathingyet.com/) are using Web Components in production applications.

With Quiet, you no longer need to learn or find a new UI library when you switch frameworks. Quiet is built on top of stable platform APIs, so it will continue to work for many, many years to come.

## Custom elements

Custom elements are just like native HTML elements. They have attributes, properties, events, and methods, all of which are described in the documentation for each component.

Once installed, simply add the tags you want to your HTML.

```html
<quiet-button>
  I'm a button
</quiet-button>
```

You can obtain references using `document.querySelector()` and `document.getElementById()` just like a native element.

```js
const button = document.querySelector('quiet-button');
```

:::info
Some HTML elements, such as `<img>`, are [void elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element), meaning you can omit their closing tag. Custom elements cannot be void elements, so make sure you always close their tags!
:::


## Attributes & properties

Most components have properties that can be set with attributes. For example, button's have a `variant` attribute that let's you change the type of button that gets rendered.

```html {.example .no-buttons}
<quiet-button variant="primary">Primary</quiet-button>
<quiet-button variant="destructive">Destructive</quiet-button>
```

Some properties are Boolean, meaning they only accept true or false values. Boolean properties are false when the attribute is absent and true when the attribute is present. For example, you can disable a button by adding the `disabled` attribute. To enable the button later on, remove the `disabled` attribute.

```html {.example .no-buttons}
<quiet-button disabled>
  Disabled
</quiet-button>
```

:::info
Some attributes will _reflect_, or be added/removed automatically, when setting the property via JavaScript. You can determine if an attribute reflects by looking at the properties table in the component's documentation.
:::

## Slots

Many components accepts content through slots. Slots are a platform feature that work very similar to the slots you may have used in Vue. A custom element can have any number of slots.

The default slot is almost any content inside the component. In this example, we're slotting a text node into the button to serve as its label.

```html {.example .no-buttons}
<quiet-button>
  Like
</quiet-button>
```

However, some components also have _named slots_. To insert content into a named slot, use the `slot` attribute. The position of the slotted content doesn't matter, as long as it's a top-level child of the host element. The component will automatically render the slotted content in the correct location.

```html {.example .no-buttons}
<quiet-button>
  <quiet-icon slot="start" name="hand-thumb-up"></quiet-icon>
  Like
</quiet-button>

<quiet-button>
  Like
  <quiet-icon slot="start" name="hand-thumb-up"></quiet-icon>
</quiet-button>
```

You can insert more than one item into a named slot. This card has a `footer` slot that houses two buttons. The text node remains in the default slot.

```html {.example .no-buttons}
<quiet-card with-footer style="max-width: 340px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  <quiet-button slot="footer" variant="primary">Primary</quiet-button>
  <quiet-button slot="footer">Secondary</quiet-button>
</quiet-card>
```

Refer to the documentation to see which slots are available for each component.

## Events

Many components emit [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) when certain things happen. For example, a [`<quiet-button>`](/docs/components/button) emits an event called `quiet-click` when the button is activated. You can listen for custom events the same way you listen for native events.

```html {.example .no-buttons}
<quiet-button id="click-me">Click me</quiet-button>

<script>
  const button = document.getElementById('click-me');

  button.addEventListener('quiet-click', event => {
    // The button has been clicked
  });
</script>
```

You can also listen to native events on custom elements. However, it's important to understand that native events occur inside the shadow DOM and are [retargeted from the host](https://javascript.info/shadow-dom-events), so they might not work the exact way you expect.

When available, it's always better to use a custom event instead of a native one. Refer to the documentation to see which events a component emits.

:::danger
Event bubbling is a common pitfall. In the same way native HTML elements all dispatch a `click` event, Quiet components often dispatch custom events that aren't unique to the component. [Learn more about custom event bubbling.](https://www.abeautifulsite.net/posts/custom-event-names-and-the-bubbling-problem/)
:::

Some custom events contain a `detail` property with additional information. You can access this information through the `detail` property of the event.

```js
window.addEventListener('quiet-discovery-complete', event => {
  console.log(event.detail);
  // result { registered: [], unknown: [] }
});
```

The information contained in an event's `detail` property is described in the respective component's documentation.

## Methods

Some components have methods you can all. For example, you can programmatically set focus to a button by calling its `focus()` method.

```js
const button = document.querySelector('quiet-button');

button.focus();
```

Not all components have methods. Those that do will be listed in the respective component's documentation.

## Styling custom elements

Custom elements commonly use a platform feature called [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) to encapsulate behaviors and styles. Their internals are rendered in a separate document fragment, which prevents most styles from leaking in from and out to the main document.

By design, some styles, such as font size and family, will inherit _through_ the shadow DOM. However, the majority of them do not. Thus, you cannot use standard CSS selectors to target a custom element's internals. Instead, you need to use one of the following APIs.

:::danger
Please read this section thoroughly if you've never styled custom elements before. It's a common frustration because it involves CSS features you may not have used before.
:::

### CSS custom properties

CSS custom properties, often referred to as CSS variables, are unique in that their values _will inherit_ through the shadow root. Custom properties are typically used when a value needs to be reused more than once within the custom element, or when they map to a property that isn't necessarily intuitive.

For example, [`<quiet-spinner>`](/docs/components/spinner) renders an animated SVG in its shadow root. The color of the indicator is applied to a `<circle>` element within the SVG, but the implementation detail shouldn't matter to a user who just wants to make the spinner pink.

:::info
Abstractions like this allow custom element authors to change or even replace a custom element's internals without modifying its public API. This means less breaking changes for you later on!
:::

For this reason, this spinner exposes a custom property called `--color` that you can set to change the color. You can set a custom property just like any other CSS property.

```html {.example .no-buttons}
<quiet-spinner style="--color: deeppink;"></quiet-spinner>
```

You can also set custom properties inside a stylesheet or a `<style>` element.

```css
quiet-spinner {
  --color: deeppink;
}
```

Not all components expose custom properties. Refer to the documentation to see which custom properties a component has.

### CSS parts

Many components expose parts you can target with CSS. Unlike custom properties, which only affect individual styles, a part gives you complete control over the exposed element.

Use the [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector to target a specific part in your CSS. This example applies a striped background image to the progress bar's indicator.

```html {.example .no-buttons}
<quiet-progress id="custom-progress-bg" label="Progress" value="50"></quiet-progress>

<style>
  #custom-progress-bg::part(indicator) {
    background-image: linear-gradient(-45deg, #fff3 25%, transparent 25%, transparent 50%, #fff3 50%, #fff3 75%, transparent 75%, transparent);
  }
</style>
```

One caveat of parts is you can't select children, siblings, or structural pseudo elements of a part such as `:first-child`, `:last-child`, `:first-of-type`, etc. This would break the principal of encapsulation and it tends to be a source of frustration for users.

You can, however, select non-structural pseudo elements such as `::before` and `::after`, as well as pseudo classes like `:hover`, `:active`, `:focus`. If you're on a device that support hovering, hover over the indicator and observe the background color change.

```html {.example .no-buttons}
<quiet-progress id="custom-progress-hv" label="Progress" value="50"></quiet-progress>

<style>
  #custom-progress-hv::part(indicator):hover {
    background-color: deeppink;
  }
</style>
```

Not all components expose parts. Refer to the documentation to see which parts a component has.

### Custom states

Some components expose custom states, a newer API that let's you target a custom element when it's in a particular state. This feature [hasn't landed in all browsers yet](https://caniuse.com/mdn-api_customstateset), but we can use it today thanks to Quiet's `data-state-` fallback method.

Toggle buttons, for example, have a `toggled` state you can use to target buttons when they're activated. Try clicking the button below and observe its styles.

```html {.example .no-buttons}
<quiet-button id="toggle-button" toggle="off">Toggle me</quiet-button>

<style>
  #toggle-button[data-state-toggled] {
    outline: dashed 4px deeppink;
    outline-offset: 4px;
  }
</style>
```

Note the `data-state-toggled` attribute in the code. In the near future, browsers will support the following CSS to target a custom state called `toggled`. However, at the moment, it's recommended to use the `data-state-` attribute fallbacks shown in the docs.

```css
/* Future syntax */
#toggle-button:state(toggled) {
  /* ... */
}
```

Not all components expose custom states. Refer to the documentation to see which custom states a component has.
