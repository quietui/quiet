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

  /* Content */
  #content {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  /* Inline */
  :host([inline]) {
    display: inline-flex;
    width: auto;
    white-space: nowrap;
  }

  :host([inline][visible]) #content {
    text-decoration: underline;
    text-decoration-style: wavy;
    text-decoration-color: color-mix(in oklab, currentColor, transparent 75%);
    text-underline-offset: 0.125em;
  }

  /* All buttons */
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

  /* Cover (shows the spoiler when clicked) */
  #cover {
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
    transition: 0.25s opacity ease;

    &.blur {
      background-color: color-mix(in oklab, var(--quiet-neutral-fill-soft), transparent 50%);
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
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
    background-color: var(--quiet-neutral-fill-mid);
    color: var(--quiet-neutral-text-on-mid);
    border-radius: 9999px;
    padding: 0.25em 1em;
    transition: 0.2s background-color ease;
  }

  /* Hide button */
  #hide-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    top: calc(-1.5em - 0.5em);
    left: calc(50% - 0.75em);
    width: 1.5em;
    height: 1.5em;
    font-size: 1.25em;
    background-color: var(--quiet-neutral-fill-mid);
    border-radius: 50% 50% 50% 0;
    color: var(--quiet-neutral-text-on-mid);
    translate: 0 0;
    scale: 1;
    rotate: -45deg;

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
    opacity: 0;
    scale: 0.9;
    translate: 0 25%;
    pointer-events: none;
  }
`;
