import { css } from 'lit';

export default css`
  :host {
    --thumb-width: 1.25em;
    --thumb-height: 1.25em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  #label:has(~ .vertical) {
    order: 2;
    display: block;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  #slider {
    --thumb-border-width: 2px;
    --track-size: 0.75em;
    position: relative;
    isolation: isolate;
    background: var(--quiet-neutral-fill-soft);
    border-radius: 9999px;
    margin-block-start: 0.5em;

    /* Sizes */
    &.xs {
      font-size: var(--quiet-form-control-font-size-xs);
    }

    &.sm {
      font-size: var(--quiet-form-control-font-size-sm);
    }

    &.md {
      font-size: var(--quiet-form-control-font-size-md);
    }

    &.lg {
      font-size: var(--quiet-form-control-font-size-lg);
    }

    &.xl {
      font-size: var(--quiet-form-control-font-size-xl);
    }

    /* Orientation */
    &.horizontal {
      height: var(--track-size);
    }

    &.vertical {
      order: 1;
      width: var(--track-size);
      height: 200px;
      margin-inline: auto;
      margin-block-end: 0.5em;
    }

    /* Disabled */
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* Indicator */
  #indicator {
    position: absolute;
    background-color: var(--quiet-primary-fill-mid);
    border-radius: inherit;

    &:dir(ltr) {
      left: var(--start);
      right: calc(100% - var(--end));
    }

    &:dir(rtl) {
      left: calc(100% - var(--end));
      right: var(--start);
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    left: 0;
    width: 100%;

    bottom: var(--start);
    top: calc(100% - var(--end));
  }

  /* Thumb */
  #thumb {
    position: absolute;
    z-index: 3;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border-radius: 50%;
    background-color: white;
    border: solid 2px var(--quiet-primary-fill-mid);
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: calc(var(--quiet-focus-offset) * 2);
    }
  }

  .disabled #thumb {
    cursor: inherit;
  }

  .horizontal #thumb {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      left: calc(var(--position) - var(--thumb-width) / 2);
      right: auto;
    }

    &:dir(rtl) {
      left: auto;
      right: calc(var(--position) - var(--thumb-width) / 2);
    }
  }

  .vertical #thumb {
    left: calc(50% - var(--thumb-width) / 2);
    bottom: calc(var(--position) - var(--thumb-height) / 2);
  }

  /* Markers */
  .marker {
    position: absolute;
    z-index: 2;
    width: var(--marker-width);
    height: var(--marker-height);
    background-color: var(--quiet-silent);
    border-radius: 50%;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }
`;
