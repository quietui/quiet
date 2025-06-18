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

The following sections demonstrate the native HTML elements that are supported by Restyle.

:::info
Restyle is just a starting point. Feel free to customize any of its styles in your own CSS by overriding the properties you want to change!
:::

## Typography & text flow

### Headings

Use `<h1>` through `<h6>` to create headings. Headings use `text-wrap: balance` so they look great on all devices.

```html {.example .no-edit}
<h1>Heading level one</h1>
<h2>Heading level two</h2>
<h3>Heading level three</h3>
<h4>Heading level four</h4>
<h5>Heading level five</h5>
<h6>Heading level six</h6>
```

### Paragraphs

Paragraphs have the spacing you would expect and come with `text-wrap: pretty` to prevent orphans.

```html {.example .no-edit}
<p>Whiskers twitching in delight as sunbeams dance across the windowsill. The majestic feline stretches lazily, claiming every patch of warmth as their royal throne. Our fluffy overlord surveys their domain with golden eyes, occasionally blessing nearby humans with a slow, contented blink.</p>
<p>A mysterious cardboard box appears in the living room, immediately becoming the most fascinating object in existence. The cat performs elaborate acrobatics to squeeze into this new fortress, despite it being clearly too small. Their proud expression suggests they've discovered the eighth wonder of the world.</p>
<p>Suddenly, the dreaded red dot appears on the wall! All dignity is forgotten as our feline friend launches into an elaborate hunting dance, bouncing off furniture and defying the laws of physics. No surface is safe from the mighty hunter's pursuit.</p>
```

### Inline elements

Inline elements are styled consistently based on design tokens.

```html {.example .no-edit}
<div class="two-columns" style="line-height: 3;">
  <div>
    <strong>bold</strong>
  </div>
  <div>
    <em>italic</em>
  </div>
  <div>
    <u>underline</u>
  </div>
  <div>
    <del>delete</del>
  </div>
  <div>
    <ins>insert</ins>
  </div>
  <div>
    <s>strike through</s>
  </div>
  <div>
    <small>small text</small>
  </div>
  <div>
    subscript<sub>sub</sub>
  </div>
  <div>
    superscript<sup>sup</sup>
  </div>
  <div>
    <a href="#">hyperlinks</a>
  </div>
  <div>
    <code>inline code</code>
  </div>
  <div>
    <mark>highlighted</mark>
  </div>
  <div>
    <abbr title="abbreviation">abbreviation</abbr>
  </div>
  <div>
    <kbd>keyboard</kbd>
  </div>
</div>
```

### Lists

Use `<ol>` and `<ul>` to make ordered and unordered lists.

```html {.example .no-edit}
<div class="two-columns">
  <ol>
    <li>First item</li>
    <li>Second item
      <ol>
        <li>Nested item</li>
        <li>Another nested item</li>
      </ol>
    </li>
    <li>Third item</li>
    <li>Fourth item</li>
  </ol>

  <ul>
    <li>First item</li>
    <li>Second item
      <ul>
        <li>Nested item</li>
        <li>Another nested item</li>
      </ul>
    </li>
    <li>Third item</li>
    <li>Fourth item</li>
  </ul>
</div>
```

### Block quotes

Use `<blockquote>` to show quotes that stand out.

```html {.example .no-edit}
<blockquote>
  Neither the mouse nor the boy was the least bit surprised that each could understand the other. Two creatures who shared a love for web design naturally spoke the same language.
</blockquote>
```

### Code blocks

Use `<pre>` for code and other preformatted content.

```html {.example .no-edit}
<pre>// do a thing
export function thing(arg) {
  if (arg) {
    return true;
  } else {
    return false;
  }
}</pre>
```

### Description Lists

Use `<dl>`, `<dt>`, and `<dd>` to create description lists.

