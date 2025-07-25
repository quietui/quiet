---
title: Navicon
layout: component
---

```html {.example}
<quiet-navicon label="Toggle menu"></quiet-navicon>
```

## Examples

### Associating with a menu

The host element has a role of `button` and automatically sets `aria-expanded` and `aria-label`. To associated it with a navigation menu, add `aria-controls="id"` to the navicon. This tells assistive devices what it controls, but the navicon is not responsible for actually showing or hiding the menu.

```html
<quiet-navicon aria-controls="nav-menu"></quiet-navicon>

<!-- The navicon will toggle this element -->
<nav id="nav-menu">
  ...
</nav>
```

To show or hide the menu when the navicon is clicked, you must add your own JavaScript and/or CSS. You can listen for the `click` event with JavaScript.

```js
const navicon = document.querySelector('quiet-navicon');

navicon.addEventListener('click', () => {
  if (navicon.activated) {
    // Show the menu
  } else {
    // Hide the menu
  }
});
```

For a CSS-only solution, try using the `:has()` selector with `:state(toggled)`, e.g.:

```css
#nav-menu {
  /* Hidden menu styles */
}

html:has(quiet-navicon:state(toggled)) #nav-menu {
  /* Visible menu styles */
}
```

### Customizing the label

By default, the navicon's accessible label is a localized version of the phrase "toggle navigation." Use the `label` attribute to provide your own label. Labels aren't displayed on the screen, but they're announced by assistive devices.

```html {.example}
<quiet-navicon label="View mobile menu"></quiet-navicon>
```

### Changing the symbol

Use the `symbol` attribute to choose between the `hamburger` and the `equals` symbols.

```html {.example}
<quiet-navicon symbol="hamburger"></quiet-navicon>
<quiet-navicon symbol="equals"></quiet-navicon>
```

### Changing the size

Navicons have a default size, but you can override the `font-size` property to make them bigger or smaller.

```html {.example}
<quiet-navicon style="font-size: 1.5rem;"></quiet-navicon>
<quiet-navicon style="font-size: 1.5rem;" symbol="equals"></quiet-navicon>
<br><br>
<quiet-navicon style="font-size: 2.5rem;"></quiet-navicon>
<quiet-navicon style="font-size: 2.5rem;" symbol="equals" ></quiet-navicon>
```

### Changing the color

Set the `color` CSS property to control the color of the navicon.

```html {.example}
<quiet-navicon style="color: deeppink;"></quiet-navicon>
<quiet-navicon symbol="equals" style="color: dodgerblue;"></quiet-navicon>
```

### Disabling

Use the `disabled` attribute to disable the navicon.

```html {.example}
<quiet-navicon disabled></quiet-navicon>
```
