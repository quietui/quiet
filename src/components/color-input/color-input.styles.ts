import { css } from 'lit';

export default css`
  #color-preview {
    flex: 0 0 auto;
    width: 1.75em;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: inset 0 0 0 0.0625em color-mix(in oklab, black, transparent 85%);
    pointer-events: none;
  }

  /* Utilities */
  .transparent-bg {
    --size: 0.5em;
    display: flex;
    background: var(--quiet-silent);
    background-size: var(--size) var(--size);
    background-position:
      0 0,
      0 0,
      calc(var(--size) / -2) calc(var(--size) / -2),
      calc(var(--size) / 2) calc(var(--size) / 2);
    background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
      linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
  }

  quiet-slider {
    --track-size: 1rem;
    --thumb-width: 1em;
    --thumb-height: 1em;

    /* Visually hidden */
    &::part(label),
    &::part(description) {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      white-space: nowrap;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
    }

    &::part(track) {
      box-shadow: inset 0 0 0 0.0625em color-mix(in oklab, black, transparent 90%);
    }

    &::part(thumb) {
      border: solid 0.0625em rgb(0 0 0 / 25%);
      transition: 100ms scale ease;
    }

    &:state(focused)::part(thumb),
    &:state(dragging)::part(thumb) {
      scale: 1.25;
    }

    &::part(thumb)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      border: solid 0.1875em white;
      box-shadow: inset 0 0 0 0.0625em rgb(0 0 0 / 25%);
    }
  }

  #hue {
    &::part(track) {
      background-image: linear-gradient(
        to right,
        rgb(255, 0, 0) 0%,
        rgb(255, 255, 0) 17%,
        rgb(0, 255, 0) 33%,
        rgb(0, 255, 255) 50%,
        rgb(0, 0, 255) 67%,
        rgb(255, 0, 255) 83%,
        rgb(255, 0, 0) 100%
      );
    }

    &::part(indicator) {
      display: none;
    }

    &::part(thumb) {
      background-color: var(--hue);
    }
  }

  #opacity {
    &::part(track) {
      background: var(--quiet-silent);
      background-size: 1em 1em;
      background-position:
        0 0,
        0 0,
        -0.5em -0.5em,
        0.5em 0.5em;
      background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
    }

    &::part(indicator) {
      width: 100% !important;
      background-color: transparent;
      background-image: linear-gradient(to right, #0000 0%, #000f 100%);
    }

    &::part(thumb) {
      background-color: color-mix(in oklab, white, black var(--opacity));
    }
  }
`;
