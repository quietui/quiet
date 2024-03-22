import { css } from 'lit';

export default css`
  :host {
    --attention-duration: 1.5s;
    --attention-easing: ease;

    display: inline-flex;
    font-size: 0.75em;
    font-weight: var(--quiet-font-weight-semibold);
    border-radius: 9999px;
    padding: 0.1em 0.7em;
  }

  /* Primary */
  :host([variant='primary']) {
    background-color: var(--quiet-primary-fill-moderate);
    color: var(--quiet-primary-fill-text-moderate);
  }

  /* Secondary */
  :host([variant='secondary']) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-primary-fill-text-softer);
  }

  /* Constructive */
  :host([variant='constructive']) {
    background-color: var(--quiet-constructive-fill-moderate);
    color: var(--quiet-constructive-fill-text-moderate);
  }

  /* Destructive */
  :host([variant='destructive']) {
    background-color: var(--quiet-destructive-fill-moderate);
    color: var(--quiet-destructive-fill-text-moderate);
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
