import { css } from 'lit';

export default css`
  :host {
    --flip-duration: 0.6s;
    --flip-easing: cubic-bezier(0.4, 0, 0.2, 1);

    display: grid;
    position: relative;
    width: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: var(--flip-duration) transform var(--flip-easing);
  }

  :host([orientation='horizontal'][flipped]) {
    transform: rotateY(-180deg);
  }

  :host([orientation='vertical'][flipped]) {
    transform: rotateX(180deg);
  }

  #front,
  #back {
    grid-row: 1/2;
    grid-column: 1/2;
    overflow: hidden;
    border-radius: inherit;
    backface-visibility: hidden;
  }

  #front {
    transform: rotateY(0deg);
  }

  #back {
    transform: rotateY(-180deg);
  }

  :host([orientation='vertical']) #back {
    transform: rotateX(-180deg);
  }

  ::slotted(*) {
    height: 100%;
  }
`;
