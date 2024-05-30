import { css } from 'lit';

export default css`
  :host {
    display: flex;
    gap: var(--quiet-border-width);
    flex-wrap: wrap;
    position: relative;
    isolation: isolate;
  }

  /* Show the focus indicator above other buttons */
  ::slotted(:focus) {
    z-index: 1 !important;
  }
`;
