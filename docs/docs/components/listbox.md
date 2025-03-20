---
title: Listbox
layout: component
---

Listboxes follow the [ARIA APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) for accessibility. The listbox is labeled for assistive devices and listbox items are announced as options. To function more like native listboxes, the alternate selection model is used for keyboard interaction.

```html {.example}
<quiet-listbox label="Our kittens" description="Select your new friend." multiple>
  <quiet-listbox-item value="1">Bella</quiet-listbox-item>
  <quiet-listbox-item value="2">Luna</quiet-listbox-item>
  <quiet-listbox-item value="3">Meowy McGee</quiet-listbox-item>
  <quiet-listbox-item value="4">Milo</quiet-listbox-item>
  <quiet-listbox-item value="5">Mittens</quiet-listbox-item>
  <quiet-listbox-item value="6">Oliver</quiet-listbox-item>
  <quiet-listbox-item value="7">Pepper</quiet-listbox-item>
  <quiet-listbox-item value="8">Shadow</quiet-listbox-item>
  <quiet-listbox-item value="9">Simba</quiet-listbox-item>
  <quiet-listbox-item value="10">Whiskers</quiet-listbox-item>
</quiet-listbox>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the listbox. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-listbox>
  <span slot="label">Feline <strong>Friends</strong></span>
  <span slot="description">
    For adoption information, <a href="https://example.com/" target="_blank">visit our cat sanctuary</a>.
  </span>
  <quiet-listbox-item value="1">Whiskers (3 years old)</quiet-listbox-item>
  <quiet-listbox-item value="2">Mittens (2 years old)</quiet-listbox-item>
  <quiet-listbox-item value="3">Shadow (5 years old)</quiet-listbox-item>
</quiet-listbox>
```

### Providing options

Create listbox options by adding `<quiet-listbox-item>` elements inside the listbox. Each item should have a `value` attribute that will be submitted with the form.

```html {.example}
<quiet-listbox label="Favorite Cat Toys">
  <quiet-listbox-item value="feather">Feather Wand</quiet-listbox-item>
  <quiet-listbox-item value="laser">Laser Pointer</quiet-listbox-item>
  <quiet-listbox-item value="catnip">Catnip Mouse</quiet-listbox-item>
  <quiet-listbox-item value="tunnel">Crinkle Tunnel</quiet-listbox-item>
  <quiet-listbox-item value="box">Cardboard Box</quiet-listbox-item>
</quiet-listbox>
```

:::warn
Avoid placing interactive elements such as buttons and links inside the listbox item, as this will hinder accessibility and can lead to unexpected behaviors.
:::
  
### Providing an initial value

Add the `selected` attribute to the listbox item you want to select initially. When using `multiple`, you can apply `selected` to more than one option.

```html {.example}
<quiet-listbox label="Favorite Nap Location">
  <quiet-listbox-item value="windowsill">Sunny Windowsill</quiet-listbox-item>
  <quiet-listbox-item value="lap" selected>Human's Lap</quiet-listbox-item>
  <quiet-listbox-item value="bed">Middle of the Bed</quiet-listbox-item>
  <quiet-listbox-item value="keyboard">Computer Keyboard</quiet-listbox-item>
</quiet-listbox>
```

### Getting and setting the selection

Listboxes provide several properties for interacting with their selection state programmatically. Use the `value` property for getting/setting a single value. Use the `selectedValues` property for multiple values. If you need to get or set a list of selected [`<quiet-listbox-item>`](/docs/components/listbox-item) elements, use the `selectedItems` property.

#### Getting the selection

Use `value` to get a single value. To get all selected values, use `selectedValues`. If you need to get an array of DOM elements, use `selectedItems`.

```js
// Get the first selected value
const value = listbox.value;

// Get an array of all selected values
const values = listbox.selectedValues;

// Get an array of all selected listbox item elements
const items = listbox.selectedItems;
```

#### Setting the selection

Use `value` to set a single value. To set multiple values, use `selectedValues`. If you need to get or set the selection via DOM elements, use `selectedItems`.

```js
// Set a single value
listbox.value = 'a';

// Set multiple values
listbox.selectedValues = ['a', 'b', 'c'];

// Set using DOM elements
const itemA = document.querySelectorAll('quiet-listbox-item#a');
const itemB = document.querySelectorAll('quiet-listbox-item#b');
const itemC = document.querySelectorAll('quiet-listbox-item#c');

listbox.selectedItems = [itemA, itemB, itemC];
```

