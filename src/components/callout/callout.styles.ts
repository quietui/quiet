import { css } from 'lit';

export default css`
  :host {
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: 1em;
    padding-block: 1em;
    gap: 1em;
    border-width: var(--quiet-border-width);
    border-style: var(--quiet-border-style);
    border-radius: var(--quiet-border-radius);
  }

  /* Primary */
  :host([variant='primary']) {
    border-color: var(--quiet-primary-stroke-softer);
    background-color: var(--quiet-primary-fill-softer);
  }

  :host([variant='primary']) #icon {
    color: var(--quiet-primary-text-colorful);
  }

  /* Secondary */
  :host([variant='secondary']) {
    border-color: var(--quiet-neutral-stroke-softer);
    background-color: var(--quiet-neutral-fill-softer);
  }

  :host([variant='secondary']) #icon {
    color: var(--quiet-neutral-text-colorful);
  }

  /* Constructive */
  :host([variant='constructive']) {
    border-color: var(--quiet-constructive-stroke-softer);
    background-color: var(--quiet-constructive-fill-softer);
  }

  :host([variant='constructive']) #icon {
    color: var(--quiet-constructive-text-colorful);
  }

  /* Destructive */
  :host([variant='destructive']) {
    border-color: var(--quiet-destructive-stroke-softer);
    background-color: var(--quiet-destructive-fill-softer);
  }

  :host([variant='destructive']) #icon {
    color: var(--quiet-destructive-text-colorful);
  }

  #icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    align-self: start;
    justify-content: center;
    max-width: 1.5em;
    max-height: 1.5em;
    font-size: 1.5em;
  }
`;
