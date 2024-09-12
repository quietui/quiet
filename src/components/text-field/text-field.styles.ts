import { css } from 'lit';

export default css`
  /* Pills */
  #visual-box.pill {
    padding: 0 1.25em;
    border-radius: 9999px;
  }

  #text-box::-webkit-color-swatch {
    border-radius: 9999px;
  }

  #text-box::-moz-color-swatch,
  #text-box::-moz-focus-inner {
    border-radius: 9999px;
  }
`;
