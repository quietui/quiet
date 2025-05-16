import { css } from 'lit';

export default css`
  #visual-box.xs,
  #visual-box.sm,
  #visual-box.md,
  #visual-box.lg,
  #visual-box.xl {
    padding: 0;
    gap: 0;
  }

  /* Pills */
  #visual-box.pill {
    border-radius: 9999px;
  }

  #text-box {
    /* Hide the number spinners in Firefox*/
    -moz-appearance: textfield;
    flex: 1 1 auto;
    font-variant-numeric: tabular-nums;
    text-align: center;
  }

  /* Hide the number spinners in Chrome/Safari */
  #text-box::-webkit-inner-spin-button,
  #text-box::-webkit-outer-spin-button {
    display: none;
  }

  #stepper-up,
  #stepper-down {
    display: flex;
    top: 0;
    bottom: 0;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    margin: 0;
    padding: 0 0.75em;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 1.25em;
    cursor: pointer;
    transition: 100ms translate ease;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-border-width);
    }

    &:active:not(:disabled) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
