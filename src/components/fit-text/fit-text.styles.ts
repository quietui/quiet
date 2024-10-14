import { css } from 'lit';

export default css`
  :host {
    display: block;
    max-width: 100%;
    min-height: 1lh;
    white-space: nowrap;
  }

  #measure {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    outline: dotted 2px green;
    white-space: nowrap;
    clip-path: inset(50%);
  }
`;
