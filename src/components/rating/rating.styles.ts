import { css } from 'lit';

export default css`
  :host {
    --symbol-selected-color: #f59e0b;
    --symbol-unselected-color: var(--quiet-neutral-fill-mid);
  }

  #rating {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    border-radius: var(--quiet-border-radius);
    gap: 0.0625em;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.readonly {
      cursor: default;
    }

    /* Sizes */
    &.xs {
      font-size: calc(var(--quiet-form-control-font-size-xs) * 1.5);
    }

    &.sm {
      font-size: calc(var(--quiet-form-control-font-size-sm) * 1.5);
    }

    &.md {
      font-size: calc(var(--quiet-form-control-font-size-md) * 1.5);
    }

    &.lg {
      font-size: calc(var(--quiet-form-control-font-size-lg) * 1.5);
    }

    &.xl {
      font-size: calc(var(--quiet-form-control-font-size-xl) * 1.5);
    }
  }

  .symbol {
    display: inline-flex;
    align-items: center;
    position: relative;
    transition:
      100ms clip-path ease,
      100ms color ease,
      100ms scale ease,
      100ms translate ease;

    > :first-child,
    > :last-child {
      transition: inherit;
    }

    /* Selected symbols */
    > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: var(--symbol-selected-color);
      clip-path: inset(0 calc(100% - var(--clip-percentage)) 0 0);

      &:dir(rtl) {
        clip-path: inset(0 0 0 calc(100% - var(--clip-percentage)));
      }
    }

    /* Unselected symbols */
    > :last-child {
      color: var(--symbol-unselected-color);
      clip-path: inset(0 0 0 var(--clip-percentage));

      &:dir(rtl) {
        clip-path: inset(0 var(--clip-percentage) 0 0);
      }
    }
  }

  #rating:not(.disabled, .readonly) .symbol {
    @media (hover: hover) {
      &:hover {
        scale: 1.2;
      }

      &:hover:active {
        translate: 0 var(--quiet-button-active-offset);
      }
    }
  }
`;
