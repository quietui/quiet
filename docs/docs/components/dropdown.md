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

  <h3>Actions</h3>

  <quiet-dropdown-item value="reply">
    <quiet-icon slot="icon" name="corner-up-left"></quiet-icon>
    Reply
    <quiet-hotkey slot="details" keys="$command R" appearance="unstyled"></quiet-hotkey>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="forward">
    <quiet-icon slot="icon" name="corner-up-right"></quiet-icon>
    Forward
    <quiet-hotkey slot="details" keys="$command F" appearance="unstyled"></quiet-hotkey>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="archive">
    <quiet-icon slot="icon" name="archive"></quiet-icon>
    Archive
    <quiet-hotkey slot="details" keys="$shift $command A" appearance="unstyled"></quiet-hotkey>
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

   <quiet-dropdown-item>
    <quiet-icon slot="icon" name="tag"></quiet-icon>
    Labels
    <quiet-dropdown-item slot="submenu" value="add-label">
      <quiet-icon slot="icon" name="plus"></quiet-icon>
      Add label
    </quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="manage-labels">
      <quiet-icon slot="icon" name="edit"></quiet-icon>
      Manage labels
    </quiet-dropdown-item>
  </quiet-dropdown-item> 

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

Use any heading to add labels and the [`<quiet-divider>`](/docs/components/divider) element for separators.

```html {.example}
<quiet-dropdown>
  <quiet-button slot="trigger" with-caret>Device</quiet-button>
  <h3>Type</h3>
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
    <quiet-hotkey slot="details" keys="$command R" appearance="unstyled"></quiet-hotkey>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="forward">
    Forward
    <quiet-hotkey slot="details" keys="$command F" appearance="unstyled"></quiet-hotkey>
  </quiet-dropdown-item>

  <quiet-dropdown-item value="move">
    Move
    <quiet-hotkey slot="details" keys="$command M" appearance="unstyled"></quiet-hotkey>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item value="archive">
    Archive
    <quiet-hotkey slot="details" keys="$command A" appearance="unstyled"></quiet-hotkey>
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

  <h3>Danger zone</h3>
  
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

### Submenus

To create submenus, nest [dropdown items](/docs/components/dropdown-item) inside of a dropdown item and assign `slot="submenu"` to each one. You can also add [dividers](/docs/components/divider) as needed.

```html {.example}
<quiet-dropdown id="dropdown__submenus">
  <quiet-button slot="trigger" with-caret>Cat Type</quiet-button>

  <quiet-dropdown-item>
    Domestic
    <quiet-dropdown-item slot="submenu" value="shorthair">Shorthair</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="longhair">Longhair</quiet-dropdown-item>
  </quiet-dropdown-item>

  <quiet-dropdown-item>
    Pedigree
    <quiet-dropdown-item slot="submenu">
      European
      <quiet-dropdown-item slot="submenu" value="british">British Shorthair</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="scottish">Scottish Fold</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="chartreux">Chartreux</quiet-dropdown-item>
    </quiet-dropdown-item>

    <quiet-dropdown-item slot="submenu">
      Asian
      <quiet-dropdown-item slot="submenu" value="siamese">Siamese</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="bengal">Bengal</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="burmese">Burmese</quiet-dropdown-item>
    </quiet-dropdown-item>
    
    <quiet-dropdown-item slot="submenu" value="american">American Breeds</quiet-dropdown-item>
  </quiet-dropdown-item>

  <quiet-divider></quiet-divider>

  <quiet-dropdown-item>
    Sizes
    <quiet-dropdown-item slot="submenu" type="checkbox" value="small">Small</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" type="checkbox" checked value="medium">Medium</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" type="checkbox" value="large">Large</quiet-dropdown-item>
  </quiet-dropdown-item>
</quiet-dropdown>

<script>
  const dropdown = document.getElementById('dropdown__submenus');
  
  dropdown.addEventListener('quiet-select', event => {
    console.log(event.detail.selection.value);
  });
</script>
```

:::info
Dropdown items that have a submenu will not dispatch the `quiet-select` event. However, items inside the submenu will, unless they also have a submenu.
:::

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
<div id="dropdown__context" tabindex="0">
  Right-click or long press here to show the context menu
</div>

<quiet-dropdown context-menu="dropdown__context">
  <quiet-dropdown-item>
    Adjust
    <quiet-dropdown-item slot="submenu" value="brightness">Brightness</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="contrast">Contrast</quiet-dropdown-item>
  </quiet-dropdown-item>
  <quiet-dropdown-item>
    Filters
    <quiet-dropdown-item slot="submenu">
      Artistic
      <quiet-dropdown-item slot="submenu" value="watercolor">Watercolor</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="oil-paint">Oil Paint</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="sketch">Sketch</quiet-dropdown-item>
    </quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu">
      Color
      <quiet-dropdown-item slot="submenu" value="grayscale">Grayscale</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="sepia">Sepia</quiet-dropdown-item>
      <quiet-dropdown-item slot="submenu" value="vibrance">Vibrance</quiet-dropdown-item>
    </quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="blur">Blur Effects</quiet-dropdown-item>
  </quiet-dropdown-item>
  <quiet-dropdown-item>
    Transform
    <quiet-dropdown-item slot="submenu" value="crop">Crop</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="rotate">Rotate</quiet-dropdown-item>
    <quiet-dropdown-item slot="submenu" value="resize">Resize</quiet-dropdown-item>
  </quiet-dropdown-item>
</quiet-dropdown>

<style>
  #dropdown__context {
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

