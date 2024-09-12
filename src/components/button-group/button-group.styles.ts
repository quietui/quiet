import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    gap: var(--quiet-border-width);
    isolation: isolate;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
  }

  /* Show the focus indicator above other buttons */
  ::slotted(:focus) {
    z-index: 1 !important;
  }
`;
