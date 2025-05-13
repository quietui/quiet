import { css } from 'lit';

export default css`
  :host {
    --preview-height: 3lh;

    display: block;
    position: relative;
  }

  #content {
    max-height: var(--preview-height);
    overflow: hidden;
    transition: none;
  }

  #content.expanded {
    max-height: none;
    overflow: visible;
  }

  #toggle {
    display: block;
    width: max-content;
    padding: 0.5em 0;
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
