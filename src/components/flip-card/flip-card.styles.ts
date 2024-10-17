import { css } from 'lit';

export default css`
  :host {
    --flip-duration: 0.5s;
    --spacing: 1.5em;

    display: flex;
    width: 100%;
  }

  #card {
    display: grid;
    position: relative;
    flex: 1 1 auto;
    transform-origin: center;
    transform-style: preserve-3d;
    border-radius: var(--quiet-border-radius);
    transition: var(--flip-duration) transform ease-in-out;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    &.horizontal.flipped {
      transform: rotateY(-180deg);
    }

    &.vertical.flipped {
      transform: rotateX(180deg);
    }

    &.vertical #back {
      transform: rotateX(-180deg);
    }
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
    cursor: pointer;
  }

  #front {
    transform: rotateY(0deg);
  }

  #back {
    transform: rotateY(-180deg);
  }

  ::slotted(*) {
    margin: var(--spacing);
  }

  /* We need a nested element to apply padding because both faces are grid items */
  .body {
    padding: var(--spacing);
  }
`;
