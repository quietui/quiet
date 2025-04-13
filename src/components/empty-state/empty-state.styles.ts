import { css } from 'lit';

export default css`
  :host {
    --content-width: 40ch;
    --illustration-width: calc(var(--content-width) / 2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    color: var(--quiet-text-muted);
    text-align: center;
  }

  #illustration {
    max-width: var(--illustration-width);

    ::slotted(img) {
      display: block;
      width: 100%;
      margin-block-end: 1.5em;
    }

    ::slotted(quiet-icon) {
      font-size: 6em;
      stroke-width: 1px;
      color: var(--quiet-primary-text-colorful);
    }
  }

  #content {
    max-width: var(--content-width);
    margin-inline: auto;

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      margin-block-start: 0 !important;
      color: var(--quiet-text-body);
      text-wrap: balance !important;
    }

    ::slotted(p) {
      margin-block-end: 1em !important;
      text-wrap: balance !important;
    }

    ::slotted(:last-child) {
      margin-block-end: 0 !important;
    }
  }
`;
