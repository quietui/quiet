import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }

  [part='unit'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  [part='value'] {
    display: block;
    text-align: center;
  }

  [part='label'] {
    display: block;
    font-size: max(12px, .5em);
    text-align: center;
  }

  [part='delimiter'] {
    align-self: start;
    margin: 0 0.125em;
`;
