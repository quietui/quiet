---
title: Button Group
layout: component
---

```html {.example}
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
```

## Examples

### With dropdowns

You can nest [dropdowns](/docs/components/dropdown) inside button groups to give users additional options.

```html {.example}
<quiet-button-group>
  <quiet-button>
    <quiet-icon slot="start" name="photo"></quiet-icon>
    Image
  </quiet-button>
  <quiet-button>
    <quiet-icon slot="start" name="message-circle"></quiet-icon>
    Comments
  </quiet-button>
  <quiet-dropdown>
    <quiet-button slot="trigger" with-caret>
      <quiet-icon slot="start" name="download"></quiet-icon>
      Download
    </quiet-button>
    <quiet-dropdown-item name="sm">Small <span slot="details">640&times;480</span></quiet-dropdown-item>
    <quiet-dropdown-item name="md">Medium <span slot="details">800&times;600</span></quiet-dropdown-item>
    <quiet-dropdown-item name="lg">Large <span slot="details">1280&times;1024</span></quiet-dropdown-item>
    <quiet-divider></quiet-divider>
    <quiet-dropdown-item name="og">Custom…</quiet-dropdown-item>
  </quiet-dropdown>  
</quiet-button-group>
```

### Making a split button

Create a split button by placing a [button](/docs/components/button) and a [dropdown](/docs/components/dropdown) inside a button group.

```html {.example}
<quiet-button-group>
  <quiet-button variant="primary">
    <quiet-icon name="share-2" slot="start"></quiet-icon>
    Share
  </quiet-button>
  <quiet-dropdown placement="bottom-end">
    <quiet-button slot="trigger" variant="primary" icon-label="Save options" with-caret></quiet-button>
    <quiet-dropdown-item name="cats">Share with cats</quiet-dropdown-item>
    <quiet-dropdown-item name="dogs" disabled>Share with dogs</quiet-dropdown-item>
    <quiet-divider></quiet-divider>
    <quiet-dropdown-item name="url">Copy URL</quiet-dropdown-item>
    <quiet-dropdown-item name="embed">Copy embed code</quiet-dropdown-item>
  </quiet-dropdown>  
</quiet-button-group>
```

### Adding tooltips

You can add [tooltips](/docs/components/tooltip) to improve the user experience of your button groups.

```html {.example}
<quiet-button-group>
  <quiet-button id="button-group__bold" icon-label="Bold"><quiet-icon name="bold"></quiet-icon></quiet-button>
  <quiet-button id="button-group__italic" icon-label="Italic"><quiet-icon name="italic"></quiet-icon></quiet-button>
  <quiet-button id="button-group__underline" icon-label="Underline"><quiet-icon name="underline"></quiet-icon></quiet-button>
</quiet-button-group>

<quiet-tooltip for="button-group__bold">Bold</quiet-tooltip>
<quiet-tooltip for="button-group__italic">Italic</quiet-tooltip>
<quiet-tooltip for="button-group__underline">Underline</quiet-tooltip>
```