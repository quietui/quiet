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
    :host(:hover:not(:state(disabled)):not(:state(selected))) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  /* Active state (keyboard navigation) for non-selected items */
  :host(:state(active):not(:state(selected))) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
  }

  /* Keyboard focus visible on active items */
  :host(:state(focus-visible):state(active)) {
    z-index: 1;
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
  }

  /* Selected state */
  :host(:state(selected)) {
    background-color: var(--quiet-primary-fill-soft);
    color: var(--quiet-primary-text-on-soft);
  }

  /* Selected + hover */
  @media (hover: hover) {
    :host(:state(selected):hover:not(:state(disabled))) {
      background-color: var(--quiet-primary-fill-soft);
      color: var(--quiet-primary-text-on-soft);
    }
  }

  /* Selected + active */
  :host(:state(selected):state(active)) {
    background-color: var(--quiet-primary-fill-soft);
    color: var(--quiet-primary-text-on-soft);
  }

  /* Multiple mode - adjust padding for checkmark */
  :host-context(quiet-combobox[multiple]) {
    padding-inline-start: 2.25em;
  }

  /* Multiple mode hover/active colors */
  :host-context(quiet-combobox[multiple]):hover:not(:state(disabled)):not(:state(selected)) {
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
  }

  :host-context(quiet-combobox[multiple]):state(active):not(:state(selected)) {
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
  }

  /* Checkmark */
  .checkmark {
    position: absolute;
    left: 0.5em;
    color: var(--quiet-primary-text-on-soft);
    font-size: 1.125em;
  }

  .checkmark[hidden] {
    display: none;
  }

  /* RTL support */
  :host(:dir(rtl)) .checkmark {
    right: 0.5em;
    left: auto;
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

  /* Details slot */
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
    color: var(--quiet-primary-text-on-soft);
    opacity: 0.8;
  }
`;
