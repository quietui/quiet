import { css } from 'lit';

export default css`
  :host {
    --attention-duration: 1.5s;
    --attention-easing: ease;

    display: inline-flex;
    position: relative;
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

  /* Icons */
  ::slotted(quiet-icon) {
    scale: 1.25 !important;
  }

  /* Normal badges */
  :host([appearance='normal'][variant='neutral']) {
    background-color: var(--quiet-neutral-fill-softer);
    color: var(--quiet-primary-text-on-soft);
  }

  :host([appearance='normal'][variant='primary']) {
    background-color: var(--quiet-primary-fill-mid);
    color: var(--quiet-primary-text-on-mid);
  }

  :host([appearance='normal'][variant='constructive']) {
    background-color: var(--quiet-constructive-fill-mid);
    color: var(--quiet-constructive-text-on-mid);
  }

  :host([appearance='normal'][variant='destructive']) {
    background-color: var(--quiet-destructive-fill-mid);
    color: var(--quiet-destructive-text-on-mid);
  }

  /* Outline badges */
  :host([appearance='outline']) {
    border: 1px solid;
    background-color: transparent;
  }

  :host([appearance='outline'][variant='neutral']) {
    border-color: var(--quiet-neutral-stroke-loud);
    color: var(--quiet-neutral-text-colorful);
  }

  :host([appearance='outline'][variant='primary']) {
    border-color: var(--quiet-primary-stroke-loud);
    color: var(--quiet-primary-text-colorful);
  }

  :host([appearance='outline'][variant='constructive']) {
    border-color: var(--quiet-constructive-stroke-loud);
    color: var(--quiet-constructive-text-colorful);
  }

  :host([appearance='outline'][variant='destructive']) {
    border-color: var(--quiet-destructive-stroke-loud);
    color: var(--quiet-destructive-text-colorful);
  }

  /* Attention */
  :host([attention]) {
    animation: var(--attention-duration) infinite var(--attention-easing);
  }

  :host([attention='tap']) {
    animation-name: tap;
  }

  :host([attention='shake']) {
    animation-name: shake;
  }

  :host([attention='sparkle']) {
    animation-name: sparkle;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    :host([attention]) {
      animation-name: reduced-attention;
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

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50% {
      transform: translateX(-2px);
    }
    20%,
    40%,
    60% {
      transform: translateX(2px);
    }
    70% {
      transform: translateX(0);
    }
    /* Pause for remainder of cycle */
    70.01%,
    100% {
      transform: translateX(0);
    }
  }

  @keyframes sparkle {
    0%,
    100% {
      transform: scale(1);
    }
    15% {
      transform: scale(1.1) rotate(5deg);
    }
    30% {
      transform: scale(1) rotate(0deg);
    }
    45% {
      transform: scale(1.05) rotate(-3deg);
    }
    60% {
      transform: scale(1);
    }
    /* Pause for remainder of cycle */
    60.01%,
    100% {
      transform: scale(1);
    }
  }

  @keyframes reduced-attention {
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
`;
