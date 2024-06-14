import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  #group {
    display: flex;
    margin-block: 0.5rem;
  }

  :host([orientation='horizontal']) #group {
    gap: 1rem;
    flex-wrap: wrap;
  }

  :host([orientation='vertical']) #group {
    flex-direction: column;
    gap: 0.25rem;
  }
`;
