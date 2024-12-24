---
title: Dropdown
layout: component
---

Dropdown menus appear when their trigger element is clicked. They are not modal, so no overlay is shown when open. Dropdowns will close when the user selects an item, clicks outside of them, or presses [[Escape]]. Only one dropdown can be open at a time.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>
    <quiet-icon slot="start" name="mail"></quiet-icon>
    Message
  </quiet-button>

  <small>Actions</small>

  <quiet-dropdown-item value="reply">
    <quiet-icon slot="icon" name="corner-up-left"></quiet-icon>
    Reply
    <span slot="details">⌘R</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="forward">
    <quiet-icon slot="icon" name="corner-up-right"></quiet-icon>
    Forward
    <span slot="details">⌘F</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="archive">
    <quiet-icon slot="icon" name="archive"></quiet-icon>
    Archive
    <span slot="details">⇧⌘A</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="delete" variant="destructive">
    <quiet-icon slot="icon" name="trash"></quiet-icon>
    Delete
    <span slot="details">Delete</span>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item value="images" type="checkbox" checked>
    Show images
  </quiet-dropdown-item>

  <quiet-dropdown-item value="wrap" type="checkbox" checked>
    Word wrap
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item value="preferences">
    <quiet-icon slot="icon" name="adjustments-horizontal"></quiet-icon>
    Preferences
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Getting the selected item

When an item is selected, the `quiet-select` event will be emitted by the dropdown. You can inspect `event.detail.selection` to get a reference to the selected item. If you've provided a value for each [dropdown item](/docs/components/dropdown-item), it will be available in `event.detail.selection.value`.

```html {.example}
<quiet-dropdown id="dropdown__selected">
  <quiet-button slot="trigger" with-caret>View</quiet-button>
  <quiet-dropdown-item value="full-screen">Enter full screen</quiet-dropdown-item>
  <quiet-dropdown-item value="actual">Actual size</quiet-dropdown-item>
  <quiet-dropdown-item value="zoom-in">Zoom in</quiet-dropdown-item>
  <quiet-dropdown-item value="zoom-out">Zoom out</quiet-dropdown-item>
</quiet-dropdown>

<script>
  const dropdown = document.getElementById('dropdown__selected');

  dropdown.addEventListener('quiet-select', event => {
    console.log(event.detail.selection.value);
  });
</script>
```

:::info
To keep the dropdown open after selection, call `event.preventDefault()` in the `quiet-select` event's callback.
:::

### Showing icons

Use the `icon` slot to add icons to [dropdown items](/docs/components/dropdown-item). This works best with [icon](/docs/components/icon) elements.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Edit</quiet-button>

  <quiet-dropdown-item value="cut">
    <quiet-icon slot="icon" name="scissors"></quiet-icon>
      Cut
  </quiet-dropdown-item>

  <quiet-dropdown-item value="copy">
    <quiet-icon slot="icon" name="clipboard-copy"></quiet-icon>
      Copy
  </quiet-dropdown-item>

  <quiet-dropdown-item value="paste">
    <quiet-icon slot="icon" name="clipboard-plus"></quiet-icon>
      Paste
  </quiet-dropdown-item>

  <quiet-dropdown-item value="delete">
    <quiet-icon slot="icon" name="backspace"></quiet-icon>
      Delete
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Showing labels & dividers

Use the `<small>` element for labels and the [`<quiet-divider>`](/docs/components/divider) element for separators.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Device</quiet-button>
  <small>Type</small>
  <quiet-dropdown-item value="phone">Phone</quiet-dropdown-item>
  <quiet-dropdown-item value="tablet">Tablet</quiet-dropdown-item>
  <quiet-dropdown-item value="desktop">Desktop</quiet-dropdown-item>
  <quiet-divider></quiet-divider>
  <quiet-dropdown-item value="more">More options…</quiet-dropdown-item>
</quiet-dropdown>
```

### Showing details

Use the `details` slot to display details, such as keyboard shortcuts, inside [dropdown items](/docs/components/dropdown-item).

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Message</quiet-button>

  <quiet-dropdown-item value="reply">
    Reply
    <span slot="details">⌘R</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="forward">
    Forward
    <span slot="details">⌘F</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="move">
    Move
    <span slot="details">⇧⌘M</span>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item value="archive">
    Archive
    <span slot="details">⇧⌘A</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="delete" variant="destructive">
    Delete
    <span slot="details">Delete</span>
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Checkable items

You can turn a [dropdown item](/docs/components/dropdown-item) into a checkable option by setting `type="checkbox"`. Add the `checked` attribute to make it checked initially. When clicked, the item's checked state will toggle and the dropdown will close. You can cancel the `quiet-select` event if you want to keep it open instead.

```html {.example}
<quiet-dropdown id="dropdown__checkboxes">
  <quiet-button slot="trigger" with-caret>View</quiet-button>
  <quiet-dropdown-item type="checkbox" value="canvas" checked>Show canvas</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" value="grid" checked>Show grid</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" value="source">Show source</quiet-dropdown-item>
  <quiet-divider></quiet-divider>
  <quiet-dropdown-item value="preferences">Preferences…</quiet-dropdown-item>
