---
title: Rating
layout: component
---

```html {.example}
<quiet-rating 
  label="Rate my cat"
  description="Leave her some stars."
  name="cat"
  value="4"
>
</quiet-rating>
```

## Examples

### Labels and descriptions

You can use the `label` and `description` attributes to provide plain text labels and descriptions for the rating. If you want to provide HTML, use the `label` and `description` slots instead.

```html {.example}
<quiet-rating name="name" label="How would you rate our catnip?">
  <span slot="description">
    For details, please <a href="https://example.com/" target="_blank">visit our website</a>.
  </span>
</quiet-rating>
```

### Providing an initial value

Use the `value` attribute to provide an initial value for the rating.

```html {.example}
<quiet-rating 
  name="food" 
  label="Food quality" 
  value="3"
></quiet-rating>
```

### Changing the scale

Ratings use a scale of 1–5 by default. You can change this by setting the `max` attribute.

```html {.example}
<quiet-rating 
  name="litter" 
  label="Cleanliness of litter box area" 
  max="3" 
  value="3"
></quiet-rating>
```

### Fractional values

You can enable fractional values by setting the `step` attribute. For example, `0.5` will allow half-star ratings.

```html {.example}
<quiet-rating 
  name="stars"
  label="Half-stars are fine" 
  step=".5" 
  value="2.5"
></quiet-rating>
```

### Changing the size

Use the `size` attribute to change the rating's size.

```html {.example}
<quiet-rating size="xs" label="Extra small"></quiet-rating><br>
<quiet-rating size="sm" label="Small"></quiet-rating><br>
<quiet-rating size="md" label="Medium"></quiet-rating><br>
<quiet-rating size="lg" label="Large"></quiet-rating><br>
<quiet-rating size="xl" label="Extra large"></quiet-rating>
```

### Using custom symbols

To customize the symbols shown, use JavaScript to set the `getSymbol` property to a function that returns the HTML for each symbol. The function will receive the `value` and `isSelected` arguments that you can use to customize the symbol based on specific values or whether the symbol is in the selected state.

```html {.example}
<quiet-rating 
  label="Show some love" 
  id="rating__custom-symbols" 
  value="3"
  style="
    --active-color: deeppink;
    --inactive-color: gray;
  "
></quiet-rating>

<script>
  const rating = document.getElementById('rating__custom-symbols');

  rating.getSymbol = (value, isSelected) => {
    return isSelected ? 
      `<quiet-icon family="filled" name="heart"></quiet-icon>` : 
      `<quiet-icon family="outline" name="heart"></quiet-icon>`;
  }
</script>
```

```html {.example}
<quiet-rating 
  label="How satisfied are you?" 
  id="rating__numbers" 
  value="3"
  style="--active-color: dodgerblue;"
></quiet-rating>

<script>
  const rating = document.getElementById('rating__numbers');

  rating.getSymbol = (value, isSelected) => {
    const family = isSelected ? 'filled' : 'outline';
    return `<quiet-icon family="${family}" name="square-number-${value}"></quiet-icon>`
  }
</script>
```

```html {.example}
<quiet-rating 
  label="How satisfied are you?" 
  id="rating__diamonds" 
  value="3"
  style="--active-color: #2bb7d1;"
></quiet-rating>

<script>
  const rating = document.getElementById('rating__diamonds');

  rating.getSymbol = (value, isSelected) => {
    const family = isSelected ? 'filled' : 'outline';
    const name = isSelected ? 'diamond' : 'point'
    return `<quiet-icon family="${family}" name="${name}"></quiet-icon>`
  }
</script>
```

:::warn
You should only return trusted HTML from the `getSymbol()` function, otherwise you may become vulnerable to XSS exploits.
:::

### Readonly ratings

Use the `readonly` attribute to make the rating read-only.

```html {.example}
<quiet-rating label="Read-only" value="4" readonly></quiet-rating>
```

### Disabling

Use the `disabled` attribute to disable the rating.

```html {.example}
<quiet-rating label="Disabled" value="4" disabled></quiet-rating>
```

### Validation

The `required` attribute can be applied to enable validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation). This will prevent form submission until a non-zero value is selected.


```html {.example}
<form action="about:blank" method="get" target="_blank">
  <quiet-rating name="required" label="Required" required></quiet-rating><br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>
```

### Using custom validation

Use the `setCustomValidity()` method to make the rating invalid and show a custom error message on submit. This will override all other validation parameters. To clear the error, remove the attribute or set it to an empty string.

```html {.example}
<form action="about:blank" method="get" target="_blank" id="rating__custom-validation">
  <quiet-rating 
    name="food" 
    label="Food quality" 
    value="3"
  ></quiet-rating>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
</form>

<script type="module">
  import { allDefined } from '/dist/quiet.js';

  await allDefined();

  const form = document.getElementById('rating__custom-validation');
  const rating = form.querySelector('quiet-rating');

  rating.setCustomValidity('Not so fast, bubba!');
</script>
```

### Styling validation

You can style valid and invalid ratings using the `:valid` and `:invalid` pseudo classes.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="rating__validation-pseudo">
  <quiet-rating 
    name="food" 
    label="Food quality" 
    description="This field is required."
    required
  ></quiet-rating>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .rating__validation-pseudo {
    quiet-rating:valid {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-rating:invalid {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```

However, these selectors will match even before the user has had a chance to fill out the form. More often than not, you'll want to use the `user-valid` and `user-invalid` [custom states](#custom-states) instead. This way, validation styles are only shown _after_ the user interacts with the form control or when the form is submitted.

```html {.example}
<form action="about:blank" method="get" target="_blank" class="rating__validation-custom">
  <quiet-rating 
    name="food" 
    label="Food quality" 
    description="This field is required."
    required
  ></quiet-rating>
  <br>
  <quiet-button type="submit" variant="primary">Submit</quiet-button>
  <quiet-button type="reset">Reset</quiet-button>
</form>

<style>
  .rating__validation-custom {
    quiet-rating:state(user-valid) {
      outline: solid 2px var(--quiet-constructive-stroke-mid);
      outline-offset: .5rem;
    }

    quiet-rating:state(user-invalid) {
      outline: solid 2px var(--quiet-destructive-stroke-mid);
      outline-offset: .5rem;
    }
  }
</style>
```