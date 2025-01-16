---
title: Browse Components
layout: docs
---

<quiet-search-list id="component-index" match="fuzzy">
  <quiet-text-field 
    slot="search-box" 
    label="Searching {{ components.length }} custom elements" 
    pill 
    autofocus 
    clearable
  >
    <quiet-icon slot="start" name="search"></quiet-icon>
  </quiet-text-field>

  {%- for component in components -%}
    <a 
      class="component" 
      href="/docs/components/{{ component.tagName | stripQuietPrefix}}"
    >
      <p class="name">{{ component.tagName | tagNameToDisplayName }}</p>
      <p class="tag-name"><code>&lt;{{ component.tagName }}&gt;</code></p>
      <p class="summary">{{ component.summary }}</p>
      <div class="badges">
        {%- if component.status == 'experimental' %}[experimental]{% endif %}
        {%- if component.status == 'stable' %}[stable]{% endif %}
        <quiet-badge>since {{ component.since }}</quiet-badge>
      </div>
    </a>
  {%- endfor -%}

  <div slot="empty">
    <quiet-icon name="cheese"></quiet-icon>
    No components found
  </div>
</quiet-search-list>

<style>
  #component-index {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      align-items: start;
      gap: 1rem;
      width: 100%;
      margin-block-end: var(--quiet-content-spacing);
    }

    .component {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      height: 100%;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-soft);
      font-weight: inherit;
      padding: 1.25rem;
      text-decoration: none;
      color: inherit;
      
      &:focus-visible {
        outline-offset: calc(-1 * var(--quiet-border-width));
      }

      .name {
        font-size: 1.3875rem;
        font-weight: var(--quiet-font-weight-semibold);
        margin-block-end: 0.25rem;
      }

      .tag-name {
        margin-block: 0;
      }

      .summary {
        margin-block: 0.5rem 1rem;
      }

      code {
        color: var(--quiet-text-muted);
        background: transparent;
        font-size: 1.125rem;
        white-space: normal;
        padding: 0;
      }

      .badges {
        display: flex;
        gap: .25rem;
        align-items: center;
        margin-top: auto;
      }
    }

    .empty {
      grid-column: 1 / -1;
      padding: 3rem 2rem;
      color: var(--quiet-text-muted);
      font-size: 1.125rem;
      text-align: center;

      quiet-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        margin-inline: auto;
        margin-block-end: 0.5rem;
      }
    }
  }
</style>