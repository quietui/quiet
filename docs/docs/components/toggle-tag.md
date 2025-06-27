---
title: Toggle Tag
layout: component
---

Toggle tags can be used just like [checkboxes](/docs/components/checkbox) and [switches](/docs/components/switch) to turn features on and off. You can listen for state changes with the `quiet-input` event and submit them with forms by adding `name` and `value` attributes.

Toggle tags should generally be used in groups. In fact, they work best when place inside of [checkbox groups](/docs/components/checkbox-group). Assistive devices will recognize tag checkboxes as standard checkboxes.

```html {.example}
<quiet-checkbox-group label="Amenities" style="--gap: .5em; max-width: 460px;">
  <quiet-toggle-tag name="amenities" value="coffee">
    <quiet-icon name="coffee"></quiet-icon> 
    Coffee
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="laundry">
    <quiet-icon name="wash-machine"></quiet-icon> 
    Laundry
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="microwave">
    <quiet-icon name="microwave"></quiet-icon> 
    Microwave
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="parking">
    <quiet-icon name="parking"></quiet-icon> 
    Parking
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="pet-friendly">
    <quiet-icon name="cat"></quiet-icon> 
    Pet friendly
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="pool">
    <quiet-icon name="pool"></quiet-icon> 
    Pool
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="tv">
    <quiet-icon name="device-tv"></quiet-icon> 
    TV
  </quiet-toggle-tag>
  <quiet-toggle-tag name="amenities" value="wifi">
    <quiet-icon name="wifi"></quiet-icon> 
    Wifi
  </quiet-toggle-tag>
</quiet-checkbox-group>
```

## Examples

### Checked initially

Add the `checked` attribute to check the toggle tag initially.

```html {.example}
<quiet-checkbox-group label="Default notifications" style="--gap: .5em;">
  <quiet-toggle-tag name="notifications" value="email" checked>
    <quiet-icon name="mail"></quiet-icon>
    Email updates
  </quiet-toggle-tag>
  <quiet-toggle-tag name="notifications" value="push" checked>
    <quiet-icon name="bell"></quiet-icon>
    Push notifications
  </quiet-toggle-tag>
  <quiet-toggle-tag name="notifications" value="sms">
    <quiet-icon name="message-circle"></quiet-icon>
    SMS alerts
  </quiet-toggle-tag>
  <quiet-toggle-tag name="notifications" value="phone">
    <quiet-icon name="phone"></quiet-icon>
    Phone calls
  </quiet-toggle-tag>
</quiet-checkbox-group>
```

### Changing the size

Use the `size` attribute to make toggle tags larger or smaller. The available sizes are `xs`, `sm`, `md` (default), `lg`, and `xl`.

