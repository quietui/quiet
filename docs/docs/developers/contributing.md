---
title: Contributing
description: Please read the project's contribution guidelines.
layout: docs
---

Quiet UI is an open source project, meaning everyone can use it and contribute to its development. A common misconception about contributing to an open source project is that you need to know how to code.

This simply isn't true.

In fact, there are many ways to contribute, and some of the most important contributions come from those who never write a single line of code. Here's a list of ways you can make a meaningful contribution to the project:

- Submitting well-written bug reports
- Submitting feature requests that are within the scope of the project
- Improving the documentation
- Responding to users that need help in the community chat or discussion forum
- Triaging issues on GitHub
- Being a developer advocate for the project
- Sponsoring the project financially
- Writing tests
- Sharing ideas
- And, of course, contributing code!

:::warn
Please take a moment to review these guidelines to make the contribution process as easy as possible for both yourself and the project's maintainer.
:::

## Feature requests

It's important to remember that this project is [very opinionated](/about). Many feature requests will be considered out of scope and will not be fulfilled. This doesn't mean your idea is bad — it means it's not a good fit for the project right now. As a maintainer, I strongly believe that certain tradeoffs are worth eliminating complexity and bloat, which ultimately leads to a better experience and improved longevity.

- Please **do** search for an existing request before suggesting a new feature.
- Please **do** use the voting buttons to vote for a feature.
- Please **do** share substantial use cases and perspective that support new features if they haven't already been mentioned.
- Please **do not** bump, spam, or ping contributors to prioritize your own feature.

