import { css } from 'lit';

export default css`
  :host {
    --track-size: 0.75em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
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
      margin-block-start: 0.5em;
    }

    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #track {
    position: relative;
    isolation: isolate;
    background: var(--quiet-neutral-fill-soft);
    border-radius: 9999px;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    opacity: 0.5;
    cursor: not-allowed;
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
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-primary-fill-mid);
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
  #markers {
    pointer-events: none;
  }

  .marker {
    position: absolute;
    z-index: 2;
    width: var(--marker-width);
    height: var(--marker-height);
    background-color: var(--quiet-silent);
    border-radius: 50%;
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      font-size: 0.875em;
      line-height: 1;
      color: var(--quiet-text-muted);
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      width: min-content;
      order: 2;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`;
