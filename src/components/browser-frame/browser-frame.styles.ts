import { css } from 'lit';

export default css`
  :host {
    --address-background-color: var(--quiet-neutral-fill-soft);
    --address-color: var(--quiet-neutral-text-on-soft);
    --border-color: var(--quiet-neutral-stroke-softer);
    --body-padding: 1em;
    --header-background-color: var(--quiet-neutral-fill-softer);
    --header-height: 2.5em;
    --windows-control-color: var(--quiet-neutral-fill-mid);

    /* Move container styles to host */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--border-color);
    border-radius: calc(1.5 * var(--quiet-border-radius-md));
    background-color: var(--quiet-background-color);
    box-shadow: var(--quiet-shadow-softer);
  }

  #header {
    display: flex;
    flex: 0 0 var(--header-height);
    align-items: center;
    padding: 0 1em;
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--border-color);
    background-color: var(--header-background-color);
  }

  /* Base controls styles */
  #controls {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  /* Mac-style controls positioning */
  .mac #controls.mac-controls {
    order: 0;
    margin-inline-end: 1em;
  }

  /* Windows-style controls positioning */
  .windows #controls.windows-controls {
    order: 2;
    margin-inline-start: 1em;
  }

  /* Base button styles */
  .control {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 0.75em;
    height: 0.75em;
  }

  /* Mac-specific control styles */
  .mac-controls .control {
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--quiet-border-radius-circle);
  }

  .mac-controls .control.close {
    background-color: #ff5f56;
  }

  .mac-controls .control.minimize {
    background-color: #ffbd2e;
  }

  .mac-controls .control.maximize {
    background-color: #27c93f;
  }

  /* Windows-specific control styles */
  .windows-controls .control {
    position: relative;
    width: 1.25em;
    height: 2em;
    color: var(--windows-control-color);
  }

  .windows-controls .control svg {
    width: 1.125em;
    height: 1.125em;
  }

  #address-bar {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    order: 1;
    width: 100%;
    height: 1.6em;
    padding: 0 0.5em;
    overflow: hidden;
    border-radius: var(--quiet-border-radius-pill);
    background-color: var(--address-background-color);
    color: var(--address-color);
    font-size: 0.8125em;
    text-decoration: none;
  }

  @media (hover: hover) {
    a#address-bar:hover {
      color: var(--quiet-primary-text-colorful);
    }
  }

  #url-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-inline: 0.25em;
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
    max-width: 1em;
    max-height: 1em;
    margin-inline-end: 0.25em;
    font-size: 1em;
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
    padding: var(--body-padding);
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
      border: none !important;
      border-radius: 0 !important;
    }
  }
`;
