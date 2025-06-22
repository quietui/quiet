---
title: Accordion
layout: component
---

```html {.example}
<quiet-accordion id="accordion__overview" auto-collapse active-name="">
  <quiet-accordion-item name="overview">
    <span slot="label">What is an accordion?</span>
    <p>An accordion is a vertically stacked list of headers that reveal or hide associated sections of content. It's perfect for FAQs, settings panels, and any content that benefits from progressive disclosure.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="when-to-use">
    <span slot="label">When should I use it?</span>
    <p>Use accordions when you have limited vertical space but need to present multiple sections of content. They're ideal when users don't need to see all content at once, allowing them to focus on one section at a time.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="best-practices">
    <span slot="label">Best practices</span>
    <ul>
      <li>Keep labels concise and descriptive</li>
      <li>Order items logically (alphabetically, by importance, or by frequency of use)</li>
      <li>Consider auto-collapse behavior for mutually exclusive content</li>
      <li>Ensure keyboard navigation works smoothly</li>
    </ul>
  </quiet-accordion-item>
</quiet-accordion>

<style>
  #accordion__overview {
    max-width: 40rem;
  }
</style>
```

## Examples

### Providing content

Accordion items accept content through the default slot and labels through the `label` slot. For plain-text labels, you can use the `label` attribute instead of the slot.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item label="Simple label with attribute">
    <p>This accordion item uses the label attribute for its header text.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <span slot="label">Label with <strong>HTML</strong> content</span>
    <p>This accordion item uses the label slot, which allows for HTML content in the header.</p>
  </quiet-accordion-item>

  <quiet-accordion-item>
    <quiet-icon slot="label" name="settings"></quiet-icon>
    <span slot="label">Label with icon</span>
    <p>You can include icons and other elements in the label slot for richer headers.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Open initially

TODO - show `active-index` and `active-name` examples 

### Changing the appearance

Set the `appearance` attribute to `contained` to draw the accordion with a border.

```html {.example}
<quiet-accordion appearance="contained" class="accordion__appearance">
  <quiet-accordion-item name="overview" expanded>
    <span slot="label">What is an accordion?</span>
    <p>An accordion is a vertically stacked list of headers that reveal or hide associated sections of content. It's perfect for FAQs, settings panels, and any content that benefits from progressive disclosure.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="when-to-use">
    <span slot="label">When should I use it?</span>
    <p>Use accordions when you have limited vertical space but need to present multiple sections of content. They're ideal when users don't need to see all content at once, allowing them to focus on one section at a time.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="best-practices">
    <span slot="label">Best practices</span>
    <ul>
      <li>Keep labels concise and descriptive</li>
      <li>Order items logically (alphabetically, by importance, or by frequency of use)</li>
      <li>Consider auto-collapse behavior for mutually exclusive content</li>
      <li>Ensure keyboard navigation works smoothly</li>
    </ul>
  </quiet-accordion-item>
</quiet-accordion>
```

Set the `appearance` attribute to `separated` draw accordion items as separate items.

```html {.example}
<quiet-accordion appearance="separated">
  <quiet-accordion-item name="overview" expanded>
    <span slot="label">What is an accordion?</span>
    <p>An accordion is a vertically stacked list of headers that reveal or hide associated sections of content. It's perfect for FAQs, settings panels, and any content that benefits from progressive disclosure.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="when-to-use">
    <span slot="label">When should I use it?</span>
    <p>Use accordions when you have limited vertical space but need to present multiple sections of content. They're ideal when users don't need to see all content at once, allowing them to focus on one section at a time.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="best-practices">
    <span slot="label">Best practices</span>
    <ul>
      <li>Keep labels concise and descriptive</li>
      <li>Order items logically (alphabetically, by importance, or by frequency of use)</li>
      <li>Consider auto-collapse behavior for mutually exclusive content</li>
      <li>Ensure keyboard navigation works smoothly</li>
    </ul>
  </quiet-accordion-item>
</quiet-accordion>
```

Set the `appearance` attribute to `unstyled` draw unstyled accordion items.

