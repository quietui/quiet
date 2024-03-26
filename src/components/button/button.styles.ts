import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
  }

  .button {
    appearance: none;
    position: relative;
    display: inline-flex;
    gap: 0.4em;
    align-items: center;
    justify-content: center;
    width: 100%;
    font: inherit;
    font-size: 0.9375em;
    font-weight: var(--quiet-font-weight-semibold);
    text-decoration: none;
    vertical-align: middle;
    background: none;
    border: none;
    border-radius: var(--quiet-border-radius);
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    transition:
      100ms color ease,
      100ms border-color ease,
      100ms background-color ease,
      100ms translate ease;

    &:active:not(.disabled) {
      translate: 0 0.0625em;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Primary */
    &.primary {
      background-color: var(--quiet-primary-fill-mid);
      color: var(--quiet-primary-text-on-mid);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, var(--quiet-primary-fill-mid), black 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: color-mix(in oklab, var(--quiet-primary-fill-mid), var(--quiet-strident) 7.5%);
      }
    }

    /* Secondary */
    &.secondary {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, var(--quiet-neutral-fill-softer), black 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: color-mix(in oklab, var(--quiet-neutral-fill-softer), var(--quiet-strident) 7.5%);
      }
    }

    /* Destructive */
    &.destructive {
      background-color: var(--quiet-destructive-fill-mid);
      color: var(--quiet-destructive-text-on-mid);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, var(--quiet-destructive-fill-mid), black 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: color-mix(in oklab, var(--quiet-destructive-fill-mid), var(--quiet-strident) 7.5%);
      }
    }

    /* Text */
    &.text {
      background: none;
      color: var(--quiet-neutral-text-on-soft);

      @media (hover: hover) {
        &:hover {
          background-color: color-mix(in oklab, transparent, var(--quiet-text-body) 2.5%);
          color: var(--quiet-neutral-text-on-soft);
        }
      }

      &[aria-pressed='true'] {
        background-color: color-mix(in oklab, transparent, var(--quiet-text-body) 5%);
      }
    }

    /* Toggle button indicators */
    &[aria-pressed]::after {
      content: '';
      position: absolute;
      bottom: 0.25em;
      left: calc(50% - 0.375em);
      width: 0.75em;
      height: 0.2em;
      background-color: currentColor;
      border-radius: 9999px;
      opacity: 0.15;
    }

    &[aria-pressed='true']::after {
      opacity: 1;
    }

    /* Sizes */
    &.xs {
      min-height: var(--quiet-form-control-height-xs);
      font-size: var(--quiet-form-control-font-size-xs);
      padding-inline: 0.75em;
    }

    &.sm {
      min-height: var(--quiet-form-control-height-sm);
      font-size: var(--quiet-form-control-font-size-sm);
      padding-inline: 1em;
    }

    &.md {
      min-height: var(--quiet-form-control-height-md);
      font-size: var(--quiet-form-control-font-size-md);
      padding-inline: 1.25em;
    }

    &.lg {
      min-height: var(--quiet-form-control-height-lg);
      font-size: var(--quiet-form-control-font-size-lg);
      padding-inline: 1.33em;
    }

    &.xl {
      min-height: var(--quiet-form-control-height-xl);
      font-size: var(--quiet-form-control-font-size-xl);
      padding-inline: 1.5em;
    }

    /* Pills */
    &.pill {
      border-radius: 9999px;
    }

    /* Icon buttons */
    &.icon {
      aspect-ratio: 1 / 1;
      padding-inline: 0.75em;
    }

    /* image buttons */
    &.image {
      height: auto;
      min-height: 0;
      border-radius: calc(var(--quiet-border-radius) * 2);
      padding: 0;

      ::slotted(*) {
        border-radius: calc(var(--quiet-border-radius) * 2) !important;
      }
    }

    /* Disable */
    &.disabled:not(.loading) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Loading */
    &.loading {
      cursor: not-allowed;

      &:not(.image) slot {
        visibility: hidden;
      }

      &.image ::slotted(*) {
        opacity: 0.5 !important;
      }
    }

    .spinner {
      --color: currentColor;
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
      width: 1em;
      height: 1em;
      animation: 750ms infinite spin linear;
    }

    /* Visually hidden label */
    slot[name='label'] {
      display: inline;
    }
  }

  /* Icons */
  ::slotted(quiet-icon) {
    font-size: 1.25em !important;
  }

  ::slotted(svg) {
    width: 1.25em;
    height: 1.25em;
  }
`;
