---
title: Lorem Ipsum
layout: component
---

Placeholder text, commonly referred to as [lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum), is useful for displaying the visual form of a document without using actual content. You can use this component instead of copying and pasting large quantities of text from online generators.

Unless you [provide a seed](#seeding-the-generator), each refresh will yield unique content, allowing you to test the flexibility of your designs. The default behavior outputs a few sentences.

```html {.example}
<quiet-lorem-ipsum></quiet-lorem-ipsum>
```

## Examples

### Titles & headings

Set the `type` attribute to `title` to generate text suitable for a title or heading. The `length` attribute controls how many words will be output.

```html {.example}
<h4><quiet-lorem-ipsum type="title" length="2-6"></quiet-lorem-ipsum></h4>
```

:::info
Some attributes herein allow you to specify a minimum and maximum range using the `{min}-{max}` syntax, e.g. `length="2-6"`.
:::

### Sentences

Set the `type` attribute to `sentence` to generate sentences. The `length` attribute controls how many sentences are generated. You can specify how many words are in each sentence with the `words-per-sentence` attribute.

```html {.example}
<quiet-lorem-ipsum type="sentence" length="2-3"></quiet-lorem-ipsum>
```

### Paragraphs

Set the `type` attribute to `paragraph` to generate HTML paragraphs. The `length` attribute controls how many paragraphs are generated. Additional fine tuning can be done with the `words-per-sentence` and `sentences-per-paragraph` attributes.

```html {.example}
<quiet-lorem-ipsum type="paragraph" length="2-4"></quiet-lorem-ipsum>
```

### Lists

Set the `type` attribute to `ol` or `ul` to generate HTML lists. The `length` attribute controls how many list items are generated. The number of words in each list item can be controlled with the `words-per-sentence` attribute.

```html {.example}
<quiet-lorem-ipsum type="ol" length="3-6" words-per-sentence="2-3"></quiet-lorem-ipsum>
<br>
<quiet-lorem-ipsum type="ul" length="3-6" words-per-sentence="2-3"></quiet-lorem-ipsum>
```

### Seeding the generator

By default, the generator will produce random content every time it runs. If you want to force the output to be the same every time, provide a seed number using the `seed` attribute.

```html {.example}
<quiet-slider 
  label="Seed" 
  min="10" 
  max="50"
  step="10"
  value="30" 
  with-markers 
  with-tooltip 
  style="margin-block-end: 2rem;"
></quiet-slider>
<quiet-lorem-ipsum seed="30" id="lorem-ipsum__seed"></quiet-lorem-ipsum>

<script>
  const loremIpsum = document.getElementById('lorem-ipsum__seed');
  const slider = loremIpsum.previousElementSibling;

  slider.addEventListener('quiet-input', () => loremIpsum.seed = slider.value);
</script>
```

<style>
  /* For the demos */
  quiet-lorem-ipsum :last-child {
    margin-block-end: 0;
  }
</style>