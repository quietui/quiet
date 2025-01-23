import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  #button {
    display: inline-flex;
    appearance: none;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.4em;
    border: none;
    border-radius: var(--quiet-border-radius);
    background: none;
    font: inherit;
    font-weight: var(--quiet-font-weight-semibold);
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
    cursor: inherit;
    touch-action: manipulation;
    transition:
      100ms color ease,
      100ms border-color ease,
      100ms background-color ease,
      100ms translate ease;
    user-select: none;
    -webkit-user-select: none;

    &:active:not(.disabled) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Sizes */
    &.xs {
      min-height: var(--quiet-form-control-height-xs);
      padding-inline: 0.85em;
      font-size: var(--quiet-form-control-font-size-xs);
    }

    &.sm {
      min-height: var(--quiet-form-control-height-sm);
      padding-inline: 1em;
      font-size: var(--quiet-form-control-font-size-sm);
    }

    &.md {
      min-height: var(--quiet-form-control-height-md);
      padding-inline: 1.25em;
      font-size: var(--quiet-form-control-font-size-md);
    }

    &.lg {
      min-height: var(--quiet-form-control-height-lg);
      padding-inline: 1.33em;
      font-size: var(--quiet-form-control-font-size-lg);
    }

    &.xl {
      min-height: var(--quiet-form-control-height-xl);
      padding-inline: 1.5em;
      font-size: var(--quiet-form-control-font-size-xl);
    }

    /* Normal buttons */
    &.normal {
      /* Default */
      &.default {
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

      /* Inverted */
      &.inverted {
        background-color: var(--quiet-neutral-fill-loud);
        color: var(--quiet-destructive-text-on-loud);

        @media (hover: hover) {
          &:hover:not(.disabled, [aria-pressed='true']) {
            background-color: color-mix(in oklab, var(--quiet-neutral-fill-loud), black 5%);
          }
        }

        &[aria-pressed='true'] {
          background-color: color-mix(in oklab, var(--quiet-neutral-fill-loud), var(--quiet-strident) 7.5%);
        }
      }
    }

    /* Outline buttons */
    &.outline.default {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-mid);
      background: transparent;
      color: var(--quiet-neutral-text-colorful);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background: color-mix(in oklab, transparent, var(--quiet-neutral-fill-mid) 7.5%);
        }
      }
    }

    &.outline.primary {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-primary-fill-mid);
      background: transparent;
      color: var(--quiet-primary-text-colorful);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background: color-mix(in oklab, transparent, var(--quiet-primary-fill-mid) 7.5%);
        }
      }
    }

    &.outline.destructive {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-destructive-fill-mid);
      background: transparent;
      color: var(--quiet-destructive-text-colorful);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background: color-mix(in oklab, transparent, var(--quiet-destructive-fill-mid) 7.5%);
        }
      }
    }

    &.outline.inverted {
      border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-destructive-fill-louder);
      background: transparent;
      color: var(--quiet-neutral-text-on-soft);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background: color-mix(in oklab, transparent, var(--quiet-destructive-fill-louder) 7.5%);
        }
      }
    }

    /* Text buttons */
    &.text {
      background: none;
      color: var(--quiet-neutral-text-on-soft);

      @media (hover: hover) {
        &:hover:not(.disabled, [aria-pressed='true']) {
          background-color: color-mix(in oklab, transparent, var(--quiet-text-body) 5%);
        }
      }

      &[aria-pressed='true'] {
        background-color: color-mix(in oklab, transparent, var(--quiet-text-body) 5%);
      }
    }

    /* Image buttons */
    &.image {
      height: auto;
      min-height: 0;
      padding: 0;
      border-radius: calc(var(--quiet-border-radius) * 2);

      ::slotted(*) {
        border-radius: calc(var(--quiet-border-radius) * 2) !important;
      }
    }

    /* Icon buttons */
    &.icon {
      padding-inline: 0.75em;

      &.xs {
        padding-inline: 0.525em;
      }

      &.sm {
        padding-inline: 0.65em;
      }

      &.lg {
        padding-inline: 0.675em;
      }

      &.xl {
        padding-inline: 0.55em;
      }
    }

    /* Pills */
    &.pill {
      border-radius: 9999px;
    }

    /* Toggle button indicators */
    #toggle-indicator {
      position: absolute;
      bottom: 0.25em;
      left: calc(50% - 0.375em);
      width: 0.75em;
      height: 0.25em;
      border-radius: 9999px;
      background-color: currentColor;
      opacity: 0.15;
    }

    &[aria-pressed='true'] #toggle-indicator {
      opacity: 1;
    }

    /* Disabled */
    &.disabled:not(.loading) {
      cursor: not-allowed;
      opacity: 0.5;
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

    #spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 75%);
      position: absolute;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }

    #caret {
      font-size: 1.25em;
    }

    /* Visually hidden label */
    slot[name='label'] {
      display: inline;
    }
  }

  /* Grouped buttons */
  :host([data-button-group-middle]) #button {
    border-radius: 0;
  }

  :host([data-button-group-horizontal][data-button-group-first]:not([data-button-group-last])) #button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-button-group-horizontal][data-button-group-last]:not([data-button-group-first])) #button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  :host([data-button-group-vertical][data-button-group-first]:not([data-button-group-last])) #button {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-button-group-vertical][data-button-group-last]:not([data-button-group-first])) #button {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  :host([appearance='outline'][data-button-group-middle]),
  :host([appearance='outline'][data-button-group-last]) {
    margin-inline-start: calc(var(--quiet-border-width) * -2);
  }

  /* Icons */
  ::slotted(quiet-icon) {
    font-size: 1.25em;
    stroke-width: 1.75px;
  }

  ::slotted(svg) {
    width: 1.25em;
    height: 1.25em;
  }
`;
