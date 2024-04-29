import { css } from 'lit';

export default css`
  :host {
    --color: var(--quiet-primary-fill-mid);

    display: inline-flex;
    width: 1em;
    height: 1em;
    animation: rotate 1.5s linear infinite;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
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
