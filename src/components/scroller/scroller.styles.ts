import { css } from 'lit';

export default css`
  :host {
    --edge-color: var(--quiet-neutral-stroke-softer);
    --edge-width: var(--quiet-border-width);
    --shadow-color: var(--quiet-neutral-fill-mid);
    --shadow-opacity: 10%;
    --shadow-width: 0.5rem;

    display: block;
    position: relative;
    max-width: 100%;
  }

  #content {
    overflow-x: auto;
    border-radius: inherit;
    scroll-behavior: smooth;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-outline-offset);
    }
  }

  #scroll-left {
    position: absolute;
    top: calc(50% - var(--quiet-form-control-height-md) / 2);
    left: 0.5em;
  }

  #scroll-right {
    position: absolute;
    top: calc(50% - var(--quiet-form-control-height-md) / 2);
    right: 0.5em;
  }

  #start-shadow,
  #end-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--shadow-width);

    /* Add mask for top/bottom fade */
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      var(--shadow-color) 5%,
      var(--shadow-color) 95%,
      transparent 100%
    );
    pointer-events: none;
  }

  #start-shadow {
    &:dir(ltr) {
      left: 0;
      border-left: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--start-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to right,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--start-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }

    &:dir(rtl) {
      right: 0;
      border-right: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--start-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to left,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--start-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }
  }

  #end-shadow {
    &:dir(ltr) {
      right: 0;
      border-right: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--end-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to left,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--end-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }

    &:dir(rtl) {
      left: 0;
      border-left: solid var(--edge-width)
        color-mix(in oklab, var(--edge-color) calc(var(--end-shadow-opacity) * 100%), transparent);
      background: linear-gradient(
        to right,
        color-mix(
            in srgb,
            var(--shadow-color) calc(min(1, var(--end-shadow-opacity)) * var(--shadow-opacity)),
            transparent
          )
          0%,
        transparent 100%
      );
    }
  }
`;
