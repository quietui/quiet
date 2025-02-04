import { css } from 'lit';

export default css`
  :host {
    --show-duration: 50ms;

    display: contents;
  }

  #menu {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25rem;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-mid);
    color: var(--quiet-neutral-text-on-soft);
    text-align: start;
    user-select: none;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--show-duration) ease reverse;
    }

    ::slotted(small) {
      display: block !important;
      padding: 0.25rem 1rem !important;
      color: var(--quiet-text-muted) !important;
      font-weight: var(--quiet-font-weight-semibold) !important;
      font-size: 0.75em !important;
    }

    ::slotted(quiet-divider) {
      --spacing: 0.25rem;
    }
  }

  :host([data-placement^='top']) #menu {
    transform-origin: bottom;
  }

  :host([data-placement^='bottom']) #menu {
    transform-origin: top;
  }

  :host([data-placement^='left']) #menu {
    transform-origin: right;
  }

  :host([data-placement^='right']) #menu {
    transform-origin: left;
  }

  :host([data-placement='left-start']) #menu {
    transform-origin: right top;
  }

  :host([data-placement='left-end']) #menu {
    transform-origin: right bottom;
  }

  :host([data-placement='right-start']) #menu {
    transform-origin: left top;
  }

  :host([data-placement='right-end']) #menu {
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
