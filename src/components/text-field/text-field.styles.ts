import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  #label {
    display: inline-block;
    max-width: fit-content;
    font-size: 0.9375em;
    font-weight: var(--quiet-font-weight-semibold);
    line-height: calc(var(--quiet-line-height) * 0.75);
  }

  #box {
    display: flex;
    position: relative;
    gap: 0.5em;
    align-items: center;
    font: inherit;
    cursor: text;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  #text-field {
    width: 100%;
    font: inherit;
    color: var(--quiet-text-body);
    border: none;
    background: none;
    padding: 0;
    margin: auto 0;
    cursor: inherit;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--quiet-text-muted);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--quiet-primary-text-colorful);
    }

    /* Color inputs */
    &[type='color'] {
      &::-webkit-color-swatch-wrapper {
        padding: 0.25em 0;
      }

      &::-webkit-color-swatch {
        border: none;
        border-radius: calc(var(--quiet-border-radius) / 1.75);
      }

      &::-moz-color-swatch,
      &::-moz-focus-inner {
        padding: 0;
        height: calc(100% - 0.5em);
        border-radius: calc(var(--quiet-border-radius) / 1.75);
      }

      &:-moz-focus-inner {
        padding: 0;
      }
    }
  }

  /* Normal */
  #box.normal {
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    padding: 0 0.75em;

    &.color {
      padding: 0 0.25em;
    }

    &:has(#text-field:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width) - 1px);
    }
  }

  /* Filled */
  #box.filled {
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    padding: 0 0.75em;

    &:has(#text-field:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width) - 1px);
    }
  }

  /* Sizes */
  #box.xs {
    font-size: var(--quiet-form-control-font-size-xs);

    #text-field {
      min-height: var(--quiet-form-control-height-xs);
    }
  }

  #box.sm {
    font-size: var(--quiet-form-control-font-size-sm);

    #text-field {
      min-height: var(--quiet-form-control-height-sm);
    }
  }

  #box.md {
    font-size: var(--quiet-form-control-font-size-md);

    #text-field {
      min-height: var(--quiet-form-control-height-md);
    }
  }

  #box.lg {
    font-size: var(--quiet-form-control-font-size-lg);

    #text-field {
      min-height: var(--quiet-form-control-height-lg);
    }
  }

  #box.xl {
    font-size: var(--quiet-form-control-font-size-xl);

    #text-field {
      min-height: var(--quiet-form-control-height-xl);
    }
  }

  /* Pills */
  #box.pill {
    border-radius: 9999px;
    padding: 0 1.25em;

    #text-field::-webkit-color-swatch {
      border-radius: 9999px;
    }

    #text-field::-moz-color-swatch,
    #text-field::-moz-focus-inner {
      border-radius: 9999px;
    }
  }

  .helper-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 1.5em;
    border: none;
    background: none;
    color: var(--quiet-text-muted);
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  #description {
    font-size: 0.8375rem;
    color: var(--quiet-text-muted);
  }

  #custom-validity {
    font-size: 0.8375rem;
    color: var(--quiet-destructive-text-colorful);
  }

  :host([required]) #label::after {
    content: var(--quiet-form-control-required-content);
    margin-inline-start: -0.2em;
  }

  /* Icons */
  slot[name='start']::slotted(*),
  slot[name='end']::slotted(*) {
    color: var(--quiet-text-muted) !important;
  }

  slot[name='start']::slotted(quiet-icon),
  slot[name='end']::slotted(quiet-icon) {
    font-size: 1.25em !important;
    pointer-events: none;
  }

  slot[name='start']::slotted(svg),
  slot[name='end']::slotted(svg) {
    width: 1.25em;
    height: 1.25em;
    pointer-events: none;
  }
`;
