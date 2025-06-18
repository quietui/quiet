import { css } from 'lit';

export default css`
  :host {
    --arrow-size: 0.3125rem;
    --max-width: 25rem;
    --show-duration: 100ms;

    /* Internal calculated properties */
    --arrow-diagonal-size: calc(var(--arrow-size) * sin(45deg));

    display: contents;
  }

  #dialog {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    overflow: visible;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }

    &::backdrop {
      background: transparent;
    }

    &.visible {
      display: flex;
    }

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--show-duration) ease reverse;
    }
  }

  #content {
    z-index: 2;
    max-width: var(--max-width);
    padding: 1rem;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius-md);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-mid);
  }

  #arrow {
    z-index: 3;
    position: absolute;
    width: calc(var(--arrow-diagonal-size) * 2);
    height: calc(var(--arrow-diagonal-size) * 2);
    border-right: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    background-color: var(--quiet-paper-color);
  }

  /* Prevent the popover from touching the edge of the viewport */
  :host([data-placement^='top']) #dialog,
  :host([data-placement^='bottom']) #dialog {
    padding-inline: 0.5rem;
  }

  :host([data-placement^='left']) #dialog,
  :host([data-placement^='right']) #dialog {
    padding-block: 0.5rem;
  }

  /* Rotate border position based on placement */
  :host([data-placement^='top']) {
    --show-x: 0;
    --show-y: 0.25em;
  }

  :host([data-placement^='top']) #arrow {
    rotate: 45deg;
  }

  :host([data-placement^='right']) {
    --show-x: -0.25em;
    --show-y: 0;
  }

  :host([data-placement^='right']) #arrow {
    rotate: 135deg;
  }

  :host([data-placement^='bottom']) {
    --show-x: 0;
    --show-y: -0.25em;
  }

  :host([data-placement^='bottom']) #arrow {
    rotate: 225deg;
  }

  :host([data-placement^='left']) {
    --show-x: 0.25em;
    --show-y: 0;
  }

  :host([data-placement^='left']) #arrow {
    rotate: 315deg;
  }

  @keyframes show {
    from {
      translate: var(--show-x) var(--show-y);
      scale: 0.9;
      opacity: 0;
    }
    to {
      translate: 0 0;
      scale: 1;
      opacity: 1;
    }
  }
`;
