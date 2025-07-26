import { css } from 'lit';

export default css`
  :host {
    --line-width: 2px; /* px value to keep the lines crisp */
    --line-transition-duration: 200ms;
    --line-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    padding: 0;
    border: none;
    border-radius: var(--quiet-border-radius-md);
    background: none;
    color: inherit;
    font-size: 1.75rem; /* intentionally use rem to set an opinionated default size */
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Faster but not instant when reduced motion is enabled */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --line-transition-duration: 100ms;
    }
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Lines container */
  .lines {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Ensure clicks pass through to host */
  }

  /* Individual lines */
  .line {
    display: block;
    position: absolute;
    width: 62.5%;
    height: var(--line-width);
    transform-origin: center;
    border-radius: var(--quiet-border-radius-pill);
    background-color: currentColor;
    transition: all var(--line-transition-duration) var(--line-transition-easing);
  }

  /* Hamburger symbol (3 lines) */
  .lines.hamburger {
    .top {
      top: 25%;
    }

    .middle {
      top: 50%;
      transform: translateY(-50%);
    }

    .bottom {
      bottom: 25%;
    }
  }

  :host(:state(activated)) .lines.hamburger .top {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  :host(:state(activated)) .lines.hamburger .middle {
    transform: translateY(-50%) scale(0);
    opacity: 0;
  }

  :host(:state(activated)) .lines.hamburger .bottom {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  /* Equals symbol (2 lines) */
  .lines.equals {
    .top {
      top: 35%;
    }

    .bottom {
      bottom: 35%;
    }
  }

  :host(:state(activated)) .lines.equals .top {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  :host(:state(activated)) .lines.equals .bottom {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }
`;
