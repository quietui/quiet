---
title: Using components
description: Quiet was built with platform APIs that allow its components to work everywhere.
layout: docs
---

Quiet includes a collection of [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), or custom HTML elements. They have attributes, properties, events, and methods, all of which are described in the documentation for each component.

Once installed, simply add the components you want to your HTML.

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

Most components have properties that can be set with attributes. For example, buttons have a `variant` attribute that let's you change the type of button that gets rendered.

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

### The `updateComplete` property

Components batch DOM updates for performance, so you might run into scenarios where you update a property but don't see the changes in the DOM right away. In this case, you can await the `updateComplete` property, which is available on every component.

Here's an example where we update a progress bar's value and inspect the corresponding attribute. Note how the attribute isn't updated until awaiting `updateComplete`.

```html
<quiet-progress value="0"></quiet-progress>

<script>
  const progress = document.querySelector('quiet-progress');
  progress.value = 100;

  // outputs "0"
  console.log(progress.getAttribute('value'));

  await progress.updateComplete;

  // outputs "100"
  console.log(progress.getAttribute('value'));
</script>
```

:::info
If you're updating multiple elements, you can safely use [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) instead of awaiting every individual component.
:::

## Slots

Many components accept content through [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot). Slots are a platform feature that work very similar to the slots you may have used in Vue. A custom element can have any number of slots.

The default slot is almost any content inside the component. In this example, we're slotting a text node into the button to serve as its label, but it could be an HTML element as well.

```html {.example .no-buttons}
<quiet-button>
  Like
</quiet-button>
```

However, some components also have _named slots_. To insert content into a named slot, add the `slot` attribute to any ==top-level child element== of the component. The position of the slotted content doesn't matter, as long as it's not nested within another element. The component will automatically render the slotted content in the correct location.

```html {.example .no-buttons}
<quiet-button>
  <quiet-icon slot="start" name="thumb-up"></quiet-icon>
  Like
</quiet-button>

<quiet-button>
  Like
  <quiet-icon slot="start" name="thumb-up"></quiet-icon>
</quiet-button>
```

You can insert more than one item into a named slot. For example, this card has a `footer` slot that houses two buttons. The text node remains in the default slot.

```html {.example .no-buttons}
<quiet-card with-footer style="max-width: 340px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  <quiet-button slot="footer" variant="primary">Primary</quiet-button>
  <quiet-button slot="footer">Secondary</quiet-button>
</quiet-card>
```

## Events

Many components emit custom events when certain things happen. For example, a [`<quiet-button>`](/docs/components/button) emits an event called `quiet-click` when the button is activated. You can listen for custom events the same way you listen for native events.

```html {.example .no-buttons}
<quiet-button id="click-me">Click me</quiet-button>

<script>
  const button = document.getElementById('click-me');

  button.addEventListener('quiet-click', event => {
    // The button has been clicked
    console.log(event);
  });
</script>
```

You can also listen to native events on custom elements. However, it's important to understand that native events occur _inside_ the component's shadow DOM and are [retargeted to the host](https://javascript.info/shadow-dom-events), so they might not work the exact way you expect. When available, it's always better to use a custom event instead of a native one.

:::warn
Event bubbling is a common pitfall. In the same way native HTML elements all dispatch a `click` event, Quiet components may dispatch custom events that aren't unique to the component. [Learn more about custom event bubbling.](https://www.abeautifulsite.net/posts/custom-event-names-and-the-bubbling-problem/)
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

Some components have methods you can call. To call a method, you'll first need to obtain a reference to the element. For example, you can programmatically set focus to a button by calling its `focus()` method. 

```js
const button = document.querySelector('quiet-button');

button.focus();
```

Not all components have methods. Those that do will be listed in the respective component's documentation.

## Styling custom elements

Custom elements commonly use a platform feature called [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) to encapsulate behaviors and styles. Their internals are rendered in a separate document fragment, which prevents most styles from leaking in from and out to the main document.

Speaking of internals…it's important to look at the documentation for each component to understand its anatomy before applying any CSS. The host element often requires styles to target a specific part inside of it rather than the element itself.

By design, some styles, such as font size and family, will inherit _through_ the shadow DOM. However, the majority of them do not. Thus, you cannot  use standard CSS selectors to target a custom element's internals. Instead, you need to use one of the following APIs.

:::warn
Please read this section thoroughly if you've never styled custom elements before. It's a common frustration because it involves CSS features you may not have used before.
:::

### CSS custom properties

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), often referred to as CSS variables, are unique in that their values _will inherit_ through the shadow root. Custom properties are typically used when a value needs to be reused more than once within the custom element, or when they map to a property that isn't necessarily intuitive.

For example, [`<quiet-spinner>`](/docs/components/spinner) renders an animated SVG in its shadow root. The color of the indicator is applied to a `<circle>` element within the SVG, but the implementation detail shouldn't matter to a user who just wants to make the spinner pink.

For this reason, this spinner exposes a custom property called `--indicator-color` that you can set to change the color. You can set a custom property just like any other CSS property.

```html {.example .no-buttons}
<quiet-spinner style="--indicator-color: deeppink;"></quiet-spinner>
```

You can also set custom properties inside a stylesheet or a `<style>` element.

```css
quiet-spinner {
  --indicator-color: deeppink;
}
```

:::info
Abstractions like this allow custom element authors to change or even replace a custom element's internals without modifying its public API. This means less breaking changes for you later on!
:::

Not all components expose custom properties. Refer to the documentation to see which custom properties a component has.

### CSS parts

Many components expose parts inside the shadow DOM that you can target with CSS. Unlike custom properties, which only affect individual styles, a part gives you complete control over the exposed element's styles.

Use the [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector to target a part in your CSS. This example applies a striped background image to the progress bar's indicator.

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

Another caveat of parts involves animation. When you target an element with `::part()`, you're changing styles inside the shadow DOM. However, animations require keyframes to exist in the same document, and it's not currently possible to define keyframes from outside the shadow DOM. You can, however, apply animations to the component itself.

Not all components expose parts. Refer to the documentation to see which parts a component has.

### Custom states

Some components have custom states, a newer API that let's you target a custom element when it's in a particular state, such as active or disabled.

[Toggle buttons](/docs/components/button/#toggle-buttons), for example, have a `toggled` state you can use to target buttons when they're activated. Try clicking the button below and observe its styles.

```html {.example .no-buttons}
<quiet-button id="toggle-button" toggle="off">Toggle me</quiet-button>

<style>
  #toggle-button:state(toggled) {
    outline: dashed 4px deeppink;
    outline-offset: 4px;
  }
</style>
```

Not all components have custom states. Refer to the documentation to see which custom states a component has.
