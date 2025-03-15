import { css } from 'lit';

export default css`
  :host {
    --border-color: var(--quiet-neutral-stroke-softer);
    --header-background-color: var(--quiet-neutral-fill-softer);
    --address-background-color: var(--quiet-neutral-fill-soft);
    --address-text-color: var(--quiet-text-color);
    --header-height: 2.5rem;
    --button-size: 0.75rem;
    --button-spacing: 0.5rem;

    /* Move container styles to host */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--border-color);
    border-radius: calc(1.5 * var(--quiet-border-radius));
    background-color: var(--quiet-background-color);
    box-shadow: var(--quiet-shadow-soft);
  }

  #header {
    display: flex;
    flex: 0 0 var(--header-height);
    align-items: center;
    padding: 0 1rem;
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--border-color);
    background-color: var(--header-background-color);
  }

  #controls {
    display: flex;
    align-items: center;
    margin-inline-end: 1rem;
    gap: var(--button-spacing);
  }

  .button {
    flex-shrink: 0;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;

    &.close {
      background-color: #ff5f56;
    }

    &.minimize {
      background-color: #ffbd2e;
    }

    &.maximize {
      background-color: #27c93f;
    }
  }

  #address-bar {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1.6rem;
    padding: 0 0.5rem;
    overflow: hidden;
    border-radius: 9999px;
    background-color: var(--address-background-color);
    color: var(--address-text-color);
    font-size: 0.8125rem;
    text-decoration: none;
  }

  #url-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-inline: 0.25rem;
    overflow: hidden;
  }

  #url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Favicon */
  slot[name='icon']::slotted(img),
  slot[name='icon']::slotted(quiet-icon),
  slot[name='icon']::slotted(svg) {
    flex: 0;
    max-width: 1rem;
    max-height: 1rem;
    margin-inline-end: 0.25rem;
    font-size: 1rem;
  }

  #address-bar:focus {
    outline: none;
  }

  #address-bar:focus-visible {
    outline: var(--quiet-focus-ring);
    outline-offset: var(--quiet-focus-offset);
  }

  #body {
    flex: 1;
    padding: 1rem;
    overflow: auto;

    ::slotted(img),
    ::slotted(iframe) {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  /* When flush, remove all padding from the body and adjust media */
  #body.flush {
    padding: 0;

    ::slotted(img),
    ::slotted(iframe) {
      border-radius: 0 !important;
    }
  }
`;
