import { css } from 'lit';

export default css`
  :host {
    --indicator-color: var(--quiet-primary-fill-mid);
    --track-color: var(--quiet-neutral-stroke-softer);
    --speed: 0.75s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    animation: rotate var(--speed) linear infinite;
    transform-origin: center;
  }

  #track {
    stroke: var(--track-color);
  }

  #indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 30, 50;
    stroke-dashoffset: -5;
    stroke-linecap: round;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
