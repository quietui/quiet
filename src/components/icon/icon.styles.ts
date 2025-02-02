import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    stroke-width: 1.5px;
    width: 1em;
    height: 1em;
  }

  :host([flip-x]) {
    transform: scaleX(-1);
  }

  :host([flip-y]) {
    transform: scaleY(-1);
  }

  :host([flip-x][flip-y]) {
    transform: scale(-1);
  }

  svg {
    display: block;
    width: auto;
    height: 100%;
    stroke-width: inherit;
  }
`;
