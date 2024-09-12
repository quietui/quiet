import { css } from 'lit';

export default css`
  :host {
    display: flex;
    align-items: center;
    padding: 0.33em 1em;
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    isolation: isolate;
    color: var(--quiet-neutral-text-on-soft);
    font-size: 0.9375em;
    line-height: var(--quiet-line-height);
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms color ease;
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
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
    visibility: hidden;
    margin-inline-start: -1.25em;
    margin-inline-end: 0.25em;
    font-size: 1.25em;
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.5em !important;
    font-size: 1.25em;
  }

  #label {
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--quiet-text-muted);
    font-size: 0.933334em !important;

    ::slotted(*) {
      margin-inline-start: 2em !important;
    }
  }
`;
