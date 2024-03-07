import { css } from 'lit';

export default css`
  :host {
    --width: 30rem;
    --height: fit-content;
    --show-duration: 200ms;
    --spacing: 1.5em;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    position: fixed;
    inset-block-start: 0;
    inset-block-end: 0;
    display: flex;
    flex-direction: column;
    width: var(--width);
    height: var(--height);
    border: none;
    border-radius: var(--quiet-border-radius);
    background: var(--quiet-raised-background-color);
    box-shadow: var(--quiet-shadow-loud);
    padding: 0;

    &::backdrop {
      /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
      background-color: var(--quiet-backdrop-color, rgba(0 0 0 / 0.25));
      backdrop-filter: var(--quiet-backdrop-filter);
      -webkit-backdrop-filter: var(--quiet-backdrop-filter, blur(6px));
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
    }

    /* Shake animation */
    &.shake {
      animation: shake 1000ms ease;
    }

    &.pulse {
      --pulse-size: 1.01;
      animation: pulse 250ms ease;
    }

    /* Center placement */
    &[data-placement='center'] {
      --pulse-size: 1.02;
      max-width: calc(100vw - var(--quiet-content-spacing));
      max-height: calc(100vh - var(--quiet-content-spacing));

      &.show {
        animation: show-from-center var(--show-duration) ease;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease;
        }
      }

      &.hide {
        animation: show-from-center var(--show-duration) ease reverse;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease reverse;
        }
      }
    }

    /* Top placement */
    &[data-placement='top'] {
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: 0;
      inset-block-end: auto;
      width: 100vw;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;

      &.show {
        animation: show-from-top var(--show-duration) ease;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease;
        }
      }

      &.hide {
        animation: show-from-top var(--show-duration) ease reverse;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease reverse;
        }
      }
    }

    /* Bottom placement */
    &[data-placement='bottom'] {
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: auto;
      inset-block-end: 0;
      width: 100vw;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;

      &.show {
        animation: show-from-bottom var(--show-duration) ease;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease;
        }
      }

      &.hide {
        animation: show-from-bottom var(--show-duration) ease reverse;

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease reverse;
        }
      }
    }

    /* Start placement */
    &[data-placement='start'] {
      inset-inline-start: 0;
      inset-inline-end: auto;
      inset-block-start: 0;
      inset-block-end: 0;
      max-width: 100vw;
      max-height: none;
      height: 100vh;
      border-radius: 0;

      &.show {
        animation: show-from-left var(--show-duration) ease;

        &:dir(rtl) {
          animation-name: show-from-right;
        }

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease;
        }
      }

      &.hide {
        animation: show-from-left var(--show-duration) ease reverse;

        &:dir(rtl) {
          animation-name: show-from-right;
        }

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease reverse;
        }
      }
    }

    /* End placement */
    &[data-placement='end'] {
      inset-inline-start: auto;
      inset-inline-end: 0;
      inset-block-start: 0;
      inset-block-end: 0;
      max-width: 100vw;
      max-height: none;
      height: 100vh;
      border-radius: 0;

      &.show {
        animation: show-from-right var(--show-duration) ease;

        &:dir(rtl) {
          animation-name: show-from-left;
        }

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease;
        }
      }

      &.hide {
        animation: show-from-right var(--show-duration) ease reverse;

        &:dir(rtl) {
          animation-name: show-from-left;
        }

        &::backdrop {
          animation: show-backdrop var(--show-duration, 200ms) ease reverse;
        }
      }
    }
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    background: var(--quiet-raised-background-color);
    gap: calc(var(--spacing) / 4);
    padding-inline-start: var(--spacing);
    padding-inline-end: calc(var(--spacing) / 2); /* less spacing to better align buttons as actions */
    padding-block-start: calc(var(--spacing) / 2);
    padding-block-end: calc(var(--spacing) / 2);
  }

  .actions {
    display: flex;
    margin-inline-start: auto;
  }

  /* Body */
  .body {
    flex: 1 1 auto;
    padding-inline: var(--spacing);
    padding-block: calc(var(--spacing) / 2);
    overflow: auto;

    @supports (animation-timeline: scroll(self block)) {
      & {
        animation: scroll-shadow linear;
        animation-timeline: scroll(self block);
      }
    }
  }

  /* Footer */
  .footer {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) / 4);
    justify-content: end;
    background: var(--quiet-raised-background-color);
    padding-inline: var(--spacing);
    padding-block: var(--spacing);
  }

  @keyframes scroll-shadow {
    from {
      box-shadow: inset 0 -4px 4px 0 rgb(0 0 0 / 7.5%);
    }
    to {
      box-shadow: inset 0 4px 4px 0 rgb(0 0 0 / 7.5%);
    }
  }

  @keyframes show-from-center {
    from {
      opacity: 0;
      scale: 0.9;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-from-top {
    from {
      opacity: 0;
      translate: 0 -75%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-from-bottom {
    from {
      opacity: 0;
      translate: 0 75%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-from-left {
    from {
      opacity: 0;
      translate: -75%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-from-right {
    from {
      opacity: 0;
      translate: 75%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: var(--pulse-size);
    }
    100% {
      scale: 1;
    }
  }

  @keyframes shake {
    0% {
      -webkit-transform: translateX(0);
    }
    10% {
      -webkit-transform: translateX(2%);
    }
    20% {
      -webkit-transform: translateX(-2%);
    }
    30% {
      -webkit-transform: translateX(2%);
    }
    40% {
      -webkit-transform: translateX(-2%);
    }
    50% {
      -webkit-transform: translateX(2%);
    }
    60% {
      -webkit-transform: translateX(0);
    }
  }
`;
