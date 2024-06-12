import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  /* The switch's label */
  label {
    display: inline-flex;
    gap: 0.75em;
    align-items: center;
    cursor: pointer;

    &:has(.xs) {
      font-size: var(--quiet-form-control-font-size-xs);
    }

    &:has(.sm) {
      font-size: var(--quiet-form-control-font-size-sm);
    }

    &:has(.md) {
      font-size: var(--quiet-form-control-font-size-md);
    }

    &:has(.lg) {
      font-size: var(--quiet-form-control-font-size-lg);
    }

    &:has(.xl) {
      font-size: var(--quiet-form-control-font-size-xl);
    }
  }

  :host(:state(disabled)) label {
    cursor: not-allowed;
  }

  #visual-box {
    --height: 1.6em;
    --width: calc(var(--height) * 2);
    --thumb-size: calc(var(--height) - 4px);
    --thumb-padding: calc((var(--height) - var(--thumb-size)) / 2);
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 9999px;
    background-color: var(--quiet-neutral-fill-soft);
    width: var(--width);
    height: var(--height);
    transition:
      100ms background-color ease,
      100ms border-color ease;

    &.checked {
      background-color: var(--quiet-primary-fill-mid);
      border-color: transparent;
    }

    &:has(:focus-visible) {
      outline: var(--quiet-border-style) calc(var(--quiet-border-width) + 1px) var(--quiet-focus-color);
      outline-offset: var(--quiet-border-width);
    }

    /* Thumb */
    #thumb {
      position: absolute;
      top: calc(50% - (var(--thumb-size) / 2));
      width: var(--thumb-size);
      height: var(--thumb-size);
      border-radius: 9999px;
      background-color: var(--quiet-primary-text-on-mid); /* always white, same as checkbox icons */
      transition:
        100ms width ease,
        100ms left ease,
        100ms right ease;

      &:dir(ltr) {
        left: var(--thumb-padding);
      }

      &:dir(rtl) {
        right: var(--thumb-padding);
      }
    }

    &.checked #thumb {
      &:dir(ltr) {
        left: calc(100% - var(--thumb-size) - var(--thumb-padding));
      }

      &:dir(rtl) {
        right: calc(100% - var(--thumb-size) - var(--thumb-padding));
      }
    }

    /* Stretch the thumb when active */
    &:active:not(.disabled) #thumb {
      width: calc(var(--thumb-size) * 1.25);
    }

    &.checked:not(.disabled):active #thumb {
      &:dir(ltr) {
        left: calc(100% - calc(var(--thumb-size) * 1.25) - var(--thumb-padding));
      }

      &:dir(rtl) {
        right: calc(100% - calc(var(--thumb-size) * 1.25) - var(--thumb-padding));
      }
    }

    /* Inner labels */
    #on-label,
    #off-label {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.625em;
      font-weight: var(--quiet-font-weight-semibold);
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      transition:
        100ms opacity ease,
        100ms translate ease;

      ::slotted(quiet-icon) {
        font-size: 1.75em;
      }
    }

    #on-label {
      color: var(--quiet-primary-text-on-mid);
      margin-inline-start: calc(var(--thumb-padding) * 2);
    }

    #off-label {
      color: var(--quiet-primary-text-on-soft);
      margin-inline-end: calc(var(--thumb-padding) * 2);
    }

    &:not(.checked) #on-label {
      opacity: 0;

      &:dir(ltr) {
        translate: 50%;
      }

      &:dir(rtl) {
        translate: -50%;
      }
    }

    &.checked #off-label {
      opacity: 0;

      &:dir(ltr) {
        translate: -50%;
      }

      &:dir(rtl) {
        translate: 50%;
      }
    }

    /* The actual checkbox control */
    #switch {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      appearance: none;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: inherit;
      z-index: 1000;

      &:focus {
        outline: none;
      }
    }
  }

  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
