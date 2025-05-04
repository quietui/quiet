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
    border-radius: calc(var(--quiet-border-radius) * 1.25);
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

    &:active:not(:disabled, .current) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Current page */
    &.current:not(:disabled) {
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

  /* Normal */
  :host([appearance='normal']) button {
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    background-color: var(--quiet-paper-color);

    @media (hover: hover) {
      &:hover:not(:disabled, .current) {
        background-color: var(--quiet-neutral-fill-softer);
      }
    }

    &.current:not(:disabled) {
      border-color: var(--quiet-primary-fill-mid);
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);
    }
  }

  /* Filled */
  :host([appearance='filled']) button {
    border: none;
    background-color: var(--quiet-neutral-fill-softer);

    @media (hover: hover) {
      &:hover:not(:disabled, .current) {
        background-color: var(--quiet-neutral-fill-soft);
      }
    }

    &.current:not(:disabled) {
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);
    }
  }

  /* Unstyled */
  :host([appearance='unstyled']) button {
    border: none;
    background-color: transparent;

    &.current:not(:disabled) {
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);
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
