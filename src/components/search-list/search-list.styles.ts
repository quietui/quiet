import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  slot[name='controller']::slotted(input),
  slot[name='controller']::slotted(quiet-text-field) {
    margin-block-end: 1em;
  }

  #items {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    gap: 1em;
  }
`;
