import { css } from 'lit';

export default css`
  :host {
    --blur: 8px;

    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    isolation: isolate;
  }

  /* Content */
  #content {
    z-index: 1;
    position: relative;
    width: 100%;
  }

  /* Inline */
  :host([inline]) {
    display: inline-flex;
    width: auto;
    white-space: nowrap;
  }

  :host([inline][visible]:not([persist])) #content {
    text-decoration: underline;
    text-decoration-style: wavy;
    text-decoration-color: color-mix(in oklab, currentColor, transparent 75%);
    text-underline-offset: 0.125em;
  }

  /* All buttons */
  button {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: var(--quiet-border-radius);
    background: none;
    color: inherit;
    font: inherit;
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

  /* Cover (shows the spoiler when clicked) */
  #cover {
    display: flex;
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 0.9375em;
    transition: 0.25s opacity ease;

    &.blur {
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      background-color: color-mix(in oklab, var(--quiet-neutral-fill-softer), transparent 50%);
      color: var(--quiet-neutral-text-on-soft);
    }

    &.cover {
      background-color: var(--quiet-neutral-fill-soft);
      color: var(--quiet-neutral-text-on-soft);
    }
  }

  :host([visible]) #cover {
    opacity: 0;
    pointer-events: none;
  }

  /* Label */
  :host(:not([inline])) #label {
    padding: 0.25em 1em;
    scale: 1;
    border-radius: 9999px;
    background-color: var(--quiet-neutral-fill-mid);
    color: var(--quiet-neutral-text-on-mid);
    transition:
      0.2s background-color ease,
      0.2s scale ease;
  }

  :host([visible]:not([inline])) #label {
    scale: 0.75;
  }

  /* Hide button */
  #hide-button {
    display: flex;
    z-index: 2;
    position: absolute;
    top: calc(-1.5em - 0.5em);
    left: calc(50% - 0.75em);
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    translate: 0 0;
    rotate: -45deg;
    scale: 1;
    border-radius: 50% 50% 50% 0;
    background-color: var(--quiet-neutral-fill-mid);
    box-shadow: 0 0 0 var(--quiet-focus-offset) var(--quiet-silent);
    color: var(--quiet-neutral-text-on-mid);
    font-size: 1.25em;

    transition:
      0.25s translate ease,
      0.25s scale ease,
      0.25s opacity ease;

    quiet-icon {
      rotate: 45deg;
    }

    &:active {
      translate: 0 var(--quiet-button-active-offset);
    }
  }

  :host(:not([visible])) #hide-button {
    translate: 0 25%;
    scale: 0.9;
    opacity: 0;
    pointer-events: none;
  }
`;
