---
title: Dropdown
layout: component
---

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" variant="primary" with-caret>
    <quiet-icon slot="start" name="mail"></quiet-icon>
    Message
  </quiet-button>

  <small>Actions</small>

  <quiet-dropdown-item name="reply">
    <quiet-icon slot="icon" name="corner-up-left"></quiet-icon>
    Reply
    <span slot="details">⌘R</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="forward">
    <quiet-icon slot="icon" name="corner-up-right"></quiet-icon>
    Forward
    <span slot="details">⌘F</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="archive">
    <quiet-icon slot="icon" name="archive"></quiet-icon>
    Archive
    <span slot="details">⇧⌘A</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="delete" variant="destructive">
    <quiet-icon slot="icon" name="trash"></quiet-icon>
    Delete
    <span slot="details">Delete</span>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item name="images" type="checkbox" checked>
    Show images
  </quiet-dropdown-item>

  <quiet-dropdown-item name="wrap" type="checkbox" checked>
    Word wrap
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item name="preferences">
    <quiet-icon slot="icon" name="adjustments-horizontal"></quiet-icon>
    Preferences
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Getting the selected item

When an item is selected, the `quiet-select` event will be emitted by the dropdown. You can inspect `event.detail.selection` to get a reference to the selected item. If you've provided a name for each [dropdown item](/docs/components/dropdown-item), it will be available in `event.detail.selection.name`.

```html {.example}
<quiet-dropdown id="dropdown__selected">
  <quiet-button slot="trigger" with-caret>View</quiet-button>
  <quiet-dropdown-item name="full-screen">Enter full screen</quiet-dropdown-item>
  <quiet-dropdown-item name="actual">Actual size</quiet-dropdown-item>
  <quiet-dropdown-item name="zoom-in">Zoom in</quiet-dropdown-item>
  <quiet-dropdown-item name="zoom-out">Zoom out</quiet-dropdown-item>
</quiet-dropdown>

<script>
  const dropdown = document.getElementById('dropdown__selected');

  dropdown.addEventListener('quiet-select', event => {
    console.log(event.detail.selection.name);
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

  <quiet-dropdown-item name="cut">
    <quiet-icon slot="icon" name="scissors"></quiet-icon>
      Cut
  </quiet-dropdown-item>

  <quiet-dropdown-item name="copy">
    <quiet-icon slot="icon" name="clipboard-copy"></quiet-icon>
      Copy
  </quiet-dropdown-item>

  <quiet-dropdown-item name="paste">
    <quiet-icon slot="icon" name="clipboard-plus"></quiet-icon>
      Paste
  </quiet-dropdown-item>

  <quiet-dropdown-item name="delete">
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
  <quiet-dropdown-item name="phone">Phone</quiet-dropdown-item>
  <quiet-dropdown-item name="tablet">Tablet</quiet-dropdown-item>
  <quiet-dropdown-item name="desktop">Desktop</quiet-dropdown-item>
  <quiet-divider></quiet-divider>
  <quiet-dropdown-item name="more">More options…</quiet-dropdown-item>
</quiet-dropdown>
```

### Showing details

Use the `details` slot to display details, such as keyboard shortcuts, at the end of [dropdown items](/docs/components/dropdown-item).

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Message</quiet-button>

  <quiet-dropdown-item name="reply">
    Reply
    <span slot="details">⌘R</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="forward">
    Forward
    <span slot="details">⌘F</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="move">
    Move
    <span slot="details">⇧⌘M</span>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item name="archive">
    Archive
    <span slot="details">⇧⌘A</span>
  </quiet-dropdown-item>

  <quiet-dropdown-item name="delete" variant="destructive">
    Delete
    <span slot="details">Delete</span>
  </quiet-dropdown-item>
</quiet-dropdown>
```

### Checkable items

You can turn a [dropdown item](/docs/components/dropdown-item) into a checkable option by setting `type="checkbox"`. Add the `checked` attribute to make it checked initially. When clicked, the item's checked state will toggle but the dropdown will remain open.

```html {.example}
<quiet-dropdown id="dropdown__checkboxes">
  <quiet-button slot="trigger" with-caret>View</quiet-button>
  <quiet-dropdown-item type="checkbox" name="canvas" checked>Show canvas</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" name="grid" checked>Show grid</quiet-dropdown-item>
  <quiet-dropdown-item type="checkbox" name="source">Show source</quiet-dropdown-item>
  <quiet-divider></quiet-divider>
  <quiet-dropdown-item name="preferences">Preferences…</quiet-dropdown-item>
</quiet-dropdown>

<script>
  const dropdown = document.getElementById('dropdown__checkboxes');

  dropdown.addEventListener('quiet-select', event => {
    if (event.detail.selection.type === 'checkbox') {
      // Checkbox
      console.log(
        event.detail.selection.name,
        event.detail.selection.checked ? 'checked' : 'unchecked'
      );
    } else {
      // Not a checkbox
      console.log(event.detail.selection.name);
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

  <quiet-dropdown-item name="share">
    <quiet-icon slot="icon" name="share-2"></quiet-icon>
    Share
  </quiet-dropdown-item>

  <quiet-dropdown-item name="preferences">
    <quiet-icon slot="icon" name="adjustments-horizontal"></quiet-icon>
    Preferences
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <small>Danger zone</small>
  
  <quiet-dropdown-item name="archive">
    <quiet-icon slot="icon" name="archive"></quiet-icon>
    Archive
  </quiet-dropdown-item>

  <quiet-dropdown-item name="delete" variant="destructive">
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
  <quiet-dropdown-item name="cash">Cash</quiet-dropdown-item>
  <quiet-dropdown-item name="check" disabled>Personal check</quiet-dropdown-item>
  <quiet-dropdown-item name="credit">Credit card</quiet-dropdown-item>
  <quiet-dropdown-item name="gift-card">Gift card</quiet-dropdown-item>
</quiet-dropdown>
```

### Changing the placement

You can set the preferred placement of the dropdown menu with the `placement` attribute. The menu will shift to a more optimal location if the preferred placement doesn't have enough room.

```html {.example}
<quiet-dropdown placement="right">
  <quiet-button slot="trigger" with-caret>Types of cats</quiet-button>
  <quiet-dropdown-item name="bengal">Bengal</quiet-dropdown-item>
  <quiet-dropdown-item name="calico">Calico</quiet-dropdown-item>
  <quiet-dropdown-item name="maine-coon">Maine coon</quiet-dropdown-item>
  <quiet-dropdown-item name="siamese">Siamese</quiet-dropdown-item>
  <quiet-dropdown-item name="tabby">Tabby</quiet-dropdown-item>
  <quiet-dropdown-item name="tuxedo">Tuxedo</quiet-dropdown-item>
</quiet-dropdown>
```
