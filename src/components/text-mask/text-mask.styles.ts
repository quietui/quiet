import { css } from 'lit';

export default css`
  :host {
    --brightness: 100%;
    --contrast: 100%;
    --grayscale: 0%;
    --hue-rotate: 0deg;

    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    text-shadow: none !important; /* this will break the mask effect */
    filter: brightness(var(--brightness)) contrast(var(--contrast)) grayscale(var(--grayscale))
      hue-rotate(var(--hue-rotate));
  }
`;
