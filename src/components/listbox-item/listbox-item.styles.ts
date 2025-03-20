import { css } from 'lit';

export default css`
  :host {
    display: block;
    padding: 0.5em 1em;
    /* Use a border instead of gap to prevent dead zones when clicking in the listbox */
    border-bottom: var(--quiet-border-width) var(--quiet-border-style) var(--quiet-paper-color);
    background-color: var(--quiet-paper-color);
    color: var(--quiet-text-body);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:last-of-type) {
    border-bottom: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* All selected items when listbox is focused - using the listbox-focused state */
  :host([data-listbox-focused]:state(selected)) {
    background-color: var(--quiet-primary-fill-soft);
    color: var(--quiet-primary-text-on-soft);
  }

  /* All selected items when listbox is not focused */
  :host(:state(selected):not([data-listbox-focused])) {
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
  }

  /* Show the current active item for keyboard users when the listbox is focused and the item isn't selected */
  :host([aria-current='true'][data-listbox-focused]:not(:state(selected), [data-listbox-readonly])) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-softer);
  }

  /* Hover state */
  @media (hover: hover) {
    :host(:not(:state(selected), [data-listbox-disabled], [data-listbox-readonly]):hover) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  /* Readonly state */
  :host([data-listbox-readonly]) {
    cursor: default;
  }

  /* Disabled state */
  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
