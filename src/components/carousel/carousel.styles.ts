import { css } from 'lit';

export default css`
  :host {
    --height: 18.75em;

    display: block;
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  #container {
    display: flex;
    width: 100%;
    height: var(--height);
    overflow-x: scroll;
    gap: 2em;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    border-radius: var(--quiet-border-radius);
    background-color: transparent;

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }

  #container::-webkit-scrollbar {
    display: none;
  }

  /* Previous + next */
  #nav {
    display: grid;
    grid-template-columns: auto auto 1fr;
    flex-wrap: wrap;
    align-items: center;
    margin-block-start: 1rem;
    gap: 0.5em;
  }

  #previous-button,
  #next-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
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

  /* Pagination */
  #pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.5em;
  }

  .dot {
    width: 1em;
    height: 1em;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: var(--quiet-neutral-fill-soft);
    cursor: pointer;
    transition: all var(--carousel-transition-duration) ease;

    &.active {
      background-color: var(--quiet-neutral-fill-loud);
    }
  }

  /* Focus states for dots */
  .dot:focus-visible {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
    background-color: var(--quiet-neutral-fill-loud);
  }

  /* When any dot has focus, active dots look inactive */
  #pagination:has(.dot:focus) .dot.active:not(:focus) {
    background-color: var(--quiet-neutral-fill-soft);
  }

  /* The specific dot that has focus gets the active color */
  #pagination:has(.dot:focus) .dot:focus {
    background-color: var(--quiet-neutral-fill-loud);
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    #container {
      scroll-behavior: auto;
    }

    .dot.active {
      transform: none;
    }
  }
`;
