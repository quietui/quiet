import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host(:not([data-state-visible])) {
    display: none;
  }
`;
