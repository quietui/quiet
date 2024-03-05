import { css } from 'lit';

export default css`
  :host {
    --spacing: 1.5em;

    display: flex;
    flex-direction: column;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-border-subtle);
    border-radius: var(--quiet-border-radius);
    box-shadow: var(--quiet-shadow-silent);
  }

  /* Media */
  .media {
    position: relative;
    margin: calc(-1 * var(--quiet-border-width));

    ::slotted(*) {
      display: block !important;
      width: 100% !important;
      object-fit: cover !important;
      border-top-left-radius: var(--quiet-border-radius) !important;
      border-top-right-radius: var(--quiet-border-radius) !important;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      margin: 0 !important;
    }
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) / 4);
    border-bottom: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-border-subtle);
    padding-inline-start: var(--spacing);
    padding-inline-end: calc(var(--spacing) / 2); /* less spacing to better align buttons as actions */
    padding-block: calc(var(--spacing) * 0.875);

    /*
      Set negative margins on slotted buttons to prevent the header from growing too tall due to padding. We only do
      this for the header because it's a common use case to add icon buttons adjacent to the title.
    */
    ::slotted(quiet-button) {
      margin-block-start: calc(var(--spacing) * (0.875 / -2)) !important;
      margin-block-end: calc(var(--spacing) * (0.875 / -2)) !important;
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    margin-inline-start: auto;
  }

  /* Body */
  .body {
    padding: var(--spacing);
  }

  /* Footer */
  .footer {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) / 4);
    border-top: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-border-subtle);
    padding: var(--spacing);
  }
`;
