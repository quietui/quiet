import { css } from 'lit';

export default css`
  :host {
    --arrow-size: 0.3125rem;
    --max-width: 20rem;
    --show-duration: 100ms;

    /* Internal calculated properties */
    --arrow-diagonal-size: calc(var(--arrow-size) * sin(45deg));

    display: contents;
    line-height: calc(var(--quiet-line-height) * 0.75);
    border: none;
    margin: 0;
  }

  #tooltip {
    display: none;
    position: absolute;
    width: max-content;
    background: none;
    max-width: var(--max-width);
    top: 0;
    left: 0;
    border: none;
    padding: 0;
    margin: 0;
    overflow: visible;

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
    background-color: var(--quiet-paper-color);
    border-radius: var(--quiet-border-radius);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    box-shadow: var(--quiet-shadow-mid);
    color: var(--quiet-neutral-text-on-soft);
    font-size: 0.875em;
    padding: 0.5em 0.75em;
    user-select: none;
    -webkit-user-select: none;
    z-index: 2;
  }

  #arrow {
    position: absolute;
    width: calc(var(--arrow-diagonal-size) * 2);
    height: calc(var(--arrow-diagonal-size) * 2);
    background-color: var(--quiet-paper-color);
    border-right: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    box-shadow: var(--quiet-shadow-mid);
    z-index: 3;
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

  #polygon {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--polygon-x1, 0) var(--polygon-y1, 0),
      var(--polygon-x2, 0) var(--polygon-y2, 0),
      var(--polygon-x3, 0) var(--polygon-y3, 0),
      var(--polygon-x4, 0) var(--polygon-y4, 0)
    );
  }

  @keyframes show {
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
