import { css } from 'lit';

export default css`
  :host {
    --track-color: var(--quiet-neutral-fill-softer);
    --track-size: 1.5em;
    --indicator-color: var(--quiet-primary-fill-mid);
    --diameter: 10em;

    /* Private */
    --percentage: 0;

    display: block;
  }

  /* Bar */
  :host([appearance='bar']) #track {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--track-size);
    overflow: hidden;
    border-radius: var(--quiet-border-radius-pill);
    background-color: var(--track-color);
    box-shadow: var(--quiet-inset-shadow-soft);
    font-size: 0.875em;
  }

  :host([appearance='bar']) #indicator {
    display: grid;
    place-content: center;
    width: calc(var(--percentage) * 1%);
    height: 100%;
    border-radius: inherit;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    background-color: var(--indicator-color);
    color: var(--quiet-primary-text-on-mid);
    font-weight: var(--quiet-font-weight-semibold);
    transition: 0.3s width ease;
  }

  :host([appearance='bar']) #content {
    display: block;
    margin-inline: 1em;
    overflow: hidden;
    translate: 0 -0.0625em; /* better vertical alignment */
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Indeterminate */
  :host([appearance='bar'][indeterminate]) #indicator {
    width: 50%;
    border-radius: inherit;
    animation: 2.5s bar-indeterminate infinite cubic-bezier(0.45, 0, 0.55, 1);

    &:dir(rtl) {
      animation-name: bar-indeterminate-rtl;
    }
  }

  @keyframes bar-indeterminate {
    0% {
      translate: -100%;
    }
    20% {
      translate: -100%;
    }

    100% {
      translate: 200%;
    }
  }

  @keyframes bar-indeterminate-rtl {
    0% {
      translate: 100%;
    }
    20% {
      translate: 100%;
    }

    100% {
      translate: -200%;
    }
  }

  /* Ring */
  :host([appearance='ring']) {
    --track-size: 1em;

    /* Private */
    --radius: calc(var(--diameter) / 2 - var(--track-size) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    display: inline-flex;
    position: relative;
    width: var(--diameter) !important;
    height: var(--diameter) !important;
    font-size: 0.875em;
  }

  :host([appearance='ring']) svg {
    flex: 1 1 auto;
  }

  :host([appearance='ring']) #track,
  :host([appearance='ring']) #indicator {
    fill: none;
    r: var(--radius);
    cx: calc(var(--diameter) / 2);
    cy: calc(var(--diameter) / 2);
    transform-origin: 50% 50%;
    rotate: -90deg;
  }

  :host([appearance='ring']) #track {
    stroke: var(--track-color);
    stroke-width: var(--track-size);
  }

  :host([appearance='ring']) #indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--track-size);
    stroke-linecap: round;
    transition: 200ms stroke-dasharray ease;
    stroke-dasharray: calc((var(--circumference) * var(--percentage)) / 100) var(--circumference);
  }

  :host([appearance='ring']:dir(rtl)) #indicator {
    --circumference-rtl: calc(var(--circumference) * -1);
    --percentage-rtl: calc(var(--percentage) * -1);
    stroke-dasharray: 0 calc((var(--circumference) * (100 - var(--percentage))) / 100) var(--circumference);
  }

  :host([appearance='ring'][indeterminate]) #indicator {
    animation: 2.5s ring-indeterminate infinite linear;
    stroke-dasharray: calc((var(--circumference) * 50) / 100) var(--circumference);
  }

  :host([appearance='ring'][indeterminate]:dir(rtl)) #indicator {
    animation-name: ring-indeterminate-rtl;
  }

  :host([appearance='ring']) #content {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: var(--diameter);
    height: var(--diameter);
    padding: var(--track-size);
    text-align: center;
  }

  @keyframes ring-indeterminate {
    0% {
      rotate: -360deg;
    }
    100% {
      rotate: 360deg;
    }
  }

  @keyframes ring-indeterminate-rtl {
    0% {
      rotate: 360deg;
    }
    100% {
      rotate: -360deg;
    }
  }

  /* Pie */
  :host([appearance='pie']) {
    /* Private - smaller radius so stroke fits within bounds */
    --radius: calc(var(--diameter) / 4);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    display: inline-flex;
    position: relative;
    width: var(--diameter) !important;
    height: var(--diameter) !important;
    font-size: 0.875em;
  }

  :host([appearance='pie']) svg {
    flex: 1 1 auto;
    overflow: hidden;
    border-radius: 50%;
  }

  :host([appearance='pie']) #track,
  :host([appearance='pie']) #indicator {
    fill: none;
    r: var(--radius);
    cx: calc(var(--diameter) / 2);
    cy: calc(var(--diameter) / 2);
    transform-origin: 50% 50%;
    rotate: -90deg;
  }

  :host([appearance='pie']) #track {
    fill: var(--track-color);
    r: calc(var(--diameter) / 2);
    stroke: none;
  }

  :host([appearance='pie']) #indicator {
    fill: none;
    stroke: var(--indicator-color);
    stroke-width: calc(var(--radius) * 2);
    stroke-linecap: butt;
    transition: 300ms stroke-dasharray ease;
    stroke-dasharray: calc((var(--circumference) * var(--percentage)) / 100) var(--circumference);
  }

  /* RTL support */
  :host([appearance='pie']:dir(rtl)) #indicator {
    stroke-dasharray: 0 calc((var(--circumference) * (100 - var(--percentage))) / 100) var(--circumference);
  }

  /* Indeterminate pie */
  :host([appearance='pie'][indeterminate]) #indicator {
    animation: 2.5s pie-indeterminate infinite ease-in-out;
    stroke-dasharray: calc((var(--circumference) * 50) / 100) var(--circumference);
  }

  :host([appearance='pie'][indeterminate]:dir(rtl)) #indicator {
    animation-name: pie-indeterminate-rtl;
  }

  :host([appearance='pie']) #content {
    display: flex;
    z-index: 1;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: var(--diameter);
    height: var(--diameter);
    padding: var(--track-size);
    color: var(--quiet-primary-text-on-mid);
  }

  @keyframes pie-indeterminate {
    0% {
      stroke-dasharray: 0 var(--circumference);
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: var(--circumference) 0;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 0 var(--circumference);
      stroke-dashoffset: 0;
    }
  }

  @keyframes pie-indeterminate-rtl {
    0% {
      stroke-dasharray: 0 var(--circumference);
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: var(--circumference) 0;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 0 var(--circumference);
      stroke-dashoffset: 0;
    }
  }
`;
