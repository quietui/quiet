import { css } from 'lit';

export default css`
  :host {
    --preview-height: 3lh;
    --duration: 300ms;
    --easing: ease;

    display: block;
    position: relative;
  }

  #content {
    min-height: var(--preview-height);
    overflow: hidden;

    &.has-updated {
      transition: max-height var(--duration) var(--easing);
    }

    &:not(.expanded) {
      max-height: var(--preview-height);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
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

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
