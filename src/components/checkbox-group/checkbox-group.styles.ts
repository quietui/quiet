import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  #group {
    display: flex;
    margin-block: 0.5rem;

    &.horizontal {
      gap: 1rem;
      flex-wrap: wrap;
    }

    &.vertical {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
`;
