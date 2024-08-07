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
  :host([type='bar']) #track {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--track-size);
    font-size: 0.875em;
    background-color: var(--track-color);
    border-radius: 9999px;
    overflow: hidden;
  }

  :host([type='bar']) #indicator {
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

  :host([type='bar']) #content {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-inline: 1em;
    overflow: hidden;
    translate: 0 -0.0625em; /* better vertical alignment */
  }

  /* Indeterminate */
  :host([type='bar'][indeterminate]) #indicator {
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
  :host([type='ring']) {
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

  :host([type='ring']) svg {
    flex: 1 1 auto;
  }

  :host([type='ring']) #track,
  :host([type='ring']) #indicator {
    fill: none;
    r: var(--radius);
    cx: calc(var(--diameter) / 2);
    cy: calc(var(--diameter) / 2);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  :host([type='ring']) #track {
    stroke: var(--track-color);
    stroke-width: var(--track-size);
  }

  :host([type='ring']) #indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--track-size);
    stroke-linecap: round;
    transition: 200ms stroke-dasharray ease;
    stroke-dasharray: calc((var(--circumference) * var(--percentage)) / 100) var(--circumference);
  }

  :host([type='ring']:dir(rtl)) #indicator {
    --circumference-rtl: calc(var(--circumference) * -1);
    --percentage-rtl: calc(var(--percentage) * -1);
    stroke-dasharray: 0 calc((var(--circumference) * (100 - var(--percentage))) / 100) var(--circumference);
  }

  :host([type='ring'][indeterminate]) #indicator {
    animation: 2.5s ring-indeterminate infinite linear;
    stroke-dasharray: calc((var(--circumference) * 50) / 100) var(--circumference);
  }

  :host([type='ring'][indeterminate]:dir(rtl)) #indicator {
    animation-name: ring-indeterminate-rtl;
  }

  :host([type='ring']) #content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: var(--diameter);
    height: var(--diameter);
    text-align: center;
    padding: var(--track-size);
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
`;
