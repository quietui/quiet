import { css } from 'lit';

export default css`
  :host {
    --color: var(--quiet-primary-fill-mid);

    display: inline-flex;
    width: 1em;
    height: 1em;
    animation: 750ms infinite spin linear;
  }

  svg {
    width: 1em;
    height: 1em;
  }

  g {
    animation: rotate 2s linear infinite;
    transform-origin: center center;
  }

  circle {
    stroke: var(--color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
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

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 100;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 44.5, 100;
      stroke-dashoffset: -17.5;
    }
    100% {
      stroke-dasharray: 44.5, 100;
      stroke-dashoffset: -62;
    }
  }
`;
