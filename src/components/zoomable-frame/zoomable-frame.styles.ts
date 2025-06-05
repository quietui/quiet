import { css } from 'lit';

export default css`
  :host {
    display: block;
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
    border-radius: var(--quiet-border-radius);
  }

  #frame-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% / var(--zoom));
    height: calc(100% / var(--zoom));
    transform: scale(var(--zoom));
    transform-origin: 0 0;
  }

  #iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    /* Prevent the iframe from being selected, e.g. by a double click. Doesn't affect selection withing the iframe. */
    user-select: none;
    -webkit-user-select: none;
  }

  #controls {
    display: flex;
    position: absolute;
    bottom: 0.5em;
    align-items: center;
    padding: 0.25em 0.5em;
    gap: 0.5em;
    border-radius: 0.375em;
    background: #000b;
    color: white;
    font-size: min(12px, 0.75em);
    user-select: none;
    -webkit-user-select: none;

    &:dir(ltr) {
      right: 0.5em;
    }

    &:dir(rtl) {
      left: 0.5em;
    }

    button {
      display: flex;
      align-items: center;
      padding: 0.25em;
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;

      &:active:not(:disabled) {
        translate: 0 var(--quiet-button-active-offset);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--quiet-focus-ring);
        outline-offset: calc(var(--quiet-border-width) * -1);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    quiet-icon,
    ::slotted(quiet-icon) {
      font-size: 1.25em;
    }

    span {
      min-width: 4.5ch; /* extra space so numbers don't shift */
      font-variant-numeric: tabular-nums;
      text-align: center;
    }
  }
`;
