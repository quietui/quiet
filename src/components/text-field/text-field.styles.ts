import { css } from 'lit';

export default css`
  /* Pills */
  #visual-box.pill {
    border-radius: 9999px;
    padding: 0 1.25em;
  }

  #text-box::-webkit-color-swatch {
    border-radius: 9999px;
  }

  #text-box::-moz-color-swatch,
  #text-box::-moz-focus-inner {
    border-radius: 9999px;
  }

  #text-box::-webkit-datetime-edit-day-field:focus,
  #text-box::-webkit-datetime-edit-month-field:focus,
  #text-box::-webkit-datetime-edit-year-field:focus {
    background-color: var(--quiet-selection-background-color);
    color: var(--quiet-selection-color);
    outline: none;
  }

  /* Icons */
  slot[name='start']::slotted(*),
  slot[name='end']::slotted(*) {
    color: var(--quiet-text-muted) !important;
  }

  slot[name='start']::slotted(quiet-icon),
  slot[name='end']::slotted(quiet-icon) {
    font-size: 1.25em !important;
    pointer-events: none;
  }

  slot[name='start']::slotted(svg),
  slot[name='end']::slotted(svg) {
    width: 1.25em;
    height: 1.25em;
    pointer-events: none;
  }
`;
