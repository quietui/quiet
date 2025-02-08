import { css } from 'lit';

export default css`
  :host {
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 460px;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
    inset: unset;
    padding: 1.5em;
    overflow-y: auto;
    gap: 1em;
    border: none;
    background: transparent;
    pointer-events: none;
    scrollbar-width: thin;
  }

  :host(:not(:state(visible))) {
    display: none;
  }

  @media screen and (max-width: 499px) {
    :host {
      width: 100%;
    }
  }

  ::selection {
    background-color: var(--quiet-selection-background-color);
    color: var(--quiet-selection-color);
    text-shadow: none !important;
  }

  /* Placements */
  :host([placement*='top']) {
    top: 0;
  }

  :host([placement*='bottom']) {
    bottom: 0;
    align-content: end;
  }

  :host([placement*='start']:dir(ltr)) {
    left: 0;
  }

  :host([placement*='start']:dir(rtl)) {
    right: 0;
  }

  :host([placement*='center']) {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([placement*='end']:dir(ltr)) {
    right: 0;
  }

  :host([placement*='end']:dir(rtl)) {
    left: 0;
  }

  :host([placement*='bottom']) {
    justify-content: end;
  }
`;
