import { css } from 'lit';

export default css`
  :host {
    --duration: 200ms;
    --easing: ease;
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
    padding: 1rem;
    gap: 0.5rem;
    background: transparent;
    cursor: pointer;
    user-select: none;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--quiet-focus-ring);
      outline-offset: -2px;
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
    }
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
    transition: transform var(--duration) var(--easing);
  }

  :host(:state(expanded)) #icon {
    transform: rotate(180deg);
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
    height: 0;
    overflow: hidden;
  }

  :host(:state(expanded)) #body {
    height: auto;
    overflow: visible;
  }

  /* Content */
  #content {
    padding: 0 1rem 1rem;
  }

  /* Appearance: normal */
  :host([appearance='normal']) {
    border-bottom: var(--border-style) var(--border-width) var(--border-color);
  }

  /* Appearance: contained */
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

  /* Appearance: separated */
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

  /* Position-based styling */
  :host([data-accordion-item-first]) {
    /* Styles for first item */
  }

  :host([data-accordion-item-middle]) {
    /* Styles for middle items */
  }

  :host([data-accordion-item-last]) {
    /* Styles for last item */
  }

  /* Single item (both first and last) */
  :host([data-accordion-item-first][data-accordion-item-last]) {
    /* Styles for single item */
  }

  /* Appearance: unstyled */
  :host([appearance='unstyed']) {
  }
`;
