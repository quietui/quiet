import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    position: relative;
    align-items: center;
    align-self: stretch;
    padding-inline: 1.5em;
    padding-block: 1em;
    gap: 0.5em;
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.9375em;
    cursor: pointer;
    user-select: none;
  }

  :host(:focus-visible) {
    outline: var(--quiet-focus-ring);
    outline-offset: calc(var(--quiet-focus-width) * -1) !important;
  }

  :host([aria-selected='true']) {
    color: var(--quiet-primary-text-colorful);
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
