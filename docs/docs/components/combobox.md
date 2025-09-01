---
title: Combobox
layout: component
---

Comboboxes follow the [ARIA APG combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) for accessibility. The combobox combines a text input with a dropdown list, allowing users to either type to filter options or select from the list. It supports both single and multiple selection modes.

```html {.example}
<quiet-combobox
  label="Select a cat breed"
  description="Type to search or select from the list"
  placeholder="Search breeds..."
  with-clear
>
  <quiet-combobox-item value="persian">Persian</quiet-combobox-item>
  <quiet-combobox-item value="maine-coon">Maine Coon</quiet-combobox-item>
  <quiet-combobox-item value="siamese">Siamese</quiet-combobox-item>
  <quiet-combobox-item value="ragdoll">Ragdoll</quiet-combobox-item>
  <quiet-combobox-item value="british-shorthair">British Shorthair</quiet-combobox-item>
  <quiet-combobox-item value="bengal">Bengal</quiet-combobox-item>
  <quiet-combobox-item value="sphynx">Sphynx</quiet-combobox-item>
  <quiet-combobox-item value="scottish-fold">Scottish Fold</quiet-combobox-item>
</quiet-combobox>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the combobox. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-combobox placeholder="Type to search...">
  <span slot="label">Choose Your <strong>Purrfect</strong> Companion</span>
  <span slot="description">
    Browse our available cats or <a href="https://example.com/" target="_blank">schedule a visit</a>.
  </span>
  <quiet-combobox-item value="luna">Luna (Tabby, 2 years)</quiet-combobox-item>
  <quiet-combobox-item value="milo">Milo (Orange, 1 year)</quiet-combobox-item>
  <quiet-combobox-item value="bella">Bella (Calico, 3 years)</quiet-combobox-item>
</quiet-combobox>
```

### Providing options

Create combobox options by adding `<quiet-combobox-item>` elements inside the combobox. Each item should have a `value` attribute that will be submitted with the form. If no value is provided, the text content is used.

```html {.example}
<quiet-combobox label="Cat Personalities" placeholder="Search personalities...">
  <quiet-combobox-item value="playful">Playful and Energetic</quiet-combobox-item>
  <quiet-combobox-item value="cuddly">Cuddly Lap Cat</quiet-combobox-item>
  <quiet-combobox-item value="independent">Independent Spirit</quiet-combobox-item>
  <quiet-combobox-item value="social">Social Butterfly</quiet-combobox-item>
  <quiet-combobox-item value="curious">Curious Explorer</quiet-combobox-item>
</quiet-combobox>
```

Combobox items can have structured content with icons and details.

```html {.example}
<quiet-combobox label="Adoption Status" placeholder="Filter by status..." id="combobox__structured">
  <quiet-combobox-item value="available">
    <quiet-icon slot="icon" name="circle-check" variant="constructive"></quiet-icon>
    <span>Available Now</span>
    <span slot="details">Ready for adoption</span>
  </quiet-combobox-item>
  <quiet-combobox-item value="pending">
    <quiet-icon slot="icon" name="clock" variant="informative"></quiet-icon>
    <span>Adoption Pending</span>
    <span slot="details">Application in review</span>
  </quiet-combobox-item>
  <quiet-combobox-item value="medical">
    <quiet-icon slot="icon" name="heart" variant="critical"></quiet-icon>
    <span>Medical Hold</span>
    <span slot="details">Recovering from treatment</span>
  </quiet-combobox-item>
  <quiet-combobox-item value="foster">
    <quiet-icon slot="icon" name="home" variant="primary"></quiet-icon>
    <span>Foster Only</span>
    <span slot="details">Temporary care needed</span>
  </quiet-combobox-item>
</quiet-combobox>

<style>
  #combobox__structured {
    quiet-combobox-item {
      padding: 0.75rem;
    }
  }
</style>
```

:::warn
Avoid placing interactive elements such as buttons and links inside the combobox item, as this will hinder accessibility and can lead to unexpected behaviors.
:::

### Providing an initial value

Add the `selected` attribute to the combobox item you want to select initially. When using `multiple`, you can apply `selected` to more than one option.

```html {.example}
<quiet-combobox label="Preferred Feeding Time" placeholder="Select time...">
  <quiet-combobox-item value="morning">Morning (6-9 AM)</quiet-combobox-item>
  <quiet-combobox-item value="noon" selected>Noon (11 AM-1 PM)</quiet-combobox-item>
  <quiet-combobox-item value="evening">Evening (5-7 PM)</quiet-combobox-item>
  <quiet-combobox-item value="night">Night (8-10 PM)</quiet-combobox-item>
</quiet-combobox>
```

### Getting and setting the value

The combobox's value can be accessed and modified through JavaScript. For single selection, use the `value` property. For multiple selection, `value` will be an array.

