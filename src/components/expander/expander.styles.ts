import { css } from 'lit';

export default css`
  :host {
    --height: 3lh;
    --animation-duration: 300ms;
    --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
    --target-height: auto;
    --start-height: auto;

    display: block;
    position: relative;
  }

  #content {
    overflow: visible;
  }

  #content.expand {
    animation: expand var(--animation-duration) var(--animation-easing) forwards;
  }

  #content.collapse {
    animation: collapse var(--animation-duration) var(--animation-easing) forwards;
  }

  @keyframes expand {
    from {
      height: var(--start-height);
      overflow: hidden;
    }
    to {
      height: var(--target-height);
      overflow: hidden;
    }
  }

  @keyframes collapse {
    from {
      height: var(--start-height);
      overflow: hidden;
    }
    to {
      height: var(--target-height);
      overflow: hidden;
    }
  }

  #toggle {
    display: block;
    width: max-content;
    padding: 0.5rem 0;
    border: none;
    border-radius: var(--quiet-border-radius);
    background: none;
    color: var(--quiet-primary-text-colorful);
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }
`;
