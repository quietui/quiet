---
title: Between
layout: component
---

```html {.example}
<quiet-between id="between__overview" live>
  <p>It's national Cat Day! 😸</p>

  <p slot="before">This will show <em>before</em> National Cat Day (October 29)</p>
  <p slot="after">This will show <em>after</em> National Cat Day (October 29)</p>
</quiet-between>

<script>
  const between = document.getElementById('between__overview');

  // Get Date objects for the current year's National Cat Day
  const currentYear = new Date().getFullYear();
  const catDayStart = new Date(currentYear, 9, 29).setHours(0, 0, 0, 0); // October = 9
  const catDayEnd = new Date(currentYear, 9, 29).setHours(23, 59, 59, 999);

  between.startDate = new Date(catDayStart);
  between.endDate = new Date(catDayEnd);
</script>
```

:::info
If you pass a string to the `start-date` or `end-date` attributes, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Providing dates

The most common use case is showing content during a specific period of time. Use the `start-date` and `end-date` attributes to tell the component when to show the content.

```html
<quiet-between 
  start-date="2025-12-01T00:00:00.000Z" 
  end-date="2025-12-31T23:59:59.999Z"
>
  <p>Holiday Sale! All catnip toys are 50% off!</p>
</quiet-between>
```

You can also pass a `Date` object to the `startDate` and `endDate` properties.

```html
<quiet-between>
  <p>Holiday Sale! All catnip toys are 50% off!</p>
</quiet-between>

<script>
  const between = document.querySelector('quiet-between');

  between.startDate = new Date('2025-12-01T00:00:00.000Z');
  between.endDate = new Date('2025-12-31T23:59:59.999Z');
</script>
```

:::warn
If you specify a date without a timezone, e.g. `2025-12-01`, it will be interpreted in the user's local timezone. To ensure consistent behavior across timezones, include explicit timezone information in your dates, e.g. `2025-12-01T00:00:00Z` for UTC, or be aware that users in different timezones may see content transitions at different times.
:::

### Before and after slots

Use the `before` and `after` slots to show different content outside of the specified date range. The `before` slot shows when the current date is before the start date, and the `after` slot shows when the current date is after the end date.

```html
<quiet-between 
  start-date="2025-08-15" 
  end-date="2025-08-17"
>
  <div>
    <h3>Sale</h3>
    <p>25% off all premium cat food!</p>
  </div>
  
  <div slot="before">
    <h3>Sale Coming Soon</h3>
    <p>Cat food sale begins August 15th!</p>
  </div>
  
  <div slot="after">
    <h3>Sale Ended</h3>
    <p>Thanks for treating your cats during our promotion!</p>
  </div>
</quiet-between>
```

### Start date only

When only the `start-date` is provided, content will show from that date forward. This is useful for feature launches or permanent changes that take effect on a specific date.

```html
<quiet-between start-date="2025-06-15">
  <p>New feature is now available!</p>
  
  <div slot="before">
    <p>New feature coming June 15th!</p>
  </div>
</quiet-between>
```

### End date only

When only the `end-date` is provided, content will show up until that date. This is useful for limited-time offers or deprecation notices.

```html
<quiet-between end-date="2025-03-31">
  <p>The legacy API is available until March 31</p>
  
  <div slot="after">
    <p>The legacy API has been discontinued</p>
  </div>
</quiet-between>
```

### Enabling live updates

By default, the component will render the content based on the time the page was first loaded. To update the component dynamically as time passes, add the `live` attribute. For performance, live updates only occur every 60 seconds.

```html
<quiet-between 
 start-date="2025-05-31T14:30:00.000Z" 
 end-date="2025-05-31T14:35:00.000Z"
 live
>
  <p>Flash sale happening now! ⚡</p>
  <p slot="before">Flash sale starts at 2:30 PM UTC</p>
  <p slot="after">Flash sale ended at 2:35 PM UTC</p>
</quiet-between>
```
