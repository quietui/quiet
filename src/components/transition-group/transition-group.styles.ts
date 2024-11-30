import { css } from 'lit';

export default css`
  :host {
    --duration: 0.25s;
    --easing: cubic-bezier(0.45, 0, 0.55, 1); /* ease in/out quad */

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
