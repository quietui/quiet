import { css } from 'lit';

export default css`
  :host {
    --item-spacing: 0.5em;

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--item-spacing);
  }
`;
