import { css } from 'lit';

export default css`
  :host {
    --cursor-color: currentColor;
    --cursor-width: 1.5px;

    display: inline-block;
    position: relative;
    min-height: 1lh;
    white-space: pre-wrap;
  }

  .cursor {
    display: inline-block;
    width: var(--cursor-width);
    height: 0.8lh;
    margin-inline-start: 0.1em;
    background-color: var(--cursor-color);
    vertical-align: -0.175lh;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;
