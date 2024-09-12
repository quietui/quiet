import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--item-spacing);
  }

  #label {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--item-spacing) / 2);
    color: var(--quiet-primary-text-colorful);
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.9375em;
    text-decoration: inherit;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: var(--quiet-focus-offset);
    }

    ::slotted(quiet-icon) {
      font-size: 1.25em;
    }
  }

  :host([current]) #label {
    color: var(--quiet-text-muted);
  }

  #separator {
    display: flex;
    align-items: center;
    color: var(--quiet-text-muted);
    text-align: center;
    user-select: none;
    -webkit-user-select: none;

    /* Slotted text such as a slash will look condensed, so this makes sure there's decent spacing out of the box */
    ::slotted(*) {
      min-width: 1em;
    }

    /* Default separators and slotted custom separators should be 1.25em */
    quiet-icon,
    ::slotted(quiet-icon) {
      font-size: 1.25em !important;
    }

    /* Flip separator icons when RTL */
    &:dir(rtl) quiet-icon,
    &:dir(rtl) ::slotted(quiet-icon) {
      transform: rotateY(180deg);
    }
  }

  /* Hide the last separator */
  :host(:last-of-type) #separator {
    display: none;
  }
`;
