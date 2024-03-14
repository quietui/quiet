---
title: Include
layout: component
---

```html {.example}
<quiet-include src="/assets/examples/include.html"></quiet-include>
```

## Examples

### Default content

You can provide default content inside the include, which will be shown until the request completes. This is useful to show a loading state while the include file is fetched.

```html {.example}
<quiet-include src="/assets/examples/include.html">
  Loading content…
</quiet-include>
```

### Allowing scripts

Scripts included in the fetched HTML will not be executed by default. If you trust the content, you can use the `allow-scripts` attribute to allow them to run.

```html {.example}
<quiet-include allow-scripts src="/assets/examples/include-scripts.html"></quiet-include>
```

:::danger
Using this option can be dangerous! Make sure you trust the included content, otherwise your app may become vulnerable to XSS exploits!
:::

### Handling events

When an include file is successfully rendered, the `quiet-included` event will be emitted. When things go wrong, there are two possible events that signal an error.

If the HTTP request completes but the response is outside of the acceptable 200 range, the `quiet-http-error` event will be emitted. If the HTTP request fails due to a network error, CORS restriction, or similar, the `quiet-network-error` event will be emitted.

```html {.example}
<quiet-include src="/assets/examples/include.html" id="include__events"></quiet-include>

<script>
  const include = document.getElementById('include__events');

  include.addEventListener('quiet-included', () => {
    //
    // The include file has rendered
    //
  });

  include.addEventListener('quiet-http-error', event => {
    //
    // The request completed, but the HTTP code was outside of 
    // the 200 range. You can inspect event.detail.status to
    // see which HTTP code was provided.
    //
    console.log(event);
  });

  include.addEventListener('quiet-network-error', event => {
    //
    // The request could not be completed. You can inspect 
    // event.detail.error to see the response error.
    //
  });
</script>
```