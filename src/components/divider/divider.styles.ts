import { css } from 'lit';

export default css`
  :host {
    --color: var(--quiet-neutral-stroke-softer);
    --thickness: var(--quiet-border-width);
    --spacing: 1rem;
    display: flex;
    align-items: center;
  }

  :host([aria-orientation='horizontal']) {
    width: 100%;
    margin-block: var(--spacing);
  }

  :host([aria-orientation='vertical']) {
    flex-direction: column;
    height: 100%;
    min-block-size: 1lh;
    margin-inline: var(--spacing);
  }

  /* Horizontal */
  :host([aria-orientation='horizontal']) .line {
    flex-grow: 1;
    border-bottom: var(--quiet-border-style) var(--thickness) var(--color);
  }

  :host([aria-orientation='horizontal']) .line:first-child {
    border-top-left-radius: var(--quiet-border-radius-pill);
    border-bottom-left-radius: var(--quiet-border-radius-pill);
  }

  :host([aria-orientation='horizontal']) .line:last-child {
    border-top-right-radius: var(--quiet-border-radius-pill);
    border-bottom-right-radius: var(--quiet-border-radius-pill);
  }

  /* Vertical */
  :host([aria-orientation='vertical']) .line {
    flex-grow: 1;
    border-left: var(--quiet-border-style) var(--thickness) var(--color);
  }

  :host([aria-orientation='vertical']) .line:first-child {
    border-top-right-radius: var(--quiet-border-radius-pill);
    border-top-left-radius: var(--quiet-border-radius-pill);
  }

  :host([aria-orientation='vertical']) .line:last-child {
    border-bottom-right-radius: var(--quiet-border-radius-pill);
    border-bottom-left-radius: var(--quiet-border-radius-pill);
  }

  /* Symbols */
  .symbol {
    display: inline-flex; /* Ensures the container collapses when empty */
    padding: 0 1rem;
    color: var(--color);
    font-weight: var(--quiet-font-weight-normal);
    font-size: 1.25rem;
    filter: contrast(0.875);
    user-select: none;
    -webkit-user-select: none;
  }

  :host([aria-orientation='vertical']) .symbol {
    padding: 0.5rem 0;
  }
`;