```html {.example}
<quiet-accordion appearance="unstyled">
  <quiet-accordion-item name="overview" expanded>
    <span slot="label">What is an accordion?</span>
    <p>An accordion is a vertically stacked list of headers that reveal or hide associated sections of content. It's perfect for FAQs, settings panels, and any content that benefits from progressive disclosure.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="when-to-use">
    <span slot="label">When should I use it?</span>
    <p>Use accordions when you have limited vertical space but need to present multiple sections of content. They're ideal when users don't need to see all content at once, allowing them to focus on one section at a time.</p>
  </quiet-accordion-item>

  <quiet-accordion-item name="best-practices">
    <span slot="label">Best practices</span>
    <ul>
      <li>Keep labels concise and descriptive</li>
      <li>Order items logically (alphabetically, by importance, or by frequency of use)</li>
      <li>Consider auto-collapse behavior for mutually exclusive content</li>
      <li>Ensure keyboard navigation works smoothly</li>
    </ul>
  </quiet-accordion-item>
</quiet-accordion>
```

### Auto-collapsing

By default, multiple accordion items can be expanded at the same time. Add the `auto-collapse` attribute to ensure only one item is expanded at a time.

```html {.example}
<quiet-accordion auto-collapse>
  <quiet-accordion-item label="First section" expanded>
    <p>When auto-collapse is enabled, opening another section will automatically close this one.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Second section">
    <p>Click me to see the first section collapse automatically.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Third section">
    <p>Only one section can be open at a time with auto-collapse enabled.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Disabling items

Use the `disabled` attribute to prevent users from expanding certain accordion items. This is useful for sections that require certain conditions to be met before they can be accessed.

```html {.example}
<quiet-accordion>
  <quiet-accordion-item label="Available section">
    <p>This section is interactive and can be expanded or collapsed.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Disabled section" disabled>
    <p>This content is not accessible because the item is disabled.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Another available section">
    <p>This section is also interactive.</p>
  </quiet-accordion-item>
</quiet-accordion>
```

### Customizing the icon

The expand/collapse icon can be customized in several ways. You can replace it entirely, change its position, or show different icons for expanded and collapsed states.

```html {.example}
<h4>Custom icon</h4>
<quiet-accordion id="accordion__custom-icon">
  <quiet-accordion-item label="Custom chevron icon">
    <quiet-icon slot="icon" name="chevron-right"></quiet-icon>
    <p>This accordion uses a different chevron icon.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Custom arrow icon">
    <quiet-icon slot="icon" name="arrow-down"></quiet-icon>
    <p>This one uses an arrow instead of a chevron.</p>
  </quiet-accordion-item>
</quiet-accordion>

<h4>Icon position</h4>
<quiet-accordion icon-position="start">
  <quiet-accordion-item label="Icon on the left">
    <p>The icon appears before the label when icon-position is set to "start".</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Consistent positioning">
    <p>All items in this accordion have their icons on the left.</p>
  </quiet-accordion-item>
</quiet-accordion>

<h4>Plus and minus icons</h4>
<quiet-accordion id="accordion__plus-minus">
  <quiet-accordion-item label="Expandable section">
    <quiet-icon slot="icon" name="plus" class="plus"></quiet-icon>
    <quiet-icon slot="icon" name="minus" class="minus"></quiet-icon>
    <p>This accordion shows a plus icon when collapsed and a minus icon when expanded.</p>
  </quiet-accordion-item>

  <quiet-accordion-item label="Another section">
    <quiet-icon slot="icon" name="plus" class="plus"></quiet-icon>
    <quiet-icon slot="icon" name="minus" class="minus"></quiet-icon>
    <p>The icons switch based on the expanded state.</p>
  </quiet-accordion-item>
</quiet-accordion>

<style>
  #accordion__custom-icon {
    quiet-icon[slot="icon"] {
      transition: transform 200ms ease;
    }

    quiet-accordion-item[expanded] {
      quiet-icon[name="chevron-right"] {
        transform: rotate(90deg);
      }

      quiet-icon[name="arrow-down"] {
        transform: rotate(180deg);
      }
    }
  }

  #accordion__plus-minus {
    .minus {
      display: none;
    }

    quiet-accordion-item[expanded] {
      .plus {
        display: none;
      }

      .minus {
        display: block;
      }
    }
  }

  quiet-accordion {
    max-width: 40rem;
  }

  h4 {
    margin-block-start: 2rem;
    margin-block-end: 1rem;
  }
</style>
```
