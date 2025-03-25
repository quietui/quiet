---
title: Toggle Icon
layout: component
---

Toggle icons can be used just like [checkboxes](/docs/components/checkbox) and [switches](/docs/components/switch) to turn features on and off. You can listen for state changes with the `quiet-input` event and submit them with forms by adding `name` and `value` attributes.

Assistive devices will recognize toggle icons as [toggle buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/). The default icon is a star, but you can customize it with [any icon you want](#custom-icons).

```html {.example .flex-row}
<quiet-toggle-icon 
  label="Star this"
  effect="fade"
></quiet-toggle-icon>

<quiet-toggle-icon 
  label="Save to favorites"
  effect="scale"
  style="--checked-color: crimson;"
>
  <quiet-icon slot="unchecked" name="heart" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="heart" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Like this post"
  effect="flip-x"
  style="--checked-color: dodgerblue;"
>
  <quiet-icon slot="unchecked" name="thumb-up" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="thumb-up" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Play / pause"
  effect="scale"
  style="
    --checked-color: var(--quiet-neutral-fill-mid); 
    --unchecked-color: var(--quiet-neutral-fill-mid);
  "
>
  <quiet-icon slot="unchecked" name="player-pause" family="filled"></quiet-icon>
  <quiet-icon slot="checked" name="player-play" family="filled"></quiet-icon>
</quiet-toggle-icon>
```

## Examples

### Checked initially

Add the `checked` attribute to check the toggle icon initially.

```html {.example}
<quiet-toggle-icon 
  label="Star this"
  name="favorite" 
  value="1" 
  checked
></quiet-toggle-icon>
```

### Custom icons

Place a [`<quiet-icon>`](/docs/components/icon) into the default slot to show a custom unchecked state. Place one into the `checked` slot to show a custom checked state.

You can use any icon you want for each state, but `outline` for unchecked icons and `filled` for checked icons usually work best. Use the `--unchecked-color` and `--checked-color` custom properties to change colors.

```html {.example}
<quiet-toggle-icon 
  label="Save to favorites"
  style="--checked-color: crimson;"
>
  <quiet-icon slot="unchecked" name="heart" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="heart" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Like this post"
  style="--checked-color: dodgerblue;"
>
  <quiet-icon slot="unchecked" name="thumb-up" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="thumb-up" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Enable filter" 
  style="--checked-color: blueviolet;"
>
  <quiet-icon slot="unchecked" name="filter" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="filter" family="filled"></quiet-icon>
</quiet-toggle-icon>
```

### Changing the effect

Set the `effect` attribute to change the toggle icon's animation. This works great with custom icons.

```html {.example}
<quiet-toggle-icon 
  label="Star this"
  effect="fade"
></quiet-toggle-icon>

<quiet-toggle-icon 
  label="Love this"
  effect="scale" 
  style="--checked-color: crimson;"
>
  <quiet-icon slot="unchecked" name="heart" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="heart" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Mark as complete"
  effect="flip-x" 
  style="--checked-color: cadetblue;"
>
  <quiet-icon slot="unchecked" name="clipboard" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="clipboard-check" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Secure this"
  effect="flip-y" 
  style="--checked-color: forestgreen;"
>
  <quiet-icon slot="unchecked" name="shield" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="shield-check" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Ship this"
  effect="translate-x" 
  style="--checked-color: blueviolet;"
>
  <quiet-icon slot="unchecked" name="truck" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="truck" family="filled"></quiet-icon>
</quiet-toggle-icon>

<quiet-toggle-icon 
  label="Enable reader mode"
  effect="translate-y" 
  style="--checked-color: dodgerblue;"
>
  <quiet-icon slot="unchecked" name="eyeglass" family="outline"></quiet-icon>
  <quiet-icon slot="checked" name="eyeglass" family="filled"></quiet-icon>
</quiet-toggle-icon>
```

### Sizes

Use the `size` attribute to change the size of the toggle icon.

```html {.example}
<quiet-toggle-icon size="xs"></quiet-toggle-icon>
<quiet-toggle-icon size="sm"></quiet-toggle-icon>
<quiet-toggle-icon size="md"></quiet-toggle-icon>
<quiet-toggle-icon size="lg"></quiet-toggle-icon>
<quiet-toggle-icon size="xl"></quiet-toggle-icon>
```

### Disabling

Use the `disabled` attribute to disable the toggle icon.

```html {.example}
<quiet-toggle-icon disabled></quiet-toggle-icon>
<quiet-toggle-icon checked disabled></quiet-toggle-icon>
```

### Validation

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until the toggle icon is checked.

```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-toggle-icon 
    label="Star this"
    name="star" 
    value="1" 
    required
  ></quiet-toggle-icon>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the toggle icon invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="toggle__custom-validation">
  <quiet-toggle-icon 
    label="Star this"
    name="star" 
    value="1" 
    required
  ></quiet-toggle-icon>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('toggle__custom-validation');
  const toggleIcon = form.querySelector('quiet-toggle-icon');

  toggleIcon.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid toggle icons using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="toggle__validation-pseudo">
  <quiet-toggle-icon 
    label="Star this"
    name="star" 
    value="1" 
    required
  ></quiet-toggle-icon>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .toggle__validation-pseudo {
    quiet-toggle-icon:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-toggle-icon:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="toggle__validation-custom">
  <quiet-toggle-icon 
    label="Star this"
    name="star" 
    value="1" 
    required
  ></quiet-toggle-icon>
  <br><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .toggle__validation-custom {
    quiet-toggle-icon:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-toggle-icon:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```