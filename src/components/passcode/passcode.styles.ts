import { css } from 'lit';

export default css`
  #visual-box {
    display: flex;
    position: relative;
    width: fit-content;
    gap: 0.125em;

    /* Unset default visual box styles */
    &.normal,
    &.filled,
    &.unstyled {
      padding: 0;
      border: none;
      background: none;

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

    /* Delimiters */
    .delimiter {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      min-width: 0.5em;
      translate: 0 -0.0625em;
      color: var(--quiet-text-muted);
    }

    /* Characters */
    .character {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      aspect-ratio: 9 / 11;
      border-radius: calc(var(--quiet-border-radius) / 1.5);
      color: var(--quiet-text-body);
    }

    /* Masked */
    &.masked .character {
      &:not(.empty)::before {
        position: absolute;
        top: calc(50% - 0.125em);
        left: calc(50% - 0.125em);
        width: 0.25em;
        height: 0.25em;
        border-radius: 50%;
        background-color: var(--quiet-text-body);
        content: '';
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

    /* Normal */
    &.normal .character {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
      background-color: var(--quiet-paper-color);
    }

    /* Filled */
    &.filled .character {
      background-color: var(--quiet-neutral-fill-softer);
    }
  }

  :host(:state(focused)) .character.current {
    outline: var(--quiet-focus-ring);
    outline-offset: calc(-1 * var(--quiet-border-width));

    &::after {
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.09375em / 2);
      height: 1em;
      border-left: solid 0.09375em currentColor;
      content: '';
      animation: 1s cursor infinite;
    }

    &.last:not(.empty)::after {
      left: calc(100% - 0.25em);
    }

    &.last:not(.empty):dir(rtl)::after {
      left: 0.25em;
    }
  }

  /*
    The invisible text box. We don't want to use 0% opacity or visually hidden classes here because that prevents iOS
    users from being able to paste into the passcode.
  */
  #text-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: none;
    background: none;
    color: transparent;
    caret-color: transparent;
    cursor: text;

    &:disabled {
      cursor: not-allowed;
    }

    /* The input's text can get highlighted when right-clicking the input, so we make the selection invisible. */
    &::selection {
      background: transparent;
      color: transparent;
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