#### Convenience methods

Use `selectAll()` and `deselectAll()` as a quick way to select all or no items.

```js
// Select all items
listbox.selectAll();

// Deselect all items
listbox.deselectAll();
```

### Disabling items

Add the `disabled` attribute to individual listbox items to make them non-selectable.

```html {.example}
<quiet-listbox label="Feeding Schedule">
  <quiet-listbox-item value="morning">Morning (7am)</quiet-listbox-item>
  <quiet-listbox-item value="noon">Noon (12pm)</quiet-listbox-item>
  <quiet-listbox-item value="night" disabled>Night (10pm) - Currently unavailable</quiet-listbox-item>
</quiet-listbox>
```

### Multiple selection

Use the `multiple` attribute to enable multi-selection mode. Users can select multiple items using Ctrl/Cmd+click, Shift+click for ranges, or Ctrl/Cmd+A to select all.

```html {.example}
<quiet-listbox label="Kitty Behavior" description="Select your cat's typical antics." multiple>
  <quiet-listbox-item value="1">Midnight Zoomies</quiet-listbox-item>
  <quiet-listbox-item value="2" selected>Knocking Things Off Tables</quiet-listbox-item>
  <quiet-listbox-item value="3" selected>Ignoring Expensive Toys</quiet-listbox-item>
  <quiet-listbox-item value="4">Sitting on Open Books</quiet-listbox-item>
  <quiet-listbox-item value="5">Watching Birds Through Windows</quiet-listbox-item>
  <quiet-listbox-item value="6">Following You to the Bathroom</quiet-listbox-item>
  <quiet-listbox-item value="7" selected>Demanding Pets Then Biting</quiet-listbox-item>
  <quiet-listbox-item value="8">Sleeping in Weird Positions</quiet-listbox-item>
  <quiet-listbox-item value="9">Hiding in Paper Bags</quiet-listbox-item>
  <quiet-listbox-item value="10">Sudden Grooming Sessions</quiet-listbox-item>
</quiet-listbox>
```

### Filled and unstyled text areas

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the text area's appearance.

```html {.example}
<quiet-listbox label="Normal listbox">
  <quiet-listbox-item value="cat-tree">Cat Tree</quiet-listbox-item>
  <quiet-listbox-item value="food-bowl">Food Bowl</quiet-listbox-item>
  <quiet-listbox-item value="scratching-post">Scratching Post</quiet-listbox-item>
  <quiet-listbox-item value="toy-mouse">Toy Mouse</quiet-listbox-item>
</quiet-listbox>
<br>
<quiet-listbox label="Filled listbox" appearance="filled">
  <quiet-listbox-item value="cat-tree">Cat Tree</quiet-listbox-item>
  <quiet-listbox-item value="food-bowl">Food Bowl</quiet-listbox-item>
  <quiet-listbox-item value="scratching-post">Scratching Post</quiet-listbox-item>
  <quiet-listbox-item value="toy-mouse">Toy Mouse</quiet-listbox-item>
</quiet-listbox>
<br>
<quiet-listbox label="Unstyled listbox" appearance="unstyled">
  <quiet-listbox-item value="cat-tree">Cat Tree</quiet-listbox-item>
  <quiet-listbox-item value="food-bowl">Food Bowl</quiet-listbox-item>
  <quiet-listbox-item value="scratching-post">Scratching Post</quiet-listbox-item>
  <quiet-listbox-item value="toy-mouse">Toy Mouse</quiet-listbox-item>
</quiet-listbox>
```

### Changing the size

Use the `size` attribute to change the listbox's size.

```html {.example}
<quiet-select label="Select a size" style="max-width: 18rem; margin-block-end: 2rem;">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select>

<quiet-listbox 
  size="xs" 
  label="Cat Accessories"
  description="Size changes dynamically based on selection above"
  id="listbox__size"
  multiple
>
  <quiet-listbox-item value="cat-tree">Cat Tree</quiet-listbox-item>
  <quiet-listbox-item value="food-bowl">Food Bowl</quiet-listbox-item>
  <quiet-listbox-item value="scratching-post">Scratching Post</quiet-listbox-item>
  <quiet-listbox-item value="toy-mouse">Toy Mouse</quiet-listbox-item>
</quiet-listbox>

<script>
  const listbox = document.getElementById('listbox__size');
  const select = listbox.previousElementSibling;

  select.addEventListener('quiet-change', () => {
    listbox.size = select.value;
  });  
</script>
```

