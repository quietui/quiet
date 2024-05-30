import { css } from 'lit';

export default css`
  :host {
    display: flex;
    align-items: center;
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    font-size: 0.9375rem;
    color: var(--quiet-neutral-text-on-soft);
    padding: 0.33rem 1rem;
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms color ease;
    isolation: isolate;
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host(:focus-visible) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
    z-index: 1;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  /* Destructive variant */
  :host([variant='destructive']),
  :host([variant='destructive']) .shortcut {
    color: var(--quiet-destructive-text-colorful);
  }

  @media (hover: hover) {
    :host([variant='destructive']:hover) {
      background-color: var(--quiet-destructive-fill-softer);
      color: var(--quiet-destructive-text-colorful);
    }
  }

  :host([variant='destructive']:focus-visible) {
    background-color: var(--quiet-destructive-fill-softer);
    color: var(--quiet-destructive-text-colorful);
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 1.5rem;
  }

  .check {
    margin-inline-start: -1.25rem;
    margin-inline-end: 0.25rem;
    stroke-width: 2px;
    visibility: hidden;
  }

  :host([checked]) .check {
    visibility: visible;
  }

  .icon ::slotted(*) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 1.25em;
    margin-inline-end: 0.5rem !important;
  }

  .label {
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  .shortcut {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: 0.75rem !important;
    color: var(--quiet-text-muted);

    ::slotted(*) {
      margin-inline-start: 2rem !important;
    }
  }
`;
