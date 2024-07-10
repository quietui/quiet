import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    stroke-width: 1.5px;
    width: auto;
    height: 1em;
  }

  svg {
    display: block;
    width: auto;
    height: 100%;
    stroke-width: inherit;
  }
`;
