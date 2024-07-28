---
title: Color Picker
layout: component
---

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-color-picker 
    label="Select a color"
    description="Any color will do just fine."
    name="color"
    value="#ffcc00" 
    with-opacity
    with-preview
    swatches="
      #09090b #71717a #ef4444 #f97316 
      #f59e0b #eab308 #84cc16 #22c55e 
      #10b981 #14b8a6 #06b6d4 #3b82f6 
      #6366f1 #a855f7 #d946ef #ec4899
    "  
  ></quiet-color-picker>
  <br>
  <quiet-button type="submit">Submit</quiet-button>
</form>
```

## Examples

- Swatches
- Format
- Color preview
- Events
- Getting/setting hue, saturation, lightness, opacity, value

### Enabling opacity

Add the `with-opacity` attribute to allow the user to adjust transparency.

```html {.example}
<quiet-color-picker value="#ffcc00" with-opacity></quiet-color-picker>
```

### Showing swatches

Add the `with-swatches` attribute to show swatches.

```html {.example}
<quiet-color-picker 
  value="#ffcc00" 
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899
  "
></quiet-color-picker>
```


### Disabling color pickers

To disable a color picker, add the `disabled` attribute.

```html {.example}
<quiet-color-picker 
  disabled 
  value="#6366f1"
  with-opacity 
  swatches="
    #09090b #71717a #ef4444 #f97316 
    #f59e0b #eab308 #84cc16 #22c55e 
    #10b981 #14b8a6 #06b6d4 #3b82f6 
    #6366f1 #a855f7 #d946ef #ec4899  
  "
></quiet-color-picker>
```
