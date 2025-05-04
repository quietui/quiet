import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    margin: 0;
    padding: 0;
    gap: 0.25em;
    list-style: none;
  }

  li {
    display: flex;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.25em;
    min-height: 2.25em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    color: var(--quiet-text-body);
    font: inherit;
    line-height: 1;
    font-family: inherit;
    font-variant-numeric: tabular-nums;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition:
      100ms color ease,
      100ms border-color ease,
      100ms background-color ease,
      100ms translate ease;

    user-select: none;
    -webkit-user-select: none;

    @media (hover: hover) {
      &:hover:not(:disabled, .current) {
        background-color: var(--quiet-neutral-fill-softer);
      }
    }

    &:active:not(:disabled, .current) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Current page */
    &.current:not(:disabled) {
      border-color: var(--quiet-primary-fill-mid);
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);
      font-weight: var(--quiet-font-weight-semibold);
      cursor: default;
    }

    /* Disabled buttons */
    &:disabled {
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Icons */
  quiet-icon,
  ::slotted(quiet-icon) {
    font-size: 1.25em;
  }

  /* Disabled */
  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Compact format */
  :host([format='compact']) #list {
    display: flex;
    align-items: center;
  }

  #range {
    margin-inline: 0.5em;
    font-variant-numeric: tabular-nums;
  }
`;
