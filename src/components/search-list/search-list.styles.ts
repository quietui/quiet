import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  #items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    margin-block-start: 1em;
    gap: 1em;
  }
`;
