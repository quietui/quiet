---
title: Listbox
layout: component
---

Listboxes follow the [ARIA APG listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) for accessibility. The listbox is labeled for assistive devices and listbox items are announced as options. To function more like native listboxes, the alternate selection model is used for keyboard interaction.

```html {.example}
<quiet-listbox label="Our kittens" description="Select your new friends." multiple>
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

Listbox items can have structured content, too.

```html {.example}
<quiet-listbox label="Favorite Cat Toys" id="listbox__options">
  <quiet-listbox-item value="feather">
    <h4>Feather Wand</h4>
    <small aria-hidden="true">Interactive toy that mimics bird movements</small>
  </quiet-listbox-item>
  <quiet-listbox-item value="laser">
    <h4>Laser Pointer</h4>
    <small aria-hidden="true">Creates a moving red dot for cats to chase</small>
  </quiet-listbox-item>
  <quiet-listbox-item value="catnip">
    <h4>Catnip Mouse</h4>
    <small aria-hidden="true">Soft toy filled with enticing catnip</small>
  </quiet-listbox-item>
  <quiet-listbox-item value="tunnel">
    <h4>Crinkle Tunnel</h4>
    <small aria-hidden="true">Collapsible tunnel with crinkly material cats love</small>
  </quiet-listbox-item>
  <quiet-listbox-item value="box">
    <h4>Cardboard Box</h4>
    <small aria-hidden="true">Simple but beloved hiding spot for feline friends</small>
  </quiet-listbox-item>
</quiet-listbox>

<style>
  #listbox__options {
    &::part(listbox) {
      height: auto; 
    }

    h4 {
      font-size: 1.125rem;
      font-weight: var(--quiet-font-weight-semibold);
      line-height: 1.4;
      margin-block: 0;
    }

    quiet-listbox-item:state(selected) small {
      color: var(--quiet-primary-text-on-soft);
    }
  }
</style>
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
const itemA = document.querySelector('quiet-listbox-item#a');
const itemB = document.querySelector('quiet-listbox-item#b');
const itemC = document.querySelector('quiet-listbox-item#c');

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

Use the `multiple` attribute to enable multi-selection mode. Users can select multiple items using <quiet-hotkey keys="$command" platform="mac"></quiet-hotkey> or <quiet-hotkey keys="$control" platform="windows"></quiet-hotkey> + click, <quiet-hotkey keys="$shift"></quiet-hotkey> + click for ranges, or <quiet-hotkey keys="$cmdctrl A"></quiet-hotkey> to select all. For coarse pointers, such as touch, tapping an item will toggle the selection.

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
    <quiet-listbox-item value="2">Conversational</quiet-listbox-item>
    <quiet-listbox-item value="3">Wake the Neighbors</quiet-listbox-item>
  </quiet-listbox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
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
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
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

### Styling listboxes

Listboxes are styled like form controls for consistency, but feel free to customize them to your liking. Here's an example you might see in an email client.

```html {.example}
<quiet-listbox 
  label="Select a message to view" 
  class="quiet-vh-label" 
  id="listbox__styling"
>
  <quiet-listbox-item value="1000">
    <quiet-avatar image="https://images.unsplash.com/photo-1735820474275-dd0ff4f28d71?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h4 class="name">Sir Fluffington III</h4>
    <time class="time" datetime="2025-03-20T14:45">2:45 PM</time>
    <div class="summary" aria-hidden="true">Just knocked your favorite vase off the shelf. Not sorry.</div>
    <quiet-icon class="attachment" name="paperclip" label="1 attachment"></quiet-icon>
  </quiet-listbox-item>

  <quiet-listbox-item value="1001">
    <quiet-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h4 class="name">Captain Whiskers</h4>
    <time class="time" datetime="2025-03-20T13:37">1:37 PM</time>
    <div class="summary" aria-hidden="true">Require immediate attention. Food bowl is half empty. This is an emergency.</div>
    <quiet-icon class="attachment" name="flag" family="filled" label="Urgent!"></quiet-icon>
  </quiet-listbox-item>

  <quiet-listbox-item value="1002">
    <quiet-avatar image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h4 class="name">Lady Purrlington</h4>
    <time class="time" datetime="2025-03-20T11:15">11:15 AM</time>
    <div class="summary" aria-hidden="true">Your lap is required for napping purposes at 3 PM sharp. Clear your schedule.</div>
  </quiet-listbox-item>
  
  <quiet-listbox-item value="1003">
    <quiet-avatar image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h4 class="name">Meowy McGee</h4>
    <time class="time" datetime="2025-03-20T10:22">10:22 AM</time>
    <div class="summary" aria-hidden="true">Spotted a bird outside. Making weird chattering noises. Send help.</div>
    <quiet-icon class="attachment" name="paperclip" label="1 attachment"></quiet-icon>
  </quiet-listbox-item>
  
  <quiet-listbox-item value="1004">
    <quiet-avatar image="https://images.unsplash.com/photo-1579014868745-23e405c5605d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
    <h4 class="name">Chairman Meow</h4>
    <time class="time" datetime="2025-03-20T09:30">9:30 AM</time>
    <div class="summary" aria-hidden="true">Have claimed the new cardboard box. All other cats shall bow to my superiority.</div>
  </quiet-listbox-item>  
</quiet-listbox>

<style>
  #listbox__styling {
    max-width: 600px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

    &::part(listbox) {
      height: auto;
      padding: 0;
    }
    
    quiet-listbox-item {
      display: grid;
      grid-template-areas: 
        "avatar name time"
        "avatar summary attachment";
      grid-template-columns: auto 1fr auto;
      grid-gap: 4px .75em;
      padding: .75em;
      border-bottom-color: var(--quiet-neutral-stroke-softer);
      border-radius: 0;
      align-items: center;
    }

    quiet-listbox-item:has(+ quiet-listbox-item:state(selected)),
    quiet-listbox-item:state(selected) {
      border-bottom-color: var(--quiet-neutral-stroke-soft);
    }

    &:state(focused) {
      quiet-listbox-item:has(+ quiet-listbox-item:state(selected)),
      quiet-listbox-item:state(selected) {
        border-bottom-color: var(--quiet-primary-stroke-soft);
      }
    }
    
    quiet-avatar {
      grid-area: avatar;
      margin-right: 0.25rem;
    }
    
    .name {
      grid-area: name;
      margin: 0;
      font-size: 0.9375rem;
      font-weight: var(--quiet-font-weight-semibold);
    }
    
    .time {
      grid-area: time;
      font-size: 0.875em;
      color: var(--quiet-text-muted);
      justify-self: end;
      font-style: normal;
    }
    
    .summary {
      grid-area: summary;
      color: var(--quiet-text-muted);
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }
    
    .attachment {
      grid-area: attachment;
      color: var(--quiet-text-muted);
      justify-self: end;
      font-size: 0.875rem;

      &[name="flag"] {
        color: crimson;
      }
    }

    quiet-listbox-item:state(selected) {
      .name,
      .time,
      .summary,
      .attachment {
        color: var(--quiet-primary-text-on-soft);
      }
    }
  }
</style>
```

:::info
Note the use of `aria-hidden` on summaries, which reduces verbosity when used with screen readers.
:::
