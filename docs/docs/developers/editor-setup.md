---
title: Editor Setup
description: Configure your editor for a better DX when using the library.
layout: docs
---

## Visual Studio Code

Quiet UI includes a Custom Elements Manifest (CEM) file that contains useful information about its components. Many tools are emerging that make use of CEMs, including the [Web Components Language Server](https://wc-toolkit.com/integrations/web-components-language-server/).

This extension gives supported editors auto-completion and type-aware suggestions for all components. It ships as a recommended extension for VS Code, but you can [install it manually](https://marketplace.visualstudio.com/items?itemName=wc-toolkit.web-components-language-server) from the marketplace.

## JetBrains

Quiet generates a file called `web-types.json` that JetBrains IDE will recognize when you install Quiet from npm. This will enable code completion for your custom elements.

**If you're not using npm,** you can download a copy of `web-types.json`, place it in your project's root, and add the following property to `package.json` to tell the editor about it.

```json
{
  ...
  "web-types": "./web-types.json"
  ...
}
```

:::info
The `web-types` property also accepts an array, if you happen to be using types from more than one project.
:::

<img class="whiskers-center" src="/assets/images/whiskers/with-clipboard.svg" alt="Whiskers the mouse holding a clipboard">
