import { css } from 'lit';

export default css`
  :host {
    --duration: 200ms;
    --easing: ease;
    --border-color: var(--quiet-neutral-stroke-softer);
    --border-width: var(--quiet-border-width);
    --border-style: var(--quiet-border-style);
    --border-radius: var(--quiet-border-radius-md);

    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Contained appearance */
  :host([appearance='contained']) {
    border: var(--border-style) var(--border-width) var(--border-color);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
  }

  /* Separated appearance */
  :host([appearance='separated']) {
    gap: 1em;
  }
`;
