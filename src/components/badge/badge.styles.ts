import { css } from 'lit';

export default css`
  :host {
    --attention-duration: 1.5s;
    --attention-easing: ease;

    display: inline-flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    min-width: 2em;
    height: 2em;
    padding: 0 0.75em;
    gap: 0.33em;
    border-radius: 9999px;
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.75em;
  }

  /* Attention */
  :host([attention]) {
    animation: var(--attention-duration) tap infinite var(--attention-easing);
    /* Reduced motion */
  }

  @media (prefers-reduced-motion: reduce) {
    :host([attention]) {
      animation-name: pulse;
    }
  }

  /* Icons */
  ::slotted(quiet-icon) {
    scale: 1.25 !important;
  }

  /* Default */
  :host(:not([variant])),
  :host([variant='default']) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-primary-text-on-soft);
  }

  /* Primary */
  :host([variant='primary']) {
    background-color: var(--quiet-primary-fill-mid);
    color: var(--quiet-primary-text-on-mid);
  }

  /* Constructive */
  :host([variant='constructive']) {
    background-color: var(--quiet-constructive-fill-mid);
    color: var(--quiet-constructive-text-on-mid);
  }

  /* Destructive */
  :host([variant='destructive']) {
    background-color: var(--quiet-destructive-fill-mid);
    color: var(--quiet-destructive-text-on-mid);
  }

  /* Inverted */
  :host([variant='inverted']) {
    background-color: var(--quiet-neutral-fill-loud);
    color: var(--quiet-neutral-text-on-loud);
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.05);
    }
    75% {
      transform: scale(1);
    }
  }

  @keyframes tap {
    0% {
      transform: translateY(0);
    }
    15% {
      transform: translateY(-12px);
    }
    30% {
      transform: translateY(0);
    }
    45% {
      transform: translateY(-6px);
    }
    60% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
