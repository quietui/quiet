import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    width: auto;
    height: 1em;
    stroke-width: 1.5px;
  }

  svg {
    display: block;
    width: auto;
    height: 100%;
    stroke-width: inherit;
  }
`;
