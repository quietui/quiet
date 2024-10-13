import { css } from 'lit';

export default css`
  :host {
    display: block;
    width: 100%;
  }

  #container {
    display: flex;
    position: relative;
    align-items: center;
    white-space: nowrap;
  }

  #text {
    display: inline-block;
    width: auto;
    max-width: 100%;
    overflow: hidden;
  }
`;
