// expander.styles.ts
import { css } from 'lit';

export default css`
  :host {
    --height: 3lh;

    display: block;
    position: relative;
  }

  #toggle {
    display: block;
    width: max-content;
    padding: 0.5rem 0;
    border: none;
    border-radius: var(--quiet-border-radius);
    background: none;
    color: var(--quiet-primary-text-colorful);
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }
`;
