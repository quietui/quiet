import { css } from 'lit';

export default css`
  :host {
    display: flex;
    max-width: 100%;
  }

  :host([size='xs']) {
    width: 10rem;
  }

  :host([size='sm']) {
    width: 14rem;
  }

  :host([size='md']) {
    width: 18rem;
  }

  :host([size='lg']) {
    width: 22rem;
  }

  :host([size='xl']) {
    width: 26rem;
  }

  #picker {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--quiet-paper-color);
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    box-shadow: var(--quiet-shadow-softer);
    padding: 1em;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* Color slider */
  #color-slider {
    position: relative;
    aspect-ratio: 1.4;
    background-color: var(--color-slider-background);
    border-radius: calc(var(--quiet-border-radius) * 0.75);
    box-shadow: inset 0 0 0 0.0625rem color-mix(in oklab, black, transparent 90%);
    cursor: crosshair;

    &:dir(ltr) {
      background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%),
        linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    }

    &:dir(rtl) {
      background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%),
        linear-gradient(to left, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    }

    &:active {
      cursor: none;
    }
  }

  :host([disabled]) #color-slider {
    cursor: not-allowed;
  }

  #color-slider-thumb {
    position: absolute;
    width: 1.25em;
    height: 1.25em;
    translate: calc(1.25em / -2) calc(1.25em / -2);
    border: solid 0.0625rem rgb(0 0 0 / 33%);
    border-radius: 50%;
    transition: 100ms scale ease;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      border: solid max(0.125em, 1px) white;
      box-shadow: inset 0 0 0 0.0625rem rgb(0 0 0 / 33%);
      transition: 100ms scale ease;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: calc(var(--quiet-focus-offset) * 2);
    }
  }

  :host(:not([disabled])) #color-slider:active #color-slider-thumb {
    scale: 1.4;

    &::after {
      border-width: 0.09375em;
    }
  }

  #controls {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }

  #sliders {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    margin-inline-end: 0.5em;

    &::part(slider) {
      border-radius: 0;
    }
  }

  #hue,
  #opacity {
    --track-size: 1em;
    --thumb-width: 1.25em;
    --thumb-height: 1.25em;
    font-size: inherit;

    /* Visually hidden */
    &::part(label),
    &::part(description) {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      white-space: nowrap;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
    }

    &::part(slider) {
      margin-block: 0;
    }

    &::part(track) {
      font-size: inherit;
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
      border-radius: calc(var(--quiet-border-radius) * 0.75);
    }

    &::part(thumb) {
      border: solid 0.0625rem rgb(0 0 0 / 33%);
      border-radius: 9999px;
    }

    &::part(thumb)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: solid max(0.125em, 1px) white;
      border-radius: 9999px;
      box-shadow: inset 0 0 0 1px rgb(0 0 0 / 33%);
    }
  }

  #hue {
    &:dir(ltr)::part(track) {
      background-image: linear-gradient(
        to right,
        rgb(255, 0, 0) 0%,
        rgb(255, 255, 0) 17%,
        rgb(0, 255, 0) 33%,
        rgb(0, 255, 255) 50%,
        rgb(0, 0, 255) 67%,
        rgb(255, 0, 255) 83%,
        rgb(255, 0, 0) 100%
      );
    }

    &:dir(rtl)::part(track) {
      background-image: linear-gradient(
        to left,
        rgb(255, 0, 0) 0%,
        rgb(255, 255, 0) 17%,
        rgb(0, 255, 0) 33%,
        rgb(0, 255, 255) 50%,
        rgb(0, 0, 255) 67%,
        rgb(255, 0, 255) 83%,
        rgb(255, 0, 0) 100%
      );
    }

    &::part(indicator) {
      display: none;
    }

    &::part(thumb) {
      background-color: var(--hue-thumb-color);
    }
  }

  #opacity {
    &::part(track) {
      background-color: transparent;
      background-size: 0.5em 0.5em;
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
    }

    &::part(indicator) {
      width: 100% !important;
      background-color: transparent;
    }

    &:dir(ltr)::part(indicator) {
      background-image: linear-gradient(to right, transparent 0%, var(--current-color-without-opacity) 100%);
    }

    &:dir(rtl)::part(indicator) {
      background-image: linear-gradient(to left, transparent 0%, var(--current-color-without-opacity) 100%);
    }

    &::part(thumb) {
      background-color: var(--opacity-thumb-color);
    }
  }

  /* Eye dropper button */
  #eye-dropper::part(button) {
    font-size: inherit;
    min-height: 2.75em;
    border-radius: 50%;
  }

  /* Preview/copy button */
  #copy-button {
    display: flex;
  }

  #preview-button {
    &::part(button) {
      position: relative;
      min-height: 0;
      height: 2.75em;
      width: 2.75em;
      font-size: inherit;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      background-size: 0.5em 0.5em;
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
      cursor: copy;
    }

    &::part(button)::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--current-color);
      border-radius: inherit;
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }
  }

  /* Swatches */
  #swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.25em;

    button {
      position: relative;
      display: inline-block;
      aspect-ratio: 1;
      background: none;
      background-color: transparent;
      background-size: 0.5em 0.5em;
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-image: linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
      border: none;
      border-radius: calc(var(--quiet-border-radius) / 2);
      padding: 0;
      margin: 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--quiet-focus-ring);
        outline-offset: var(--quiet-focus-offset);
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--swatch-color);
        border-radius: inherit;
        box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
      }
    }
  }

  :host([disabled]) #swatches button {
    cursor: not-allowed;
  }
`;
