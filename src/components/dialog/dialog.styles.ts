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
    border-radius: var(--quiet-base-border-radius);
    background: var(--quiet-base-background-color);
    box-shadow: var(--quiet-shadow-loud);
    padding: 0;

    &::backdrop {
      background-color: rgb(0 0 0 / 33%); /* can't be a custom property due to Safari not inheriting yet */
      backdrop-filter: var(--quiet-overlay-backdrop-filter);
      -webkit-backdrop-filter: var(--quiet-overlay-backdrop-filter);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-base-focus-ring);
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
      max-width: calc(100vw - var(--quiet-base-content-spacing));
      max-height: calc(100vh - var(--quiet-base-content-spacing));

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

  /*
    NOTE: We use a fallback for backdrops because because Safari < 17.4 doesn't let them inherit custom properties from
    <dialog> due to the way the spec was originally written. Also note that, at the time of this writing, Firefox
    doesn't support animating backdrops.
  */

  /* Header */
  .header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    background: var(--quiet-base-background-color);
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
    padding-block: var(--spacing);
  }

  /* Footer */
  .footer {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) / 4);
    justify-content: end;
    background: var(--quiet-base-background-color);
    padding-inline: var(--spacing);
    padding-block-start: calc(var(--spacing) / 2);
    padding-block-end: var(--spacing);
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