```html {.example .no-edit}
<dl>
  <dt>First definition</dt>
  <dd>Morbi tempus iaculis urna id volutpat lacus. Tincidunt eget nullam non nisi. Viverra mauris in aliquam sem fringilla ut.</dd>
  <dt>Second definition</dt>
  <dd>Vel quam elementum pulvinar etiam non quam lacus suspendisse. Nisl nisi scelerisque eu ultrices vitae auctor eu.</dd>
  <dt>Third definition</dt>
  <dd>Odio facilisis mauris sit amet massa vitae. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Eu ultrices vitae auctor eu augue ut.</dd>
</dl>
```

## Content containers & media

### Figures

Use `<figure>` and `<figcaption>` to show self-contained content.

```html {.example .no-edit}
<figure>
  <img src="https://images.unsplash.com/photo-1570018144715-43110363d70a?q=80&w=512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Three gray kittens on a wood floor">
  <figcaption>
    Non curabitur gravida arcu ac tortor dignissim convallis. Aliquet lectus proin nibh nisl condimentum id. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed.
  </figcaption>
</figure>
```

### Media

Use `<img>` and `<iframe>` to show images and embedded media. Media uses `display: block` and spans the full width of its container, but you can override the width as needed. The default aspect ratio of `<iframe>` elements is `9/6`, but feel free to adjust this value using the [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) property.

```html {.example .no-edit}
<img src="https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A kitten lays on the bed with her head upside down">
<br>
<iframe src="https://www.youtube.com/embed/ALGG6ptfLdc?si=03a9K9QigWi2A9Wt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
```

### Tables

Use `<table>` to display tabular data.

```html {.example .no-edit}
<table>
  <caption>Table caption</caption>
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
```

Add `class="quiet-striped"` to add stripes to alternating rows.

```html {.example .no-edit}
<table class="quiet-striped">
  <caption>Table caption</caption>
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
```

:::info
Wrap large tables in [`<quiet-scroller>`](/docs/components/scroller) to ensure they work great on mobile devices.
:::

### Details

