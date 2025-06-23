import { css } from 'lit';

export default css`
  :host {
    --preview-height: 3lh;
    --duration: 200ms;
    --easing: ease;
    --shadow-color: var(--quiet-background-color);
    --shadow-size: 1lh;

    display: block;
    position: relative;
    isolation: isolate;
  }

  /* Content */
  #content {
    z-index: 1;
    position: relative;
    min-height: var(--preview-height);
    max-height: var(--preview-height);
    overflow: hidden;
  }

  :host([expanded]) #content {
    max-height: none;
    overflow: visible;
  }

  /* Shadow */
  #shadow {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: var(--shadow-size);
    background: linear-gradient(to top, var(--shadow-color), transparent 100%);
    pointer-events: none;
  }

  :host([expanded]) #shadow {
    display: none;
  }

  /* Trigger */
  #trigger {
    display: block;
    z-index: 2;
    position: relative;
    width: max-content;
    padding: 0.5em 0;
    border: none;
    border-radius: var(--quiet-border-radius-md);
    background: none;
    color: var(--quiet-primary-text-colorful);
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.9375em;
    line-height: inherit;
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
