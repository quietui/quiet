import { css } from 'lit';

export default css`
  :host {
    display: flex;
    align-items: center;
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    font-size: 0.9375em;
    color: var(--quiet-neutral-text-on-soft);
    line-height: var(--quiet-line-height);
    padding: 0.33em 1em;
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms color ease;
    isolation: isolate;
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host(:focus-visible) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
    z-index: 1;
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
  }

  /* Destructive variant */
  :host([variant='destructive']),
  :host([variant='destructive']) #details {
    color: var(--quiet-destructive-text-colorful);
  }

  @media (hover: hover) {
    :host([variant='destructive']:hover) {
      background-color: var(--quiet-destructive-fill-softer);
      color: var(--quiet-destructive-text-colorful);
    }
  }

  :host([variant='destructive']:focus-visible) {
    background-color: var(--quiet-destructive-fill-softer);
    color: var(--quiet-destructive-text-colorful);
  }

  :host(:state(disabled)) {
    opacity: 0.5;
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  #check {
    font-size: 1.25em;
    margin-inline-start: -1.25em;
    margin-inline-end: 0.25em;
    visibility: hidden;
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 1.25em;
    margin-inline-end: 0.5em !important;
  }

  #label {
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  #details {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: 0.933334em !important;
    color: var(--quiet-text-muted);

    ::slotted(*) {
      margin-inline-start: 2em !important;
    }
  }
`;