Use `<details>` and `<summary>` to show expandable content. The optional [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#name) attribute lets you group them, ensuring only one is open at a time.

```html {.example .no-edit}
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
```

### Dialogs

Use the native `<dialog>` to show a dialog.

```html {.example .no-edit}
<dialog id="restyle-dialog">
  <p>This is a native dialog.</p>
  <footer>
    <button type="button">Close</button>
  </footer>
</dialog>
<button type="button" id="open-restyle-dialog">Open dialog</button>
```

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

## Measurement & progress

### Meters

Use the `<meter>` element to show a value with a known range.

```html {.example .flex-col .no-edit}
<meter value="15" min="0" max="100" low="20" high="80" optimum="100">
  15% battery remaining
</meter>

<meter value="50" min="0" max="100" low="20" high="80" optimum="100">
  50% battery remaining
</meter>

<meter value="85" min="0" max="100" low="20" high="80" optimum="100">
  85% battery remaining
</meter>
```

### Progress

Use the `<progress>` element to indicate progress. When no `value` attribute is present, the element becomes indeterminate.

```html {.example .flex-col .no-edit}
<progress min="0" max="100" value="50">50%</progress>

<progress>Loading…</progress>
```

## Forms

### Buttons

Use the `<button>` element to create a button. Add the `quiet-primary` or `quiet-destructive` class to change its variant. 

```html {.example .no-edit}
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <button type="button">Default</button>
  <button type="button" class="quiet-primary">Primary</button>
  <button type="button" class="quiet-destructive">Destructive</button>
</div>
```

Use the `quiet-xs`, `quiet-sm`, `quiet-md`, `quiet-lg`, and `quiet-xl` classes to change the button's size.

```html {.example .no-edit}
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <button type="button" class="quiet-xs">xs</button>
  <button type="button" class="quiet-sm">sm</button>
  <button type="button" class="quiet-md">md</button>
  <button type="button" class="quiet-lg">lg</button>
  <button type="button" class="quiet-xl">xl</button>
</div>
```

Add an icon before or after the label, if desired.

```html {.example .no-edit}
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <button type="button"><quiet-icon name="settings"></quiet-icon> Settings</button>
  <button type="button"><quiet-icon name="heart"></quiet-icon> Favorite</button>
  <button type="button"><quiet-icon name="link"></quiet-icon> Open <quiet-icon name="external-link"></quiet-icon></button>
</div>
```

Use the `quiet-pill` class to make rounded pill buttons.

```html {.example .no-edit}
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <button type="button" class="quiet-pill">Default</button>
  <button type="button" class="quiet-pill quiet-primary">Primary</button>
  <button type="button" class="quiet-pill quiet-destructive">Destructive</button>
</div>
```

### Form controls

For consistency, most native form controls are styled to look similar to Quiet form controls. Add the `quiet-xs`, `quiet-sm`, `quiet-md`, `quiet-lg`, and `quiet-xl` classes to `<input>`, `<select>`, and `<textarea>` elements to change their size.

```html {.example .flex-col .no-edit}
<div>
  <label class="quiet-xs" for="xs-input">Extra small</label>
  <input class="quiet-xs" id="xs-input" type="text" placeholder="xs">
</div>

<div>
  <label class="quiet-sm" for="sm-input">Small</label>
  <input class="quiet-sm" id="sm-input" type="text" placeholder="sm">
</div>

<div>
  <label class="quiet-md" for="md-input">Medium</label>
  <input class="quiet-md" id="md-input" type="text" placeholder="md">
</div>

<div>
  <label class="quiet-lg" for="lg-input">Large</label>
  <input class="quiet-lg" id="lg-input" type="text" placeholder="lg">
</div>

<div>
  <label class="quiet-xl" for="xl-input">Extra large</label>
  <input class="quiet-xl" id="xl-input" type="text" placeholder="xl">
</div>
```

Various input types are supported via `<input type="...">`, `<select>`, and `<textarea>`.

```html {.example .flex-col .no-edit}
<input type="color" placeholder="Color" value="#787acf">
<input type="date" placeholder="Date" value="1989-03-12">
<input type="time" placeholder="Time" value="12:00:00">
<input type="number" placeholder="Number" value="42" inputmode="numeric">
<input type="password" placeholder="Password" value="hunter2">

<input type="range">

<select name="pet" label="Pick one">
  <option value="cats" selected>Cats</option>
  <option value="cats">More cats</option>
  <option value="cats">Even more cats</option>
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
```

Use `class="quiet-filled"` to make the following form controls appear filled.

```html {.example .flex-col .no-edit}
<input class="quiet-filled" type="text" placeholder="Filled">

<select class="quiet-filled" name="pet" label="Pick one">
  <option value="cats" selected>Cats</option>
  <option value="cats">More cats</option>
  <option value="cats">Even more cats</option>
</select>

<textarea class="quiet-filled" type="text" placeholder="Filled" rows="3"></textarea>

<div>
  <label><input class="quiet-filled" type="checkbox" checked> Fill it up</label>
  <label><input class="quiet-filled" type="checkbox"> Top it off</label>
</div>

<div>
  <label><input class="quiet-filled" type="radio" name="b" checked> Fill it up</label>
  <label><input class="quiet-filled" type="radio" name="b"> Top it off</label>
</div>
```

Use `class="quiet-pill"` to make `<input>` and `<select>` appear pill-shaped.

```html {.example .flex-col .no-edit}
<input class="quiet-pill" type="text" placeholder="Filled">

<select class="quiet-pill" name="pet" label="Pick one">
  <option value="cats" selected>Cats</option>
  <option value="cats">More cats</option>
  <option value="cats">Even more cats</option>
</select>
```

### Fieldsets

Use `<fieldset>` and `<legend>` to group and label form controls.

```html {.example .no-edit}
<fieldset>
  <legend>Legend</legend>
  Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Tincidunt id aliquet risus feugiat in ante. Ac turpis egestas integer eget aliquet nibh praesent tristique magna.
</fieldset>
```

<img class="whiskers-center" src="/assets/images/whiskers/wizard.svg" alt="Whiskers the mouse dressed as a wizard">
