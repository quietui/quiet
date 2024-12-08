import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  /* The radio item's label */
  #label {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
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

  :host(:state(disabled)) #label {
    cursor: not-allowed;
  }

  #visual-box {
    display: flex;
    position: relative;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    transition:
      100ms background-color ease,
      100ms border-color ease;

    /* Normal */
    &.normal {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
      background-color: var(--quiet-paper-color);
      color: var(--quiet-primary-text-on-mid);

      &.checked {
        border-color: var(--quiet-primary-fill-mid);
        background-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Filled */
    &.filled {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-soft);
      background-color: var(--quiet-neutral-fill-soft);
      color: var(--quiet-primary-text-on-mid);

      &.checked {
        border-color: var(--quiet-primary-fill-mid);
        background-color: var(--quiet-primary-fill-mid);
      }
    }

    /* Radio icons */
    #radio-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      scale: 0;
      font-size: 1.25em;
      opacity: 0;
      stroke-width: 2px;
      transition:
        100ms opacity ease,
        100ms scale ease;
      will-change: opacity; /* prevents the icon from shifting slightly in Safari when checked */
    }

    &.checked #radio-icon {
      scale: 0.6;
      opacity: 1;
    }

    /* The actual radio control */
    #radio {
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      cursor: inherit;

      &:focus {
        outline: none;
      }
    }
  }

  /* Focus styles */
  :host(:focus-visible:not(:state(disabled))) {
    outline: none;
  }

  :host(:focus-visible:not(:state(disabled))) #visual-box {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: var(--quiet-border-width);
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
