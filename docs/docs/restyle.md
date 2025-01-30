---
title: Quiet Restyle
description: An opinionated CSS reset you can use with or without Quiet's components.
layout: docs
---

Quiet Restyle™ is an opinionated CSS reset that provides consistent styles to HTML documents by making use of Quiet's [design token API](/docs/theming/#theme-concepts). Restyle is entirely optional, but it's a great way to kick off new websites and apps without worrying about initial styles. As you [customize your theme](/docs/theming) with CSS, Restyle will adapt accordingly.

You can think of Restyle as a smarter, prettier user agent stylesheet. And you can use it along with everything else Quiet has to offer or entirely on its own!

## Usage

To add Restyle to your app, add the following markup to the `<head>` of your document. If you haven't included a theme yet, make sure to add the default theme as well.

```html
<!-- Default theme (if not already installed) -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/quiet.css' %}">

<!-- Quiet Restyle -->
<link rel="stylesheet" href="{% cdnUrl '/dist/themes/restyle.css' %}">
```

Restyle uses [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to manage specificity. This means your custom styles will automatically take precedence over the library's styles without needing to use `!important` or increase selector specificity.

:::info
Restyle is just a starting point. Feel free to customize any of its styles in your own CSS by overriding the properties you want to change!
:::

## Supported elements

The following section shows the native HTML elements that are supported in Restyle. Feel free to inspect the source to view the markup.

### Headings

Use `<h1>` through `<h6>` to create headings. Headings use `text-wrap: balance` so they look great on all devices.

<quiet-card data-no-outline class="preview">

# Heading level one

## Heading level two

### Heading level three

#### Heading level four

##### Heading level five

###### Heading level six

</quiet-card>

### Paragraphs

Paragraphs have the spacing you would expect and come with `text-wrap: pretty` to prevent orphans.

<quiet-card class="preview">

Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Viverra nam libero justo laoreet. Pellentesque habitant morbi tristique senectus et. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.

Nunc aliquet bibendum enim facilisis gravida neque convallis a. Proin nibh nisl condimentum id venenatis. Ut tristique et egestas quis ipsum suspendisse ultrices. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.

Volutpat blandit aliquam etiam erat velit scelerisque. Non sodales neque sodales ut etiam sit amet. Cras tincidunt lobortis feugiat vivamus at augue eget arcu.

</quiet-card>

### Inline elements

Many inline elements are styled consistently based on theme tokens.

<quiet-card class="preview preview-two-cols">

**bold**

_italic_

<u>underline</u>

<del>delete</del>

<ins>insert</ins>

<s>strike through</s>

<small>small text</small>

subscript<sub>sub</sub>

superscript<sup>sup</sup>

[hyperlinks](#)

`inline code`

==highlighted==

<abbr title="abbreviation">abbreviation</abbr>

[[keyboard]]

</quiet-card>

### Lists

Use `<ol>` and `<ul>` to make ordered and unordered lists.

<quiet-card class="two-columns preview">

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item
4. Fourth item

- First item
- Second item
   - Nested item
   - Another nested item
- Third item
- Fourth item

</quiet-card>

### Block quotes

Use `<blockquote>` to show quotes that stand out.

<quiet-card class="preview">

> Neither the mouse nor the boy was the least bit surprised that each could understand the other. Two creatures who shared a love for web design naturally spoke the same language.

</quiet-card>

### Code blocks

Use `<pre>` for code and other preformatted content.

<quiet-card class="preview">

<pre>// do a thing
export function thing(arg) {
  if (arg) {
    return true;
  } else {
    return false;
  }
}</pre>

</quiet-card>

### Tables

Use `<table>` to display tabular data.

<quiet-card class="preview">
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
      <tr>
        <td>Pellentesque primis</td>
        <td>Aliquam etiam</td>
        <td>Fusce pharetra</td>
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
</quiet-card>

Add `class="striped"` to add stripes to alternating rows.

<quiet-card class="preview">
  <table class="striped">
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
      <tr>
        <td>Pellentesque primis</td>
        <td>Aliquam etiam</td>
        <td>Fusce pharetra</td>
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
</quiet-card>

:::info
Wrap large tables in [`<quiet-scroller>`](/docs/components/scroller) to ensure they work great on mobile devices.
:::

### Details

Use `<details>` and `<summary>` to show expandable content. Use the optional [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#name) attribute to group them, ensuring only one is open at a time.

<quiet-card class="preview">
  <details name="example">
    <summary>Amet nisl purus</summary>
    <p>Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Volutpat blandit aliquam etiam erat velit scelerisque. Non sodales neque sodales ut etiam sit amet. Cras tincidunt lobortis feugiat vivamus at augue eget arcu.</p>
  </details>

  <details name="example">
    <summary>Scelerisque varius</summary>
    <p>Pretium vulputate sapien nec sagittis. Pretium fusce id velit ut. Justo eget magna fermentum iaculis eu non diam phasellus. Purus in mollis nunc sed. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.</p>
  </details>

  <details name="example">
    <summary>A diam sollicitudin</summary>
    <p>Enim diam vulputate ut pharetra sit amet aliquam id diam. Suscipit tellus mauris a diam maecenas sed enim ut sem. Sit amet mattis vulputate enim nulla. Tristique et egestas quis ipsum. Volutpat lacus laoreet non curabitur gravida arcu.</p>
  </details>
</quiet-card>

### Description Lists

Use `<dl>`, `<dt>`, and `<dd>` to create description lists.

<quiet-card class="preview">
  <dl>
    <dt>First definition</dt>
    <dd>Morbi tempus iaculis urna id volutpat lacus. Tincidunt eget nullam non nisi. Viverra mauris in aliquam sem fringilla ut.</dd>
    <dt>Second definition</dt>
    <dd>Vel quam elementum pulvinar etiam non quam lacus suspendisse. Nisl nisi scelerisque eu ultrices vitae auctor eu.</dd>
    <dt>Third definition</dt>
    <dd>Odio facilisis mauris sit amet massa vitae. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Eu ultrices vitae auctor eu augue ut.</dd>
  </dl>
</quiet-card>

### Figures

Use `<figure>` and `<figcaption>` to show self-contained content.

<quiet-card class="preview">
  <figure>
    <img src="https://images.unsplash.com/photo-1570018144715-43110363d70a?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Three gray kittens on a wood floor">
    <figcaption>
      Non curabitur gravida arcu ac tortor dignissim convallis. Aliquet lectus proin nibh nisl condimentum id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.
    </figcaption>
  </figure>
</quiet-card>

### Media

Use `<img>` and `<iframe>` to show images and embedded media. The default aspect ratio of `<iframe>` elements is `9/6`, but feel free to adjust this value using the [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) property.

<quiet-card class="preview">
  <img src="https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten lays on the bed with her head upside down">
  <br>
  <iframe src="https://www.youtube.com/embed/ALGG6ptfLdc?si=03a9K9QigWi2A9Wt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</quiet-card>

### Meters

Use the `<meter>` element to show a value with a known range.

<quiet-card class="preview">
  <meter value="15" min="0" max="100" low="20" high="80" optimum="100">
    15% battery remaining
  </meter>
  <br>
  <meter value="50" min="0" max="100" low="20" high="80" optimum="100">
    50% battery remaining
  </meter>
  <br>
  <meter value="85" min="0" max="100" low="20" high="80" optimum="100">
    85% battery remaining
  </meter>
</quiet-card>

### Progress

Use the `<progress>` element to indicate progress. When no `value` attribute is present, the element becomes indeterminate.

<quiet-card class="preview">
  <progress min="0" max="100" value="50">50%</progress>
  <br>
  <progress>Loading…</progress>
</quiet-card>

### Fieldsets

Use `<fieldset>` and `<legend>` to group and label form controls.

<quiet-card class="preview">
  <fieldset>
    <legend>Legend</legend>
    Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Tincidunt id aliquet risus feugiat in ante. Ac turpis egestas integer eget aliquet nibh praesent tristique magna.
  </fieldset>
</quiet-card>

### Buttons

Use the `<button>` element to create a button. Add the `primary`, `destructive`, or `inverted` class to change its variant. 

<quiet-card class="preview">
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <button type="button">Default</button>
    <button type="button" class="primary">Primary</button>
    <button type="button" class="destructive">Destructive</button>
    <button type="button" class="inverted">Inverted</button>
  </div>
</quiet-card>

Use the `xs`, `sm`, `md`, `lg`, or `xl` class to change the button's size.

<quiet-card class="preview">
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <button type="button" class="xs">xs</button>
    <button type="button" class="sm">sm</button>
    <button type="button" class="md">md</button>
    <button type="button" class="lg">lg</button>
    <button type="button" class="xl">xl</button>
  </div>
</quiet-card>

Add an icon before or after the label, if desired.

<quiet-card class="preview">
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <button type="button"><quiet-icon name="settings"></quiet-icon> Settings</button>
    <button type="button"><quiet-icon name="heart"></quiet-icon> Favorite</button>
    <button type="button"><quiet-icon name="link"></quiet-icon> Open <quiet-icon name="external-link"></quiet-icon></button>
  </div>
</quiet-card>

### Form controls

For consistency, most native form controls are styled to look similar to Quiet form controls. Add the `xs`, `sm`, `md`, `lg`, or `xl` class to `<input>`, `<select>`, and `<textarea>` elements to change their size.

<quiet-card class="preview preview-col">
  <div>
    <label class="xs" for="xs-input">Extra small</label>
    <input class="xs" id="xs-input" type="text" placeholder="xs">
  </div>
  <div>
    <label class="sm" for="sm-input">Small</label>
    <input class="sm" id="sm-input" type="text" placeholder="sm">
  </div>
  <div>
    <label class="md" for="md-input">Medium</label>
    <input class="md" id="md-input" type="text" placeholder="md">
  </div>
  <div>
    <label class="lg" for="lg-input">Large</label>
    <input class="lg" id="lg-input" type="text" placeholder="lg">
  </div>
  <div>
    <label class="xl" for="xl-input">Extra large</label>
    <input class="xl" id="xl-input" type="text" placeholder="xl">
  </div>
</quiet-card>

Use `class="filled"` to make them appear filled.

<quiet-card class="preview preview-col">
  <input type="text" placeholder="Normal">
  <input class="filled" type="text" placeholder="Filled">
</quiet-card>

Various input types are supported via `<input type="...">`, `<select>`, and `<textarea>`.

<quiet-card class="preview preview-col">
  <input type="color" placeholder="Color" value="#787acf">
  <input type="date" placeholder="Date" value="1989-03-12">
  <input type="time" placeholder="Time" value="12:00:00">
  <input type="number" placeholder="Number" value="42" inputmode="numeric">
  <input type="password" placeholder="Password" value="hunter2">
  <input type="range">
  <select name="size" label="Select a size">
    <option value="sm">Small</option>
    <option value="md" selected>Medium</option>
    <option value="lg">Large</option>
  </select>
  <textarea placeholder="Tell us something about yourself" rows="3"></textarea>
  <div>
    <label><input type="radio" name="a" value="1" checked> Option 1</label>
    <label><input type="radio" name="a" value="2"> Option 2</label>
    <label><input type="radio" name="a" value="3"> Option 3</label>
  </div>
  <div>
    <label><input type="checkbox" checked> Feature A</label>
    <label><input type="checkbox"> Feature B</label>
    <label><input type="checkbox"> Feature C</label>
  </div>  
</quiet-card>

### Dialogs

Use the native `<dialog>` to show a dialog.

<quiet-card class="preview">
  <dialog id="restyle-dialog">
    <p>This is a native dialog.</p>
    <footer>
      <button type="button">Close</button>
    </footer>
  </dialog>
  <button type="button" id="open-restyle-dialog">Open dialog</button>
</quiet-card>

<script type="module">
  const dialog = document.getElementById('restyle-dialog');
  const openButton = document.getElementById('open-restyle-dialog');
  const closeButton = dialog.querySelector('button');
  
  openButton.addEventListener('click', () => {
    dialog.showModal();
  });

  closeButton.addEventListener('click', () => {
    dialog.close();
  });
</script>

## Utility classes

Restyle ships with a handful of helpful utility classes. Use `class="..."` to apply them to any HTML element.

- `visually-hidden` - Use when an element must be accessible to assistive technologies like screen readers but should remain hidden in other circumstances.
- `visually-hidden-focusable` - The same as `visually-hidden`, but it will show when the element or any of its children receive focus. Useful for things like "skip to content" links.
- `visually-hidden-label` - Apply this to any Quiet form control that has a `label` part to visually hide the label.
- `visually-hidden-description` - Apply this to any Quiet form control that has a `description` part to visually hide the description.

<style>
  .preview {
    margin-block-end: 2rem;
  }

  .preview-col::part(body) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preview-two-cols {
    @media screen and (min-width: 960px) {
      &::part(body) {
        gap: 2;
        columns: 2;
      }
    }

    ul {
      margin-block-end: 0;
    }
  }
</style>