import { css } from 'lit';

export default css`
  :host {
    --item-spacing: 0.5em;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--item-spacing);
  }
`;
