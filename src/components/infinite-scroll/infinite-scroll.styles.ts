import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-height: 25rem;
    overflow-y: auto;
    gap: 0;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
    -webkit-overflow-scrolling: touch;
  }

  quiet-spinner {
    margin-inline: auto;
    margin-block: 1rem;
  }
`;
