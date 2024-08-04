import { css } from 'lit';

export default css`
  #visual-box {
    position: relative;
    display: flex;
    gap: 0.125em;
    width: fit-content;
    color: var(--quiet-text-muted);

    /* Unset default visual box styles */
    &.normal,
    &.filled,
    &.unstyled {
      border: none;
      background: none;
      padding: 0;

      &:has(#text-box:focus-visible) {
        outline: none;
      }
    }

    &:not(.case-sensitive) {
      text-transform: uppercase;
    }

    /* Disabled */
    &.disabled {
      opacity: 0.5;
    }

    /* Placeholders */
    .placeholder {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .character {
      aspect-ratio: 9 / 11;
      border-radius: calc(var(--quiet-border-radius) / 1.5);
      color: var(--quiet-text-body);

      &.empty {
        color: var(--quiet-text-muted);
      }
    }

    /* Masked */
    &.masked .character {
      &:not(.empty)::before {
        content: '';
        position: absolute;
        top: calc(50% - 0.125em);
        left: calc(50% - 0.125em);
        width: 0.25em;
        height: 0.25em;
        background-color: var(--quiet-text-body);
        border-radius: 50%;
      }
    }

    /* Sizes */
    &.xs {
      font-size: calc(var(--quiet-form-control-font-size-xs) * 1.5);

      .character {
        height: calc(var(--quiet-form-control-height-xs) + var(--quiet-border-width) * 2);
      }
    }

    &.sm {
      font-size: calc(var(--quiet-form-control-font-size-sm) * 1.5);

      .character {
        height: calc(var(--quiet-form-control-height-sm) + var(--quiet-border-width) * 2);
      }
    }

    &.md {
      font-size: calc(var(--quiet-form-control-font-size-md) * 1.5);

      .character {
        height: calc(var(--quiet-form-control-height-md) + var(--quiet-border-width) * 2);
      }
    }

    &.lg {
      font-size: calc(var(--quiet-form-control-font-size-lg) * 1.5);

      .character {
        height: calc(var(--quiet-form-control-height-lg) + var(--quiet-border-width) * 2);
      }
    }

    &.xl {
      font-size: calc(var(--quiet-form-control-font-size-xl) * 1.5);

      .character {
        height: calc(var(--quiet-form-control-height-xl) + var(--quiet-border-width) * 2);
      }
    }

    .delimiter {
      min-width: 0.5em;
      translate: 0 -0.0625em;
    }

    /* Normal */
    &.normal .character {
      background-color: var(--quiet-paper-color);
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    }

    /* Filled */
    &.filled .character {
      background-color: var(--quiet-neutral-fill-softer);
    }
  }

  :host(:state(focused)) .placeholder {
    &.current {
      outline: var(--quiet-focus-ring);
      outline-offset: calc(-1 * var(--quiet-border-width));

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 0.5em);
        left: calc(50% - 0.09375em / 2);
        height: 1em;
        border-left: solid 0.09375em currentColor;
        animation: 1s cursor infinite;
      }

      &.last:not(.empty)::after {
        left: calc(100% - 0.25em);
      }

      &.last:not(.empty):dir(rtl)::after {
        left: 0.25em;
      }
    }
  }

  /* Visually hidden text box */
  #text-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: solid 1px tomato;
    opacity: 0;
    cursor: text;

    &:disabled {
      cursor: not-allowed;
    }
  }

  @keyframes cursor {
    0% {
      opacity: 1;
    }
    49% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;