</quiet-dropdown>

<script>
  const dropdown = document.getElementById('dropdown__checkboxes');

  dropdown.addEventListener('quiet-select', event => {
    if (event.detail.selection.type === 'checkbox') {
      // Checkbox
      console.log(
        event.detail.selection.value,
        event.detail.selection.checked ? 'checked' : 'unchecked'
      );
    } else {
      // Not a checkbox
      console.log(event.detail.selection.value);
    }
  });
</script>
```

:::info
When a checkable option exists anywhere in the dropdown, all of items will receive additional padding so they align properly.
:::

### Destructive items

Add `variant="destructive"` to any [dropdown item](/docs/components/dropdown-item) to highlight that it's a dangerous action.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Project</quiet-button>

  <quiet-dropdown-item value="share">
    <quiet-icon slot="icon" name="share-2"></quiet-icon>
    Share
  </quiet-dropdown-item>

  <quiet-dropdown-item value="preferences">
    <quiet-icon slot="icon" name="adjustments-horizontal"></quiet-icon>
    Preferences
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <small>Danger zone</small>
  
  <quiet-dropdown-item value="archive">
    <quiet-icon slot="icon" name="archive"></quiet-icon>
    Archive
  </quiet-dropdown-item>

  <quiet-dropdown-item value="delete" variant="destructive">
    <quiet-icon slot="icon" name="trash"></quiet-icon>
    Delete
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Disabling items

Add the `disabled` attribute to any [dropdown item](/docs/components/dropdown-item) to disabled it.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Payment method</quiet-button>
  <quiet-dropdown-item value="cash">Cash</quiet-dropdown-item>
  <quiet-dropdown-item value="check" disabled>Personal check</quiet-dropdown-item>
  <quiet-dropdown-item value="credit">Credit card</quiet-dropdown-item>
  <quiet-dropdown-item value="gift-card">Gift card</quiet-dropdown-item>
</quiet-dropdown>
```

### Changing the placement

You can set the preferred placement of the dropdown menu with the `placement` attribute. The menu will shift to a more optimal location if the preferred placement doesn't have enough room.

```html {.example}
<quiet-dropdown placement="right">
  <quiet-button slot="trigger">
    Types of cats
    <quiet-icon slot="end" name="chevron-right"></quiet-icon>
  </quiet-button>
  <quiet-dropdown-item value="bengal">Bengal</quiet-dropdown-item>
  <quiet-dropdown-item value="calico">Calico</quiet-dropdown-item>
  <quiet-dropdown-item value="maine-coon">Maine coon</quiet-dropdown-item>
  <quiet-dropdown-item value="siamese">Siamese</quiet-dropdown-item>
  <quiet-dropdown-item value="tabby">Tabby</quiet-dropdown-item>
  <quiet-dropdown-item value="tuxedo">Tuxedo</quiet-dropdown-item>
</quiet-dropdown>
```

### Context menus

To turn a dropdown menu into a context menu, omit the trigger and set the `context-menu` attribute to the ID of an element in the same document. When you right-click or long press (touch only) the target element, the context menu will be shown.

```html {.example}
<div id="dropdown__actions" tabindex="0">
  Right-click or long press here to show the context menu
</div>

<quiet-dropdown id="dropdown__selected" context-menu="dropdown__actions">
  <quiet-dropdown-item type="checkbox" value="canvas" checked>Show canvas</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" value="grid" checked>Show grid</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" value="source">Show source</quiet-dropdown-item>
  <quiet-divider></quiet-divider>
  <quiet-dropdown-item value="preferences">Preferences…</quiet-dropdown-item>
</quiet-dropdown>

<style>
  #dropdown__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 200px;
    color: var(--quiet-text-muted);
    background-color: var(--quiet-paper-color);
    border: dashed var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    padding: 1rem;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: calc(var(--quiet-border-width) * -1);
    }
  }
</style>
```

:::warn
The context menu element must be in the DOM when the dropdown is connected, otherwise the dropdown won't be attached and a warning will be shown in the console.
:::

