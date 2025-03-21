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
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Color slider */
  #color-slider {
    position: relative;
    aspect-ratio: 1.4;
    border-radius: calc(var(--quiet-border-radius) * 0.75);
    background-color: var(--color-slider-background);
    box-shadow: inset 0 0 0 0.0625rem color-mix(in oklab, black, transparent 90%);
    cursor: crosshair;

    &:dir(ltr) {
      background-image:
        linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%),
        linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    }

    &:dir(rtl) {
      background-image:
        linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%),
        linear-gradient(to left, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    }

    &:active {
      cursor: none;
    }
  }

  :host(:state(disabled)) #color-slider {
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
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: solid max(0.125em, 1px) white;
      border-radius: inherit;
      box-shadow: inset 0 0 0 0.0625rem rgb(0 0 0 / 33%);
      content: '';
      transition: 100ms scale ease;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: calc(var(--quiet-focus-offset) * 2);
    }
  }

  :host(:not(:state(disabled))) #color-slider:active #color-slider-thumb {
    scale: 1.4;

    &::after {
      border-width: 0.09375em;
    }
  }

  #controls {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  #sliders {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    margin-inline-start: 0.5em;
    gap: 1em;

    &::part(slider) {
      border-radius: 0;
    }
  }

  #hue,
  #alpha {
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
      clip-path: inset(50%);
    }

    &::part(slider) {
      margin-block: 0;
    }

    &::part(track) {
      border-radius: calc(var(--quiet-border-radius) / 1.5);
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
      font-size: inherit;
    }

    &::part(thumb) {
      border: solid 0.0625rem rgb(0 0 0 / 33%);
      border-radius: 9999px;
    }

    &::part(thumb)::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: solid max(0.125em, 1px) white;
      border-radius: 9999px;
      box-shadow: inset 0 0 0 1px rgb(0 0 0 / 33%);
      content: '';
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

  #alpha {
    &::part(track) {
      background-image:
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-size: 0.5em 0.5em;
      background-color: transparent;
    }

    &::part(indicator) {
      width: 100% !important;
      background-color: transparent;
    }

    &:dir(ltr)::part(indicator) {
      background-image: linear-gradient(to right, transparent 0%, var(--current-color-without-alpha) 100%);
    }

    &:dir(rtl)::part(indicator) {
      background-image: linear-gradient(to left, transparent 0%, var(--current-color-without-alpha) 100%);
    }

    &::part(thumb) {
      background-color: var(--alpha-thumb-color);
    }
  }

  /* Eye dropper button */
  #eye-dropper::part(button) {
    min-height: 2.75em;
    border-radius: 50%;
    font-size: inherit;
  }

  /* Preview/copy button */
  #copy-button {
    display: flex;
  }

  #preview-button {
    &::part(button) {
      position: relative;
      width: 2.75em;
      height: 2.75em;
      min-height: 0;
      border: none;
      border-radius: 50%;
      background-image:
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-size: 0.5em 0.5em;
      background-color: transparent;
      font-size: inherit;
    }

    &::part(button)::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      background-color: var(--current-color);
      box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
      content: '';
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

  /* Color input */
  #color-input::part(label) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }

  /* Swatches */
  #swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.25em;

    button {
      display: inline-block;
      position: relative;
      aspect-ratio: 1;
      margin: 0;
      padding: 0;
      border: none;
      border-radius: calc(var(--quiet-border-radius) / 2);
      background: none;
      background-image:
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, transparent 75%, var(--quiet-neutral-fill-soft) 75%),
        linear-gradient(45deg, var(--quiet-neutral-fill-soft) 25%, transparent 25%);
      background-position:
        0 0,
        0 0,
        -0.25em -0.25em,
        0.25em 0.25em;
      background-size: 0.5em 0.5em;
      background-color: transparent;
      cursor: pointer;
      transition: 100ms translate ease;

      &:active:not(.disabled) {
        translate: 0 var(--quiet-button-active-offset);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--quiet-focus-ring);
        outline-offset: var(--quiet-focus-offset);
      }

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: var(--swatch-color);
        box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--quiet-strident), transparent 90%);
        content: '';
      }
    }
  }

  :host(:state(disabled)) #swatches button {
    cursor: not-allowed;
  }
`;
