---
title: Pagination
layout: component
---

```html {.example}
<quiet-pagination total-pages="5"></quiet-pagination>
```

## Examples

### Setting the number of pages

Use the `total-pages` attribute to set the total number of pages available.

```html {.example}
<quiet-pagination total-pages="20"></quiet-pagination>
```

### Setting the initial page

Use the `page` attribute to set the initial page that's selected.

```html {.example}
<quiet-pagination total-pages="5" page="3"></quiet-pagination>
```

### Responding to page changes

When the user changes the page, the `quiet-page-change` event will be emitted. You can listen to this event to update the view or redirect the user to the appropriate destination.

```html {.example}
<quiet-pagination 
  total-pages="10" 
  page="1" 
  id="pagination__responding"
></quiet-pagination>

<script>
  const pagination = document.getElementById('pagination__responding');

  pagination.addEventListener('quiet-page-change', () => {
    //
    // Update the view here
    //
    console.log(`Showing page ${pagination.page}`);

    //
    // Alternatively, you can send the user to a URL:
    //
    // location.href = `/page/${pagination.page}`
    //
  });
</script>
```

### Changing the page programmatically

Set the `page` property to any valid page to change the current page. Note that programmatic changes _will not_ dispatch page change events.

```html {.example}
<quiet-pagination 
  total-pages="10" 
  page="1"
  id="pagination__setting"
></quiet-pagination>

<quiet-select label="Page" value="1" style="max-width: 100px; margin-block-start: 1.5rem;">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
</quiet-select>

<script>
  const pagination = document.getElementById('pagination__setting');
  const select = pagination.nextElementSibling;

  select.addEventListener('input', () => {
    pagination.page = select.value;
  });

  pagination.addEventListener('quiet-page-change', () => {
    select.value = pagination.page;
  });
</script>
```

### Rendering links instead of buttons

By default, the pagination component renders `<button>` elements internally. To have it render links instead, set the `link-formatter` attribute to a URL with a `{page}` placeholder that corresponds to the target page, e.g. `/path/to/{page}`.

```html
<quiet-pagination 
  total-pages="10" 
  page="5" 
  link-formatter="https://example.com/path/to/{page}"
></quiet-pagination>
```

For more control over the URL, you can set the `linkFormatter` property to a JavaScript function that accepts a page number and returns a URL.

```html
<quiet-pagination id="pagination__links" total-pages="5"></quiet-pagination>

<script>
  const pagination = document.getElementById('pagination__links');
  
  pagination.linkFormatter = page => `https://example.com/path/to/${page}`;
</script>
```

:::info
When a link formatter is provided, users will be redirected to the corresponding URL when they select a page. In this case, the pagination component _will not_ update dynamically. This is the intended behavior when using links.
:::

### Changing the format

Set the `format` attribute to `compact` or `standard` to change the pagination's format.

```html {.example}
<quiet-pagination 
  format="compact"
  total-pages="5"
  id="pagination__format"
></quiet-pagination>

<quiet-radio label="Format" value="compact" class="quiet-vh-label" style="margin-block-start: 1.5rem;">
  <quiet-radio-item value="compact">Compact</quiet-radio-item>
  <quiet-radio-item value="standard">Standard</quiet-radio-item>
</quiet-select>

<script>
  const pagination = document.getElementById('pagination__format');
  const radio = pagination.nextElementSibling;

  radio.addEventListener('input', () => {
    pagination.format = radio.value;
  });  
</script>
```

### Changing the appearance

Set the `appearance` attribute to `normal`, `filled`, or `unstyled` to change the pagination's appearance.

```html {.example .flex-col}
<quiet-pagination appearance="normal" total-pages="5"></quiet-pagination>
<quiet-pagination appearance="filled" total-pages="5"></quiet-pagination>
<quiet-pagination appearance="unstyled" total-pages="5"></quiet-pagination>
```

### Changing the number of buttons

Use the `siblings` attribute to control the number of pages that show on each side of the current page. The default is 3. The minimum is 2.

```html {.example .flex-col}
<quiet-pagination siblings="2" total-pages="20" page="10"></quiet-pagination>
<quiet-pagination siblings="3" total-pages="20" page="10"></quiet-pagination>
<quiet-pagination siblings="4" total-pages="20" page="10"></quiet-pagination>
```

### Changing the size

Pagination controls are sized relative to the current font size. To change their size, apply `font-size` to the pagination or an ancestor element.

```html {.example .flex-col}
<quiet-pagination 
  total-pages="5"
  page="1"
  style="font-size: 0.75rem;"
></quiet-pagination>

<quiet-pagination 
  total-pages="5"
  page="1"
  style="font-size: 1rem;"
></quiet-pagination>

<quiet-pagination 
  total-pages="5"
  page="1"
  style="font-size: 1.25rem;"
></quiet-pagination>
```

### Using custom icons

Use the `previous-icon`, `next-icon`, and `jump-icon` slots to override the default icons.

```html {.example}
<quiet-pagination total-pages="10">
  <quiet-icon slot="previous-icon" name="arrow-left"></quiet-icon>
  <quiet-icon slot="next-icon" name="arrow-right"></quiet-icon>
  <quiet-icon slot="jump-backward-icon" name="chevrons-left"></quiet-icon>
  <quiet-icon slot="jump-forward-icon" name="chevrons-right"></quiet-icon>
</quiet-pagination>
```

### Removing nav buttons

Use `without-nav` to remove the previous and next navigation buttons.

```html {.example}
<quiet-pagination 
  total-pages="10"
  page="1"
  without-nav
></quiet-pagination>
```

### Disabling

Add the `disabled` attribute to disable the pagination control.

```html {.example}
<quiet-pagination 
  total-pages="10"
  page="1"
  disabled
></quiet-pagination>
```

### Styling pagination

Pagination controls come with a simple, minimal appearance. Feel free to customize them with your own styles.

```html {.example .flex-col}
<quiet-pagination total-pages="10" page="5" appearance="unstyled" id="pagination__styling"></quiet-pagination>

<style>
  #pagination__styling {
    &::part(button) {
      border-radius: var(--quiet-border-radius-pill);
    }

    /* Light gray circles for previous and next buttons */
    &::part(button-previous),
    &::part(button-next) {
      background-color: var(--quiet-neutral-fill-softer);
    }

    /* The current page is larger and has a subtle gradient */
    &::part(button-current) {
      background: linear-gradient(45deg, #ff1493, #ff69b4);
      color: white;
      scale: 1.1;
    }
  }
</style>
```
