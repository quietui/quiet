import { css } from 'lit';

export default css`
  #listbox {
    display: flex;
    flex-direction: column;
    height: 12.125em;
    padding: 0.25em 0;
    overflow: auto;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    background-color: var(--quiet-paper-color);
  }

  /* Focus state for the listbox */
  :host(:state(focused)) #listbox {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: calc(-1 * var(--quiet-border-width));
  }

  :host(:state(disabled)),
  :host(:state(disabled)) ::slotted(quiet-listbox-item) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .readonly ::slotted(quiet-listbox-item) {
    cursor: default;
  }
`;