You can [request a feature here](https://github.com/quietui/quiet/discussions/categories/feature-requests).

## Bug Reports

A bug is a demonstrable problem caused by code in the library. Bug reports are an important contribution to the quality of the project. When submitting a bug report, there are a few steps you can take to make sure your issues gets attention quickly.

- Please **do** search for an existing issue before creating a new one
- Please **do** explain the bug clearly and concisely
- Please **do** provide a minimal reproduction that shows the bug (e.g. [CodePen](https://codepen.io/pen/) or [JSFiddle](https://jsfiddle.net/))
- Please **do not** use the issue tracker for personal support requests ([go here instead](https://github.com/quietui/components/discussions/categories/help-support))
- Please **do not** paste in large blocks of irrelevant code
- Please **do not** paste in screenshots of code

:::info
A minimal test case is critical to getting your bug fixed! It demonstrates that the bug exists in the library and not in surrounding code. Contributors should be able to understand the bug with relative ease.
:::

## Pull requests

To keep the project on track, please read the following guidelines before submitting a PR.

- ==Please **do** open an issue before submitting a PR.== This will prevent you from doing work that won't be accepted for various reasons (e.g. someone is already working on it, it's not a good fit for the project's roadmap, it needs additional exploration, etc.)
- Please **do** make sure your PR clearly defines what you're changing. Even if you feel your changes are obvious, please explain them so other contributors can more easily review your work.
- Please **do not** edit anything in `dist/`, as those files are generated at build time.

:::warn
**As a maintainer, I reserve the right to reject any contribution for any reason.** 

More often than not, I will prefer to do things myself. Or I will have a different vision. Or I won't want to adopt code I'm not comfortable maintaining.

Remember, this library is very opinionated. Oftentimes, saying "no" is key to maintaining the quality of the library and my ability to steward it effectively.
:::

## Documentation

Maintaining good documentation can be a painstaking task, but poor documentation leads to frustration and makes the project less appealing to users. Fortunately, writing documentation for this project is pretty easy.

Most of the technical documentation is generated with JSDoc comments and TypeScript metadata gathered from the source code. Every property, method, event, etc. is documented this way. In-code comments encourage contributors to keep the documentation up to date as changes occur so the docs are less likely to become stale. Refer to an existing component to see how JSDoc comments are used in this project.

Instructions, code examples, and interactive demos are hand-curated to give users the best possible experience. Typically, the most relevant information is shown first and less common examples are shown further down the page. Edge cases and gotchas should be called out in context.

The docs are powered by [Eleventy](https://www.11ty.dev/). Check out `docs/components/*.md` to get an idea of how pages are structured and formatted. If you're creating a new component, it may help to use an existing component's markdown file as a template.

If you need help with documentation, feel free to reach out on the [discussion forum](https://github.com/quietui/quiet/discussions).

## Code contributions & licensing

By submitting a contribution to this project, you agree to license your entire contribution under the same terms of the project's current or future license(s) chosen by the maintainer. This includes open source and/or commercial licenses. The author reserves the right to change the license(s) as necessary to ensure the longevity of the project.

If you do not agree to license your contribution under these terms, do not make contributions to the project.

## Conventions for component development

### Code formatting

This project uses [Prettier](https://prettier.io/) to format code consistently. It also uses Prettier plugins to sort imports and CSS rules. By design, code that hasn't been run through Prettier will trigger a build error. You can either turn "format on save" on in your editor, or you can run `npm run prettier:fix` manually before committing changes.

### Component structure

A simple structure is preferred. Avoid adding unnecessary elements or wrapping whenever possible. Do what users expect and ensure the structure is reasonably customizable using the appropriate parts.

### Using IDs and classes

The `id` attribute should be used to reference unique elements within each component. Remember that IDs only need to be unique in the shadow DOM they exist in. Simpler is better, so don't prefix or namespace them. 

Classes should be used to apply modifiers and reusable styles to elements. Avoid using classes to reference individual elements. 

### Using IDs and classes in examples

When creating examples, use the `tag-name__id` or `tag-name__class` convention to assign IDs or classes within the example. This is an easy way to scope examples and it prevents styles and behaviors from affecting other examples.

### Using parts

Add parts only to internals that should be exposed as part of the component's public API. Only one part should be applied to an element. Avoid using parts to represent state. It's usually better to apply a custom state to the host element instead.

When nested components export parts, they should be delimited by two underscores, e.g. `copy-button__button`, where `button` is a `<quiet-button>` and `button__button` is the `<button>` inside of its shadow root.

### Using icons

Icons that are rendered in a component's shadow root _must_ use the `system` icon library. The system icon library uses inline SVGs for performance, so they load instantly instead of requiring additional HTTP requests. System icons _must not_ be used in examples.

### Creating form controls

Form controls must extend the `QuietFormControlElement` abstract class. By doing so, they will automatically become form-associated. Form controls must follow patterns of existing form controls, for familiarity. Use `value` for value, `disable` to disable, `require` to require, etc.

Form controls must dispatch native `change` and `input` events along with `quiet-change` and `quiet-input`. This improves DX and allows frameworks to bind to Quiet form controls just like native ones. (Note that the native `change` event isn't composed, so it won't be retargeted like `input` and other events.)

Form controls must also implement the `focusableAnchor` getter as shown below. The function must return a reference to the internal element that will receive focus when a validation error occurs.

```ts
export class QuietTextField extends QuietFormControlElement {
  // ...
  protected get focusableAnchor() { 
    return this.someAnchorElement;
  }
  // ...
}
```

### Component sizing and scaling

Components can be sized one of three ways.

1. Relative to the current font size (e.g. badge, callout, icon, spinner, tooltip)
2. Based on a `size` attribute (e.g. form controls)
3. Based on a CSS custom property (e.g. avatar, progress)

By default, components should scale relative to the current font size unless they're a form control or sizing makes more sense to be done with a custom property.

### Naming sizes

Sizes in attributes, utility classes, and similar uses should use shorthand t-shirt sizing: `xs`, `sm`, `md`, `lg`, `xl`

Avoid using the `xxs` and `xxl` pattern. For additional scales, use `2xs` and `2xl` as it's more accessible, especially to visually impaired users.

### Dependencies

A component should import and mark another component as a dependency when a) the dependency is rendered as part of the host element's shadow root or b) the dependency must be slotted in for the host element to function. For example, `<quiet-dropdown-item>` is a dependency of `<quiet-dropdown>`, even though the user slots it in.

### Assigning attributes on the host element

If a component needs to set attributes on itself, such as `role`, `aria-*`, or `id`, it should do so in the `firstUpdated()` lifecycle hook, not in `connectedCallback()`.

### Boolean attributes

Boolean attributes should always default to `false`, since HTML users can't remove them declaratively otherwise.

Use `with-*` attributes for features that enable optional content. Use `without-*` attributes for features that disable optional content.

### Attributes representing percentages

When an attribute maps to a percentage, it should accept 0-1. For example, 50% is represented as "0.5". For consistency, this is the preferred pattern.

Percentages may be represented as "50%" in cases where CSS-like values are provided, e.g. `100px 25%`.

### Attribute reflection

Attribute reflection in custom elements is [an interesting challenge](https://www.abeautifulsite.net/posts/reflection-and-custom-states-in-web-components/) because the platform hasn't established a clear pattern for it. This section defines such a pattern to enable consistency throughout the library.

#### An attribute _should_ reflect when

- It represents a current state that the user can modify and/or may be interested in observing, such as open, readonly, etc.
- It represents a value that affects how the component is styled internally or externally. This allows us to target variants without using an internal wrapper and/or replicating values internally.
- It makes the debugging experience more intuitive for authors and consumers.

#### An attribute _should not_ reflect when

- The data type is neither string, number, nor boolean.
- The value is content or otherwise too cumbersome to store in the DOM, e.g. the content of a text area.
- The user is unlikely to have interest in observing the attribute for state or styling purposes.

#### Special cases

- All `with-*` and `without-*` attributes must reflect.
- In form controls, the `name` and `required` attributes must always reflect, like the platform.
- The `disabled` and `readonly` attributes should always reflect.
- The `checked`, `active`, `selected`, and similar value-related attributes should not reflect.

### Styling elements with borders

On-page elements that hold grouped content inside a border, such as cards, should use the following border and background styles along with an appropriate shadow.

```css
.card {
  background-color: var(--quiet-paper-color);
  border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
}
```

Above-page elements, such as popovers, should have a more prominent border so they can be seen easily. These elements should use the following border and background styles along with an appropriate shadow.

```css
.popover {
  background-color: var(--quiet-paper-color);
  border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
}
```

Tooltips should be inverted and use the following styles for borders, backgrounds, etc.

```css
.tooltip {
  border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-loud);
  background-color: var(--quiet-neutral-fill-loud);
  box-shadow: var(--quiet-shadow-soft);
  color: var(--quiet-neutral-text-on-loud);
}
```

Modal elements that feature a visible backdrop, such as dialogs, should not have a border. These elements should use the following background styles along with an appropriate shadow.

```css
.dialog {
  background: var(--quiet-paper-color);
}
```

### Naming events

Open, close, and similar events should be named present tense, e.g. `quiet-open` and `quiet-close`. When animating, a `quiet-before-*` event should be dispatched that, when canceled, will prevent the action from completing.

### Data attribute invokers

Some components make use of [data attributes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Solve_HTML_problems/Use_data_attributes) to invoke certain behaviors, such as `data-dialog="close"` to close a dialog. The syntax of an invoker must follow this pattern.

```html
<button data-component="action id">
  ...
</button>
```

In this case, `component` is replaced with the component's tag name minus its `quiet-` prefix. Thus, `data-dialog` is unambiguously an invoker that controls a dialog. The `action` argument is not optional and must be a short, one-word or kebab-case name that describes what the invoker does. Lastly, an optional target ID can be provided, separated by a space.

```html
<quiet-dialog id="my-dialog">
  ...
</quiet-dialog>

<button data-dialog="open my-dialog">
  Open dialog
</button>
```

If the invoker is positioned within the controlling component, such as a `<button data-dialog="close">` inside of a `<quiet-dialog>`, the ID should be optional.

### Dispatching events

Events must extend the `Event` object and start with `quiet-`. You can dispatch events using `this.dispatchEvent()`. Although the `CustomEvent` type is unused, event details must be made available to the user in `event.detail`. Take a look at existing events to see how to extend and provide details. Event declarations do include some boilerplate, but they enable strong typing and help keep usage consistent.

Events should always be composed. Events should only be cancelable if they're actually cancelable by the end user. Events should bubble to support delegation unless there's a specific reason not to or if it makes sense to align with the platform, e.g. `quiet-focus` and `quiet-blur`.

### Observing slots

The platform doesn't currently provide an easy way to detect if slots have content, so the `QuietElement` base class offers a utility to facilitate this. With it, you can show/hide sections of the template and/or toggle classes based on a named slot's status.

Because it requires additional processing, this feature requires an opt-in via the `observeSlots` static property.

```ts
@customElement('quiet-card')
export class QuietCard extends QuietElement {
  static observeSlots = true;
  // ...
}
```

Once enabled, you can access a `Set()` of named slots that have content through the `slotsWithContent` property.

```ts
if (this.slotsWithContent.has('header')) {
  //
  // The card has content in the `header` slot
  //
}
```

To conditionally render a slot when it has content, use the `whenSlotted()` method. This will render the slot as defined if content is slotted in, otherwise it will render a hidden slot of the same name in order to listen to `slotchange` events.

```ts
render() {
  return html`
    ${this.whenSlotted(
      'header',
      html`
        <header id="header" part="header">
          <slot name="header"></slot>
        </header>
      `
    )}
  `;
}
```

### Console logging

When necessary, make use of `console.warn()` to inform users of warnings and `console.error()` of errors. Use `console.error()` more sparingly. The first argument should always be a human-readable message explaining what happened and how to fix it. Be verbose, but concise. If necessary, the second argument should be a reference to the dispatching element.

Components should never use `console.log()`.

### The word "ID"

For consistency, the `id` attribute should be displayed in lowercase when referring to an attribute or property. Everywhere else, it should be spelled "ID" and the plural form "IDs."

### Whiskers

In most cases, Whiskers should only appear once on the same page. If he appears twice, he must be placed in such a way that he will not show more than once in the visible viewport. For his own safety, Whiskers may only appear on pages where cats are not present.

<img class="whiskers-center" src="/assets/images/whiskers/arms-out.svg" alt="Whiskers the mouse with his arms out">
