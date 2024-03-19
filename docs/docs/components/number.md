---
title: Number
layout: component
---

```html {.example}
<quiet-number number="10000000"></quiet-number>
```

## Examples

### Grouping

The formatter groups numbers with thousands separators by default. To turn it off, set the `grouping` attribute to `never`.

```html {.example}
<quiet-number grouping="never" number="10000000"></quiet-number><br>
```

### Currency

To format currency, set `type="currency"` and apply the appropriate [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code to the `currency` attribute.

```html {.example}
<quiet-number type="currency" currency="USD" number="25000"></quiet-number><br>
<quiet-number type="currency" currency="EUR" number="25000"></quiet-number><br>
<quiet-number type="currency" currency="RUB" number="25000"></quiet-number>
```

### Percentages

To format a percentage, set `type="percent"`.

```html {.example}
<quiet-number type="percent" number="0"></quiet-number><br>
<quiet-number type="percent" number="0.5"></quiet-number><br>
<quiet-number type="percent" number="1"></quiet-number><br>
```

### Units

You can format a variety of different units. [Possible values can be found here.](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers)

```html {.example}
<quiet-number type="unit" unit="kilobyte" number="5.1"></quiet-number><br>
<quiet-number type="unit" unit="megabyte" number="3.45"></quiet-number><br>
<quiet-number type="unit" unit="centimeter" number="2.54"></quiet-number><br>
<quiet-number type="unit" unit="inch" number="1"></quiet-number><br>
<quiet-number type="unit" unit="fahrenheit" number="75"></quiet-number><br>
<quiet-number type="unit" unit="celsius" number="24"></quiet-number><br>
```

### Localization

Set the `lang` attribute on the element to change the language.

```html {.example}
<quiet-number lang="en" number="100000000"></quiet-number><br>
<quiet-number lang="de" number="100000000"></quiet-number><br>
<quiet-number lang="ru" number="100000000"></quiet-number>
```

:::info
This component also updates based on the page's language, which can be set using `<html lang="…">`.
:::