```html {.example}
<div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
 <div>
   <label style="display: block; margin-block-end: 0.5rem; font-weight: 600;">Extra small</label>
   <quiet-checkbox-group style="--gap: .5em;">
     <quiet-toggle-tag size="xs" name="xs-sizes" value="xs">XS</quiet-toggle-tag>
     <quiet-toggle-tag size="xs" name="xs-sizes" value="s">S</quiet-toggle-tag>
     <quiet-toggle-tag size="xs" name="xs-sizes" value="m">M</quiet-toggle-tag>
     <quiet-toggle-tag size="xs" name="xs-sizes" value="l">L</quiet-toggle-tag>
     <quiet-toggle-tag size="xs" name="xs-sizes" value="xl">XL</quiet-toggle-tag>
   </quiet-checkbox-group>
 </div>
 
 <div>
   <label style="display: block; margin-block-end: 0.5rem; font-weight: 600;">Small</label>
   <quiet-checkbox-group style="--gap: .5em;">
     <quiet-toggle-tag size="sm" name="sm-sizes" value="xs">XS</quiet-toggle-tag>
     <quiet-toggle-tag size="sm" name="sm-sizes" value="s">S</quiet-toggle-tag>
     <quiet-toggle-tag size="sm" name="sm-sizes" value="m">M</quiet-toggle-tag>
     <quiet-toggle-tag size="sm" name="sm-sizes" value="l">L</quiet-toggle-tag>
     <quiet-toggle-tag size="sm" name="sm-sizes" value="xl">XL</quiet-toggle-tag>
   </quiet-checkbox-group>
 </div>
 
 <div>
   <label style="display: block; margin-block-end: 0.5rem; font-weight: 600;">Medium (default)</label>
   <quiet-checkbox-group style="--gap: .5em;">
     <quiet-toggle-tag size="md" name="md-sizes" value="xs">XS</quiet-toggle-tag>
     <quiet-toggle-tag size="md" name="md-sizes" value="s">S</quiet-toggle-tag>
     <quiet-toggle-tag size="md" name="md-sizes" value="m">M</quiet-toggle-tag>
     <quiet-toggle-tag size="md" name="md-sizes" value="l">L</quiet-toggle-tag>
     <quiet-toggle-tag size="md" name="md-sizes" value="xl">XL</quiet-toggle-tag>
   </quiet-checkbox-group>
 </div>
 
 <div>
   <label style="display: block; margin-block-end: 0.5rem; font-weight: 600;">Large</label>
   <quiet-checkbox-group style="--gap: .5em;">
     <quiet-toggle-tag size="lg" name="lg-sizes" value="xs">XS</quiet-toggle-tag>
     <quiet-toggle-tag size="lg" name="lg-sizes" value="s">S</quiet-toggle-tag>
     <quiet-toggle-tag size="lg" name="lg-sizes" value="m">M</quiet-toggle-tag>
     <quiet-toggle-tag size="lg" name="lg-sizes" value="l">L</quiet-toggle-tag>
     <quiet-toggle-tag size="lg" name="lg-sizes" value="xl">XL</quiet-toggle-tag>
   </quiet-checkbox-group>
 </div>
 
 <div>
   <label style="display: block; margin-block-end: 0.5rem; font-weight: 600;">Extra large</label>
   <quiet-checkbox-group style="--gap: .5em;">
     <quiet-toggle-tag size="xl" name="xl-sizes" value="xs">XS</quiet-toggle-tag>
     <quiet-toggle-tag size="xl" name="xl-sizes" value="s">S</quiet-toggle-tag>
     <quiet-toggle-tag size="xl" name="xl-sizes" value="m">M</quiet-toggle-tag>
     <quiet-toggle-tag size="xl" name="xl-sizes" value="l">L</quiet-toggle-tag>
     <quiet-toggle-tag size="xl" name="xl-sizes" value="xl">XL</quiet-toggle-tag>
   </quiet-checkbox-group>
 </div>
</div>
```

### Disabling toggle tags

Use the `disabled` attribute to prevent interaction with toggle tags. Disabled tags will appear faded and won't respond to clicks or keyboard input.

```html {.example}
<quiet-checkbox-group label="Options" style="--gap: .5em;">
  <quiet-toggle-tag name="options" value="option1">Option 1</quiet-toggle-tag>
  <quiet-toggle-tag name="options" value="option2" disabled>Option 2</quiet-toggle-tag>
  <quiet-toggle-tag name="options" value="option3">Option 3</quiet-toggle-tag>
</quiet-checkbox-group>
```

### Handling form submission

Toggle tags are form-associated custom elements that behave like native checkboxes when submitting forms. When a toggle tag is checked, its `name` and `value` attributes are included in the form data, just like a standard checkbox.

```html {.example}
<form id="toggle-tag__form" action="about:blank" target="_blank">
  <quiet-checkbox-group label="Languages" style="--gap: .5em; margin-bottom: 1.5rem;">
    <quiet-toggle-tag name="languages" value="cpp">C++</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="go">Go</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="javascript" checked>JavaScript</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="php">PHP</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="python">Python</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="qb">QBasic</quiet-toggle-tag>
    <quiet-toggle-tag name="languages" value="rust">Rust</quiet-toggle-tag>
  </quiet-checkbox-group>
  
  <quiet-button type="submit">Submit</quiet-button>
</form>
```
