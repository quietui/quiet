---
title: Tooltip
layout: component
---

Tooltips follow the [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) pattern for accessibility. They show on hover and on focus. A transparent "safe polygon" is drawn between the tooltip and its anchor element to allow mouse users to hover over the tooltip without closing it. Only one tooltip will be visible on the page at a time.

```html {.example}
<quiet-button id="tooltip__overview">Hover over me</quiet-button>
<quiet-tooltip for="tooltip__overview">I'm a tooltip</quiet-tooltip>
```

:::info
Due to platform limitations, some Quiet components are treated differently when used as tooltip anchors, but they will still be announced as expected by screen readers.
:::

## Examples

### Assigning an anchor

Tooltip anchors must be interactive/focusable elements such as buttons, links, etc. Use the `for` attribute on the tooltip to link it to the anchor's `id`. Do not include interactive elements _inside_ your tooltips, as they won't be accessible to users.

```html {.example}
<button id="tooltip__anchor-button">Button with tooltip</button>
<quiet-tooltip for="tooltip__anchor-button">Native button tooltip</quiet-tooltip>

<br><br>

<input placeholder="Input with tooltip" id="tooltip__anchor-input">
<quiet-tooltip for="tooltip__anchor-input">Native input tooltip</quiet-tooltip>

<br><br>

<a href="#" id="tooltip__anchor-link">Link with tooltip</a>
<quiet-tooltip for="tooltip__anchor-link">Link tooltip</quiet-tooltip>
```

:::info
The anchor element must be in the DOM when the tooltip is connected, otherwise the tooltip won't be attached and a warning will be shown.
:::

### Placement

Use the `placement` attribute to change the preferred location of the tooltip in reference to its anchor. The tooltip will shift to a more optimal location if the preferred placement doesn't have enough room. The default placement is `top`.

```html {.example}
<quiet-button id="tooltip__top">Top</quiet-button>
<quiet-tooltip for="tooltip__top" placement="top">I'm on the top</quiet-tooltip>

<quiet-button id="tooltip__bottom">Bottom</quiet-button>
<quiet-tooltip for="tooltip__bottom" placement="bottom">I'm on the bottom</quiet-tooltip>

<quiet-button id="tooltip__left">Left</quiet-button>
<quiet-tooltip for="tooltip__left" placement="left">I'm on the left </quiet-tooltip>

<quiet-button id="tooltip__right">Right</quiet-button>
<quiet-tooltip for="tooltip__right" placement="right">I'm on the right</quiet-tooltip>
```

### Distance

You can change the distance of the tooltip from the anchor by setting the `distance` attribute to the desired number of pixels.

```html {.example}
<quiet-button id="tooltip__distance-near">Near</quiet-button>
<quiet-tooltip for="tooltip__distance-near" distance="0">I'm so near</quiet-tooltip>

<quiet-button id="tooltip__distance-far">Far</quiet-button>
<quiet-tooltip for="tooltip__distance-far" distance="30">I'm so far</quiet-tooltip>
```

### Open and close delays

Tooltips allow a brief duration before opening and closing when hovering in and out with the mouse. You can control these value by setting the `open-delay` and `close-delay` attributes to the desired number of milliseconds.

```html {.example}
<quiet-button id="tooltip__no-delay">No delay</quiet-button>
<quiet-tooltip for="tooltip__no-delay" open-delay="0" close-delay="0">I have no delay whatsoever</quiet-tooltip>

<quiet-button id="tooltip__long-delay">Long delay</quiet-button>
<quiet-tooltip for="tooltip__long-delay" open-delay="500" close-delay="500">I have a long delay to open and close</quiet-tooltip>
```

### Changing the arrow size

You can change the size of the tooltip's arrow with the `--arrow-size` custom property. Set it to `0` to remove the arrow.

```html {.example}
<quiet-button id="tooltip__big-arrow">Big arrow</quiet-button>
<quiet-tooltip for="tooltip__big-arrow" style="--arrow-size: 8px;">I have a big arrow</quiet-tooltip>

<quiet-button id="tooltip__no-arrow">No arrow</quiet-button>
<quiet-tooltip for="tooltip__no-arrow" style="--arrow-size: 0;">I don't have an arrow</quiet-tooltip>
```

### Setting a max width

Use the `--max-width` custom property to change the maximum width of the tooltip.

```html {.example}
<quiet-button id="tooltip__max-width">Hover over me</quiet-button>
<quiet-tooltip for="tooltip__max-width">
  I'm a tooltip with a lot of content. So much, in fact, that it will wrap to the next line.
</quiet-tooltip>
```
