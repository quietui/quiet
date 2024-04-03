import { css } from 'lit';

export default css`
  :host {
    --show-duration: 50ms;

    display: contents;
  }

  .menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: max-content;
    color: var(--quiet-neutral-text-on-soft);
    background: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    box-shadow: var(--quiet-shadow-mid);
    user-select: none;
    padding: 0.25rem;
    z-index: 1000; /* TODO */
    transform-origin: top left;

    &.fixed {
      position: fixed;
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

    ::slotted(small) {
      display: block !important;
      font-size: 0.75rem !important;
      font-weight: var(--quiet-font-weight-semibold) !important;
      color: var(--quiet-text-muted) !important;
      padding: 0.25rem 1rem !important;
    }

    ::slotted(quiet-divider) {
      --spacing: 0.25rem;
      --color: var(--quiet-neutral-stroke-softer);
    }
  }

  :host([data-placement^='top']) .menu {
    transform-origin: bottom;
  }

  :host([data-placement^='bottom']) .menu {
    transform-origin: top;
  }

  :host([data-placement^='left']) .menu {
    transform-origin: right;
  }

  :host([data-placement^='right']) .menu {
    transform-origin: left;
  }

  :host([data-placement='left-start']) .menu {
    transform-origin: right top;
  }

  :host([data-placement='left-end']) .menu {
    transform-origin: right bottom;
  }

  :host([data-placement='right-start']) .menu {
    transform-origin: left top;
  }

  :host([data-placement='right-end']) .menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      opacity: 0;
      scale: 0.9;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;
