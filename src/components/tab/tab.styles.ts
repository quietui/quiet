import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    position: relative;
    align-items: center;
    gap: 0.5em;
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.9375em;
    padding-inline: 1.5em;
    padding-block: 1em;
    cursor: pointer;
    user-select: none;
  }

  :host(:focus-visible) {
    outline-offset: calc(var(--quiet-focus-width) * -1) !important;
  }

  :host([aria-selected='true']) {
    color: var(--quiet-primary-text-colorful);
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
