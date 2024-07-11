---
title: Relative Time
layout: component
---

```html {.example}
<quiet-relative-time date="2024-02-02 12:39:00"></quiet-relative-time>
```

:::info
If you pass a string to the `date` attribute, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Changing the format

You can change how the time is displayed with the `format` attribute. Available options include `narrow`, `short`, and `long`.

```html {.example}
<quiet-relative-time format="narrow" date="2024-01-01 12:00:00"></quiet-relative-time><br>
<quiet-relative-time format="short" date="2024-01-01 12:00:00"></quiet-relative-time><br>
<quiet-relative-time format="long" date="2024-01-01 12:00:00"></quiet-relative-time>
```

### Using date object

If you have a reference to the element, you can pass a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instead of a string.

```html {.example}
<quiet-relative-time id="relative-time__objects"></quiet-relative-time>

<script>
  const relativeTime = document.getElementById('relative-time__objects');

  relativeTime.date = new Date(Date.now() - 10 * 60 * 1000); // 10 mins ago
</script>
```

### Updating live

Add the `live` attribute to automatically update the time as it passes.

```html {.example}
<quiet-relative-time live id="relative-time__live"></quiet-relative-time>

<br><br>

<quiet-button>Reset</quiet-button>

<script>
  const relativeTime = document.getElementById('relative-time__live');
  const button = relativeTime.parentElement.querySelector('quiet-button');

  relativeTime.date = new Date(Date.now());

  button.addEventListener('quiet-click', () => {
    relativeTime.date = new Date();
  });
</script>
```

### Localizing dates

Set the `lang` attribute on the element to change the language.

```html {.example}
<quiet-relative-time lang="es" date="2024-01-01 12:00:00"></quiet-relative-time><br>
<quiet-relative-time lang="de" date="2024-01-01 12:00:00"></quiet-relative-time><br>
<quiet-relative-time lang="ru" date="2024-01-01 12:00:00"></quiet-relative-time>
```

:::info
This component also updates based on the page's language, which can be set using `<html lang="…">`.
:::