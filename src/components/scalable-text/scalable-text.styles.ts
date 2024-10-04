import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow-x: hidden;
    border: solid 1px tomato;
    line-height: 1.2;
  }

  #text {
    display: inline-block;
    max-width: 100%;
    background: cyan;
    white-space: nowrap;
  }
`;