```js
// Single selection
const combobox = document.querySelector('quiet-combobox');
console.log(combobox.value); // "persian"
combobox.value = 'siamese';

// Multiple selection
const multiCombobox = document.querySelector('quiet-combobox[multiple]');
console.log(multiCombobox.value); // ["persian", "siamese"]
multiCombobox.value = ['bengal', 'ragdoll'];
```

### Filtering behavior

The combobox automatically filters items as you type. Items that don't match the search query are hidden from the dropdown. The search is case-insensitive and matches any part of the item's text content.

```html {.example}
<quiet-combobox 
  label="Find Your Cat Name" 
  placeholder="Try typing 'wh' or 'mit'..."
  with-clear
>
  <quiet-combobox-item value="whiskers">Whiskers</quiet-combobox-item>
  <quiet-combobox-item value="mittens">Mittens</quiet-combobox-item>
  <quiet-combobox-item value="shadow">Shadow</quiet-combobox-item>
  <quiet-combobox-item value="snowball">Snowball</quiet-combobox-item>
  <quiet-combobox-item value="midnight">Midnight</quiet-combobox-item>
  <quiet-combobox-item value="patches">Patches</quiet-combobox-item>
  <quiet-combobox-item value="white-paws">White Paws</quiet-combobox-item>
</quiet-combobox>
```

### Disabling items

Add the `disabled` attribute to individual combobox items to make them non-selectable. Disabled items will still appear in search results but cannot be selected.

```html {.example}
<quiet-combobox label="Veterinary Services" placeholder="Select service...">
  <quiet-combobox-item value="checkup">Annual Checkup</quiet-combobox-item>
  <quiet-combobox-item value="vaccination">Vaccination</quiet-combobox-item>
  <quiet-combobox-item value="spay-neuter" disabled>Spay/Neuter (Fully booked)</quiet-combobox-item>
  <quiet-combobox-item value="dental">Dental Cleaning</quiet-combobox-item>
  <quiet-combobox-item value="emergency" disabled>Emergency Care (Call first)</quiet-combobox-item>
</quiet-combobox>
```

### Multiple selection

Use the `multiple` attribute to enable multi-selection mode. Selected items appear as tags in the input area. Users can remove tags by clicking the × button or pressing Backspace.

```html {.example}
<quiet-combobox
  label="Cat Behaviors"
  description="Select all behaviors your cat exhibits"
  placeholder="Search behaviors..."
  multiple
  with-clear
>
  <quiet-combobox-item value="purring" selected>Purring</quiet-combobox-item>
  <quiet-combobox-item value="kneading">Kneading (Making Biscuits)</quiet-combobox-item>
  <quiet-combobox-item value="chirping" selected>Chirping at Birds</quiet-combobox-item>
  <quiet-combobox-item value="head-bunting">Head Bunting</quiet-combobox-item>
  <quiet-combobox-item value="slow-blinking">Slow Blinking</quiet-combobox-item>
  <quiet-combobox-item value="zoomies">Midnight Zoomies</quiet-combobox-item>
  <quiet-combobox-item value="bringing-gifts">Bringing "Gifts"</quiet-combobox-item>
  <quiet-combobox-item value="chattering">Teeth Chattering</quiet-combobox-item>
</quiet-combobox>
```

:::info
In multiple mode, the dropdown stays open after selecting an item, allowing users to quickly select multiple options. Press Escape or click outside to close the dropdown.
:::

### Appearance variants

Use the `appearance` attribute to change the visual style of the combobox. Options are `normal` (default), `filled`, and `unstyled`.

```html {.example}
<quiet-combobox 
  label="Normal appearance"
  appearance="normal"
  placeholder="Select one"
>
  <quiet-combobox-item value="1">Fluffy</quiet-combobox-item>
  <quiet-combobox-item value="2">Sleek</quiet-combobox-item>
  <quiet-combobox-item value="3">Short-haired</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox 
  label="Filled appearance"
  appearance="filled"
  placeholder="Select one"
>
  <quiet-combobox-item value="1">Fluffy</quiet-combobox-item>
  <quiet-combobox-item value="2">Sleek</quiet-combobox-item>
  <quiet-combobox-item value="3">Short-haired</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox 
  label="Unstyled appearance"
  appearance="unstyled"
  placeholder="Select one"
>
  <quiet-combobox-item value="1">Fluffy</quiet-combobox-item>
  <quiet-combobox-item value="2">Sleek</quiet-combobox-item>
  <quiet-combobox-item value="3">Short-haired</quiet-combobox-item>
</quiet-combobox>
```

### Changing the size

Use the `size` attribute to change the combobox's size. Available sizes are `xs`, `sm`, `md` (default), `lg`, and `xl`.

