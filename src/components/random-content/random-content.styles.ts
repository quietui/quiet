import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }

  ::slotted(*:not([data-visible])) {
    display: none !important;
  }
`;
