import { css } from 'lit';

export default css`
  :host {
    --gap: 1rem;
  }

  #group {
    display: flex;
    margin-block-start: 0.5rem;
  }

  :host([orientation='horizontal']) #group {
    flex-wrap: wrap;
    gap: var(--gap);
  }

  :host([orientation='vertical']) #group {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
