---
title: Expander
layout: component
---

```html {.example}
<quiet-expander>
  <p>Cats spend approximately 70% of their lives sleeping, which amounts to about 13-16 hours a day. Just imagine having that kind of schedule – sleeping two-thirds of your life away and still being considered a perfectly functional adult!</p>
  <p>A group of cats is called a "clowder," though most cat owners know that trying to organize multiple cats into any kind of group is nearly impossible. Cats are notorious individualists who come together only when the treats bag rustles.</p>
  <p>A cat's nose print is unique, just like a human's fingerprint. Each cat has its own distinct pattern of bumps and ridges on its nose, which could theoretically be used for identification – if cats would ever cooperate with being fingerprinted.</p>
</quiet-expander>
```

## Examples

### Expanded initially

Add the `expanded` attribute to expand the content by default.

```html {.example}
<quiet-expander expanded>
  <p>Cats spend approximately 70% of their lives sleeping, which amounts to about 13-16 hours a day. Just imagine having that kind of schedule – sleeping two-thirds of your life away and still being considered a perfectly functional adult!</p>
  <p>A group of cats is called a "clowder," though most cat owners know that trying to organize multiple cats into any kind of group is nearly impossible. Cats are notorious individualists who come together only when the treats bag rustles.</p>
  <p>A cat's nose print is unique, just like a human's fingerprint. Each cat has its own distinct pattern of bumps and ridges on its nose, which could theoretically be used for identification – if cats would ever cooperate with being fingerprinted.</p>
</quiet-expander>
```

### Customizing labels

To provide custom labels, use the `expand-label` and `collapse-label` slots.

```html {.example}
<quiet-expander>
  <span slot="expand-label">Show me more</span>
  <span slot="collapse-label">Never mind</span>
  <p>Cats spend approximately 70% of their lives sleeping, which amounts to about 13-16 hours a day. Just imagine having that kind of schedule – sleeping two-thirds of your life away and still being considered a perfectly functional adult!</p>
  <p>A group of cats is called a "clowder," though most cat owners know that trying to organize multiple cats into any kind of group is nearly impossible. Cats are notorious individualists who come together only when the treats bag rustles.</p>
  <p>A cat's nose print is unique, just like a human's fingerprint. Each cat has its own distinct pattern of bumps and ridges on its nose, which could theoretically be used for identification – if cats would ever cooperate with being fingerprinted.</p>
</quiet-expander>
```

### Disabling

Add the `disabled` attribute to disable the expand/collapse functionality. When disabled, the expander can still be toggled programmatically.

```html {.example}
<quiet-expander disabled>
  <p>Cats spend approximately 70% of their lives sleeping, which amounts to about 13-16 hours a day. Just imagine having that kind of schedule – sleeping two-thirds of your life away and still being considered a perfectly functional adult!</p>
  <p>A group of cats is called a "clowder," though most cat owners know that trying to organize multiple cats into any kind of group is nearly impossible. Cats are notorious individualists who come together only when the treats bag rustles.</p>
  <p>A cat's nose print is unique, just like a human's fingerprint. Each cat has its own distinct pattern of bumps and ridges on its nose, which could theoretically be used for identification – if cats would ever cooperate with being fingerprinted.</p>
</quiet-expander>
```

### Styling expanders

TODO
