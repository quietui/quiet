import { css } from 'lit';

export default css`
  :host {
    --blur: 8px;

    display: flex;
    flex-direction: column;
    position: relative;
    isolation: isolate;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Inline */
  :host([inline]) {
    display: inline-flex;
    width: auto;
    white-space: nowrap;
  }

  /* Content */
  #content {
    position: relative;
    z-index: 1;
  }

  :host([inline][visible]) #content {
    text-decoration: underline;
    text-decoration-style: wavy;
    text-decoration-color: color-mix(in oklab, currentColor, transparent 75%);
    text-underline-offset: 0.125em;
  }

  /* Buttons */
  button {
    background: none;
    border: none;
    border-radius: var(--quiet-border-radius);
    font: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }

  #show-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0.9375em;
    overflow: hidden;
    transition:
      0.25s opacity ease,
      0.25s scale ease;

    &.blur {
      background-color: color-mix(in oklab, var(--quiet-neutral-fill-soft), transparent 75%);
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      color: var(--quiet-neutral-text-on-soft);
    }

    &.solid {
      background-color: var(--quiet-neutral-fill-soft);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host([visible]) #show-button {
    scale: 1.1;
    opacity: 0;
    pointer-events: none;
  }

  :host(:not([inline])) #label {
    background-color: color-mix(in oklab, var(--quiet-neutral-fill-louder), transparent 50%);
    color: var(--quiet-neutral-text-on-loud);
    border-radius: 9999px;
    padding: 0.25em 1em;
    transition: 0.2s background-color ease;
  }

  #hide-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    top: calc(-1.5em - var(--quiet-border-width));
    width: 1.5em;
    height: 1.5em;
    font-size: 1.25em;
    background-color: var(--quiet-neutral-fill-soft);
    color: var(--quiet-neutral-text-on-soft);
    translate: 0 0;
    scale: 1;
    transition:
      0.25s translate ease,
      0.25s scale ease,
      0.25s opacity ease;

    &:dir(ltr) {
      right: calc(-1.5em - var(--quiet-border-width));
      border-radius: 50% 50% 50% 0;
    }

    &:dir(rtl) {
      left: calc(-1.5em - var(--quiet-border-width));
      border-radius: 50% 50% 0 50%;
    }

    &:active {
      translate: 0 var(--quiet-button-active-offset);
    }
  }

  :host(:not([visible])) #hide-button {
    opacity: 0;
    scale: 0.9;
    pointer-events: none;

    &:dir(ltr) {
      translate: -25% 25%;
    }

    &:dir(rtl) {
      translate: 25% 25%;
    }
  }
`;
