---
title: Stamp
layout: component
---

This component "stamps out" HTML based on a `<template>` and data attributes you provide. Stamps support expressions in attributes and content as well as basic conditionals. To keep the stamp component as lightweight and performant as possible, loops and complex expressions are not supported.

When you need to make changes to repetitive content, stamps make it easy by letting you edit a single template rather than multiple instances. They also help reduce boilerplate in situations where content repeats.

```html {.example}
<div id="stamp__overview">
  <!-- Template -->
  <template id="user-card">
    <quiet-card class="user" orientation="horizontal">
      <quiet-avatar slot="header" label="{label}" image="{image}"></quiet-avatar>        
      <div class="info">
        <h3>{name}</h3>
        <p>{tagline}</p>
      </div>
      <quiet-button slot="footer" if="{canEdit}" icon-label="Edit" pill>
        <quiet-icon name="edit"></quiet-icon>
      </quiet-button>
    </quiet-card>
  </template>

  <!-- First stamp -->
  <quiet-stamp 
    template="user-card"
    data-name="Meowy McGee"
    data-tagline="Freedom's just another word for nothing left to lose."
    data-label="Profile pic"
    data-can-edit="true"
    data-image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ></quiet-stamp>

  <!-- Second stamp -->
  <quiet-stamp 
    template="user-card"
    data-name="Lady Pawington"
    data-tagline="Professional sunbeam chaser and nap enthusiast."
    data-label="Profile pic"
    data-can-edit="true"
    data-image="https://images.unsplash.com/photo-1516310789627-2ff305829fbb?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ></quiet-stamp>

  <!-- Third stamp -->
  <quiet-stamp 
    template="user-card"
    data-name="Sir Whiskertons III"
    data-tagline="Living all nine lives to the fullest, one treat at a time."
    data-label="Profile pic"
    data-can-edit="false"
    data-image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ></quiet-stamp>  
</div>

<style>
  #stamp__overview {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    .user {
      --spacing: 1rem;
      
      .info {
        flex: 1 1 auto;
        display: flex;
        gap: .25rem;
        flex-direction: column;
      }

      h3 {
        font-size: 1.125rem;
        line-height: 1;
        margin-block: 0;
      }

      p {
        margin-block-end: 0;
      }
    }    
  }
</style>
```

## Examples

### Writing templates

Before using a stamp, you must create a `<template>` with an ID of your choice. Templates can include just about any HTML you want. To render a template, add a `<quiet-stamp>` element and set the `template` attribute to the template's ID. The rendered template will be appended to the DOM inside the stamp component.

In most cases, templates aren't very useful without data. To pass data to a stamp, add one or more [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) to it. You can reference the data in the template using _expressions_ that look like `{propertyName}`, where _propertyName_ is a [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) property name that corresponds to a data attribute you've supplied, e.g. `data-first-name` can be referenced in a template using `{firstName}`.

Once a template is rendered, changes to data attributes _will not_ trigger a rerender. To force a rerender, you can call the `renderTemplate()` method which will replace the content, breaking any references to existing elements.

Avoid using `<script>` and `<style>` tags in your template because they'll be duplicated each time the template is rendered.

```html {.example .open .no-buttons}
<!-- Create a template -->
<template id="user-template">
  <h4 class="name">{name}</h4>
  <div class="tagline">{tagline}</div>
</template>

<!-- Stamp it out -->
<quiet-stamp 
  template="user-template"
  data-name="Meowy McGee"
  data-tagline="Freedom's just another word for nothing left to lose."
></quiet-stamp>

<br>

<quiet-stamp 
  template="user-template"
  data-name="Lady Pawington"
  data-tagline="Sophistication in a silk scarf and sassy whiskers."
></quiet-stamp>
```

:::info
Expressions can be used in attributes and content, but will not be processed when placed in other areas of a template such as tag interpolation.
:::

:::warn
The template element must be in the DOM when the stamp is connected, otherwise the template won't be rendered and a warning will be shown in the console.
:::

### Boolean attributes

Boolean attributes, such as `<button disabled>`, are true when the attribute is present and false when the attribute is absent. Boolean attributes can be denoted in templates using a `?` prefix, e.g. `?disabled`.

A truthy comparison is done to determine if the attribute should be applied. All values aside from `false`, `null`, `undefined`, `""`, `NaN`, `0`, `-0`, and `0n` are considered truthy.

```html {.example .flex-row}
<template id="button-template">
  <button ?disabled="{isDisabled}">Click me</button>
</template>

<quiet-stamp template="button-template" data-is-disabled="false"></quiet-stamp>
<quiet-stamp template="button-template" data-is-disabled="true"></quiet-stamp>
```

### HTML expressions

Expressions are HTML-escaped by default, but you can add `:html` to any content expression to render the raw, unescaped HTML.

```html
<div>{content:html}</div>
```

:::warn
Using this option can be dangerous! Make sure you trust the included content, otherwise your app may become vulnerable to XSS exploits!
:::

### Escaping expressions

To escape an expression, add a [[\\]] character immediately before the opening curly bracket.

```html
<div>\{name}</div>
```

Escaped expressions will not be evaluated and will be rendered as-is minus the backslash.

### Conditionals

To show an element based on a truthy value, use the special `if={expression}` attribute. The element will only be shown when the expression is truthy.

```html
<div if="{someValue}">
  I will only be shown when someValue is truthy
</div>
```

The inverse of this is the `unless` attribute, which shows an element when the value is _not_ truthy.

```html
<div unless="{someValue}">
  I will only be shown when someValue is falsy
</div>
```

:::info
Like boolean attributes, all values aside from `false`, `null`, `undefined`, `""`, `NaN`, `0`, `-0`, and `0n` are considered truthy.
:::

### Replacing on render

If you don't want the `<quiet-stamp>` element to remain in the DOM after rendering, use the `replace` attribute. With this option, the component will stamp out the specified template and replace itself with the content.

This can be useful for controlling exactly what appears in the DOM, but it can also be confusing for developers who may not understand how the stamped content was generated.

```html {.example}
<template id="replaceable-template">
  <h3 style="margin-block: 0;">Where did it go?</h3>
  <p>
    Go ahead and inspect the DOM. The stamp has been 
    replaced by this content.
  </p>
</template>

<quiet-stamp 
  template="replaceable-template"
  replace
></quiet-stamp>
```