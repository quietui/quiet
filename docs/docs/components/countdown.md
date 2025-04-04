---
title: Countdown
layout: component
---

```html {.example}
<quiet-countdown
  label="Feeding schedule"
  max-unit="hours"
  delimiter=":"
  style="font-size: 2.5rem;"
  id="countdown__overview"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__overview');

  // Two hours from now
  countdown.date = new Date(Date.now() + 2 * 60 * 60 * 1000);
</script>
```

:::info
If you pass a string to the `date` attribute, always use the [ISO 8601 format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). Otherwise, ambiguous dates such as 01/02/2000 can be parsed as January 2 or February 1 depending on the client's locale.
:::

## Examples

### Providing dates

You must provide the date when the countdown ends. You can pass an ISO 8601-formatted date string, e.g. via [`Date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) to the `date` attribute.

```html
<quiet-countdown date="2028-04-02T00:00:00.000Z"></quiet-countdown>
```

Alternatively, you can set the `date` property to a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object using JavaScript.

```ts
const countdown = document.querySelector('quiet-countdown');

// Quick way to calculate seven days from now
countdown.date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
```

### Adding a label

Use the `label` attribute to give the countdown an accessible label. This won't be displayed on the screen, but it will be announced by assistive devices.

```html {.example}
<quiet-countdown
  label="Rest timer"
  date="2025-04-05 09:00:00"
  max-unit="hours"
  id="countdown__label"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__label');
  
  // 45 minutes from now
  countdown.date = new Date(Date.now() + 45 * 60 * 1000);
</script>
```

### Min and max units

Use the `min-unit` and `max-unit` attributes to control the smallest and largest units that will be displayed. Remaining time will be rolled over to the highest visible unit, e.g. two days will show as 48 hours when `max-unit="hours"`.

```html {.example}
<quiet-countdown
  label="Play session"
  date="2025-04-05 09:00:00"
  min-unit="minutes"
  max-unit="hours"
  id="countdown__min-max"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__min-max');
  
  // 3 hours and 30 minutes from now
  countdown.date = new Date(Date.now() + 3 * 60 * 60 * 1000 + 30 * 60 * 1000);
</script>
```

### Changing the size

Countdowns are sized relative to the current font size. To change the size, set the `font-size` property on the countdown or an ancestor element.

```html {.example}
<quiet-countdown
  label="Appointment"
  date="2025-04-03 14:20:00"
  max-unit="minutes"
  style="font-size: 3rem;"
  id="countdown__size"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__size');
  
  // 20 minutes from now
  countdown.date = new Date(Date.now() + 20 * 60 * 1000);
</script>
```

### Changing unit labels

The default unit labels are localized using [`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames). To show custom labels, provide your own using the appropriate slots.

```html {.example}
<quiet-countdown
  label="Delivery estimate"
  date="2025-04-03 14:40:00"
  max-unit="hours"
  id="countdown__unit-labels"
>
  <span slot="hours">H</span>
  <span slot="minutes">M</span>
  <span slot="seconds">S</span>
</quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__unit-labels');
  
  // 1 hour and 15 minutes from now
  countdown.date = new Date(Date.now() + 1 * 60 * 60 * 1000 + 15 * 60 * 1000);
</script>
```

### Setting a delimiter

Use the `delimiter` attribute to add a character such as `:` between each unit.

```html {.example}
<quiet-countdown
  label="Litter box reminder"
  date="2025-04-04 12:40:00"
  max-unit="hours"
  delimiter=":"
  id="countdown__delimiter"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__delimiter');
  
  // 30 minutes from now
  countdown.date = new Date(Date.now() + 30 * 60 * 1000);
</script>
```

### Starting and resuming

Use the `start()` and `stop()` methods to control the countdown. When calling `start()`, the countdown will restart based on the existing `date`, which may not be desirable. To resume the countdown from the time currently shown, call `start({ resume: true })`. In this case, the `date` property will be adjusted to account for the pause.

```html {.example}
<div id="countdown__starting">
  <quiet-countdown
    label="Treat time"
    date="2025-04-04 12:40:00"
    max-unit="hours"
  ></quiet-countdown>

  <br><br>

  <quiet-button toggle="off">Pause</quiet-button>
</div>

<script>
  const container = document.getElementById('countdown__starting');
  const countdown = container.querySelector('quiet-countdown');
  const button = container.querySelector('quiet-button');

  // 25 minutes from now
  countdown.date = new Date(Date.now() + 25 * 60 * 1000);

  button.addEventListener('click', () => {
    if (button.toggle === 'on') {
      countdown.stop();
    } else {
      countdown.start({ resume: true });
    }
  });
</script>
```

### Localizing values

You can set the `lang` attribute on the countdown to localize the value. Use `grouping` and `valueFormatter` for additional control over formatting. 

```html {.example}
<quiet-countdown
  lang="de"
  label="Trainingseinheit"
  date="2025-04-04 12:40:00"
  max-unit="hours"
  id="countdown__localizing"
></quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__localizing');
  
  // 4 hours from now
  countdown.date = new Date(Date.now() + 4 * 60 * 60 * 1000);
</script>
```

### Styling countdowns

Countdowns come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example}
<quiet-countdown
  label="It's the final countdown 🎶"
  date="2025-04-03 14:40:00"
  max-unit="hours"
  delimiter=":"
  id="countdown__styling"
>
  <span slot="hours">HR</span>
  <span slot="minutes">MIN</span>
  <span slot="seconds">SEC</span>
</quiet-countdown>

<script>
  const countdown = document.getElementById('countdown__styling');
  
  // 1 hour from now
  countdown.date = new Date(Date.now() + 2 * 60 * 60 * 1000);
</script>

<style>
  #countdown__styling {
    font-family: Orbitron, sans-serif;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 0.125em;
    color: white;
    text-shadow: 0 -2px 0 #0001;
    border-radius: 3rem;
    background-image: linear-gradient(
      135deg,
      #1a1a2e 0%,
      #16213e 50%,
      #0f3460 100%
    );
    padding: 2rem;

    &::part(unit) {
      width: 2ch;
    }

    &::part(label) {
      font-size: 1.25rem;
      font-weight: 400;
      color: #4cc9f0;
      text-shadow: none;
    }

    &::part(delimiter) {
      color: #f52385;
      margin-inline: -0.25em;
      opacity: 0.8;
    }

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }
</style>
```

<!-- Font for demos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">