import { css } from 'lit';

export default css`
  :host {
    --width: 30rem;
    --height: fit-content;
    --show-duration: 150ms;
    --spacing: 1.5em;

    display: none;
  }

  :host(:state(open)) {
    display: block;
  }

  #dialog {
    display: flex;
    position: fixed;
    flex-direction: column;
    width: var(--width);
    height: var(--height);
    inset-block-end: 0;
    inset-block-start: 0;
    padding: 0;
    border: none;
    border-radius: var(--quiet-border-radius-md);
    background: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-loud);

    &::backdrop {
      backdrop-filter: var(--quiet-backdrop-filter);
      -webkit-backdrop-filter: var(--quiet-backdrop-filter, blur(6px));
      /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
      background-color: var(--quiet-backdrop-color, rgb(0 0 0 / 0.25));
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
      max-width: calc(100dvw - 2rem);
      max-height: calc(100dvh - 2rem);

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
      width: 100dvw;
      max-width: 100dvw;
      max-height: 100dvh;
      inset-block-end: auto;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-inline-start: 0;
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
      width: 100dvw;
      max-width: 100dvw;
      max-height: 100dvh;
      inset-block-end: 0;
      inset-block-start: auto;
      inset-inline-end: 0;
      inset-inline-start: 0;
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
      max-width: 100dvw;
      height: 100dvh;
      max-height: none;
      inset-block-end: 0;
      inset-block-start: 0;
      inset-inline-end: auto;
      inset-inline-start: 0;
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
      max-width: 100dvw;
      height: 100dvh;
      max-height: none;
      inset-block-end: 0;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-inline-start: auto;
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

    /* Full placement */
    &[data-placement='full'] {
      width: 100dvw;
      max-width: 100dvw;
      height: 100dvh;
      max-height: 100dvh;
      inset: 0;
      border-radius: 0;

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
  }

  /* Header */
  #header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-inline-start: var(--spacing);
    padding-inline-end: calc(var(--spacing) / 2); /* less spacing to better align buttons as actions */
    padding-block-start: calc(var(--spacing) / 2);
    padding-block-end: calc(var(--spacing) / 2);
    gap: calc(var(--spacing) / 4);
    background: var(--quiet-paper-color);
  }

  #actions {
    display: flex;
    flex-wrap: wrap;
    margin-inline-start: auto;
  }

  /* Body */
  #body {
    flex: 1 1 auto;
    padding-inline: var(--spacing);
    padding-block: calc(var(--spacing) / 2);
    overflow: auto;
    scrollbar-color: var(--quiet-neutral-fill-mid) transparent;
    scrollbar-width: thin;
  }

  /* Normalize spacing when the header and footer are absent */
  #dialog:not(.has-header) #body {
    padding-block-start: var(--spacing);
  }

  #dialog:not(.has-footer) #body {
    padding-block-end: var(--spacing);
  }

  /* Footer */
  #footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: end;
    padding-inline: var(--spacing);
    padding-block: var(--spacing);
    gap: calc(var(--spacing) / 4);
    background: var(--quiet-paper-color);
  }

  @keyframes show-from-center {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }

  @keyframes show-from-top {
    from {
      translate: 0 -75%;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
    }
  }

  @keyframes show-from-bottom {
    from {
      translate: 0 75%;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
    }
  }

  @keyframes show-from-left {
    from {
      translate: -75%;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
    }
  }

  @keyframes show-from-right {
    from {
      translate: 75%;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
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
