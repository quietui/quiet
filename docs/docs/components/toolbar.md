---
title: Toolbar
layout: component
---

Toolbars follows the [ARIA APG toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for accessibility. A roving tab index is used, meaning users can tab into the control and use the arrow keys to navigate options. A subsequent tab will exit the toolbar.

By organizing buttons and button groups into toolbars, you will decrease the number of tab stops in the keyboard interface, making your app more efficient and user-friendly.

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

Toolbars can be used with a mixture of buttons, button groups, and dropdowns that have a `<quiet-button>` trigger. Keyboard users will be able to cycle through all buttons, as expected.

```html {.example}
<quiet-toolbar>
  <quiet-button icon-label="New" variant="primary"><quiet-icon name="plus"></quiet-icon></quiet-button>

  <quiet-button-group>
    <quiet-button icon-label="Bold"><quiet-icon name="bold"></quiet-icon></quiet-button>
    <quiet-button icon-label="Italic"><quiet-icon name="italic"></quiet-icon></quiet-button>
    <quiet-button icon-label="Underline"><quiet-icon name="underline"></quiet-icon></quiet-button>
  </quiet-button-group>

    <quiet-dropdown id="dropdown__checkboxes">
      <quiet-button slot="trigger" with-caret>View</quiet-button>
      <quiet-dropdown-item type="checkbox" name="canvas" checked>Show canvas</quiet-dropdown-item>
      <quiet-dropdown-item type="checkbox" name="grid" checked>Show grid</quiet-dropdown-item>
      <quiet-dropdown-item type="checkbox" name="source">Show source</quiet-dropdown-item>
      <quiet-divider></quiet-divider>
      <quiet-dropdown-item name="preferences">Preferences…</quiet-dropdown-item>
    </quiet-dropdown>    
  </quiet-button-group>


  <quiet-button icon-label="Print"><quiet-icon name="printer"></quiet-icon></quiet-button>
  <quiet-button icon-label="Share"><quiet-icon name="share-2"></quiet-icon></quiet-button>
</quiet-toolbar>
```
