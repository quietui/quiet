import { css } from 'lit';

export default css`
  :host {
    --duration: 2s;

    display: inline-block;
  }

  quiet-number {
    display: inline-block;
    transition: all var(--duration) ease-out;
  }

  /* Adjust for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .number {
      transition: none;
    }
  }
`;
