---
title: Popover
layout: component
---

Popovers appear when a corresponding anchor element is clicked. Unlike [tooltips](/docs/components/tooltip), popovers can contain interactive content such as links, buttons, and form controls. They are not modal, so no overlay is shown when open. Popovers will close when the user clicks outside of them or presses [[Escape]]. Only one popover can be open at a time.

```html {.example}
<quiet-popover for="popover__overview">
  <div style="display: flex; gap: 1.5rem; align-items: center;">
    <img 
      src="https://images.unsplash.com/photo-1579014868745-23e405c5605d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="A gray kitten yawns but it looks like a laugh"
      style="max-width: 7rem;"
    >
    <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem">
      Cats love chasing popovers that appear on the screen. I wonder what they would do if they actually caught one.
      <quiet-button variant="primary" size="sm">Learn more</quiet-button>
    </div>
  </div>
</quiet-popover>

<quiet-button id="popover__overview">Show popover</quiet-button>
```

## Examples

### Assigning an anchor

Popover anchors should be `<quiet-button>` or `<button>` elements. Use the `for` attribute on the popover to link it to the anchor's `id`.

```html {.example}
<quiet-button id="popover__anchor-button">Show popover</quiet-button>

<quiet-popover for="popover__anchor-button">
  I'm just a popover anchored to a button.
</quiet-popover>

<br><br>

<button id="popover__anchor-native-button">Show popover</button>

<quiet-popover for="popover__anchor-native-button">
  I'm just a popover anchored to a native button.
</quiet-popover>
```

:::warn
The anchor element must be in the DOM when the popover is connected, otherwise the popover won't be attached and a warning will be shown.
:::

### Placement

Use the `placement` attribute to change the preferred location of the popover in reference to its anchor. The popover will shift to a more optimal location if the preferred placement doesn't have enough room. The default placement is `top`.

```html {.example .flex-row}
<quiet-button id="popover__top">Top</quiet-button>
<quiet-popover for="popover__top" placement="top">I'm on the top</quiet-popover>

<quiet-button id="popover__bottom">Bottom</quiet-button>
<quiet-popover for="popover__bottom" placement="bottom">I'm on the bottom</quiet-popover>

<quiet-button id="popover__left">Left</quiet-button>
<quiet-popover for="popover__left" placement="left">I'm on the left </quiet-popover>

<quiet-button id="popover__right">Right</quiet-button>
<quiet-popover for="popover__right" placement="right">I'm on the right</quiet-popover>
```


### Distance

You can change the distance of the popover from the anchor by setting the `distance` attribute to the desired number of pixels.

```html {.example .flex-row}
<quiet-button id="popover__distance-near">Near</quiet-button>
<quiet-popover for="popover__distance-near" distance="0">I'm so near</quiet-popover>

<quiet-button id="popover__distance-far">Far</quiet-button>
<quiet-popover for="popover__distance-far" distance="30">I'm so far</quiet-popover>
```

### Changing the arrow size

You can change the size of the popover's arrow with the `--arrow-size` custom property. Set it to `0` to remove the arrow.

```html {.example .flex-row}
<quiet-button id="popover__big-arrow">Big arrow</quiet-button>
<quiet-popover for="popover__big-arrow" style="--arrow-size: 8px;">I have a big arrow</quiet-popover>

<quiet-button id="popover__no-arrow">No arrow</quiet-button>
<quiet-popover for="popover__no-arrow" style="--arrow-size: 0;">I don't have an arrow</quiet-popover>
```

### Setting a max width

Use the `--max-width` custom property to change the maximum width of the popover.

```html {.example}
<quiet-button id="popover__max-width">Toggle me</quiet-button>
<quiet-popover for="popover__max-width" style="--max-width: 160px;">
  Popovers will usually grow to be a lot wider, but this one has a custom max width.
</quiet-popover>
```

### Setting focus on open

To move focus to a specific form control when the popover opens, use the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) global attribute.

```html {.example}
<quiet-popover for="popover__autofocus">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <quiet-text-field autofocus label="New value" size="sm"></quiet-text-field>
    <quiet-button variant="primary" size="sm" data-popover="close">Update</quiet-button>
  </div>
</quiet-popover>

<quiet-button id="popover__autofocus">
  <quiet-icon slot="start" name="edit"></quiet-icon>
  Edit
</quiet-button>
```

### Using popovers as confirmations

A common popover pattern is to get confirmation before performing a destructive action.

```html {.example}
<quiet-popover for="popover__confirmation" placement="right">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <quiet-button variant="destructive" size="sm" data-popover="close">Confirm delete</quiet-button>
    <quiet-button size="sm" data-popover="close">Cancel</quiet-button>
  </div>
</quiet-popover>

<quiet-button id="popover__confirmation" variant="destructive">Delete</quiet-button>
```

### Using tab lists in popovers

You can use [tab lists](/docs/components/tab-list) in popovers to categorize content as needed.

```html {.example}
<quiet-popover for="popover__tabs" id="popover__tablist">
  <quiet-tab-list label="Select a tab">
    <quiet-tab slot="tab" panel="first">First</quiet-tab>
    <quiet-tab slot="tab" panel="second">Second</quiet-tab>
    <quiet-tab slot="tab" panel="third">Third</quiet-tab>

    <quiet-tab-panel name="first">Cats have a unique way of communicating — they can make over 100 vocal sounds, each meaning something different.</quiet-tab-panel>
    <quiet-tab-panel name="second">A cat's sense of smell is much stronger than that of humans, making their noses one of their most important tools.</quiet-tab-panel>
    <quiet-tab-panel name="third">A group of kittens is called a "kindle," a term that perfectly captures the warmth and charm they bring.</quiet-tab-panel>
  </quiet-tab-list>
</quiet-popover>

<quiet-button id="popover__tabs">Facts about cats</quiet-button>

<style>
  #popover__tablist::part(content) {
    padding: 0;
  }

  #popover__tablist quiet-tab-list::part(panels) {
    padding: 1rem;
  }
</style>
```
