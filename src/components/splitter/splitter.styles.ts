import { css } from 'lit';

export default css`
  :host {
    --divider-min-position: 0%;
    --divider-max-position: 100%;
    --divider-draggable-area: 1rem;
    --divider-width: 0.1875rem;

    display: grid;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: var(--quiet-border-style) var(--quiet-border-width) var(--quiet-neutral-stroke-softer);
    border-radius: var(--quiet-border-radius);
  }

  #start,
  #end {
    overflow: auto;
  }

  #divider {
    display: flex; /* Center slotted content */
    z-index: 1; /* Ensure divider stays above content */
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--divider-width);
    height: var(--divider-width);
    outline: none; /* Remove default focus outline */
    background-color: var(--divider-color, var(--quiet-neutral-stroke-softer));
    cursor: ew-resize;
    transition:
      50ms background-color ease,
      50ms color ease;
    user-select: none;
    -webkit-user-select: none;
  }

  #divider::before {
    z-index: 2; /* Above divider for dragging */
    position: absolute;
    top: 0;
    left: 50%;
    width: var(--divider-draggable-area);
    height: 100%;
    transform: translateX(-50%);
    content: '';
  }

  #handle {
    z-index: 3; /* Above both divider and drag area */
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--divider-width);
    height: 1.5rem;
    transform: translate(-50%, -50%);
    border-radius: calc(var(--quiet-border-radius) / 4);
    background-color: var(--quiet-neutral-fill-mid);
    color: var(--quiet-neutral-text-on-mid);
  }

  ::slotted(quiet-icon) {
    font-size: 1.25rem;
  }

  #divider:focus {
    outline: none;
  }

  #divider.dragging,
  #divider:focus-visible,
  #divider.dragging #handle,
  #divider:focus-visible #handle {
    outline: none;
    background-color: var(--quiet-primary-fill-mid);
    color: var(--quiet-primary-text-on-mid);
  }

  /* Disabled */
  :host([disabled]) #divider {
    cursor: default;
  }

  :host([disabled]) #handle {
    display: none;
  }

  /* Orientation */
  :host([orientation='horizontal']) {
    grid-template-areas: 'start divider end';
  }

  :host([orientation='vertical']) {
    grid-template-areas: 'start' 'divider' 'end';
  }

  :host([orientation='vertical']) #divider {
    width: 100%;
    height: var(--divider-width);
    cursor: ns-resize;
  }

  :host([orientation='vertical']) #divider::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: var(--divider-draggable-area);
    transform: translateY(-50%);
  }

  :host([orientation='vertical']) #handle {
    top: 50%;
    left: 50%;
    width: 1.5rem;
    height: var(--divider-width);
    transform: translate(-50%, -50%);
  }

  :host([orientation='horizontal']) #divider {
    height: 100%;
  }

  #start {
    grid-area: start;
  }

  #divider {
    grid-area: divider;
  }

  #end {
    grid-area: end;
  }
`;
