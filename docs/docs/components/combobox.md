---
title: Combobox
layout: component
---

```html {.example}
<quiet-combobox
  label="Select a cat breed"
  description="Choose your favorite"
  placeholder="Search breeds..."
  with-clear
>
  <quiet-combobox-item value="persian" selected>Persian</quiet-combobox-item>
  <quiet-combobox-item value="maine-coon">Maine Coon</quiet-combobox-item>
  <quiet-combobox-item value="siamese">Siamese</quiet-combobox-item>
</quiet-combobox>
```

## Examples

TODO

### Multiselect

```html {.example}
<quiet-combobox
  label="Select cat behaviors"
  description="Choose all that apply"
  placeholder="Search behaviors..."
  multiple
  with-clear
>
  <quiet-combobox-item value="purring" selected>Purring</quiet-combobox-item>
  <quiet-combobox-item value="kneading">Kneading</quiet-combobox-item>
  <quiet-combobox-item value="chirping" selected>Chirping</quiet-combobox-item>
  <quiet-combobox-item value="head-bunting">Head bunting</quiet-combobox-item>
  <quiet-combobox-item value="slow-blinking">Slow blinking</quiet-combobox-item>
</quiet-combobox>
```

### Sizes

```html {.example}
<quiet-combobox
  label="Extra small"
  description="Cat colors"
  size="xs"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Small"
  description="Cat colors"
  size="sm"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Medium"
  description="Cat colors"
  size="md"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Large"
  description="Cat colors"
  size="lg"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox
  label="Extra large"
  description="Cat colors"
  size="xl"
  with-clear
>
  <quiet-combobox-item value="tabby" selected>Tabby</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
</quiet-combobox>
```

### Free-form entry (single)

This example allows users to add their own cat names to the list. Type a name that's not in the list and press Enter or click outside the combobox to add it.

```html {.example}
<quiet-combobox
  id="combobox__free-form-single"
  label="Cat names"
  description="Select existing or add your own"
  placeholder="Type or select..."
  with-clear
>
  <quiet-combobox-item value="luna">Luna</quiet-combobox-item>
  <quiet-combobox-item value="milo">Milo</quiet-combobox-item>
  <quiet-combobox-item value="oliver">Oliver</quiet-combobox-item>
  <quiet-combobox-item value="bella">Bella</quiet-combobox-item>
  <quiet-combobox-item value="leo">Leo</quiet-combobox-item>
</quiet-combobox>

<script>
  const combobox = document.getElementById('combobox__free-form-single');
  
  combobox.addEventListener('quiet-entry', (event) => {
    // Prevent the default behavior (clearing the entry)
    event.preventDefault();
    
    const newName = event.detail.value;
    
    // Check if the name already exists (case-insensitive)
    const exists = Array.from(combobox.querySelectorAll('quiet-combobox-item'))
      .some(item => item.textContent.toLowerCase() === newName.toLowerCase());
    
    if (!exists) {
      // Create a new combobox item
      const newItem = document.createElement('quiet-combobox-item');
      newItem.value = newName.toLowerCase();
      newItem.textContent = newName;
      newItem.selected = true; // Auto-select the new item
      
      // Add to the combobox
      combobox.appendChild(newItem);
      
      // Update the combobox value
      const currentValue = combobox.value || [];
      combobox.value = [...currentValue, newName.toLowerCase()];
      
      // Clear the input for multiple mode
      combobox.shadowRoot.querySelector('#text-box').value = '';
    }
  });
</script>
```

### Free-form entry (multiple)

TODO

```html {.example}
<quiet-combobox
  id="combobox__free-form-multiple"
  label="Cat names"
  description="Select existing or add your own"
  placeholder="Type or select..."
  multiple
  with-clear
>
  <quiet-combobox-item value="luna">Luna</quiet-combobox-item>
  <quiet-combobox-item value="milo">Milo</quiet-combobox-item>
  <quiet-combobox-item value="oliver">Oliver</quiet-combobox-item>
  <quiet-combobox-item value="bella">Bella</quiet-combobox-item>
  <quiet-combobox-item value="leo">Leo</quiet-combobox-item>
</quiet-combobox>

<script>
  const combobox = document.getElementById('combobox__free-form-multiple');
  
  combobox.addEventListener('quiet-entry', (event) => {
    // Prevent the default behavior (clearing the entry)
    event.preventDefault();
    
    const newName = event.detail.value;
    
    // Check if the name already exists (case-insensitive)
    const exists = Array.from(combobox.querySelectorAll('quiet-combobox-item'))
      .some(item => item.textContent.toLowerCase() === newName.toLowerCase());
    
    if (!exists) {
      // Create a new combobox item
      const newItem = document.createElement('quiet-combobox-item');
      newItem.value = newName.toLowerCase();
      newItem.textContent = newName;
      newItem.selected = true; // Auto-select the new item
      
      // Add to the combobox
      combobox.appendChild(newItem);
      
      // Update the combobox value
      const currentValue = combobox.value || [];
      combobox.value = [...currentValue, newName.toLowerCase()];
      
      // Clear the input for multiple mode
      combobox.shadowRoot.querySelector('#text-box').value = '';
    }
  });
</script>
```
