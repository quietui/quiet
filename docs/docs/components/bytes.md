---
title: Bytes
layout: component
---

```html {.example}
<quiet-bytes value="240000000"></quiet-bytes>
```

## Examples

### Formatting bytes

Set the `value` attribute to indicate the number of bytes to format.

```html {.example}
<quiet-bytes value="68000"></quiet-bytes>
```

### Formatting bits

Set the `unit` attribute to `bit` to output bits instead of bytes.

```html {.example}
<quiet-bytes value="42000000000" unit="bit"></quiet-bytes>
```

### Localizing output

Use the `lang` attribute to format the output in a different locale.

```html {.example}
<quiet-bytes value="12300000" lang="en"></quiet-bytes><br>
<quiet-bytes value="12300000" lang="es"></quiet-bytes><br>
<quiet-bytes value="12300000" lang="de"></quiet-bytes><br>
<quiet-bytes value="12300000" lang="ru"></quiet-bytes>
```