### Disabling

Add the `disabled` attribute to disable the entire listbox.

```html {.example}
<quiet-listbox label="Treat Options" description="Treats temporarily unavailable." disabled>
  <quiet-listbox-item value="1">Tuna Treats</quiet-listbox-item>
  <quiet-listbox-item value="2" selected>Chicken Bites</quiet-listbox-item>
  <quiet-listbox-item value="3">Salmon Flakes</quiet-listbox-item>
  <quiet-listbox-item value="4">Cheese Nibbles</quiet-listbox-item>
  <quiet-listbox-item value="5">Catnip Crisps</quiet-listbox-item>
</quiet-listbox>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the listbox. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-listbox
  class="quiet-side-label"
  style="--label-width: 10ch;"
  name="fur" 
  label="Fur Type" 
  description="What's your cat's coat like?"
>
  <quiet-listbox-item value="short">Short-haired</quiet-listbox-item>
  <quiet-listbox-item value="long">Long-haired</quiet-listbox-item>
  <quiet-listbox-item value="curly">Curly-coated</quiet-listbox-item>
</quiet-listbox>
<br>
<quiet-listbox
  class="quiet-side-label"
  style="--label-width: 10ch;"
  name="eye" 
  label="Eye Color" 
  description="What color are your cat's eyes?"
>
  <quiet-listbox-item value="green">Green</quiet-listbox-item>
  <quiet-listbox-item value="blue">Blue</quiet-listbox-item>
  <quiet-listbox-item value="amber">Amber</quiet-listbox-item>
</quiet-listbox>
```

### Validation

The `required` attribute can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation).

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-listbox name="meow" label="Meow Volume" required>
    <quiet-listbox-item value="1">Barely Audible</quiet-listbox-item>
    <quiet-listbox-item value="2" selected>Conversational</quiet-listbox-item>
    <quiet-listbox-item value="3">Wake the Neighbors</quiet-listbox-item>
  </quiet-listbox>
  <br>
  <quiet-button type="submit" variant="primary">Save Cat Profile</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the listbox invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, call the method with an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="listbox__custom-validation">
  <quiet-listbox 
    name="purr"
    label="Purr Intensity"
    description="This field will be invalid until custom validation is removed"
  >
    <quiet-listbox-item value="1">Gentle Rumble</quiet-listbox-item>
    <quiet-listbox-item value="2">Medium Motor</quiet-listbox-item>
    <quiet-listbox-item value="3">Thunderous Vibration</quiet-listbox-item>
  </quiet-listbox>
  <br>
  <quiet-button type="submit" variant="primary">Register</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('listbox__custom-validation');
  const listbox = form.querySelector('quiet-listbox');

  listbox.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid listboxes using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="listbox__validation-pseudo">
  <quiet-listbox 
    name="claws"
    label="Claw Trimming"
    description="This field is required for grooming appointments"
    required
  >
    <quiet-listbox-item value="1">Front Paws Only</quiet-listbox-item>
    <quiet-listbox-item value="2">All Paws</quiet-listbox-item>
    <quiet-listbox-item value="3">No Trimming Needed</quiet-listbox-item>
  </quiet-listbox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .listbox__validation-pseudo {
    quiet-listbox:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-listbox:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to interact with the form. More often than not, you'll want to use the `user-valid` and `user-invalid` custom states instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="listbox__validation-custom">
  <quiet-listbox 
    name="diet"
    label="Dietary Needs"
    description="Please select your cat's dietary preference"
    required
  >
    <quiet-listbox-item value="1">Grain-Free Formula</quiet-listbox-item>
    <quiet-listbox-item value="2">Senior Cat Diet</quiet-listbox-item>
    <quiet-listbox-item value="3">Hairball Control</quiet-listbox-item>
  </quiet-listbox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .listbox__validation-custom {
    quiet-listbox:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-listbox:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```
