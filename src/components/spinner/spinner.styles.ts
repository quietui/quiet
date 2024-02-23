import { css } from 'lit';

export default css`
  :host {
    --color: var(--quiet-primary-moderate);

    display: inline-flex;
    width: 1em;
    height: 1em;
    border: solid 0.125em var(--color);
    border-bottom-color: color-mix(in oklab, var(--color), transparent 90%);
    border-left-color: color-mix(in oklab, var(--color), transparent 90%);
    border-radius: 50%;
    animation: 0.875s infinite spin cubic-bezier(0.37, 0.2, 0.63, 0.8);
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
