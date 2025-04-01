---
title: Browse Components
layout: docs
---

<quiet-search-list id="component-index" match="fuzzy">
  <quiet-text-field 
    slot="controller" 
    label="Searching {{ components.length }} custom elements" 
    description="Results will automatically update as you type"
    pill 
    autofocus 
    clearable
    class="quiet-vh-description"
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
        {%- if component.superclass.name == 'QuietFormControlElement' %}[form]{% endif %}
      </div>
    </a>
  {%- endfor -%}

  <quiet-empty-state slot="empty">
    <img
      slot="illustration"
      src="/assets/images/whiskers/playing-with-bricks.svg"
      alt="Whiskers the mouse playing with bricks"
      style="max-width: 12rem; height: auto;"
    >
    <p>
      Sorry, nothing like that has been built yet!<br>
      <a href="https://github.com/quietui/quiet/discussions/categories/feature-requests" target="_blank">Ask for it here</a>
    </p>
  </quiet-empty-state>
</quiet-search-list>

<style>
  #component-index {
    &::part(items) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      align-items: start;
      gap: 1rem;
      width: 100%;
      margin-block-end: 2rem;
    }

    .component {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      height: 100%;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
      border-radius: var(--quiet-border-radius);
      background-color: var(--quiet-paper-color);
      box-shadow: var(--quiet-shadow-softer);
      font-weight: inherit;
      padding: 1.25rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.1s ease-in-out;
      
      &:focus-visible {
        outline-offset: calc(-1 * var(--quiet-border-width));
      }

      @media (hover: hover) {
        &:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: var(--quiet-shadow-soft);
        }
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