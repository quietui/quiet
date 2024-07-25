---
title: Editor setup
description: Configure your editor for a better DX when using the library.
layout: docs
---

## Visual Studio Code

Quiet generates a file called `vscode.html-custom-data.json` that informs VS Code of your custom elements. To enable code completion, you need to tell VS Code where the file is.

1. Install Quiet via npm using `npm install @quietui/quiet`
2. Create a folder named `.vscode` at the root of your project (if it doesn't already exist)
3. Create a file inside that folder called `settings.json` (if it doesn't already exist)
4. Add the following rule to the file

```json
{
  "html.customData": ["./node_modules/@quietui/quiet/dist/vscode.html-custom-data.json"]
}
```

:::info
You might need to restart VS Code after updating `settings.json`.
:::


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
