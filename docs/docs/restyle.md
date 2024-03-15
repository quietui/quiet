---
title: Quiet Restyle
description: Quiet Restyle is an opinionated CSS reset you can use with or without Quiet's components.
layout: docs
---

Quiet Restyle™ is an opinionated CSS reset you can use with or without Quiet's components. It lets you kick off a new website or app that looks great without worrying about styling native HTML elements right away. Just include it and start writing HTML!

You can think of Restyle as a smarter, prettier user agent stylesheet.

## Usage

To add Restyle to your app, first [include a theme stylesheet](/docs/themes) and then add the following markup to the `<head>` of your document.

```html
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

Restyle uses your theme's variables as a baseline, so things will look familiar right away. Feel free to customize any of its styles in your own CSS by overriding the properties you want to change.

Restyle is just a starting point. Feel free to customize it and make it your own!

## Style demonstration

The following content shows how Restyle affects native HTML elements using the current theme. Feel free to inspect the source to view the markup.

---

<div data-no-outline>

# Heading level one

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam libero justo.

## Heading level two

Vulputate mi sit amet mauris commodo quis imperdiet. Pellentesque habitant morbi tristique senectus et netus et. Dolor morbi non arcu risus quis varius.

### Heading level three

Ultrices tincidunt arcu non sodales neque sodales ut etiam sit. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Vel quam elementum pulvinar etiam non quam lacus suspendisse.

#### Heading level four

Fringilla urna porttitor rhoncus dolor purus. Cras semper auctor neque vitae tempus quam pellentesque nec. Adipiscing bibendum est ultricies integer quis auctor elit.

##### Heading level five

Ultrices dui sapien eget mi proin sed libero enim sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Id diam vel quam elementum pulvinar etiam non quam. Nullam ac tortor vitae purus. Proin sed libero enim sed faucibus turpis in. Ac turpis egestas maecenas pharetra convallis.

###### Heading level six

Amet nisl purus in mollis nunc sed id semper risus. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Consectetur lorem donec massa sapien.

---

### Paragraphs

Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Viverra nam libero justo laoreet. Pellentesque habitant morbi tristique senectus et. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.

Nunc aliquet bibendum enim facilisis gravida neque convallis a. Proin nibh nisl condimentum id venenatis. Ut tristique et egestas quis ipsum suspendisse ultrices. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.

Volutpat blandit aliquam etiam erat velit scelerisque. Non sodales neque sodales ut etiam sit amet. Cras tincidunt lobortis feugiat vivamus at augue eget arcu.

### Inline elements

<div class="two-columns">

**bold**

_italic_

<u>underline</u>

<del>delete</del>

<ins>insert</ins>

<s>strike through</s>

<small>small text</small>

subscript<sub>sub</sub>

superscript<sub>sup</sub>

[hyperlinks](#)

`inline code`

==highlighted==

<abbr title="abbreviation">abbreviation</abbr>

[[keyboard]]

</div>

### Lists

<div class="two-columns">

- First item
- Second item
   - Nested item
   - Another nested item
- Third item
- Fourth item

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item
4. Fourth item

</div>

### Block quotes

> Neither the mouse nor the boy was the least bit surprised that each could understand the other. Two creatures who shared a love for web design naturally spoke the same language.

### Code blocks

<pre>// do a thing
export function thing(arg) {
  if (arg) {
    return true;
  } else {
    return false;
  }
}</pre>

### Tables

<table>
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Proin sed libero</td>
      <td>Amet nisl</td>
      <td>Blandit volutpat</td>
    </tr>
    <tr>
      <td>Viverra nam</td>
      <td>Nunc aliquet</td>
      <td>Condimentum vitae</td>
    </tr>
    <tr>
      <td>Placerat duis</td>
      <td>Eu volutpat</td>
      <td>Morbi enim</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>4,567</td>
      <td>3,210</td>
      <td>7,654</td>
    </tr>
  </tfoot>  
</table>

### Details

<details>
  <summary>Amet nisl purus</summary>
  <p>Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Volutpat blandit aliquam etiam erat velit scelerisque. Non sodales neque sodales ut etiam sit amet.</p>
  <p>Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Risus pretium quam vulputate dignissim suspendisse.</p>
</details>

<details>
  <summary>Scelerisque varius</summary>
  <p>Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Volutpat blandit aliquam etiam erat velit scelerisque. Non sodales neque sodales ut etiam sit amet.</p>
  <p>Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Risus pretium quam vulputate dignissim suspendisse.</p>
</details>

<details>
  <summary>A diam sollicitudin</summary>
  <p>Enim diam vulputate ut pharetra sit amet aliquam id diam. Suscipit tellus mauris a diam maecenas sed enim ut sem. Sit amet mattis vulputate enim nulla.</p>
  <p>Tristique et egestas quis ipsum. Volutpat lacus laoreet non curabitur gravida arcu. Fermentum posuere urna nec tincidunt. Mattis enim ut tellus elementum. Quam lacus suspendisse faucibus interdum posuere lorem ipsum.</p>
</details>

### Definition Lists

<dl>
  <dt>First definition</dt>
  <dd>Consectetur lorem donec massa sapien. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl.</dd>
  <dt>Second definition</dt>
  <dd>Viverra nam libero justo laoreet. Pellentesque habitant morbi tristique senectus et.</dd>
  <dt>Third definition</dt>
  <dd>Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.</dd>
</dl>

### Figures

<figure>
  <img src="https://images.unsplash.com/photo-1570018144715-43110363d70a?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Three gray kittens on a wood floor">
  <figcaption>
    Non curabitur gravida arcu ac tortor dignissim convallis. Aliquet lectus proin nibh nisl condimentum id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.
  </figcaption>
</figure>

### Media

![A kitten lays on the bed with her head upside down](https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

<iframe src="https://www.youtube.com/embed/ALGG6ptfLdc?si=03a9K9QigWi2A9Wt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

</div>

---

## Utility classes

Restyle ships with a handful of helpful utility classes. Use `class="..."` to apply them to any HTML element.

- `visually-hidden` - Used when an element must be accessible to assistive technologies like screen readers but should remain hidden in other circumstances.
- `visually-hidden-focusable` - The same as `visually-hidden`, but will show when the element or any of its children receive focus. Useful for things like "skip to content" links.
