import { css } from 'lit';

/**
 * Shared text box styles for use with `<quiet-text-field>`, `<quiet-text-area>`, and similar text box components.
 * Components must render the following elements in this order: `#label`, `#description`, `#visual-box`, and `#text-box`
 * (which must be a child of `#visual-box`). See the template in `<quiet-text-area>` for an example.
 */
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

  #visual-box {
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

  #text-box {
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
  }

  /* Normal */
  #visual-box.normal {
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    padding: 0 0.75em;

    &:has(#text-box:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width));
    }
  }

  /* Filled */
  #visual-box.filled {
    background-color: var(--quiet-neutral-fill-softer);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    padding: 0 0.75em;

    &:has(#text-box:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width));
    }
  }

  /* Sizes */
  #visual-box.xs {
    font-size: var(--quiet-form-control-font-size-xs);

    #text-box {
      min-height: var(--quiet-form-control-height-xs);
    }
  }

  #visual-box.sm {
    font-size: var(--quiet-form-control-font-size-sm);

    #text-box {
      min-height: var(--quiet-form-control-height-sm);
    }
  }

  #visual-box.md {
    font-size: var(--quiet-form-control-font-size-md);

    #text-box {
      min-height: var(--quiet-form-control-height-md);
    }
  }

  #visual-box.lg {
    font-size: var(--quiet-form-control-font-size-lg);

    #text-box {
      min-height: var(--quiet-form-control-height-lg);
    }
  }

  #visual-box.xl {
    font-size: var(--quiet-form-control-font-size-xl);

    #text-box {
      min-height: var(--quiet-form-control-height-xl);
    }
  }

  /* Pills */
  #visual-box.pill {
    border-radius: 9999px;
    padding: 0 1.25em;

    #text-box::-webkit-color-swatch {
      border-radius: 9999px;
    }

    #text-box::-moz-color-swatch,
    #text-box::-moz-focus-inner {
      border-radius: 9999px;
    }
  }

  .text-box-button {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 1.5em;
    border: none;
    background: none;
    color: var(--quiet-text-muted);
    padding: 0;
    padding-inline: 0.25em;
    margin: 0;
    cursor: pointer;
    transition: 100ms translate ease;

    &:active {
      translate: 0 1px;
    }
  }

  #description {
    font-size: 0.8375rem;
    color: var(--quiet-text-muted);
  }

  :host([required]) #label::after {
    content: var(--quiet-form-control-required-content);
    margin-inline-start: -0.2em;
  }
`;
