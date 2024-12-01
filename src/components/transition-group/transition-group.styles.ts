import { css } from 'lit';

export default css`
  :host {
    --duration: 0.25s;

    display: flex;
    flex-direction: column;
    align-content: start;
    width: 100%;
  }

  /* Don't allow clicks while the transition is running to prevent animation blips */
  :host(:state(transitioning)) {
    pointer-events: none;
  }
`;
