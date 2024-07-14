---
title: Radio
layout: component
---

Radios follow the [ARIA APG radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for accessibility. Unlike native radio buttons, Quiet radio items must be placed inside a radio controller as shown below.

```html {.example}
<quiet-radio 
  label="Color" 
  description="Select a color for your new cat" 
  name="color" 
  value="black"
>
  <quiet-radio-item value="black">Black</quiet-radio-item>
  <quiet-radio-item value="white">White</quiet-radio-item>
  <quiet-radio-item value="orange">Orange</quiet-radio-item>
  <quiet-radio-item value="gray">Gray</quiet-radio-item>
</quiet-radio>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the radio. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-radio label="Favorite pet" name="animal">
  <span slot="description">
    For more information, <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
  <quiet-radio-item value="cat">Cat</quiet-radio-item>
  <quiet-radio-item value="dog">Dog</quiet-radio-item>
  <quiet-radio-item value="bird">Bird</quiet-radio-item>
  <quiet-radio-item value="lizard">Lizard</quiet-radio-item>
</quiet-radio-item>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the radio. The value should match an existing radio item's value.

```html {.example}
<quiet-radio label="Fur type" name="fur" value="short">
  <quiet-radio-item value="short">Short</quiet-radio-item>
  <quiet-radio-item value="medium">Medium</quiet-radio-item>
  <quiet-radio-item value="long">Long</quiet-radio-item>
  <quiet-radio-item value="hairless">Hairless</quiet-radio-item>
</quiet-radio-item>
```

### Changing the orientation

To stack radio items on top of each other instead of side by side, set the `orientation` attribute to `vertical`.

```html {.example}
<quiet-radio orientation="vertical" label="Fur type" name="fur">
  <quiet-radio-item value="short">Short</quiet-radio-item>
  <quiet-radio-item value="medium">Medium</quiet-radio-item>
  <quiet-radio-item value="long">Long</quiet-radio-item>
  <quiet-radio-item value="hairless">Hairless</quiet-radio-item>
</quiet-radio-item>
```

### Filled radios

Set the `appearance` attribute to `filled` to change a radio item's appearance.

```html {.example}
<quiet-radio label="Favorite pet" name="animal">
  <quiet-radio-item appearance="filled" value="cat">Cat</quiet-radio-item>
  <quiet-radio-item appearance="filled" value="dog">Dog</quiet-radio-item>
  <quiet-radio-item appearance="filled" value="bird">Bird</quiet-radio-item>
  <quiet-radio-item appearance="filled" value="lizard">Lizard</quiet-radio-item>
</quiet-radio>
```

### Changing the size

Use the `size` attribute to change a radio item's size.

```html {.example}
<quiet-radio label="Select a size" name="size" orientation="vertical">
  <quiet-radio-item size="xs" value="a">Extra small</quiet-radio-item>
  <quiet-radio-item size="sm" value="b">Small</quiet-radio-item>
  <quiet-radio-item size="md" value="c">Medium</quiet-radio-item>
  <quiet-radio-item size="lg" value="d">Large</quiet-radio-item>
  <quiet-radio-item size="xl" value="e">Extra large</quiet-radio-item>
</quiet-radio>
```

### Disabling radio items

You can disable one or more radio items by adding the `disabled` attribute.

```html {.example}
<quiet-radio label="Favorite pet" name="animal">
  <quiet-radio-item value="cat">Cat</quiet-radio-item>
  <quiet-radio-item value="dog" disabled>Dog</quiet-radio-item>
  <quiet-radio-item value="bird">Bird</quiet-radio-item>
  <quiet-radio-item value="lizard">Lizard</quiet-radio-item></quiet-radio>
```

### Validating radios

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until a radio item is checked.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-radio label="Select one" name="animal" required>
    <quiet-radio-item value="cats">Cats</quiet-radio-item>
    <quiet-radio-item value="dogs">Dogs</quiet-radio-item>
  </quiet-radio>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `custom-validity` attribute to make the radio invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-radio label="Select one" name="animal" custom-validity="Not so fast, bubba!">
    <quiet-radio-item value="cats">Cats</quiet-radio-item>
    <quiet-radio-item value="dogs">Dogs</quiet-radio-item>
  </quiet-radio>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

:::info
Most validation attributes work exactly like their native counterparts. However, the `custom-validity` attribute is offered in lieu of the `setCustomValidity()` method. This allows you to declaratively set custom errors instead of having to call a method with JavaScript.
:::


### Styling validation

You can style valid and invalid radios using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="radio__validation-pseudo">
  <quiet-radio label="Select one" name="animal" required>
    <quiet-radio-item value="cats">Cats</quiet-radio-item>
    <quiet-radio-item value="dogs">Dogs</quiet-radio-item>
  </quiet-radio>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .radio__validation-pseudo {
    quiet-radio:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-radio:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="radio__validation-custom">
  <quiet-radio label="Select one" name="animal" required>
    <quiet-radio-item value="cats">Cats</quiet-radio-item>
    <quiet-radio-item value="dogs">Dogs</quiet-radio-item>
  </quiet-radio>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .radio__validation-custom {
    quiet-radio:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-radio:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

### Styling radios

Radios come with a simple, minimal appearance. Feel free to customize them with your own styles. Here are some examples, for inspiration.

```html {.example}
<quiet-radio label="How would you like to login?" name="auth" class="radio__auth">
  <quiet-radio-item value="magic">
    <quiet-icon name="wand"></quiet-icon> Magic link
  </quiet-radio-item>
  <quiet-radio-item value="password">
    <quiet-icon name="password"></quiet-icon> Password
  </quiet-radio-item>
</quiet-radio>

<style>
  .radio__auth {
    quiet-radio-item {
      background: var(--quiet-paper);
      border: solid 1px var(--quiet-neutral-stroke-soft);
      border-radius: .5rem;
      box-shadow: var(--quiet-shadow-softer);
      padding: 1rem;
      cursor: pointer;
    }

    quiet-radio-item:state(checked) {
      background-color: var(--quiet-primary-fill-softer);
      border-color: var(--quiet-primary-stroke-soft);
    }

    quiet-radio-item:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }    
  }
