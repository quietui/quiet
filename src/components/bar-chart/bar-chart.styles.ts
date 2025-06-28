import { css } from 'lit';

export default css`
  :host {
    display: block;
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    height: auto;
  }

  canvas {
    max-width: 100%;
    max-height: 100%;
  }
`;
