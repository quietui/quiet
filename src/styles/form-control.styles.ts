import { css } from 'lit';

/**
 * Shared label, description, and text box styles for use with form controls.
 *
 * Text box components must render the following elements in this order: `#label`, `#description`, `#visual-box`, and
 * `#text-box` (which must be a child of `#visual-box`). See the template in `<quiet-text-area>` for an example.
 */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  /* Sizes */
  :host([size='xs']) {
    font-size: var(--quiet-form-control-font-size-xs);
  }

  :host([size='sm']) {
    font-size: var(--quiet-form-control-font-size-sm);
  }

  :host([size='md']) {
    font-size: var(--quiet-form-control-font-size-md);
  }

  :host([size='lg']) {
    font-size: var(--quiet-form-control-font-size-lg);
  }

  :host([size='xl']) {
    font-size: var(--quiet-form-control-font-size-xl);
  }

  #label {
    display: inline-block;
    max-width: fit-content;
    font-weight: var(--quiet-font-weight-semibold);
    line-height: calc(var(--quiet-line-height) * 0.75);

    &:has(~ .disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  :host([required]) #label::after {
    margin-inline-start: -0.2em;
    content: var(--quiet-form-control-required-content);
  }

  #description {
    color: var(--quiet-text-muted);
    font-size: 0.8375rem;
  }

  #visual-box {
    display: flex;
    position: relative;
    align-items: center;
    gap: 0.5em;
    font: inherit;
    cursor: text;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:has(#text-box[type='color']) {
      padding: 0 0.25em;
    }
  }

  #text-box {
    appearance: none;
    width: 100%;
    margin: auto 0;
    padding: 0;
    border: none;
    background: none;
    color: var(--quiet-text-body);
    font: inherit;
    cursor: inherit;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--quiet-text-muted);
      user-select: none;
      -webkit-user-select: none;
    }

    &::selection {
      background-color: var(--quiet-selection-background-color);
      color: var(--quiet-selection-color);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--quiet-primary-text-colorful);
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &::-webkit-datetime-edit-year-field:focus,
    &::-webkit-datetime-edit-month-field:focus,
    &::-webkit-datetime-edit-week-field:focus,
    &::-webkit-datetime-edit-day-field:focus,
    &::-webkit-datetime-edit-ampm-field:focus, /* Chrome */
    &::-webkit-datetime-edit-meridiem-field:focus, /* Safari */
    &::-webkit-datetime-edit-hour-field:focus,
    &::-webkit-datetime-edit-millisecond-field:focus,
    &::-webkit-datetime-edit-minute-field:focus,
    &::-webkit-datetime-edit-second-field:focus {
      outline: none;
      background-color: var(--quiet-selection-background-color);
      color: var(--quiet-selection-color);
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
        height: calc(100% - 0.5em);
        padding: 0;
        border-radius: calc(var(--quiet-border-radius) / 1.75);
      }

      &:-moz-focus-inner {
        padding: 0;
      }
    }

    /* Date and time inputs */
    &[type='date']::-webkit-date-and-time-value,
    &[type='time']::-webkit-date-and-time-value {
      text-align: start;
    }

    /* Number inputs */
    &[type='number']::-webkit-inner-spin-button {
      width: 2em;
      height: 2em;
    }
  }

  /* Normal */
  #visual-box.normal {
    padding: 0 0.75em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    background-color: var(--quiet-paper-color);

    &:has(#text-box:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width));
    }
  }

  /* Filled */
  #visual-box.filled {
    padding: 0 0.75em;
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    background-color: var(--quiet-neutral-fill-softer);

    &:has(#text-box:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: calc(-1 * var(--quiet-border-width));
    }
  }

  /* Sizes */
  #visual-box.xs {
    font-size: var(--quiet-form-control-font-size-xs);

    #text-box {
      min-height: calc(var(--quiet-form-control-height-xs) - var(--quiet-border-width) * 2);
    }
  }

  #visual-box.sm {
    font-size: var(--quiet-form-control-font-size-sm);

    #text-box {
      min-height: calc(var(--quiet-form-control-height-sm) - var(--quiet-border-width) * 2);
    }
  }

  #visual-box.md {
    font-size: var(--quiet-form-control-font-size-md);

    #text-box {
      min-height: calc(var(--quiet-form-control-height-md) - var(--quiet-border-width) * 2);
    }
  }

  #visual-box.lg {
    font-size: var(--quiet-form-control-font-size-lg);

    #text-box {
      min-height: calc(var(--quiet-form-control-height-lg) - var(--quiet-border-width) * 2);
    }
  }

  #visual-box.xl {
    font-size: var(--quiet-form-control-font-size-xl);

    #text-box {
      min-height: calc(var(--quiet-form-control-height-xl) - var(--quiet-border-width) * 2);
    }
  }

  /* Pills */
  #visual-box.pill {
    padding: 0 1.25em;
    border-radius: 9999px;

    &::-webkit-color-swatch {
      border-radius: 9999px;
    }

    &::-moz-color-swatch,
    &::-moz-focus-inner {
      border-radius: 9999px;
    }
  }

  .text-box-button {
    display: flex;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-inline: 0.25em;
    border: none;
    background: none;
    color: var(--quiet-text-muted);
    font: inherit;
    font-size: 1.25em;
    cursor: pointer;
    transition: 100ms translate ease;

    &:active {
      translate: 0 1px;
    }
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
