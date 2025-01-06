import { css } from 'lit';

export default css`
  :host([appearance='normal']) {
    display: inline-block;
    padding-inline: 0.33em;
    border: solid max(1px, 0.0715em) var(--quiet-neutral-fill-soft);
    border-radius: calc(var(--quiet-border-radius) / 2);
    box-shadow: 0 max(1px, 0.0715em) 0 0 var(--quiet-neutral-fill-soft);
    vertical-align: baseline;
    white-space: nowrap;
  }

  kbd {
    margin-inline: 0.0625em;
    font: inherit;

    &:first-of-type {
      margin-inline-start: 0;
    }

    &:last-of-type {
      margin-inline-end: 0;
    }

    &::selection {
      background-color: var(--quiet-selection-background-color);
      color: var(--quiet-selection-color);
    }
  }
`;
