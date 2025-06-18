---
title: Toast Item
layout: component
---

You can create toast items on the fly using the toast element's [`create()`](/docs/components/toast#creating-notifications) method. Alternatively, you can create them declaratively by wrapping them in a [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) and calling [`createFromTemplate()`](/docs/components/toast#creating-notifications-from-templates).

```html {.example}
<quiet-toast-item variant="primary" duration="0">
  <quiet-avatar slot="icon" label="Meowy McGee's avatar" image="https://images.unsplash.com/photo-1672487209629-4d52e0c043d0?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
  <strong>Meowy McGee</strong><br>
  <small style="color: var(--quiet-text-muted);">has sent you a message</small>
</quiet-toast-item>
```

:::info
For documentation purposes, this page omits the `<template>` tag, allowing the toast item to appear inline so you can see the result of each example.
:::

## Examples

### Variants

Set the `variant` attribute to `default`, `primary`, `constructive`, or `destructive` to change the button's variant.

```html {.example .flex-col}
<quiet-toast-item variant="neutral" duration="0">
  <quiet-icon slot="icon" name="settings"></quiet-icon>
  Your changes have been saved
</quiet-toast-item>

<quiet-toast-item variant="primary" duration="0">
  <quiet-icon slot="icon" name="cat"></quiet-icon>
  The cats have requested more food
</quiet-toast-item>

<quiet-toast-item variant="constructive" duration="0">
  <quiet-icon slot="icon" name="send"></quiet-icon>
  Your message has been sent
</quiet-toast-item>

<quiet-toast-item variant="destructive" duration="0">
  <quiet-icon slot="icon" name="alert-triangle"></quiet-icon>
  The litter box has been emptied
</quiet-toast-item>
```

### Adding icons

Use the `icon` slot to add a visual to the toast item. Icons, images, and avatars work well here.

```html {.example}
<quiet-toast-item duration="0">
  <quiet-avatar slot="icon" label="Chill kitty" image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
  <strong>Chill Kitty</strong><br>
  <small style="color: var(--quiet-text-muted);">has invited you to collaborate on a project</small>
</quiet-toast-item>
```

### Changing the duration

By default, toast items dismiss themselves after five seconds. Set the `duration` property to the number of milliseconds the item should wait before dismissing, or `0` to wait for the user to dismiss it.

```html
<quiet-toast-item duration="10000">
  This notification will stay open for 10 seconds.
</quiet-toast-item>

<quiet-toast-item duration="0">
  This notification will stay open until the user closes it
</quiet-toast-item>
```

### Hiding the close button

Use the `without-close` attribute to hide the close button. This is only recommended when a duration is set or when you're using custom buttons to dismiss the notification.

```html {.example}
<quiet-toast-item without-close duration="0">
  This notification does not have a close button.
</quiet-toast-item>
```

:::warn
Do not use this as a way to force the notification to stay open. You should provide a custom close button when you use this option. Remember that users can also press <quiet-hotkey keys="$escape"></quiet-hotkey> to close a notification.
:::
