import { css } from 'lit';

export default css`
  #group {
    display: flex;
    margin-block: 0.5rem;
  }

  :host([orientation='horizontal']) #group {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  :host([orientation='vertical']) #group {
    flex-direction: column;
    gap: 0.25rem;
  }

  :host(:state(disabled)) #label,
  :host(:state(disabled)) #description {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
