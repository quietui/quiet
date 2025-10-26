---
title: Quiet Burrow
description: A mouse-sized library for building reactive islands in your web applications.
layout: docs
---

[experimental] <quiet-badge>since 1.5.0</quiet-badge>

Quiet Burrow™ is an optional utility that lets you add interactivity to various parts of a webpage without taking over the entire DOM. It gives you framework-like features without the framework so you can sprinkle in reactivity only where you actually need it.

## What is a burrow?

Think of a _burrow_ as an interactive "island" that lives in your page. Create reactive templates with a familiar declarative syntax, add state, and respond to events…all with just a few lines of code.

Here's an obligatory counter example. No build step or transpilation is required.

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

Burrows are designed to be authored [directly in HTML](#inline-burrows) but can also be [imported](#imported-burrows). You can put multiple burrows on the page and keep them all in sync without making the rest of the page reactive, giving you fast, efficient updates without the overhead or complexity of a framework.

**When to use Burrow:** If you find yourself reaching for a framework just to add a handful of interactive elements to an otherwise static page, Burrow is probably a good fit.

**When not to use Burrow:** If you're building a single-page application or if your app requires routing, stores, and complex framework features, a framework is probably better. 

## Installation

Burrow can be installed via CDN or npm. Use these copy-and-paste examples to get started.

<quiet-tab-list class="import-tabs" label="How would you like to use Burrow?">
<quiet-tab panel="cdn">CDN</quiet-tab>
<quiet-tab panel="npm">npm</quiet-tab>

<quiet-tab-panel name="cdn">

```ts
import { burrow, state, html } from '{% cdnUrl '/dist/burrow.js' %}';

const data = state({
  name: 'Whiskers'
});

burrow('ELEMENT_ID_HERE', () => html`
  <p>Hello, ${data.name}!</p>
`);
```

</quiet-tab-panel>

<quiet-tab-panel name="npm">

```ts
import { burrow, state, html } from '@quietui/quiet/burrow.js';

const data = state({
  name: 'Whiskers'
});

burrow('ELEMENT_ID_HERE', () => html`
  <p>Hello, ${data.name}!</p>
`);
```

</quiet-tab-panel>
</quiet-tab-list>

## Creating your first burrow

Every burrow needs a _host_ element, which is where the burrow will be attached. The host can be virtually any HTML element on the page. This example creates a burrow and attaches it to the `#greeting` element. All it does at the moment is render a paragraph.

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
      @input=${event => data.name = event.target.value}
    />
    <br>
    <p>Hello, ${data.name}!</p>
  `);
</script>
```

:::info
Note that we use `.value` to bind to the text field's value _property_ instead of its _attribute_. This will be discussed more later on.
:::

## Authoring templates

Burrow uses [lit-html](https://lit.dev/docs/libraries/standalone-templates/) under the hood, which gives you a powerful and efficient templating system based on platform APIs. Templates are written using [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) via `html`.

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
Always use `.value` for form controls instead of the `value` attribute. The attribute only sets the _initial_ value, while the property controls the _current_ value.
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
  >
`;
```

Handlers can be moved to functions outside the template to keep code organized.

```javascript
function handleClick() {
  console.log('The click has been handled');
}

burrow('app', () => html`
  <button @click=${handleClick}>Click me</button>
`);
```

:::info
Event listeners are automatically cleaned up when the burrow detaches.
:::

### Using directives

Burrow exports some useful directives from lit-html that handle common patterns.

[**`classMap`**](https://lit.dev/docs/templates/directives/#classmap) — Conditionally apply CSS classes.

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

[**`ifDefined`**](https://lit.dev/docs/templates/directives/#ifdefined) — Only sets an attribute if the value is defined (not `null` or `undefined`).

```javascript
import { html, ifDefined } from '/dist/burrow.js';

const userId = null;
const userName = 'Alice';

html`
  <div 
    data-user-id=${ifDefined(userId)}
    data-user-name=${ifDefined(userName)}
  >
    User Info
  </div>
`;
// Result: only data-user-name attribute is set
```

[**`live`**](https://lit.dev/docs/templates/directives/#live) — Checks the live DOM value and only updates if different, useful for inputs where the user might be typing.

```javascript
import { html, live } from '/dist/burrow.js';

const data = state({ 
  value: 'initial' 
});

html`
  <input 
    .value=${live(data.value)}
    @input=${e => data.value = e.target.value}
  />
`;
// The input won't reset cursor position during typing
```

[**`repeat`**](https://lit.dev/docs/templates/directives/#repeat) — Efficiently render lists with keys.

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

[**`styleMap`**](https://lit.dev/docs/templates/directives/#stylemap) — Apply inline styles from an object.

```javascript
import { html, styleMap } from '/dist/burrow.js';

const styles = {
  color: 'red',
  fontSize: '16px'
};

html`<p style=${styleMap(styles)}>Styled text</p>`;
```

[**`unsafeHTML`**](https://lit.dev/docs/templates/directives/#unsafehtml) — Renders a string as HTML without escaping.

```javascript
import { html, unsafeHTML } from '/dist/burrow.js';

const htmlContent = '<strong>Bold</strong> and <em>italic</em> text';

html`
  <div>
    ${unsafeHTML(htmlContent)}
  </div>
`;
// Renders the HTML tags instead of escaping them
```

[**`unsafeSVG`**](https://lit.dev/docs/templates/directives/#unsafesvg) — Renders a string as SVG without escaping.

```javascript
import { html, unsafeSVG } from '/dist/burrow.js';

const svgContent = '<circle cx="50" cy="50" r="40" fill="blue" />';

html`
  <svg width="100" height="100">
    ${unsafeSVG(svgContent)}
  </svg>
`;
// Renders the SVG elements directly
```

[**`until`**](https://lit.dev/docs/templates/directives/#until) — Renders placeholder content until a Promise resolves.

```javascript
import { html, until } from '/dist/burrow.js';

const fetchUser = fetch('/api/user').then(r => r.json());

html`
  <div>
    ${until(
      fetchUser.then(user => html`<p>Hello, ${user.name}!</p>`),
      html`<p>Loading...</p>`
    )}
  </div>
`;
// Shows "Loading..." until the promise resolves
```

**Additional Directives** —  Burrow exports only the most commonly used directives, but you can use any of [lit-html's directives](https://lit.dev/docs/api/directives/) in a template by importing them directly from [`lit-html`](https://www.npmjs.com/package/lit-html).

## Working with state

State objects are reactive so, when you modify them, all burrows using the state will automatically re-render. A state's scope is effectively the same scope as the variable you assign it to. This means you have full control over keeping state objects local and/or sharing them with other burrows.

### Creating state

State objects are created by passing an object with default values to the `state()` function:

```javascript
import { state } from '/dist/burrow.js';

const data = state({
  count: 0,
  name: 'Alice',
  isLoading: false
});
```

You can read and write properties just like a normal object:

```javascript
console.log(data.count); // 0
data.count = 5;
console.log(data.count); // 5
```

When you modify a state property, all attached burrows will update to reflect the new state. Updates are batched, so multiple changes in a single tick only trigger one re-render.

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
      @input=${event => data.message = event.target.value}
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
    @input=${event => sharedData.message = event.target.value}
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

### Imported burrows

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

Here's the API documentation formatted as a markdown table:

| Method/Property | Description |
|-----------------|-------------|
| `host` | A reference to the DOM element the burrow is attached to, or `null` if it's not attached. Useful for checking attachment state or accessing the host element directly. |
| `attach(element)` | Attaches the burrow to a DOM element. Accepts either a string ID or an element reference. If the burrow is already attached elsewhere, it will detach first. |
| `detach()` | Removes the burrow from the DOM and cleans up all state tracking and event listeners. |
| `update()` | Manually triggers a re-render of the burrow. This is rarely needed since state changes automatically trigger updates, but can be useful when integrating with external libraries or when you need to force a refresh. Returns a promise that resolves after the DOM has been fully updated. |

## Using TypeScript

Burrow is written in TypeScript and includes type definitions out of the box. Here are some tips to improve your experience if you happen to be using TypeScript. 

To strongly type state objects, define an interface and pass it as a type parameter.

```typescript
interface AppData {
  count: number;
  name: string;
  items: string[];
}

const data = state<AppData>({
  count: 0,
  name: 'Meowy',
  items: []
});
```

Event handlers aren't inferred, but you can assign them as shown.

```typescript
burrow('app', () => html`
  <input 
    @input=${(event: InputEvent) => {
      const target = event.target as HTMLInputElement;
      data.name = target.value;
    }}
  />
`);
```

## Antipatterns

- Do not nest burrows. Burrows are not components and shouldn't be used as such; here be [unsupported] dragons
- Do not try to use a burrow more than once on the same page; the need for this is a strong sign that you should componentize the functionality instead
- Avoid using refs and/or surgically changing the DOM within a burrow; let the template do the work
- Avoid building apps that require routing, complex state management; use a framework instead

## Building apps with Burrow

It's not a recommendation of the maintainer to use Burrow to build complex applications. However, if you were to find yourself on such an adventure, here are some tips for a successful quest:

### MPA vs. SPA

The web started off with multi-page applications (MPA) and then single-page applications became all the rage (SPA). Now the world seems split between the two patterns.

For this purpose, the maintainer recommends an MPA, as no router is provided. The browser provides a file-based one for free anyways! Plus, there's something to be said about the simplicity of a clean slate on every page load.

Consider using [Hotwire:Turbo](https://turbo.hotwired.dev/) or [View Transitions](https://caniuse.com/cross-document-view-transitions) for a more SPA-like experience.

### Managing state

Create an _App State_ file and only store in it the data that must be global to the app. Keep all other state local. Anything that _doesn't_ need to be exposed outside of a burrow shouldn't be exposed outside of a burrow.

This strict separation makes understanding, maintaining, and debugging easier since each burrow acts as an independent module, only poking through the module barrier to interact with the _App State_.

Use ES modules to abstract and share functionality. Instead of writing the same logic and copying it multiple times, consider importing it into each burrow that needs it. State and other objects can also be shared, making it easy to reference the same data across multiple burrows.

### Minimizing dependencies

Sometimes it's necessary to import third-party dependencies into a burrow, but each dependency comes at a cost. As a developer, you must carefully consider that cost. Try to use lean, laser-focused libraries instead of large, complex ones that try to do everything.

As for your own code, Burrow's philosophy encourages minimal JavaScript. This keeps load times fast and reactivity focused only where it needs to be for the best possible performance.

But again, the maintainer doesn't recommend Burrow for complex applications. Should you choose to swim upstream, I would love to hear about your experience regardless of how it goes. Feel free to post in the [public forum](https://github.com/quietui/quiet/discussions/categories/show-and-tell).

<img class="whiskers-center" src="/assets/images/whiskers/with-letter.svg" alt="Whiskers the mouse seated with a pencil and paper">
