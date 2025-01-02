import { css } from 'lit';

export default css`
  :host {
    display: grid;
    position: relative;
    grid-template-areas: 'overlap';
    flex: 1 1 auto;
    width: 100%;
    height: 3em;
    padding: 0.125em;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--quiet-neutral-fill-soft);
    isolation: isolate;
    color: var(--quiet-neutral-text-on-soft);
    user-select: none;
  }

  :host(:state(complete)) {
    animation: complete 0.3s ease-out;
  }

  #thumb,
  #label {
    grid-area: overlap;
  }

  #thumb {
    display: flex;
    z-index: 3;
    align-items: center;
    justify-content: center;
    width: 4em;
    height: 100%;
    transform: translateX(0);
    border-radius: inherit;
    background-color: var(--quiet-primary-text-on-mid); /* always white, same as checkbox icons */
    color: black;
    cursor: grab;
    transition: transform 0.3s ease-out;

    &:active {
      cursor: grabbing;
    }

    &.dragging {
      transition: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: var(--quiet-border-width);
    }

    quiet-icon,
    &::slotted(quiet-icon) {
      font-size: 1.25em;
    }
  }

  #label {
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
  }

  /* Shimmer */
  #label::before {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in oklab, var(--quiet-strident) 12.5%, transparent) 50%,
      transparent 100%
    );
    content: '';
    animation: shimmer 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes complete {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(0.98);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
