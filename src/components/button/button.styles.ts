import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
  }

  .button {
    appearance: none;
    display: inline-flex;
    gap: 0.4em;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3em;
    font: inherit;
    font-size: 0.95em;
    font-weight: var(--quiet-font-weight-semibold);
    text-decoration: none;
    vertical-align: middle;
    background: none;
    border: none;
    border-radius: var(--quiet-border-radius);
    padding-inline: 1.25em;
    cursor: pointer;
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
      background-color: var(--quiet-primary-moderate);
      color: var(--quiet-primary-moderate-text);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, var(--quiet-primary-moderate), black 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: var(--quiet-primary-loud);
        color: var(--quiet-primary-loud-text);
      }
    }

    /* Secondary */
    &.secondary {
      background: transparent;
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-border-subtle);
      color: var(--quiet-neutral-subtle-text);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, transparent, var(--quiet-color) 3%);
        }
      }

      &[aria-pressed='true'] {
        border-color: var(--quiet-neutral-border-soft);
        background-color: var(--quiet-neutral-silent);
        color: var(--quiet-neutral-silent-text);
      }
    }

    /* Destructive */
    &.destructive {
      background-color: var(--quiet-destructive-moderate);
      color: var(--quiet-destructive-moderate-text);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, var(--quiet-destructive-moderate), black 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: var(--quiet-destructive-loud);
        color: var(--quiet-destructive-loud-text);
      }
    }

    /* Text */
    &.text {
      background: none;
      color: var(--quiet-neutral-silent-text);

      @media (hover: hover) {
        &:hover {
          background-color: color-mix(in oklab, transparent, var(--quiet-color) 3%);
          color: var(--quiet-neutral-silent-text);
        }
      }

      &[aria-pressed='true'] {
        background-color: var(--quiet-neutral-silent);
        color: var(--quiet-neutral-silent-text);
      }
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
      border-radius: calc(var(--quiet-border-radius) * 2);
      padding: 0;

      ::slotted(*) {
        width: auto !important;
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
