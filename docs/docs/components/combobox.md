---
title: Combobox
layout: component
---

```html {.example}
<quiet-combobox
  label="Select a cat breed"
  description="Choose your favorite"
  placeholder="Search breeds"
  with-clear
>
  <quiet-combobox-item value="persian" selected>Persian</quiet-combobox-item>
  <quiet-combobox-item value="maine-coon">Maine Coon</quiet-combobox-item>
  <quiet-combobox-item value="siamese">Siamese</quiet-combobox-item>
</quiet-combobox>
```

## Examples

TODO

### Multiselect

```html {.example}
<quiet-combobox
  label="Select cat behaviors"
  description="Choose all that apply"
  placeholder="Search behaviors"
  multiple
  with-clear
>
  <quiet-combobox-item value="purring" selected>Purring</quiet-combobox-item>
  <quiet-combobox-item value="kneading">Kneading</quiet-combobox-item>
  <quiet-combobox-item value="chirping" selected>Chirping</quiet-combobox-item>
  <quiet-combobox-item value="head-bunting">Head bunting</quiet-combobox-item>
  <quiet-combobox-item value="slow-blinking">Slow blinking</quiet-combobox-item>
</quiet-combobox>
```

### Sizes

```html {.example}
<quiet-combobox
  label="Extra small"
  description="Cat colors"
  size="xs"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Small"
  description="Cat colors"
  size="sm"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Medium"
  description="Cat colors"
  size="md"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Large"
  description="Cat colors"
  size="lg"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Extra large"
  description="Cat colors"
  size="xl"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>
```
