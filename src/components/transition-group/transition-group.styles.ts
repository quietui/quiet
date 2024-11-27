import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Don't allow clicks while the transition is running to prevent animation blips */
  :host(:state(transitioning)) {
    pointer-events: none;
  }
`;
