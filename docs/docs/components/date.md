---
title: Date
layout: component
---

```html {.example}
<quiet-date></quiet-date>
```

:::info
If you pass a string to the `date` attribute, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Simple formatting

This component supports most options from [`Intl.DateTimeFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) in a declarative syntax. It's very flexible, but it can be a bit verbose to output a simple date or time with individual properties. Fortunately, there are two shortcuts you can use to easily output dates and times in desirable formats.

The `date-style` and `time-style` attributes both accept `full`, `long`, `medium`, and `short` as options. These attributes can be used together, but they cannot be combined with other date-time formatting options.

```html {.example}
<h4>Date style</h4>
<quiet-date date-style="short" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="medium" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="long" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="full" date="2024-01-01 12:00:00"></quiet-date>

<h4>Time style</h4>
<quiet-date time-style="short" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date time-style="medium" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date time-style="long" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date time-style="full" date="2024-01-01 12:00:00"></quiet-date>

<h4>Date + time style</h4>
<quiet-date date-style="short" time-style="short" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="medium" time-style="medium" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="long" time-style="long" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date date-style="full" time-style="full" date="2024-01-01 12:00:00"></quiet-date>
```

### Advanced formatting

More advanced formatting can be achieved through other formatting properties. The presence of an option tells the component to output a corresponding value.

To show the current time with hours and minutes using a 24 hour clock, use the `hour`, `minute`, and `hour-format` attributes.

```html {.example}
<quiet-date hour="numeric" minute="numeric" hour-format="24"></quiet-date>
```

Similarly, to show a date with just the month and day, use the `month` and `day` attributes.

```html {.example}
<quiet-date month="long" day="numeric"></quiet-date>
```

You can combine options to format a more complex date. The order of the attributes doesn't matter. The output will be rendered in a logical order.

```html {.example}
<quiet-date weekday="long" month="short" day="numeric" year="numeric"></quiet-date>
```

:::info
Refer to the [`Intl.DateTimeFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) documentation for more information about what options do and the values they accept.
:::


### Localization

Set the `lang` attribute on the element to change the language.

```html {.example}
<quiet-date lang="es" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date lang="de" date="2024-01-01 12:00:00"></quiet-date><br>
<quiet-date lang="ru" date="2024-01-01 12:00:00"></quiet-date>
```

:::info
This component also updates based on the page's language, which can be set using `<html lang="…">`.
:::
