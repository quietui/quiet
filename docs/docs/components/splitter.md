---
title: Splitter
layout: component
---

```html {.example}
<quiet-splitter style="height: 200px;" id="splitter__overview">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__overview {
    /* Center the text */
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

### Changing the orientation

Set the `orientation` attribute to `vertical` to change the splitter's orientation.

```html {.example}
<quiet-splitter orientation="vertical" style="height: 400px;" id="splitter__orientation">
  <div slot="start">Start panel</div>
  <div slot="end">End panel</div>
</quiet-splitter>

<style>
  #splitter__orientation {
    /* Center the text */
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

Set the `snap` attribute to a space-separated list of positions at which to snap. Only percentages are supported.

```html {.example}
<div id="splitter__snap">
  <quiet-splitter snap="25% 50% 75%" style="height: 200px;">
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
    /* Center the text */
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

    /* Center the text */
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
