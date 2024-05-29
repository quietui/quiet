import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  /* The checkbox's label */
  label {
    display: inline-flex;
    gap: 0.5em;
    align-items: center;
    cursor: pointer;

    &:has(.xs) {
      font-size: var(--quiet-form-control-font-size-xs);
    }

    &:has(.sm) {
      font-size: var(--quiet-form-control-font-size-sm);
    }

    &:has(.md) {
      font-size: var(--quiet-form-control-font-size-md);
    }

    &:has(.lg) {
      font-size: var(--quiet-form-control-font-size-lg);
    }

    &:has(.xl) {
      font-size: var(--quiet-form-control-font-size-xl);
    }
  }

  :host([data-state-disabled]) label {
    cursor: not-allowed;
  }

  #visual-box {
    display: flex;
    position: relative;
    font-size: 1.25em;
    border-radius: calc(var(--quiet-border-radius) / 2);
    width: 1em;
    height: 1em;
    transition:
      100ms background-color ease,
      100ms border-color ease;

    &:has(:focus-visible) {
      outline: dotted 4px tomato;
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: var(--quiet-border-width);
    }

    /* Normal */
    &.normal {
      background-color: var(--quiet-paper-color);
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
      color: var(--quiet-primary-text-on-mid);

      &.checked,
      &.indeterminate {
        background-color: var(--quiet-primary-fill-mid);
        border-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Filled */
    &.filled {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-soft);
      background-color: var(--quiet-neutral-fill-soft);
      color: var(--quiet-primary-text-on-mid);

      &.checked,
      &.indeterminate {
        background-color: var(--quiet-primary-fill-mid);
        border-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Check + indeterminate icons */
    #check-icon,
    #indeterminate-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      height: auto;
      transition: 100ms opacity ease;
      opacity: 0;
      will-change: opacity; /* prevents the icon from shifting slightly in Safari when checked */
    }

    &.checked:not(.indeterminate) #check-icon,
    &.indeterminate #indeterminate-icon {
      opacity: 1;
    }

    /* The actual checkbox control */
    #checkbox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      appearance: none;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: inherit;

      &:focus {
        outline: none;
      }
    }
  }

  :host([data-state-disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
