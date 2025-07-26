import { css } from 'lit';

export default css`
  :host {
    --dot-size: 0.125em;
    --line-width: 0.0625em;
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
    vertical-align: middle;
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
    height: round(var(--line-width), 1px);
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

  :host(:state(expanded)) .lines.hamburger .top {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  :host(:state(expanded)) .lines.hamburger .middle {
    transform: translateY(-50%) scale(0);
    opacity: 0;
  }

  :host(:state(expanded)) .lines.hamburger .bottom {
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

  :host(:state(expanded)) .lines.equals .top {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  :host(:state(expanded)) .lines.equals .bottom {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  /* Vertical dots symbol (3 dots arranged vertically) */
  .dots.vertical-dots {
    .top {
      position: absolute;
      top: 18%;
      left: 50%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translateX(-50%); /* Center horizontally */
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }

    .middle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }

    .bottom {
      position: absolute;
      bottom: 18%;
      left: 50%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translateX(-50%); /* Center horizontally */
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }
  }

  /* Expanded state: vertical dots transform into X */
  :host(:state(expanded)) .dots.vertical-dots .top {
    top: 50%;
    width: 62.5%;
    height: round(var(--line-width), 1px);
    transform: translate(-50%, -50%) rotate(45deg); /* Maintain centering with rotation */
    border-radius: var(--quiet-border-radius-pill);
  }

  :host(:state(expanded)) .dots.vertical-dots .middle {
    transform: translate(-50%, -50%) scale(0); /* Maintain centering while scaling */
    opacity: 0;
  }

  :host(:state(expanded)) .dots.vertical-dots .bottom {
    bottom: 50%;
    width: 62.5%;
    height: round(var(--line-width), 1px);
    transform: translate(-50%, 50%) rotate(-45deg); /* Maintain centering with rotation */
    border-radius: var(--quiet-border-radius-pill);
  }

  /* Horizontal dots symbol (3 dots arranged horizontally) */
  .dots.horizontal-dots {
    .top {
      position: absolute;
      top: 50%;
      left: 18%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translateY(-50%); /* Center vertically */
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }

    .middle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }

    .bottom {
      position: absolute;
      top: 50%;
      right: 18%;
      width: round(var(--dot-size), 1px);
      height: round(var(--dot-size), 1px);
      transform: translateY(-50%); /* Center vertically */
      border-radius: 50%;
      background-color: currentColor;
      transition: all var(--line-transition-duration) var(--line-transition-easing);
    }
  }

  /* Expanded state: horizontal dots transform into X */
  :host(:state(expanded)) .dots.horizontal-dots .top {
    top: 50%;
    left: 50%;
    width: 62.5%;
    height: round(var(--line-width), 1px);
    transform: translate(-50%, -50%) rotate(45deg); /* Maintain centering with rotation */
    border-radius: var(--quiet-border-radius-pill);
  }

  :host(:state(expanded)) .dots.horizontal-dots .middle {
    transform: translate(-50%, -50%) scale(0); /* Maintain centering while scaling */
    opacity: 0;
  }

  :host(:state(expanded)) .dots.horizontal-dots .bottom {
    top: 50%;
    right: 50%;
    width: 62.5%;
    height: round(var(--line-width), 1px);
    transform: translate(50%, -50%) rotate(-45deg); /* Maintain centering with rotation */
    border-radius: var(--quiet-border-radius-pill);
  }
`;
