import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
  }

  .button {
    appearance: none;
    display: inline-flex;
    gap: 0.4em;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    font: inherit;
    font-weight: var(--quiet-font-weight-semibold);
    text-decoration: none;
    vertical-align: middle;
    border: none;
    border-radius: var(--quiet-border-radius-base);
    padding: 0.6em 1rem;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    transition:
      100ms background-color ease,
      100ms translate ease;

    &:active:not(.disabled) {
      translate: 0 0.0625em;
    }

    /* Primary */
    &.primary {
      background-color: var(--quiet-primary-midtone);
      color: var(--quiet-text-midtone);

      &:hover:not(.disabled) {
        background-color: color-mix(in oklab, var(--quiet-primary-midtone), black 5%);
      }
    }

    /* Secondary */
    &.secondary {
      background-color: var(--quiet-neutral-subtle);
      color: var(--quiet-text-subtle);

      &:hover:not(.disabled) {
        background-color: color-mix(in oklab, var(--quiet-neutral-subtle), black 5%);
      }
    }

    /* Destructive */
    &.destructive {
      background-color: var(--quiet-destructive-midtone);
      color: var(--quiet-text-midtone);

      &:hover:not(.disabled) {
        background-color: color-mix(in oklab, var(--quiet-destructive-midtone), black 5%);
      }
    }

    /* Pills */
    &.pill {
      border-radius: 9999px;
    }

    /* Disable */
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Icons */
    ::slotted(svg) {
      align-self: center;
      width: 1em !important;
      height: 1em !important;
    }

    /* Loading */
    &.loading {
      cursor: wait;
    }

    &.loading slot {
      visibility: hidden;
    }

    .spinner {
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
      width: 1em;
      height: 1em;
      border: solid 0.15em currentColor;
      border-bottom-color: color-mix(in oklab, currentColor, transparent 90%);
      border-left-color: color-mix(in oklab, currentColor, transparent 90%);
      border-radius: 50%;
      display: block;
      animation: 1s infinite spin cubic-bezier(0.75, 0.4, 0.25, 0.6);
    }
  }

  @keyframes spin {
    from {
      rotate: 0;
    }

    to {
      rotate: 360deg;
    }
  }
`;
