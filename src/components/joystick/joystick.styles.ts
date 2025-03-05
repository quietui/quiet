import { css } from 'lit';

export default css`
  :host {
    --size: 7rem;
    --thumb-size: 2.5rem;

    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    width: var(--size);
    height: var(--size);
    overflow: hidden;
    background: var(--quiet-neutral-fill-softer);
    box-shadow: var(--quiet-inset-shadow-soft);
    cursor: grab;
    touch-action: none;
  }

  :host(:active) {
    cursor: grabbing;
  }

  :host([shape='round']) {
    border-radius: 50%;
  }

  :host([shape='square']) {
    border-radius: 0.5rem;
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
  }

  #thumb {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--quiet-neutral-fill-mid);
    transition: transform 75ms ease-out;
    will-change: transform;
  }

  :host([shape='round']) #thumb {
    border-radius: 50%;
  }

  :host([shape='square']) #thumb {
    border-radius: 0.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    #thumb {
      transition: none;
    }
  }
`;
