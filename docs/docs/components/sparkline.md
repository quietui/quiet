---
title: Sparkline
layout: component
---

```html {.example}
<quiet-sparkline 
  label="Number of cat treats given per day showing an increasing trend"
  data="10 20 40 25 35 25 60 50 70"
  style="height: 40px;"
></quiet-sparkline>
```

:::info
In the same way that images require `alt` text, you should add a label to every sparkline. The label won't be displayed, but it will be announced by assistive devices.
:::

## Examples

## Changing the size

By default, sparklines are styled with a `1em` height to fit properly within headings and text.

```html {.example}
<p>
  This week's website traffic
  <quiet-sparkline 
    label="Website traffic showing a slightly positive trend"
    data="10 16 12 18 30"
  ></quiet-sparkline>  
  has slightly increased.
</p>
```

To set a specific size, adjust the `width`, `height`, or `aspect-ratio` CSS properties.

```html {.example}
<quiet-sparkline 
  label="Monthly cat toy purchases showing increased spending over time"
  data="10 20 40 25 35 25 60 50 70" 
  style="width: 100%; height: auto;"
></quiet-sparkline>
```

## Changing the appearance

By default, sparklines render with a gradient fill. Set the `appearance` attribute to `solid` or `line` to render a solid fill or a simple line instead.

```html {.example .flex-row}
<quiet-sparkline 
  appearance="gradient"
  label="Weekly cat food consumption showing typical feeding patterns"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
  trend="auto"
></quiet-sparkline>

<quiet-sparkline 
  appearance="solid"
  label="Weekly cat food consumption showing typical feeding patterns"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
  trend="auto"
></quiet-sparkline>

<quiet-sparkline 
  appearance="line"
  label="Weekly cat food consumption showing typical feeding patterns"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
  trend="auto"
></quiet-sparkline>
```

## Curves

Set the `curve` attribute to `linear`, `natural`, or `step` to change the style of the curve.

```html {.example .flex-row}
<quiet-sparkline 
  label="Hourly cat meows tracked throughout the day using a linear curve"
  curve="linear"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
></quiet-sparkline>

<quiet-sparkline 
  label="Hourly cat meows tracked throughout the day using a natural curve"
  curve="natural"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
></quiet-sparkline>

<quiet-sparkline 
  label="Hourly cat meows tracked throughout the day using a step curve"
  curve="step"
  data="10 20 40 25 35 25 60 50 70" 
  style="height: 40px;"
></quiet-sparkline>
```

## Showing trends

Set the `trend` attribute to `negative`, `neutral`, or `positive` to visually indicate a trend.

```html {.example .flex-row}
<!-- Negative trend -->
<quiet-sparkline 
  label="Decreasing trend in scratching post usage"
  data="70 75 60 50 55 35 25" 
  trend="negative"
  style="height: 40px;"
></quiet-sparkline>

<!-- Neutral trend -->
<quiet-sparkline 
  label="Stable pattern of cat litter box visits"
  data="45 50 42 48 44 46 45" 
  trend="neutral"
  style="height: 40px;"
></quiet-sparkline>

<!-- Positive trend -->
<quiet-sparkline 
  label="Increasing frequency of purring episodes"
  data="25 35 30 50 45 65 75" 
  trend="positive"
  style="height: 40px;"
></quiet-sparkline>
```

## Styling sparklines

Use the `--fill-color`, `--line-color`, and `--line-width` custom properties to change the sparkline's styles.

```html {.example}
<quiet-sparkline 
  label="Weekly likes for cat memes growing in popularity"
  data="10 20 40 25 35 25 60 50 70"
  style="
    height: 60px;
    --fill-color: deeppink;
    --line-color: deeppink;
    --line-width: 3px;
  "
></quiet-sparkline>
```

Combine sparklines with [cards](/docs/components/card) and [number tickers](/docs/components/number-ticker) for an elegant way to display stats.

```html {.example}
<quiet-card class="sparkline__stat">
  <div class="description">
    <small>Revenue</small><br>
    $<quiet-number-ticker end-value="12345" start-on-view></quiet-number-ticker>
  <div>
  <quiet-sparkline 
    label="Number of cat treats given per day showing an increasing trend"
    data="10 20 17 23 27 22 30 38 44"
    curve="natural"
    appearance="solid"
  ></quiet-sparkline>
</quiet-card>

<style>
  quiet-card.sparkline__stat {
    max-width: 280px;

    &::part(body) {
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .description {
      font-size: 2.25rem;
      font-weight: var(--quiet-font-weight-semibold);
      line-height: 1.2;
      padding: .5rem 1.5rem 0 1.5rem;
    }

    small {
      font-weight: var(--quiet-font-weight-normal);
      font-size: 0.9375rem;
      color: var(--quiet-text-muted);
    }

    quiet-sparkline {
      width: 100%;
      height: auto; 
    }
  }
</style>
```