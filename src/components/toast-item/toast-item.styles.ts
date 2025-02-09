import { css } from 'lit';

export default css`
  :host {
    --accent-line-width: 0.33em;

    display: flex;
    position: relative;
    flex-wrap: nowrap;
    width: 100%;
    padding-inline-start: calc(1.5em + var(--accent-line-width));
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    backdrop-filter: blur(6px);
    background-color: color-mix(in oklab, var(--quiet-paper-color), transparent 15%);
    box-shadow: var(--quiet-shadow-loud);
    color: var(--quiet-text-body);
    line-height: 1.25;
    cursor: default;
    pointer-events: all;
    user-select: none;
  }

  :host([variant='default']) {
    --accent-color: var(--quiet-neutral-fill-mid);
  }

  :host([variant='primary']) {
    --accent-color: var(--quiet-primary-fill-mid);
  }

  :host([variant='constructive']) {
    --accent-color: var(--quiet-constructive-fill-mid);
  }

  :host([variant='destructive']) {
    --accent-color: var(--quiet-destructive-fill-mid);
  }

  /** Accent line */
  :host::after {
    position: absolute;
    --inset: max(var(--accent-line-width), calc(var(--accent-line-width) + (var(--quiet-border-radius) - 0.5em) * 0.7));
    top: var(--inset);
    bottom: var(--inset);
    left: var(--accent-line-width);
    width: var(--accent-line-width);
    border-radius: 9999px;
    background-color: var(--accent-color);
    content: '';
  }

  &:has(#close-button) {
    padding-inline-end: 0;
  }

  #icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    margin-inline-end: 1em;
    color: var(--accent-color);

    ::slotted(quiet-icon) {
      font-size: 2em;
      stroke-width: 1.25px;
    }
  }

  #content {
    flex: 1 1 auto;
    padding-block: 1.5em;

    &:last-child {
      padding-inline-end: 1em;
    }
  }

  #close-button {
    display: flex;
    appearance: none;
    align-items: center;
    align-self: stretch;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-inline: 1.25em;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;

    &:active {
      translate: 0 var(--quiet-button-active-offset);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    quiet-progress {
      --diameter: 2.25em;
      --track-size: 0.125em;
      --indicator-color: var(--accent-color);
      font-size: inherit;
    }

    quiet-icon {
      font-size: 1.25em;
    }
  }
`;
