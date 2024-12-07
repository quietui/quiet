---
title: Stamp
layout: component
---

```html {.example}
<template id="person">
  <div class="person">
    <quiet-avatar .image="avatar"></quiet-avatar>
    <div class="name">
      <span class="first">
        <meta name="first-name">
      </span>
      <span class="last">
        <meta name="last-name">
      </span>
    </div>

    <quiet-button .id="id" ?disabled="">
      Update user #<meta name="id">
    </quiet-button>

    <quiet-button :if="has-permission" variant="destructive" .data-user-id="id">
      Delete #<meta name="id">
    </quiet-button>  
  </div>
</template>

<quiet-stamp template="person" data-id="1000" data-avatar="https://images.unsplash.com/photo-1445499348736-29b6cdfc03b9?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
	<span slot="first-name">Bob</span>
	<span slot="last-name">Marley</span>
</quiet-stamp>

<quiet-stamp template="person" data-id="1001" data-avatar="https://images.unsplash.com/photo-1581031314358-823a730be9d1?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
	<a href="https://example.com/gary" slot="first-name">Gary</a>
	<span slot="last-name">Larson</span>
</quiet-stamp>

<quiet-stamp 
  template="person" 
  data-id="1002" 
  data-first-name="Billy" 
  data-last-name="Beefcake"
  data-can-delete="true"
  data-avatar="https://images.unsplash.com/photo-1542736705-53f0131d1e98?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
>
</quiet-stamp>

<style>
  quiet-stamp[template="person"] {
    display: flex;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    background-color: var(--quiet-paper-color);
    border-radius: var(--quiet-border-radius);
    padding: 1rem;

    &:has(+ quiet-stamp) {
      margin-block-end: 1rem;
    }

    .person {
      display: flex;
      width: 100%;
      gap: 1rem;
      align-items: center;

      .name {
        flex: 1 1 auto;
      }
    }
  }
</style>
```

## Examples

TODO
