import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-height: 25rem;
    overflow-y: auto;
    gap: 0;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
    scrollbar-color: var(--quiet-neutral-fill-mid) transparent;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: var(--quiet-border-width);
  }

  quiet-spinner {
    margin-inline: auto;
    margin-block: 1rem;
  }

  ::slotted(*:focus) {
    outline: none;
  }

  ::slotted(*:focus-visible) {
    outline: var(--quiet-focus-ring);
    outline-offset: calc(-1 * var(--quiet-focus-width));
  }
`;
