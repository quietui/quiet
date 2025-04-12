import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    flex: 1 0 auto;
    flex-wrap: wrap;
    gap: min(var(--quiet-border-width), 0.125rem);
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
