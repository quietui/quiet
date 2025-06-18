import { css } from 'lit';

export default css`
  :host([appearance='normal']) {
    display: inline-block;
    min-width: 1.25em;
    padding: 0 0.33em;
    border: solid max(1px, 0.0715em) var(--quiet-neutral-fill-soft);
    border-radius: var(--quiet-border-radius-md);
    box-shadow: 0 max(1px, 0.0715em) 0 0 var(--quiet-neutral-fill-soft);
    text-align: center;
    vertical-align: baseline;
    white-space: nowrap;
  }

  kbd {
    font: inherit;
    font-size: 0.9375em;
    letter-spacing: 0.0625em;

    &:first-of-type {
      margin-inline-start: 0;
    }

    &:last-of-type {
      margin-inline-end: 0;
    }
  }
`;
