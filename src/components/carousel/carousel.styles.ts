import { css } from 'lit';

export default css`
  :host {
    --aspect-ratio: 16 / 9;
    --item-gap: 2em;
    --dot-size: 0.875em;
    --dot-gap: 0.5em;
    --dot-color: var(--quiet-neutral-fill-soft);
    --dot-active-color: var(--quiet-neutral-fill-loud);

    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    gap: 1em;
  }

  #items {
    display: flex;
    aspect-ratio: var(--aspect-ratio);
    width: 100%;
    overflow-x: scroll;
    gap: var(--item-gap);
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
    transform: translateZ(0);
    border-radius: var(--quiet-border-radius);
    background-color: transparent;
    scrollbar-width: none;
    will-change: scroll-position;

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }

  #items::-webkit-scrollbar {
    display: none;
  }

  /* Controls */
  #controls {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
  }

  /* When navigation buttons AND pagination are present */
  :host([without-nav]) #controls {
    justify-content: center;
  }

  /* Previous + next */
  #previous-button,
  #next-button {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 2.5em;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--quiet-neutral-fill-softer);
    color: var(--quiet-neutral-text-on-soft);
    font: inherit;
    cursor: pointer;
    transition: 100ms translate ease;

    &:active:not(:disabled) {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    quiet-icon {
      font-size: 1.25em;
    }
  }

  #previous-button {
    order: 1;
  }

  #next-button {
    order: 3;
  }

  /* Pagination */
  #pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    order: 2;
    gap: var(--dot-gap);
  }

  .pagination-dot {
    position: relative;
    width: var(--dot-size);
    height: var(--dot-size);
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: var(--dot-color);
    font: inherit;
    cursor: pointer;
    transition: all var(--carousel-transition-duration) ease;

    &.active {
      background-color: var(--dot-active-color);
    }

    /* Cover the gap to increase the hit area of each dot */
    &::after {
      position: absolute;
      inset: calc(var(--dot-gap) / -2);
      content: '';
    }
  }

  /* Focus states for dots */
  .pagination-dot:focus-visible {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
    background-color: var(--dot-active-color);
  }

  /* When any dot has focus, active dots look inactive */
  #pagination:has(.pagination-dot:focus) .pagination-dot.active:not(:focus) {
    background-color: var(--dot-color);
  }

  /* The specific dot that has focus gets the active color */
  #pagination:has(.pagination-dot:focus) .pagination-dot:focus {
    background-color: var(--dot-active-color);
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    #items {
      scroll-behavior: auto;
    }

    .pagination-dot.active {
      transform: none;
    }
  }
`;
