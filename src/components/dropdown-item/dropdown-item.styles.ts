import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.33em 1em;
    border-radius: calc(var(--quiet-border-radius) / 1.5);
    isolation: isolate;
    color: var(--quiet-neutral-text-on-soft);
    font-size: 0.9375em;
    line-height: var(--quiet-line-height);
    cursor: pointer;
    transition:
      100ms background-color ease,
      100ms color ease;
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--quiet-neutral-fill-softer);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-ring-offset);
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
  }

  :host(:state(disabled)) {
    cursor: not-allowed;
  }

  /* Destructive variant */
  :host([variant='destructive']),
  :host([variant='destructive']) #details {
    color: var(--quiet-destructive-text-colorful);
  }

  @media (hover: hover) {
    :host([variant='destructive']:hover) {
      background-color: var(--quiet-destructive-fill-softer);
      color: var(--quiet-destructive-text-colorful);
    }
  }

  :host([variant='destructive']:focus-visible) {
    background-color: var(--quiet-destructive-fill-softer);
    color: var(--quiet-destructive-text-colorful);
  }

  :host(:state(disabled)) {
    opacity: 0.5;
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  :host([submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.25em;
    margin-inline-end: 0.25em;
    font-size: 1.25em;
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.5em !important;
    font-size: 1.25em;
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--quiet-text-muted);
    font-size: 0.933334em !important;

    ::slotted(*) {
      margin-inline-start: 2em !important;
    }
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 0.5em;
    color: var(--quiet-text-muted);
    font-size: 1.25em;
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
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

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25rem;
      overflow: visible;
      border-radius: var(--quiet-border-radius);
    }

    &.show {
      animation: submenu-show var(--show-duration, 50ms) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, 50ms) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(quiet-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(quiet-divider) {
    --spacing: 0.25rem;
  }

  @keyframes submenu-show {
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
