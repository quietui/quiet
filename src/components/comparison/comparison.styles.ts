import { css } from 'lit';

export default css`
  :host {
    --divider-draggable-area: 1rem;
    --divider-width: 0.1875rem;

    display: flex;
    position: relative;
    width: 100%;
    isolation: isolate;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    height: 100%;
  }

  /* Start */
  #start {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip-path: polygon(0 0, var(--position) 0, var(--position) 100%, 0 100%);
  }

  :host(:dir(rtl)) #start {
    clip-path: polygon(0 0, calc(100% - var(--position)) 0, calc(100% - var(--position)) 100%, 0 100%);
  }

  :host([orientation='vertical']) #start {
    clip-path: polygon(0 0, 100% 0, 100% var(--position), 0 var(--position));
  }

  :host([orientation='vertical']:dir(rtl)) #start {
    clip-path: polygon(0 0, 100% 0, 100% var(--position), 0 var(--position));
  }

  /* End */
  #end {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    clip-path: polygon(var(--position) 0, 100% 0, 100% 100%, var(--position) 100%);

    /* Prevents a ring of light from showing through in light <=> dark comparisons */
    will-change: transform;
  }

  :host([orientation='vertical']) #end {
    clip-path: polygon(0 var(--position), 100% var(--position), 100% 100%, 0 100%);
  }

  :host(:dir(rtl)) #end {
    clip-path: polygon(0 0, calc(100% - var(--position)) 0, calc(100% - var(--position)) 100%, 0 100%);
  }

  :host([orientation='vertical']:dir(rtl)) #end {
    clip-path: polygon(0 var(--position), 100% var(--position), 100% 100%, 0 100%);
  }

  /* Slotted defaults */
  ::slotted(img) {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  /* Divider */
  #divider {
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--quiet-silent);
    cursor: ew-resize;

    &::before {
      position: absolute;
      top: 0;
      left: 50%;
      width: var(--divider-draggable-area);
      height: 100%;
      transform: translateX(-50%);
      content: '';
    }

    /* Focus */
    &:focus {
      outline: none;
    }
  }

  #divider.vertical {
    top: var(--position);
    left: 0;
    width: 100%;
    height: var(--divider-width);
    transform: translateY(-50%);
    cursor: ns-resize;

    &::before {
      top: 50%;
      left: 0;
      width: 100%;
      height: var(--divider-draggable-area);
      transform: translateY(-50%);
    }
  }

  :host(:dir(ltr)) #divider:not(.vertical) {
    left: var(--position);
    transform: translateX(-50%);
  }

  :host(:dir(rtl)) #divider:not(.vertical) {
    right: var(--position);
    transform: translateX(50%);
  }

  :host([disabled]) #divider {
    cursor: default;
  }

  /* Handle */
  #handle {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: var(--quiet-silent);
    color: var(--quiet-primary-text-on-soft);

    quiet-icon,
    ::slotted(quiet-icon) {
      font-size: 1.25em;
    }
  }

  :host(:not([disabled])) #divider:focus-visible #handle {
    outline: var(--quiet-focus-ring);
  }

  :host([disabled]) #handle {
    display: none;
  }
`;
