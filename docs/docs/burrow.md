---
title: Quiet Burrow
description: A mouse-sized library for building reactive islands in your web applications.
layout: docs
---

[experimental]

:::details 🚧 TODO

- Move Burrow files to separate package `@quietui/burrow`
- Export Burrow from `@quietui/quiet` so lit-html is shared in the browser version

:::

Quiet Burrow™ is a tiny reactive library that lets you add interactivity to specific parts of the page without taking over the entire DOM. It's completely optional and works well with HTML, Quiet components, and other web component libraries.

Think of a _burrow_ as an interactive "island" that lives in your static page. Create templates with a familiar declarative syntax, add state, and respond to events just like you would in a framework…and do it with just a few lines of code!

Here's an obligatory counter example.

```html {.example .open .no-edit}
<!-- Host -->
<div id="counter"></div>

<!-- Burrow -->
<script type="module">
  import { burrow, state, html } from '/dist/burrow.js';
  
  const data = state({ 
    count: 0 
  });
  
  burrow('counter', () => html`
    <button @click=${() => data.count++}>
      Clicks: ${data.count}
    </button>
  `);
</script>
```

Many applications use expensive frameworks to control the entire DOM when they only need interactivity in specific places. Burrow embraces the _islands architecture_ ideology and lets you start with static content and add reactivity only where you need it.

## Installation

Burrow can be installed via CDN or npm. Use these copy-and-paste examples to get started.

<quiet-tab-list class="import-tabs" label="How would you like to use Burrow?">
<quiet-tab panel="cdn">CDN</quiet-tab>
<quiet-tab panel="npm">npm</quiet-tab>

<quiet-tab-panel name="cdn">

```ts
import { burrow, state, html } from '{% cdnUrl '/dist/burrow.js' %}';

const data = state({
  // Add state here
});

burrow('ELEMENT_ID_HERE', () => html`
  <p>Your template here</p>
`);
```

</quiet-tab-panel>

<quiet-tab-panel name="npm">

```ts
import { burrow, state, html } from '@quietui/quiet/burrow.js';

const data = state({
  // Add state here
});

burrow('ELEMENT_ID_HERE', () => html`
  <p>Your template here</p>
`);
```

</quiet-tab-panel>
</quiet-tab-list>

## Creating your first burrow

Every burrow needs a _host_ element, which is where it will be attached. The host can be just about any HTML element on the page. This example creates a burrow and attaches it to the `#greeting` element. All it does at the moment is render a paragraph.

```html
<!-- Host -->
<div id="greeting"></div>

<!-- Burrow -->
<script type="module">
  import { burrow, html } from '/dist/burrow.js';
  
  burrow('greeting', () => html`
    <p>Hello, world!</p>
  `);
</script>
```

Now let's add a text field that controls who we're greeting. We'll store the value in a state object so the DOM will automatically update when it gets modified. Inside the template, we'll use `@input` to respond to the `input` event when the user types something.

```html {.example .open .no-edit}
<!-- Host -->
<div id="greeting"></div>

<!-- Burrow -->
<script type="module">
  import { burrow, html, state } from '/dist/burrow.js';
  
  // Create a state object
  const data = state({ 
    name: 'world' 
  });
  
  // Render a text field, bind it to state, and update 
  // it when the `input` event fires
  burrow('greeting', () => html`
    <input 
      type="text" 
      placeholder="Enter your name"
      .value=${data.name}
      @input=${(e) => data.name = e.target.value}
    />
    <br>
    <p>Hello, ${data.name}!</p>
  `);
</script>
```

:::info
Note that we're using `.value` to bind to the text field's value _property_ instead of its _attribute_. This will be discussed more later on.
:::

## Authoring templates