```html {.example}
<quiet-select label="Select a size" value="md" style="max-width: 18rem; margin-block-end: 2rem;">
  <option value="xs">Extra small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
  <option value="xl">Extra large</option>
</quiet-select>

<quiet-combobox 
  size="md" 
  label="Cat Coat Pattern"
  description="Size changes dynamically based on selection above"
  placeholder="Search patterns..."
  id="combobox__size"
  with-clear
>
  <quiet-combobox-item value="solid">Solid Color</quiet-combobox-item>
  <quiet-combobox-item value="tabby">Tabby Stripes</quiet-combobox-item>
  <quiet-combobox-item value="calico">Calico</quiet-combobox-item>
  <quiet-combobox-item value="tortoiseshell">Tortoiseshell</quiet-combobox-item>
  <quiet-combobox-item value="tuxedo">Tuxedo</quiet-combobox-item>
  <quiet-combobox-item value="pointed">Pointed (Siamese)</quiet-combobox-item>
</quiet-combobox>

<script>
  const combobox = document.getElementById('combobox__size');
  const select = combobox.previousElementSibling;

  select.addEventListener('quiet-change', () => {
    combobox.size = select.value;
  });  
</script>
```

### Pill shape

Add the `pill` attribute to give the combobox rounded edges.

```html {.example}
<quiet-combobox 
  label="Quick Search"
  placeholder="Find a kitty..."
  pill
  with-clear
>
  <quiet-combobox-item value="luna">Luna</quiet-combobox-item>
  <quiet-combobox-item value="milo">Milo</quiet-combobox-item>
  <quiet-combobox-item value="oliver">Oliver</quiet-combobox-item>
  <quiet-combobox-item value="bella">Bella</quiet-combobox-item>
</quiet-combobox>
```

### Clear button

Add the `with-clear` attribute to show a clear button when the combobox has a value. This allows users to quickly clear their selection.

```html {.example}
<quiet-combobox 
  label="With clear button"
  placeholder="Select and then clear..."
  with-clear
>
  <quiet-combobox-item value="yes" selected>Yes, I want treats!</quiet-combobox-item>
  <quiet-combobox-item value="no">No treats needed</quiet-combobox-item>
  <quiet-combobox-item value="maybe">Maybe later</quiet-combobox-item>
</quiet-combobox>
```

### Dropdown placement

Use the `placement` attribute to control where the dropdown appears relative to the input. Options include `bottom` (default), `bottom-start`, `bottom-end`, `top`, `top-start`, and `top-end`.

```html {.example}
<quiet-combobox 
  label="Dropdown opens above"
  placeholder="Select an option..."
  placement="top"
  style="margin-top: 200px;"
>
  <quiet-combobox-item value="1">First option</quiet-combobox-item>
  <quiet-combobox-item value="2">Second option</quiet-combobox-item>
  <quiet-combobox-item value="3">Third option</quiet-combobox-item>
</quiet-combobox>
```

### Disabling the combobox

Add the `disabled` attribute to disable the entire combobox.

```html {.example}
<quiet-combobox 
  label="Grooming Services" 
  description="Currently unavailable"
  placeholder="Service selection disabled..."
  disabled
>
  <quiet-combobox-item value="bath">Bath & Blow-dry</quiet-combobox-item>
  <quiet-combobox-item value="trim" selected>Nail Trim</quiet-combobox-item>
  <quiet-combobox-item value="full">Full Grooming</quiet-combobox-item>
</quiet-combobox>
```

### Showing labels on the side

