import { css } from 'lit';

export default css`
  :host {
    --flip-duration: 0.6s;
    --flip-easing: ease;

    display: grid;
    position: relative;
    width: 100%;
    perspective: 1500px; /* Increased perspective for more dramatic effect */

    /* Make the transition smoother in Chrome when the card's height changes and then gets flipped */
    will-change: contents;
  }

  /* Normal motion */
  :host([data-can-transition]) {
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

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --flip-duration: 0.125s !important;
      --flip-easing: linear !important;
    }
  }

  #front,
  #back {
    grid-row: 1/2;
    grid-column: 1/2;
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