Burrow uses [lit-html](https://lit.dev/docs/libraries/standalone-templates/) under the hood, which gives you a powerful and efficient templating system. Templates are written using tagged template literals with the `html` tag.

### Template syntax

The basic syntax for creating a template is straightforward. Just wrap your HTML in backticks and prefix it with `html`.

```javascript
import { html } from '/dist/burrow.js';

const template = html`
  <div class="card">
    <h2>Title</h2>
    <p>Content goes here</p>
  </div>
`;
```

You can interpolate values anywhere in your template using `${expression}`.

```javascript
const name = 'Alice';
const count = 42;

html`
  <div>
    <p>Hello, ${name}!</p>
    <p>Count: ${count}</p>
  </div>
`;
```

Templates can include any JavaScript expression inside `${}`, making it easy to show or hide content based on a value.

```javascript
html`
  ${data.isLoggedIn 
    ? html`<p>Welcome back!</p>`
    : html`<p>Please log in</p>`
  }
`);
```

Use logical operators for simpler conditionals.

```javascript
html`
  ${data.count > 0 && html`
    <p>You have ${data.count} items</p>
  `}
`;
```

You can also use expressions for calculations or formatting.

```javascript
const data = state({ price: 29.99 });

html`
  <p>Total: $${(data.price * 1.1).toFixed(2)}</p>
`;
```

### Binding attributes and properties

There are three ways to bind values in templates, each serving a different purpose.

**String attributes** — Use the normal syntax to set string attributes.

```javascript
html`<img src=${imageUrl} alt=${description} />`;
```

**Boolean attributes** — Use the `?` prefix for attributes that should be present or absent based on a boolean.

```javascript
html`<button ?disabled=${isLoading}>Submit</button>`;
```

**Properties** — Use the `.` prefix to set element properties directly. This is especially useful for form controls.

```javascript
html`<input .value=${currentValue} />`;
```

:::info
Always use `.value` for form inputs instead of the `value` attribute. The attribute only sets the _initial_ value, while the property controls the _current_ value.
:::

### Listening to events

Listen to events using the `@` prefix followed by the event name.

```javascript
const data = state({ count: 0 });

burrow('app', () => html`
  <button @click=${() => data.count++}>
    Increment
  </button>
`);
```

You can access the event object in the callback.

```javascript
html`
  <input 
    @input=${event => {
      console.log('New value:', event.target.value);
    }}
  />
`;
```

:::info
Event listeners are automatically cleaned up when the burrow detaches.
:::

### Using directives

Burrow exports some useful directives from that handle common patterns.

**`classMap`** — Conditionally apply CSS classes.

```javascript
import { html, classMap } from '/dist/burrow.js';

const isActive = true;
const hasError = false;

html`
  <div class=${classMap({ 
    active: isActive, 
    error: hasError 
  })}>
    Content
  </div>
`;
```

**`styleMap`** — Apply inline styles from an object.

```javascript
import { html, styleMap } from '/dist/burrow.js';

const styles = {
  color: 'red',
  fontSize: '16px'
};

html`<p style=${styleMap(styles)}>Styled text</p>`;
```

**`repeat`** — Efficiently render lists with keys.

```javascript
import { html, repeat } from '/dist/burrow.js';

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

html`
  <ul>
    ${repeat(
      items,                                // array to repeat
      (item) => item.id,                    // a unique key
      (item) => html`<li>${item.name}</li>` // render each item
    )}
  </ul>
`;
```

:::info
The `repeat` directive is more efficient than mapping arrays when items can be reordered, added, or removed, since it preserves DOM elements by key instead of recreating them.
:::

**Additional Directives** —  Burrow exports only the most commonly used directives. However, you can use any of [lit-html's directives](https://lit.dev/docs/api/directives/) in a template by importing them directly from [`lit-html`](https://www.npmjs.com/package/lit-html).

## Working with state

State objects are reactive so, when you modify them, all burrows using the state will automatically re-render. This means you have full control over keeping state objects local and/or sharing them with other burrows. A state's scope is effectively the same scope as the variable you assign it to.

### Creating state

Create a state object by passing an object with default values to the `state()` function.

```javascript
import { state } from '/dist/burrow.js';

const data = state({
  count: 0,
  name: 'Alice',
  isLoading: false
});
```

You can read and write properties just like a normal object.

```javascript
console.log(data.count); // 0
data.count = 5;
console.log(data.count); // 5
```

When you modify a state property, all attached burrows will automatically update to reflect the new state. Updates are batched, so multiple changes in a single tick only trigger one re-render.

:::warn
State objects are _shallow reactive_, meaning only direct properties trigger updates. If you modify nested objects or arrays, you'll need to reassign them for the change to be detected.
:::

### Sharing state across burrows

State objects can be shared between multiple burrows, making it easy to keep different parts of the UI in sync without making the entire page reactive.

```html {.example .open .no-edit}
<!-- Host elements -->
<div id="input"></div><br>
<!-- ... -->
<div id="display"></div>

<!-- Burrows -->
<script type="module">
  import { burrow, html, state } from '/dist/burrow.js';
  
  // Shared state
  const data = state({ 
    message: `I'd far rather be happy than right any day` 
  });
  
  // First burrow with input
  burrow('input', () => html`
    <input 
      placeholder="Enter a message"
      .value=${data.message}
      @input=${(e) => data.message = e.target.value}
    />
  `);
  
  // Second burrow displaying the same data
  burrow('display', () => html`
    <p>Message: ${data.message}</p>
  `);
</script>
```

In this example, state is scoped to the module and, since both burrows are defined in the same module, both burrows have access to the same state. To share state across burrows defined in separate modules, export the state from one and import it into another.

You can even create a separate module just for shared state, if you prefer to organize it that way.

```javascript
//
// data.js
//
import { state } from '/dist/burrow.js';

export const sharedData = state({ 
  message: `Freedom's just another word for nothing left to lose` 
});

