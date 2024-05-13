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
    outline: dotted 2px tomato;
    margin: 0;
  }

  .tooltip {
    display: none;
    position: absolute;
    width: max-content;
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

  .content {
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-neutral-fill-louder);
    color: var(--quiet-neutral-text-on-loud);
    font-size: 0.875em;
    padding: 0.5em 0.75em;
    user-select: none;
    -webkit-user-select: none;
    z-index: 3;
  }

  .arrow {
    position: absolute;
    width: calc(var(--arrow-diagonal-size) * 2);
    height: calc(var(--arrow-diagonal-size) * 2);
    background-color: var(--quiet-neutral-fill-louder);
    rotate: 45deg;
    z-index: 2;
  }

  .polygon {
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
    }
    to {
      opacity: 1;
    }
  }
`;
