---
title: Navicon
layout: component
---

```html {.example}
<quiet-navicon label="Toggle menu" style="font-size: 1.75rem;"></quiet-navicon>
```

## Examples

### Associating a menu

To associate the navicon with a navigation menu, add `for="id"`, where `id` is the ID of the nav menu that will show/hide when toggled. This tells assistive devices which element the navicon controls. The nav menu must exist in the same document as the navicon to work correctly.

```html
<quiet-navicon for="nav-menu"></quiet-navicon>

<!-- The navicon will toggle this element -->
<nav id="nav-menu">
  ...
</nav>
```

**The navicon does not show or hide the menu for you.** You must add your own JavaScript and/or CSS to toggle it. You can listen for the `click` event and manage things with JavaScript.

```js
const navicon = document.querySelector('quiet-navicon');

navicon.addEventListener('click', () => {
  if (navicon.expanded) {
    // Show the menu
  } else {
    // Hide the menu
  }
});
```

For a CSS-only solution, try using the `:has()` selector combined with `:state(expanded)` to target the nav menu when the navicon is expanded.

```css
#nav-menu {
  /* Hidden menu styles */
}

body:has(quiet-navicon:state(expanded)) #nav-menu {
  /* Visible menu styles */
}
```

### Customizing the label

By default, the navicon's accessible label is a localized version of the phrase "toggle navigation." Use the `label` attribute to provide your own label. Labels aren't displayed on the screen, but they're announced by assistive devices.

```html {.example}
<quiet-navicon label="View mobile menu" style="font-size: 1.75rem;"></quiet-navicon>
```

### Changing the symbol

Use the `symbol` attribute to choose between the `hamburger`, `equals`, `horizontal-dots`, and `vertical-dots` symbols.

```html {.example}
<div style="font-size: 1.75rem;">
  <quiet-navicon symbol="hamburger"></quiet-navicon>
  <quiet-navicon symbol="equals"></quiet-navicon>
  <quiet-navicon symbol="horizontal-dots"></quiet-navicon>
  <quiet-navicon symbol="vertical-dots"></quiet-navicon>
</div>
```

### Changing the size

Navicons are sized based on the current font size. You can make them bigger or smaller by changing the `font-size` property on the component or an ancestor. A good default size is 1.75rem, which equals 28&times;28px with a 16px root size.

```html {.example}
<quiet-navicon style="font-size: 1rem;"></quiet-navicon>
<quiet-navicon style="font-size: 1rem;" symbol="equals"></quiet-navicon>
<quiet-navicon style="font-size: 1rem;" symbol="horizontal-dots"></quiet-navicon>
<quiet-navicon style="font-size: 1rem;" symbol="vertical-dots"></quiet-navicon>
<br><br>
<quiet-navicon style="font-size: 3rem;"></quiet-navicon>
<quiet-navicon style="font-size: 3rem;" symbol="equals" ></quiet-navicon>
<quiet-navicon style="font-size: 3rem;" symbol="horizontal-dots" ></quiet-navicon>
<quiet-navicon style="font-size: 3rem;" symbol="vertical-dots" ></quiet-navicon>
```

### Changing the color

Set the `color` CSS property to control the color of the navicon.

```html {.example}
<div style="font-size: 1.75rem;">
  <quiet-navicon style="color: deeppink;"></quiet-navicon>
  <quiet-navicon symbol="equals" style="color: dodgerblue;"></quiet-navicon>
  <quiet-navicon symbol="horizontal-dots" style="color: seagreen;"></quiet-navicon>
  <quiet-navicon symbol="vertical-dots" style="color: tomato;"></quiet-navicon>
</div>
```

### Disabling

Use the `disabled` attribute to disable the navicon.

```html {.example}
<quiet-navicon disabled style="font-size: 1.75rem;"></quiet-navicon>
```
