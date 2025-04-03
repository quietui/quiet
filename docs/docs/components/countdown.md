---
title: Countdown
layout: component
---

```html {.example}
<quiet-countdown
  label="Example countdown"
  max-unit="hours"
  end-date="2025-04-02 23:18:00" 
  style="font-size: 2rem;"
></quiet-countdown>
```

:::info
If you pass a string to the `start-date` or `end-date` attributes, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Providing dates

You can control when the countdown starts and when it ends using the `start-date` and `end-date` attributes. Use an ISO 8601-formatted date, or set the `startDate` and `endDate` properties to a `Date` object using JavaScript.

If no start date is set, the current time is assumed. You must provide an end date, otherwise the countdown will display zeros.

TODO

### Adding a label

Use the `label` attribute to give the countdown an accessible label. This won't be displayed on the screen, but it will be announced by assistive devices.

TODO

### Min and max units

TODO

### Changing unit labels

The default unit labels are localized using [`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames). To show custom labels, provide your own using the appropriate slots.

TODO

### Changing the size

Countdowns are sized relative to the current font size. To change the size, set the `font-size` property on the countdown or an ancestor element.

TODO

### Starting and stopping

Use the `start()` and `stop()` methods to control the countdown. When calling `start()`, the countdown will resume based on the existing end date. To resume the countdown from its current position and update the end date accordingly, call `start({ resume: true })`.

TODO

### Localizing

Use the `lang` attribute to localize the countdown.

TODO

### Styling

TODO - cool 3D font and colors over mesh gradient