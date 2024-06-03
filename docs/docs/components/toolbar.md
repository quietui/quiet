---
title: Toolbar
layout: component
---

Toolbars follows the [ARIA APG toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for accessibility. A roving tab index is used, meaning users can tab into the control and use the arrow keys to navigate options. A subsequent tab will exit the toolbar.

By grouping related [buttons](/docs/components/button) and [button groups](/docs/components/button-group) into toolbars, you will decrease the number of tab stops in the keyboard interface, making your app more efficient and user-friendly.

```html {.example}
<quiet-toolbar>
  <quiet-button-group>
    <quiet-button icon-label="Undo"><quiet-icon name="arrow-back-up"></quiet-icon></quiet-button>
    <quiet-button icon-label="Redo"><quiet-icon name="arrow-forward-up"></quiet-icon></quiet-button>
  </quiet-button-group>

  <quiet-button-group>
    <quiet-button icon-label="Bold"><quiet-icon name="bold"></quiet-icon></quiet-button>
    <quiet-button icon-label="Italic"><quiet-icon name="italic"></quiet-icon></quiet-button>
    <quiet-button icon-label="Underline"><quiet-icon name="underline"></quiet-icon></quiet-button>
  </quiet-button-group>

  <quiet-button-group>
    <quiet-button  icon-label="Align left"><quiet-icon name="align-left"></quiet-icon></quiet-button>
    <quiet-button  icon-label="Align center"><quiet-icon name="align-center"></quiet-icon></quiet-button>
    <quiet-button  icon-label="Align right"><quiet-icon name="align-right"></quiet-icon></quiet-button>
    <quiet-button icon-label="Justify"><quiet-icon name="align-justified"></quiet-icon></quiet-button>
  </quiet-button-group>
</quiet-toolbar>
```

## Examples

### Toolbars with various components

Toolbars can be used with a mixture of buttons, button groups, and dropdowns that have a `<quiet-button>` trigger. Keyboard users will be able to cycle through all buttons with [[Left]] and [[Right]], as expected.

```html {.example}
<quiet-toolbar>
  <quiet-button variant="primary">
    <quiet-icon slot="start" name="plus"></quiet-icon>
    New
  </quiet-button>

  <quiet-button-group>
    <quiet-button icon-label="Bold"><quiet-icon name="bold"></quiet-icon></quiet-button>
    <quiet-button icon-label="Italic"><quiet-icon name="italic"></quiet-icon></quiet-button>
    <quiet-button icon-label="Underline"><quiet-icon name="underline"></quiet-icon></quiet-button>
  </quiet-button-group>

    <quiet-dropdown id="dropdown__checkboxes">
      <quiet-button slot="trigger" with-caret>View</quiet-button>
      <quiet-dropdown-item type="checkbox" value="canvas" checked>Show canvas</quiet-dropdown-item>
      <quiet-dropdown-item type="checkbox" value="grid" checked>Show grid</quiet-dropdown-item>
      <quiet-dropdown-item type="checkbox" value="source">Show source</quiet-dropdown-item>
      <quiet-divider></quiet-divider>
      <quiet-dropdown-item value="preferences">Preferences…</quiet-dropdown-item>
    </quiet-dropdown>    
  </quiet-button-group>


  <quiet-button icon-label="Print"><quiet-icon name="printer"></quiet-icon></quiet-button>
  <quiet-button icon-label="Share"><quiet-icon name="share-2"></quiet-icon></quiet-button>
</quiet-toolbar>
```

### Vertical toolbars

To make a vertical toolbar, set the `orientation` attribute to `vertical`. Keyboard users will be able to use [[Up]] and [[Down]] instead of [[Left]] and [[Right]]. Button groups will automatically assume the correct orientation.

```html {.example}
<quiet-toolbar orientation="vertical" style="max-width: 60px;">
  <quiet-button-group>
    <quiet-button>
      <quiet-icon slot="start" name="plus"></quiet-icon>
      New
    </quiet-button>
    <quiet-button>
      <quiet-icon slot="start" name="folder-open"></quiet-icon>
      Open
    </quiet-button>
    <quiet-button>
      <quiet-icon slot="start" name="device-floppy"></quiet-icon>
      Save
    </quiet-button>
    <quiet-button>
      <quiet-icon slot="start" name="printer"></quiet-icon>
      Print
    </quiet-button>
  </quiet-button-group>
</quiet-toolbar>
```