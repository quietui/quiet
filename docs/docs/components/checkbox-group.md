---
title: Checkbox Group
layout: component
---

You can use checkboxes without grouping them but, when you want to apply a label and description to a group of related checkboxes, this component will come in handy.

```html {.example}
<quiet-checkbox-group label="Things for the cats" description="Select as few or as many as you'd like.">
  <quiet-checkbox name="catnip">Catnip</quiet-checkbox>
  <quiet-checkbox name="food">Food</quiet-checkbox>
  <quiet-checkbox name="litter">Litter</quiet-checkbox>
  <quiet-checkbox name="treats">Treats</quiet-checkbox>
</quiet-checkbox-group>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the checkbox group. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-checkbox-group label="Things for the cats">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
  <quiet-checkbox name="catnip">Catnip</quiet-checkbox>
  <quiet-checkbox name="food">Food</quiet-checkbox>
  <quiet-checkbox name="litter">Litter</quiet-checkbox>
  <quiet-checkbox name="treats">Treats</quiet-checkbox>
</quiet-checkbox-group>
```


### Changing the orientation

You can change the orientation of grouped checkboxes by setting the `orientation` attribute to `horizontal` or `vertical`.

```html {.example}
<quiet-checkbox-group label="Places to hide" orientation="vertical">
  <quiet-checkbox name="couch">Behind the couch</quiet-checkbox>
  <quiet-checkbox name="backyard">In the backyard</quiet-checkbox>
  <quiet-checkbox name="fridge">On top of the refrigerator</quiet-checkbox>
  <quiet-checkbox name="bed">Under the bed</quiet-checkbox>
</quiet-checkbox-group>
```

### Grouping switches

You can also group [switches](/docs/components/switch) in a checkbox group. For best results, avoid mixing checkboxes and switches in the same group.

```html {.example}
<quiet-checkbox-group 
  label="Remote control kitty" 
  description="Toggle an option and watch your cat react instantly!"
>
  <quiet-switch name="eating">Eating</quiet-switch>
  <quiet-switch name="hiding">Hiding</quiet-switch>
  <quiet-switch name="purring">Purring</quiet-switch>
  <quiet-switch name="sleeping">Sleeping</quiet-switch>
</quiet-checkbox-group>
```

### Adding a required indicator

Use the `required` attribute to show a required indicator in the checkbox group's label. This just adds a visual indicator. To perform validation, use the checkbox's `required` and/or `custom-validity` attributes.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="checkbox-group__required">
  <quiet-checkbox-group 
    label="Things for the cats" 
    description="Please select at least two items."
    required 
  >
    <quiet-checkbox name="catnip" custom-validity="Select at least two items before continuing.">Catnip</quiet-checkbox>
    <quiet-checkbox name="food">Food</quiet-checkbox>
    <quiet-checkbox name="litter">Litter</quiet-checkbox>
    <quiet-checkbox name="treats">Treats</quiet-checkbox>
  </quiet-checkbox-group>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script>
  const form = document.getElementById('checkbox-group__required');
  const checkboxes = form.querySelectorAll('quiet-checkbox');
  const firstCheckbox = checkboxes[0];
  const validationMessage = firstCheckbox.getAttribute('custom-validity');

  // Listen for checkboxes to be checked
  form.addEventListener('quiet-input', () => {
    const numChecked = [...checkboxes].filter(checkbox => checkbox.checked).length;

    // If less than two are checked, set the custom validation message. Otherwise, remove it.
    if (numChecked < 2) {
      firstCheckbox.customValidity = validationMessage;
    } else {
      firstCheckbox.customValidity = '';
    }    
  });
</script>
```
