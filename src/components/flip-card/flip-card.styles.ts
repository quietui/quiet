import { css } from 'lit';

export default css`
  :host {
    --flip-duration: 0.5s;
    --spacing: 1.5em;

    display: grid;
    position: relative;
    width: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    border-radius: var(--quiet-border-radius);
    transition: var(--flip-duration) transform ease-in-out;
  }

  :host([direction='horizontal'][flipped]) {
    transform: rotateY(-180deg);
  }

  :host([direction='vertical'][flipped]) {
    transform: rotateX(180deg);
  }

  #front,
  #back {
    grid-row: 1/2;
    grid-column: 1/2;
    overflow: hidden;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: inherit;
    backface-visibility: hidden;
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
  }

  #front {
    transform: rotateY(0deg);
  }

  #back {
    transform: rotateY(-180deg);
  }

  :host([direction='vertical']) #back {
    transform: rotateX(-180deg);
  }

  ::slotted(*) {
    margin: var(--spacing);
  }
`;
