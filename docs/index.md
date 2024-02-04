---
title: Quiet UI
description: Quiet is a high quality UI library hand-crafted for the Web with a focus on accessibility, performance, longevity, and aesthetics.
---

<!-- You need to have the <body> tag for browser sync to inject its script to reload -->
<body>

# {{ title }}

{{ description }}

## Basic Usage

Try this:

```html
<script type="module" src="/dist/quiet.js"></script>
<script type="module">
  import { startLoader } from '/dist/quiet.js';
  startLoader();
</script>
```

:::tip
Don't forget to include `type="module"` in your scripts!
:::

</body>
