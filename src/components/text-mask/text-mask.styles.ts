import { css } from 'lit';

export default css`
  :host {
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    text-shadow: none !important; /* this will break the mask effect */
  }
`;
