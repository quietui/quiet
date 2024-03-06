import { css } from 'lit';

export default css`
  :host {
    display: flex;
    gap: 1em;
    align-items: center;
    width: 100%;
    border-radius: var(--quiet-border-radius);
    padding-inline: 1em;
    padding-block: 1em;
  }

  /* Primary */
  :host([variant='primary']) {
    background-color: var(--quiet-primary-fill-softer);
  }

  :host([variant='primary']) .icon {
    color: var(--quiet-primary-colored-text);
  }

  /* Secondary */
  :host([variant='secondary']) {
    background-color: var(--quiet-neutral-fill-softer);
  }

  :host([variant='secondary']) .icon {
    color: var(--quiet-neutral-colored-text);
  }

  /* Confirmative */
  :host([variant='confirmative']) {
    background-color: var(--quiet-confirmative-fill-softer);
  }

  :host([variant='confirmative']) .icon {
    color: var(--quiet-confirmative-colored-text);
  }

  /* Destructive */
  :host([variant='destructive']) {
    background-color: var(--quiet-destructive-fill-softer);
  }

  :host([variant='destructive']) .icon {
    color: var(--quiet-destructive-colored-text);
  }

  .icon {
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