With the [`quiet-side-label`](/docs/css-utilities/#side-labels) utility, you can show labels on the side instead of on top of the combobox. You can control the width of the label by setting the `--label-width` custom property.

```html {.example}
<quiet-combobox
  class="quiet-side-label"
  style="--label-width: 12ch;"
  name="age" 
  label="Cat's Age" 
  description="How old is your cat?"
  placeholder="Select age range..."
>
  <quiet-combobox-item value="kitten">Kitten (0-1 year)</quiet-combobox-item>
  <quiet-combobox-item value="young">Young (1-3 years)</quiet-combobox-item>
  <quiet-combobox-item value="adult">Adult (3-7 years)</quiet-combobox-item>
  <quiet-combobox-item value="senior">Senior (7+ years)</quiet-combobox-item>
</quiet-combobox>
<br>
<quiet-combobox
  class="quiet-side-label"
  style="--label-width: 12ch;"
  name="activity" 
  label="Activity Level" 
  description="How active is your cat?"
  placeholder="Select activity..."
>
  <quiet-combobox-item value="low">Couch Potato</quiet-combobox-item>
  <quiet-combobox-item value="moderate">Moderately Active</quiet-combobox-item>
  <quiet-combobox-item value="high">Very Energetic</quiet-combobox-item>
</quiet-combobox>
```

### Validation

The `required` attribute can be used to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation).

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-combobox 
    name="emergency-contact" 
    label="Emergency Vet Contact" 
    placeholder="Select a veterinarian..."
    required
  >
    <quiet-combobox-item value="dr-smith">Dr. Smith - City Animal Hospital</quiet-combobox-item>
    <quiet-combobox-item value="dr-jones">Dr. Jones - Pet Emergency Center</quiet-combobox-item>
    <quiet-combobox-item value="dr-brown">Dr. Brown - 24/7 Pet Care</quiet-combobox-item>
  </quiet-combobox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the combobox invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, call the method with an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="combobox__custom-validation">
  <quiet-combobox 
    name="special-diet"
    label="Special Dietary Needs"
    description="This field demonstrates custom validation"
    placeholder="Select diet..."
  >
    <quiet-combobox-item value="regular">Regular Diet</quiet-combobox-item>
    <quiet-combobox-item value="grain-free">Grain-Free</quiet-combobox-item>
    <quiet-combobox-item value="prescription">Prescription Diet</quiet-combobox-item>
  </quiet-combobox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('combobox__custom-validation');
  const combobox = form.querySelector('quiet-combobox');

  combobox.setCustomValidity('Please consult with your vet first!');
  
  // Clear validation after user selects an option
  combobox.addEventListener('quiet-change', () => {
    combobox.setCustomValidity('');
  });
</script>
```

### Styling validation

You can style valid and invalid comboboxes using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="combobox__validation-pseudo">
  <quiet-combobox 
    name="chip-id"
    label="Microchip ID"
    description="Required for registration"
    placeholder="Enter or select chip ID..."
    required
  >
    <quiet-combobox-item value="chip-12345">CHIP-12345</quiet-combobox-item>
    <quiet-combobox-item value="chip-67890">CHIP-67890</quiet-combobox-item>
    <quiet-combobox-item value="chip-24680">CHIP-24680</quiet-combobox-item>
  </quiet-combobox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .combobox__validation-pseudo {
    quiet-combobox:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-combobox:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to interact with the form. More often than not, you'll want to use the `user-valid` and `user-invalid` custom states instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="combobox__validation-custom">
  <quiet-combobox 
    name="insurance"
    label="Pet Insurance Provider"
    description="Select your insurance company"
    placeholder="Search providers..."
    required
  >
    <quiet-combobox-item value="healthy-paws">Healthy Paws</quiet-combobox-item>
    <quiet-combobox-item value="petplan">Petplan</quiet-combobox-item>
    <quiet-combobox-item value="embrace">Embrace</quiet-combobox-item>
    <quiet-combobox-item value="trupanion">Trupanion</quiet-combobox-item>
  </quiet-combobox>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .combobox__validation-custom {
    quiet-combobox:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-combobox:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

### Start and end content

Use the `start` and `end` slots to add presentational icons or text. Avoid interactive elements such as buttons, links, etc. Works well with [`<quiet-icon>`](/docs/components/icon) and `<svg>` elements.

```html {.example}
<quiet-combobox name="breed" label="Cat Breed" with-clear>
  <quiet-icon slot="start" name="cat"></quiet-icon>
  <quiet-combobox-item value="persian">Persian</quiet-combobox-item>
  <quiet-combobox-item value="maine-coon">Maine Coon</quiet-combobox-item>
  <quiet-combobox-item value="siamese">Siamese</quiet-combobox-item>
  <quiet-combobox-item value="ragdoll">Ragdoll</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox name="toy" label="Cat Toy" placeholder="Choose a toy" with-clear>
  <quiet-icon slot="end" name="gift"></quiet-icon>
  <quiet-combobox-item value="feather-wand">Feather Wand</quiet-combobox-item>
  <quiet-combobox-item value="laser-pointer">Laser Pointer</quiet-combobox-item>
  <quiet-combobox-item value="catnip-mouse">Catnip Mouse</quiet-combobox-item>
  <quiet-combobox-item value="puzzle-feeder">Puzzle Feeder</quiet-combobox-item>
</quiet-combobox>

<br>

<quiet-combobox name="vet-visit" label="Visit Type" multiple with-clear>
  <quiet-icon slot="start" name="cat"></quiet-icon>
  <quiet-icon slot="end" name="clipboard-heart"></quiet-icon>
  <quiet-combobox-item value="checkup">Annual Checkup</quiet-combobox-item>
  <quiet-combobox-item value="vaccination">Vaccination</quiet-combobox-item>
  <quiet-combobox-item value="dental">Dental Cleaning</quiet-combobox-item>
  <quiet-combobox-item value="grooming">Grooming</quiet-combobox-item>
</quiet-combobox>
```