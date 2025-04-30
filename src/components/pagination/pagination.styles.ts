import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  nav {
    width: 100%;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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
    min-width: 2.5em;
    min-height: 2.5em;
    padding: 0 0.5em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
    font-size: inherit;
    line-height: 1;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms border-color ease,
      100ms color ease,
      100ms box-shadow ease,
      100ms translate ease;
    user-select: none;
    -webkit-user-select: none;

    &:hover:not(:disabled, .current, .ellipsis) {
      border-color: var(--quiet-neutral-stroke-soft);
      box-shadow: var(--quiet-shadow-softer);
    }

    &:active:not(:disabled, .current) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Current page */
    &.current {
      border-color: var(--quiet-primary-fill-mid);
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);
      font-weight: var(--quiet-font-weight-semibold);
      cursor: default;
    }

    /* Disabled state */
    :host(:state(disabled)) {
      opacity: 0.7;
    }

    :host(:state(disabled)) button.disabled {
      box-shadow: none;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  quiet-icon {
    font-size: 1.25em;
  }
`;
