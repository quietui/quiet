import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    perspective: 1000px;
  }

  .card {
    position: relative;
    width: 200px;
    height: 300px;
    transform-style: preserve-3d;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
    cursor: pointer;
    transition: transform 0.6s;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .face {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .front {
    z-index: 2;
  }

  .back {
    transform: rotateY(180deg);
  }
`;
