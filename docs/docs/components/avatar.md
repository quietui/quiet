---
title: Avatar
description: TODO
layout: component
---

```html {.example}
<quiet-avatar label="Anonymous user"></quiet-avatar>
```

:::info
In the same way that images require `alt` text, you should always add a label to every avatar. The label won't be displayed, but it will be announced by assistive devices.
:::

## Examples

### Images

Avatars are best used with images to create a more personalized experience. Set the `image` attribute to any valid image URL.

```html {.example}
<quiet-avatar label="Sky kitty" image="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
```

### Characters

When an image isn't available or fails to load, you can provide up to five characters to show instead. It's usually best to show no more than three, as the text shrinks to fit.

```html {.example}
<quiet-avatar label="Quiet UI" characters="Q"></quiet-avatar>
<quiet-avatar label="Quiet UI" characters="QUI"></quiet-avatar>
<quiet-avatar label="Quiet UI" characters="QUIET"></quiet-avatar>
```

### Custom icons

When no image or letters are provided as a fallback, the default user icon will be displayed. You can show a custom icon by placing one into the `icon` slot.

```html {.example}
<quiet-avatar label="Anonymous user">
  <quiet-icon slot="icon" family="solid" name="star"></quiet-icon>
</quiet-avatar>

<quiet-avatar label="Anonymous user">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
  </svg>
</quiet-avatar>
```

### Changing the size

You can change the size of an avatar by setting the `--size` custom property. The aspect ratio is 1:1, so the width and height will always be the same.

```html {.example}
<quiet-avatar style="--size: 32px;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="--size: 48px;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="--size: 64px;" label="Anonymous user"></quiet-avatar>
```

### Changing the color

To change the color of the avatar, use the `background-color` property and the `color` property. You can also apply gradients with the `background-image` property.

```html {.example}
<quiet-avatar style="background-color: royalblue; color: white;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="background-color: deeppink; color: white;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="background-color: forestgreen; color: white;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="background-image: linear-gradient(45.8deg, #af68fe 9.3%, #65dfff 75.1%); color: black;" label="Anonymous user"></quiet-avatar>
```

### Changing the shape

You can change the shape of an avatar by adjusting the `border-radius` property. More complex shapes can be achieved by removing the default border radius and using `clip-path`.

```html {.example}
<quiet-avatar style="border-radius: 12px;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="border-radius: 2px;" label="Anonymous user"></quiet-avatar>
<quiet-avatar style="border-radius: 0; clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);" label="Anonymous user"></quiet-avatar>
```

### Grouping avatars

You can group avatars with some custom CSS.

```html {.example}
<div class="avatar-group">
  <quiet-avatar label="Chill kitty" image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
  <quiet-avatar label="Wonder kitty" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
  <quiet-avatar label="Maine kitty" image="https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></quiet-avatar>
  <quiet-avatar label="+12 more" characters="+12"></quiet-avatar>
</div>

<style>
  .avatar-group quiet-avatar {
    border: solid 2px var(--quiet-base-background-color);

    &:not(:first-of-type) {
      margin-inline-start: -1.5rem;
    }
  }
</style>
```

### Wrapping with a link

You can wrap links around avatars to make the avatar clickable.

```html {.example}
<a href="https://example.com/" target="_blank">
  <quiet-avatar label="Anonymous user"></quiet-avatar>
</a>
```