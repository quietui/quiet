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
    margin-inline: var(--spacing);
  }

  .line {
    background-color: var(--color);
  }

  /* Horizontal */
  :host([aria-orientation='horizontal']) .line {
    flex-grow: 1;
    height: var(--thickness);
  }

  :host([aria-orientation='horizontal']) .line:first-child {
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
  }

  :host([aria-orientation='horizontal']) .line:last-child {
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
  }

  /* Vertical */
  :host([aria-orientation='vertical']) .line {
    flex-grow: 1;
    width: var(--thickness);
  }

  :host([aria-orientation='vertical']) .line:first-child {
    border-top-right-radius: 9999px;
    border-top-left-radius: 9999px;
  }

  :host([aria-orientation='vertical']) .line:last-child {
    border-bottom-right-radius: 9999px;
    border-bottom-left-radius: 9999px;
  }

  /* Symbols */
  .symbol {
    display: inline-flex; /* Ensures the container collapses when empty */
    padding: 0 0.5rem;
    color: var(--color);
    font-size: 1.25rem;
    filter: contrast(0.75);
    user-select: none;
    -webkit-user-select: none;
  }

  :host([aria-orientation='vertical']) .symbol {
    padding: 0.5rem 0;
  }
`;
