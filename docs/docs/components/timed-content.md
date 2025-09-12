---
title: Timed Content
layout: component
---

```html {.example}
<quiet-timed-content id="timed__overview">
  <div>
    <img src="https://images.unsplash.com/photo-1668303656123-54ae65ad75ee?q=80&w=2818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A cat curled up asleep in the moonlight">
    <small>It's before noon, the cats are still sleeping</small>
  </div>

  <div slot="after">
    <img src="https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A cat laying in the daylight">
    <small>It's past noon, the cats are out and about</small>
  </div>
</quiet-timed-content>

<script>
  // Obtain a reference
  const timedContent = document.getElementById('timed__overview');

  // Get today's date
  const today = new Date();
  
  // Set the start date to 12am today and the end date to 12pm today
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);

  // Set the start and end dates
  timedContent.startDate = startDate;
  timedContent.endDate = endDate;
</script>

<style>
  #timed__overview {
    img {
      margin-block-end: 0.5rem;
    }

    small {
      display: block;
      text-align: center;
    }
  }
</style>
```

:::info
If you pass a string to the `start-date` or `end-date` attributes, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Providing dates

The most common use case is showing content during a specific period of time. Use the `start-date` and `end-date` attributes to tell the component when to show the content.

```html
<quiet-timed-content 
  start-date="2025-12-01T00:00:00.000Z" 
  end-date="2025-12-31T23:59:59.999Z"
>
  <p>Holiday Sale! All catnip toys are 50% off!</p>
</quiet-timed-content>
```

You can also pass a `Date` object to the `startDate` and `endDate` properties.

```html
<quiet-timed-content>
  <p>Holiday Sale! All catnip toys are 50% off!</p>
</quiet-timed-content>

<script>
  const timedContent = document.querySelector('quiet-timed-content');

  timedContent.startDate = new Date('2025-12-01T00:00:00.000Z');
  timedContent.endDate = new Date('2025-12-31T23:59:59.999Z');
</script>
```

:::warn
If you specify a date without a timezone, e.g. `2025-12-01`, it will be interpreted in the user's local timezone. To ensure consistent behavior across timezones, include explicit timezone information in your dates, e.g. `2025-12-01T00:00:00Z` for UTC, or be aware that users in different timezones may see content transitions at different times.
:::

### Before and after slots

Use the `before` and `after` slots to show different content outside of the specified date range. The `before` slot shows when the current date is before the start date, and the `after` slot shows when the current date is after the end date.

```html
<quiet-timed-content 
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
</quiet-timed-content>
```

### Start date only

When only the `start-date` is provided, content will show from that date forward. This is useful for feature launches or permanent changes that take effect on a specific date.

```html
<quiet-timed-content start-date="2025-06-15">
  <p>New feature is now available!</p>
  
  <div slot="before">
    <p>New feature coming June 15th!</p>
  </div>
</quiet-timed-content>
```

### End date only

When only the `end-date` is provided, content will show up until that date. This is useful for limited-time offers or deprecation notices.

```html
<quiet-timed-content end-date="2025-03-31">
  <p>The legacy API is available until March 31</p>
  
  <div slot="after">
    <p>The legacy API has been discontinued</p>
  </div>
</quiet-timed-content>
```

### Enabling live updates

By default, the component will render the content based on the time the page was first loaded. To update the component dynamically as time passes, add the `live` attribute. For performance, live updates only occur every 60 seconds.

```html
<quiet-timed-content 
 start-date="2025-05-31T14:30:00.000Z" 
 end-date="2025-05-31T14:35:00.000Z"
 live
>
  <p>Flash sale happening now! ⚡</p>
  <p slot="before">Flash sale starts at 2:30 PM UTC</p>
  <p slot="after">Flash sale ended at 2:35 PM UTC</p>
</quiet-timed-content>
```
