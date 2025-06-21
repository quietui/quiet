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
    border-radius: var(--quiet-border-radius-md);
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
      background-color: color-mix(in oklab, var(--quiet-background-color), transparent 50%);
      color: var(--quiet-neutral-text-on-soft);
    }

    &.noise {
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="8" stitchTiles="stitch" /><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity=".5" /></svg>');
      background-size: 600px 600px;
      background-repeat: repeat;
      background-color: color-mix(in oklab, var(--quiet-neutral-fill-softer), transparent 50%);
      color: var(--quiet-neutral-text-on-soft);
    }

    &.solid {
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
    border-radius: var(--quiet-border-radius-pill);
    background-color: var(--quiet-neutral-fill-loud);
    color: var(--quiet-neutral-text-on-loud);
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
    background-color: var(--quiet-neutral-fill-loud);
    box-shadow: 0 0 0 var(--quiet-focus-offset) var(--quiet-silent);
    color: var(--quiet-neutral-text-on-loud);
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