//
// input.js
// 
import { burrow, html } from '/dist/burrow.js';
import { sharedData } from './data.js';

burrow('input', () => html`
  <input 
    .value=${sharedData.message}
    @input=${(e) => sharedData.message = e.target.value}
  />
`);

//
// display.js
// 
import { burrow, html } from '/dist/burrow.js';
import { sharedData } from './data.js';

burrow('display', () => html`
  <p>Message: ${sharedData.message}</p>
`);
```

## Lifecycle hooks

Burrow provides lifecycle hooks that run when a burrow is attached to and detached from the DOM. Use the third argument to provide callbacks for `attached` and `detached`. This is a great place to setup and tear down observers, timers, WebSocket connections, etc.

```javascript
burrow('app', () => html`<p>Content</p>`, {
  attached() {
    console.log('Burrow attached to:', this.host);
  },
  detached() {
    console.log('Burrow detached');
  }
});
```

:::info
Inside lifecycle hooks, `this` refers to the [burrow instance](#the-burrow-instance).
:::

## Organizing burrows

There are two main approaches to organizing your burrows: inlining and importing. For simple, one-off instances, use an inline burrow. If you plan to use the same burrow on more than one page, or if you want to separate complex logic for clarity, use an imported burrow.

### Inline burrows

Inline burrows are defined directly in your HTML. This approach is perfect for one-off widgets or page-specific functionality.

```html
<div id="app"></div>

<script type="module">
  import { burrow, html, state } from '/dist/burrow.js';
  
  const data = state({ count: 0 });
  
  burrow('app', () => html`
    <button @click=${() => data.count++}>
      Count: ${data.count}
    </button>
  `);
</script>
```

### Importing burrows

For complex burrows or those used across multiple pages, create them in separate JavaScript files and export them.

```javascript
// counter.js
import { burrow, html, state } from '/dist/burrow.js';

const data = state({ 
  count: 0 
});

export const counter = burrow(() => html`
  <button @click=${() => data.count++}>
    Count: ${data.count}
  </button>
`);
```

Then you can import and [manually attach](#manual-attachment) them to your page.

```html
<div id="counter"></div>

<script type="module">
  import { counter } from './counter.js';
  counter.attach('counter');
</script>
```

## Manual attachment

By default, burrows automatically attach when you provide a host ID or reference as the first argument. Sometimes you need more control over when a burrow is attached or detached.

Create a burrow without auto-attaching by omitting the host parameter. Since we're using the imperative API, we'll need to retain a reference to [the burrow instance](#the-burrow-instance).

```javascript
const myBurrow = burrow(() => html`
  <p>Content</p>
`);
```

Now you can attach it manually.

```javascript
myBurrow.attach('app');
```

You can also detach a burrow, which removes it from the DOM and cleans up all state tracking.

```javascript
myBurrow.detach();
```

After detaching, you can reattach the burrow to the same or a different element.

```javascript
myBurrow.attach('different-element');
```

:::info
Each burrow instance can only be attached to one element at a time. If you call `attach()` on a burrow that's already attached, it will first detach from its current location. By design, you cannot attach the same burrow instance to multiple elements.
:::

## The Burrow instance

When you create a burrow, you get back a burrow instance with the following properties and methods.

- `host` — A reference to the DOM element the burrow is attached to, or `null` if it's not attached. Useful for checking attachment state or accessing the host element directly.
- `attach(element)` — Attaches the burrow to a DOM element. Accepts either a string ID or an HTMLElement reference. If the burrow is already attached elsewhere, it will detach first.
- `detach()` — Removes the burrow from the DOM and cleans up all state tracking and event listeners.
- `update()` — Manually triggers a re-render of the burrow. This is rarely needed since state changes automatically trigger updates, but can be useful when integrating with external libraries or when you need to force a refresh. Returns a promise that resolves after the DOM has been fully updated.

## When not to use burrows

Burrow is designed for adding interactivity to otherwise static pages. It's not designed to be a full-fledged application framework. Here are some scenarios where you probably _don't_ want to use a burrow.

- **Nested burrows** — Don't create burrows inside other burrows. Each burrow should be independent.
- **Full-page applications** — If your entire page is interactive and you're "burrowing" everything, you probably want a framework instead.
- **Complex routing** — Burrow doesn't include routing. For single-page applications with multiple views and navigation, use a framework designed for that purpose.
- **Large state trees** — Burrow's state system is intentionally simple. If you need computed properties, deep reactivity, or complex state management patterns, a more sophisticated solution might be better.
- **Server-side rendering** — Burrow is designed for client-side interactivity. If SSR is a requirement, look at meta-frameworks built for that purpose.

<img class="whiskers-center" src="/assets/images/whiskers/with-letter.svg" alt="Whiskers the mouse seated with a pencil and paper">
