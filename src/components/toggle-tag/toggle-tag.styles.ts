import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  /* The toggle tag's label */
  #label {
    display: flex;
    align-items: center;
    padding: 0.4em 0.6em;
    gap: 0.25em;
    border: none;
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-softer);
    font-weight: var(--quiet-font-weight-semibold);
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms color ease,
      100ms translate ease;
    user-select: none;

    &.xs {
      font-size: calc(var(--quiet-form-control-font-size-xs) * 0.875);
    }

    &.sm {
      font-size: calc(var(--quiet-form-control-font-size-sm) * 0.875);
    }

    &.md {
      font-size: calc(var(--quiet-form-control-font-size-md) * 0.875);
    }

    &.lg {
      font-size: calc(var(--quiet-form-control-font-size-lg) * 0.875);
    }

    &.xl {
      font-size: calc(var(--quiet-form-control-font-size-xl) * 0.875);
    }
  }

  ::slotted(quiet-icon) {
    font-size: 1.25em;
  }

  :host(:not(:state(disabled)):active) #label {
    translate: 0 var(--quiet-button-active-offset);
  }

  :host(:not(:state(disabled))):has(:focus-visible) #label {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
  }

  :host(:state(checked)) #label {
    background-color: var(--quiet-primary-fill-mid);
    color: var(--quiet-primary-text-on-mid);
  }

  :host(:state(disabled)) #label {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* The actual checkbox control - visually hidden */
  #checkbox {
    appearance: none;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: none;
    background: none;
    white-space: nowrap;
    clip-path: inset(50%);
    cursor: inherit;

    &:focus {
      outline: none;
    }
  }
`;
