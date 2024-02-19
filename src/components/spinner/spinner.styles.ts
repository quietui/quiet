import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    width: 1em;
    height: 1em;
    border: solid 0.15em currentColor;
    border-bottom-color: color-mix(in oklab, currentColor, transparent 90%);
    border-left-color: color-mix(in oklab, currentColor, transparent 90%);
    border-radius: 50%;
    animation: 1s infinite spin cubic-bezier(0.75, 0.4, 0.25, 0.6);
  }

  @keyframes spin {
    from {
      rotate: 0;
    }

    to {
      rotate: 360deg;
    }
  }
`;
