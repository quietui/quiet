import { css } from 'lit';

export default css`
  :host {
    --width: 30rem;
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
    width: auto;
    max-width: min(var(--width), calc(100vw - var(--quiet-base-content-spacing)));
    max-height: calc(100vh - var(--quiet-base-content-spacing));
    border: none;
    border-radius: var(--quiet-base-border-radius);
    background: var(--quiet-base-background-color);
    box-shadow: var(--quiet-shadow-loud);
    padding: 0;

    &::backdrop {
      background-color: rgb(0 0 0 / 33%); /* can't be a custom property due to Safari not inheriting yet */
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-base-focus-ring);
    }
  }

  /*
    NOTE: We use a fallback for backdrops because because Safari < 17.4 doesn't let them inherit custom properties from
    <dialog> due to the way the spec was originally written. Also note that, at the time of this writing, Firefox
    doesn't support animating backdrops.
  */
  dialog.show {
    animation: show-dialog var(--show-duration) ease;
  }

  dialog.show::backdrop {
    animation: show-backdrop var(--show-duration, 200ms) ease;
  }

  dialog.hide {
    animation: show-dialog var(--show-duration) ease reverse;
  }

  dialog.hide::backdrop {
    animation: show-backdrop var(--show-duration, 200ms) ease reverse;
  }

  dialog.shake {
    animation: shake 1000ms ease;
  }

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

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.9;
    }
    to {
      opacity: 1;
      scale: 1;
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
