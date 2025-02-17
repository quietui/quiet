import { css } from 'lit';

export default css`
  #group {
    display: flex;
    margin-block-start: 0.5rem;
  }

  :host([orientation='horizontal']) #group {
    flex-wrap: wrap;
    gap: 1rem;
  }

  :host([orientation='vertical']) #group {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
