import { css } from 'lit';

export default css`
  :host {
    /* Private, inherited from <quiet-accordion> */
    --duration: inherit;
    --easing: inherit;
    --border-color: inherit;
    --border-style: inherit;
    --border-width: inherit;
    --border-radius: inherit;

    display: block;
  }

  /* Header */
  #header {
    display: flex;
    align-items: center;
    padding: 1em;
    gap: 1em;
    background: transparent;
    font-weight: var(--quiet-font-weight-semibold);
    cursor: pointer;
    user-select: none;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: -2px;
    }
  }

  :host(:state(disabled)) #header {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :host([icon-position='start']) #header {
    flex-direction: row-reverse;
  }

  /* Label */
  #label {
    display: flex;
    flex: 1;
    align-items: center;

    ::slotted(quiet-icon) {
      margin-inline-end: 0.5em;
      font-size: 1.25em;
    }
  }

  /* Icon */
  #icon {
    display: flex;
    align-items: center;
    font-size: 1.25em;
    transition: rotate var(--duration) var(--easing);
  }

  :host(:state(expanded)) #icon {
    rotate: 180deg;
  }

  /* Icon position */
  #header {
    .icon-start {
      flex-direction: row;
    }

    .icon-end {
      flex-direction: row;
    }

    .icon-start #icon {
      order: -1;
    }
  }

  /* Body */
  #body {
    will-change: height;
  }

  :host(:not(:state(expanded))) #body {
    height: 0;
    overflow: hidden;
  }

  :host(:state(expanded)) #body {
    overflow: visible;
  }

  /* Content */
  #content {
    padding: 0 1em 1em;
  }

  /* Normal appearance */
  :host([appearance='normal']) {
    border-bottom: var(--border-style) var(--border-width) var(--border-color);
  }

  :host([appearance='normal'][data-accordion-item-first]) {
    border-top: var(--border-style) var(--border-width) var(--border-color);
  }

  /* Contained appearance */
  :host([appearance='contained'][data-accordion-item-first]) #header {
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
  }

  :host([appearance='contained'][data-accordion-item-last]) #header {
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  :host([appearance='contained']:not([data-accordion-item-last])) {
    border-bottom: var(--border-style) var(--border-width) var(--border-color);
  }

  /* Separated appearance */
  :host([appearance='separated']) {
    border: var(--border-style) var(--border-width) var(--quiet-neutral-fill-soft);
    border-radius: var(--border-radius);
    background-color: var(--quiet-paper-color);
    box-shadow: var(--quiet-shadow-softer);
    color: var(--quiet-neutral-text-on-soft);
  }

  :host([appearance='separated']:state(expanded)) {
    border-color: var(--border-color);
  }

  :host([appearance='separated']) #header {
    border-radius: inherit;
  }
`;