</style>
```

```html {.example}
<quiet-radio 
  label="Select a plan" 
  description="All plans come with a free cat"
  name="plan" 
  class="radio__hosting"
>
  <quiet-radio-item value="startup">
    Startup<br>
    <small>12GB &middot; 6 CPUs &middot; 256GB SSD</small> 
  </quiet-radio-item>

  <quiet-radio-item value="business">
    Business<br>
    <small>16GB &middot; 8 CPUs &middot; 512GB SSD</small> 
  </quiet-radio-item>
  
  <quiet-radio-item value="enterprise">
    Enterprise<br>
    <small>32GB &middot; 12 CPUs &middot; 1TB SSD</small>
  </quiet-radio-item>
</quiet-radio>

<style>
  .radio__hosting {
    quiet-radio-item {
      position: relative;
      width: 100%;
      background: var(--quiet-paper);
      border: solid 1px var(--quiet-neutral-stroke-soft);
      box-shadow: var(--quiet-shadow-softer);
      border-radius: .5rem;
      padding: 1rem;
    }

    quiet-radio-item::part(label) {
      width: 100%;
      display: block;
    }

    quiet-radio-item::part(visual-box) {
      position: absolute;
      top: calc(50% - .625rem);
      right: 1rem;
    }

    quiet-radio-item:state(checked) {
      background-color: var(--quiet-primary-fill-softer);
      border-color: var(--quiet-primary-stroke-soft);
    }

    quiet-radio-item:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: 2px;
    }    

    small {
      color: var(--quiet-text-muted);
    }
  }  
</style>
```

```html {.example}
<quiet-radio 
  label="Color" 
  description="Choose a color for your new device" 
  name="color" 
  class="radio__colors"
>
  <quiet-radio-item value="silver" style="color: #b6b9c9;">Silver</quiet-radio-item>
  <quiet-radio-item value="blue" style="color: #83c0f5;">Blue</quiet-radio-item>
  <quiet-radio-item value="rose" style="color: #eea3bb;">Rose</quiet-radio-item>
  <quiet-radio-item value="gold" style="color: #d1b86c;">Gold</quiet-radio-item>
</quiet-radio>

<style>
  .radio__colors {
    &::part(group) {
      gap: .5rem;
    }

    quiet-radio-item {
      width: 3rem;
      height: 3rem;
      background-color: currentColor;
      background-image: linear-gradient(#fff8, transparent);
      box-shadow: inset 0 1px 2px color-mix(in oklab, currentColor, black 12.5%);
      border-radius: 50%;
      cursor: pointer;
    }

    quiet-radio-item:state(checked) {
      outline: var(--quiet-border-style) var(--quiet-focus-width) currentColor;
      outline-offset: 2px;
    }

    quiet-radio-item:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: 2px;
    }    

    quiet-radio-item::part(label) {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      white-space: nowrap;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
    }
  }
</style>
```

:::warn
It's not recommended to hide the radio button unless your styles make it very clear to users that the control is selectable.
:::