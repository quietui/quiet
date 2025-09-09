import { css } from 'lit';

export default css`
  /* Base styles + normal appearance */
  :host {
    --spacing: 1.5em;
    --border-width: var(--quiet-border-width);
    --border-style: var(--quiet-border-style);

    display: flex;
    flex-direction: column;
    border-radius: var(--quiet-border-radius-md);
  }

  /* Normal */
  :host {
    --border-color: var(--quiet-neutral-stroke-softer);
    border: var(--border-style) var(--border-width) var(--border-color);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
  }

  /* Filled */
  :host([appearance='filled']) {
    --border-color: var(--quiet-background-color);

    border: none;
    background-color: var(--quiet-neutral-fill-softer);
  }

  /* Vertical cards */
  :host([orientation='horizontal']) {
    flex-direction: row;
  }

  /* Media */
  #media {
    position: relative;
    margin: calc(-1 * var(--border-width));
  }

  :host([orientation='vertical']) #media ::slotted(*) {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    object-fit: cover !important;
    border-top-right-radius: var(--quiet-border-radius-md) !important;
    border-top-left-radius: var(--quiet-border-radius-md) !important;
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  :host([orientation='horizontal']) #media ::slotted(*) {
    display: block !important;
    height: 100%;
    margin: 0 !important;
    object-fit: cover !important;
    border-top-right-radius: 0 !important;
    border-top-left-radius: var(--quiet-border-radius-md) !important;
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: var(--quiet-border-radius-md) !important;
  }

  /* Header */
  #header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-inline-start: var(--spacing);
    padding-inline-end: calc(var(--spacing) / 2); /* less spacing to better align buttons as actions */
    padding-block: calc(var(--spacing) * 0.875);
    gap: calc(var(--spacing) / 4);

    /*
      Set negative margins on slotted buttons to prevent the header from growing too tall due to padding. We only do
      this for the header because it's a common use case to add icon buttons adjacent to the title.
    */
    ::slotted(quiet-button) {
      margin-block-start: calc(var(--spacing) * (0.875 / -2)) !important;
      margin-block-end: calc(var(--spacing) * (0.875 / -2)) !important;
    }
  }

  /* Show a border for vertical cards only */
  :host([orientation='vertical']) #header {
    border-bottom: var(--border-style) var(--border-width) var(--border-color);
  }

  #actions {
    display: flex;
    flex-wrap: wrap;
  }

  :host([orientation='vertical']) #actions {
    margin-inline-start: auto;
  }

  :host([orientation='horizontal']) #actions {
    align-items: center;
    padding: var(--spacing);
  }

  /* Body */
  #body {
    flex: 1;
    padding: var(--spacing);
  }

  /* Footer */
  #footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--spacing);
    gap: calc(var(--spacing) / 4);
  }

  /* Show a border for vertical cards only */
  :host([orientation='vertical']) #footer {
    border-top: var(--border-style) var(--border-width) var(--border-color);
  }
`;
