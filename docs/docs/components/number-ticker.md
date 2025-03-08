---
title: Number Ticker
layout: component
---

```html {.example}
<div id="ticker__overview">
  <p>
    <quiet-number-ticker 
      end-value="10000"
      grouping
      style="font-size: 2.5rem; font-weight: var(--quiet-font-weight-bold);"
    ></quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__overview');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

## Examples

### Providing start and end values

The number ticker animates from the starting value to the ending value. By default, it counts up from 0 with no delay. Use the `start-value` and `end-value` attributes to set the ticker's range. By default, `start-value` is zero.

```html {.example}
<div id="ticker__providing">
  <p>
    <quiet-number-ticker start-value="0" end-value="100"></quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__providing');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Customizing the ticker

You can customize the duration of the ticker using the `--duration` custom property. Add an optional delay before the ticker starts by setting the `delay` attribute to a value in milliseconds.

```html {.example}
<div id="ticker__customizing">
  <p>
    <quiet-number-ticker 
      start-value="0" 
      end-value="99999" 
      delay="1000" 
      style="--duration: 1.5s;">
    </quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__customizing');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Starting when in view

Use the `start-on-view` attribute to begin the animation only when the ticker enters the viewport. This is useful for elements further down a page.

```html {.example}
<p>This ticker will start as soon as it enters the viewport. Refresh the page to watch again.</p>

<quiet-number-ticker end-value="25000" start-on-view></quiet-number-ticker>
```

### Grouping numbers

The `grouping` attribute adds thousand separators to the displayed number, making large numbers easier to read.

```html {.example}
<div id="ticker__grouping">
  <p>
    <quiet-number-ticker 
      start-value="0" 
      end-value="1000000" 
      grouping 
      style="--duration: 2s;">
    </quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__grouping');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Setting decimal places

The decimal-places attribute controls how many digits appear after the decimal point.

```html {.example}
<div id="ticker__decimal-places">
  <p>
    <quiet-number-ticker 
      start-value="0" 
      end-value="123.456" 
      decimal-places="3" 
      style="--duration: 2s;">
    </quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__decimal-places');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Localizing the value

You can set the `lang` attribute on the ticker to localize the number, including decimals and thousands separators. This example is displayed in German.

```html {.example}
<div id="ticker__localization">
  <p>
    <quiet-number-ticker 
      start-value="0" 
      end-value="1234567.89" 
      grouping 
      decimal-places="2" 
      lang="de" 
      style="--duration: 2s;">
    </quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__localization');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Advanced formatting

For advanced formatting, use the `valueFormatter` property to define a custom function. This overrides `decimal-places` and `grouping`. This example formats the number as kilobytes using the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API.

```html {.example}
<div id="ticker__value-formatter">
  <p>
    <quiet-number-ticker 
      start-value="0" 
      end-value="75000" 
      style="--duration: 2s;">
    </quiet-number-ticker>
  </p>
  <quiet-button>Restart</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__value-formatter');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  ticker.valueFormatter = (value) => {
    const kbValue = value / 1000;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(kbValue) + ' kB';
  };

  button.addEventListener('click', () => {
    ticker.startAnimation();
  });
</script>
```

### Dynamic updates

You can update the ticker’s value programmatically. To animate it from its current value, increase both the start and end values.

```html {.example}
<div id="ticker__dynamic">
  <p>
    <quiet-number-ticker end-value="100"></quiet-number-ticker>
  </p>
  <quiet-button>Increase by 50</quiet-button>
</div>

<script>
  const container = document.getElementById('ticker__dynamic');
  const ticker = container.querySelector('quiet-number-ticker');
  const button = container.querySelector('quiet-button');

  button.addEventListener('click', () => {
    ticker.startValue = ticker.endValue;
    ticker.endValue += 50;
  });
</script>
```