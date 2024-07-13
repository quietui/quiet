import { css } from 'lit';

export default css`
  :host {
    --marker-size: 0.1875em;
    --tooltip-arrow-size: 0.3125rem;
    --tooltip-show-duration: 100ms;

    /* Internal calculated properties */
    --tooltip-arrow-diagonal-size: calc(var(--tooltip-arrow-size) * sin(45deg));
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
    --thumb-size: 1.25em;
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
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--quiet-primary-fill-mid);
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0.125em;
      right: 0.125em;
      bottom: 0.125em;
      left: 0.125em;
      background-color: white;
      border-radius: 50%;
    }

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
    top: calc(50% - var(--thumb-size) / 2);

    &:dir(ltr) {
      left: calc(var(--position) - var(--thumb-size) / 2);
      right: auto;
    }

    &:dir(rtl) {
      left: auto;
      right: calc(var(--position) - var(--thumb-size) / 2);
    }
  }

  .vertical #thumb {
    left: calc(50% - var(--thumb-size) / 2);
    bottom: calc(var(--position) - var(--thumb-size) / 2);
  }

  /* Markers */
  .marker {
    position: absolute;
    z-index: 2;
    width: var(--marker-size);
    height: var(--marker-size);
    background-color: var(--quiet-silent);
    border-radius: 50%;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-size) / 2);
    left: calc(var(--position) - var(--marker-size) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-size) / 2);
    left: calc(50% - var(--marker-size) / 2);
  }

  /* Tooltip */
  #tooltip {
    display: none;
    position: absolute;
    width: max-content;
    background: none;
    top: 0;
    left: 0;
    border: none;
    padding: 0;
    margin: 0;
    overflow: visible;

    &.visible {
      display: flex;
      opacity: 1;
    }

    &.show {
      animation: show-tooltip var(--tooltip-show-duration) ease;
    }

    &.hide {
      animation: show-tooltip var(--tooltip-show-duration) ease reverse;
    }
  }

  #tooltip-content {
    background-color: var(--quiet-paper-color);
    border-radius: var(--quiet-border-radius);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    box-shadow: var(--quiet-shadow-soft);
    color: var(--quiet-neutral-text-on-soft);
    font-size: 0.875em;
    padding: 0.3em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    z-index: 2;
  }

  #tooltip-arrow {
    position: absolute;
    width: calc(var(--tooltip-arrow-diagonal-size) * 2);
    height: calc(var(--tooltip-arrow-diagonal-size) * 2);
    background-color: var(--quiet-paper-color);
    border-right: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    z-index: 3;
  }

  /* Rotate border position based on placement */
  :host([data-placement^='top']) {
    --show-x: 0;
    --show-y: 0.25em;
  }

  :host([data-placement^='top']) #tooltip-arrow {
    rotate: 45deg;
  }

  :host([data-placement^='right']) {
    --show-x: -0.25em;
    --show-y: 0;
  }

  :host([data-placement^='right']) #tooltip-arrow {
    rotate: 135deg;
  }

  :host([data-placement^='bottom']) {
    --show-x: 0;
    --show-y: -0.25em;
  }

  :host([data-placement^='bottom']) #tooltip-arrow {
    rotate: 225deg;
  }

  :host([data-placement^='left']) {
    --show-x: 0.25em;
    --show-y: 0;
  }

  :host([data-placement^='left']) #tooltip-arrow {
    rotate: 315deg;
  }

  @keyframes show-tooltip {
    from {
      opacity: 0;
      scale: 0.9;
      translate: var(--show-x) var(--show-y);
    }
    to {
      opacity: 1;
      scale: 1;
      translate: 0 0;
    }
  }
`;
