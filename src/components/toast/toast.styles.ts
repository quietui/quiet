import { css } from 'lit';

export default css`
  :host {
    position: fixed;
    width: 450px;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
    inset: unset;
    padding: 1.5em;
    overflow-y: auto;
    border: none;
    background: transparent;
    pointer-events: none;
    scrollbar-width: thin;

    @media screen and (max-width: 499px) {
      max-width: none;
    }
  }

  ::selection {
    background-color: var(--quiet-selection-background-color);
    color: var(--quiet-selection-color);
    text-shadow: none !important;
  }

  /* Placements */
  :host([placement*='top']) {
    top: 0;
  }

  :host([placement*='bottom']) {
    bottom: 0;
    align-content: end;
  }

  :host([placement*='start']:dir(ltr)) {
    left: 0;
  }

  :host([placement*='start']:dir(rtl)) {
    right: 0;
  }

  :host([placement*='center']) {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([placement*='end']:dir(ltr)) {
    right: 0;
  }

  :host([placement*='end']:dir(rtl)) {
    left: 0;
  }

  /* The toast stack */
  #stack {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    gap: 1em;
    pointer-events: none;
  }

  :host([placement*='bottom']) #stack {
    justify-content: end;
  }

  .notification {
    --accent-line-width: 0.33em;

    display: flex;
    position: relative;
    flex-wrap: nowrap;
    padding-inline-start: calc(1.5em + var(--accent-line-width));
    padding-inline-end: 1em;
    gap: 1em;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-soft);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-loud);
    color: var(--quiet-text-body);
    pointer-events: all;

    &.default {
      --accent-color: var(--quiet-neutral-fill-mid);
    }

    &.primary {
      --accent-color: var(--quiet-primary-fill-mid);
    }

    &.constructive {
      --accent-color: var(--quiet-constructive-fill-mid);
    }

    &.destructive {
      --accent-color: var(--quiet-destructive-fill-mid);
    }

    /** Accent line */
    &::after {
      position: absolute;
      --inset: max(
        var(--accent-line-width),
        calc(var(--accent-line-width) + (var(--quiet-border-radius) - 0.5em) * 0.7)
      );
      top: var(--inset);
      bottom: var(--inset);
      left: var(--accent-line-width);
      width: var(--accent-line-width);
      border-radius: 9999px;
      background-color: var(--accent-color);
      content: '';
    }

    &:has(.close-button) {
      padding-inline-end: 0;
    }

    .visual {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      stroke-width: 1.25px;
      color: var(--accent-color);
    }

    .content {
      flex: 1 1 auto;
      padding-block: 1.5em;
    }

    .close-button {
      display: flex;
      appearance: none;
      flex: 0 0 auto;
      align-items: center;
      align-self: stretch;
      justify-content: center;
      margin: 0;
      padding: 0;
      padding-inline: 1em;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      font-size: 1.25em;
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
    }
  }
`;
