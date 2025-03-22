import { css } from 'lit';

export default css`
  :host {
    --animation-speed: 300ms;
    --checked-color: #f59e0b;
    --unchecked-color: var(--quiet-neutral-fill-mid);

    display: inline-flex;
  }

  button {
    /* Make button a grid container */
    display: grid;
    appearance: none;
    position: relative;
    grid-template-areas: 'icon';
    align-items: center;
    justify-items: center;
    width: 100%;
    padding: 0.25em;
    overflow: hidden;
    border: none;
    border-radius: calc(var(--quiet-border-radius) / 2);
    background: none;
    font: inherit;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
    cursor: pointer;
    touch-action: manipulation;
    transition:
      100ms color ease,
      100ms border-color ease,
      100ms background-color ease,
      100ms translate ease,
      var(--animation-speed) opacity ease,
      var(--animation-speed) transform ease;
    user-select: none;
    -webkit-user-select: none;

    @media (prefers-reduced-motion) {
      --animation-speed: 0;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    /* Sizes */
    &.xs {
      font-size: calc(var(--quiet-form-control-font-size-xs) * 1.25);
    }

    &.sm {
      font-size: calc(var(--quiet-form-control-font-size-sm) * 1.25);
    }

    &.md {
      font-size: calc(var(--quiet-form-control-font-size-md) * 1.25);
    }

    &.lg {
      font-size: calc(var(--quiet-form-control-font-size-lg) * 1.25);
    }

    &.xl {
      font-size: calc(var(--quiet-form-control-font-size-xl) * 1.25);
    }
  }

  /* Both slots are positioned in the same grid area to ensure overlap */
  .checked-icon,
  .unchecked-icon {
    display: grid;
    grid-area: icon;
    place-items: center;
    width: 100%;
    height: 100%;
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  /* Untoggled state */
  .unchecked-icon {
    transform: scale(1);
    color: var(--unchecked-color);
    opacity: 1;
  }

  .checked-icon {
    transform: scale(0.8);
    color: var(--checked-color);
    opacity: 0;
  }

  /* Toggled state */
  .checked .checked-icon {
    transform: scale(1);
    opacity: 1;
  }

  .checked .unchecked-icon {
    transform: scale(0.8);
    opacity: 0;
  }

  /* Disabled */
  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Fade animation */
  button[data-effect='fade'] {
    .checked-icon,
    .unchecked-icon {
      transform: scale(1);
      transition: opacity var(--animation-speed) ease;
    }
  }

  /* Flip X animation */
  button[data-effect='flip-x'] {
    .checked-icon,
    .unchecked-icon {
      backface-visibility: hidden; /* Hide the back face during animation */
      transition:
        opacity var(--animation-speed) ease,
        transform var(--animation-speed) ease;
    }

    .unchecked-icon {
      transform: rotateY(0deg);
    }

    &:dir(ltr) .checked-icon {
      transform: rotateY(180deg);
      opacity: 0;
    }

    &:dir(rtl) .checked-icon {
      transform: rotateY(-180deg);
      opacity: 0;
    }

    &:dir(ltr).checked .unchecked-icon {
      transform: rotateY(-180deg);
      opacity: 0;
      transition:
        opacity calc(var(--animation-speed) * 0.6) ease,
        transform var(--animation-speed) ease;
    }

    &:dir(rtl).checked .unchecked-icon {
      transform: rotateY(180deg);
      opacity: 0;
      transition:
        opacity calc(var(--animation-speed) * 0.6) ease,
        transform var(--animation-speed) ease;
    }

    &.checked .checked-icon {
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  /* Flip Y animation */
  button[data-effect='flip-y'] {
    .checked-icon,
    .unchecked-icon {
      backface-visibility: hidden; /* Hide the back face during animation */
      transition:
        opacity var(--animation-speed) ease,
        transform var(--animation-speed) ease;
    }

    .unchecked-icon {
      transform: rotateX(0deg);
    }

    .checked-icon {
      transform: rotateX(180deg);
      opacity: 0;
    }

    &.checked .unchecked-icon {
      transform: rotateX(-180deg);
      opacity: 0;
      /* Add a slightly faster opacity transition to hide it more quickly */
      transition:
        opacity calc(var(--animation-speed) * 0.6) ease,
        transform var(--animation-speed) ease;
    }

    &.checked .checked-icon {
      transform: rotateX(0deg);
      opacity: 1;
    }
  }

  /* Translate X animation */
  button[data-effect='translate-x'] {
    .checked-icon,
    .unchecked-icon {
      transition:
        opacity var(--animation-speed) ease,
        transform var(--animation-speed) ease;
    }

    .unchecked-icon {
      transform: translateX(0);
    }

    &:dir(ltr) .checked-icon {
      transform: translateX(-20px);
    }

    &:dir(rtl) .checked-icon {
      transform: translateX(20px);
    }

    &:dir(ltr).checked .unchecked-icon {
      transform: translateX(20px);
    }

    &:dir(rtl).checked .unchecked-icon {
      transform: translateX(-20px);
    }

    &.checked .checked-icon {
      transform: translateX(0);
    }
  }

  /* Translate Y animation */
  button[data-effect='translate-y'] {
    .checked-icon,
    .unchecked-icon {
      transition:
        opacity var(--animation-speed) ease,
        transform var(--animation-speed) ease;
    }

    .unchecked-icon {
      transform: translateY(0);
    }

    .checked-icon {
      transform: translateY(-20px);
    }

    &.checked .unchecked-icon {
      transform: translateY(20px);
    }

    &.checked .checked-icon {
      transform: translateY(0);
    }
  }

  /* Scale animation */
  button[data-effect='scale'] {
    .checked-icon,
    .unchecked-icon {
      transition:
        opacity var(--animation-speed) ease,
        transform var(--animation-speed) cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .unchecked-icon {
      transform: scale(1);
    }

    .checked-icon {
      transform: scale(0);
    }

    &.checked .unchecked-icon {
      transform: scale(0);
    }

    &.checked .checked-icon {
      transform: scale(1);
    }
  }
`;
