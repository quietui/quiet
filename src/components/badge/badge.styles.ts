import { css } from 'lit';

export default css`
  :host {
    --attention-duration: 1.5s;
    --attention-easing: ease;

    display: inline-flex;
    font-size: 0.75em;
    font-weight: calc(var(--quiet-base-font-weight) + 100);
    border-radius: 9999px;
    padding: 0.1em 0.7em;
  }

  :host([variant='primary']) {
    background-color: var(--quiet-primary-moderate);
    color: var(--quiet-primary-moderate-text);
  }

  :host([variant='secondary']) {
    background: var(--quiet-base-background-color);
    border: var(--quiet-base-border-style) var(--quiet-base-border-width) var(--quiet-neutral-border-subtle);
    color: var(--quiet-neutral-subtle-text);
  }

  :host([variant='destructive']) {
    background-color: var(--quiet-destructive-moderate);
    color: var(--quiet-destructive-moderate-text);
  }

  /* Pulse */
  :host([attention='pulse']) {
    animation: var(--attention-duration) infinite pulse var(--attention-easing);
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(1);
    }
  }

  /* Shake */
  :host([attention='shake']) {
    animation: var(--attention-duration) infinite shake var(--attention-easing);
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

  /* Wobble */
  :host([attention='wobble']) {
    animation: var(--attention-duration) infinite wobble var(--attention-easing);
  }

  @keyframes wobble {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(4deg);
    }
    50% {
      -webkit-transform: rotate(-4deg);
    }
    75% {
      -webkit-transform: rotate(0deg);
    }
  }
`;
