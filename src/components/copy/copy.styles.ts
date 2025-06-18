import { css } from 'lit';

/** NOTE: these styles are also used by <quiet-share> */
export default css`
  :host {
    display: inline-block;
    position: relative;
    white-space: normal;
  }

  quiet-button,
  ::slotted(*) {
    cursor: copy !important;
  }

  #feedback {
    position: absolute;
    top: 0;
    left: 0;
    width: fit-content;
    margin: 0;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-fill-loud);
    border-radius: var(--quiet-border-radius);
    background-color: var(--quiet-neutral-fill-loud);
    box-shadow: var(--quiet-shadow-soft);
    color: var(--quiet-neutral-text-on-loud);
    font-weight: var(--quiet-font-weight-semibold);
    font-size: 0.75rem;
    text-align: center;
    text-transform: uppercase;
    pointer-events: none;
    user-select: none;

    &.show {
      animation: show 1s ease;
    }
  }

  #feedback[data-placement='top'] {
    --translate-x-start: 0;
    --translate-x-end: 0;
    --translate-y-start: -0.25rem;
    --translate-y-end: -0.75rem;
    translate: 0 -0.25rem;
  }

  #feedback[data-placement='right'] {
    --translate-x-start: 0.25rem;
    --translate-x-end: 0.75rem;
    --translate-y-start: 0;
    --translate-y-end: 0;
    translate: 0.25rem 0;
  }

  #feedback[data-placement='bottom'] {
    --translate-x-start: 0;
    --translate-x-end: 0;
    --translate-y-start: 0.25rem;
    --translate-y-end: 0.75rem;
    translate: 0 0.25rem;
  }

  #feedback[data-placement='left'] {
    --translate-x-start: -0.25rem;
    --translate-x-end: -0.75rem;
    --translate-y-start: 0;
    --translate-y-end: 0;
    translate: -0.25rem 0;
  }

  @keyframes show {
    0% {
      transform: translate(var(--translate-x-start), var(--translate-y-start));
      scale: 0.95;
      opacity: 0;
    }

    20% {
      transform: translate(var(--translate-x-end), var(--translate-y-end));
      scale: 1;
      opacity: 1;
    }

    80% {
      transform: translate(var(--translate-x-start), var(--translate-y-start));
      scale: 1;
      opacity: 1;
    }

    100% {
      scale: 0.95;
      opacity: 0;
    }
  }
`;
