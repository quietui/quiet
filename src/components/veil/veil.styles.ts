// veil.styles.ts
import { css } from 'lit';

export default css`
  :host {
    --show-duration: 300ms;
    --blur: 3px;

    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--quiet-border-radius);
    isolation: isolate;
  }

  /* Front */
  #front {
    display: flex;
    z-index: 1;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    inset: 0;
    padding: 2em;
    border-radius: inherit;
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    background-color: color-mix(in oklab, var(--quiet-neutral-fill-softer), transparent 50%);

    quiet-spinner,
    ::slotted(quiet-spinner) {
      font-size: 2rem;
    }

    /* Show animation */
    &.show {
      animation: veil-show var(--show-duration) ease-out;
    }

    /* Hide animation */
    &.hide {
      animation: veil-hide var(--show-duration) ease-out;
    }
  }

  /* Hidden state */
  :host(:not(:state(active))) #front {
    display: none;
  }

  /* Keyframe animations */
  @keyframes veil-show {
    from {
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      opacity: 0;
    }
    to {
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      opacity: 1;
    }
  }

  @keyframes veil-hide {
    from {
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      opacity: 1;
    }
    to {
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      opacity: 0;
    }
  }
`;
