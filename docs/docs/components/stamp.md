---
title: Stamp
layout: component
---

The `<quiet-stamp>` element uses `display: contents` and appends the stamped template as child elements, allowing you to use flex and grid layouts.

```html {.example}
<template id="user-item">
  <div class="user" style="border: solid 2px deeppink; padding: 1rem;">
    <p>Name: {name}</p>
    <p id="{userId}">ID #: {userId}</p>
    <div class="bio">
      {bio:html}
    </div>

	  <div if="{hasActions}" class="actions">
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>

    <div unless="{hasActions}">
      No actions available
    </div>

    \{test}
  </div>
</template>

<quiet-stamp 
  template="user-item"
  data-name="Bob Marley" 
  data-user-id="1234"
  data-bio="Hi, I'm Bob and <em>I like to party!</em> Employee of the month every Nevervember."
  data-has-actions="false"
  data-test="you shouldn't see me"
></quiet-stamp>

<quiet-stamp 
  template="user-item"
  data-name="Gary Larson" 
  data-user-id="9876"
  data-bio="Hi, I'm Gary and <strong>I do not like to party!</strong>"
  data-has-actions="true"
  data-test="you shouldn't see me either"
></quiet-stamp>
```

## Examples

TODO

- creating a template
  - values in attributes
  - values in text nodes
  - values in the special `html` attribute
  - providing data to stamps
- show how to style flex/grid since it's `display: contents`
- escaping placeholders
