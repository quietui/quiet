import { css } from 'lit';

export default css`
  /* Pills */
  #visual-box.pill {
    border-radius: 9999px;
    padding: 0 1.25em;
  }

  #text-box::-webkit-color-swatch {
    border-radius: 9999px;
  }

  #text-box::-moz-color-swatch,
  #text-box::-moz-focus-inner {
    border-radius: 9999px;
  }
`;
