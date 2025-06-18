import { css } from 'lit';

export default css`
  /* Pills */
  #visual-box.pill {
    border-radius: var(--quiet-border-radius-pill);
  }

  #text-box::-webkit-color-swatch {
    border-radius: var(--quiet-border-radius-pill);
  }

  #text-box::-moz-color-swatch,
  #text-box::-moz-focus-inner {
    border-radius: var(--quiet-border-radius-pill);
  }
`;
