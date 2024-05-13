import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    white-space: normal;
  }

  .feedback {
    --translate-y-start: -0.25rem;
    --translate-y-end: -0.75rem;
    position: absolute;
    width: fit-content;
    top: 0;
    left: 0;
    background-color: var(--quiet-neutral-fill-louder);
    border-radius: var(--quiet-border-radius);
    color: var(--quiet-neutral-text-on-loud);
    font-size: 0.75rem;
    font-weight: var(--quiet-font-weight-semibold);
    text-align: center;
    text-transform: uppercase;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    translate: 0 -100%;
    z-index: 9999;

    &.show {
      animation: show 1s ease;
    }
  }

  :host([feedback-placement='bottom']) .feedback {
    --translate-y-start: 0.25rem;
    --translate-y-end: 0.75rem;
    top: 100%;
    translate: 0 0;
  }

  @keyframes show {
    0% {
      transform: translateY(var(--translate-y-start));
      opacity: 0;
      scale: 0.95;
    }

    20% {
      transform: translateY(var(--translate-y-end));
      opacity: 1;
      scale: 1;
    }

    80% {
      transform: translateY(var(--translate-y-start));
      opacity: 1;
      scale: 1;
    }

    100% {
      opacity: 0;
      scale: 0.95;
    }
  }
`;
