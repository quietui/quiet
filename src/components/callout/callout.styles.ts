import { css } from 'lit';

export default css`
  :host {
    display: flex;
    gap: 1em;
    align-items: center;
    width: 100%;
    border-style: var(--quiet-border-style);
    border-width: var(--quiet-border-width);
    border-radius: var(--quiet-border-radius);
    box-shadow: var(--quiet-shadow-softer);
    padding-inline: 1em;
    padding-block: 1em;
  }

  /* Primary */
  :host([variant='primary']) {
    background-color: var(--quiet-primary-fill-softer);
    border-color: var(--quiet-primary-stroke-softer);
  }

  :host([variant='primary']) #icon {
    color: var(--quiet-primary-text-colorful);
  }

  /* Secondary */
  :host([variant='secondary']) {
    background-color: var(--quiet-neutral-fill-softer);
    border-color: var(--quiet-neutral-stroke-softer);
  }

  :host([variant='secondary']) #icon {
    color: var(--quiet-neutral-text-colorful);
  }

  /* Constructive */
  :host([variant='constructive']) {
    background-color: var(--quiet-constructive-fill-softer);
    border-color: var(--quiet-constructive-stroke-softer);
  }

  :host([variant='constructive']) #icon {
    color: var(--quiet-constructive-text-colorful);
  }

  /* Destructive */
  :host([variant='destructive']) {
    background-color: var(--quiet-destructive-fill-softer);
    border-color: var(--quiet-destructive-stroke-softer);
  }

  :host([variant='destructive']) #icon {
    color: var(--quiet-destructive-text-colorful);
  }

  #icon {
    flex: 0 0 auto;
    align-self: start;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    max-width: 1.5em;
    max-height: 1.5em;
  }
`;
