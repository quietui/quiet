---
title: Splitter
layout: component
---

Splitters follow the [ARIA APG window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) pattern for accessibility. They consist of a draggable separator positioned between two resizable panels.

```html {.example}
<quiet-splitter id="splitter__overview">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__overview {
    height: 200px;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```

## Examples

## Setting the position

You can set the initial position of the divider using the `position` attribute or update it programmatically via JavaScript. The value is a number from 0 to 100 representing the divider's position as a percentage.

```html {.example}
<quiet-splitter position="75" id="splitter__position">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__position {
    height: 200px;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```

### Constraining the divider

Set the `--divider-min-position` and `--divider-max-position` custom properties to limit the range of the divider's movement. In this example, the divider is constrained between 25% and 75% of the splitter's size.

```html {.example}
<quiet-splitter style="--divider-min-position: 25%; --divider-max-position: 75%;" id="splitter__constraints">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__constraints {
    height: 200px;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```

### Changing the orientation

Set the `orientation` attribute to `vertical` to change the splitter's orientation.

```html {.example}
<quiet-splitter orientation="vertical" id="splitter__orientation">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__orientation {
    height: 400px;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```

### Snapping

Set the `snap` attribute to a space-separated list of positions at which to snap. Only percentages are supported. Use the `snap-threshold` attribute to change the threshold at which snapping occurs.

```html {.example}
<div id="splitter__snap">
  <quiet-splitter snap="25% 50% 75%">
    <div slot="start">Start panel</div>
    <div slot="end">End panel</div>
  </quiet-splitter>

  <div class="snap-dots">
    <span class="snap-dot" style="left: 25%;"></span>
    <span class="snap-dot" style="left: 50%;"></span>
    <span class="snap-dot" style="left: 75%;"></span>
  </div>
</div>

<style>
  #splitter__snap {
    quiet-splitter {
      height: 200px;
    }

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .snap-dots {
      position: relative;
      width: 100%;
      margin-top: .5rem;
    }

    .snap-dot {
      position: absolute;
      width: 4px;
      height: 4px;
      background-color: gray;
      border-radius: 50%;
      transform: translateX(-50%);
    }    
  }
</style>
```

### Disabling

When the `disabled` attribute is set, the divider cannot be dragged or focused and the handle is hidden, though the divider line remains visible.

```html {.example}
<quiet-splitter disabled id="splitter__disabled">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__disabled {
    height: 200px;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```

### Nested splitters

Splitters can be nested to create advanced layouts.

```html {.example}
<quiet-splitter id="splitter__nested">
  <div slot="start">
    Panel 1
  </div>
  <div slot="end">
    <quiet-splitter orientation="vertical">
      <div slot="start">
        Panel 2
      </div>
      <div slot="end">
        Panel 3
      </div>
    </quiet-splitter>
  </div>
</quiet-splitter>

<style>
  #splitter__nested {
    height: 300px;

    quiet-splitter {
      height: 100%;
      border-radius: 0;
      border: none;

      > div {
        height: 100%;
      }
    }

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }    
  }
</style>
```

### Styling the divider

You can customize the divider by slotting content such as an icon into the `handle` slot. To change the divider's width, set the `--divider-width` custom property.

```html {.example}
<quiet-splitter style="height: 200px;" id="splitter__custom-divider">
  <div slot="start">Start panel</div>
  <quiet-icon slot="handle" name="grip-vertical"></quiet-icon>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__custom-divider {
    --divider-width: 1rem;

    /* Center the text for the demo */
    [slot="start"],
    [slot="end"] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
```
