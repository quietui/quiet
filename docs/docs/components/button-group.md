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

:::info
Button groups work really well in conjunction with the [toolbar component](/docs/components/toolbar).
:::

## Examples

### With dropdowns

You can nest [dropdowns](/docs/components/dropdown) inside button groups to give users additional options.

```html {.example}
<quiet-button-group label="Options">
  <quiet-button>
    <quiet-icon slot="start" name="photo"></quiet-icon>
    Details
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
    <quiet-dropdown-item value="sm">Small <span slot="details">640&times;480</span></quiet-dropdown-item>
    <quiet-dropdown-item value="md">Medium <span slot="details">800&times;600</span></quiet-dropdown-item>
    <quiet-dropdown-item value="lg">Large <span slot="details">1280&times;1024</span></quiet-dropdown-item>
    <quiet-divider></quiet-divider>
    <quiet-dropdown-item value="og">Custom…</quiet-dropdown-item>
  </quiet-dropdown>  
</quiet-button-group>
```

### Adding tooltips

You can add [tooltips](/docs/components/tooltip) to improve the user experience of your button groups.

```html {.example}
<quiet-button-group label="Options">
  <quiet-button icon-label="View image details" id="button-group__tooltip-image">
    <quiet-icon name="photo"></quiet-icon>
  </quiet-button>
  <quiet-button icon-label="Leave a comment" id="button-group__tooltip-comments">
    <quiet-icon name="message-circle"></quiet-icon>
  </quiet-button>
  <quiet-button icon-label="Save this image" id="button-group__tooltip-download">
    <quiet-icon name="download"></quiet-icon>
  </quiet-button>
</quiet-button-group>

<quiet-tooltip for="button-group__tooltip-image">Details</quiet-tooltip>
<quiet-tooltip for="button-group__tooltip-comments">Comments</quiet-tooltip>
<quiet-tooltip for="button-group__tooltip-download">Download</quiet-tooltip>
```


### Vertical button groups

To make a vertical button group, set the `orientation` attribute to `vertical`.

```html {.example}
<quiet-button-group orientation="vertical" label="Options" style="max-width: 60px;">
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

### Making a split button

Create a split button by placing a [button](/docs/components/button) and a [dropdown](/docs/components/dropdown) inside a button group.

```html {.example}
<quiet-button-group label="Options">
  <quiet-button>
    <quiet-icon name="share-2" slot="start"></quiet-icon>
    Share
  </quiet-button>
  <quiet-dropdown placement="bottom-end">
    <quiet-button slot="trigger" icon-label="Save options" with-caret></quiet-button>
    <quiet-dropdown-item value="cats">Share with cats</quiet-dropdown-item>
    <quiet-dropdown-item value="dogs" disabled>Share with dogs</quiet-dropdown-item>
    <quiet-divider></quiet-divider>
    <quiet-dropdown-item value="url">Copy URL</quiet-dropdown-item>
    <quiet-dropdown-item value="embed">Copy embed code</quiet-dropdown-item>
  </quiet-dropdown>  
</quiet-button-group>
```
