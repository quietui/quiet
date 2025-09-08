import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.33em 1em;
    border-radius: var(--quiet-border-radius-sm);
    color: var(--quiet-neutral-text-on-soft);
    font-size: 0.9375em;
    line-height: var(--quiet-line-height);
    cursor: pointer;
    user-select: none;
  }

  /* Disabled state */
  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  /* Hover state for non-selected items */
  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  /* Active state (keyboard navigation) for non-selected items */
  :host(:state(active)) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
  }

  /* Keyboard focus visible on active items */
  :host(:state(active)[data-keyboard-nav]) {
    z-index: 1;
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
  }

  /* Checkmark (hidden by default) */
  .checkmark {
    visibility: hidden;
    flex: 0 0 auto;
    width: fit-content;
    margin-inline-start: -0.5em;
    margin-inline-end: 0.25em;
    color: var(--quiet-primary-text);
    font-size: 1.25em;
    opacity: 0;
    transition:
      opacity 150ms ease,
      visibility 150ms ease;

    /* Show checkmark when selected (works for both single and multiple mode) */
    &.selected {
      visibility: visible;
      opacity: 1;
    }
  }

  /* Icon slot */
  .icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
  }

  .icon ::slotted(*) {
    margin-inline-end: 0.5em !important;
    font-size: 1.25em;
  }

  /* Label */
  .label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Details */
  .details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    margin-inline-start: 2em;
    color: var(--quiet-text-muted);
    font-size: 0.875em;
  }

  :host(:state(selected)) .details {
    color: var(--quiet-text-muted);
    opacity: 0.8;
  }

  /* Multiple mode */
  :host(:has(.multiple)):hover:not(:state(disabled)):not(:state(selected)) {
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
  }

  :host(:has(.multiple)):state(active):not(:state(selected)) {
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
  }
`;
