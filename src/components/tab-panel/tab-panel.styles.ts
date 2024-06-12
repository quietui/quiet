import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host(:not(:state(visible))) {
    display: none;
  }
`;
