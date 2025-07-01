import { css } from 'lit';

export default css`
  :host {
    --border-radius: var(--quiet-border-radius-lg);
    --thumb-width: 4em;
    --thumb-inset: 0.125em;
    --shimmer-color: color-mix(in oklab, var(--quiet-strident) 12.5%, transparent) 50%;

    display: flex;
    position: relative;
    width: 100%;
    min-width: calc(var(--thumb-width) * 3); /* three thumb widths to ensure space for a small label */
    height: 3em;
    border-radius: var(--border-radius);
    background: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
    transition:
      250ms background-color,
      250ms color;
    user-select: none;
  }

  /* Disabled */
  :host(:state(disabled)) {
    cursor: not-allowed;
    opacity: 0.5;

    #thumb {
      cursor: inherit;
    }
  }

  /* Activated */
  :host(:state(activated)) {
    background-color: var(--quiet-primary-fill-mid);
    color: var(--quiet-primary-text-on-mid);
    animation: activated 0.3s ease-out;
  }

  /* Focus */
  :host:has(:focus-visible) {
    outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
    outline-offset: var(--quiet-border-width);
  }

  /* Label */
  #label {
    display: flex;
    position: relative;
    position: relative;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
    border-radius: inherit;

    quiet-icon,
    ::slotted(quiet-icon) {
      font-size: 1.25em;
    }
  }

  /* Shimmer */
  :host(:not(:state(disabled), :state(activated))) #label.shimmer::before {
    position: absolute;
    top: 0;
    left: 0;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent 0%, var(--shimmer-color), transparent 100%);
    content: '';
    animation: shimmer 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  :host(:not(:state(disabled))) #label.shimmer.rtl::before {
    animation-direction: reverse;
  }

  /* Thumb */
  #thumb {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: var(--thumb-width);
    height: calc(100% - var(--thumb-inset) * 2);
    inset: var(--thumb-inset);
    left: calc(
      clamp(
        var(--thumb-inset),
        calc((100% - var(--thumb-width)) * var(--thumb-position) + var(--thumb-inset)),
        calc(100% - var(--thumb-width) - var(--thumb-inset))
      )
    );
    border-radius: calc(var(--border-radius) - var(--thumb-inset));
    background-color: var(--quiet-primary-text-on-mid); /* always white, same as checkbox icons */
    color: black;
    cursor: grab;
    touch-action: none;
    transition: left 0.3s ease-out;

    &.rtl {
      right: calc(
        clamp(
          var(--thumb-inset),
          calc((100% - var(--thumb-width)) * var(--thumb-position) + var(--thumb-inset)),
          calc(100% - var(--thumb-width) - var(--thumb-inset))
        )
      );
      left: auto;
      transition: right 0.3s ease-out;
    }

    &:active {
      cursor: grabbing;
    }

    &:focus {
      outline: none;
    }

    &.activated {
      cursor: not-allowed;
    }

    &.dragging {
      transition: none;
    }

    &.pressing:not(.is-press-stale) {
      left: calc(
        clamp(
          var(--thumb-inset),
          calc((100% - var(--thumb-width)) * 1 + var(--thumb-inset)),
          calc(100% - var(--thumb-width) - var(--thumb-inset))
        )
      );
      transition-duration: 1s;
      transition-timing-function: linear;

      &.rtl {
        right: calc(
          clamp(
            var(--thumb-inset),
            calc((100% - var(--thumb-width)) * 1 + var(--thumb-inset)),
            calc(100% - var(--thumb-width) - var(--thumb-inset))
          )
        );
      }
    }

    quiet-icon,
    ::slotted(quiet-icon) {
      font-size: 1.25em;
    }

    &.activated quiet-icon[name='chevrons-right'] {
      display: none;
    }

    &:not(.activated) quiet-icon[name='check'] {
      display: none;
    }

    &.rtl quiet-icon[name='chevrons-right'] {
      scale: -1;
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes activated {
    0% {
      scale: 1;
      opacity: 1;
    }
    25% {
      scale: 1.015;
      opacity: 0.9;
    }
    50% {
      scale: 1.02;
      opacity: 0.8;
    }
    75% {
      scale: 1.015;
      opacity: 0.9;
    }
    100% {
      scale: 1;
      opacity: 1;
    }
  }
`;
