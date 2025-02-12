import { css } from 'lit';

export default css`
  :host {
    --show-duration: 50ms;
    --preview-size: 1.6em;
  }

  /* Pills */
  #visual-box.pill {
    padding: 0 0.5em;
    border-radius: 9999px;
  }

  :host(:state(open):not(:state(disabled))) #visual-box {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: calc(-1 * var(--quiet-border-width));
  }

  #preview {
    position: relative;
    aspect-ratio: 1;
    width: var(--preview-size);
    height: var(--preview-size);
    border-radius: 50%;
    background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
    background-position:
      0 0,
      0 0,
      -0.25em -0.25em,
      0.25em 0.25em;
    background-size: 0.5em 0.5em;
    background-color: var(--current-color, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
    pointer-events: none;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: var(--preview-size);
      height: var(--preview-size);
      border-radius: inherit;
      background-color: var(--current-color);
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
      content: '';
    }
  }

  #color-picker {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    box-shadow: var(--quiet-shadow-mid);
    cursor: default;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--show-duration) ease reverse;
    }
  }

  :host([data-placement^='top']) #color-picker {
    transform-origin: bottom;
  }

  :host([data-placement^='bottom']) #color-picker {
    transform-origin: top;
  }

  :host([data-placement^='left']) #color-picker {
    transform-origin: right;
  }

  :host([data-placement^='right']) #color-picker {
    transform-origin: left;
  }

  :host([data-placement='left-start']) #color-picker {
    transform-origin: right top;
  }

  :host([data-placement='left-end']) #color-picker {
    transform-origin: right bottom;
  }

  :host([data-placement='right-start']) #color-picker {
    transform-origin: left top;
  }

  :host([data-placement='right-end']) #color-picker {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;
